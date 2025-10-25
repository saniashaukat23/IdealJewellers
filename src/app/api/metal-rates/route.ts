// app/api/metal-rates/route.ts
import { NextResponse } from "next/server";

/**
 * Metal rates API (GoldAPI backend). Supports unit=ounce|gram|tola and currency query.
 *
 * Query params:
 *   - currency (default USD)
 *   - unit (ounce | gram | tola) (default ounce)
 *
 * Env:
 *   - GOLDAPI_KEY    (required)
 *   - CACHE_TTL_SECONDS (optional, default 300)
 *
 * Notes:
 *   - 1 troy ounce = 31.1034768 grams
 *   - 1 tola = 11.6638038 grams
 */

const OUNCE_TO_GRAM = 31.1034768;
const TOLA_TO_GRAM = 11.6638038;
const DEFAULT_TTL = Number(process.env.CACHE_TTL_SECONDS ?? 300);

type Metal = "gold" | "silver";
type Unit = "ounce" | "gram" | "tola";

interface ResultItem {
  metal: Metal;
  price: number; // price in requested currency per requested unit
  currency: string;
  unit: Unit;
  source: string;
}

interface ApiResult {
  timestamp: string;
  ttlSeconds: number;
  data: ResultItem[];
  fxWarning?: string | null;
}

const cache: {
  expiresAt?: number;
  payload?: { usdPerOunce: Record<Metal, number>; timestamp: string };
} = {};

// ------------------------------
// Utility: safe fetch + parse
// ------------------------------
async function safeFetch(url: string, opts?: RequestInit) {
  const r = await fetch(url, opts);
  const text = await r.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    throw new Error(`Invalid JSON from ${url}: ${text.slice(0, 200)}`);
  }
  if (!r.ok)
    throw new Error(
      `HTTP ${r.status} ${r.statusText} -> ${JSON.stringify(json)}`
    );
  return json;
}

// ------------------------------
// Robust FX rate: try several endpoints then throw
// ------------------------------
async function getFxRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;
  const target = to.toUpperCase();

  // 1) exchangerate.host latest
  try {
    const urlLatest = `https://api.exchangerate.host/latest?base=${encodeURIComponent(
      from
    )}&symbols=${encodeURIComponent(target)}`;
    const json = await safeFetch(urlLatest);
    if (json && json.rates && typeof json.rates[target] === "number") {
      return json.rates[target];
    } else {
      console.warn("exchangerate.host latest missing rate", {
        urlLatest,
        json,
      });
    }
  } catch (err) {
    console.warn("exchangerate.host latest failed:", (err as Error).message);
  }

  // 2) exchangerate.host convert
  try {
    const urlConv = `https://api.exchangerate.host/convert?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(target)}&amount=1`;
    const json = await safeFetch(urlConv);
    if (json && json.info && typeof json.info.rate === "number")
      return json.info.rate;
    if (typeof json.result === "number") return Number(json.result);
    console.warn("exchangerate.host convert missing info", { urlConv, json });
  } catch (err) {
    console.warn("exchangerate.host convert failed:", (err as Error).message);
  }

  // 3) backup: open.er-api.com
  try {
    const urlER = `https://open.er-api.com/v6/latest/${encodeURIComponent(
      from
    )}`;
    const json = await safeFetch(urlER);
    if (
      json &&
      json.result === "success" &&
      json.rates &&
      typeof json.rates[target] === "number"
    ) {
      return json.rates[target];
    } else {
      console.warn("open.er-api.com missing rate", { urlER, json });
    }
  } catch (err) {
    console.warn("open.er-api.com failed:", (err as Error).message);
  }

  // all failed
  throw new Error(`FX fetch failed ${from}->${to}`);
}

// ------------------------------
// Convert USD-per-ounce -> requested currency & unit
// ------------------------------
function convertPrices(
  usdPerOunce: Record<Metal, number>,
  fx: number,
  currency: string,
  unit: Unit
): ResultItem[] {
  const convertOne = (priceUsdPerOunce: number) => {
    const priceTargetPerOunce = priceUsdPerOunce * fx;
    if (unit === "ounce") return priceTargetPerOunce;
    if (unit === "gram") return priceTargetPerOunce / OUNCE_TO_GRAM;
    // tola
    return priceTargetPerOunce / TOLA_TO_GRAM;
  };

  return [
    {
      metal: "gold",
      price: Number(convertOne(usdPerOunce.gold).toFixed(4)),
      currency,
      unit,
      source: "goldapi.io",
    },
    {
      metal: "silver",
      price: Number(convertOne(usdPerOunce.silver).toFixed(4)),
      currency,
      unit,
      source: "goldapi.io",
    },
  ];
}

// ------------------------------
// Handler
// ------------------------------
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const currency = (url.searchParams.get("currency") || "USD").toUpperCase();
    const unitParam = (url.searchParams.get("unit") || "ounce").toLowerCase();
    const unit: Unit =
      unitParam === "gram" ? "gram" : unitParam === "tola" ? "tola" : "ounce";

    const now = Date.now();
    // Use cached USD per ounce if not expired
    if (cache.payload && cache.expiresAt && cache.expiresAt > now) {
      const usdPerOunce = cache.payload.usdPerOunce;
      let fx = 1;
      let fxWarning: string | null = null;
      if (currency !== "USD") {
        try {
          fx = await getFxRate("USD", currency);
        } catch (err: any) {
          console.error("FX lookup failed:", err.message ?? err);
          fxWarning = `FX lookup failed USD->${currency}; prices returned in USD values.`;
          fx = 1;
        }
      }
      const data = convertPrices(usdPerOunce, fx, currency, unit);
      const out: ApiResult = {
        timestamp: cache.payload.timestamp,
        ttlSeconds: DEFAULT_TTL,
        data,
        fxWarning,
      };
      return NextResponse.json(out);
    }

    // No cached value or expired -> fetch from GoldAPI
    const key = process.env.GOLDAPI_KEY;
    if (!key)
      return NextResponse.json(
        { error: "GOLDAPI_KEY not set in environment" },
        { status: 500 }
      );

    const headers = {
      "x-access-token": key,
      "Content-Type": "application/json",
    };

    // Fetch XAU and XAG in USD (provider returns USD price per troy ounce)
    const pGold = safeFetch("https://www.goldapi.io/api/XAU/USD", {
      method: "GET",
      headers,
    });
    const pSilver = safeFetch("https://www.goldapi.io/api/XAG/USD", {
      method: "GET",
      headers,
    });

    const [goldJson, silverJson] = await Promise.all([pGold, pSilver]);

    // provider shape may vary; many return `.price`
    const usdPerOunceGold = Number(
      goldJson?.price ?? goldJson?.last ?? goldJson?.ask ?? NaN
    );
    const usdPerOunceSilver = Number(
      silverJson?.price ?? silverJson?.last ?? silverJson?.ask ?? NaN
    );

    if (
      !Number.isFinite(usdPerOunceGold) ||
      !Number.isFinite(usdPerOunceSilver)
    ) {
      console.error("GoldAPI unexpected response", { goldJson, silverJson });
      throw new Error("GoldAPI did not return numeric prices for XAU/XAG");
    }

    const usdPerOunce: Record<Metal, number> = {
      gold: usdPerOunceGold,
      silver: usdPerOunceSilver,
    };
    // cache
    cache.payload = { usdPerOunce, timestamp: new Date().toISOString() };
    cache.expiresAt = Date.now() + DEFAULT_TTL * 1000;

    // FX conversion (try, but fallback gracefully)
    let fx = 1;
    let fxWarning: string | null = null;
    if (currency !== "USD") {
      try {
        fx = await getFxRate("USD", currency);
      } catch (err: any) {
        console.error(
          "FX lookup failed after GoldAPI fetch:",
          err.message ?? err
        );
        fxWarning = `FX lookup failed USD->${currency}; prices returned in USD values.`;
        fx = 1;
      }
    }

    const data = convertPrices(usdPerOunce, fx, currency, unit);
    const out: ApiResult = {
      timestamp: cache.payload.timestamp,
      ttlSeconds: DEFAULT_TTL,
      data,
      fxWarning,
    };
    return NextResponse.json(out);
  } catch (err: any) {
    console.error("metal-rates handler error:", err);
    return NextResponse.json(
      { error: err.message ?? "unknown error" },
      { status: 500 }
    );
  }
}

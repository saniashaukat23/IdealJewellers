"use client";
import React, { useEffect, useState } from "react";
import "./GoldCalculator.css"; // Import the new CSS file

type Unit = "gram" | "ounce";
type Karat = 24 | 22 | 18;

export default function GoldCalculator() {
  const [currency, setCurrency] = useState<string>("PKR");
  const [unit, setUnit] = useState<Unit>("gram");
  const [karat, setKarat] = useState<Karat>(24);
  const [quantity, setQuantity] = useState<number>(1);

  const [pricePerUnit24K, setPricePerUnit24K] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fxWarning, setFxWarning] = useState<string | null>(null);

  // supported currencies for quick selector
  const currencies = ["PKR", "USD", "INR", "EUR", "GBP"];

  useEffect(() => {
    let ignore = false;
    async function fetchPrice() {
      setLoading(true);
      setError(null);
      setFxWarning(null);
      setPricePerUnit24K(null);

      try {
        const url = `/api/metal-rates?currency=${encodeURIComponent(
          currency
        )}&unit=${encodeURIComponent(unit)}`;
        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `API error: ${res.status} ${res.statusText} - ${text}`
          );
        }
        const json = await res.json();
        const goldItem = json.data?.find((d: any) => d.metal === "gold");
        if (!goldItem) throw new Error("No gold price returned from API");
        if (!ignore) {
          setPricePerUnit24K(Number(goldItem.price));
          if (json.fxWarning) setFxWarning(json.fxWarning);
        }
      } catch (err: any) {
        if (!ignore) setError(err.message || String(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchPrice();
    return () => {
      ignore = true;
    };
  }, [currency, unit]);

  const compute = () => {
    if (pricePerUnit24K == null) return null;
    const purityFactor = karat / 24;
    const base = pricePerUnit24K * purityFactor * quantity;
    return Number(base.toFixed(2));
  };

  const result = compute();

  return (
    <div className="gold-calculator-panel">
      <div className="calc-inputs-grid">
        <label className="calc-label">
          <span className="calc-label-text">Currency</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="calc-select"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="calc-label">
          <span className="calc-label-text">Unit</span>
          <div className="calc-button-group">
            <button
              onClick={() => setUnit("gram")}
              className={`calc-toggle-btn ${unit === "gram" ? "active" : ""}`}
            >
              Gram
            </button>
            <button
              onClick={() => setUnit("ounce")}
              className={`calc-toggle-btn ${unit === "ounce" ? "active" : ""}`}
            >
              Ounce
            </button>
          </div>
        </label>

        <label className="calc-label">
          <span className="calc-label-text">Karat (Purity)</span>
          <div className="calc-button-group">
            {[24, 22, 18].map((k) => (
              <button
                key={k}
                onClick={() => setKarat(k as Karat)}
                className={`calc-toggle-btn ${karat === k ? "active" : ""}`}
              >
                {k}K
              </button>
            ))}
          </div>
        </label>

        <label className="calc-label">
          <span className="calc-label-text">Quantity</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="calc-input"
          />
        </label>
      </div>

      <div className="calc-price-display">
        <div className="calc-price-label">Price per {unit} (24K):</div>
        <div className="calc-price-value">
          {loading && <span>Loading…</span>}
          {!loading && pricePerUnit24K != null && (
            <span>
              {pricePerUnit24K.toLocaleString()} {currency} / {unit}
            </span>
          )}
        </div>
        {fxWarning && <div className="calc-warning">{fxWarning}</div>}
        {error && <div className="calc-error">{error}</div>}
      </div>

      <div className="calc-result-box">
        <div className="calc-result-label">Estimated Value</div>
        <div className="calc-result-value">
          {result == null ? "—" : `${result.toLocaleString()} ${currency}`}
        </div>
        <div className="calc-result-meta">
          ({karat}K • {quantity} {unit})
        </div>
      </div>

      <div className="calc-disclaimer">
        <div>
          Note: API returns 24K (pure) spot price. Karat prices are calculated
          by purity ratio (K/24).
        </div>
      </div>
    </div>
  );
}

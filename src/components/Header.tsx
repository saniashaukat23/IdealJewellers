"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  return (
    <header className=" bg-transparent container mx-auto flex items-center justify-between gap-3 py-4 px-4 ">
      <Link href="/" className="flex items-center justify-center gap-1 ml-6">
        <div className="relative w-10 h-10">
          <Image
            src="/logo2.png"
            alt="Ideal Jewellers"
            fill
            sizes="80px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <h1
          className="text-xl font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ideal Jewellers
        </h1>
      </Link>

      <nav className="flex gap-6">
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-color font-semibold z-20 ${
                active ? "text-black" : "text-black/50 hover:text-black"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <SocialLinks />
    </header>
  );
}

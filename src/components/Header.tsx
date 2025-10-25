"use client";
import React, { useState, useEffect } from "react";
import "./Header.css"; // Import the stylesheet

// -----------------------------------------------------------------
// Placeholder SocialLinks component
// This is added so the Header component can render without error.
// You can replace this with your actual SocialLinks component.
// -----------------------------------------------------------------
const SocialIcon = ({
  label,
  href,
  iconPath,
}: {
  label: string;
  href: string;
  iconPath: string;
}) => (
  <a href={href} aria-label={label} className="footer-social-icon">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* This is a generic link icon, replace with actual social paths */}
      <path d={iconPath} />
    </svg>
  </a>
);
// -----------------------------------------------------------------

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  // Use window.location.pathname for standard React
  const [pathname, setPathname] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set the pathname on component mount
  useEffect(() => {
    setPathname(window.location.pathname || "/");
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="main-header">
      <a href="/" className="header-logo-link">
        <div className="header-logo-image-wrapper">
          {/* Replaced next/image with standard <img> */}
          <img
            src="/logo2.png" // Assuming this path is correct
            alt="Ideal Jewellers"
            className="header-logo-image" // Added a class for styling
            onError={(e) => {
              // Fallback in case logo fails
              e.currentTarget.src =
                "https://placehold.co/80x80/EBEAE8/333333?text=IJ";
            }}
          />
        </div>
        <h1
          className="header-logo-title"
          style={{ fontFamily: "var(--font-heading)" }} // Kept inline style as it uses a CSS var
        >
          Ideal Jeweller
        </h1>
      </a>

      {/* Desktop Navigation */}
      <nav className="header-nav-desktop">
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            // Replaced next/link with standard <a>
            <a
              key={link.href}
              href={link.href}
              className={`header-nav-link ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Desktop Social Links */}
      <div className="header-social-desktop">
        <div className="footer-social-links">
          {/* Replace with actual icons/components */}
          <SocialIcon
            label="Facebook"
            href="#"
            iconPath="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
          />
          <SocialIcon
            label="Instagram"
            href="#"
            iconPath="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.229-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.849s.012-3.584.07-4.85c.148-3.229 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zM12 0C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.687.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
          />
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="header-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Mobile Navigation Panel (Right Panel) */}
      <div
        className={`header-nav-mobile ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="header-nav-mobile-header">
          <h2 className="header-nav-mobile-title">Menu</h2>
          <button
            className="header-nav-mobile-close"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="header-nav-mobile-links">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              // Replaced next/link with standard <a>
              <a
                key={link.href}
                href={link.href}
                className={`header-nav-mobile-link ${
                  active ? "is-active" : ""
                }`}
                aria-current={active ? "page" : undefined}
                onClick={closeMobileMenu} // Close menu on link click
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="header-nav-mobile-social">
          <div className="footer-social-links">
            {/* Replace with actual icons/components */}
            <SocialIcon
              label="Facebook"
              href="#"
              iconPath="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
            />
            <SocialIcon
              label="Instagram"
              href="#"
              iconPath="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.229-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.849s.012-3.584.07-4.85c.148-3.229 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zM12 0C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.687.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
            />
          </div>{" "}
        </div>
      </div>

      {/* Overlay for when menu is open */}
      {isMobileMenuOpen && (
        <div
          className="header-nav-mobile-overlay"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  );
}

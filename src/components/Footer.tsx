"use client";
import React from "react";
import "./Footer.css"; // Import the stylesheet

// Placeholder for logo image
const Logo = () => (
  <div className="footer-logo-image-wrapper">
    <img
      src="/logo2.png" // Path to your logo
      alt="Ideal Jewellers"
      className="footer-logo-image"
      onError={(e) => {
        // Fallback in case logo fails
        e.currentTarget.src =
          "https://placehold.co/100x40/EBEAE8/333333?text=Ideal+Jewellers";
      }}
    />
  </div>
);

// Placeholder for social icons
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

export default function Footer() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Newsletter subscribed");
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Top section: Logo, Nav, Newsletter */}
        <div className="footer-main">
          {/* Column 1: Logo & Social */}
          <div className="footer-column footer-brand">
            <Logo />
            <p className="footer-tagline">
              Timeless elegance, crafted for you.
            </p>
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
          <div className="sm-column-footer">
            {/* Column 2: Navigation Links */}
            <div className="footer-column footer-links">
              <h4 className="footer-column-title">Quick Links</h4>
              <a href="/" className="footer-link">
                Home
              </a>
              <a href="/about" className="footer-link">
                About Us
              </a>
              <a href="/gallery" className="footer-link">
                Gallery
              </a>
              <a href="/contact" className="footer-link">
                Contact Us
              </a>
              <a href="/products" className="footer-link">
                Products
              </a>
            </div>

            {/* Column 3: More Links */}
            <div className="footer-column footer-links">
              <h4 className="footer-column-title">Support</h4>
              <a href="/faq" className="footer-link">
                FAQs
              </a>
              <a href="/shipping" className="footer-link">
                Shipping & Returns
              </a>
              <a href="/privacy" className="footer-link">
                Privacy Policy
              </a>
              <a href="/calculator" className="footer-link">
                Gold Calculator
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-column footer-newsletter">
            <h4 className="footer-column-title">Subscribe</h4>
            <p className="footer-newsletter-text">
              Sign up for our newsletter to get the latest updates.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-newsletter-input"
                required
              />
              <button type="submit" className="footer-newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Ideal Jewellers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

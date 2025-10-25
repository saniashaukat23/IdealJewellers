"use client";
import React from "react";
import "./HeroSection.css"; // Import the new stylesheet
import { CgRing } from "react-icons/cg";

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background Image Container */}
      <div className="hero-background">
        <img
          src="/bg1.png" // Path to your background image
          alt="Jewelry background"
          className="hero-background-image"
          onError={(e) => {
            // Fallback in case image fails
            e.currentTarget.src =
              "https://placehold.co/1920x1080/EBEAE8/CCCCCC?text=Hero+Image";
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">Discover Timeless Elegance</h1>
        <p className="hero-subtitle">
          Handcrafted jewellery designed to last a lifetime.
        </p>
        <a href={"/products"} className="hero-cta-button">
          <CgRing></CgRing>
          <span>View Collections</span>
        </a>
      </div>
    </section>
  );
}

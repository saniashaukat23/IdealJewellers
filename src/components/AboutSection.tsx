"use client";
import React from "react";
import "./AboutSection.css";

import { CgRing } from "react-icons/cg";

export default function AboutSection() {
  return (
    <section className="about-section" aria-labelledby="about-heading">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <h2
              id="about-pre-heading" // Changed ID to be unique
              className="about-pre-title"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.4px",
              }}
            >
              About Us - Since 1998
            </h2>
            <h2
              id="about-heading" // Main heading
              className="about-title"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.4px",
              }}
            >
              Crafted for Moments That Last
            </h2>

            <p
              className="about-description"
              style={{ fontFamily: "var(--font-body)" }}
            >
              At <span className="font-semibold">Ideal Jewellers</span>, every
              piece is a story designed with timeless aesthetics and crafted
              with meticulous attention to detail. We blend traditional
              techniques with modern sensibilities to create jewellery that
              becomes part of your legacy.
            </p>

            <p className="about-sub-description">
              From ethically sourced materials to hand-finished details, our
              commitment is to quality, honesty and pieces you’ll treasure
              forever.
            </p>

            <div className="about-buttons">
              <a href={"/gallery"} className="btn-outline">
                <CgRing></CgRing>
                View Gallery
              </a>
              <a href={"/contact"} className="btn-outline">
                <CgRing></CgRing>
                Book Appointment
              </a>
            </div>
          </div>
          <div className="about-image-wrapper">
            <img
              alt="Gold ring"
              src="/images/aboutUs.jpeg"
              width={380}
              height={440}
              className="about-image"
              onError={(e) => {
                // Fallback in case image fails
                e.currentTarget.src =
                  "https://placehold.co/380x440/CCCCCC/666666?text=Our+Craft";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

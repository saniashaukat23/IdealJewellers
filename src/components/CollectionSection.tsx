import React from "react";
import "./CollectionSection.css"; // Import the new stylesheet
import SwiperSlider from "./SwiperSlider";
// Placeholder for CollectionSlider component
// You can replace this with your actual slider import
const CollectionSlider = () => (
  // <-- Fixed the typo here
  <div className="collection-slider-placeholder">
    <p>CollectionSlider Component Goes Here</p>
  </div>
);

export default function CollectionSection() {
  return (
    <section
      className="collection-section"
      aria-labelledby="collections-heading"
    >
      <div className="collection-container">
        <div className="collection-header">
          <h2
            id="collections-heading" // Use this ID for aria-labelledby
            className="collection-title"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.4px",
            }}
          >
            Our Collections
          </h2>
          {/* Changed to h3 for better semantic hierarchy */}
          <h3
            id="collections-subheading"
            className="collection-subtitle"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.4px",
            }}
          >
            Premium Gold and Silver Jewellery
          </h3>
        </div>
        <SwiperSlider />
      </div>
    </section>
  );
}

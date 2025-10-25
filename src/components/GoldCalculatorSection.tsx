"use client"; // Assuming GoldCalculator is a client component
import React from "react";
import "./GoldCalculatorSection.css"; // Import the stylesheet
import GoldCalculator from "./GoldCalculator"; // Import the calculator

export default function GoldCalculatorSection() {
  return (
    <section className="calc-section" aria-labelledby="calculator-heading">
      <div className="calc-section-bg">
        <div className="calc-section-container">
          <div className="calc-section-header">
            <h2
              id="calculator-heading"
              className="calc-section-title"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.4px",
              }}
            >
              Gold Calculator
            </h2>
            <h3
              className="calc-section-subtitle"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.4px",
              }}
            >
              Check for latest Gold Prices
            </h3>
          </div>
          <GoldCalculator />
        </div>
      </div>
    </section>
  );
}

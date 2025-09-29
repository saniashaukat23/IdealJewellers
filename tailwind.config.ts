// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#A67C00",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          dark: "#9D9D9D",
        },
        offwhite: "#F8F6F2",
        warmGold: "hsla(40, 54%, 56%, 1)",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};

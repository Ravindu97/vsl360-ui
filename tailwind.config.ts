import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: "#2a435d",
          dark: "#1f3247",
          light: "#3a5876",
          tint: "#eef2f7",
        },
        tropical: {
          DEFAULT: "#4e6e5d",
          dark: "#3d5749",
          light: "#6a8b78",
          tint: "#edf3ef",
        },
        sand: {
          DEFAULT: "#e0d9d1",
          dark: "#d2c9bd",
        },
        gold: {
          DEFAULT: "#d18d36",
          dark: "#b9772a",
          light: "#e0a655",
          tint: "#faf3e8",
        },
        cream: "#ffffff",
        paper: "#ffffff",
        ink: "#16202d",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "18px",
        "3xl": "26px",
      },
      maxWidth: {
        mobile: "440px",
      },
      boxShadow: {
        card: "0 10px 30px -18px rgba(31, 50, 71, 0.28)",
        "card-hover": "0 24px 50px -22px rgba(31, 50, 71, 0.38)",
        soft: "0 6px 20px -12px rgba(31, 50, 71, 0.25)",
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        hero: ["clamp(2.75rem, 8vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

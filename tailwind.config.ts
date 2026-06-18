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
        },
        tropical: {
          DEFAULT: "#4e6e5d",
          dark: "#3d5749",
          light: "#6a8b78",
        },
        sand: {
          DEFAULT: "#e0d9d1",
          dark: "#d2c9bd",
        },
        gold: {
          DEFAULT: "#d18d36",
          dark: "#b9772a",
          light: "#e0a655",
        },
        cream: "#fff8f3",
      },
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      maxWidth: {
        mobile: "440px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

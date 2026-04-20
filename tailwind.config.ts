import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "900px" },
      },
      colors: {
        relay: {
          bg: "#ECEAE3",
          surface: "#F5F2EA",
          elevated: "#FDFBF7",
          cream: "#1A1815",
          accent: "#3A5F82",
          "accent-hover": "#4A6F92",
          rose: "#7A4858",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
        geist: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.65s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;

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
          /** Deep ink-navy field — sober, institutional without default SaaS gray */
          bg: "#0B0D12",
          surface: "#11141C",
          elevated: "#161A24",
          cream: "#E8E6E0",
          /** Muted steel blue — trust, primary actions (replaces hot pink as default accent) */
          accent: "#5B7A9E",
          "accent-hover": "#6D8CB0",
          /** Eyebrow / rare emphasis only */
          rose: "#8B5C6B",
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

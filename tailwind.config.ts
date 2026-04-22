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
          cream: "#FAF8F2",
          "cream-2": "#F3EFE4",
          ink: "#1C1917",
          "ink-2": "#4A4540",
          "ink-3": "#8C857A",
          // oklch colors — defined as CSS vars for opacity support
          coral: "var(--coral)",
          teal: "var(--teal)",
          gold: "var(--gold)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(1.15)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "scroll-pulse": "scrollPulse 2s 1.5s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;

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
        linkedin: {
          DEFAULT: "#0A66C2",
          dark: "#004182",
          light: "#378FE9",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F3F2EF",
          card: "#FAFAF9",
          border: "#E8E8E8",
        },
        ink: {
          DEFAULT: "#191919",
          muted: "#666666",
          subtle: "#999999",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        elevated: "0 4px 24px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "hero-drift": "heroDrift 28s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        heroDrift: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.06) translate(-1%, -0.5%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

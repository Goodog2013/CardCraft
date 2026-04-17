import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        accentForeground: "hsl(var(--accent-foreground))",
        success: "hsl(var(--success))",
        danger: "hsl(var(--danger))",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.4rem",
      },
      boxShadow: {
        soft: "0 20px 45px -28px rgba(22, 46, 59, 0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.35s ease-out",
        pulsebar: "pulsebar 1.2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulsebar: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

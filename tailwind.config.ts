import type { Config } from "tailwindcss";

/**
 * Design tokens.
 * Colors are semantic and backed by CSS variables (see app/globals.css) so the
 * same class works in dark (default) and light themes.
 */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: withAlpha("--color-bg"),
        surface: withAlpha("--color-surface"),
        raised: withAlpha("--color-raised"),
        line: withAlpha("--color-line"),
        "line-strong": withAlpha("--color-line-strong"),
        ink: withAlpha("--color-ink"),
        muted: withAlpha("--color-muted"),
        accent: {
          DEFAULT: withAlpha("--color-accent"),
          ink: withAlpha("--color-accent-ink"),
          text: withAlpha("--color-accent-text"),
          soft: withAlpha("--color-accent-soft"),
        },
        danger: withAlpha("--color-danger"),
        success: withAlpha("--color-success"),
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid display sizes: [size, { lineHeight, letterSpacing }]
        "display-xl": [
          "clamp(2.25rem, 1.2rem + 4.4vw, 4.25rem)",
          { lineHeight: "0.98", letterSpacing: "-0.035em" },
        ],
        "display-lg": [
          "clamp(2rem, 1.4rem + 2.6vw, 3.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
      },
      spacing: {
        // Section rhythm on top of Tailwind's 4px scale.
        gutter: "1rem",
        "gutter-lg": "2rem",
        section: "clamp(5rem, 3.5rem + 7vw, 9rem)",
      },
      maxWidth: {
        content: "75rem",
        prose: "40rem",
      },
      borderRadius: {
        // Sharp edges are part of the brand; keep radii tiny.
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
      },
      boxShadow: {
        hard: "4px 4px 0 0 rgb(var(--color-line-strong))",
        "hard-accent": "4px 4px 0 0 rgb(var(--color-accent))",
        panel: "0 24px 60px -24px rgb(0 0 0 / 0.45)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgb(var(--color-line) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-line) / 0.55) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import { continueRender, delayRender } from "remotion";
import type { CSSProperties } from "react";
// Bundled locally with Fontsource, so renders don't depend on the network.
// Same families the site loads with next/font in app/layout.tsx.
import "@fontsource/bricolage-grotesque/latin-600.css";
import "@fontsource/bricolage-grotesque/latin-700.css";
import "@fontsource/bricolage-grotesque/latin-800.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";

/** The same CSS variables tailwind.config.ts reads (--font-display, --font-body, --font-mono). */
export const fontVars = {
  "--font-display": '"Bricolage Grotesque"',
  "--font-body": '"Inter"',
  "--font-mono": '"JetBrains Mono"',
} as CSSProperties;

// Hold rendering until the faces are actually loaded, so no frame uses a fallback font.
if (typeof document !== "undefined") {
  const handle = delayRender("Loading fonts");
  Promise.all([
    document.fonts.load('800 40px "Bricolage Grotesque"'),
    document.fonts.load('700 40px "Bricolage Grotesque"'),
    document.fonts.load('600 40px "Bricolage Grotesque"'),
    document.fonts.load('400 16px "Inter"'),
    document.fonts.load('500 16px "Inter"'),
    document.fonts.load('600 16px "Inter"'),
    document.fonts.load('700 16px "Inter"'),
    document.fonts.load('400 16px "JetBrains Mono"'),
    document.fonts.load('500 16px "JetBrains Mono"'),
  ])
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
}

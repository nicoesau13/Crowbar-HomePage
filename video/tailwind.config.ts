import type { Config } from "tailwindcss";
import siteConfig from "../tailwind.config";

/** Same design tokens as the site; only the content globs differ. */
const config: Config = {
  ...siteConfig,
  darkMode: "class",
  content: ["./video/**/*.{ts,tsx}", "./components/ui/**/*.{ts,tsx}"],
};

export default config;

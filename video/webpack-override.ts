import path from "path";
import type { WebpackOverrideFn } from "@remotion/bundler";
import { enableTailwind } from "@remotion/tailwind";

/**
 * Tailwind (with video/tailwind.config.ts, which extends the site config) and the "@/"
 * import alias, so video code can import site components and tokens directly.
 */
export const webpackOverride: WebpackOverrideFn = (config) =>
  enableTailwind(
    {
      ...config,
      resolve: {
        ...config.resolve,
        alias: { ...(config.resolve?.alias ?? {}), "@": path.resolve(process.cwd()) },
      },
    },
    { configLocation: path.resolve(process.cwd(), "video/tailwind.config.ts") },
  );

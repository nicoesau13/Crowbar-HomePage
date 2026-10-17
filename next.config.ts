import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes a plain site to ./out (drop it on Netlify, or deploy from GitHub).
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root so a lockfile in a parent folder isn't picked up.
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;

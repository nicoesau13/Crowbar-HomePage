import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root so a lockfile in a parent folder isn't picked up.
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;

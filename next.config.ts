import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false, // Exclude 'child_process' from client-side builds
        fs: false, // Exclude 'fs' as well
        readline: false, // Exclude 'readline' from client-side builds
        "stream/promises": false,
      };
    }
    return config;
  },
};

export default nextConfig;

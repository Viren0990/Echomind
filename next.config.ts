import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase this as needed
    },
  },
};

export default nextConfig;

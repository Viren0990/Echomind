import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */

   images: {
    domains: ['res.cloudinary.com'], // cloudinary domain to allow optimization
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase this as needed
    },
  },
};

export default nextConfig;

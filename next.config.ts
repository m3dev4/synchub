import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorer les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "icons8.com",
      "img.icons8.com",
      "upload.wikimedia.org",
    ],
  },
  // Disable webpack symlinks for Windows compatibility
  webpack: (config, { isServer }) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;

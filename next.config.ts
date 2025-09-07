import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorer les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "icons8.com",
      "img.icons8.com",
      "upload.wikimedia.org",
    ],
  },
};

export default nextConfig;

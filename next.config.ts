import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorer les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    domains: ["via.placeholder.com", "res.cloudinary.com"],
  },
};

export default nextConfig;

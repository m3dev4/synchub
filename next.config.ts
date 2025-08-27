import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ["via.placeholder.com", "res.cloudinary.com"],
  },
};

export default nextConfig;

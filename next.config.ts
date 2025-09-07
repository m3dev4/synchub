import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorer les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build for deployment
    ignoreBuildErrors: true,
  },
  // Netlify compatibility
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  // Disable webpack symlinks for Windows compatibility
  webpack: (config, { isServer }) => {
    config.resolve.symlinks = false;
    
    // Ignore specific modules that might cause issues
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('canvas', 'jsdom');
    }
    
    return config;
  },
  // Experimental features for better deployment compatibility
  experimental: {
    serverComponentsExternalPackages: ['prisma', '@prisma/client'],
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.WP_IMAGE_URL as string,
      },
    ],
  },
};

export default nextConfig;

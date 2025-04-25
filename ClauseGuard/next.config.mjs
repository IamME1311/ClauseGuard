/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_FASTAPI_URL 
          ? `${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/:path*` 
          : '/api/mock/:path*'
      }
    ]
  },
  webpack: (config) => {
    // Use dynamic import instead of require
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'date-fns': new URL('date-fns', import.meta.url).pathname
    };

    // Keep PDF.js/Tesseract.js compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      fs: false,
      path: false,
      os: false
    };

    return config;
  },
  env: {
    NEXT_PUBLIC_USE_MOCK_API: process.env.NEXT_PUBLIC_FASTAPI_URL ? 'false' : 'true',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    typedRoutes: true, // Added for better TypeScript support
  },
};

export default nextConfig;

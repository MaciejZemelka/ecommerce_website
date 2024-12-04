/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '7084',
            pathname: '/images/products/**',
          },
        ],
        disableStaticImages: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
      reactStrictMode: false,
    };


export default nextConfig;

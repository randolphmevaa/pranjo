/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
      domains: [
        'cdn.shopify.com',
        'images.unsplash.com',
        // Add more domains if needed
      ],
    },
  };
  
  module.exports = nextConfig;  
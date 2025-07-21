/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      "utf-8-validate": false,
      "bufferutil": false,
    };
    return config;
  },
};

module.exports = nextConfig;

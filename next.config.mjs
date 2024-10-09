/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // USER_POOL_ID: process.env.USER_POOL_ID,
    // CLIENT_ID: process.env.CLIENT_ID,
    // STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY,
    PREFIX_URL: process.env.PREFIX_URL,
  },
  reactStrictMode: false,
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/portfolio',
  //       statusCode: 301,
  //     },
  //     {
  //       source: '/loan',
  //       destination: '/portfolio',
  //       statusCode: 301,
  //     },
  //   ];
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['youland-common-images.s3.us-west-1.amazonaws.com'],
  },
};

export default nextConfig;

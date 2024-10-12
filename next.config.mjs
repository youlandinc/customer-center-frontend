/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    PREFIX_URL: process.env.PREFIX_URL,
  },
  reactStrictMode: false,
  trailingSlash: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/contacts/directory',
        statusCode: 301,
      },
      {
        source: '/contacts',
        destination: '/contacts/directory',
        statusCode: 301,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['youland-common-images.s3.us-west-1.amazonaws.com'],
  },
};

export default nextConfig;

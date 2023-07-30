const { withSentryConfig } = require("@sentry/nextjs");
const nodeExternals = require("webpack-node-externals");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if(!isServer) {
      config.externals = nodeExternals();
    }

    return config;
  }
}

module.exports = nextConfig;

module.exports = withSentryConfig(
  module.exports,
  {
    silent: true,

    org: "duerenindustries",
    project: "management",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);

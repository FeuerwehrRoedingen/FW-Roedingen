const { withSentryConfig } = require("@sentry/nextjs");
const nodeExternals = require("webpack-node-externals");

const config = require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
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

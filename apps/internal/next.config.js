
const runtimeCaching = require('next-pwa/cache');
const pwa = require('next-pwa');

/** @type {import('next-pwa').PWAConfig}*/
const withPWA = pwa({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  skipWaiting: false,
  runtimeCaching
});

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPWA(nextConfig);

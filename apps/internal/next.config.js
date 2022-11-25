/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: []
    }
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  async rewrites(){
    return {
      beforeFiles: [
        {
          source: '/pocket',
          destination: 'http://127.0.0.1:8090/_/',
        },
        {
          source: '/assets/:path*',
          destination: 'http://127.0.0.1:8090/_/assets/:path*'
        },
        {
          source: '/fonts/:path*',
          destination: 'http://127.0.0.1:8090/_/fonts/:path*'
        },
        {
          source: '/images/:path*',
          destination: 'http://127.0.0.1:8090/_/images/:path*'
        },
        {
          source: '/api/settings/:path*',
          destination: 'http://127.0.0.1:8090/api/settings/:path*'
        },
        {
          source: '/api/collections/:path*',
          destination: 'http://127.0.0.1:8090/api/collections/:path*'
        },
        {
          source: '/api/users/:path*',
          destination: 'http://127.0.0.1:8090/api/users/:path*'
        },
        {
          source: '/api/logs/:path*',
          destination: 'http://127.0.0.1:8090/api/logs/:path*'
        },
      ],
      afterFiles: [],
      fallback: []
    }
  }
}

module.exports = nextConfig

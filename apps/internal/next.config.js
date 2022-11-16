/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        //reroute pocketBase traffic
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
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8090/api/:path*'
        }
      ],
      afterFiles: [],
      fallback: []
    }
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites(){
    return [
      {
        source: '/login',
        destination: '/api/auth/signin/feuerwehr-roedingen'
      }
    ]
  }
}

module.exports = nextConfig

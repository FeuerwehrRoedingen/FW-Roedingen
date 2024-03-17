//imported env to validate the schema at build time
import { env } from './env.mjs'

/** @type {import('next').NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/'
      }
    ]
  }
}

export default config;
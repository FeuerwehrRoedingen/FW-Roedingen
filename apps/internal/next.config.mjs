import { env } from './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ...env,
  }
}

export default nextConfig

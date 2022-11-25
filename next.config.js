/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["tailwindui.com", "images.unsplash.com"]
  },
  env: {
    API_KEY: process.env.API_KEY
  }
}

module.exports = nextConfig

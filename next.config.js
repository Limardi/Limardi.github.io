/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/' : '',
}

module.exports = nextConfig 
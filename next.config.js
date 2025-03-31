/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/vincentlimardi.github.io' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/vincentlimardi.github.io/' : '',
}

module.exports = nextConfig 
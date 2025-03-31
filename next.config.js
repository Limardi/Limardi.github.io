/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/Limardi.github.io' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/Limardi.github.io/' : '',
}

module.exports = nextConfig 
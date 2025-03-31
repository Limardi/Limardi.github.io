/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  useFileSystemPublicRoutes: true,
  basePath: '/vincentlimardi.github.io',
  assetPrefix: '/vincentlimardi.github.io/',
}

module.exports = nextConfig 
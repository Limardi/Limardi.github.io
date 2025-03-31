/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  useFileSystemPublicRoutes: true,
  basePath: '',
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/cloudinary-loader.ts',
    deviceSizes: [320, 640, 768, 1024, 1280, 1536],
  },
}

export default nextConfig
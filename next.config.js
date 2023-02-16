/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config, { webpack }) {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/keyv/),
      ],
    };
  }
}

module.exports = nextConfig

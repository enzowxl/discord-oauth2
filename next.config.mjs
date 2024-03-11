/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'assets-global.website-files.com',
      'cdn.discordapp.com'
    ]
  }
};

export default nextConfig;

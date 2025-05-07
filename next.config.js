/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['senior-naeil.life', 'senior-tomorrow.kro.kr'],
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig; 
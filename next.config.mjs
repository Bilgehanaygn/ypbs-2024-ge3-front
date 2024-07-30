/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // Proxy to Backend
      },
    ];
  },
  reactStrictMode: false,
};
export default nextConfig;

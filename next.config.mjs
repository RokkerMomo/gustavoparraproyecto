/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:{
      bodySizeLimit:"10000mb"
    }
  },
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // Replace with a valid hostname
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Use true for 301 redirect, false for 302 redirect
      },
    ];
  },
};

export default nextConfig;
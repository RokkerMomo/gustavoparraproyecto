/** @type {import('next').NextConfig} */
const nextConfig = {
  images:  {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        port: "",
        pathname: "",
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
            permanent: true, // Utiliza true para redirección 301, false para redirección 302
          },
        ];
      },
};

export default nextConfig;

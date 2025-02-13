/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:"ik.imagekit.io"
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:"media.istockphoto.com"
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:"i.ytimg.com"
      }
    ]
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

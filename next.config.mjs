/** @type {import('next').NextConfig} */
const nextConfig = {
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

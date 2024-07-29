/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DATABASE_URL:process.env.DATABASE_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL:process.env.NEXTAUTH_URL,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: '**',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;

import environments from './next-env.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const [{ env }] = [environments];
  return {
    compiler: {
      styledComponents: {
        ssr: true,
      },
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'control.starzth.com',
          pathname: '/**', // อนุญาตทุก path จาก control.starzth.com
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3001',
          pathname: '/**', // อนุญาตทุก path จาก localhost:3001
        },
      ],
    },

    // images: {
    //   domains: ['control.starzth.com', 'localhost'],
    // },
    reactStrictMode: false,
    env,
  };
};

export default nextConfig;

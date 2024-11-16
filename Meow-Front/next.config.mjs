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
          hostname: 'localhost',
          pathname: '/images/**', // Matches images under the "/images" path
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

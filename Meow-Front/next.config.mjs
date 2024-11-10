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
      domains: ['control.starzth.com', 'localhost'],
    },
    reactStrictMode: true,
    env,
  };
};

export default nextConfig;

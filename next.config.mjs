/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;

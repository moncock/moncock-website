/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    compress: true,
    swcMinify: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: false
};

export default nextConfig;

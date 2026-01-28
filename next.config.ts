import type { NextConfig } from "next";

const API_PREFIXES = ['user', 'test', 'link', 'completed'];
const API_TARGET = process.env.NEXT_PUBLIC_API_PROXY_TARGET;

const nextConfig: NextConfig = {
  async rewrites() {
    if (API_TARGET) return [];
    return API_PREFIXES.map(route => ({
      source: `/${route}/:path*`,
      destination: `${API_TARGET}/${route}/:path*`
    }))
  },
  reactStrictMode: false,
};

export default nextConfig;

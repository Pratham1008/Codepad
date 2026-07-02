import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8080";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/webauthn/:path*",
        destination: `${backendUrl}/webauthn/:path*`,
      },
      {
        source: "/login/:path*",
        destination: `${backendUrl}/login/:path*`,
      }
    ];
  },
};

export default nextConfig;

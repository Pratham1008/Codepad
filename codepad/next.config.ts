import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE as string;
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

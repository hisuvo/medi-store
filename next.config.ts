import "./src/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "**",
        // port: "",
        // pathname: "/my-bucket/**",
        search: "",
      },
    ],
    localPatterns: [
      {
        pathname: "**",
        search: "",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;

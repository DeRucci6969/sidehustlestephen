import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/download/[assetId]": ["./content/member-assets/**/*"],
  },
};

export default nextConfig;

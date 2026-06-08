import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_OPENAI_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;

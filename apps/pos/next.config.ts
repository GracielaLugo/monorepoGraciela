import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/database",
    "@repo/service-credit",
    "@repo/service-inventory",
    "@repo/service-menu",
    "@repo/service-payroll",
    "@repo/service-sales",
    "@repo/service-suppliers",
  ],
};

export default nextConfig;

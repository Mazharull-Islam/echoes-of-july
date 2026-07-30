import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the hero placeholder's quality={90} on app/page.tsx without a
  // dev-server warning. The default [25, 50, 75] would otherwise strip the
  // requested quality.
  images: {
    qualities: [25, 50, 75, 90],
  },
};

export default nextConfig;

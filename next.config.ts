import type { NextConfig } from "next";

/**
 * BASE_PATH is only needed when the site lives in a sub-folder,
 * e.g. https://username.github.io/the-archive-portfolio
 * The GitHub Pages workflow sets it for you automatically.
 * Leave it empty for Vercel, Netlify or a custom domain.
 */
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

import type { NextConfig } from "next";

const isPresentationMode = process.env.PRESENTATION_MODE === "true";
const repoName = (process.env.GITHUB_REPOSITORY || "").split("/")[1] || "";
const isRepoPages = process.env.GITHUB_PAGES === "true" && repoName.length > 0;

const nextConfig: NextConfig = {
  ...(isPresentationMode ? { output: "export" } : {}),
  ...(isRepoPages ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}` } : {}),
  images: {
    unoptimized: true
  }
};

export default nextConfig;

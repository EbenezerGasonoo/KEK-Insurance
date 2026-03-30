import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Monorepo root (single package-lock.json at repo root). Aligns Turbopack with npm workspaces. */
const monorepoRoot = path.resolve(__dirname, "../..");

const isPresentationMode = process.env.PRESENTATION_MODE === "true";
const repoName = (process.env.GITHUB_REPOSITORY || "").split("/")[1] || "";
const isRepoPages = process.env.GITHUB_PAGES === "true" && repoName.length > 0;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: monorepoRoot
  },
  ...(isPresentationMode ? { output: "export" } : {}),
  ...(isRepoPages ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}` } : {}),
  images: {
    unoptimized: true
  }
};

export default nextConfig;

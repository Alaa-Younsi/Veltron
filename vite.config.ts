import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { vercelApiDev } from "./tooling/vercel-api-dev.ts";

/**
 * Resolves the canonical site origin:
 * 1. VITE_SITE_URL (set this once the custom domain is live)
 * 2. Vercel's production domain (system env, available at build time)
 * 3. Local dev server
 */
function resolveSiteUrl(env: Record<string, string>): string {
  const explicit = env.VITE_SITE_URL || process.env.VITE_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:5173";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [tailwindcss(), reactRouter(), vercelApiDev()],
    define: {
      __SITE_URL__: JSON.stringify(resolveSiteUrl(env)),
    },
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: 5173,
    },
  };
});

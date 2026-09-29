import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { SITE_ORIGIN } from "./shared/site.ts";
import { vercelApiDev } from "./tooling/vercel-api-dev.ts";

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss(), reactRouter(), vercelApiDev()],
  build: {
    // The only chunk above Vite's 500 kB default is the three.js globe, which is
    // code-split and fetched after the visitor's first interaction.
    chunkSizeWarningLimit: 600,
  },
  define: {
    // Canonical origin baked into every pre-rendered page. Production builds always
    // use the official domain (shared/site.ts) — no environment variable can leak
    // another host into canonical URLs, hreflang, the sitemap or Open Graph.
    __SITE_URL__: JSON.stringify(command === "build" ? SITE_ORIGIN : "http://localhost:5173"),
  },
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 5173,
  },
}));

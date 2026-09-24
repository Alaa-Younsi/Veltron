import type { Config } from "@react-router/dev/config";
import { allLocalizedPaths } from "./app/config/paths";

export default {
  // Fully static output: every page is pre-rendered to HTML at build time and
  // hydrated in the browser. The only runtime code is the Vercel Function in /api.
  ssr: false,
  prerender: {
    paths: ["/", "/sitemap.xml", "/robots.txt", ...allLocalizedPaths()],
    concurrency: 4,
  },
} satisfies Config;

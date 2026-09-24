/**
 * Post-build step for static hosting (Vercel):
 *  - Publishes React Router's SPA fallback as `404.html`, so unknown URLs get a
 *    real 404 status while still rendering the branded, localized 404 view.
 *  - Sanity-checks that every localized page was pre-rendered.
 */
import { access, copyFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allLocalizedPaths } from "../app/config/paths";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const client = join(root, "build/client");

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const fallback = join(client, "__spa-fallback.html");
  if (!(await exists(fallback))) throw new Error("SPA fallback not found — did the build succeed?");
  await copyFile(fallback, join(client, "404.html"));
  await rm(fallback);

  const missing: string[] = [];
  for (const path of ["/", ...allLocalizedPaths()]) {
    if (!(await exists(join(client, path, "index.html")))) missing.push(path);
  }
  for (const file of ["sitemap.xml", "robots.txt"]) {
    if (!(await exists(join(client, file)))) missing.push(`/${file}`);
  }
  if (missing.length > 0) throw new Error(`Missing pre-rendered output:\n${missing.join("\n")}`);

  console.log(
    `✔ Post-build complete — ${allLocalizedPaths().length + 1} pages verified, 404.html published`,
  );
}

await main();

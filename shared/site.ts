/**
 * Production domain — the single source of truth for every absolute URL:
 * canonical links, hreflang, sitemap, robots.txt, Open Graph, structured data
 * and transactional emails. The apex domain is canonical; `www` redirects to it.
 *
 * Dependency-free: imported by the Vite config, the web app and the API.
 */
export const SITE_DOMAIN = "veltrontrading.com";
export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;

/** Public business email shown on the website and in visitor confirmations. */
export const CONTACT_EMAIL = `contact@${SITE_DOMAIN}`;

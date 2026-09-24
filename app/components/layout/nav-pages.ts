import type { PageKey } from "~/config/paths";

/** Top-level navigation order (the home page is reached via the logo). */
export const NAV_PAGES = [
  "about",
  "products",
  "logistics",
  "markets",
  "quality",
  "contact",
] as const satisfies readonly PageKey[];

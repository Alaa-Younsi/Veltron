/**
 * Canonical URL structure: `/{locale}/{page}`. Slugs are shared across
 * languages so switching language keeps the visitor on the same page.
 */
import { PRODUCT_SLUGS, type ProductSlug } from "../../shared/catalog";
import { LOCALES, type Locale } from "../../shared/locales";

export const PAGES = {
  home: "",
  about: "about",
  products: "products",
  logistics: "trade-logistics",
  markets: "markets",
  quality: "quality",
  contact: "contact",
} as const;

export type PageKey = keyof typeof PAGES;

export function pagePath(locale: Locale, page: PageKey): string {
  const slug = PAGES[page];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function productPath(locale: Locale, slug: ProductSlug): string {
  return `/${locale}/${PAGES.products}/${slug}`;
}

/** Swaps the locale segment of a pathname, preserving the rest of the URL. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const tail = (LOCALES as readonly string[]).includes(first ?? "") ? rest : [first, ...rest];
  const suffix = tail.filter(Boolean).join("/");
  return suffix ? `/${target}/${suffix}` : `/${target}`;
}

/** Locale-independent path suffixes of every indexable page. */
export function allPageSuffixes(): string[] {
  return [
    ...Object.values(PAGES).map((slug) => (slug ? `/${slug}` : "")),
    ...PRODUCT_SLUGS.map((slug) => `/${PAGES.products}/${slug}`),
  ];
}

/** Every localized, indexable URL path — used for pre-rendering and the sitemap. */
export function allLocalizedPaths(): string[] {
  return LOCALES.flatMap((locale) => allPageSuffixes().map((suffix) => `/${locale}${suffix}`));
}

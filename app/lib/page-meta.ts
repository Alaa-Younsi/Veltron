import type { MetaDescriptor } from "react-router";
import type { Locale } from "~/i18n/config";
import { breadcrumbJsonLd, buildMeta } from "./seo";

type PageLoaderData = {
  locale: Locale;
  meta: { titleSuffix: string; siteName: string };
  page: { title: string; description: string };
  homeLabel: string;
};

/**
 * Standard metadata for inner pages (title, description, canonical,
 * hreflang, Open Graph and a BreadcrumbList).
 */
export function innerPageMeta(
  data: PageLoaderData | undefined,
  pathSuffix: string,
  trail: { name: string; suffix: string }[] = [],
): MetaDescriptor[] {
  if (!data) return [];
  const { locale, meta, page, homeLabel } = data;
  return buildMeta({
    locale,
    title: page.title,
    description: page.description,
    pathSuffix,
    titleSuffix: meta.titleSuffix,
    siteName: meta.siteName,
    jsonLd: [
      breadcrumbJsonLd([
        { name: homeLabel, path: `/${locale}` },
        ...trail.map((t) => ({ name: t.name, path: `/${locale}${t.suffix}` })),
        { name: page.title, path: `/${locale}${pathSuffix}` },
      ]),
    ],
  });
}

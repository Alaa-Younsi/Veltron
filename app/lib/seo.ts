import type { MetaDescriptor } from "react-router";
import { absoluteUrl, SITE } from "~/config/site";
import { LOCALE_META, LOCALES, type Locale } from "~/i18n/config";

type BuildMetaInput = {
  locale: Locale;
  /** Page title without the brand suffix. */
  title: string;
  description: string;
  /** Locale-independent path suffix, e.g. "/about" or "" for home. */
  pathSuffix: string;
  /** Brand suffix from the dictionary. */
  titleSuffix: string;
  siteName: string;
  isHome?: boolean;
  jsonLd?: Record<string, unknown>[];
};

/** Complete, consistent `<head>` metadata for a localized page. */
export function buildMeta(input: BuildMetaInput): MetaDescriptor[] {
  const url = absoluteUrl(`/${input.locale}${input.pathSuffix}`);
  const fullTitle = input.isHome
    ? `${input.titleSuffix} — ${input.title}`
    : `${input.title} | ${input.titleSuffix}`;
  const image = absoluteUrl(SITE.ogImage);

  const alternates: MetaDescriptor[] = [
    ...LOCALES.map((l) => ({
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: LOCALE_META[l].hreflang,
      href: absoluteUrl(`/${l}${input.pathSuffix}`),
    })),
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: absoluteUrl(`/en${input.pathSuffix}`),
    },
  ];

  return [
    { title: fullTitle },
    { name: "description", content: input.description },
    { tagName: "link", rel: "canonical", href: url },
    ...alternates,
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: input.siteName },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: SITE.name },
    { property: "og:locale", content: LOCALE_META[input.locale].ogLocale },
    ...LOCALES.filter((l) => l !== input.locale).map((l) => ({
      property: "og:locale:alternate",
      content: LOCALE_META[l].ogLocale,
    })),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
    ...(input.jsonLd ?? []).map((schema) => ({ "script:ld+json": schema })),
  ];
}

/** schema.org Organization — rendered on the home page. */
export function organizationJsonLd(description: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl("/brand/veltron-logo.png"),
    image: absoluteUrl(SITE.ogImage),
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    ...(SITE.contact.email ? { email: SITE.contact.email } : {}),
    ...(SITE.contact.phone ? { telephone: SITE.contact.phone } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

import { allPageSuffixes } from "~/config/paths";
import { absoluteUrl } from "~/config/site";
import { LOCALE_META, LOCALES } from "~/i18n/config";

/** `/sitemap.xml` — pre-rendered at build time, with hreflang alternates. */
export function loader() {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls = allPageSuffixes().flatMap((suffix) =>
    LOCALES.map((locale) => {
      const alternates = [
        ...LOCALES.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${absoluteUrl(`/${l}${suffix}`)}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(`/en${suffix}`)}"/>`,
      ].join("\n");
      return `  <url>
    <loc>${absoluteUrl(`/${locale}${suffix}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${suffix === "" ? "1.0" : "0.8"}</priority>
${alternates}
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

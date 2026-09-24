import { Info } from "lucide-react";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { ProductCard } from "~/components/sections/product-card";
import { Reveal } from "~/components/ui/reveal";
import { PAGES, pagePath, productPath } from "~/config/paths";
import { PRODUCT_MEDIA } from "~/content/media";
import { getDictionary, requireLocale } from "~/i18n/server";
import { innerPageMeta } from "~/lib/page-meta";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import { cn } from "~/lib/utils";
import { PRODUCT_SLUGS } from "~shared/catalog";
import type { Route } from "./+types/products";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return {
    locale,
    meta: dict.meta,
    homeLabel: dict.common.labels.home,
    page: dict.pages.products,
    products: PRODUCT_SLUGS.map((slug) => ({
      slug,
      name: dict.products[slug].name,
      short: dict.products[slug].short,
      highlights: dict.products[slug].highlights,
    })),
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  innerPageMeta(loaderData, `/${PAGES.products}`);

export const shouldRevalidate = revalidateOnLocaleChange;

export default function Products({ loaderData }: Route.ComponentProps) {
  const { page, products, locale, homeLabel } = loaderData;

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image="clinker-stockpile"
        crumbs={[{ label: homeLabel, to: pagePath(locale, "home") }, { label: page.title }]}
        breadcrumbLabel={homeLabel}
      />

      <section className="container-page py-24 sm:py-28">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {products.map((product, index) => (
            <Reveal
              as="li"
              key={product.slug}
              delay={(index % 3) * 0.07}
              className={cn("flex flex-col", index < 2 ? "lg:col-span-3" : "lg:col-span-2")}
            >
              <ProductCard
                to={productPath(locale, product.slug)}
                index={index + 1}
                name={product.name}
                text={product.short}
                image={PRODUCT_MEDIA[product.slug].cover}
                featured={index < 2}
                sizes={
                  index < 2
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                }
                className="w-full lg:min-h-[26rem]"
              />
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-ink-600 text-xs"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex items-start gap-3 rounded-2xl border border-gold-500/25 bg-gold-50 p-5 text-ink-600 text-sm">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-700" />
          <p>{page.standardsNote}</p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

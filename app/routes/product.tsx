import { Anchor, Boxes, Check, Factory, Info } from "lucide-react";
import type { ReactNode } from "react";
import { data } from "react-router";
import { PageHero } from "~/components/sections/page-hero";
import { ProductCard } from "~/components/sections/product-card";
import { ButtonLink } from "~/components/ui/button";
import { Eyebrow } from "~/components/ui/eyebrow";
import { Picture } from "~/components/ui/picture";
import { Reveal } from "~/components/ui/reveal";
import { PAGES, pagePath, productPath } from "~/config/paths";
import { PRODUCT_MEDIA } from "~/content/media";
import { getDictionary, requireLocale } from "~/i18n/server";
import { innerPageMeta } from "~/lib/page-meta";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import { interpolate } from "~/lib/utils";
import { isProductSlug, PRODUCT_SLUGS } from "~shared/catalog";
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  if (!isProductSlug(params.slug)) throw data(null, { status: 404 });
  const slug = params.slug;
  const dict = getDictionary(locale);
  const product = dict.products[slug];

  return {
    locale,
    slug,
    meta: dict.meta,
    homeLabel: dict.common.labels.home,
    productsLabel: dict.pages.products.title,
    labels: dict.pages.products.detail,
    standardsNote: dict.pages.products.standardsNote,
    requestQuote: dict.common.cta.requestQuote,
    product,
    page: {
      title: product.name,
      description: `${product.short} ${product.intro[0] ?? ""}`.slice(0, 300),
    },
    related: PRODUCT_SLUGS.filter((s) => s !== slug)
      .slice(0, 3)
      .map((s) => ({ slug: s, name: dict.products[s].name, short: dict.products[s].short })),
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  loaderData
    ? innerPageMeta(loaderData, `/${PAGES.products}/${loaderData.slug}`, [
        { name: loaderData.productsLabel, suffix: `/${PAGES.products}` },
      ])
    : [];

export const shouldRevalidate = revalidateOnLocaleChange;

export default function Product({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    slug,
    product,
    labels,
    homeLabel,
    productsLabel,
    related,
    requestQuote,
    standardsNote,
  } = loaderData;
  const media = PRODUCT_MEDIA[slug];
  const quoteHref = `${pagePath(locale, "contact")}?product=${slug}`;

  return (
    <>
      <PageHero
        eyebrow={product.tagline}
        title={product.name}
        text={product.short}
        image={media.cover}
        crumbs={[
          { label: homeLabel, to: pagePath(locale, "home") },
          { label: productsLabel, to: pagePath(locale, "products") },
          { label: product.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink to={quoteHref} variant="gold" size="lg" arrow>
            {requestQuote}
          </ButtonLink>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-ink-200 text-sm">
                <Check aria-hidden="true" className="size-4 text-gold-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <section className="container-page grid gap-16 py-24 sm:py-28 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-20 lg:col-span-8">
          {/* Overview */}
          <Reveal className="flex flex-col gap-6">
            <Eyebrow>{labels.overview}</Eyebrow>
            {product.intro.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 32)}
                className={
                  index === 0
                    ? "font-display font-medium text-2xl text-ink-900 leading-snug tracking-tight"
                    : "text-ink-500 text-lg leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          {/* Grades */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <h2 className="font-semibold text-2xl tracking-tight sm:text-3xl">{labels.grades}</h2>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.grades.map((grade, index) => (
                <Reveal
                  as="li"
                  key={grade.name}
                  delay={index * 0.05}
                  className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-6"
                >
                  <span className="flex items-center gap-2.5 font-display font-semibold text-ink-900">
                    <span aria-hidden="true" className="size-2 rotate-45 bg-gold-500" />
                    <bdi>{grade.name}</bdi>
                  </span>
                  <span className="text-ink-500 text-sm leading-relaxed">{grade.detail}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <Reveal className="flex flex-col gap-6">
            <h2 className="font-semibold text-2xl tracking-tight sm:text-3xl">
              {product.specsTitle}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <table className="w-full text-start text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr
                      key={spec.label}
                      className="border-line border-b last:border-b-0 odd:bg-paper/60"
                    >
                      <th
                        scope="row"
                        className="w-1/2 px-6 py-4 text-start font-medium text-ink-600"
                      >
                        {spec.label}
                      </th>
                      <td className="px-6 py-4 font-semibold text-ink-900">
                        <bdi>{spec.value}</bdi>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex items-start gap-2 text-ink-500 text-xs leading-relaxed">
              <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {standardsNote}
            </p>
          </Reveal>

          <Reveal className="overflow-hidden rounded-[1.75rem]">
            <Picture
              name={media.detail}
              alt=""
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="aspect-[16/9]"
            />
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <SidebarList
              icon={<Boxes className="size-5" />}
              title={labels.packaging}
              items={product.packaging}
            />
            <SidebarList
              icon={<Anchor className="size-5" />}
              title={labels.shipping}
              items={product.shipping}
            />
            <SidebarList
              icon={<Factory className="size-5" />}
              title={labels.applications}
              items={product.applications}
            />

            <div className="relative overflow-hidden rounded-[1.5rem] bg-ink-950 p-7 text-white">
              <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
              <div className="relative flex flex-col gap-4">
                <h2 className="font-semibold text-white text-xl">
                  {interpolate(labels.quoteTitle, { product: product.name })}
                </h2>
                <p className="text-ink-200 text-sm leading-relaxed">{labels.quoteText}</p>
                <ButtonLink to={quoteHref} variant="gold" arrow className="mt-2 self-start">
                  {requestQuote}
                </ButtonLink>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Related */}
      <section className="border-line border-t bg-sand/50 py-24">
        <div className="container-page">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-semibold text-3xl tracking-tight">{labels.related}</h2>
            <ButtonLink to={pagePath(locale, "products")} variant="outline" size="sm" arrow>
              {labels.backToProducts}
            </ButtonLink>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal as="li" key={item.slug} delay={index * 0.07} className="flex">
                <ProductCard
                  to={productPath(locale, item.slug)}
                  index={PRODUCT_SLUGS.indexOf(item.slug) + 1}
                  name={item.name}
                  text={item.short}
                  image={PRODUCT_MEDIA[item.slug].cover}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function SidebarList({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <Reveal className="rounded-[1.5rem] border border-line bg-white p-7">
      <h2 className="flex items-center gap-3 font-semibold text-ink-900 text-lg">
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-xl bg-gold-50 text-gold-700"
        >
          {icon}
        </span>
        {title}
      </h2>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ink-600 text-sm leading-relaxed">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-600" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

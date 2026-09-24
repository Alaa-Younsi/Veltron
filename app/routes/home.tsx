import { CtaBand } from "~/components/sections/cta-band";
import { HomeHero } from "~/components/sections/home/home-hero";
import { Marquee } from "~/components/sections/home/marquee";
import { ProductsShowcase } from "~/components/sections/home/products-showcase";
import { QuoteSection } from "~/components/sections/home/quote-section";
import { ReachSection } from "~/components/sections/home/reach-section";
import { StatsBand } from "~/components/sections/home/stats-band";
import { WhySection } from "~/components/sections/home/why-section";
import { ProcessTimeline } from "~/components/sections/process-timeline";
import { SITE } from "~/config/site";
import { getDictionary, requireLocale } from "~/i18n/server";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import { buildMeta, organizationJsonLd } from "~/lib/seo";
import type { Route } from "./+types/home";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return { locale, page: dict.pages.home, meta: dict.meta };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];
  const { locale, page, meta } = loaderData;
  return buildMeta({
    locale,
    title: page.title,
    description: page.description,
    pathSuffix: "",
    titleSuffix: meta.titleSuffix,
    siteName: meta.siteName,
    isHome: true,
    jsonLd: [
      organizationJsonLd(meta.defaultDescription),
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: locale,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  });
};

export const shouldRevalidate = revalidateOnLocaleChange;

export default function Home({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;

  return (
    <>
      <HomeHero content={page.hero} />
      <Marquee items={page.marquee} />
      <ProductsShowcase heading={page.productsSection} />
      <StatsBand stats={page.stats} />
      <WhySection content={page.why} />
      <ProcessTimeline
        eyebrow={page.process.eyebrow}
        title={page.process.title}
        steps={page.process.steps}
      />
      <ReachSection content={page.reach} mapLabel={page.hero.mapCaption} />
      <QuoteSection text={page.quote.text} author={page.quote.author} />
      <CtaBand />
    </>
  );
}

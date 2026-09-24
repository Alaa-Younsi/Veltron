import { MapPin } from "lucide-react";
import { useState } from "react";
import { TradeMap } from "~/components/map/trade-map";
import { SpotlightGroup } from "~/components/motion/spotlight-group";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import { PAGES, pagePath } from "~/config/paths";
import { GEO_POINTS, type RegionId } from "~/content/geo";
import { getDictionary, requireLocale } from "~/i18n/server";
import { innerPageMeta } from "~/lib/page-meta";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/markets";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return { locale, page: dict.pages.markets, meta: dict.meta, homeLabel: dict.common.labels.home };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  innerPageMeta(loaderData, `/${PAGES.markets}`);

export const shouldRevalidate = revalidateOnLocaleChange;

function portsOf(region: RegionId): string[] {
  return GEO_POINTS.filter((p) => p.kind === "destination" && p.region === region).map(
    (p) => p.name,
  );
}

export default function Markets({ loaderData }: Route.ComponentProps) {
  const { page, locale, homeLabel } = loaderData;
  const [active, setActive] = useState<RegionId | null>(null);
  const regions = Object.entries(page.regions) as [RegionId, { name: string; text: string }][];

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image="bulk-carrier-2"
        crumbs={[{ label: homeLabel, to: pagePath(locale, "home") }, { label: page.title }]}
        breadcrumbLabel={homeLabel}
      />

      <section className="relative overflow-hidden bg-ink-950 pt-16 pb-24 text-white sm:pb-32">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-50" />
        <div className="container-page relative">
          <Reveal className="text-ink-500">
            <TradeMap label={page.hero.title} activeRegion={active} showLabels />
          </Reveal>

          <ul className="mt-6 flex flex-wrap justify-center gap-6 text-ink-300 text-xs">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3 rounded-full bg-gold-400" />
              {page.mapLegend.hub}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3 rounded-full border-2 border-gold-400" />
              {page.mapLegend.origin}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3 rounded-full bg-white" />
              {page.mapLegend.destination}
            </li>
          </ul>

          <div className="mt-20">
            <SectionHeading title={page.regionsTitle} tone="light" />
            <SpotlightGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {regions.map(([id, region], index) => {
                const selected = active === id;
                return (
                  <Reveal as="li" key={id} delay={(index % 4) * 0.06} className="flex">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActive(selected ? null : id)}
                      onMouseEnter={() => setActive(id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(id)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "spotlight spotlight-dark flex w-full flex-col gap-4 rounded-[1.5rem] border p-7 text-start transition-all duration-500 ease-out-expo",
                        selected
                          ? "border-gold-400/60 bg-gold-500/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25",
                      )}
                    >
                      <span className="font-display font-semibold text-lg text-white">
                        {region.name}
                      </span>
                      <span className="text-ink-300 text-sm leading-relaxed">{region.text}</span>
                      <span className="mt-auto flex flex-col gap-2 border-white/10 border-t pt-4">
                        <span className="text-[11px] text-gold-300 uppercase tracking-eyebrow">
                          {page.portsLabel}
                        </span>
                        <span className="flex flex-wrap gap-1.5">
                          {portsOf(id).map((port) => (
                            <span
                              key={port}
                              className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-1 text-ink-200 text-xs"
                            >
                              <MapPin aria-hidden="true" className="size-3 text-gold-400" />
                              <bdi>{port}</bdi>
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                  </Reveal>
                );
              })}
              <Reveal
                as="li"
                delay={0.18}
                className="flex flex-col justify-center gap-4 rounded-[1.5rem] bg-gold-500 p-7 text-ink-950"
              >
                <span className="font-display font-semibold text-lg">{page.originsTitle}</span>
                <span className="text-ink-900 text-sm leading-relaxed">{page.originsText}</span>
              </Reveal>
            </SpotlightGroup>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

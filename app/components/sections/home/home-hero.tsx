import { Check } from "lucide-react";
import { TradeGlobe } from "~/components/globe/trade-globe";
import { ButtonLink } from "~/components/ui/button";
import { Eyebrow } from "~/components/ui/eyebrow";
import { pagePath } from "~/config/paths";
import type { Dictionary } from "~/i18n/dictionaries/en";
import { useLocaleContext } from "~/i18n/use-locale";
import { cn } from "~/lib/utils";

type HomeContent = Dictionary["pages"]["home"];
type HomeHeroProps = { content: HomeContent["hero"]; stats: HomeContent["stats"] };

export function HomeHero({ content, stats }: HomeHeroProps) {
  const { locale, common } = useLocaleContext();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
      <div
        aria-hidden="true"
        className="absolute end-[-12%] -top-64 -z-10 size-[52rem] rounded-full bg-gold-500/[0.09] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute start-[-18%] -bottom-72 -z-10 size-[48rem] rounded-full bg-ink-500/20 blur-3xl"
      />

      <div className="container-page relative grid min-h-svh grid-rows-[1fr_auto] pt-28 pb-10 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 flex flex-col gap-7 lg:col-span-6">
            <Eyebrow tone="light" className="animate-rise">
              {content.eyebrow}
            </Eyebrow>
            <h1 className="animate-rise font-semibold text-[2.5rem] text-white leading-[1.05] tracking-tight [animation-delay:120ms] sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem]">
              <span className="block">{content.titleLead}</span>
              <span className="block text-gold-gradient">{content.titleAccent}</span>
              <span className="block text-ink-200">{content.titleTail}</span>
            </h1>
            <p className="max-w-xl animate-rise text-ink-200 text-lg leading-relaxed [animation-delay:240ms]">
              {content.text}
            </p>
            <div className="flex animate-rise flex-wrap gap-3 [animation-delay:340ms]">
              <ButtonLink to={pagePath(locale, "contact")} variant="gold" size="lg" arrow magnetic>
                {common.cta.requestQuote}
              </ButtonLink>
              <ButtonLink to={pagePath(locale, "products")} variant="outline-light" size="lg">
                {common.cta.exploreProducts}
              </ButtonLink>
            </div>
            <ul className="mt-2 flex animate-rise flex-wrap gap-x-6 gap-y-3 [animation-delay:440ms]">
              {content.badges.map((badge) => (
                <li key={badge} className="flex items-center gap-2 text-ink-200 text-sm">
                  <span className="grid size-5 place-items-center rounded-full bg-gold-500/15 text-gold-300">
                    <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                  </span>
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative mx-auto w-full max-w-[36rem] animate-fade [animation-delay:200ms] lg:col-span-6 lg:max-w-none xl:ps-6">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] -z-10 rounded-full bg-radial from-gold-500/15 via-ink-600/20 to-70% to-transparent blur-2xl"
            />
            <TradeGlobe label={content.mapCaption} />

            {stats.slice(0, 2).map((stat, index) => (
              <div
                key={stat.label}
                aria-hidden="true"
                className={cn(
                  "absolute hidden animate-float items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/55 px-4 py-3 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)] backdrop-blur-md sm:flex",
                  index === 0 ? "start-0 top-[12%]" : "end-0 bottom-[16%] [animation-delay:-3s]",
                )}
              >
                <span className="ltr-nums font-display font-semibold text-3xl text-gold-gradient leading-none">
                  {stat.value}
                </span>
                <span className="max-w-[7.5rem] text-ink-200 text-xs leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}

            <figcaption className="mt-2 flex items-center justify-center gap-2 text-ink-300 text-xs">
              <span aria-hidden="true" className="size-2 rounded-full bg-gold-400" />
              {content.mapCaption}
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 hidden items-center gap-4 text-ink-400 text-xs uppercase tracking-eyebrow lg:flex">
          <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-4 animate-scroll-cue bg-gold-400" />
          </span>
          {content.scroll}
        </div>
      </div>
    </section>
  );
}

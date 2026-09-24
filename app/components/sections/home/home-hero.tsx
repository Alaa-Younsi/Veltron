import { Check } from "lucide-react";
import { TradeMap } from "~/components/map/trade-map";
import { ButtonLink } from "~/components/ui/button";
import { Eyebrow } from "~/components/ui/eyebrow";
import { pagePath } from "~/config/paths";
import type { Dictionary } from "~/i18n/dictionaries/en";
import { useLocaleContext } from "~/i18n/use-locale";

type HomeHeroProps = { content: Dictionary["pages"]["home"]["hero"] };

export function HomeHero({ content }: HomeHeroProps) {
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
              <ButtonLink to={pagePath(locale, "contact")} variant="gold" size="lg" arrow>
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

          <figure className="relative animate-fade text-ink-400/80 [animation-delay:200ms] lg:col-span-6 lg:-me-10 xl:-me-20">
            <div
              className="absolute inset-0 -z-10 rounded-full bg-radial from-ink-600/25 to-70% to-transparent"
              aria-hidden="true"
            />
            <TradeMap label={content.mapCaption} />
            <figcaption className="mt-4 flex items-center justify-center gap-5 text-ink-300 text-xs">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full bg-gold-400" />
                {content.mapCaption}
              </span>
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

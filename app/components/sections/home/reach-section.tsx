import { TradeMap } from "~/components/map/trade-map";
import { ButtonLink } from "~/components/ui/button";
import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import { pagePath } from "~/config/paths";
import type { Dictionary } from "~/i18n/dictionaries/en";
import { useLocaleContext } from "~/i18n/use-locale";

type ReachSectionProps = {
  content: Dictionary["pages"]["home"]["reach"];
  mapLabel: string;
};

export function ReachSection({ content, mapLabel }: ReachSectionProps) {
  const { locale } = useLocaleContext();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            text={content.text}
            tone="light"
          >
            <div className="mt-4">
              <ButtonLink to={pagePath(locale, "markets")} variant="outline-light" arrow>
                {content.cta}
              </ButtonLink>
            </div>
          </SectionHeading>
        </div>
        <Reveal delay={0.1} className="text-ink-600 lg:col-span-8">
          <TradeMap label={mapLabel} />
        </Reveal>
      </div>
    </section>
  );
}

import { ButtonLink } from "~/components/ui/button";
import { Eyebrow } from "~/components/ui/eyebrow";
import { Picture } from "~/components/ui/picture";
import { Reveal } from "~/components/ui/reveal";
import { pagePath } from "~/config/paths";
import { useLocaleContext } from "~/i18n/use-locale";

/** Closing call-to-action shown at the end of most pages. */
export function CtaBand() {
  const { locale, common } = useLocaleContext();

  return (
    <section className="container-page py-20 sm:py-28">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-16 text-white sm:px-14 sm:py-20 lg:px-20">
        <Picture
          name="port-dusk"
          alt=""
          sizes="(min-width: 1320px) 1240px, 100vw"
          className="absolute inset-0 -z-20"
          imgClassName="opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950 via-ink-950/85 to-ink-950/30 rtl:bg-linear-to-l"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow tone="light">{common.ctaBand.eyebrow}</Eyebrow>
          <h2 className="font-semibold text-3xl text-white leading-tight tracking-tight sm:text-4xl">
            {common.ctaBand.title}
          </h2>
          <p className="text-ink-200 leading-relaxed sm:text-lg">{common.ctaBand.text}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <ButtonLink to={pagePath(locale, "contact")} variant="gold" size="lg" arrow magnetic>
              {common.cta.requestQuote}
            </ButtonLink>
            <ButtonLink to={pagePath(locale, "products")} variant="outline-light" size="lg">
              {common.cta.exploreProducts}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

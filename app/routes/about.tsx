import { Compass, Handshake, Scale, ShieldCheck, Target, Timer } from "lucide-react";
import { SpotlightGroup } from "~/components/motion/spotlight-group";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { AddressLines } from "~/components/ui/address-lines";
import { Eyebrow } from "~/components/ui/eyebrow";
import { Picture } from "~/components/ui/picture";
import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import { PAGES, pagePath } from "~/config/paths";
import { SITE } from "~/config/site";
import { getDictionary, requireLocale } from "~/i18n/server";
import { innerPageMeta } from "~/lib/page-meta";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import type { Route } from "./+types/about";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return { locale, page: dict.pages.about, meta: dict.meta, homeLabel: dict.common.labels.home };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  innerPageMeta(loaderData, `/${PAGES.about}`);

export const shouldRevalidate = revalidateOnLocaleChange;

const VALUE_ICONS = {
  integrity: Scale,
  reliability: Timer,
  transparency: ShieldCheck,
  partnership: Handshake,
} as const;

export default function About({ loaderData }: Route.ComponentProps) {
  const { page, locale, homeLabel } = loaderData;
  const values = Object.entries(page.values.items) as [
    keyof typeof VALUE_ICONS,
    { title: string; text: string },
  ][];

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image="hong-kong-harbour"
        crumbs={[{ label: homeLabel, to: pagePath(locale, "home") }, { label: page.title }]}
      />

      {/* Story */}
      <section className="container-page grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={page.story.eyebrow} title={page.story.title} />
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[1.75rem]">
            <Picture
              name="port-bluehour"
              alt=""
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5]"
            />
          </Reveal>
        </div>
        <div className="flex flex-col gap-10 lg:col-span-7 lg:pt-24">
          {page.story.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 32)} delay={index * 0.06}>
              <p
                className={
                  index === 0
                    ? "font-display font-medium text-2xl text-ink-900 leading-snug tracking-tight sm:text-[1.75rem]"
                    : "text-ink-500 text-lg leading-relaxed"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Target, ...page.mission },
              { icon: Compass, ...page.vision },
            ].map(({ icon: Icon, title, text }, index) => (
              <Reveal
                key={title}
                delay={index * 0.08}
                className="relative overflow-hidden rounded-[1.5rem] bg-ink-950 p-8 text-white"
              >
                <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
                <div className="relative flex flex-col gap-4">
                  <Icon aria-hidden="true" className="size-7 text-gold-400" strokeWidth={1.6} />
                  <h3 className="font-semibold text-white text-xl">{title}</h3>
                  <p className="text-ink-200 leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand/60 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading eyebrow={page.values.eyebrow} title={page.values.title} align="center" />
          <SpotlightGroup as="ul" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([key, value], index) => {
              const Icon = VALUE_ICONS[key];
              return (
                <Reveal
                  as="li"
                  key={key}
                  delay={index * 0.07}
                  className="spotlight group flex flex-col gap-5 rounded-[1.5rem] border border-line bg-white p-8 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                >
                  <span className="grid size-12 place-items-center rounded-full border border-gold-500/40 text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-ink-950">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="font-semibold text-ink-900 text-xl">{value.title}</h3>
                  <p className="text-ink-500 leading-relaxed">{value.text}</p>
                </Reveal>
              );
            })}
          </SpotlightGroup>
        </div>
      </section>

      {/* Headquarters */}
      <section className="container-page py-24 sm:py-32">
        <div className="grid overflow-hidden rounded-[2rem] bg-ink-950 text-white lg:grid-cols-2">
          <Picture
            name="hong-kong-night"
            alt=""
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="min-h-80"
            imgClassName="opacity-90"
          />
          <Reveal className="flex flex-col justify-center gap-6 p-8 sm:p-14">
            <Eyebrow tone="light">{page.hq.eyebrow}</Eyebrow>
            <h2 className="font-semibold text-3xl text-white tracking-tight sm:text-4xl">
              {page.hq.title}
            </h2>
            <p className="text-ink-200 leading-relaxed">{page.hq.text}</p>
            <address className="mt-2 border-white/10 border-t pt-6 text-ink-300 text-sm not-italic leading-relaxed">
              <span className="block font-semibold text-white">
                <bdi>{SITE.legalName}</bdi>
              </span>
              <AddressLines />
            </address>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

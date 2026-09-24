import { Ban, Leaf, type LucideIcon, ScanSearch, UserCheck } from "lucide-react";
import { SpotlightGroup } from "~/components/motion/spotlight-group";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { ProcessTimeline } from "~/components/sections/process-timeline";
import { Picture } from "~/components/ui/picture";
import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import { PAGES, pagePath } from "~/config/paths";
import type { Dictionary } from "~/i18n/dictionaries/en";
import { getDictionary, requireLocale } from "~/i18n/server";
import { innerPageMeta } from "~/lib/page-meta";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import type { Route } from "./+types/quality";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return { locale, page: dict.pages.quality, meta: dict.meta, homeLabel: dict.common.labels.home };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  innerPageMeta(loaderData, `/${PAGES.quality}`);

export const shouldRevalidate = revalidateOnLocaleChange;

type ComplianceKey = keyof Dictionary["pages"]["quality"]["compliance"]["items"];

const COMPLIANCE_ICONS: Record<ComplianceKey, LucideIcon> = {
  kyc: UserCheck,
  sanctions: ScanSearch,
  antiBribery: Ban,
  environment: Leaf,
};

export default function Quality({ loaderData }: Route.ComponentProps) {
  const { page, locale, homeLabel } = loaderData;
  const compliance = Object.entries(page.compliance.items) as [
    ComplianceKey,
    { title: string; text: string },
  ][];

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image="site-inspection"
        crumbs={[{ label: homeLabel, to: pagePath(locale, "home") }, { label: page.title }]}
      />

      <ProcessTimeline
        eyebrow={page.process.eyebrow}
        title={page.process.title}
        steps={page.process.steps}
        columns={6}
      />

      {/* Standards */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow={page.standards.eyebrow}
            title={page.standards.title}
            tone="light"
          />
          <SpotlightGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.standards.items.map((standard, index) => (
              <Reveal
                as="li"
                key={standard.code}
                delay={(index % 3) * 0.07}
                className="spotlight spotlight-dark flex items-center gap-6 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="ltr-nums shrink-0 font-display font-semibold text-gold-300 text-xl">
                  {standard.code}
                </span>
                <span className="h-8 w-px bg-white/10" aria-hidden="true" />
                <span className="text-ink-200 text-sm leading-snug">{standard.text}</span>
              </Reveal>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* Compliance */}
      <section className="container-page grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={page.compliance.eyebrow} title={page.compliance.title} />
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[1.75rem]">
            <Picture
              name="port-bluehour"
              alt=""
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3]"
            />
          </Reveal>
        </div>
        <ul className="flex flex-col divide-y divide-line lg:col-span-7">
          {compliance.map(([key, item], index) => {
            const Icon = COMPLIANCE_ICONS[key];
            return (
              <Reveal as="li" key={key} delay={index * 0.06} className="flex gap-6 py-8 first:pt-0">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink-900 text-gold-300">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-ink-900 text-xl">{item.title}</h3>
                  <p className="text-ink-500 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}

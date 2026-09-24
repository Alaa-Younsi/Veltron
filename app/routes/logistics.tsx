import {
  Anchor,
  Check,
  ClipboardCheck,
  Container,
  FileText,
  Landmark,
  type LucideIcon,
  Minus,
  Package,
  Search,
  Ship,
} from "lucide-react";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { Picture } from "~/components/ui/picture";
import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import { PAGES, pagePath } from "~/config/paths";
import type { Dictionary } from "~/i18n/dictionaries/en";
import { getDictionary, requireLocale } from "~/i18n/server";
import type { ImageName } from "~/lib/images.generated";
import { innerPageMeta } from "~/lib/page-meta";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/logistics";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return {
    locale,
    page: dict.pages.logistics,
    meta: dict.meta,
    homeLabel: dict.common.labels.home,
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  innerPageMeta(loaderData, `/${PAGES.logistics}`);

export const shouldRevalidate = revalidateOnLocaleChange;

type Logistics = Dictionary["pages"]["logistics"];

const SERVICE_ICONS: Record<keyof Logistics["services"]["items"], LucideIcon> = {
  sourcing: Search,
  chartering: Ship,
  inspection: ClipboardCheck,
  documentation: FileText,
  finance: Landmark,
  delivery: Anchor,
};

const MODES: Record<keyof Logistics["modes"]["items"], { icon: LucideIcon; image: ImageName }> = {
  bulk: { icon: Ship, image: "bulk-carrier-2" },
  breakbulk: { icon: Package, image: "port-loading" },
  container: { icon: Container, image: "port-bluehour" },
};

/** Seller-arranged scope per Incoterm, in order: loading, freight, insurance. */
const INCOTERM_SCOPE: Record<string, [boolean, boolean, boolean]> = {
  FOB: [true, false, false],
  CFR: [true, true, false],
  CIF: [true, true, true],
};

export default function Logistics({ loaderData }: Route.ComponentProps) {
  const { page, locale, homeLabel } = loaderData;
  const services = Object.entries(page.services.items) as [
    keyof Logistics["services"]["items"],
    { title: string; text: string },
  ][];
  const modes = Object.entries(page.modes.items) as [
    keyof Logistics["modes"]["items"],
    { title: string; text: string },
  ][];
  const coverage = [
    page.incoterms.coverage.loading,
    page.incoterms.coverage.freight,
    page.incoterms.coverage.insurance,
  ];

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image="port-loading"
        crumbs={[{ label: homeLabel, to: pagePath(locale, "home") }, { label: page.title }]}
        breadcrumbLabel={homeLabel}
      />

      {/* Services */}
      <section className="container-page py-24 sm:py-32">
        <SectionHeading eyebrow={page.services.eyebrow} title={page.services.title} />
        <ul className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([key, service], index) => {
            const Icon = SERVICE_ICONS[key];
            return (
              <Reveal
                as="li"
                key={key}
                delay={(index % 3) * 0.07}
                className="group flex flex-col gap-5 bg-white p-8 transition-colors duration-500 hover:bg-paper sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="size-8 text-gold-600" strokeWidth={1.4} />
                  <span className="ltr-nums font-display font-semibold text-ink-900/10 text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-semibold text-ink-900 text-xl">{service.title}</h3>
                <p className="text-ink-500 leading-relaxed">{service.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Incoterms */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow={page.incoterms.eyebrow}
            title={page.incoterms.title}
            text={page.incoterms.text}
            tone="light"
          />
          <ul className="mt-16 grid gap-5 lg:grid-cols-3">
            {page.incoterms.items.map((term, index) => {
              const scope = INCOTERM_SCOPE[term.code] ?? [false, false, false];
              return (
                <Reveal
                  as="li"
                  key={term.code}
                  delay={index * 0.08}
                  className="flex flex-col gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
                >
                  <span className="ltr-nums font-display font-semibold text-6xl text-gold-gradient">
                    {term.code}
                  </span>
                  <h3 className="font-semibold text-white text-xl">{term.name}</h3>
                  <p className="text-ink-300 leading-relaxed">{term.text}</p>
                  <div className="mt-auto border-white/10 border-t pt-5">
                    <p className="mb-3 text-gold-300 text-xs uppercase tracking-eyebrow">
                      {page.incoterms.coverage.seller}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {coverage.map((label, i) => (
                        <li
                          key={label}
                          className={cn(
                            "flex items-center gap-2.5 text-sm",
                            scope[i] ? "text-white" : "text-ink-500",
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-5 place-items-center rounded-full",
                              scope[i] ? "bg-gold-500 text-ink-950" : "border border-white/15",
                            )}
                          >
                            {scope[i] ? (
                              <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                            ) : (
                              <Minus aria-hidden="true" className="size-3" />
                            )}
                          </span>
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Shipment modes */}
      <section className="container-page py-24 sm:py-32">
        <SectionHeading eyebrow={page.modes.eyebrow} title={page.modes.title} />
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {modes.map(([key, mode], index) => {
            const { icon: Icon, image } = MODES[key];
            return (
              <Reveal
                as="li"
                key={key}
                delay={index * 0.08}
                className="group overflow-hidden rounded-[1.5rem] border border-line bg-white"
              >
                <Picture
                  name={image}
                  alt=""
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                />
                <div className="flex flex-col gap-3 p-7">
                  <h3 className="flex items-center gap-3 font-semibold text-ink-900 text-xl">
                    <Icon aria-hidden="true" className="size-5 text-gold-600" />
                    {mode.title}
                  </h3>
                  <p className="text-ink-500 leading-relaxed">{mode.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Documents */}
      <section className="container-page pb-8">
        <Reveal className="grid overflow-hidden rounded-[2rem] bg-sand lg:grid-cols-5">
          <div className="flex flex-col gap-6 p-8 sm:p-12 lg:col-span-3">
            <h2 className="font-semibold text-3xl tracking-tight">{page.documents.title}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.documents.items.map((doc) => (
                <li
                  key={doc}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-ink-700 text-sm"
                >
                  <FileText aria-hidden="true" className="size-4 shrink-0 text-gold-600" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          <Picture
            name="bulk-carrier"
            alt=""
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="min-h-72 lg:col-span-2"
          />
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

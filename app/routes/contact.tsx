import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { WhatsAppIcon } from "~/components/brand/whatsapp-icon";
import { InquiryForm } from "~/components/forms/inquiry-form";
import { PageHero } from "~/components/sections/page-hero";
import { AddressLines } from "~/components/ui/address-lines";
import { Button } from "~/components/ui/button";
import { Reveal } from "~/components/ui/reveal";
import { PAGES, pagePath } from "~/config/paths";
import { SITE, whatsappUrl } from "~/config/site";
import { getDictionary, requireLocale } from "~/i18n/server";
import { innerPageMeta } from "~/lib/page-meta";
import { revalidateOnLocaleChange } from "~/lib/revalidate";
import type { Route } from "./+types/contact";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return {
    locale,
    page: dict.pages.contact,
    form: dict.form,
    labels: dict.common.labels,
    meta: dict.meta,
    homeLabel: dict.common.labels.home,
    whatsappMessage: dict.common.whatsapp.message,
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  innerPageMeta(loaderData, `/${PAGES.contact}`);

export const shouldRevalidate = revalidateOnLocaleChange;

const MAP_QUERY = encodeURIComponent(SITE.address.mapQuery);

export default function Contact({ loaderData }: Route.ComponentProps) {
  const { page, form, labels, locale, homeLabel, whatsappMessage } = loaderData;

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image="hong-kong-night"
        crumbs={[{ label: homeLabel, to: pagePath(locale, "home") }, { label: page.title }]}
        breadcrumbLabel={homeLabel}
      />

      <section className="container-page grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
        <Reveal className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_40px_80px_-50px_rgb(15_23_25/0.35)] sm:p-10 lg:col-span-7">
          <h2 className="font-semibold text-3xl tracking-tight">{page.formTitle}</h2>
          <p className="mt-3 mb-10 text-ink-500">{page.formText}</p>
          <InquiryForm locale={locale} copy={form} />
        </Reveal>

        <aside className="flex flex-col gap-5 lg:col-span-5">
          <Reveal
            delay={0.08}
            className="relative overflow-hidden rounded-[2rem] bg-ink-950 p-8 text-white sm:p-10"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
            <div className="relative flex flex-col gap-7">
              <h2 className="font-semibold text-2xl text-white">{page.infoTitle}</h2>
              <InfoRow icon={<MapPin className="size-5" />} label={labels.address}>
                <AddressLines />
              </InfoRow>
              <InfoRow icon={<Clock className="size-5" />} label={labels.hours}>
                {labels.hoursValue}
              </InfoRow>
              {SITE.contact.email ? (
                <InfoRow icon={<Mail className="size-5" />} label={labels.email}>
                  <a href={`mailto:${SITE.contact.email}`} className="hover:text-gold-300">
                    {SITE.contact.email}
                  </a>
                </InfoRow>
              ) : null}
              {SITE.contact.phone ? (
                <InfoRow icon={<Phone className="size-5" />} label={labels.phone}>
                  <a
                    href={`tel:${SITE.contact.phone.replace(/\s+/g, "")}`}
                    className="hover:text-gold-300"
                  >
                    <bdi>{SITE.contact.phone}</bdi>
                  </a>
                </InfoRow>
              ) : null}
              {SITE.contact.whatsapp ? (
                <InfoRow icon={<WhatsAppIcon className="size-5" />} label={labels.whatsapp}>
                  <a
                    href={whatsappUrl(SITE.contact.whatsapp, whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-300"
                  >
                    <bdi>{SITE.contact.whatsapp}</bdi>
                  </a>
                </InfoRow>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <MapFacade
              title={page.mapTitle}
              loadLabel={page.mapLoad}
              consent={page.mapConsent}
              openLabel={page.openInMaps}
            />
          </Reveal>
        </aside>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-gold-300"
      >
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] text-gold-300 uppercase tracking-eyebrow">{label}</span>
        <span className="text-ink-100 text-sm leading-relaxed">{children}</span>
      </div>
    </div>
  );
}

/** Privacy-friendly map: no request to Google until the visitor opts in. */
function MapFacade({
  title,
  loadLabel,
  consent,
  openLabel,
}: {
  title: string;
  loadLabel: string;
  consent: string;
  openLabel: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-white">
      <div className="relative aspect-[4/3] bg-ink-900">
        {loaded ? (
          <iframe
            title={title}
            src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-blueprint p-6 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-gold-500 text-ink-950 shadow-[0_0_0_10px_rgb(212_162_76/0.15)]">
              <MapPin aria-hidden="true" className="size-6" />
            </span>
            <Button variant="outline-light" size="sm" onClick={() => setLoaded(true)}>
              {loadLabel}
            </Button>
            <p className="max-w-xs text-ink-300 text-xs">{consent}</p>
          </div>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 px-6 py-4 font-semibold text-ink-800 text-sm transition-colors hover:bg-paper"
      >
        {openLabel}
        <ExternalLink aria-hidden="true" className="size-4 text-gold-600" />
      </a>
    </div>
  );
}

import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { Logo } from "~/components/brand/logo";
import { WhatsAppIcon } from "~/components/brand/whatsapp-icon";
import { AddressLines } from "~/components/ui/address-lines";
import { pagePath, productPath } from "~/config/paths";
import { SITE, whatsappUrl } from "~/config/site";
import { useLocaleContext } from "~/i18n/use-locale";
import { NAV_PAGES } from "./nav-pages";

export function Footer() {
  const { locale, common, productNav } = useLocaleContext();
  const linkClass = "text-sm text-ink-300 transition-colors hover:text-gold-300";

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[-10%] -top-48 size-[36rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-page relative grid gap-14 pt-20 pb-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Link
            to={pagePath(locale, "home")}
            aria-label={common.nav.home}
            className="inline-block text-white"
          >
            <Logo variant="stacked" title={null} className="w-52" />
          </Link>
          <p className="mt-8 max-w-sm text-ink-300 text-sm leading-relaxed">
            {common.footer.tagline}
          </p>
        </div>

        <nav className="lg:col-span-2" aria-label={common.footer.company}>
          <h2 className="font-display font-semibold text-white text-xs uppercase tracking-eyebrow">
            {common.footer.company}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_PAGES.filter((p) => p !== "products").map((page) => (
              <li key={page}>
                <Link to={pagePath(locale, page)} className={linkClass}>
                  {common.nav[page]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-3" aria-label={common.footer.products}>
          <h2 className="font-display font-semibold text-white text-xs uppercase tracking-eyebrow">
            {common.footer.products}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {productNav.map((product) => (
              <li key={product.slug}>
                <Link to={productPath(locale, product.slug)} className={linkClass}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-display font-semibold text-white text-xs uppercase tracking-eyebrow">
            {common.footer.headquarters}
          </h2>
          <address className="mt-5 flex flex-col gap-4 text-ink-300 text-sm not-italic leading-relaxed">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>
                <AddressLines />
              </span>
            </p>
            <p className="flex gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>{common.labels.hoursValue}</span>
            </p>
            {SITE.contact.email ? (
              <a href={`mailto:${SITE.contact.email}`} className="flex gap-3 hover:text-gold-300">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{SITE.contact.email}</span>
              </a>
            ) : null}
            {SITE.contact.phone ? (
              <a
                href={`tel:${SITE.contact.phone.replace(/\s+/g, "")}`}
                className="flex gap-3 hover:text-gold-300"
              >
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <bdi>{SITE.contact.phone}</bdi>
              </a>
            ) : null}
            {SITE.contact.whatsapp ? (
              <a
                href={whatsappUrl(SITE.contact.whatsapp, common.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-gold-300"
              >
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>
                  {common.labels.whatsapp} · <bdi>{SITE.contact.whatsapp}</bdi>
                </span>
              </a>
            ) : null}
          </address>
        </div>
      </div>

      <div className="relative border-white/[0.08] border-t">
        <div className="container-page flex flex-col gap-4 py-6 text-ink-400 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.legalName}.{" "}
            {common.footer.rights} · {common.footer.registered}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
          >
            {common.footer.backToTop}
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

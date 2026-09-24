import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";
import { WhatsAppButton } from "~/components/layout/whatsapp-button";
import { getDictionary, requireLocale } from "~/i18n/server";
import { PRODUCT_SLUGS } from "~shared/catalog";
import type { Route } from "./+types/locale-layout";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.lang);
  const dict = getDictionary(locale);
  return {
    locale,
    meta: dict.meta,
    common: dict.common,
    productNav: PRODUCT_SLUGS.map((slug) => ({
      slug,
      name: dict.products[slug].name,
      short: dict.products[slug].short,
    })),
  };
}

export default function LocaleLayout({ loaderData }: Route.ComponentProps) {
  const { common } = loaderData;
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  // Move focus to the new page on client navigation so screen readers announce it.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <div id="top" />
      <a
        href="#main"
        className="fixed start-4 top-4 z-[60] -translate-y-24 rounded-full bg-gold-500 px-5 py-3 font-semibold text-ink-950 text-sm shadow-lg transition-transform focus:translate-y-0"
      >
        {common.nav.skipToContent}
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

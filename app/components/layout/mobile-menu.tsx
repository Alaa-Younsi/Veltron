import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Logo } from "~/components/brand/logo";
import { ButtonLink } from "~/components/ui/button";
import { pagePath, productPath, switchLocalePath } from "~/config/paths";
import { LOCALE_META, LOCALES, type Locale } from "~/i18n/config";
import type { useLocaleContext } from "~/i18n/use-locale";
import { cn } from "~/lib/utils";
import { NAV_PAGES } from "./nav-pages";

type LocaleContext = ReturnType<typeof useLocaleContext>;

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  common: LocaleContext["common"];
  productNav: LocaleContext["productNav"];
};

/**
 * Full-screen navigation built on the native <dialog> element: focus trapping,
 * Escape handling and background inertness come from the platform.
 */
export function MobileMenu({ open, onClose, locale, common, productNav }: MobileMenuProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={common.nav.mainNavigation}
      className={cn(
        "fixed inset-0 m-0 size-full max-h-none max-w-none bg-ink-950 p-0 text-white",
        "opacity-0 transition-[opacity,display,overlay] transition-discrete duration-500 ease-out-expo",
        "backdrop:bg-transparent open:opacity-100 starting:open:opacity-0",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-60"
        aria-hidden="true"
      />
      <div className="relative flex min-h-full flex-col">
        <div className="container-page flex h-20 shrink-0 items-center justify-between">
          <Link
            to={pagePath(locale, "home")}
            onClick={onClose}
            aria-label={common.nav.home}
            className="text-white"
          >
            <Logo variant="horizontal" title={null} className="w-[168px]" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={common.nav.closeMenu}
            className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav className="container-page flex-1 py-6">
          <ul className="flex flex-col">
            {NAV_PAGES.map((page, index) => (
              <li key={page} className="border-white/10 border-b">
                <NavLink
                  to={pagePath(locale, page)}
                  end={page !== "products"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-baseline gap-4 py-4 font-display font-semibold text-2xl transition-colors sm:text-3xl",
                      isActive ? "text-gold-300" : "text-white hover:text-gold-300",
                    )
                  }
                >
                  <span className="ltr-nums font-medium font-sans text-gold-400/70 text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {common.nav[page]}
                </NavLink>
                {page === "products" ? (
                  <ul className="grid gap-x-6 gap-y-2 ps-9 pb-5 sm:grid-cols-2">
                    {productNav.map((product) => (
                      <li key={product.slug}>
                        <Link
                          to={productPath(locale, product.slug)}
                          onClick={onClose}
                          className="text-ink-200 text-sm transition-colors hover:text-white"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-page flex flex-col gap-6 pt-2 pb-10">
          <nav className="flex items-center gap-2" aria-label={common.nav.language}>
            {LOCALES.map((l) => (
              <Link
                key={l}
                to={switchLocalePath(pathname, l)}
                lang={l}
                hrefLang={LOCALE_META[l].hreflang}
                onClick={onClose}
                aria-current={l === locale ? "true" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  l === locale
                    ? "border-gold-400 bg-gold-400/10 text-gold-200"
                    : "border-white/15 text-white/75 hover:border-white/40 hover:text-white",
                )}
              >
                {LOCALE_META[l].label}
              </Link>
            ))}
          </nav>
          <ButtonLink
            to={pagePath(locale, "contact")}
            onClick={onClose}
            variant="gold"
            size="lg"
            arrow
            className="w-full"
          >
            {common.nav.requestQuote}
          </ButtonLink>
        </div>
      </div>
    </dialog>
  );
}

import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Logo } from "~/components/brand/logo";
import { ButtonLink } from "~/components/ui/button";
import { pagePath } from "~/config/paths";
import { useScrolled } from "~/hooks/use-scrolled";
import { useLocaleContext } from "~/i18n/use-locale";
import { cn } from "~/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { NAV_PAGES } from "./nav-pages";
import { navLinkClasses } from "./nav-styles";
import { ProductsMenu } from "./products-menu";

export function Header() {
  const { locale, common, productNav } = useLocaleContext();
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = scrolled;
  const tone = solid ? "dark" : "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-out-expo",
        solid
          ? "border-ink-900/[0.06] border-b bg-paper/85 shadow-[0_8px_30px_-18px_rgb(15_23_25/0.25)] backdrop-blur-xl"
          : "border-transparent border-b bg-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          to={pagePath(locale, "home")}
          aria-label={`VELTRON — ${common.nav.home}`}
          className={cn("shrink-0 transition-colors", solid ? "text-ink-700" : "text-white")}
        >
          <Logo variant="horizontal" title={null} className="w-[168px] sm:w-[188px]" />
        </Link>

        <nav aria-label={common.nav.mainNavigation} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_PAGES.map((page) =>
              page === "products" ? (
                <li key={page}>
                  <ProductsMenu
                    locale={locale}
                    common={common}
                    productNav={productNav}
                    tone={tone}
                  />
                </li>
              ) : (
                <li key={page}>
                  <NavLink
                    to={pagePath(locale, page)}
                    className={({ isActive }) => navLinkClasses(tone, isActive)}
                  >
                    {common.nav[page]}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={common.nav.language} tone={tone} />
          <ButtonLink
            to={pagePath(locale, "contact")}
            variant="gold"
            size="sm"
            arrow
            className="hidden sm:inline-flex xl:hidden 2xl:inline-flex"
          >
            {common.nav.requestQuote}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={common.nav.openMenu}
            aria-expanded={menuOpen}
            className={cn(
              "grid size-10 place-items-center rounded-full transition-colors xl:hidden",
              solid ? "text-ink-900 hover:bg-ink-900/5" : "text-white hover:bg-white/10",
            )}
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        common={common}
        productNav={productNav}
      />
    </header>
  );
}

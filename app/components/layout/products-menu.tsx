import { ArrowRight, ChevronDown } from "lucide-react";
import { type PointerEvent, useCallback, useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { pagePath, productPath } from "~/config/paths";
import { useDismiss } from "~/hooks/use-dismiss";
import type { Locale } from "~/i18n/config";
import type { useLocaleContext } from "~/i18n/use-locale";
import { cn } from "~/lib/utils";
import { navLinkClasses } from "./nav-styles";

type LocaleContext = ReturnType<typeof useLocaleContext>;

type ProductsMenuProps = {
  locale: Locale;
  common: LocaleContext["common"];
  productNav: LocaleContext["productNav"];
  tone: "light" | "dark";
};

/** Desktop "Products" nav item with a hover/click mega-menu. */
export function ProductsMenu({ locale, common, productNav, tone }: ProductsMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  // Set when a mouse hover opened the panel, so the click that usually follows
  // on the chevron keeps it open instead of toggling it straight back closed.
  const openedByHover = useRef(false);
  const close = useCallback(() => {
    openedByHover.current = false;
    setOpen(false);
  }, []);
  useDismiss(ref, open, close);

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || open) return;
    openedByHover.current = true;
    setOpen(true);
  };
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") close();
  };
  const onToggle = () => {
    if (openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setOpen((v) => !v);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="flex items-center">
        <NavLink
          viewTransition
          to={pagePath(locale, "products")}
          end={false}
          className={({ isActive }) => navLinkClasses(tone, isActive, "pe-1")}
        >
          {common.nav.products}
        </NavLink>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={common.nav.allProducts}
          onClick={onToggle}
          className={cn(
            "grid size-7 place-items-center rounded-full transition-colors",
            tone === "light" ? "text-white/70 hover:text-white" : "text-ink-500 hover:text-ink-900",
          )}
        >
          <ChevronDown
            aria-hidden="true"
            className={cn("size-3.5 transition-transform", open && "rotate-180")}
          />
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="absolute start-1/2 top-full w-[640px] -translate-x-1/2 pt-4 rtl:translate-x-1/2"
      >
        <div className="overflow-hidden rounded-3xl border border-ink-900/10 bg-white shadow-[0_40px_80px_-30px_rgb(15_23_25/0.45)]">
          <div className="grid grid-cols-2 gap-1 p-3">
            {productNav.map((product) => (
              <Link
                viewTransition
                key={product.slug}
                to={productPath(locale, product.slug)}
                onClick={close}
                className="group/item rounded-2xl p-4 transition-colors hover:bg-paper"
              >
                <span className="flex items-center gap-2 font-display font-semibold text-ink-900 text-sm">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-gold-500 transition-transform group-hover/item:scale-150"
                  />
                  {product.name}
                </span>
                <span className="mt-1.5 block text-[13px] text-ink-500 leading-snug">
                  {product.short}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 border-ink-900/[0.06] border-t bg-paper px-7 py-4">
            <p className="text-[13px] text-ink-500">{common.nav.productsIntro}</p>
            <Link
              viewTransition
              to={pagePath(locale, "products")}
              onClick={close}
              className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-[13px] text-gold-700 hover:text-ink-900"
            >
              {common.nav.allProducts}
              <ArrowRight aria-hidden="true" className="size-3.5 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

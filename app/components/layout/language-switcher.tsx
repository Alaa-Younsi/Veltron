import { Check, ChevronDown, Globe } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { switchLocalePath } from "~/config/paths";
import { useDismiss } from "~/hooks/use-dismiss";
import { LOCALE_META, LOCALES, type Locale } from "~/i18n/config";
import { cn } from "~/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  tone: "light" | "dark";
};

export function LanguageSwitcher({ locale, label, tone }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const { pathname, search, hash } = useLocation();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${LOCALE_META[locale].label}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-full px-3 font-semibold text-[13px] transition-colors",
          tone === "light"
            ? "text-white/85 hover:bg-white/10 hover:text-white"
            : "text-ink-700 hover:bg-ink-900/5",
        )}
      >
        <Globe aria-hidden="true" className="size-4" />
        <span>{LOCALE_META[locale].short}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      <ul
        id={menuId}
        hidden={!open}
        className="absolute end-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-1.5 shadow-[0_24px_60px_-20px_rgb(15_23_25/0.35)]"
      >
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                to={`${switchLocalePath(pathname, l)}${search}${hash}`}
                lang={l}
                hrefLang={LOCALE_META[l].hreflang}
                aria-current={active ? "true" : undefined}
                onClick={close}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-ink-50 font-semibold text-ink-900"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
                )}
              >
                {LOCALE_META[l].label}
                {active ? <Check aria-hidden="true" className="size-4 text-gold-600" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

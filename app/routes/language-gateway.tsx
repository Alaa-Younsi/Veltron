import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Logo } from "~/components/brand/logo";
import { pagePath } from "~/config/paths";
import { absoluteUrl, SITE } from "~/config/site";
import { DEFAULT_LOCALE, isLocale, LOCALE_META, LOCALES, type Locale } from "~/i18n/config";
import type { Route } from "./+types/language-gateway";

export const meta: Route.MetaFunction = () => [
  { title: SITE.name },
  { name: "robots", content: "noindex, follow" },
  { tagName: "link", rel: "canonical", href: absoluteUrl(`/${DEFAULT_LOCALE}`) },
];

function preferredLocale(): Locale {
  for (const lang of navigator.languages ?? [navigator.language]) {
    const base = lang.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

/**
 * `/` — In production Vercel redirects by Accept-Language before this page is
 * served (see vercel.json). This page is the fallback for other hosts / local
 * preview: it redirects client-side and offers plain links without JS.
 */
export default function LanguageGateway() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(pagePath(preferredLocale(), "home"), { replace: true });
  }, [navigate]);

  return (
    <main className="grid min-h-svh place-items-center bg-ink-950 px-6 text-white">
      <div className="flex flex-col items-center gap-10">
        <Logo variant="stacked" className="w-56 text-white" />
        <ul className="flex gap-3">
          {LOCALES.map((l) => (
            <li key={l}>
              <Link
                to={pagePath(l, "home")}
                lang={l}
                hrefLang={LOCALE_META[l].hreflang}
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm hover:border-gold-400 hover:text-gold-200"
              >
                {LOCALE_META[l].label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

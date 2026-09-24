import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { type ReactNode, useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import { NotFoundView } from "./components/layout/not-found-view";
import { SmoothScroll } from "./components/motion/smooth-scroll";
import { allLocalizedPaths } from "./config/paths";
import { SITE } from "./config/site";
import { DEFAULT_LOCALE, getDirection, LOCALE_META, localeFromPathname } from "./i18n/config";
import "./app.css";

const KNOWN_PATHS = new Set(allLocalizedPaths());

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname) ?? DEFAULT_LOCALE;
  const dir = getDirection(locale);
  const lang = LOCALE_META[locale].hreflang;

  // React does not patch <html> attributes on hydration mismatch (e.g. the static
  // 404 fallback served for /zh/...), so keep them in sync explicitly.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <html lang={lang} dir={dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content={SITE.themeColor} />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <SmoothScroll />
        <Outlet />
      </LazyMotion>
    </MotionConfig>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname) ?? DEFAULT_LOCALE;

  // Anything outside the pre-rendered page set is a 404 by definition (static hosting).
  const knownPage = pathname === "/" || KNOWN_PATHS.has(pathname.replace(/\/+$/, ""));
  if (!knownPage || (isRouteErrorResponse(error) && error.status === 404)) {
    return <NotFoundView locale={locale} />;
  }

  const details = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;
  return <NotFoundView locale={locale} variant="error" details={details} />;
}

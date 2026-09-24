import { useLocation } from "react-router";
import { NotFoundView } from "~/components/layout/not-found-view";
import { DEFAULT_LOCALE, localeFromPathname } from "~/i18n/config";

/** Catch-all for unknown URLs (served by the static host's 404 page). */
export default function NotFound() {
  const { pathname } = useLocation();
  return <NotFoundView locale={localeFromPathname(pathname) ?? DEFAULT_LOCALE} />;
}

import { useRouteLoaderData } from "react-router";
import type { loader } from "~/routes/locale-layout";

/**
 * Locale + shared (layout-level) translations for any component rendered
 * inside the `/:lang` layout.
 */
export function useLocaleContext() {
  const data = useRouteLoaderData<typeof loader>("locale");
  if (!data) throw new Error("useLocaleContext must be used inside the /:lang layout");
  return data;
}

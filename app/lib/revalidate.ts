import type { ShouldRevalidateFunctionArgs } from "react-router";

/**
 * In pre-rendered / SPA mode, a route's loader only re-runs on navigation when
 * its *own* dynamic params change. `:lang` belongs to the parent layout, so
 * localized pages must opt in explicitly — otherwise switching language would
 * keep the previous language's content.
 */
export function revalidateOnLocaleChange({
  currentParams,
  nextParams,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs): boolean {
  return currentParams.lang !== nextParams.lang || defaultShouldRevalidate;
}

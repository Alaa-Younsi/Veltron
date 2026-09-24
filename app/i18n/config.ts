import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from "~shared/locales";

export { DEFAULT_LOCALE, isLocale, LOCALES, type Locale };

export type Direction = "ltr" | "rtl";

export const LOCALE_META: Record<
  Locale,
  { label: string; short: string; dir: Direction; hreflang: string; ogLocale: string }
> = {
  en: { label: "English", short: "EN", dir: "ltr", hreflang: "en", ogLocale: "en_US" },
  fr: { label: "Français", short: "FR", dir: "ltr", hreflang: "fr", ogLocale: "fr_FR" },
  zh: { label: "简体中文", short: "中文", dir: "ltr", hreflang: "zh-Hans", ogLocale: "zh_CN" },
};

export function getDirection(locale: Locale): Direction {
  return LOCALE_META[locale].dir;
}

/** Extracts the locale from the first URL segment, if any. */
export function localeFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/")[1];
  return isLocale(first) ? first : null;
}

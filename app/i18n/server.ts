/**
 * Dictionary access for route `loader`s. Loaders run at build time
 * (pre-rendering), so these imports never reach the client bundle — each page
 * receives only the slice of content it renders.
 */
import { data } from "react-router";
import { isLocale, type Locale } from "./config";
import { type Dictionary, en } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import { zh } from "./dictionaries/zh";

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr, zh };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Validates the `:lang` route param, responding 404 for unknown locales. */
export function requireLocale(value: string | undefined): Locale {
  if (!isLocale(value)) throw data(null, { status: 404 });
  return value;
}

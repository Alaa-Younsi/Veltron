/**
 * Locale primitives shared by the web app and the serverless API.
 * Keep this file dependency-free: it is imported from Vercel Functions.
 */
export const LOCALES = ["en", "fr", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

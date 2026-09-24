import type { Locale } from "./config";

/**
 * 404 copy. Kept separate from the page dictionaries because the 404 view
 * renders outside the localized layout (no loader data available).
 */
export const NOT_FOUND_COPY: Record<
  Locale,
  { title: string; heading: string; text: string; home: string }
> = {
  en: {
    title: "Page not found",
    heading: "This page has sailed.",
    text: "The page you were looking for may have moved or no longer exists.",
    home: "Back to home",
  },
  fr: {
    title: "Page introuvable",
    heading: "Cette page a levé l’ancre.",
    text: "La page que vous recherchez a peut-être été déplacée ou n’existe plus.",
    home: "Retour à l’accueil",
  },
  ar: {
    title: "الصفحة غير موجودة",
    heading: "يبدو أن هذه الصفحة قد أبحرت.",
    text: "ربما نُقلت الصفحة التي تبحث عنها أو لم تعد موجودة.",
    home: "العودة إلى الرئيسية",
  },
};

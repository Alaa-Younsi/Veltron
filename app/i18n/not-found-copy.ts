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
  zh: {
    title: "页面未找到",
    heading: "这个页面已经启航。",
    text: "您要查找的页面可能已被移动或不再存在。",
    home: "返回首页",
  },
};

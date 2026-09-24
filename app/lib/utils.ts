import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Composes Tailwind classes, resolving conflicts (last one wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Replaces `{key}` placeholders in a translated string. */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

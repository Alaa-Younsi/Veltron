import { cn } from "~/lib/utils";

/** Shared styling for top-level desktop navigation links. */
export function navLinkClasses(tone: "light" | "dark", isActive: boolean, extra?: string) {
  return cn(
    "relative inline-flex h-10 items-center whitespace-nowrap rounded-full px-3 font-medium text-[14px] transition-colors",
    "after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-500 after:ease-out-expo rtl:after:origin-right",
    "hover:after:scale-x-100",
    tone === "light" ? "text-white/80 hover:text-white" : "text-ink-600 hover:text-ink-900",
    isActive && "after:scale-x-100",
    isActive && (tone === "light" ? "text-white" : "text-ink-900"),
    extra,
  );
}

import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  tone?: "dark" | "light";
  /** Centered eyebrows get a rule on both sides — echoing the logo tagline. */
  align?: "start" | "center";
  className?: string;
};

export function Eyebrow({ children, tone = "dark", align = "start", className }: EyebrowProps) {
  const rule = cn("h-px w-8 shrink-0", tone === "dark" ? "bg-gold-600" : "bg-gold-400");
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-display font-semibold text-xs uppercase tracking-eyebrow",
        tone === "dark" ? "text-gold-700" : "text-gold-300",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className={rule} />
      <span>{children}</span>
      {align === "center" ? <span aria-hidden="true" className={rule} /> : null}
    </p>
  );
}

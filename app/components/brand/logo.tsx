import { useId } from "react";
import { LOCKUPS } from "~/lib/brand/lockups.generated";
import { BRAND_COLORS } from "~/lib/brand/mark";
import { cn } from "~/lib/utils";

type LogoProps = {
  variant?: keyof typeof LOCKUPS;
  className?: string;
  /** Accessible name. Pass `null` when the logo is decorative (e.g. inside a labelled link). */
  title?: string | null;
};

/**
 * Pixel-exact outlined VELTRON logo. Slate parts inherit `currentColor`, so the
 * logo adapts to light or dark surfaces via a text-color class.
 */
export function Logo({
  variant = "horizontal",
  className,
  title = "VELTRON Global Trading Limited",
}: LogoProps) {
  const lockup = LOCKUPS[variant];
  const gradientId = useId();
  const inkPath = lockup.parts
    .filter((p) => p.tone === "ink")
    .map((p) => p.d)
    .join("");

  return (
    <svg
      viewBox={`0 0 ${lockup.width} ${lockup.height}`}
      className={cn("block h-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title ?? undefined}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BRAND_COLORS.goldLight} />
          <stop offset="1" stopColor={BRAND_COLORS.goldDark} />
        </linearGradient>
      </defs>
      <path fill="currentColor" d={inkPath} />
      {lockup.parts
        .filter((p) => p.tone === "gold")
        .map((p) => (
          <path key={p.d} fill={`url(#${gradientId})`} d={p.d} />
        ))}
    </svg>
  );
}

import { useId } from "react";
import { LOCKUPS } from "~/lib/brand/lockups.generated";

/**
 * Oversized outlined "VELTRON" wordmark. Uses pre-outlined, overlap-free glyph
 * paths (not CSS text-stroke, which exposes a variable font's internal contours)
 * and scales to its container, so it can never clip. On hover, gold fill rises
 * from the baseline.
 */
export function FooterWordmark() {
  const { width, height, parts } = LOCKUPS.wordmark;
  const id = useId();
  const d = parts.map((p) => p.d).join("");
  const pad = 2;

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
      className="group/wordmark block h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--color-gold-600)" />
          <stop offset="1" stopColor="var(--color-gold-200)" />
        </linearGradient>
        <clipPath id={`${id}-rise`}>
          <rect
            x={-pad}
            y={-pad}
            width={width + pad * 2}
            height={height + pad * 2}
            className="origin-bottom scale-y-0 transition-transform duration-[1.2s] ease-out-expo [transform-box:fill-box] group-hover/wordmark:scale-y-100"
          />
        </clipPath>
      </defs>
      <path d={d} fill={`url(#${id}-fill)`} clipPath={`url(#${id}-rise)`} />
      <path
        d={d}
        fill="none"
        stroke="var(--color-gold-300)"
        strokeOpacity={0.32}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

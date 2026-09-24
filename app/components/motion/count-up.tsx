import { animate, useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Counts a numeric value up from zero when it scrolls into view. The final
 * value is what's pre-rendered (no-JS / crawlers), non-numeric values render as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const target = Number.parseInt(value, 10);
  const numeric = Number.isFinite(target) && String(target) === value;

  // Reset to 0 before the first paint if the number is still offscreen.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !numeric || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) el.textContent = "0";
  }, [numeric]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !numeric || !inView || el.textContent === value) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, numeric, target, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

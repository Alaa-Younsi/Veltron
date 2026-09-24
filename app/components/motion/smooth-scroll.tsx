import { useEffect } from "react";

/**
 * Lenis momentum scrolling for mouse/trackpad users. Skipped for touch devices
 * (native scrolling is better there) and when reduced motion is requested.
 * Lenis drives the native window scroll, so anchors, focus and React Router's
 * scroll restoration keep working.
 */
export function SmoothScroll() {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    let destroyed = false;
    let lenis: { destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -96 } });
    });

    return () => {
      destroyed = true;
      lenis?.destroy();
    };
  }, []);

  return null;
}

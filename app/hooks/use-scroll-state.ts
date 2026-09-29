import { useEffect, useState } from "react";

type ScrollState = {
  /** Page is scrolled past `solidAfter` px (header switches to its solid style). */
  scrolled: boolean;
  /** Visitor is scrolling down past `hideAfter` px (header slides away). */
  hidden: boolean;
};

/**
 * Single rAF-throttled scroll listener driving the header's appearance:
 * solid once scrolled, hidden while scrolling down, back as soon as the
 * visitor scrolls up.
 */
export function useScrollState({
  solidAfter = 24,
  hideAfter = 240,
  tolerance = 8,
} = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      const directionChanged = Math.abs(delta) >= tolerance;
      if (directionChanged) lastY = y;
      setState((prev) => {
        const scrolled = y > solidAfter;
        const hidden = directionChanged ? delta > 0 && y > hideAfter : prev.hidden && y > hideAfter;
        return prev.scrolled === scrolled && prev.hidden === hidden ? prev : { scrolled, hidden };
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [solidAfter, hideAfter, tolerance]);

  return state;
}

import { useEffect, useState } from "react";

/**
 * True while the visitor scrolls down past `offset` px; false as soon as they
 * scroll back up — the classic "get out of the way, come back when needed" header.
 */
export function useHideOnScroll(offset = 240, tolerance = 8): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < tolerance) return;
      setHidden(delta > 0 && y > offset);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset, tolerance]);

  return hidden;
}

import { type RefObject, useEffect, useRef } from "react";

/** Pointer effects only make sense for a real mouse and when motion is welcome. */
function prefersRichPointer(): boolean {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * 3D tilt + glare. Writes CSS variables (--rx, --ry, --gx, --gy) that the
 * element's Tailwind classes consume — no React re-renders on pointer move.
 */
export function useTilt<T extends HTMLElement>(maxDegrees = 7): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !prefersRichPointer()) return;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(0.5 - py) * maxDegrees}deg`);
        el.style.setProperty("--ry", `${(px - 0.5) * maxDegrees}deg`);
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
        el.dataset.tilting = "";
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      delete el.dataset.tilting;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [maxDegrees]);

  return ref;
}

/** Magnetic pull toward the cursor (writes --mag-x / --mag-y). */
export function useMagnetic<T extends HTMLElement>(strength = 0.28): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !prefersRichPointer()) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      el.style.setProperty("--mag-x", `${x}px`);
      el.style.setProperty("--mag-y", `${y}px`);
    };
    const onLeave = () => {
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return ref;
}

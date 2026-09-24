import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TradeMap } from "~/components/map/trade-map";
import { GEO_POINTS } from "~/content/geo";
import { cn } from "~/lib/utils";
import type { GlobePoint } from "./globe-scene";

const GLOBE_POINTS: GlobePoint[] = GEO_POINTS.map((p) => ({
  lat: p.coords[1],
  lon: p.coords[0],
  kind: p.kind,
}));

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type Handle = { cancel: () => void };

const INTENT_EVENTS = [
  "pointermove",
  "pointerdown",
  "wheel",
  "scroll",
  "keydown",
  "touchstart",
] as const;

/**
 * Runs `callback` once the visitor shows intent (first interaction) — or after
 * a fallback delay — and then only when the browser is idle. This keeps the
 * three.js parse/compile cost entirely out of the initial page load.
 */
function onIntentThenIdle(callback: () => void, fallbackMs = 10_000): Handle {
  const hasIdle = typeof window.requestIdleCallback === "function";
  let scheduled = 0;
  let fired = false;
  const run = () => {
    if (fired) return;
    fired = true;
    cleanup();
    scheduled = hasIdle
      ? window.requestIdleCallback(callback, { timeout: 1000 })
      : window.setTimeout(callback, 50);
  };
  const timer = window.setTimeout(run, fallbackMs);
  const cleanup = () => {
    window.clearTimeout(timer);
    for (const e of INTENT_EVENTS) window.removeEventListener(e, run);
  };
  for (const e of INTENT_EVENTS) window.addEventListener(e, run, { once: true, passive: true });
  return {
    cancel: () => {
      cleanup();
      if (!fired) return;
      if (hasIdle) window.cancelIdleCallback(scheduled);
      else window.clearTimeout(scheduled);
    },
  };
}

type TradeGlobeProps = { label: string; className?: string };

/**
 * 3D trade globe. The pre-rendered SVG map is shown instantly (and remains the
 * fallback without WebGL); three.js is fetched on the visitor's first
 * interaction (or after a short fallback delay), then the live globe cross-fades
 * in once its first frame has rendered.
 */
export function TradeGlobe({ label, className }: TradeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !supportsWebGL()) return;

    let disposed = false;
    let instance: { dispose: () => void } | null = null;

    const idle = onIntentThenIdle(async () => {
      try {
        const { createTradeGlobe } = await import("./globe-scene");
        if (disposed) return;
        const created = await createTradeGlobe(canvas, {
          points: GLOBE_POINTS,
          reducedMotion,
          onReady: () => {
            if (!disposed) setReady(true);
          },
        });
        if (disposed) created.dispose();
        else instance = created;
      } catch (error) {
        console.warn("[globe] falling back to static map", error);
      }
    });

    return () => {
      disposed = true;
      idle.cancel();
      instance?.dispose();
    };
  }, [reducedMotion]);

  return (
    <div role="img" aria-label={label} className={cn("relative aspect-square w-full", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center text-ink-400/80 transition-opacity duration-1000",
          ready && "opacity-0",
        )}
      >
        <TradeMap label={label} />
      </div>
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 size-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-[1.6s] data-dragging:cursor-grabbing",
          ready && "opacity-100",
        )}
      />
    </div>
  );
}

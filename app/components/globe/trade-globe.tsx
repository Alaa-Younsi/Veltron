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

type IdleHandle = { cancel: () => void };
function whenIdle(callback: () => void): IdleHandle {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 1500 });
    return { cancel: () => window.cancelIdleCallback(id) };
  }
  const id = setTimeout(callback, 300);
  return { cancel: () => clearTimeout(id) };
}

type TradeGlobeProps = { label: string; className?: string };

/**
 * 3D trade globe. The pre-rendered SVG map is shown instantly (and remains the
 * fallback without WebGL); three.js is fetched only when the browser is idle,
 * then the live globe cross-fades in once its first frame has rendered.
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

    const idle = whenIdle(async () => {
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

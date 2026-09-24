import { m } from "motion/react";
import { useId } from "react";
import { GEO_POINTS, type GeoPoint, type RegionId } from "~/content/geo";
import { cn } from "~/lib/utils";
import { PROJECTED_POINTS, WORLD_MAP } from "./world-map.generated";

type TradeMapProps = {
  className?: string;
  /** Highlights the routes of one region and dims the rest. */
  activeRegion?: RegionId | null;
  /** Accessible description of the map. */
  label: string;
  /** Show destination labels (used on the Markets page). */
  showLabels?: boolean;
};

const HUB_ID = "hkg" satisfies GeoPoint["id"];
const ORIGINS: readonly GeoPoint[] = GEO_POINTS.filter((p) => p.kind === "origin");
const DESTINATIONS: readonly GeoPoint[] = GEO_POINTS.filter((p) => p.kind === "destination");
const EASE = [0.16, 1, 0.3, 1] as const;

function point(id: string) {
  return PROJECTED_POINTS[id as keyof typeof PROJECTED_POINTS];
}

/** Quadratic arc between two projected points, bowed "upwards" for a flight-path feel. */
function arc(fromId: string, toId: string): string {
  const a = point(fromId);
  const b = point(toId);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(dist * 0.32, 150);
  return `M${a.x} ${a.y}Q${mx} ${my - lift} ${b.x} ${b.y}`;
}

/**
 * Dot-matrix world map with animated trade routes:
 * sourcing hubs → Hong Kong (dashed gold) and Hong Kong → destination markets.
 * Geography is never mirrored, so the SVG is forced LTR.
 */
export function TradeMap({
  className,
  activeRegion = null,
  label,
  showLabels = false,
}: TradeMapProps) {
  const gradientId = useId();
  const hub = point(HUB_ID);
  const dim = (region?: RegionId) => activeRegion !== null && region !== activeRegion;

  return (
    <div dir="ltr" className={className}>
      <svg
        viewBox={`0 0 ${WORLD_MAP.width} ${WORLD_MAP.height}`}
        className="block h-auto w-full"
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-gold-300)" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="var(--color-gold-300)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--color-gold-200)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <image
          href={WORLD_MAP.dotsSrc}
          width={WORLD_MAP.width}
          height={WORLD_MAP.height}
          className="opacity-80"
          preserveAspectRatio="none"
        />

        {/* Sourcing hubs → Hong Kong */}
        <g fill="none" strokeWidth={1.1} strokeLinecap="round">
          {ORIGINS.map((o) => (
            <path
              key={`in-${o.id}`}
              d={arc(o.id, HUB_ID)}
              className={cn(
                "animate-dash stroke-gold-400 transition-opacity duration-500 [stroke-dasharray:3_5]",
                dim(o.region) ? "opacity-15" : "opacity-70",
              )}
            />
          ))}
        </g>

        {/* Hong Kong → destination markets */}
        <g fill="none" strokeWidth={1.4} strokeLinecap="round">
          {DESTINATIONS.map((d, index) => (
            <m.path
              key={`out-${d.id}`}
              d={arc(HUB_ID, d.id)}
              stroke={`url(#${gradientId})`}
              className={cn(
                "transition-opacity duration-500",
                dim(d.region) ? "opacity-10" : "opacity-100",
              )}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 2.2, ease: EASE, delay: 0.4 + index * 0.08 }}
            />
          ))}
        </g>

        {/* Origins */}
        {ORIGINS.map((o) => {
          const p = point(o.id);
          return (
            <circle
              key={o.id}
              cx={p.x}
              cy={p.y}
              r={3.2}
              className={cn(
                "fill-ink-950 stroke-gold-400 transition-opacity duration-500",
                dim(o.region) ? "opacity-25" : "opacity-100",
              )}
              strokeWidth={1.4}
            >
              <title>{o.name}</title>
            </circle>
          );
        })}

        {/* Destinations */}
        {DESTINATIONS.map((d) => {
          const p = point(d.id);
          const faded = dim(d.region);
          return (
            <g
              key={d.id}
              className={cn(
                "transition-opacity duration-500",
                faded ? "opacity-20" : "opacity-100",
              )}
            >
              <circle cx={p.x} cy={p.y} r={3.6} className="fill-white" />
              <circle cx={p.x} cy={p.y} r={7} className="fill-white/10" />
              <title>{d.name}</title>
              {showLabels && activeRegion === d.region ? (
                <text
                  x={p.x + 9}
                  y={p.y + 4}
                  className="fill-white font-sans font-semibold text-[13px]"
                  paintOrder="stroke"
                  stroke="var(--color-ink-950)"
                  strokeWidth={4}
                >
                  {d.name}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* Hub */}
        <g>
          <circle
            cx={hub.x}
            cy={hub.y}
            r={8}
            className="origin-center animate-pulse-ring fill-gold-400/40 [transform-box:fill-box]"
          />
          <circle cx={hub.x} cy={hub.y} r={6} className="fill-gold-400" />
          <circle cx={hub.x} cy={hub.y} r={2.4} className="fill-ink-950" />
          <text
            x={hub.x + 12}
            y={hub.y - 10}
            className="fill-gold-200 font-display font-semibold text-[14px] tracking-[0.12em]"
            paintOrder="stroke"
            stroke="var(--color-ink-950)"
            strokeWidth={4}
          >
            HONG KONG
          </text>
        </g>
      </svg>
    </div>
  );
}

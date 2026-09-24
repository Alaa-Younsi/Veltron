/**
 * Per-IP rate limiting for the inquiry endpoint.
 *
 * - With Upstash Redis configured (recommended in production) limits are
 *   global across all function instances.
 * - Without it, falls back to a per-instance in-memory window — a best-effort
 *   guard that still blocks bursts hitting a warm instance.
 */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { ServerEnv } from "./env.js";

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

type RateLimitResult = { success: boolean; retryAfterSeconds: number };

let upstash: Ratelimit | null = null;

function getUpstash(env: ServerEnv): Ratelimit | null {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) return null;
  upstash ??= new Ratelimit({
    redis: new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN }),
    limiter: Ratelimit.slidingWindow(LIMIT, "10 m"),
    prefix: "veltron:inquiry",
    analytics: false,
  });
  return upstash;
}

const memory = new Map<string, number[]>();

function memoryLimit(key: string): RateLimitResult {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) {
    const oldest = hits[0] ?? now;
    memory.set(key, hits);
    return { success: false, retryAfterSeconds: Math.ceil((oldest + WINDOW_MS - now) / 1000) };
  }
  hits.push(now);
  memory.set(key, hits);
  // Opportunistic cleanup so the map cannot grow unbounded on a long-lived instance.
  if (memory.size > 5_000) {
    for (const [k, v] of memory) if (v.every((t) => now - t >= WINDOW_MS)) memory.delete(k);
  }
  return { success: true, retryAfterSeconds: 0 };
}

export async function rateLimit(env: ServerEnv, ip: string): Promise<RateLimitResult> {
  const limiter = getUpstash(env);
  if (!limiter) return memoryLimit(ip);
  try {
    const { success, reset } = await limiter.limit(ip);
    return { success, retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)) };
  } catch (error) {
    // Never block legitimate inquiries because the limiter backend is down.
    console.error("[rate-limit] Upstash unavailable, falling back to memory", error);
    return memoryLimit(ip);
  }
}

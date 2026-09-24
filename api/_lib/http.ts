import type { InquiryResponse } from "../../shared/contact.js";

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
} as const;

export function json(body: InquiryResponse, status: number, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...BASE_HEADERS, ...headers },
  });
}

/** Best-effort client IP from Vercel's proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "unknown";
}

/**
 * CSRF / cross-site abuse guard: browsers always send `Origin` on cross-origin
 * POSTs; we only accept our own host (plus explicitly allowed origins).
 */
export function isAllowedOrigin(request: Request, extraOrigins: readonly string[]): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host && originHost === host) return true;
  return extraOrigins.some((allowed) => {
    try {
      return new URL(allowed).host === originHost;
    } catch {
      return false;
    }
  });
}

/** Reads a JSON body with a hard byte cap (defends against oversized payloads). */
export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<{ ok: true; data: unknown } | { ok: false; status: 413 | 400 }> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > maxBytes) return { ok: false, status: 413 };

  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > maxBytes) return { ok: false, status: 413 };

  try {
    return { ok: true, data: JSON.parse(new TextDecoder().decode(buffer)) as unknown };
  } catch {
    return { ok: false, status: 400 };
  }
}

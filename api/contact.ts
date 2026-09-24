/**
 * POST /api/contact — website inquiry endpoint (Vercel Function, Node.js runtime).
 *
 * Pipeline: origin check → content-type → size cap → rate limit → schema
 * validation → honeypot / timing heuristics → Turnstile → email delivery.
 */
import {
  FIELD_ERROR_CODES,
  type FieldErrorCode,
  type InquiryFields,
  inquiryFieldsSchema,
  inquiryRequestSchema,
} from "../shared/contact.js";
import { getServerEnv } from "./_lib/env.js";
import { getClientIp, isAllowedOrigin, json, readJsonBody } from "./_lib/http.js";
import { sendAutoReply, sendInquiryNotification } from "./_lib/mailer.js";
import { rateLimit } from "./_lib/rate-limit.js";
import { verifyTurnstile } from "./_lib/turnstile.js";

const MAX_BODY_BYTES = 16 * 1024;
/** Humans need more than a few seconds to fill in this form. */
const MIN_FILL_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request): Promise<Response> {
  const env = getServerEnv();
  if (!env) return json({ ok: false, error: "unavailable" }, 503);

  if (!isAllowedOrigin(request, env.ALLOWED_ORIGINS)) {
    return json({ ok: false, error: "bad_request" }, 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "bad_request" }, 415);
  }

  const ip = getClientIp(request);
  const limited = await rateLimit(env, ip);
  if (!limited.success) {
    return json({ ok: false, error: "rate_limited" }, 429, {
      "Retry-After": String(limited.retryAfterSeconds),
    });
  }

  const body = await readJsonBody(request, MAX_BODY_BYTES);
  if (!body.ok) return json({ ok: false, error: "bad_request" }, body.status);

  const parsed = inquiryRequestSchema.safeParse(body.data);
  if (!parsed.success) {
    const fields: Partial<Record<keyof InquiryFields, FieldErrorCode>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (isInquiryField(key) && !(key in fields)) {
        fields[key] = isFieldErrorCode(issue.message) ? issue.message : "invalidOption";
      }
    }
    // Errors only in metadata (locale, startedAt…) mean a tampered/malformed request.
    if (Object.keys(fields).length === 0) return json({ ok: false, error: "bad_request" }, 400);
    return json({ ok: false, error: "validation", fields }, 422);
  }

  const { website, startedAt, turnstileToken, locale, ...fields } = parsed.data;

  // Bot heuristics: respond with success so automated senders learn nothing.
  const elapsed = Date.now() - startedAt;
  if (website.length > 0 || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    console.info("[contact] dropped by spam heuristics", {
      ip,
      honeypot: website.length > 0,
      elapsed,
    });
    return json({ ok: true }, 200);
  }

  const captcha = await verifyTurnstile({
    secret: env.TURNSTILE_SECRET_KEY,
    token: turnstileToken,
    ip,
  });
  if (captcha === "invalid") return json({ ok: false, error: "captcha" }, 403);
  // Verifier outage is our problem, not the visitor's — report it as such.
  if (captcha === "error") return json({ ok: false, error: "unavailable" }, 503);

  const reference = createReference();
  const params = {
    env,
    fields,
    locale,
    ip,
    userAgent: request.headers.get("user-agent") ?? "unknown",
    reference,
    idempotencyKey: await sha256(`${fields.email}|${fields.message}|${turnstileToken}`),
  };

  try {
    await sendInquiryNotification(params);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return json({ ok: false, error: "server" }, 502);
  }

  if (env.CONTACT_AUTOREPLY) await sendAutoReply(params);

  return json({ ok: true }, 200);
}

function isInquiryField(key: unknown): key is keyof InquiryFields {
  return typeof key === "string" && key in inquiryFieldsSchema.shape;
}

function isFieldErrorCode(value: string): value is FieldErrorCode {
  return (FIELD_ERROR_CODES as readonly string[]).includes(value);
}

/** Human-friendly reference, e.g. VG-260924-K7M2Q. */
function createReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  const d = new Date();
  const date = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  return `VG-${date}-${suffix}`;
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Server-side environment, validated once per cold start.
 * Files under `api/_lib` are not exposed as routes (underscore prefix).
 */
import { z } from "zod";

/**
 * Normalises a raw env value: trims whitespace, strips wrapping quotes that are
 * easy to paste into a dashboard by mistake, and treats blanks as "not set".
 */
const clean = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value
    .trim()
    .replace(/^(["'])(.*)\1$/, "$2")
    .trim();
  return trimmed === "" ? undefined : trimmed;
};

const required = z.preprocess(clean, z.string().min(1));
const optional = <T extends z.ZodType>(schema: T) => z.preprocess(clean, schema.optional());

const list = (value: string | undefined) =>
  value
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

const envSchema = z.object({
  RESEND_API_KEY: required,
  /** Where inquiries are delivered. Comma-separate for multiple recipients. */
  CONTACT_TO_EMAIL: z.preprocess(clean, z.string().transform(list).pipe(z.array(z.email()).min(1))),
  /** Verified sender on the Resend domain, e.g. `VELTRON Website <website@veltrontrading.com>`. */
  CONTACT_FROM_EMAIL: required,
  TURNSTILE_SECRET_KEY: required,
  /** Send a localized confirmation email to the visitor (`true` / `false`, case-insensitive). */
  CONTACT_AUTOREPLY: optional(z.string()).transform((v) => v?.toLowerCase() === "true"),
  /** Extra allowed origins (comma-separated) besides the request host. */
  ALLOWED_ORIGINS: optional(z.string()).transform(list),
  /** Optional add-on: an invalid value falls back to in-memory rate limiting instead of failing. */
  UPSTASH_REDIS_REST_URL: optional(z.string()).transform((v) => {
    if (v === undefined || z.url().safeParse(v).success) return v;
    console.warn("[env] UPSTASH_REDIS_REST_URL is not a valid URL — using in-memory rate limiting");
    return undefined;
  }),
  UPSTASH_REDIS_REST_TOKEN: optional(z.string()),
});

export type ServerEnv = z.output<typeof envSchema>;

let cached: ServerEnv | null = null;

/**
 * Returns the validated environment, or `null` when misconfigured
 * (the error is logged with variable names only — never values).
 */
export function getServerEnv(): ServerEnv | null {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const keys = [...new Set(parsed.error.issues.map((i) => i.path.join(".")))];
    console.error(`[env] Invalid or missing server environment variables: ${keys.join(", ")}`);
    return null;
  }
  cached = parsed.data;
  return cached;
}

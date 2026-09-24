/**
 * Server-side environment, validated once per cold start.
 * Files under `api/_lib` are not exposed as routes (underscore prefix).
 */
import { z } from "zod";

const emailList = z
  .string()
  .trim()
  .min(1)
  .transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.email()).min(1));

const envSchema = z.object({
  RESEND_API_KEY: z.string().trim().min(1),
  /** Where inquiries are delivered. Comma-separate for multiple recipients. */
  CONTACT_TO_EMAIL: emailList,
  /** Verified sender, e.g. `VELTRON Website <website@veltron-global.com>`. */
  CONTACT_FROM_EMAIL: z.string().trim().min(3),
  TURNSTILE_SECRET_KEY: z.string().trim().min(1),
  /** Send a localized confirmation email to the visitor. */
  CONTACT_AUTOREPLY: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
  /** Extra allowed origins (comma-separated) besides the request host. */
  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .transform((v) =>
      v
        ? v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    ),
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
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

/**
 * Inquiry form contract — the single schema validated in the browser
 * (react-hook-form) and again, authoritatively, in the Vercel Function.
 *
 * Validation messages are stable error *codes*; the UI maps them to the
 * visitor's language, the API returns them as-is.
 *
 * NOTE: relative imports use the `.js` extension so the file also runs as
 * native ESM inside Vercel's Node.js runtime.
 */
import { z } from "zod";
import { INCOTERMS, INQUIRY_PRODUCTS } from "./catalog.js";
import { LOCALES } from "./locales.js";

// Skip zod's `new Function` capability probe: our strict CSP (no 'unsafe-eval')
// would log it as a violation. The interpreted parser is plenty fast for one form.
z.config({ jitless: true });

export const FIELD_ERROR_CODES = [
  "required",
  "tooShort",
  "tooLong",
  "invalidEmail",
  "invalidPhone",
  "invalidOption",
  "consentRequired",
] as const;
export type FieldErrorCode = (typeof FIELD_ERROR_CODES)[number];

const LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 150 },
  email: { max: 254 },
  phone: { max: 32 },
  country: { min: 2, max: 80 },
  quantity: { max: 80 },
  destinationPort: { max: 120 },
  message: { min: 20, max: 4000 },
} as const;

const optionalText = (max: number) =>
  z.string().trim().max(max, { error: "tooLong" }).optional().default("");

/** Fields the visitor fills in. */
export const inquiryFieldsSchema = z.object({
  name: z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .min(LIMITS.name.min, { error: "tooShort" })
    .max(LIMITS.name.max, { error: "tooLong" }),
  company: optionalText(LIMITS.company.max),
  email: z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .max(LIMITS.email.max, { error: "tooLong" })
    .pipe(z.email({ error: "invalidEmail" })),
  phone: z
    .string()
    .trim()
    .max(LIMITS.phone.max, { error: "tooLong" })
    .regex(/^[+]?[\d\s().-]{0,32}$/, { error: "invalidPhone" })
    .optional()
    .default(""),
  country: z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .min(LIMITS.country.min, { error: "tooShort" })
    .max(LIMITS.country.max, { error: "tooLong" }),
  product: z.enum(INQUIRY_PRODUCTS, { error: "invalidOption" }),
  quantity: optionalText(LIMITS.quantity.max),
  destinationPort: optionalText(LIMITS.destinationPort.max),
  incoterm: z.enum(INCOTERMS, { error: "invalidOption" }).optional(),
  message: z
    .string({ error: "required" })
    .trim()
    .min(1, { error: "required" })
    .min(LIMITS.message.min, { error: "tooShort" })
    .max(LIMITS.message.max, { error: "tooLong" }),
  consent: z.literal(true, { error: "consentRequired" }),
});

export type InquiryFieldsInput = z.input<typeof inquiryFieldsSchema>;
export type InquiryFields = z.output<typeof inquiryFieldsSchema>;

/** Full request payload: visitor fields + metadata + anti-spam signals. */
export const inquiryRequestSchema = inquiryFieldsSchema.extend({
  locale: z.enum(LOCALES),
  /** Honeypot — hidden from humans, must stay empty. */
  website: z.string().max(200).optional().default(""),
  /** Epoch ms when the form was first rendered (bot-speed heuristic). */
  startedAt: z.number().int().nonnegative(),
  /** Cloudflare Turnstile response token. */
  turnstileToken: z.string().max(4096).optional().default(""),
});

/* ------------------------------------------------------------------ */
/* API response contract                                              */
/* ------------------------------------------------------------------ */

const API_ERROR_CODES = [
  "bad_request",
  "validation",
  "captcha",
  "rate_limited",
  "unavailable",
  "server",
] as const;
export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export type InquiryResponse =
  | { ok: true }
  | {
      ok: false;
      error: ApiErrorCode;
      fields?: Partial<Record<keyof InquiryFields, FieldErrorCode>>;
    };

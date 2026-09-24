/**
 * Transactional email templates. Email clients require table layouts and
 * inline styles, so these are hand-written HTML strings (not React/Tailwind).
 * Every interpolated user value goes through `escapeHtml`.
 */
import { INQUIRY_PRODUCT_LABELS } from "../../shared/catalog.js";
import type { InquiryFields } from "../../shared/contact.js";
import type { Locale } from "../../shared/locales.js";

const BRAND = {
  ink: "#2B3A3D",
  inkDeep: "#141D1F",
  gold: "#D4A24C",
  paper: "#F7F5F0",
  muted: "#5A6D71",
  line: "#E3E1DA",
} as const;

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Strips CR/LF so user input can never inject extra email headers. */
export function headerSafe(value: string, max = 120): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

function layout(opts: { dir: "ltr" | "rtl"; preheader: string; body: string; footer: string }) {
  const align = opts.dir === "rtl" ? "right" : "left";
  return `<!doctype html>
<html dir="${opts.dir}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"></head>
<body style="margin:0;padding:0;background:${BRAND.paper};">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${escapeHtml(opts.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:14px;overflow:hidden;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.ink};text-align:${align};">
<tr><td style="background:${BRAND.inkDeep};padding:26px 32px;">
<div style="font-size:20px;font-weight:700;letter-spacing:6px;color:#ffffff;">VELTRON</div>
<div style="font-size:10px;letter-spacing:3px;color:${BRAND.gold};margin-top:4px;">GLOBAL TRADING LIMITED</div>
</td></tr>
<tr><td style="height:3px;background:${BRAND.gold};line-height:3px;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:32px;">${opts.body}</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid ${BRAND.line};font-size:12px;line-height:1.6;color:${BRAND.muted};">${opts.footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Notification → business inbox (always English)                      */
/* ------------------------------------------------------------------ */

type NotificationInput = {
  fields: InquiryFields;
  locale: Locale;
  ip: string;
  userAgent: string;
  receivedAt: Date;
  reference: string;
};

const LOCALE_NAMES: Record<Locale, string> = { en: "English", fr: "French", ar: "Arabic" };

export function notificationSubject({ fields, reference }: NotificationInput): string {
  const who = fields.company || fields.name;
  return headerSafe(
    `New inquiry · ${INQUIRY_PRODUCT_LABELS[fields.product]} · ${who} (${fields.country}) · ${reference}`,
    180,
  );
}

export function notificationEmail(input: NotificationInput): { html: string; text: string } {
  const { fields } = input;
  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Company", fields.company || "—"],
    ["Email", fields.email],
    ["Phone / WhatsApp", fields.phone || "—"],
    ["Country", fields.country],
    ["Product of interest", INQUIRY_PRODUCT_LABELS[fields.product]],
    ["Estimated quantity", fields.quantity || "—"],
    ["Destination port", fields.destinationPort || "—"],
    ["Preferred Incoterm", fields.incoterm ?? "—"],
    ["Site language", LOCALE_NAMES[input.locale]],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `<tr>
<td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};width:42%;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:15px;color:${BRAND.ink};vertical-align:top;">${escapeHtml(value)}</td>
</tr>`,
    )
    .join("");

  const body = `
<p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.gold};font-weight:600;">New website inquiry</p>
<h1 style="margin:0 0 24px;font-size:22px;line-height:1.3;color:${BRAND.inkDeep};">${escapeHtml(INQUIRY_PRODUCT_LABELS[fields.product])} — ${escapeHtml(fields.company || fields.name)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
<p style="margin:28px 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};">Message</p>
<div style="font-size:15px;line-height:1.65;white-space:pre-wrap;background:${BRAND.paper};border-radius:10px;padding:16px 18px;">${escapeHtml(fields.message)}</div>
<p style="margin:28px 0 0;"><a href="mailto:${encodeURIComponent(fields.email)}?subject=${encodeURIComponent(`Re: Your inquiry (${input.reference})`)}" style="display:inline-block;background:${BRAND.inkDeep};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600;">Reply to ${escapeHtml(fields.name)}</a></p>`;

  const footer = `Reference ${escapeHtml(input.reference)} · Received ${escapeHtml(input.receivedAt.toUTCString())}<br>IP ${escapeHtml(input.ip)} · ${escapeHtml(input.userAgent.slice(0, 160))}`;

  const text = [
    `NEW WEBSITE INQUIRY — ${input.reference}`,
    "",
    ...rows.map(([l, v]) => `${l}: ${v}`),
    "",
    "Message:",
    fields.message,
    "",
    `Received: ${input.receivedAt.toUTCString()} · IP ${input.ip}`,
  ].join("\n");

  return {
    html: layout({ dir: "ltr", preheader: fields.message.slice(0, 120), body, footer }),
    text,
  };
}

/* ------------------------------------------------------------------ */
/* Auto-reply → visitor (localized)                                    */
/* ------------------------------------------------------------------ */

const AUTOREPLY_COPY: Record<
  Locale,
  {
    subject: string;
    greeting: (n: string) => string;
    lines: string[];
    signoff: string;
    ref: string;
  }
> = {
  en: {
    subject: "We received your inquiry — VELTRON Global Trading",
    greeting: (n) => `Dear ${n},`,
    lines: [
      "Thank you for contacting VELTRON Global Trading Limited. Your inquiry has reached our trading desk.",
      "A member of our team will review your requirements and respond, usually within one business day.",
      "If you need to add specifications or documents, simply reply to this email.",
    ],
    signoff: "Kind regards,<br>VELTRON Trading Desk",
    ref: "Your reference",
  },
  fr: {
    subject: "Nous avons bien reçu votre demande — VELTRON Global Trading",
    greeting: (n) => `Bonjour ${n},`,
    lines: [
      "Merci d’avoir contacté VELTRON Global Trading Limited. Votre demande a bien été transmise à notre service commercial.",
      "Un membre de notre équipe étudiera vos besoins et vous répondra, généralement sous un jour ouvré.",
      "Pour ajouter des spécifications ou des documents, il vous suffit de répondre à cet e-mail.",
    ],
    signoff: "Cordialement,<br>Service commercial VELTRON",
    ref: "Votre référence",
  },
  ar: {
    subject: "تم استلام طلبكم — فيلترون للتجارة العالمية",
    greeting: (n) => `عزيزي/عزيزتي ${n}،`,
    lines: [
      "شكرًا لتواصلكم مع شركة فيلترون للتجارة العالمية المحدودة. لقد وصل طلبكم إلى فريق التداول لدينا.",
      "سيقوم أحد أعضاء فريقنا بمراجعة متطلباتكم والرد عليكم، عادةً خلال يوم عمل واحد.",
      "لإضافة مواصفات أو مستندات، يكفي الرد على هذه الرسالة.",
    ],
    signoff: "مع أطيب التحيات،<br>فريق التداول — فيلترون",
    ref: "رقمكم المرجعي",
  },
};

export function autoReplyEmail(params: { name: string; locale: Locale; reference: string }) {
  const copy = AUTOREPLY_COPY[params.locale];
  const dir = params.locale === "ar" ? "rtl" : "ltr";
  const body = `
<p style="margin:0 0 18px;font-size:16px;">${escapeHtml(copy.greeting(params.name))}</p>
${copy.lines.map((l) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">${escapeHtml(l)}</p>`).join("")}
<p style="margin:22px 0;font-size:13px;color:${BRAND.muted};">${escapeHtml(copy.ref)}: <strong style="color:${BRAND.ink};">${escapeHtml(params.reference)}</strong></p>
<p style="margin:0;font-size:15px;line-height:1.7;">${copy.signoff}</p>`;
  const footer =
    "VELTRON GLOBAL TRADING LIMITED<br>Flat 2401-16, 24/F, Wing Shing Industrial Building, 26 Ng Fong Street, San Po Kong, Hong Kong";
  const text = [
    copy.greeting(params.name),
    "",
    ...copy.lines,
    "",
    `${copy.ref}: ${params.reference}`,
    "",
    copy.signoff.replace("<br>", "\n"),
  ].join("\n");
  return {
    subject: copy.subject,
    html: layout({ dir, preheader: copy.lines[0] ?? "", body, footer }),
    text,
  };
}

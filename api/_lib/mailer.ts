import { Resend } from "resend";
import type { InquiryFields } from "../../shared/contact.js";
import type { Locale } from "../../shared/locales.js";
import {
  autoReplyEmail,
  headerSafe,
  notificationEmail,
  notificationSubject,
} from "./email-templates.js";
import type { ServerEnv } from "./env.js";

let client: Resend | null = null;
const getClient = (apiKey: string) => {
  client ??= new Resend(apiKey);
  return client;
};

type SendInquiryParams = {
  env: ServerEnv;
  fields: InquiryFields;
  locale: Locale;
  ip: string;
  userAgent: string;
  reference: string;
  idempotencyKey: string;
};

/** Delivers the inquiry to the business inbox (throws on failure). */
export async function sendInquiryNotification(params: SendInquiryParams): Promise<void> {
  const { env, fields } = params;
  const input = { ...params, receivedAt: new Date() };
  const { html, text } = notificationEmail(input);

  const { error } = await getClient(env.RESEND_API_KEY).emails.send(
    {
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: `${headerSafe(fields.name, 80).replace(/[<>"]/g, "")} <${fields.email}>`,
      subject: notificationSubject(input),
      html,
      text,
      tags: [
        { name: "category", value: "inquiry" },
        { name: "product", value: fields.product.replace(/[^a-zA-Z0-9_-]/g, "_") },
      ],
    },
    { idempotencyKey: `inquiry/${params.idempotencyKey}` },
  );

  if (error) throw new Error(`Resend notification failed: ${error.name} — ${error.message}`);
}

/** Sends the visitor a localized confirmation. Never throws — it is non-critical. */
export async function sendAutoReply(params: SendInquiryParams): Promise<void> {
  const { env, fields } = params;
  const mail = autoReplyEmail({
    name: fields.name,
    locale: params.locale,
    reference: params.reference,
  });
  try {
    const { error } = await getClient(env.RESEND_API_KEY).emails.send(
      {
        from: env.CONTACT_FROM_EMAIL,
        to: fields.email,
        replyTo: env.CONTACT_TO_EMAIL[0],
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        tags: [{ name: "category", value: "inquiry_autoreply" }],
      },
      { idempotencyKey: `autoreply/${params.idempotencyKey}` },
    );
    if (error) console.warn(`[mailer] auto-reply failed: ${error.name} — ${error.message}`);
  } catch (err) {
    console.warn("[mailer] auto-reply threw", err);
  }
}

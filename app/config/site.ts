/**
 * Company & site-wide constants. Public information only — never secrets.
 */

/**
 * Optional public contact details. Leave empty to hide them from the site —
 * inquiries are always delivered via the contact form (see CONTACT_TO_EMAIL).
 */
const PUBLIC_CONTACT: { email: string; phone: string; whatsapp: string } = {
  email: "",
  phone: "",
  whatsapp: "+213 550 68 40 00",
};

export const SITE = {
  name: "VELTRON Global Trading Limited",
  shortName: "VELTRON",
  legalName: "VELTRON GLOBAL TRADING LIMITED",
  /** Absolute origin used for canonical URLs, sitemap and Open Graph (no trailing slash). */
  url: __SITE_URL__,
  ogImage: "/og-image.png",
  themeColor: "#141D1F",
  address: {
    lines: [
      "Flat 2401-16, 24/F, Wing Shing Industrial Building",
      "26 Ng Fong Street, San Po Kong",
      "Hong Kong",
    ],
    street: "Flat 2401-16, 24/F, Wing Shing Industrial Building, 26 Ng Fong Street",
    locality: "San Po Kong",
    region: "Kowloon",
    country: "HK",
    mapQuery: "Wing Shing Industrial Building, 26 Ng Fong Street, San Po Kong, Hong Kong",
  },
  contact: PUBLIC_CONTACT,
  /** Office hours, Hong Kong Time (UTC+8). */
  hours: { open: "09:00", close: "18:00" },
} as const;

/** WhatsApp click-to-chat link, optionally with a pre-filled message. */
export function whatsappUrl(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Product-line identifiers shared by the web app (routes, content) and the
 * API (inquiry validation, email subject lines).
 */
export const PRODUCT_SLUGS = [
  "cement",
  "clinker",
  "gypsum",
  "construction-materials",
  "industrial-raw-materials",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export function isProductSlug(value: unknown): value is ProductSlug {
  return typeof value === "string" && (PRODUCT_SLUGS as readonly string[]).includes(value);
}

/** Values accepted by the inquiry form's "product of interest" field. */
export const INQUIRY_PRODUCTS = [...PRODUCT_SLUGS, "logistics", "other"] as const;
export type InquiryProduct = (typeof INQUIRY_PRODUCTS)[number];

export const INCOTERMS = ["FOB", "CFR", "CIF", "other"] as const;
export type Incoterm = (typeof INCOTERMS)[number];

/** English labels used server-side (email subject/body sent to the business). */
export const INQUIRY_PRODUCT_LABELS: Record<InquiryProduct, string> = {
  cement: "Cement",
  clinker: "Clinker",
  gypsum: "Gypsum",
  "construction-materials": "Construction Materials",
  "industrial-raw-materials": "Industrial Raw Materials",
  logistics: "Trade & Logistics Services",
  other: "Other",
};

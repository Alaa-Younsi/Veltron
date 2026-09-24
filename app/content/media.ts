import type { ImageName } from "~/lib/images.generated";
import type { ProductSlug } from "~shared/catalog";

/** Photography assigned to each product line (cover + supporting image). */
export const PRODUCT_MEDIA: Record<ProductSlug, { cover: ImageName; detail: ImageName }> = {
  cement: { cover: "cement-silos", detail: "concrete-pour" },
  clinker: { cover: "clinker-stockpile", detail: "bulk-carrier" },
  gypsum: { cover: "gypsum-quarry", detail: "aerial-quarry" },
  "construction-materials": { cover: "rebar-site", detail: "concrete-pour" },
  "industrial-raw-materials": { cover: "aerial-quarry", detail: "clinker-stockpile" },
};

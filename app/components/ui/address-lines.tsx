import { SITE } from "~/config/site";

/**
 * Company address, one line per block. Each line is bidi-isolated so the Latin
 * address reads correctly while still aligning with the page direction (including RTL locales).
 */
export function AddressLines() {
  return SITE.address.lines.map((line) => (
    <span key={line} className="block">
      <bdi>{line}</bdi>
    </span>
  ));
}

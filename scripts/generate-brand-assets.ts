/**
 * Generates every brand asset from the single source of truth in
 * `app/lib/brand/mark.ts` + the Montserrat font files in `scripts/fonts`.
 *
 * Outputs:
 *  - app/lib/brand/lockups.generated.ts  (outlined logo lockups for React)
 *  - public/brand/*.svg                  (logo files for press / partners)
 *  - public/favicon.svg, favicon.ico, apple-touch-icon.png,
 *    icon-192.png, icon-512.png, icon-maskable-512.png
 *  - public/og-image.png                 (1200×630 social preview)
 *
 * Run with: bun run assets:brand
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";
import { BRAND_COLORS, BRAND_NAME, BRAND_TAGLINE, MARK } from "../app/lib/brand/mark";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (...p: string[]) => join(root, ...p);

type Tone = "ink" | "gold";
type Part = { d: string; tone: Tone };
type Lockup = { width: number; height: number; parts: Part[] };

const r = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/* Geometry helpers                                                    */
/* ------------------------------------------------------------------ */

/** Transforms an absolute SVG path (M/L/H/V/Q/C/Z only) by scale + translate. */
function transformPath(d: string, s: number, tx: number, ty: number): string {
  const tokens = d.match(/[MLHVQCZ]|-?\d*\.?\d+/g) ?? [];
  let outPath = "";
  let cmd = "";
  let i = 0;
  let cx = 0;
  let cy = 0;
  const num = () => Number(tokens[i++]);
  const pt = () => {
    const x = num();
    const y = num();
    cx = x;
    cy = y;
    return `${r(x * s + tx)} ${r(y * s + ty)}`;
  };
  while (i < tokens.length) {
    const t = tokens[i];
    if (t && /[A-Z]/.test(t)) {
      cmd = t;
      i++;
      if (cmd === "Z") {
        outPath += "Z";
        continue;
      }
    }
    switch (cmd) {
      case "M":
      case "L":
        outPath += `${cmd}${pt()}`;
        break;
      case "H":
        cx = num();
        outPath += `L${r(cx * s + tx)} ${r(cy * s + ty)}`;
        break;
      case "V":
        cy = num();
        outPath += `L${r(cx * s + tx)} ${r(cy * s + ty)}`;
        break;
      case "Q":
        outPath += `Q${pt()} ${pt()}`;
        break;
      case "C":
        outPath += `C${pt()} ${pt()} ${pt()}`;
        break;
      default:
        throw new Error(`Unsupported path command "${cmd}"`);
    }
  }
  return outPath;
}

function markParts(x: number, y: number, height: number): Part[] {
  const s = height / MARK.height;
  return [
    { d: transformPath(MARK.vDark, s, x, y), tone: "ink" },
    { d: transformPath(MARK.gBody, s, x, y), tone: "ink" },
    { d: transformPath(MARK.vGold, s, x, y), tone: "gold" },
    { d: transformPath(MARK.gBar, s, x, y), tone: "gold" },
  ];
}

const rect = (x: number, y: number, w: number, h: number) =>
  `M${r(x)} ${r(y)}H${r(x + w)}V${r(y + h)}H${r(x)}Z`;

/* ------------------------------------------------------------------ */
/* Text outlining                                                      */
/* ------------------------------------------------------------------ */

type TextRun = { d: string; width: number };

/**
 * Serialises opentype.js path commands ourselves: the library's `toPathData`
 * number formatter emits "NaN" for certain fractional pen positions.
 */
function serializeCommands(commands: opentype.PathCommand[]): string {
  return commands
    .map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${r(c.x)} ${r(c.y)}`;
        case "Q":
          return `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`;
        case "C":
          return `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`;
        case "Z":
          return "Z";
        default:
          throw new Error("Unknown path command");
      }
    })
    .join("");
}

/**
 * Lays out uppercase text with an exact cap height, optionally stretching the
 * tracking so the run spans `targetWidth` precisely (optical edge to edge).
 */
function outlineText(
  font: opentype.Font,
  text: string,
  capHeight: number,
  x: number,
  capTop: number,
  opts: { tracking?: number; targetWidth?: number },
): TextRun {
  const capUnits = font.tables.os2?.sCapHeight ?? 700;
  const size = (capHeight / capUnits) * font.unitsPerEm;
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);

  // Natural ink width (no tracking) — advance widths minus side bearings at the ends.
  const advances = glyphs.map((g, idx) => {
    const next = glyphs[idx + 1];
    // getKerningValue returns NaN for some GPOS class pairs (e.g. space → letter).
    const rawKern = next ? font.getKerningValue(g, next) : 0;
    const kern = Number.isFinite(rawKern) ? rawKern : 0;
    return ((g.advanceWidth ?? 0) + kern) * scale;
  });
  const first = glyphs[0];
  const last = glyphs[glyphs.length - 1];
  if (!first || !last) throw new Error("Empty text");
  const lsb = (first.getBoundingBox().x1 ?? 0) * scale;
  const lastBox = last.getBoundingBox();
  const naturalInk = advances.slice(0, -1).reduce((a, b) => a + b, 0) + lastBox.x2 * scale - lsb;

  const gaps = glyphs.length - 1;
  const tracking =
    opts.targetWidth !== undefined ? (opts.targetWidth - naturalInk) / gaps : (opts.tracking ?? 0);

  const baseline = capTop + capHeight;
  let pen = x - lsb;
  const d: string[] = [];
  glyphs.forEach((g, idx) => {
    const glyphPath = serializeCommands(g.getPath(pen, baseline, size).commands);
    d.push(glyphPath);
    pen += (advances[idx] ?? 0) + tracking;
  });
  return { d: d.join(""), width: naturalInk + tracking * gaps };
}

/* ------------------------------------------------------------------ */
/* Lockups                                                             */
/* ------------------------------------------------------------------ */

function buildStacked(semi: opentype.Font): Lockup {
  // Proportions measured from the printed logo.
  const markH = 107.2;
  const markW = MARK.width * (markH / MARK.height);
  const nameCap = 29;
  const width = 262;
  const nameTop = markH + 15;
  const tagCap = 8.6;
  const tagTop = nameTop + nameCap + 8;
  const tagWidth = markW;
  const tagX = (width - tagWidth) / 2;
  const ruleGap = 6;
  const ruleH = 1.1;
  const ruleY = tagTop + tagCap / 2 - ruleH / 2;

  const name = outlineText(semi, BRAND_NAME, nameCap, 0, nameTop, { targetWidth: width });
  const tag = outlineText(semi, BRAND_TAGLINE, tagCap, tagX, tagTop, { targetWidth: tagWidth });

  return {
    width,
    height: tagTop + tagCap,
    parts: [
      ...markParts((width - markW) / 2, 0, markH),
      { d: name.d, tone: "ink" },
      { d: tag.d, tone: "ink" },
      { d: rect(0, ruleY, tagX - ruleGap, ruleH), tone: "gold" },
      {
        d: rect(tagX + tagWidth + ruleGap, ruleY, width - tagX - tagWidth - ruleGap, ruleH),
        tone: "gold",
      },
    ],
  };
}

function buildHorizontal(semi: opentype.Font): Lockup {
  const markH = 100;
  const markW = MARK.width * (markH / MARK.height);
  const gap = 26;
  const textX = markW + gap;
  const nameCap = 40;
  const tagCap = 11.5;
  const between = 13;
  const blockH = nameCap + between + tagCap;
  const top = (markH - blockH) / 2;

  const name = outlineText(semi, BRAND_NAME, nameCap, textX, top, { tracking: 9 });
  const tag = outlineText(semi, BRAND_TAGLINE, tagCap, textX, top + nameCap + between, {
    targetWidth: name.width,
  });

  return {
    width: r(textX + name.width),
    height: markH,
    parts: [...markParts(0, 0, markH), { d: name.d, tone: "ink" }, { d: tag.d, tone: "gold" }],
  };
}

/** Standalone "VELTRON" wordmark (used oversized in the footer). */
function buildWordmark(semi: opentype.Font): Lockup {
  const cap = 100;
  const name = outlineText(semi, BRAND_NAME, cap, 0, 0, { tracking: 14 });
  return { width: r(name.width), height: cap, parts: [{ d: name.d, tone: "ink" }] };
}

function buildMark(): Lockup {
  return { width: MARK.width, height: MARK.height, parts: markParts(0, 0, MARK.height) };
}

/* ------------------------------------------------------------------ */
/* SVG serialisation                                                   */
/* ------------------------------------------------------------------ */

type Palette = { ink: string; gold: [string, string] };
const onLight: Palette = {
  ink: BRAND_COLORS.ink,
  gold: [BRAND_COLORS.goldLight, BRAND_COLORS.goldDark],
};
const onDark: Palette = {
  ink: BRAND_COLORS.mist,
  gold: [BRAND_COLORS.goldLight, BRAND_COLORS.gold],
};

function goldGradient(id: string, [a, b]: [string, string]) {
  return `<linearGradient id="${id}" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
}

function lockupGroup(l: Lockup, p: Palette, gradId: string, transform = "") {
  const inks = l.parts
    .filter((x) => x.tone === "ink")
    .map((x) => x.d)
    .join("");
  const golds = l.parts
    .filter((x) => x.tone === "gold")
    .map((x) => `<path fill="url(#${gradId})" d="${x.d}"/>`)
    .join("");
  return `<g${transform ? ` transform="${transform}"` : ""}><path fill="${p.ink}" d="${inks}"/>${golds}</g>`;
}

function lockupSvg(l: Lockup, p: Palette, title: string, pad = 0) {
  const w = r(l.width + pad * 2);
  const h = r(l.height + pad * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title><defs>${goldGradient("g", p.gold)}</defs>${lockupGroup(l, p, "g", pad ? `translate(${pad} ${pad})` : "")}</svg>`;
}

/** App-icon tile: deep slate square with the mark in mist + gold. */
function tileSvg(size: number, opts: { rounded: boolean; markRatio: number }) {
  const mark = buildMark();
  const mw = size * opts.markRatio;
  const s = mw / mark.width;
  const mh = mark.height * s;
  const tx = (size - mw) / 2;
  const ty = (size - mh) / 2 + size * 0.01;
  const radius = opts.rounded ? size * 0.22 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BRAND_COLORS.ink}"/><stop offset="1" stop-color="${BRAND_COLORS.inkDeep}"/></linearGradient>${goldGradient("g", onDark.gold)}</defs><rect width="${size}" height="${size}" rx="${r(radius)}" fill="url(#bg)"/>${lockupGroup(mark, onDark, "g", `translate(${r(tx)} ${r(ty)}) scale(${r(s * 1000) / 1000})`)}</svg>`;
}

/* ------------------------------------------------------------------ */
/* ICO writer (PNG-compressed entries, supported by all modern browsers) */
/* ------------------------------------------------------------------ */

function buildIco(images: { size: number; png: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, png }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...images.map((x) => x.png)]);
}

/* ------------------------------------------------------------------ */
/* OG image                                                            */
/* ------------------------------------------------------------------ */

function ogSvg(stacked: Lockup, medium: opentype.Font) {
  const W = 1200;
  const H = 630;
  const logoW = 470;
  const s = logoW / stacked.width;
  const logoH = stacked.height * s;
  const lx = (W - logoW) / 2;
  const ly = 150;
  const line = "CEMENT  ·  CLINKER  ·  GYPSUM  ·  CONSTRUCTION MATERIALS  ·  RAW MATERIALS";
  const lineRun = outlineText(medium, line, 13, 0, 0, { tracking: 2.2 });
  const lineX = (W - lineRun.width) / 2;
  const lineY = ly + logoH + 70;
  const grid: string[] = [];
  for (let x = 0; x <= W; x += 60) grid.push(`M${x} 0V${H}`);
  for (let y = 0; y <= H; y += 60) grid.push(`M0 ${y}H${W}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
<radialGradient id="glow" cx="0.82" cy="0.05" r="0.75"><stop offset="0" stop-color="${BRAND_COLORS.gold}" stop-opacity="0.28"/><stop offset="1" stop-color="${BRAND_COLORS.gold}" stop-opacity="0"/></radialGradient>
<radialGradient id="glow2" cx="0.1" cy="1" r="0.7"><stop offset="0" stop-color="#3E5559" stop-opacity="0.55"/><stop offset="1" stop-color="#3E5559" stop-opacity="0"/></radialGradient>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.05"/><stop offset="1" stop-color="#fff" stop-opacity="0.015"/></linearGradient>
${goldGradient("g", onDark.gold)}
</defs>
<rect width="${W}" height="${H}" fill="${BRAND_COLORS.inkDeep}"/>
<rect width="${W}" height="${H}" fill="url(#glow2)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<path d="${grid.join("")}" stroke="url(#fade)" stroke-width="1"/>
${lockupGroup(stacked, onDark, "g", `translate(${r(lx)} ${ly}) scale(${r(s * 1000) / 1000})`)}
<path fill="${BRAND_COLORS.mist}" fill-opacity="0.72" transform="translate(${r(lineX)} ${r(lineY)})" d="${lineRun.d}"/>
<rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#g)"/>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

/** Rasterises an SVG supersampled (4×) and downscaled to `width` for crisp edges. */
async function png(svg: string, width: number) {
  return sharp(Buffer.from(svg), { density: 72 * 4 })
    .resize({ width })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  const [semiBuf, medBuf] = await Promise.all([
    readFile(out("scripts/fonts/Montserrat-SemiBold.ttf")),
    readFile(out("scripts/fonts/Montserrat-Medium.ttf")),
  ]);
  const toAB = (b: Buffer) =>
    b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
  const semi = opentype.parse(toAB(semiBuf));
  const medium = opentype.parse(toAB(medBuf));

  const stacked = buildStacked(semi);
  const horizontal = buildHorizontal(semi);
  const mark = buildMark();
  const wordmark = buildWordmark(semi);

  // 1. React module
  const ts = `// AUTO-GENERATED by scripts/generate-brand-assets.ts — do not edit by hand.
import type { Lockup } from "./types";

export const LOCKUPS = ${JSON.stringify({ stacked, horizontal, mark, wordmark }, null, 2)} as const satisfies Record<string, Lockup>;
`;
  await writeFile(out("app/lib/brand/lockups.generated.ts"), ts);

  // 2. Logo files
  await mkdir(out("public/brand"), { recursive: true });
  const title = "VELTRON Global Trading Limited";
  await Promise.all([
    writeFile(out("public/brand/veltron-logo.svg"), lockupSvg(stacked, onLight, title)),
    writeFile(out("public/brand/veltron-logo-light.svg"), lockupSvg(stacked, onDark, title)),
    writeFile(
      out("public/brand/veltron-logo-horizontal.svg"),
      lockupSvg(horizontal, onLight, title),
    ),
    writeFile(
      out("public/brand/veltron-logo-horizontal-light.svg"),
      lockupSvg(horizontal, onDark, title),
    ),
    writeFile(out("public/brand/veltron-mark.svg"), lockupSvg(mark, onLight, title)),
  ]);
  await writeFile(
    out("public/brand/veltron-logo.png"),
    await png(lockupSvg(stacked, onLight, title, 24), 1200),
  );

  // 3. Icons
  const favicon = tileSvg(64, { rounded: true, markRatio: 0.78 });
  await writeFile(out("public/favicon.svg"), favicon);
  const icoSizes = [16, 32, 48];
  const icoImages = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      png: await png(tileSvg(size, { rounded: true, markRatio: 0.8 }), size),
    })),
  );
  await writeFile(out("public/favicon.ico"), buildIco(icoImages));
  await writeFile(
    out("public/apple-touch-icon.png"),
    await png(tileSvg(180, { rounded: false, markRatio: 0.66 }), 180),
  );
  await writeFile(
    out("public/icon-192.png"),
    await png(tileSvg(192, { rounded: true, markRatio: 0.7 }), 192),
  );
  await writeFile(
    out("public/icon-512.png"),
    await png(tileSvg(512, { rounded: true, markRatio: 0.7 }), 512),
  );
  await writeFile(
    out("public/icon-maskable-512.png"),
    await png(tileSvg(512, { rounded: false, markRatio: 0.56 }), 512),
  );

  // 4. Social preview
  await writeFile(out("public/og-image.png"), await png(ogSvg(stacked, medium), 1200));

  console.log("✔ Brand assets generated");
}

await main();

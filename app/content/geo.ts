/**
 * Geographic reference points used by the trade-network map.
 * Coordinates are [longitude, latitude]. Projected screen positions are
 * pre-computed at build time by `scripts/generate-world-map.ts`.
 */

export type RegionId =
  | "gcc"
  | "africa"
  | "southAsia"
  | "southeastAsia"
  | "europe"
  | "americas"
  | "oceania";

export type GeoPointKind = "hub" | "origin" | "destination";

export type GeoPoint = {
  readonly id: string;
  readonly name: string;
  readonly coords: readonly [number, number];
  readonly kind: GeoPointKind;
  readonly region?: RegionId;
};

export const GEO_POINTS = [
  { id: "hkg", name: "Hong Kong", coords: [114.17, 22.32], kind: "hub" },

  // Sourcing origins
  {
    id: "gzh",
    name: "Guangzhou",
    coords: [113.26, 23.13],
    kind: "origin",
    region: "southeastAsia",
  },
  {
    id: "hph",
    name: "Hai Phong",
    coords: [106.68, 20.86],
    kind: "origin",
    region: "southeastAsia",
  },
  {
    id: "bkk",
    name: "Map Ta Phut",
    coords: [101.15, 12.68],
    kind: "origin",
    region: "southeastAsia",
  },
  { id: "jkt", name: "Jakarta", coords: [106.85, -6.2], kind: "origin", region: "southeastAsia" },
  { id: "fjr", name: "Fujairah", coords: [56.33, 25.12], kind: "origin", region: "gcc" },
  { id: "soh", name: "Sohar", coords: [56.7, 24.35], kind: "origin", region: "gcc" },
  { id: "khi", name: "Karachi", coords: [67.0, 24.86], kind: "origin", region: "southAsia" },
  { id: "suz", name: "Suez", coords: [32.55, 29.97], kind: "origin", region: "africa" },
  { id: "ist", name: "Istanbul", coords: [28.98, 41.0], kind: "origin", region: "europe" },

  // Destination markets
  { id: "jed", name: "Jeddah", coords: [39.17, 21.49], kind: "destination", region: "gcc" },
  { id: "dmm", name: "Dammam", coords: [50.1, 26.43], kind: "destination", region: "gcc" },
  { id: "los", name: "Lagos", coords: [3.38, 6.52], kind: "destination", region: "africa" },
  { id: "abj", name: "Abidjan", coords: [-4.02, 5.32], kind: "destination", region: "africa" },
  { id: "dkr", name: "Dakar", coords: [-17.44, 14.69], kind: "destination", region: "africa" },
  { id: "mba", name: "Mombasa", coords: [39.67, -4.04], kind: "destination", region: "africa" },
  {
    id: "dar",
    name: "Dar es Salaam",
    coords: [39.28, -6.8],
    kind: "destination",
    region: "africa",
  },
  {
    id: "cgp",
    name: "Chattogram",
    coords: [91.8, 22.33],
    kind: "destination",
    region: "southAsia",
  },
  { id: "cmb", name: "Colombo", coords: [79.86, 6.93], kind: "destination", region: "southAsia" },
  {
    id: "mnl",
    name: "Manila",
    coords: [120.98, 14.6],
    kind: "destination",
    region: "southeastAsia",
  },
  { id: "bne", name: "Brisbane", coords: [153.03, -27.47], kind: "destination", region: "oceania" },
  {
    id: "pom",
    name: "Port Moresby",
    coords: [147.18, -9.44],
    kind: "destination",
    region: "oceania",
  },
  { id: "rtm", name: "Rotterdam", coords: [4.4, 51.9], kind: "destination", region: "europe" },
  { id: "pir", name: "Piraeus", coords: [23.64, 37.94], kind: "destination", region: "europe" },
  { id: "clo", name: "Callao", coords: [-77.15, -12.05], kind: "destination", region: "americas" },
  { id: "hou", name: "Houston", coords: [-95.27, 29.73], kind: "destination", region: "americas" },
  { id: "ssz", name: "Santos", coords: [-46.33, -23.96], kind: "destination", region: "americas" },
] as const satisfies readonly GeoPoint[];

export type GeoPointId = (typeof GEO_POINTS)[number]["id"];

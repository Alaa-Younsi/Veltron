/**
 * VELTRON "VG" monogram — single source of truth.
 *
 * Geometry was traced from the client's printed logo and rebuilt on two
 * consistent diagonal slopes (dark strokes lean right, gold strokes lean left),
 * so every downstream asset (React component, favicons, OG image) is pixel-exact.
 */

export const BRAND_COLORS = {
  ink: "#2B3A3D",
  inkDeep: "#141D1F",
  goldLight: "#E6BF6E",
  gold: "#D4A24C",
  goldDark: "#B3853C",
  paper: "#F7F5F0",
  mist: "#E8EDED",
} as const;

export const MARK = {
  width: 202.1,
  height: 107.2,
  /** Dark left arm of the V. */
  vDark: "M0 0H31L89.05 88.9L82.3 101Q78.5 107.5 73.9 107.2Q70 107 67.8 103.3Z",
  /** Gold right arm of the V. */
  vGold: "M118 0H141.4L89.05 88.9L76.74 70.05Z",
  /** Gold top bar of the G. */
  gBar: "M150.5 0H206.5L195.1 19.4H139.1Z",
  /** Dark body of the G. */
  gBody:
    "M202.1 43H151.4L141.1 60.5H180.3V81.9H135.5C126.5 81.9 119.5 71.2 113.6 62.2L100.7 84.1C107.2 94.1 114.5 103.6 132.5 103.6H202.1Z",
} as const;

export const BRAND_NAME = "VELTRON";
export const BRAND_TAGLINE = "GLOBAL TRADING LIMITED";

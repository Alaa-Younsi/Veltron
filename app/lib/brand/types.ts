type LockupTone = "ink" | "gold";

export type LockupPart = {
  readonly d: string;
  readonly tone: LockupTone;
};

export type Lockup = {
  readonly width: number;
  readonly height: number;
  readonly parts: readonly LockupPart[];
};

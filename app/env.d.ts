/// <reference types="vite/client" />

/** Absolute site origin, injected at build time by `vite.config.ts`. */
declare const __SITE_URL__: string;

// biome-ignore lint/style/useConsistentTypeDefinitions: must be an interface to merge with Vite's declaration
interface ImportMetaEnv {
  /** Cloudflare Turnstile public site key. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_SITE_URL?: string;
}

// biome-ignore lint/style/useConsistentTypeDefinitions: must be an interface to merge with Vite's declaration
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

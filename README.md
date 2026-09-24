# VELTRON Global Trading Limited — Website

Corporate website for **VELTRON Global Trading Limited** (Hong Kong): international trading of cement,
clinker, gypsum, construction materials and industrial raw materials.

- 🌍 Trilingual — **English (default), French, Simplified Chinese** — with `hreflang` and localized SEO
- 💬 Floating WhatsApp click-to-chat button with a localized pre-filled message
- ⚡ Fully **pre-rendered static HTML** (37 pages) that hydrates into a SPA — fast, crawlable, cheap to host
- ✉️ **Inquiry backend** on Vercel Functions: validation, anti-spam (Turnstile + honeypot + timing), rate limiting and branded emails via Resend

---

## Tech stack

| Area | Choice |
| --- | --- |
| Runtime & package manager | [Bun](https://bun.sh) |
| Framework | React 19 + [React Router 8](https://reactrouter.com) (framework mode, `ssr: false` + pre-rendering) on Vite 8 |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 (design tokens in `app/app.css`) |
| Motion | [Motion](https://motion.dev) (`LazyMotion`, reduced-motion aware) |
| Forms | react-hook-form + zod (one schema shared by browser and API) |
| Email | [Resend](https://resend.com) |
| Anti-spam | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/), honeypot, fill-time heuristic |
| Rate limiting | [Upstash Redis](https://upstash.com) (optional; in-memory fallback) |
| Lint & format | [Biome](https://biomejs.dev) |
| Hosting | [Vercel](https://vercel.com) (static output + Node.js Functions) |

## Project structure

```
api/                      Vercel Functions (server-only)
  contact.ts              POST /api/contact — inquiry endpoint
  _lib/                   env validation, rate limit, Turnstile, Resend mailer, email templates
shared/                   Code shared by browser + API (zod schema, product catalog, locales)
app/
  root.tsx                Document shell, error boundary
  routes.ts               Route table (/:lang/...)
  routes/                 Pages (loaders run at build time → per-page content only)
  components/             brand · layout · sections · ui · forms · map
  i18n/dictionaries/      ✏️  ALL SITE COPY — en.ts (master), fr.ts, zh.ts
  config/site.ts          ✏️  Company details (address, optional public email/phone)
  config/paths.ts         URL structure
  content/                Map coordinates, product ↔ image mapping
  lib/                    SEO helpers, generated brand/image manifests
public/                   Favicons, OG image, logo files, optimized images
scripts/                  Asset pipelines (brand, images, world map) + post-build checks
tooling/                  Dev-only Vite plugin that serves /api locally
```

## Getting started

```bash
bun install
cp .env.example .env      # then fill in values (see below)
bun run dev               # http://localhost:5173 — the site AND /api/contact
```

The dev server runs the real API code, so the full inquiry flow works locally. Without a
`VITE_TURNSTILE_SITE_KEY`, local development automatically uses Cloudflare's always-pass test key.
For local testing, set `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` (test secret).

### Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Dev server with HMR + local API |
| `bun run build` | Production build + pre-rendering + post-build verification |
| `bun run preview` | Serve the production build locally |
| `bun run typecheck` | Route type generation + `tsc` |
| `bun run lint` / `lint:fix` | Biome lint + format check / autofix |
| `bun run lint:deadcode` | [knip](https://knip.dev) — unused files, exports, types and dependencies |
| `bun run format` | Biome format |
| `bun run check` | typecheck + lint + dead-code + build (run before every push) |
| `bun run assets:brand` | Regenerate logo lockups, favicons, app icons and OG image |
| `bun run assets:images` | Re-optimize photos from `scripts/images-source` → AVIF/WebP |
| `bun run assets:brand` also | Writes the film-grain texture (`public/textures/grain.png`) |
| `bun run assets:map` | Regenerate the 2D dot map (`public/data/world-dots.svg`) and 3D globe dots (`public/data/globe-land.bin`) |

## Environment variables

See [`.env.example`](.env.example). **Never commit `.env`.**

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | server | ✅ | Resend API key |
| `CONTACT_TO_EMAIL` | server | ✅ | Business inbox receiving inquiries (comma-separated for several) |
| `CONTACT_FROM_EMAIL` | server | ✅ | Verified sender, e.g. `VELTRON Website <website@yourdomain.com>` |
| `TURNSTILE_SECRET_KEY` | server | ✅ | Cloudflare Turnstile secret key |
| `VITE_TURNSTILE_SITE_KEY` | public | ✅ (prod) | Cloudflare Turnstile site key |
| `VITE_SITE_URL` | public | recommended | Canonical origin, e.g. `https://www.veltron.com` (falls back to the Vercel production domain) |
| `CONTACT_AUTOREPLY` | server | – | `true` to send the visitor a localized confirmation |
| `ALLOWED_ORIGINS` | server | – | Extra origins allowed to call the API |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | server | recommended | Global rate limiting across function instances |

If a required server variable is missing, the API responds `503` and logs **which** variable is
missing (never its value); the form shows a friendly "temporarily unavailable" message.

## Deployment (GitHub → Vercel)

Runtime: **Node.js 22** (pinned via `engines`). The repository is already on GitHub
(`Alaa-Younsi/Veltron`); every push to `main` redeploys once the project is linked.

1. **Import in Vercel** → *Add New… → Project* → select the repo. `vercel.json` already defines the
   install/build commands (Bun), output directory, functions, redirects, caching and security headers —
   keep the framework preset as **Other**.
2. **Set environment variables** (Project → Settings → Environment Variables) for *Production* and *Preview*.
3. **Resend** — add and verify your sending domain (DNS records) at resend.com, then use an address on
   that domain for `CONTACT_FROM_EMAIL`. Until the domain is verified, Resend only delivers to the
   account owner's own address.
4. **Turnstile** — create a widget at dash.cloudflare.com → Turnstile, add your production domain(s) and
   your `…vercel.app` deployment domain(s) as hostnames, copy the site/secret keys into the env vars.
   `VITE_TURNSTILE_SITE_KEY` is inlined at **build time** — redeploy after setting it. Without it the
   production form cannot be submitted (the always-pass test key is dev-only by design).
5. **Custom domain** — add it in Vercel → Domains, then set `VITE_SITE_URL` and redeploy so canonical
   URLs, the sitemap and Open Graph tags use it.
6. (Recommended) **Upstash** — create a Redis database (Vercel Marketplace integration) for global rate limiting.

## How it works

- **Routing & i18n** — every page lives under `/{en|fr|zh}/…`. English is the default: `/` redirects to
  `/en` (Vercel redirect, with a client-side fallback page). Switching language keeps the visitor on the same page.
  Chinese text uses the platform's CJK system fonts (PingFang SC / Microsoft YaHei / Noto Sans SC) — no web-font download.
- **Pre-rendering** — each route's `loader` runs at build time and returns only the copy that page needs,
  so dictionaries never ship in the JavaScript bundle. Unknown URLs are served by `404.html` with a real 404 status.
- **Inquiry pipeline** (`api/contact.ts`): origin check → JSON/size limits → rate limit → zod validation →
  honeypot & fill-time heuristics (bots get a silent 200) → Turnstile verification → Resend notification
  (idempotent, reply-to = visitor) → optional localized auto-reply.
- **Security** — strict CSP, HSTS, `X-Frame-Options: DENY`, no secrets in the client, all user input
  HTML-escaped in emails and header-injection-safe subjects.

### Go-live verification

After deploying with real environment variables:

1. Open `/en/contact`, submit a test inquiry → it should arrive in `CONTACT_TO_EMAIL` with
   *Reply-To* set to the visitor (and a localized confirmation if `CONTACT_AUTOREPLY=true`).
2. Repeat from `/fr/contact` and `/zh/contact` (the notification shows the site language).
3. Check `https://<domain>/sitemap.xml` and `/robots.txt` use the production domain.
4. Submit the sitemap in Google Search Console.

## Quality gates

`bun run check` must pass before every push. It covers strict TypeScript, Biome lint/format,
knip dead-code analysis and a production build whose post-build step verifies that all 37 pages
were pre-rendered. Generated files (`*.generated.ts`) are excluded from Biome and rebuilt by the
`assets:*` scripts.

## Editing content

- **Text** — `app/i18n/dictionaries/en.ts` is the master copy; `fr.ts` and `zh.ts` are type-checked
  against it, so a missing translation fails the build.
- **Company details** — `app/config/site.ts` (address, WhatsApp number used by the floating button,
  optional public email / phone — leave empty to hide).
- **Photos** — replace files in `scripts/images-source/` (same file names) and run `bun run assets:images`.
  Current photos are **CC0 / public domain** (see `scripts/images-source/credits.json`) and are
  placeholders until the client provides their own photography.
- **Logo** — geometry lives in `app/lib/brand/mark.ts`; run `bun run assets:brand` after changes.

## Notes

- Product specifications are typical values and are labelled as such on the site; final specifications
  are confirmed per contract.
- Fonts: Montserrat and Inter (SIL Open Font License), self-hosted; Chinese uses system fonts.
- knip reports the font packages, `tailwindcss` and `world-atlas` as unused because they are consumed
  from CSS / by file path; they are listed in `knip.json` → `ignoreDependencies`.

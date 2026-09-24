import { Link } from "react-router";
import { Logo } from "~/components/brand/logo";
import { ButtonLink } from "~/components/ui/button";
import { pagePath } from "~/config/paths";
import { LOCALE_META, LOCALES, type Locale } from "~/i18n/config";
import { NOT_FOUND_COPY } from "~/i18n/not-found-copy";

type NotFoundViewProps = {
  locale: Locale;
  variant?: "not-found" | "error";
  details?: string;
};

/** Standalone branded 404 / error screen (renders outside the locale layout). */
export function NotFoundView({ locale, variant = "not-found", details }: NotFoundViewProps) {
  const copy = NOT_FOUND_COPY[locale];

  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-950 text-white">
      <title>{`${variant === "error" ? "Error" : copy.title} | VELTRON Global Trading Limited`}</title>
      <meta name="robots" content="noindex" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-70" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
      <div
        aria-hidden="true"
        className="absolute end-[-10%] -top-40 -z-10 size-[40rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-page flex h-20 items-center">
        <Link to={pagePath(locale, "home")} className="text-white" aria-label="VELTRON">
          <Logo variant="horizontal" title={null} className="w-[176px]" />
        </Link>
      </div>

      <div className="container-page flex flex-1 flex-col justify-center py-20">
        <p className="ltr-nums font-display font-semibold text-8xl text-gold-gradient leading-none sm:text-9xl">
          {variant === "error" ? "500" : "404"}
        </p>
        <h1 className="mt-8 max-w-2xl font-semibold text-4xl text-white tracking-tight sm:text-5xl">
          {copy.heading}
        </h1>
        <p className="mt-5 max-w-xl text-ink-200 text-lg">{copy.text}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink to={pagePath(locale, "home")} variant="gold" size="lg" arrow>
            {copy.home}
          </ButtonLink>
          <div className="flex gap-2">
            {LOCALES.filter((l) => l !== locale).map((l) => (
              <Link
                key={l}
                to={pagePath(l, "home")}
                lang={l}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 hover:border-white/40 hover:text-white"
              >
                {LOCALE_META[l].label}
              </Link>
            ))}
          </div>
        </div>
        {details ? (
          <pre className="mt-12 max-h-72 overflow-auto rounded-xl bg-black/40 p-4 text-ink-300 text-xs">
            {details}
          </pre>
        ) : null}
      </div>
    </main>
  );
}

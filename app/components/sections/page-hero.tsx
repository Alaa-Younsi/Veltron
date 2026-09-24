import type { ReactNode } from "react";
import { Eyebrow } from "~/components/ui/eyebrow";
import { Picture } from "~/components/ui/picture";
import type { ImageName } from "~/lib/images.generated";
import { cn } from "~/lib/utils";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  image?: ImageName;
  imageAlt?: string;
  crumbs?: Crumb[];
  breadcrumbLabel?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Dark editorial hero shared by inner pages. Entrance uses CSS animation so
 * the headline (LCP) paints immediately from the pre-rendered HTML.
 */
export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  crumbs,
  breadcrumbLabel,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-ink-950 text-white", className)}>
      {image ? (
        <>
          <Picture
            name={image}
            alt={imageAlt}
            sizes="100vw"
            priority
            className="absolute inset-0 -z-20 animate-fade"
            imgClassName="opacity-45"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/75 to-ink-950/40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/90 via-ink-950/40 to-transparent rtl:bg-linear-to-l"
          />
        </>
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-70" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />

      <div className="container-page flex min-h-[30rem] flex-col justify-end pt-36 pb-16 sm:min-h-[34rem] sm:pb-20 lg:pt-44">
        {crumbs && breadcrumbLabel ? (
          <Breadcrumbs items={crumbs} label={breadcrumbLabel} className="mb-10 animate-rise" />
        ) : null}
        <div className="flex max-w-3xl flex-col gap-6">
          <Eyebrow tone="light" className="animate-rise [animation-delay:80ms]">
            {eyebrow}
          </Eyebrow>
          <h1 className="animate-rise font-semibold text-4xl text-white leading-[1.06] tracking-tight [animation-delay:160ms] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl animate-rise text-ink-200 text-lg leading-relaxed [animation-delay:260ms]">
            {text}
          </p>
          {children ? <div className="animate-rise [animation-delay:360ms]">{children}</div> : null}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-px bg-linear-to-r from-transparent via-gold-500/60 to-transparent"
      />
    </section>
  );
}

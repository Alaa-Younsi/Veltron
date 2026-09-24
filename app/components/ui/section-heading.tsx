import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const TITLE_VARIANTS: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: 0.08 } },
};

/**
 * Section intro: eyebrow and body fade up, while the title slides up out of a
 * clipping mask for an editorial "type reveal".
 */
export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "dark",
  align = "start",
  as: Heading = "h2",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={tone} align={align}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}
      <Heading
        className={cn(
          "font-semibold text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        {/* The (unclipped) mask is observed — observing the clipped title itself would
            never intersect. Padding + negative margin keep descenders visible. */}
        <m.span
          className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <m.span className="block" variants={TITLE_VARIANTS} data-reveal="">
            {title}
          </m.span>
        </m.span>
      </Heading>
      {text ? (
        <Reveal delay={0.18}>
          <p
            className={cn(
              "text-base leading-relaxed sm:text-lg",
              tone === "light" ? "text-ink-200" : "text-ink-500",
            )}
          >
            {text}
          </p>
        </Reveal>
      ) : null}
      {children ? <Reveal delay={0.26}>{children}</Reveal> : null}
    </div>
  );
}

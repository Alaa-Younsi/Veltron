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
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} align={align}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading
        className={cn(
          "font-semibold text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </Heading>
      {text ? (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-ink-200" : "text-ink-500",
          )}
        >
          {text}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}

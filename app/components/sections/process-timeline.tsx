import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import { cn } from "~/lib/utils";

type Step = { title: string; text: string };

type ProcessTimelineProps = {
  eyebrow: string;
  title: string;
  steps: Step[];
  tone?: "dark" | "light";
  columns?: 3 | 5 | 6;
};

/** Numbered step sequence — horizontal rail on desktop, vertical on mobile. */
export function ProcessTimeline({
  eyebrow,
  title,
  steps,
  tone = "dark",
  columns = 5,
}: ProcessTimelineProps) {
  const light = tone === "light";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-24 sm:py-32",
        light ? "bg-ink-950 text-white" : "bg-paper",
      )}
    >
      {light ? (
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
      ) : null}
      <div className="container-page relative">
        <SectionHeading eyebrow={eyebrow} title={title} tone={light ? "light" : "dark"} />

        <div className="relative mt-16">
          {columns === 5 ? (
            <div
              aria-hidden="true"
              className={cn(
                "timeline-draw absolute inset-x-0 top-6 hidden h-px lg:block",
                light ? "bg-white/15" : "bg-ink-900/10",
              )}
            />
          ) : null}
          <ol
            className={cn(
              "relative grid gap-10",
              columns === 5 && "lg:grid-cols-5 lg:gap-6",
              columns === 6 && "md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14",
              columns === 3 && "lg:grid-cols-3",
            )}
          >
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 0.08}
                className="relative flex gap-6 lg:flex-col"
              >
                <span
                  className={cn(
                    "ltr-nums relative z-10 grid size-12 shrink-0 place-items-center rounded-full border font-display font-semibold text-sm",
                    light
                      ? "border-gold-400/40 bg-ink-950 text-gold-300"
                      : "border-gold-600/40 bg-paper text-gold-700",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={cn(
                      "font-semibold text-lg tracking-tight",
                      light ? "text-white" : "text-ink-900",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-[15px] leading-relaxed",
                      light ? "text-ink-300" : "text-ink-500",
                    )}
                  >
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { FileCheck2, type LucideIcon, Network, ShieldCheck, Ship } from "lucide-react";
import { SpotlightGroup } from "~/components/motion/spotlight-group";
import { Picture } from "~/components/ui/picture";
import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import type { Dictionary } from "~/i18n/dictionaries/en";

type WhyContent = Dictionary["pages"]["home"]["why"];

const ICONS: Record<keyof WhyContent["items"], LucideIcon> = {
  sourcing: Network,
  quality: ShieldCheck,
  logistics: Ship,
  terms: FileCheck2,
};

export function WhySection({ content }: { content: WhyContent }) {
  const entries = Object.entries(content.items) as [
    keyof WhyContent["items"],
    { title: string; text: string },
  ][];

  return (
    <section className="bg-sand/60 py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow={content.eyebrow} title={content.title} />
            <Reveal
              delay={0.15}
              className="mt-10 hidden overflow-hidden rounded-[1.75rem] lg:block"
            >
              <Picture name="bulk-carrier" alt="" sizes="40vw" className="aspect-[4/3]" />
            </Reveal>
          </div>
        </div>

        <SpotlightGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {entries.map(([key, item], index) => {
            const Icon = ICONS[key];
            return (
              <Reveal
                as="li"
                key={key}
                delay={index * 0.08}
                className="spotlight group flex flex-col gap-5 overflow-hidden rounded-[1.5rem] border border-line bg-white p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(15_23_25/0.3)]"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-ink-900 text-gold-300 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
                </span>
                <h3 className="font-semibold text-ink-900 text-xl tracking-tight">{item.title}</h3>
                <p className="text-ink-500 leading-relaxed">{item.text}</p>
                <span
                  aria-hidden="true"
                  className="ltr-nums absolute end-7 top-6 font-display font-semibold text-5xl text-ink-900/[0.05]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Reveal>
            );
          })}
        </SpotlightGroup>
      </div>
    </section>
  );
}

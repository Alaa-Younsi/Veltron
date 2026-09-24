import { Reveal } from "~/components/ui/reveal";

type Stat = { value: string; label: string };

export function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-line border-y bg-white">
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.08}
            className="flex flex-col gap-3 border-line not-first:border-s px-2 py-10 max-lg:nth-3:border-s-0 max-lg:nth-[n+3]:border-t sm:px-8 sm:py-14"
          >
            <dt className="order-2 max-w-[14rem] text-ink-500 text-sm leading-snug">
              {stat.label}
            </dt>
            <dd className="ltr-nums order-1 self-start font-display font-semibold text-5xl text-gold-gradient leading-none sm:text-6xl">
              {stat.value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

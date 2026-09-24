import { useLocaleContext } from "~/i18n/use-locale";
import { cn } from "~/lib/utils";

/** Slow, infinite commodity ticker. The duplicate track is hidden from assistive tech. */
export function Marquee({ items }: { items: string[] }) {
  const { locale } = useLocaleContext();
  const rtl = locale === "ar";

  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-display font-semibold text-2xl text-ink-100/90 uppercase tracking-[0.08em] sm:text-3xl">
            {item}
          </span>
          <span aria-hidden="true" className="size-2 rotate-45 bg-gold-500" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="relative overflow-hidden border-white/[0.06] border-y bg-ink-900 py-7">
      <div
        className={cn("mask-fade-x flex w-max", rtl ? "animate-marquee-rtl" : "animate-marquee")}
      >
        {track(false)}
        {track(true)}
      </div>
    </section>
  );
}

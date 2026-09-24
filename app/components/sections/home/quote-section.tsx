import { Picture } from "~/components/ui/picture";
import { Reveal } from "~/components/ui/reveal";

export function QuoteSection({ text, author }: { text: string; author: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-28 text-white sm:py-40">
      <Picture
        name="hong-kong-harbour"
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-20"
        imgClassName="opacity-30 grayscale"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-ink-950/80 via-ink-950/50 to-ink-950/90"
      />
      <Reveal className="container-page flex max-w-5xl flex-col items-center text-center">
        <span aria-hidden="true" className="font-display text-7xl text-gold-400 leading-none">
          “
        </span>
        <blockquote className="mt-4">
          <p className="font-display font-medium text-2xl text-white leading-snug tracking-tight sm:text-4xl">
            {text}
          </p>
          <footer className="mt-8 flex items-center justify-center gap-3 text-gold-300 text-sm uppercase tracking-eyebrow">
            <span aria-hidden="true" className="h-px w-8 bg-gold-400" />
            {author}
            <span aria-hidden="true" className="h-px w-8 bg-gold-400" />
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}

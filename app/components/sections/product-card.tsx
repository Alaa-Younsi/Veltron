import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Picture } from "~/components/ui/picture";
import type { ImageName } from "~/lib/images.generated";
import { cn } from "~/lib/utils";

type ProductCardProps = {
  to: string;
  index: number;
  name: string;
  text: string;
  image: ImageName;
  sizes: string;
  featured?: boolean;
  className?: string;
};

/** Image-led product tile with an editorial index number and hover motion. */
export function ProductCard({
  to,
  index,
  name,
  text,
  image,
  sizes,
  featured = false,
  className,
}: ProductCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink-900 p-7 text-white sm:p-8",
        featured && "min-h-[26rem] lg:min-h-full",
        className,
      )}
    >
      <Picture
        name={image}
        alt=""
        sizes={sizes}
        className="absolute inset-0 -z-20"
        imgClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/55 to-ink-950/5 transition-opacity duration-700 group-hover:opacity-90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-ink-950/70 to-transparent"
      />
      <span className="ltr-nums absolute start-7 top-7 font-display font-semibold text-gold-300 text-xs tracking-[0.2em] sm:start-8 sm:top-8">
        {String(index).padStart(2, "0")}
      </span>
      <span
        aria-hidden="true"
        className="absolute end-6 top-6 grid size-11 place-items-center rounded-full border border-white/25 bg-white/5 backdrop-blur-sm transition-all duration-500 ease-out-expo group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-ink-950"
      >
        <ArrowUpRight className="size-5 rtl:-scale-x-100" />
      </span>
      <h3
        className={cn(
          "font-semibold text-white tracking-tight",
          featured ? "text-3xl sm:text-4xl" : "text-2xl",
        )}
      >
        {name}
      </h3>
      <p
        className={cn(
          "mt-3 text-ink-200 leading-relaxed",
          featured ? "max-w-md text-base sm:text-lg" : "text-sm",
        )}
      >
        {text}
      </p>
      <span
        aria-hidden="true"
        className="mt-6 h-px w-12 bg-gold-400 transition-all duration-700 ease-out-expo group-hover:w-24"
      />
    </Link>
  );
}

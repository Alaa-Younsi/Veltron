import { IMAGES, type ImageName } from "~/lib/images.generated";
import { cn } from "~/lib/utils";

type PictureProps = {
  name: ImageName;
  alt: string;
  /** `sizes` attribute — describe the rendered width for accurate srcset selection. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Eager-load + high priority for above-the-fold imagery. */
  priority?: boolean;
};

const srcSet = (name: ImageName, widths: readonly number[], ext: "avif" | "webp") =>
  widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");

/**
 * Responsive, art-directed image: AVIF with WebP fallback, intrinsic
 * dimensions (no layout shift) and a blurred placeholder while loading.
 */
export function Picture({
  name,
  alt,
  sizes,
  className,
  imgClassName,
  priority = false,
}: PictureProps) {
  const image = IMAGES[name];
  const largest = image.widths[image.widths.length - 1] ?? image.width;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={image.placeholder}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full scale-110 object-cover blur-xl"
      />
      <picture>
        <source type="image/avif" srcSet={srcSet(name, image.widths, "avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet(name, image.widths, "webp")} sizes={sizes} />
        <img
          src={`/images/${name}-${largest}.webp`}
          alt={alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={cn("relative size-full object-cover", imgClassName)}
        />
      </picture>
    </div>
  );
}

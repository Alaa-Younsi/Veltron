import { ProductCard } from "~/components/sections/product-card";
import { ButtonLink } from "~/components/ui/button";
import { Reveal } from "~/components/ui/reveal";
import { SectionHeading } from "~/components/ui/section-heading";
import { pagePath, productPath } from "~/config/paths";
import { PRODUCT_MEDIA } from "~/content/media";
import { useLocaleContext } from "~/i18n/use-locale";
import { cn } from "~/lib/utils";

type ProductsShowcaseProps = {
  heading: { eyebrow: string; title: string; text: string };
};

/** Bento layout: cement featured, the other four lines around it. */
const LAYOUT = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
] as const;

export function ProductsShowcase({ heading }: ProductsShowcaseProps) {
  const { locale, common, productNav } = useLocaleContext();

  return (
    <section className="container-page py-24 sm:py-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} text={heading.text} />
        <Reveal delay={0.1}>
          <ButtonLink to={pagePath(locale, "products")} variant="outline" arrow>
            {common.nav.allProducts}
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {productNav.map((product, index) => (
          <Reveal
            key={product.slug}
            delay={index * 0.06}
            className={cn("flex", index === 0 && "sm:col-span-2", LAYOUT[index])}
          >
            <ProductCard
              to={productPath(locale, product.slug)}
              index={index + 1}
              name={product.name}
              text={product.short}
              image={PRODUCT_MEDIA[product.slug].cover}
              featured={index === 0}
              sizes={
                index === 0
                  ? "(min-width: 1024px) 58vw, 100vw"
                  : "(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
              }
              className="w-full"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

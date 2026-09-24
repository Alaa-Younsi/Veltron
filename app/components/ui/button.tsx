import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router";
import { useMagnetic } from "~/hooks/use-pointer-effects";
import { cn } from "~/lib/utils";

const VARIANTS = {
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-[0_10px_30px_-12px_rgb(212_162_76/0.7)]",
  ink: "bg-ink-900 text-white hover:bg-ink-700",
  outline: "border border-ink-900/15 text-ink-900 hover:border-ink-900/40 hover:bg-ink-900/[0.03]",
  "outline-light": "border border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06]",
  ghost: "text-ink-900 hover:text-gold-700",
  "ghost-light": "text-white/85 hover:text-gold-300",
} as const;

const SIZES = {
  sm: "h-9 px-4 text-[13px] gap-2",
  md: "h-11 px-5 text-sm gap-2.5",
  lg: "h-13 px-7 text-[15px] gap-3",
} as const;

type StyleProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Adds a trailing arrow that mirrors in RTL and nudges on hover. */
  arrow?: boolean;
};

function buttonClasses({ variant = "gold", size = "md" }: StyleProps, className?: string) {
  return cn(
    "group/button relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-300 ease-out-expo",
    "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3",
    "disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

function Content({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-expo group-hover/button:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5"
        />
      ) : null}
    </>
  );
}

type ButtonLinkProps = StyleProps &
  ComponentProps<typeof Link> & {
    /** Subtle magnetic pull toward the cursor (desktop only). */
    magnetic?: boolean;
  };

export function ButtonLink({
  variant,
  size,
  arrow,
  magnetic = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const magneticRef = useMagnetic<HTMLAnchorElement>();
  return (
    <Link
      ref={magnetic ? magneticRef : undefined}
      viewTransition
      className={buttonClasses(
        { variant, size },
        cn(magnetic && "[translate:var(--mag-x,0px)_var(--mag-y,0px)]", className),
      )}
      {...props}
    >
      <Content arrow={arrow}>{children as ReactNode}</Content>
    </Link>
  );
}

type ButtonProps = StyleProps & ComponentProps<"button">;

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size }, className)} {...props}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}

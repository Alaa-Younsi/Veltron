import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

/**
 * Fades content up as it enters the viewport (once). A `<noscript>` rule in
 * the document head reveals `[data-reveal]` content for visitors without JS,
 * and MotionConfig skips the transform when reduced motion is requested.
 * Above-the-fold content should use the CSS `animate-rise` utility instead,
 * so it never waits for hydration (LCP).
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      custom={delay}
      data-reveal=""
    >
      {children}
    </Component>
  );
}

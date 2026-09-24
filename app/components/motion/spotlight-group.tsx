import type { PointerEvent, ReactNode } from "react";

type SpotlightGroupProps = {
  as?: "ul" | "div";
  className?: string;
  children: ReactNode;
};

/**
 * Container that feeds cursor coordinates to every `.spotlight` card inside it,
 * so the glow flows seamlessly across neighbouring cards.
 */
export function SpotlightGroup({ as: Tag = "div", className, children }: SpotlightGroupProps) {
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    for (const card of event.currentTarget.querySelectorAll<HTMLElement>(".spotlight")) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
  };

  return (
    <Tag data-spotlight-group="" className={className} onPointerMove={onPointerMove}>
      {children}
    </Tag>
  );
}

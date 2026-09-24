import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export const controlClasses = cn(
  "w-full rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-[15px] text-ink-900 shadow-[inset_0_1px_2px_rgb(15_23_25/0.04)] outline-none transition-[border-color,box-shadow] duration-200",
  "placeholder:text-ink-400 hover:border-ink-900/25",
  "focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15",
  "aria-invalid:border-red-600/70 aria-invalid:focus:ring-red-600/10",
);

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + accessible error message. The control must use `${id}-error` for aria-describedby. */
export function Field({
  id,
  label,
  required,
  optionalLabel,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 font-medium text-ink-800 text-sm"
      >
        <span>
          {label}
          {required ? (
            <span aria-hidden="true" className="ms-0.5 text-gold-700">
              *
            </span>
          ) : null}
        </span>
        {!required && optionalLabel ? (
          <span className="font-normal text-ink-500 text-xs">{optionalLabel}</span>
        ) : null}
      </label>
      {children}
      <p
        id={`${id}-error`}
        role={error ? "alert" : undefined}
        className="min-h-0 text-red-700 text-xs empty:hidden"
      >
        {error ?? ""}
      </p>
    </div>
  );
}

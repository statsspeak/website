import * as React from "react";

import { cn } from "./utils";

/**
 * StatsSpeak input — see DESIGN.md §5.3.
 * Editorial form style: transparent surface, 1px bottom rule only.
 * Bottom rule thickens + turns marine on focus.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 bg-transparent text-ink-800 placeholder:text-ink-300",
        "border-0 border-b border-ink-300 rounded-none px-0 py-3",
        "text-base font-sans",
        "transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
        "outline-none focus-visible:outline-none",
        "focus-visible:border-b-2 focus-visible:border-marine focus-visible:pb-[11px]",
        "aria-invalid:border-[color:var(--danger)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

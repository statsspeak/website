import * as React from "react";

import { cn } from "./utils";

/**
 * StatsSpeak textarea — same editorial form treatment as Input.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full bg-transparent text-ink-800 placeholder:text-ink-300",
        "border-0 border-b border-ink-300 rounded-none px-0 py-3 resize-none",
        "text-base font-sans leading-relaxed",
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

export { Textarea };

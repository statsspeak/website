import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

/**
 * StatsSpeak buttons — see DESIGN.md §5.1.
 * Sharp radius, weight 500, no shadow, no scale, no gradient.
 * Hover changes only background / colour / border.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-medium tracking-normal",
    "rounded-[4px] border border-transparent",
    "transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "outline-none focus-visible:outline-2 focus-visible:outline-marine focus-visible:outline-offset-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:   "bg-ink text-bone hover:bg-ink-700",
        primary:   "bg-ink text-bone hover:bg-ink-700",
        outline:   "bg-transparent text-ink border-ink hover:bg-ink hover:text-bone",
        secondary: "bg-transparent text-ink border-ink hover:bg-ink hover:text-bone",
        ghost:     "bg-transparent text-ink hover:text-ink-700 underline-offset-8 hover:underline decoration-1",
        link:      "bg-transparent text-marine underline underline-offset-4 decoration-1 hover:text-marine-700 px-0 h-auto",
        destructive: "bg-[color:var(--danger)] text-paper hover:opacity-90",
      },
      size: {
        default: "h-11 px-5 text-[0.9375rem]",
        sm: "h-9 px-4 text-[0.875rem]",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-[52px] px-6 text-[1rem]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

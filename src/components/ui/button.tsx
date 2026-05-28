import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

/**
 * StatsSpeak buttons — see DESIGN.md §5.1.
 * Sharp radius, weight 500, no gradient.
 * Motion is a slight lift on hover and an immediate settle on press.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-medium tracking-normal",
    "rounded-[4px] border border-transparent",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
    "hover:-translate-y-0.5 active:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "outline-none focus-visible:outline-2 focus-visible:outline-marine focus-visible:outline-offset-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-ink text-bone shadow-[0_10px_30px_rgba(0,172,200,0.08)] hover:bg-marine hover:shadow-[0_16px_34px_rgba(0,172,200,0.16)]",
        primary:
          "bg-ink text-bone shadow-[0_10px_30px_rgba(0,172,200,0.08)] hover:bg-marine hover:shadow-[0_16px_34px_rgba(0,172,200,0.16)]",
        outline:
          "bg-transparent text-ink border-ink hover:border-marine hover:bg-marine hover:text-bone",
        secondary:
          "bg-transparent text-ink border-ink/70 hover:border-marine hover:bg-marine-50 hover:text-marine-700",
        ghost:
          "bg-transparent text-ink hover:text-marine-700 underline-offset-8 hover:underline decoration-1 shadow-none",
        link:
          "bg-transparent text-marine underline underline-offset-4 decoration-1 hover:text-marine-700 px-0 h-auto shadow-none hover:translate-y-0",
        destructive:
          "bg-[color:var(--danger)] text-paper hover:opacity-90 shadow-[0_10px_30px_rgba(139,33,24,0.1)]",
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

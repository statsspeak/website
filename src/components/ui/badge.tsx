import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap",
    "rounded-sm border px-2 py-1 text-mono text-ink-500",
    "transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
    "focus-visible:outline-2 focus-visible:outline-marine focus-visible:outline-offset-2",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-line bg-transparent",
        secondary: "border-line bg-ink-100 text-ink-700",
        destructive: "border-[color:var(--danger)] text-[color:var(--danger)]",
        outline: "border-line bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

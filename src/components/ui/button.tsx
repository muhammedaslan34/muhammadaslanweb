import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        /** Filled pill: blue + dark icon disc; darker blue sweeps in from the left on hover (wrap icon+label in one child). */
        cta:
          "relative isolate h-auto min-h-11 overflow-hidden rounded-full border-0 bg-blue-500 px-2 py-1.5 pr-7 text-base font-semibold text-white shadow-sm before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-blue-600 before:transition-transform before:duration-500 before:ease-out before:content-[''] before:-translate-x-full hover:before:translate-x-0 active:scale-[0.99] sm:pr-8 [&_svg]:size-[18px] [&>*]:relative [&>*]:z-10",
        /** Outline pill: blue border; on hover blue slides in from the left (icon side). Wrap icon+label in one child (e.g. span) when mixing text + icon. */
        ctaOutline:
          "relative isolate h-auto min-h-11 overflow-hidden rounded-full border-2 border-blue-500/90 bg-zinc-950/90 px-6 py-2.5 text-base font-semibold text-white shadow-sm backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-blue-500 before:transition-transform before:duration-500 before:ease-out before:content-[''] before:-translate-x-full hover:border-blue-500 hover:before:translate-x-0 active:scale-[0.99] [&_svg]:size-[18px] [&>*]:relative [&>*]:z-10",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      {
        variant: ["cta", "ctaOutline"],
        class: "!h-auto rounded-full",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

/** Dark circular icon well for `variant="cta"` (arrow / icon in white on black disc). */
function ButtonCtaIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="button-cta-icon"
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white shadow-inner",
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants, ButtonCtaIcon }

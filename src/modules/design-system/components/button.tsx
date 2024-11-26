import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button ease relative inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:shadow-focus focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-reverse font-semibold text-primary-reverse',
        ghost: 'bg-transparent text-secondary hover:text-primary',
      },
      size: {
        default: 'h-8 px-4 text-sm ',
        link: '',
        icon: 'size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        <Slottable>{props.children}</Slottable>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

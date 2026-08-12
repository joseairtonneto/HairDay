import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import Text from './Text'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg transition cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-yellow-base hover:bg-yellow-light',
      },
      size: {
        md: 'h-14 p-4',
      },
      disabled: {
        true: 'opacity-30 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      disabled: false,
    },
  },
)

export const buttonTextVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

interface ButtonProps
  extends
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  variant,
  size,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, disabled, className })} {...props}>
      <Text variant='text-sm' className={buttonTextVariants({ variant })}>
        {children}
      </Text>
    </button>
  )
}

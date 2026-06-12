import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import Icon from './Icon'

export const buttonIconVariants = cva(
  'inline-flex items-center justify-center cursor-pointer transition group',
  {
    variants: {
      variant: {
        primary: '',
      },
      size: {
        sm: 'w-4 h-4',
      },
      disabled: {
        true: 'opacity-30 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      disabled: false,
    },
  },
)

export const buttonIconIconVariants = cva('transition', {
  variants: {
    variant: {
      primary: 'fill-yellow-base group-hover:fill-yellow-dark',
    },
    size: {
      sm: 'w-4 h-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

interface ButtonIconProps
  extends
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof buttonIconVariants> {
  icon: React.ComponentProps<typeof Icon>['svg']
}

export default function ButtonIcon({
  variant,
  size,
  disabled,
  className,
  icon,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className={buttonIconVariants({ variant, size, disabled, className })}
      {...props}
    >
      <Icon
        svg={icon}
        className={buttonIconIconVariants({ variant, size })}
      />
    </button>
  )
}

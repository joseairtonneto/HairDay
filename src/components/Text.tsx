import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

export const textVariants = cva('font-sans text-gray-100', {
  variants: {
    variant: {
      'text-sm': 'text-sm leading-5 font-normal',
      'title-sm': 'text-sm leading-5 font-bold',
      'text-md': 'text-base leading-6 font-normal',
      'title-md': 'text-base leading-6 font-bold',
      'title-lg': 'text-2xl leading-6 font-bold',
    },
  },
  defaultVariants: {
    variant: 'text-md',
  },
})

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  children?: React.ReactNode
}

export default function Text({
  as = 'span',
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children,
  )
}

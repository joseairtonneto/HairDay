import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

export const textVariants = cva('font-sans text-gray-100', {
  variants: {
    variant: {
      'title-sm': 'text-sm leading-5 font-normal',
      'title-sm-bold': 'text-sm leading-5 font-bold',
      'title-md': 'text-base leading-6 font-normal',
      'title-md-bold': 'text-base leading-6 font-bold',
      'title-lg': 'text-[2rem] leading-6 font-bold',
    },
  },
  defaultVariants: {
    variant: 'title-md',
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

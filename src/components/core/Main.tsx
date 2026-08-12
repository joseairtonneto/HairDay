import React from 'react'
import { cx } from 'class-variance-authority'

interface MainProps extends React.ComponentProps<'main'> {}

export default function Main({ children, className, ...props }: MainProps) {
  return (
    <main className={cx('mt-1 mb-4 md:m-3', className)} {...props}>
      {children}
    </main>
  )
}

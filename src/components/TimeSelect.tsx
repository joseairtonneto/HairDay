import { cva, cx, type VariantProps } from 'class-variance-authority'

import Text from './Text'

export const inputTextWrapperVariants = cva(
  'inline-flex items-center justify-items-center p-3 gap-2 rounded-lg border border-gray-500 transition outline-none text-center w-18.5 h-10 group cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-gray-600 data-selected:border-yellow-base hover:bg-gray-500',
      },
      disabled: {
        true: 'bg-transparent pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      disabled: false,
    },
  },
)

export const inputTextTextVariants = cva('text-gray-200', {
  variants: {
    variant: {
      primary: 'w-full group-data-selected:text-yellow-base',
    },
    disabled: {
      true: 'text-gray-500 pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'primary',
    disabled: false,
  },
})

interface TimeSelectProps
  extends
    Omit<React.ComponentProps<'div'>, 'onSelect'>,
    VariantProps<typeof inputTextWrapperVariants> {
  value: string
  onSelect?: (value: string) => void
}

export default function TimeSelect({
  variant,
  value,
  onSelect,
  onClick,
  disabled,
  children,
  className,
  ...props
}: TimeSelectProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const timeValue = String(children)
    onSelect?.(value === timeValue ? '' : timeValue)
    onClick?.(e)
  }

  return (
    <div
      className={cx(
        inputTextWrapperVariants({ variant, disabled }),
        'cursor-pointer',
        className,
      )}
      data-selected={value === children ? true : undefined}
      onClick={handleClick}
      {...props}
    >
      <Text variant='title-md' className={inputTextTextVariants({ variant, disabled })}>
        {children}
      </Text>
    </div>
  )
}

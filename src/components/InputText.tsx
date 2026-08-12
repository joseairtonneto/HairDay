import React, { useRef, useState } from 'react'
import { cva, cx, type VariantProps } from 'class-variance-authority'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import * as Popover from '@radix-ui/react-popover'
import { DayPicker } from 'react-day-picker'
import Text, { textVariants } from './Text'
import Icon from './Icon'

import CaretDown from '../assets/icons/CaretDown.svg?react'
import CaretLeft from '../assets/icons/CaretLeft.svg?react'
import CaretRight from '../assets/icons/CaretRight.svg?react'

export const inputTextWrapperVariants = cva(
  'inline-flex items-center justify-items-start p-3 gap-2 rounded-lg border border-gray-500 transition outline-none w-full',
  {
    variants: {
      variant: {
        primary: 'bg-transparent focus-within:border-yellow-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export const inputTextIconVariants = cva('', {
  variants: {
    variant: {
      primary: 'h-4 w-4 fill-yellow-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const inputTextInputVariants = cva(
  'inline-flex items-center justify-center border-none outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-transparent placeholder-gray-500 text-gray-200',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export const inputTextCaretVariants = cva(
  'ml-auto h-4 w-4 fill-gray-300 transition duration-300',
  {
    variants: {
      variant: {
        primary: 'ml-auto h-4 w-4 fill-gray-300',
      },
      rotate: {
        true: '-rotate-180',
      },
    },
    defaultVariants: {
      variant: 'primary',
      rotate: false,
    },
  },
)

interface InputTextProps
  extends
    Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputTextWrapperVariants> {
  icon?: React.ComponentProps<typeof Icon>['svg']
  selectedDate?: Date
  onDateSelect?: (date: Date | undefined) => void
}

export default function InputText({
  variant,
  icon,
  className,
  selectedDate,
  onDateSelect,
  ...props
}: InputTextProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const isDate = props.type === 'date'

  function handleWrapperClick() {
    if (inputRef.current && isDate) {
      inputRef.current.focus()
    }
  }

  const inputElement = (
    <div
      ref={!isDate ? wrapperRef : undefined}
      tabIndex={isDate ? 0 : -1}
      className={cx(
        inputTextWrapperVariants({ variant, className }),
        isDate && isFocused && 'border-yellow-base',
      )}
      onClick={!isDate ? handleWrapperClick : undefined}
      onFocus={!isDate ? () => setIsFocused(true) : undefined}
      onBlur={
        !isDate
          ? event => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsFocused(false)
              }
            }
          : undefined
      }
    >
      {icon && <Icon svg={icon} className={inputTextIconVariants({ variant })} />}

      {isDate ? (
        <Text
          as='span'
          className={cx(
            textVariants(),
            'w-full text-left cursor-pointer text-gray-200',
            !selectedDate && 'text-gray-500',
          )}
        >
          {selectedDate
            ? format(selectedDate, 'dd/MM/yyyy')
            : props.placeholder || 'Selecione uma data'}
        </Text>
      ) : (
        <input
          ref={inputRef}
          className={cx(inputTextInputVariants({ variant }), textVariants(), className)}
          {...props}
        />
      )}

      {isDate && (
        <Icon
          svg={CaretDown}
          className={inputTextCaretVariants({
            variant,
            rotate: isFocused,
          })}
        />
      )}
    </div>
  )

  if (isDate) {
    return (
      <Popover.Root open={isFocused} onOpenChange={setIsFocused}>
        <Popover.Trigger asChild>{inputElement}</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            className='z-50 rounded-xl border border-gray-500 bg-gray-600 p-5 outline-none'
          >
            <DayPicker
              mode='single'
              locale={ptBR}
              selected={selectedDate}
              onSelect={date => {
                onDateSelect?.(date)
                setIsFocused(false)
              }}
              showOutsideDays
              fixedWeeks
              formatters={{
                formatWeekdayName: day => {
                  const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
                  return weekdays[day.getDay()]
                },
                formatCaption: (month, options) => {
                  const caption = format(month, 'LLLL yyyy', { locale: options?.locale })
                  return caption.charAt(0).toUpperCase() + caption.slice(1)
                },
              }}
              components={{
                Chevron: ({ orientation, ...props }) => {
                  if (orientation === 'left')
                    return (
                      <button {...props} type='button'>
                        <CaretLeft className='h-5 w-5 fill-gray-200' />
                      </button>
                    )
                  if (orientation === 'right')
                    return (
                      <button {...props} type='button'>
                        <CaretRight className='h-5 w-5 fill-gray-200' />
                      </button>
                    )
                  return Element.prototype as any
                },
              }}
              classNames={{
                root: 'relative w-full',
                months: 'flex flex-col',
                month: 'space-y-4',
                month_caption: 'flex justify-center relative items-center mb-6',
                caption_label: 'text-[16px] font-bold text-gray-200',
                nav: 'flex items-center absolute w-full justify-between z-10',
                month_grid: 'w-full',
                weekdays: 'grid grid-cols-7 w-full',
                weekday:
                  'text-gray-500 font-bold text-[14px] uppercase flex items-center justify-center pb-2 m-0',
                week: 'grid grid-cols-7 w-full mt-2',
                day: 'group text-center p-0 relative focus-within:relative focus-within:z-20 flex items-center justify-center',
                outside: 'is-outside',
                selected: 'is-selected',
                today: 'is-today',
                disabled: 'is-disabled',
                hidden: 'invisible',
                day_button: cx(
                  'w-10 h-10 text-[15px] font-medium text-gray-200 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center cursor-pointer',
                  'group-[.is-selected]:border group-[.is-selected]:border-yellow-base group-[.is-selected]:text-yellow-base! group-[.is-selected]:bg-gray-700! group-[.is-selected]:font-bold group-[.is-selected]:no-underline!',
                  'group-[.is-today]:font-bold group-[.is-today]:underline group-[.is-today]:decoration-gray-200 group-[.is-today]:underline-offset-[5px] group-[.is-today]:decoration-2',
                  'group-[.is-outside]:text-gray-500! group-[.is-outside]:opacity-70 group-[.is-outside]:hover:bg-transparent!',
                  'group-[.is-disabled]:text-gray-500! group-[.is-disabled]:opacity-50',
                ),
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }

  return inputElement
}

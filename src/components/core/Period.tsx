import type { Booking } from '../../models/Booking'

import Icon from '../Icon'
import Text from '../Text'
import ButtonIcon from '../ButtonIcon'

import TrashIcon from '../../assets/icons/Trash.svg?react'
import useBooking from '../../hooks/useBooking'

interface PeriodProps {
  icon: React.FC<React.ComponentProps<'svg'>>
  title: string
  startHour: number
  endHour: number
  bookings: Booking[]
}

export default function Period({ icon, title, startHour, endHour, bookings }: PeriodProps) {
  const { deleteBooking } = useBooking()
  const bookingsInPeriod = bookings.filter(
    booking =>
      booking.time &&
      Number(booking.time.substring(0, 2)) >= startHour &&
      Number(booking.time.substring(0, 2)) <= endHour,
  )

  function handleDeleteSchedule(id: string) {
    deleteBooking(id)
  }

  return (
    <div className='border rounded-lg border-gray-600'>
      <div className='flex justify-between px-5 py-3 border-b border-gray-600'>
        <div className='flex flex-1 justify-items-start items-center gap-3'>
          <Icon svg={icon} className='fill-yellow-base w-5 h-5' />
          <Text variant='text-sm' className='text-gray-300'>
            {title}
          </Text>
        </div>
        <Text variant='text-sm' className='text-gray-300'>
          {startHour.toString().padStart(2, '0')}h-{endHour.toString().padStart(2, '0')}h
        </Text>
      </div>
      <div className='flex flex-col gap-2.5'>
        {bookingsInPeriod.length > 0 ? (
          bookingsInPeriod.map(booking => (
            <div
              key={booking.id}
              className={`flex justify-between px-5 ${bookingsInPeriod.indexOf(booking) === 0 ? 'pt-3' : ''} ${bookingsInPeriod.indexOf(booking) === bookingsInPeriod.length - 1 ? 'pb-3' : ''} border-gray-600 gap-5 items-center`}
            >
              <Text variant='title-md' className='text-gray-300 min-w-12 min-h-6.25'>
                {booking.time}
              </Text>
              <Text variant='text-md' className='text-gray-200 flex-1'>
                {booking.client}
              </Text>
              <ButtonIcon
                icon={TrashIcon}
                onClick={() => handleDeleteSchedule(booking.id)}
              />
            </div>
          ))
        ) : (
          <div className='px-5 py-3'>
            <Text variant='text-sm' className='text-gray-300'>
              Você ainda não tem agendamentos cadastrados nesse período.
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}

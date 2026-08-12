import { useEffect, useState } from 'react'

import type { Booking } from '../../models/Booking'
import useBookings from '../../hooks/useBookings'

import InputText from '../InputText'
import Text from '../Text'
import Period from './Period'

import Calendar from '../../assets/icons/CalendarBlank.svg?react'
import SunHorizon from '../../assets/icons/SunHorizon.svg?react'
import CloudSun from '../../assets/icons/CloudSun.svg?react'
import MoonStars from '../../assets/icons/MoonStars.svg?react'

export default function Schedule() {
  const { bookings, getBookingsByDate } = useBookings()
  const [filterDate, setFilterDate] = useState<Date | undefined>(new Date())
  const [bookingsByDate, setBookingsByDate] = useState<Booking[]>([])

  useEffect(() => {
    const bookings = getBookingsByDate(filterDate)

    setBookingsByDate(bookings)
  }, [filterDate, bookings])

  return (
    <div className='w-full min-h-[calc(100vh-1.5rem)] px-28 py-20 flex flex-col gap-8'>
      <div className='flex justify-between gap-3'>
        <div className='flex flex-col flex-1 gap-1'>
          <Text variant='title-lg'>Sua agenda</Text>
          <Text variant='text-sm' className='text-gray-300'>
            Consulte os seus cortes de cabelo agendados por dia
          </Text>
        </div>
        <div>
          <InputText
            type='date'
            icon={Calendar}
            selectedDate={filterDate}
            onDateSelect={selectedDate => setFilterDate(selectedDate)}
          />
        </div>
      </div>
      <Period
        icon={SunHorizon}
        title='Manhã'
        startHour={9}
        endHour={12}
        bookings={bookingsByDate}
      />
      <Period
        icon={CloudSun}
        title='Tarde'
        startHour={13}
        endHour={18}
        bookings={bookingsByDate}
      />
      <Period
        icon={MoonStars}
        title='Noite'
        startHour={19}
        endHour={21}
        bookings={bookingsByDate}
      />
    </div>
  )
}

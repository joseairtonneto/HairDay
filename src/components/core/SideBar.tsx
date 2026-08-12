import { useState } from 'react'
import { isSameDay } from 'date-fns'

import { type Booking } from '../../models/Booking'
import useBookings from '../../hooks/useBookings'
import useBooking from '../../hooks/useBooking'

import Text from '../Text'
import InputText from '../InputText'
import TimeSelect from '../TimeSelect'

import CalendarIcon from '../../assets/icons/CalendarBlank.svg?react'
import UserIcon from '../../assets/icons/UserSquare.svg?react'
import Button from '../Button'

export default function SideBar() {
  const { bookings } = useBookings()
  const { book } = useBooking()

  const [newBooking, setNewBooking] = useState<Booking>({
    id: '',
    client: '',
    date: new Date(),
    time: '',
  })

  function renderTimes(
    startHour: number = 8,
    endHour: number = 22,
    intervalInMinutes: number,
  ) {
    const times: string[] = []

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += intervalInMinutes) {
        const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        times.push(time)
      }
    }

    return times.map(time => (
      <TimeSelect
        key={time}
        value={newBooking.time}
        onSelect={newTime => setNewBooking({ ...newBooking, time: newTime })}
        disabled={bookings.some(
          booking =>
            booking.time === time &&
            newBooking.date &&
            booking.date &&
            isSameDay(newBooking.date, booking.date),
        )}
      >
        {time}
      </TimeSelect>
    ))
  }

  function handleChangeClient(event: React.ChangeEvent<HTMLInputElement>) {
    setNewBooking({ ...newBooking, client: event.target.value })
  }

  function handleBook(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    book(newBooking)

    setNewBooking({
      id: '',
      client: '',
      date: new Date(),
      time: '',
    })
  }

  return (
    <div className='w-3/6 min-h-[calc(100vh-1.5rem)] p-20 bg-gray-700 rounded-lg flex flex-col gap-6 items-start'>
      <div className='flex flex-col gap-1'>
        <Text variant='title-lg'>Agende um atendimento</Text>
        <Text variant='text-sm' className='text-gray-300'>
          Selecione data, horário e informe o nome do cliente para criar o agendamento
        </Text>
      </div>
      <form id='bookingForm' className='w-full flex flex-col gap-8' onSubmit={handleBook}>
        <div>
          <Text as='label' className='text-gray-200 mb-2'>
            Data
          </Text>
          <InputText
            icon={CalendarIcon}
            type='date'
            placeholder='Selecione uma data'
            selectedDate={newBooking.date}
            onDateSelect={newDate => setNewBooking({ ...newBooking, date: newDate, time: '' })}
            required
          />
        </div>
        <div>
          <Text as='label' className='text-gray-200 mb-2'>
            Horários
          </Text>
          <div className='flex flex-col gap-3'>
            <div>
              <Text as='label' variant='text-sm' className='text-gray-300 mb-2'>
                Manhã
              </Text>
              <div className='flex flex-wrap gap-2'>{renderTimes(9, 12, 60)}</div>
            </div>
            <div>
              <Text as='label' variant='text-sm' className='text-gray-300 mb-2'>
                Tarde
              </Text>
              <div className='flex flex-wrap gap-2'>{renderTimes(13, 18, 60)}</div>
            </div>
            <div>
              <Text as='label' variant='text-sm' className='text-gray-300 mb-2'>
                Noite
              </Text>
              <div className='flex flex-wrap gap-2'>{renderTimes(19, 21, 60)}</div>
            </div>
          </div>
        </div>
        <div>
          <Text as='label' className='text-gray-200 mb-2'>
            Cliente
          </Text>
          <InputText
            icon={UserIcon}
            value={newBooking.client}
            onChange={handleChangeClient}
            required
          />
        </div>
      </form>
      <Button type='submit' form='bookingForm' className='w-full'>
        AGENDAR
      </Button>
    </div>
  )
}

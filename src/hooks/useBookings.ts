import useLocalStorage from 'use-local-storage'
import { isSameDay } from 'date-fns'
import { BOOKINGS_STORAGE_KEY, type Booking } from '../models/Booking'

export default function useBookings() {
  const [bookings] = useLocalStorage<Booking[]>(BOOKINGS_STORAGE_KEY, [])

  function getBookingsByDate(date: Date | undefined) {
    if (!date) return []

    return bookings?.filter(booking => booking.date && isSameDay(booking.date, date)) ?? []
  }

  return {
    bookings,
    getBookingsByDate,
  }
}

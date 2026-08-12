import useLocalStorage from 'use-local-storage'
import { BOOKINGS_STORAGE_KEY, type Booking } from '../models/Booking'

export default function useBooking() {
  const [, setBookings] = useLocalStorage<Booking[]>(BOOKINGS_STORAGE_KEY, [])

  function book(booking: Booking) {
    setBookings(prevBookings => [
      ...(prevBookings ?? []),
      { ...booking, id: crypto.randomUUID() },
    ])
  }

  function deleteBooking(id: string) {
    setBookings(prevBookings => prevBookings?.filter(booking => booking.id !== id))
  }

  return { book, deleteBooking }
}

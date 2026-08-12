export const BOOKINGS_STORAGE_KEY = 'bookings'

export interface Booking {
  id: string
  client: string
  date: Date | undefined
  time: string
}

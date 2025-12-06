// User bookings store
import { defineStore } from 'pinia'
import { bookingApi } from '@/api'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    pending: [],
    confirmed: [],
    inProgress: [],
    completed: [],
    cancelled: [],
    loading: false,
    error: null
  }),

  getters: {
    // Get all bookings as flat array
    allBookings: (state) => [
      ...state.pending,
      ...state.confirmed,
      ...state.inProgress,
      ...state.completed,
      ...state.cancelled
    ],
    // Count active bookings
    activeCount: (state) => state.pending.length + state.confirmed.length + state.inProgress.length
  },

  actions: {
    // Fetch all bookings
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const data = await bookingApi.getAll()
        this.pending = data.pending || []
        this.confirmed = data.confirmed || []
        this.inProgress = data.inProgress || []
        this.completed = data.completed || []
        this.cancelled = data.cancelled || []
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Request new booking
    async requestBooking(bookingData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await bookingApi.request(bookingData)
        this.pending.push(data)
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Pay for booking
    async payBooking(bookingId, transactionId = null) {
      this.loading = true
      try {
        await bookingApi.pay(bookingId, transactionId)
        await this.fetchAll() // Refresh bookings
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Rate booking
    async rateBooking(bookingId, rating, review) {
      this.loading = true
      try {
        await bookingApi.rate(bookingId, rating, review)
        await this.fetchAll()
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Cancel booking
    async cancelBooking(bookingId) {
      this.loading = true
      try {
        await bookingApi.cancel(bookingId)
        await this.fetchAll() // Refresh bookings
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})

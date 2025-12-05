<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">My Bookings</span>
        </nav>
        <h1 class="page-title">My Bookings</h1>
        <p class="page-description">Track and manage your appliance repair bookings</p>
      </div>
    </div>

    <!-- Bookings Content -->
    <section class="section-sm">
      <div class="container-wide">
        <!-- Tabs -->
        <div class="tabs mb-6 overflow-x-auto">
          <button type="button" class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">All
            Bookings</button>
          <button type="button" class="tab" :class="{ active: activeTab === 'pending' }"
            @click="activeTab = 'pending'">Pending</button>
          <button type="button" class="tab" :class="{ active: activeTab === 'confirmed' }"
            @click="activeTab = 'confirmed'">Confirmed</button>
          <button type="button" class="tab" :class="{ active: activeTab === 'inProgress' }"
            @click="activeTab = 'inProgress'">In Progress</button>
          <button type="button" class="tab" :class="{ active: activeTab === 'completed' }"
            @click="activeTab = 'completed'">Completed</button>
          <button type="button" class="tab" :class="{ active: activeTab === 'cancelled' }"
            @click="activeTab = 'cancelled'">Cancelled</button>
        </div>

        <!-- Filters and Search -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="w-48">
            <select v-model="sortOrder" class="form-select">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div class="flex-1 form-search-wrapper">
            <svg class="form-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" v-model="searchQuery" class="form-search" placeholder="Search bookings...">
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner spinner-lg"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="card p-6 text-center">
          <p class="text-error-600 mb-4">{{ error }}</p>
          <button @click="fetchBookings" class="btn btn-primary">Try Again</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredBookings.length === 0" class="empty-state">
          <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="empty-state-title">No bookings yet</h3>
          <p class="empty-state-description">You haven't made any bookings yet. Book a technician to get started.</p>
          <router-link to="/book-technician" class="btn btn-primary">Book a Technician</router-link>
        </div>

        <!-- Bookings List -->
        <div v-else class="space-y-4">
          <div v-for="booking in filteredBookings" :key="booking.id" class="card">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-center gap-4">
                <!-- Appliance Icon -->
                <div class="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary-50 rounded-xl">
                  <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z">
                    </path>
                  </svg>
                </div>

                <!-- Booking Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-neutral-900">{{ booking.applianceType || 'Appliance Repair'
                        }}</h3>
                      <p class="text-sm text-neutral-500">Booking #{{ booking.id }}</p>
                    </div>
                    <span :class="getBadgeClass(booking.status)">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"></circle>
                      </svg>
                      {{ formatStatus(booking.status) }}
                    </span>
                  </div>

                  <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {{ booking.description || 'No description provided' }}
                  </p>

                  <div class="flex flex-wrap gap-4 text-sm text-neutral-500">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                      </svg>
                      <span>{{ formatDate(booking.scheduledDate) }}</span>
                    </div>
                    <div v-if="booking.price" class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                      </svg>
                      <span>${{ booking.price }}{{ booking.isPaid ? ' (Paid)' : '' }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>{{ booking.technicianName || 'Awaiting technician' }}</span>
                    </div>
                    <div v-if="booking.isRated" class="flex items-center gap-1 text-warning-500">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                      </svg>
                      <span>{{ booking.rating }}/5</span>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2 md:flex-col">
                  <router-link :to="`/booking/${booking.id}`" class="btn btn-outline btn-sm w-full">View
                    Details</router-link>
                  <button v-if="booking.status === 'confirmed' && !booking.isPaid" @click="payBooking(booking.id)"
                    class="btn btn-primary btn-sm w-full">Pay Now</button>
                  <button v-if="booking.status === 'completed' && !booking.isRated" @click="openRatingModal(booking)"
                    class="btn btn-secondary btn-sm w-full">Rate</button>
                  <span v-else-if="booking.status === 'completed' && booking.isRated"
                    class="btn btn-ghost btn-sm w-full text-success-600 cursor-default">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Rated
                  </span>
                  <button v-if="booking.status === 'pending'" @click="cancelBooking(booking.id)"
                    class="btn btn-ghost btn-sm w-full text-error-600 hover:bg-error-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredBookings.length > 0" class="flex items-center justify-between mt-8">
          <p class="text-sm text-neutral-500">Showing {{ filteredBookings.length }} booking(s)</p>
        </div>
      </div>
    </section>

    <!-- Rating Modal -->
    <div v-if="ratingModal.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Rate Your Service</h3>
        <div class="flex justify-center gap-2 mb-4">
          <button v-for="star in 5" :key="star" @click="ratingModal.rating = star" class="text-3xl"
            :class="star <= ratingModal.rating ? 'text-warning-500' : 'text-neutral-300'">
            ★
          </button>
        </div>
        <textarea v-model="ratingModal.review" class="form-textarea w-full mb-2" rows="3"
          placeholder="Write your review (minimum 15 characters)"></textarea>
        <p class="text-xs text-neutral-500 mb-4">{{ ratingModal.review.length }}/15 characters minimum</p>
        <div class="flex justify-end gap-3">
          <button @click="ratingModal.show = false" class="btn btn-ghost">Cancel</button>
          <button @click="submitRating" class="btn btn-primary"
            :disabled="!ratingModal.rating || ratingModal.review.length < 15">Submit Rating</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookingStore } from '@/store/booking'
import { formatDate } from '@/utils/dateUtils'

export default {
  name: 'MyBookingsView',
  data() {
    return {
      activeTab: 'all',
      searchQuery: '',
      sortOrder: 'newest',
      loading: false,
      error: null,
      ratingModal: {
        show: false,
        bookingId: null,
        rating: 0,
        review: ''
      }
    }
  },
  computed: {
    bookingStore() {
      return useBookingStore()
    },
    allBookings() {
      return this.bookingStore.allBookings
    },
    filteredBookings() {
      let bookings = []

      // Filter by tab
      if (this.activeTab === 'all') {
        bookings = this.allBookings
      } else if (this.activeTab === 'pending') {
        bookings = this.bookingStore.pending
      } else if (this.activeTab === 'confirmed') {
        bookings = this.bookingStore.confirmed
      } else if (this.activeTab === 'inProgress') {
        bookings = this.bookingStore.inProgress
      } else if (this.activeTab === 'completed') {
        bookings = this.bookingStore.completed
      } else if (this.activeTab === 'cancelled') {
        bookings = this.bookingStore.cancelled
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        bookings = bookings.filter(b =>
          (b.applianceType && b.applianceType.toLowerCase().includes(query)) ||
          (b.description && b.description.toLowerCase().includes(query)) ||
          (b.id && b.id.toString().includes(query))
        )
      }

      // Sort
      return [...bookings].sort((a, b) => {
        const dateA = new Date(a.scheduledDate || a.createdAt)
        const dateB = new Date(b.scheduledDate || b.createdAt)
        return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
    }
  },
  methods: {
    formatDate,
    formatStatus(status) {
      const statusMap = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        'in-progress': 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled'
      }
      return statusMap[status] || status
    },
    getBadgeClass(status) {
      const classes = {
        pending: 'badge badge-pending',
        confirmed: 'badge badge-confirmed',
        'in-progress': 'badge badge-info',
        completed: 'badge badge-completed',
        cancelled: 'badge badge-error'
      }
      return classes[status] || 'badge badge-neutral'
    },
    async fetchBookings() {
      this.loading = true
      this.error = null
      try {
        await this.bookingStore.fetchAll()
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to load bookings'
      } finally {
        this.loading = false
      }
    },
    async payBooking(bookingId) {
      try {
        await this.bookingStore.payBooking(bookingId)
      } catch (err) {
        alert(err.response?.data?.message || 'Payment failed')
      }
    },
    async cancelBooking(id) {
      if (!confirm('Are you sure you want to cancel this booking?')) return
      try {
        await this.bookingStore.cancelBooking(id)
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel booking')
      }
    },
    openRatingModal(booking) {
      this.ratingModal = {
        show: true,
        bookingId: booking.id,
        rating: 0,
        review: ''
      }
    },
    async submitRating() {
      try {
        await this.bookingStore.rateBooking(
          this.ratingModal.bookingId,
          this.ratingModal.rating,
          this.ratingModal.review
        )
        this.ratingModal.show = false
      } catch (err) {
        alert(err.response?.data?.message || 'Rating failed')
      }
    }
  },
  async mounted() {
    await this.fetchBookings()
  }
}
</script>

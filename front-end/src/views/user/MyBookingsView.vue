<template>
  <div class="min-h-screen flex overflow-x-hidden">
    <!-- Sidebar -->
    <UserSidebar />

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="ml-14 lg:ml-0">
            <h1 class="text-xl font-semibold text-neutral-900">My Bookings</h1>
            <p class="text-sm text-neutral-500">Track and manage your appliance repair bookings</p>
          </div>
          <router-link to="/book-technician" class="btn btn-primary btn-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Booking
          </router-link>
        </div>
      </header>

      <!-- Bookings Content -->
      <div class="p-4 sm:p-6 max-w-full">
        <!-- Tabs - Horizontally scrollable on mobile -->
        <div class="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-hidden">
          <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style="-webkit-overflow-scrolling: touch;">
            <button type="button" 
              class="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              :class="activeTab === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'" 
              @click="activeTab = 'all'">All <span class="ml-1 text-xs opacity-75">({{ allBookings.length }})</span></button>
            <button type="button" 
              class="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              :class="activeTab === 'pending' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'"
              @click="activeTab = 'pending'">Pending <span class="ml-1 text-xs opacity-75">({{ bookingStore.pending.length }})</span></button>
            <button type="button" 
              class="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              :class="activeTab === 'confirmed' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'"
              @click="activeTab = 'confirmed'">Confirmed <span class="ml-1 text-xs opacity-75">({{ bookingStore.confirmed.length }})</span></button>
            <button type="button" 
              class="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              :class="activeTab === 'inProgress' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'"
              @click="activeTab = 'inProgress'">In Progress <span class="ml-1 text-xs opacity-75">({{ bookingStore.inProgress.length }})</span></button>
            <button type="button" 
              class="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              :class="activeTab === 'completed' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'"
              @click="activeTab = 'completed'">Completed <span class="ml-1 text-xs opacity-75">({{ bookingStore.completed.length }})</span></button>
            <button type="button" 
              class="flex-shrink-0 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              :class="activeTab === 'cancelled' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'"
              @click="activeTab = 'cancelled'">Cancelled <span class="ml-1 text-xs opacity-75">({{ bookingStore.cancelled.length }})</span></button>
          </div>
        </div>

        <!-- Filters and Search -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <div class="w-full sm:w-40 flex-shrink-0">
            <select v-model="sortOrder" class="form-select w-full">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div class="flex-1 min-w-0">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input type="text" v-model="searchQuery" class="form-input pl-10 w-full" placeholder="Search bookings...">
            </div>
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
          <div v-for="booking in filteredBookings" :key="booking.id" class="card overflow-hidden">
            <div class="card-body">
              <!-- Mobile-first layout -->
              <div class="flex flex-col gap-4">
                <!-- Header: Icon + Title + Badge -->
                <div class="flex items-start gap-3">
                  <!-- Appliance Icon -->
                  <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary-50 rounded-xl">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z">
                      </path>
                    </svg>
                  </div>

                  <!-- Title & Badge -->
                  <div class="flex-1 min-w-0 overflow-hidden">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div class="min-w-0 overflow-hidden">
                        <h3 class="text-base font-semibold text-neutral-900 truncate">
                          {{ booking.applianceType || 'Appliance Repair' }}
                        </h3>
                        <p class="text-sm text-neutral-500">Booking #{{ booking.id }}</p>
                      </div>
                      <span :class="getBadgeClass(booking.status)" class="flex-shrink-0 self-start">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3"></circle>
                        </svg>
                        {{ formatStatus(booking.status) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-sm text-neutral-600 line-clamp-2">
                  {{ booking.description || 'No description provided' }}
                </p>

                <!-- Meta Info - Wrap properly -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-500">
                  <div class="flex items-center gap-1 min-w-0">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                      </path>
                    </svg>
                    <span class="truncate">{{ formatDate(booking.scheduledDate) }}</span>
                  </div>
                  <div v-if="booking.price" class="flex items-center gap-1 min-w-0">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                    <span>${{ booking.price }}<span v-if="booking.isPaid" class="text-success-600 ml-1">(Paid)</span></span>
                  </div>
                  <div class="flex items-center gap-1 min-w-0">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="truncate">{{ booking.technicianName || 'Awaiting technician' }}</span>
                  </div>
                  <div v-if="booking.isRated" class="flex items-center gap-1 text-warning-500">
                    <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                      </path>
                    </svg>
                    <span>{{ booking.rating }}/5</span>
                  </div>
                </div>

                <!-- Payment Info (shown if paid) -->
                <div v-if="booking.isPaid" class="flex flex-wrap gap-2">
                  <div v-if="booking.paymentMethod" class="text-xs text-neutral-500 bg-neutral-50 px-2 py-1 rounded inline-flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    <span>{{ formatPaymentMethod(booking.paymentMethod) }}</span>
                  </div>
                  <div v-if="booking.transactionId" class="text-xs text-neutral-500 bg-neutral-50 px-2 py-1 rounded inline-flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-mono">TXN: {{ booking.transactionId }}</span>
                  </div>
                </div>

                <!-- Action Buttons - Stack on mobile, row on larger -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-3 border-t border-neutral-100">
                  <router-link 
                    :to="`/booking/${booking.id}`" 
                    class="btn btn-outline btn-sm justify-center">
                    View Details
                  </router-link>
                  
                  <button 
                    v-if="(booking.status === 'confirmed' || booking.status === 'in-progress') && !booking.isPaid" 
                    @click="openPaymentModal(booking)"
                    class="btn btn-primary btn-sm justify-center">
                    Pay Now
                  </button>
                  
                  <button 
                    v-if="booking.status === 'completed' && !booking.isRated" 
                    @click="openRatingModal(booking)"
                    class="btn btn-secondary btn-sm justify-center">
                    Rate Service
                  </button>
                  
                  <span 
                    v-else-if="booking.status === 'completed' && booking.isRated"
                    class="btn btn-ghost btn-sm text-success-600 cursor-default justify-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Rated
                  </span>
                  
                  <button 
                    v-if="booking.status === 'pending'" 
                    @click="cancelBooking(booking.id)"
                    class="btn btn-ghost btn-sm text-error-600 hover:bg-error-50 justify-center">
                    Cancel
                  </button>
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

    <!-- Payment Modal -->
    <div v-if="paymentModal.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Payment Confirmation</h3>
        
        <!-- Booking Details -->
        <div class="mb-4">
          <p class="text-sm text-neutral-600 mb-2">Booking Details:</p>
          <p class="font-medium text-neutral-900">{{ paymentModal.booking?.applianceType }}</p>
          <p class="text-sm text-neutral-500">Booking #{{ paymentModal.booking?.id }}</p>
        </div>
        
        <!-- Amount -->
        <div class="mb-4 p-4 bg-neutral-50 rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-neutral-600">Total Amount:</span>
            <span class="text-2xl font-bold text-neutral-900">${{ paymentModal.booking?.price }}</span>
          </div>
        </div>

        <!-- Payment Method (read-only, set during booking) -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-neutral-700 mb-2">Payment Method</label>
          <div class="form-input bg-neutral-50 text-neutral-700 cursor-not-allowed">
            {{ formatPaymentMethod(paymentModal.method) }}
          </div>
          <p class="text-xs text-neutral-500 mt-1">Payment method was set when booking was created</p>
        </div>

        <!-- Generated Transaction ID -->
        <div class="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
          <p class="text-xs text-primary-600 mb-1">Transaction ID (auto-generated)</p>
          <p class="font-mono text-sm text-primary-800">{{ paymentModal.transactionId }}</p>
        </div>

        <div class="flex gap-3">
          <button @click="confirmPayment" class="btn btn-primary flex-1" :disabled="paymentModal.processing">
            <span v-if="paymentModal.processing" class="spinner spinner-sm mr-2"></span>
            {{ paymentModal.processing ? 'Processing...' : 'Confirm Payment' }}
          </button>
          <button @click="paymentModal.show = false" class="btn btn-outline flex-1">Cancel</button>
        </div>
      </div>
    </div>
    </main>
  </div>
</template>

<script>
import { useBookingStore } from '@/store/booking'
import { formatDate } from '@/utils/dateUtils'
import UserSidebar from '@/components/user/UserSidebar.vue'

export default {
  name: 'MyBookingsView',
  components: {
    UserSidebar
  },
  data() {
    return {
      activeTab: this.$route.query.tab || 'all',
      searchQuery: '',
      sortOrder: 'newest',
      loading: false,
      error: null,
      ratingModal: {
        show: false,
        bookingId: null,
        rating: 0,
        review: ''
      },
      paymentModal: {
        show: false,
        booking: null,
        method: 'cash',
        transactionId: '',
        processing: false
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
  watch: {
  },
  methods: {
    formatDate,
    formatPaymentMethod(method) {
      const methodMap = {
        cash: 'Cash',
        credit_card: 'Credit Card',
        debit_card: 'Debit Card',
        whish: 'Whish',
        omt: 'OMT'
      }
      return methodMap[method] || method
    },
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
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } finally {
        this.loading = false
      }
    },
    generateTransactionId(method) {
      const timestamp = Date.now().toString(36).toUpperCase()
      const random = Math.random().toString(36).substring(2, 8).toUpperCase()
      const methodPrefix = {
        cash: 'CSH',
        credit_card: 'CC',
        debit_card: 'DC',
        whish: 'WSH',
        omt: 'OMT'
      }
      return `${methodPrefix[method] || 'TXN'}-${timestamp}-${random}`
    },
    openPaymentModal(booking) {
      const method = booking.paymentMethod || 'cash'
      this.paymentModal = {
        show: true,
        booking: booking,
        method: method,
        transactionId: this.generateTransactionId(method),
        processing: false
      }
    },
    async confirmPayment() {
      this.paymentModal.processing = true
      try {
        await this.bookingStore.payBooking(
          this.paymentModal.booking.id,
          this.paymentModal.transactionId
        )
        this.paymentModal.show = false
        await this.fetchBookings()
      } catch (err) {
        alert(err.response?.data?.message || 'Payment failed')
      } finally {
        this.paymentModal.processing = false
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

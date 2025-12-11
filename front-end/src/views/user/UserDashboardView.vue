<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <UserSidebar />

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between gap-3">
          <!-- Title - with left margin for mobile hamburger -->
          <div class="ml-14 sm:ml-12 lg:ml-0 min-w-0 flex-shrink">
            <h1 class="text-lg sm:text-xl font-semibold text-neutral-900 truncate">Dashboard</h1>
            <p class="text-xs sm:text-sm text-neutral-500 truncate">Welcome back, {{ userName }}!</p>
          </div>

          <!-- Actions - always in row, shrink on mobile -->
          <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <router-link to="/book-technician" class="btn btn-primary whitespace-nowrap sm:px-4 sm:py-2">
              <svg class="w-6 h-6 sm:w-4 sm:h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span class="hidden sm:inline">Book a Technician</span>
            </router-link>
            <!-- Profile Avatar -->
            <div class="flex items-center gap-2 sm:gap-3">
              <span class="avatar avatar-sm sm:avatar-md bg-primary-100 text-primary-600 flex-shrink-0">{{ userInitials
              }}</span>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-neutral-900">{{ userName }}</p>
                <p class="text-xs text-neutral-500">Customer</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-6">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner spinner-lg"></div>
        </div>

        <template v-else>
          <!-- Error Alert -->
          <AlertMessage v-if="error" type="error" :message="error" class="mb-6" @dismiss="error = null" />

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Active Bookings -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Active Bookings</p>
                    <p class="text-3xl font-bold text-neutral-900">{{ activeBookingsCount }}</p>
                  </div>
                  <div class="icon-box icon-box-primary">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                      </path>
                    </svg>
                  </div>
                </div>
                <router-link to="/my-bookings" class="text-sm text-primary-600 hover:underline mt-3 inline-block">View
                  all →</router-link>
              </div>
            </div>

            <!-- Pending Payment -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Pending Payment</p>
                    <p class="text-3xl font-bold text-neutral-900">{{ unpaidBookingsCount }}</p>
                  </div>
                  <div class="icon-box icon-box-warning">
                    <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-warning-600 mt-3">${{ unpaidTotalAmount }}</p>
              </div>
            </div>

            <!-- Completed This Month -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Completed (Month)</p>
                    <p class="text-3xl font-bold text-neutral-900">{{ completedThisMonth }}</p>
                  </div>
                  <div class="icon-box icon-box-success">
                    <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-success-600 mt-3">Great job!</p>
              </div>
            </div>

            <!-- Total Spent -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Total Spent</p>
                    <p class="text-3xl font-bold text-neutral-900">${{ totalSpent }}</p>
                  </div>
                  <div class="icon-box icon-box-secondary">
                    <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z">
                      </path>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-neutral-500 mt-3">All time</p>
              </div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- Pending Payments -->
            <div v-if="unpaidBookings.length > 0" class="card">
              <div class="card-header">
                <h3 class="font-semibold text-neutral-900">Pending Payments</h3>
              </div>
              <div class="divide-y divide-neutral-100">
                <div v-for="booking in unpaidBookings.slice(0, 3)" :key="booking.id" class="p-4">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <p class="font-medium text-neutral-900">{{ booking.applianceType }}</p>
                      <p class="text-xs text-neutral-500">{{ formatDate(booking.scheduledDate) }}</p>
                    </div>
                    <span class="font-semibold text-warning-600">${{ booking.price }}</span>
                  </div>
                  <button @click="handlePayment(booking)" class="btn btn-warning btn-sm w-full">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            <!-- Recent Bookings -->
            <div class="lg:col-span-2">
              <div class="card">
                <div class="card-header flex items-center justify-between">
                  <h3 class="font-semibold text-neutral-900">Recent Bookings</h3>
                  <router-link to="/my-bookings" class="text-sm text-primary-600 hover:underline">View all</router-link>
                </div>

                <!-- Empty State -->
                <div v-if="recentBookings.length === 0" class="p-8 text-center">
                  <svg class="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                    </path>
                  </svg>
                  <p class="text-neutral-500 mb-4">No bookings yet</p>
                  <router-link to="/book-technician" class="btn btn-primary">Book Your First Repair</router-link>
                </div>

                <div v-else class="divide-y divide-neutral-100">
                  <!-- Booking Item -->
                  <div v-for="booking in recentBookings" :key="booking.id"
                    class="p-4 hover:bg-neutral-50 transition-colors">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                          <h4 class="font-medium text-neutral-900">{{ booking.applianceType || 'Appliance Repair' }}
                          </h4>
                          <span :class="getBadgeClass(booking.status)">
                            {{ getStatusLabel(booking.status) }}
                          </span>
                        </div>
                        <p class="text-sm text-neutral-500">Booking #{{ booking.id }}</p>
                      </div>
                      <span class="text-sm font-semibold text-neutral-900">${{ booking.price }}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-3">
                      <div class="text-sm">
                        <span class="text-neutral-500">Date:</span>
                        <span class="text-neutral-900 ml-1">{{ formatDate(booking.scheduledDate) }}</span>
                      </div>
                      <div class="text-sm">
                        <span class="text-neutral-500">Time:</span>
                        <span class="text-neutral-900 ml-1">{{ formatTime(booking.scheduledTime) }}</span>
                      </div>
                    </div>

                    <div v-if="booking.technicianName" class="text-sm text-neutral-600 mb-3">
                      <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Technician: {{ booking.technicianName }}
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                      <router-link :to="`/booking/${booking.id}`" class="btn btn-outline btn-sm">
                        View Details
                      </router-link>

                      <button
                        v-if="(booking.status === 'confirmed' || booking.status === 'in-progress') && !booking.isPaid"
                        @click="handlePayment(booking)" class="btn btn-primary btn-sm">
                        Pay Now
                      </button>

                      <button v-if="booking.status === 'completed' && !booking.isRated" @click="handleRating(booking)"
                        class="btn btn-secondary btn-sm">
                        Rate Service
                      </button>

                      <button v-if="booking.status === 'pending'" @click="handleCancel(booking)"
                        class="btn btn-error btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions & Info -->
            <div class="space-y-6">
              <!-- Quick Actions -->
              <div class="card">
                <div class="card-header">
                  <h3 class="font-semibold text-neutral-900">Quick Actions</h3>
                </div>
                <div class="p-4 space-y-3">
                  <router-link to="/my-bookings" class="quick-action-btn">
                    <div class="icon-box icon-box-secondary">
                      <svg class="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                        </path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-neutral-900">My Bookings</p>
                      <p class="text-xs text-neutral-500">View all bookings</p>
                    </div>
                    <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </router-link>

                  <router-link to="/profile" class="quick-action-btn">
                    <div class="icon-box icon-box-neutral">
                      <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-neutral-900">My Profile</p>
                      <p class="text-xs text-neutral-500">Update information</p>
                    </div>
                    <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </router-link>
                </div>
              </div>

              <!-- Pending Ratings -->
              <div v-if="unratedBookings.length > 0" class="card">
                <div class="card-header">
                  <h3 class="font-semibold text-neutral-900">Rate Your Experience</h3>
                </div>
                <div class="divide-y divide-neutral-100">
                  <div v-for="booking in unratedBookings.slice(0, 3)" :key="booking.id" class="p-4">
                    <div class="mb-2">
                      <p class="font-medium text-neutral-900">{{ booking.applianceType }}</p>
                      <p class="text-xs text-neutral-500">Completed on {{ formatDate(booking.scheduledDate) }}</p>
                      <p v-if="booking.technicianName" class="text-xs text-neutral-500">by {{ booking.technicianName }}
                      </p>
                    </div>
                    <button @click="handleRating(booking)" class="btn btn-secondary btn-sm w-full">
                      Rate Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Payment Modal -->
      <BaseModal v-if="showPaymentModal" @close="showPaymentModal = false" title="Payment Confirmation">
        <div class="p-6">
          <!-- Error Alert in Modal -->
          <AlertMessage v-if="error" type="error" :message="error" class="mb-4" @dismiss="error = null" />

          <div class="mb-4">
            <p class="text-sm text-neutral-600 mb-2">Booking Details:</p>
            <p class="font-medium text-neutral-900">{{ selectedBooking?.applianceType }}</p>
            <p class="text-sm text-neutral-500">{{ formatDate(selectedBooking?.scheduledDate) }} at {{
              formatTime(selectedBooking?.scheduledTime) }}</p>
          </div>

          <div class="mb-4 p-4 bg-neutral-50 rounded-lg">
            <div class="flex items-center justify-between">
              <span class="text-neutral-600">Total Amount:</span>
              <span class="text-2xl font-bold text-neutral-900">${{ selectedBooking?.price }}</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-neutral-700 mb-2">Payment Method</label>
            <div class="form-input bg-neutral-50 text-neutral-700 cursor-not-allowed">
              {{ formatPaymentMethod(paymentMethod) }}
            </div>
            <p class="text-xs text-neutral-500 mt-1">Payment method was set when booking was created</p>
          </div>

          <!-- Generated Transaction ID Preview -->
          <div class="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
            <p class="text-xs text-primary-600 mb-1">Transaction ID (auto-generated)</p>
            <p class="font-mono text-sm text-primary-800">{{ generatedTransactionId }}</p>
          </div>

          <div class="flex gap-3">
            <button @click="confirmPayment" class="btn btn-primary flex-1" :disabled="processingPayment">
              <span v-if="processingPayment" class="spinner spinner-sm mr-2"></span>
              {{ processingPayment ? 'Processing...' : 'Confirm Payment' }}
            </button>
            <button @click="showPaymentModal = false" class="btn btn-outline flex-1">Cancel</button>
          </div>
        </div>
      </BaseModal>

      <!-- Rating Modal -->
      <BaseModal v-if="showRatingModal" @close="showRatingModal = false" title="Rate Your Experience">
        <div class="p-6">
          <!-- Error Alert in Modal -->
          <AlertMessage v-if="error" type="error" :message="error" class="mb-4" @dismiss="error = null" />

          <div class="mb-4">
            <p class="text-sm text-neutral-600 mb-2">Service Details:</p>
            <p class="font-medium text-neutral-900">{{ selectedBooking?.applianceType }}</p>
            <p v-if="selectedBooking?.technicianName" class="text-sm text-neutral-500">Technician: {{
              selectedBooking?.technicianName }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
            <div class="flex gap-2">
              <button v-for="star in 5" :key="star" @click="ratingScore = star" type="button"
                class="text-3xl transition-colors"
                :class="star <= ratingScore ? 'text-warning-500' : 'text-neutral-300 hover:text-warning-400'">
                ★
              </button>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-neutral-700 mb-2">Review (minimum 15 characters)</label>
            <textarea v-model="reviewText" rows="4" class="form-textarea"
              placeholder="Share your experience..."></textarea>
            <p class="text-xs text-neutral-500 mt-1">{{ reviewText.length }} / 15 characters minimum</p>
          </div>

          <div class="flex gap-3">
            <button @click="confirmRating" class="btn btn-primary flex-1"
              :disabled="processingRating || ratingScore === 0 || reviewText.length < 15">
              <span v-if="processingRating" class="spinner spinner-sm mr-2"></span>
              {{ processingRating ? 'Submitting...' : 'Submit Rating' }}
            </button>
            <button @click="showRatingModal = false" class="btn btn-outline flex-1">Cancel</button>
          </div>
        </div>
      </BaseModal>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useBookingStore } from '@/store/booking'
import { formatDate, formatTime } from '@/utils/dateUtils'
import AlertMessage from '@/components/common/AlertMessage.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import UserSidebar from '@/components/user/UserSidebar.vue'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

export default {
  name: 'UserDashboardView',
  components: {
    AlertMessage,
    BaseModal,
    UserSidebar
  },
  data() {
    const { isRefreshing, lastUpdated, startAutoRefresh, stopAutoRefresh } = useAutoRefresh()
    return {
      loading: false,
      error: null,
      showPaymentModal: false,
      showRatingModal: false,
      selectedBooking: null,
      paymentMethod: 'cash',
      generatedTransactionId: '',
      processingPayment: false,
      ratingScore: 0,
      reviewText: '',
      processingRating: false,
      isRefreshing,
      lastUpdated,
      startAutoRefresh,
      stopAutoRefresh
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    bookingStore() {
      return useBookingStore()
    },
    user() {
      return this.authStore.user || {}
    },
    userName() {
      if (this.user.firstName && this.user.lastName) {
        return `${this.user.firstName} ${this.user.lastName}`
      }
      return this.user.name || 'User'
    },
    userInitials() {
      if (this.user.firstName && this.user.lastName) {
        return `${this.user.firstName[0]}${this.user.lastName[0]}`.toUpperCase()
      }
      return this.userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'U'
    },
    allBookings() {
      return this.bookingStore.allBookings || []
    },
    pendingBookings() {
      return this.bookingStore.pending || []
    },
    confirmedBookings() {
      return this.bookingStore.confirmed || []
    },
    inProgressBookings() {
      return this.bookingStore.inProgress || []
    },
    completedBookings() {
      return this.bookingStore.completed || []
    },
    activeBookingsCount() {
      return this.bookingStore.activeCount || 0
    },
    unpaidBookings() {
      // Get all confirmed/in-progress/completed bookings that haven't been paid
      return [...this.confirmedBookings, ...this.inProgressBookings, ...this.completedBookings]
        .filter(b => !b.isPaid)
        .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
    },
    unpaidBookingsCount() {
      return this.unpaidBookings.length
    },
    unpaidTotalAmount() {
      const total = this.unpaidBookings.reduce((sum, b) => sum + parseFloat(b.price || 0), 0)
      return total.toFixed(2)
    },
    unratedBookings() {
      // Get completed bookings that haven't been rated
      return this.completedBookings
        .filter(b => !b.isRated)
        .sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate))
    },
    completedThisMonth() {
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      return this.completedBookings.filter(b => {
        const bookingDate = new Date(b.scheduledDate)
        return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear
      }).length
    },
    totalSpent() {
      // Calculate total from paid bookings (completed status with isPaid true)
      const total = this.completedBookings
        .filter(b => b.isPaid)
        .reduce((sum, b) => sum + parseFloat(b.price || 0), 0)
      return total.toFixed(2)
    },
    recentBookings() {
      // Get all bookings and sort by date (most recent first)
      return this.allBookings
        .slice()
        .sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate))
        .slice(0, 5)
    }
  },
  watch: {
  },
  async mounted() {
    await this.loadDashboardData()

    this.startAutoRefresh(async () => {
      await this.loadDashboardData()
    }, 15000) //15s
  },
  unmounted() {
    this.stopAutoRefresh()
  },
  methods: {
    formatDate,
    formatTime,
    async loadDashboardData() {
      this.loading = true
      this.error = null
      try {
        await this.bookingStore.fetchAll()
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to load dashboard data'
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } finally {
        this.loading = false
      }
    },
    getBadgeClass(status) {
      const classes = {
        pending: 'badge badge-pending',
        confirmed: 'badge badge-confirmed',
        'in-progress': 'badge badge-in-progress',
        completed: 'badge badge-completed',
        cancelled: 'badge badge-cancelled'
      }
      return classes[status] || 'badge'
    },
    getStatusLabel(status) {
      const labels = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        'in-progress': 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled'
      }
      return labels[status] || status
    },
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
    generateTransactionId() {
      const timestamp = Date.now().toString(36).toUpperCase()
      const random = Math.random().toString(36).substring(2, 8).toUpperCase()
      const methodPrefix = {
        cash: 'CSH',
        credit_card: 'CC',
        debit_card: 'DC',
        whish: 'WSH',
        omt: 'OMT'
      }
      return `${methodPrefix[this.paymentMethod] || 'TXN'}-${timestamp}-${random}`
    },
    handlePayment(booking) {
      this.selectedBooking = booking
      this.paymentMethod = booking.paymentMethod || 'cash'
      this.generatedTransactionId = this.generateTransactionId()
      this.showPaymentModal = true
    },
    async confirmPayment() {
      this.processingPayment = true
      this.error = null

      try {
        await this.bookingStore.payBooking(
          this.selectedBooking.id,
          this.generatedTransactionId
        )
        this.showPaymentModal = false
        await this.loadDashboardData()
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to process payment'
      } finally {
        this.processingPayment = false
      }
    },
    handleRating(booking) {
      this.selectedBooking = booking
      this.ratingScore = 0
      this.reviewText = ''
      this.showRatingModal = true
    },
    async confirmRating() {
      if (this.ratingScore === 0) {
        this.error = 'Please select a rating'
        return
      }

      if (this.reviewText.length < 15) {
        this.error = 'Review must be at least 15 characters'
        return
      }

      this.processingRating = true
      this.error = null

      try {
        await this.bookingStore.rateBooking(
          this.selectedBooking.id,
          this.ratingScore,
          this.reviewText
        )
        this.showRatingModal = false
        await this.loadDashboardData()
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to submit rating'
      } finally {
        this.processingRating = false
      }
    },
    async handleCancel(booking) {
      if (!confirm('Are you sure you want to cancel this booking?')) {
        return
      }

      this.error = null
      try {
        await this.bookingStore.cancelBooking(booking.id)
        await this.loadDashboardData()
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to cancel booking'
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.quick-action-btn {
  @apply flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer;
}

.icon-box {
  @apply w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0;
}

.icon-box-primary {
  @apply bg-primary-100;
}

.icon-box-secondary {
  @apply bg-secondary-100;
}

.icon-box-success {
  @apply bg-success-100;
}

.icon-box-warning {
  @apply bg-warning-100;
}

.icon-box-neutral {
  @apply bg-neutral-100;
}
</style>

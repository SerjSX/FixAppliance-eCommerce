<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/my-bookings" class="breadcrumb-link">My Bookings</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Booking Details</span>
        </nav>
        <div class="flex items-center gap-4">
          <h1 class="page-title">Booking #{{ booking.id || $route.params.id }}</h1>
          <span :class="['badge', `badge-${statusClass}`]">{{ booking.status || 'Loading...' }}</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <section v-if="loading" class="section-sm">
      <div class="container-wide text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-neutral-600">Loading booking details...</p>
      </div>
    </section>

    <!-- Error State -->
    <section v-else-if="error" class="section-sm">
      <div class="container-wide text-center py-12">
        <p class="text-error-600 mb-4">{{ error }}</p>
        <router-link to="/my-bookings" class="btn btn-primary">Back to My Bookings</router-link>
      </div>
    </section>

    <!-- Not Found State -->
    <section v-else-if="!booking.id" class="section-sm">
      <div class="container-wide text-center py-12">
        <p class="text-neutral-600 mb-4">Booking not found</p>
        <router-link to="/my-bookings" class="btn btn-primary">Back to My Bookings</router-link>
      </div>
    </section>

    <!-- Booking Content -->
    <section v-else class="section-sm">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Info -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Booking Details Card -->
            <div class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-4">Booking Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-neutral-500">Appliance Type</p>
                    <p class="font-medium">{{ booking.applianceTypeEN || booking.applianceType || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500">Preferred Date</p>
                    <p class="font-medium">{{ formatDate(booking.preferredDate || booking.scheduledDate) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500">Created</p>
                    <p class="font-medium">{{ formatDate(booking.createdAt) }}</p>
                  </div>
                  <div v-if="booking.completedAt">
                    <p class="text-sm text-neutral-500">Completed</p>
                    <p class="font-medium">{{ formatDate(booking.completedAt) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Problem Description -->
            <div class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-4">Problem Description</h3>
                <p class="text-neutral-600">{{ booking.description || booking.problemDescription || 'No description provided' }}</p>
              </div>
            </div>

            <!-- Technician Info (if assigned) -->
            <div v-if="booking.technicianFirstName || booking.technician" class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-4">Assigned Technician</h3>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-lg font-bold text-primary-600">{{ technicianInitials }}</span>
                  </div>
                  <div>
                    <p class="font-medium">{{ technicianName }}</p>
                    <p v-if="booking.technicianPhone" class="text-sm text-neutral-500">{{ booking.technicianPhone }}</p>
                    <div v-if="booking.technicianRating" class="flex items-center gap-1 mt-1">
                      <span class="text-warning-500">★</span>
                      <span class="text-sm text-neutral-600">{{ booking.technicianRating?.toFixed(1) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rating Section (for completed bookings) -->
            <div v-if="booking.status === 'completed' && !booking.rating && !booking.userRating" class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-4">Rate This Service</h3>
                <form @submit.prevent="submitRating" class="space-y-4">
                  <div class="flex gap-2">
                    <button 
                      v-for="star in 5" 
                      :key="star" 
                      type="button"
                      @click="ratingForm.rating = star"
                      class="text-2xl focus:outline-none"
                    >
                      <span :class="star <= ratingForm.rating ? 'text-warning-500' : 'text-neutral-300'">★</span>
                    </button>
                  </div>
                  <textarea 
                    v-model="ratingForm.review" 
                    class="form-textarea" 
                    rows="3" 
                    placeholder="Write your review (optional)"
                  ></textarea>
                  <button type="submit" class="btn btn-primary" :disabled="ratingForm.rating === 0 || submittingRating">
                    {{ submittingRating ? 'Submitting...' : 'Submit Rating' }}
                  </button>
                </form>
              </div>
            </div>

            <!-- Existing Rating -->
            <div v-if="booking.rating || booking.userRating" class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-4">Your Rating</h3>
                <div class="flex gap-1 mb-2">
                  <span v-for="star in 5" :key="star" class="text-xl" :class="star <= (booking.rating || booking.userRating) ? 'text-warning-500' : 'text-neutral-300'">★</span>
                </div>
                <p v-if="booking.reviewText" class="text-neutral-600">{{ booking.reviewText }}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Payment Card -->
            <div class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-4">Payment</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-neutral-500">Service Fee</span>
                    <span class="font-medium">${{ booking.price || booking.amount || '0.00' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-500">Status</span>
                    <span :class="booking.isPaid ? 'text-success-600' : 'text-warning-600'">
                      {{ booking.isPaid ? 'Paid' : 'Unpaid' }}
                    </span>
                  </div>
                </div>
                <button 
                  v-if="!booking.isPaid && booking.status === 'confirmed'" 
                  @click="handlePayment"
                  :disabled="processingPayment"
                  class="btn btn-primary w-full mt-4"
                >
                  {{ processingPayment ? 'Processing...' : 'Pay Now' }}
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-4">Actions</h3>
                <div class="space-y-2">
                  <button 
                    v-if="booking.status === 'pending'" 
                    @click="cancelBooking" 
                    :disabled="cancelling"
                    class="btn btn-outline w-full text-error-600"
                  >
                    {{ cancelling ? 'Cancelling...' : 'Cancel Booking' }}
                  </button>
                  <router-link to="/my-bookings" class="btn btn-ghost w-full">Back to Bookings</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useBookingStore } from '@/store/booking'
import { formatDate } from '@/utils/dateUtils'

export default {
  name: 'BookingDetailView',
  data() {
    return {
      booking: {},
      loading: true,
      error: null,
      ratingForm: { rating: 0, review: '' },
      submittingRating: false,
      processingPayment: false,
      cancelling: false
    }
  },
  computed: {
    // Technician initials for avatar
    technicianInitials() {
      const firstName = this.booking.technicianFirstName || ''
      const lastName = this.booking.technicianLastName || ''
      if (firstName || lastName) {
        return ((firstName[0] || '') + (lastName[0] || '')).toUpperCase()
      }
      return this.booking.technician?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'T'
    },
    // Full technician name
    technicianName() {
      if (this.booking.technicianFirstName && this.booking.technicianLastName) {
        return `${this.booking.technicianFirstName} ${this.booking.technicianLastName}`
      }
      return this.booking.technician?.name || 'Assigned Technician'
    },
    // Status class for badge styling
    statusClass() {
      const status = this.booking.status?.toLowerCase() || ''
      const statusMap = {
        'pending': 'warning',
        'confirmed': 'info',
        'in-progress': 'primary',
        'in_progress': 'primary',
        'inprogress': 'primary',
        'completed': 'success',
        'cancelled': 'error',
        'canceled': 'error'
      }
      return statusMap[status] || 'neutral'
    }
  },
  methods: {
    formatDate,
    // Submit rating
    async submitRating() {
      if (this.ratingForm.rating === 0) return
      
      this.submittingRating = true
      try {
        const store = useBookingStore()
        await store.rateBooking(this.booking.id, this.ratingForm.rating, this.ratingForm.review)
        this.booking.rating = this.ratingForm.rating
        this.booking.review = this.ratingForm.review
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to submit rating'
      } finally {
        this.submittingRating = false
      }
    },
    // Handle payment
    async handlePayment() {
      this.processingPayment = true
      try {
        const store = useBookingStore()
        await store.payBooking(this.booking.id)
        this.booking.isPaid = true
      } catch (err) {
        this.error = err.response?.data?.message || 'Payment failed'
      } finally {
        this.processingPayment = false
      }
    },
    // Cancel booking
    async cancelBooking() {
      if (!confirm('Are you sure you want to cancel this booking?')) return
      
      this.cancelling = true
      try {
        const store = useBookingStore()
        await store.cancelBooking(this.booking.id)
        this.$router.push('/my-bookings')
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to cancel booking'
      } finally {
        this.cancelling = false
      }
    },
    // Find booking from store
    loadBooking() {
      const store = useBookingStore()
      const routeId = this.$route.params.id
      const id = parseInt(routeId, 10)
      
      // Find booking by id (handles both number and string comparison)
      this.booking = store.allBookings.find(b => 
        b.id === id || b.id === routeId || String(b.id) === String(routeId)
      ) || {}
    }
  },
  async mounted() {
    this.loading = true
    this.error = null
    try {
      await useBookingStore().fetchAll()
      this.loadBooking()
    } catch (err) {
      this.error = err.response?.data?.message || 'Failed to load booking details'
    } finally {
      this.loading = false
    }
  },
  // Watch for route changes to reload booking
  watch: {
    '$route.params.id': {
      handler() {
        this.loadBooking()
      }
    }
  }
}
</script>

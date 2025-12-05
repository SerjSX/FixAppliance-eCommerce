<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <TechnicianSidebar />

    <!-- Main Content -->
    <main class="flex-1 ml-64 bg-neutral-50 min-h-screen">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-neutral-900">Completed Bookings</h1>
            <p class="text-sm text-neutral-500">History of your completed jobs</p>
          </div>
          <!-- Stats Summary -->
          <div class="flex gap-4">
            <div class="text-right">
              <p class="text-sm text-neutral-500">Total Completed</p>
              <p class="text-xl font-bold text-neutral-900">{{ completedBookings.length }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-neutral-500">Total Earnings</p>
              <p class="text-xl font-bold text-success-600">${{ totalEarnings.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-6">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner spinner-lg"></div>
        </div>

        <template v-else>
          <!-- Empty State -->
          <div v-if="completedBookings.length === 0" class="card p-12 text-center">
            <svg class="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-lg font-medium text-neutral-900 mb-2">No completed bookings yet</h3>
            <p class="text-neutral-500 mb-4">Complete your active jobs to see them here</p>
            <router-link to="/technician/active-bookings" class="btn btn-primary">View Active Bookings</router-link>
          </div>

          <!-- Bookings List -->
          <div v-else class="space-y-4">
            <div v-for="booking in completedBookings" :key="booking.id" class="card">
              <div class="card-body">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-start gap-4">
                    <!-- Appliance Icon -->
                    <div class="icon-box icon-box-success">
                      <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-neutral-900">{{ booking.applianceName }}</h3>
                      <p class="text-sm text-neutral-500">Booking #{{ booking.id }}</p>
                    </div>
                  </div>
                  <span class="badge badge-completed">Completed</span>
                </div>

                <!-- Booking Details -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Customer</p>
                    <p class="font-medium text-neutral-900">{{ booking.customerName }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Location</p>
                    <p class="font-medium text-neutral-900">{{ booking.city }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Completed On</p>
                    <p class="font-medium text-neutral-900">{{ formatDateTime(booking.completedAt) }}</p>
                  </div>
                </div>

                <!-- Issue Description -->
                <div v-if="booking.issueDescription" class="mb-4">
                  <p class="text-sm text-neutral-500 mb-1">Issue Description</p>
                  <p class="text-neutral-700 bg-neutral-50 p-3 rounded-lg">{{ booking.issueDescription }}</p>
                </div>

                <!-- Rating & Review -->
                <div v-if="booking.rating" class="mb-4 bg-warning-50 p-4 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <p class="text-sm font-medium text-neutral-700">Customer Rating:</p>
                    <div class="flex items-center gap-1">
                      <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= booking.rating ? 'text-warning-500' : 'text-neutral-300'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="text-sm font-medium text-neutral-700 ml-1">{{ booking.rating }}/5</span>
                    </div>
                  </div>
                  <p v-if="booking.review" class="text-neutral-600 italic">"{{ booking.review }}"</p>
                </div>

                <div v-else class="mb-4 bg-neutral-50 p-4 rounded-lg">
                  <p class="text-sm text-neutral-500">No rating received yet</p>
                </div>

                <!-- Price -->
                <div class="flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div>
                    <p class="text-sm text-neutral-500">Job Earnings (after platform fee)</p>
                    <p class="text-xl font-bold text-success-600">${{ calculateEarnings(booking.totalPrice).toFixed(2) }}</p>
                    <p class="text-xs text-neutral-500">Total: ${{ booking.totalPrice?.toFixed(2) || '0.00' }} (15% platform fee)</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500">Service Date</p>
                    <p class="font-medium text-neutral-700">{{ formatDate(booking.scheduledDate) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import { useTechnicianStore } from '@/store/technician'
import { formatDate } from '@/utils/dateUtils'
import TechnicianSidebar from '@/components/technician/TechnicianSidebar.vue'

export default {
  name: 'TechnicianCompletedBookingsView',
  components: {
    TechnicianSidebar
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    technicianAuthStore() {
      return useTechnicianAuthStore()
    },
    technicianStore() {
      return useTechnicianStore()
    },
    completedBookings() {
      return this.technicianStore.completedBookings || []
    },
    totalEarnings() {
      return this.completedBookings.reduce((sum, booking) => {
        return sum + this.calculateEarnings(booking.totalPrice)
      }, 0)
    }
  },
  methods: {
    formatDate,
    formatDateTime(dateTime) {
      if (!dateTime) return 'N/A'
      const date = new Date(dateTime)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    calculateEarnings(totalPrice) {
      // 15% platform fee
      const price = totalPrice || 0
      return price - (price * 0.15)
    },
    async handleLogout() {
      await this.technicianAuthStore.logout()
      this.$router.push('/technician-login')
    },
    async loadData() {
      this.loading = true
      try {
        await this.technicianStore.fetchCompletedBookings()
      } catch (err) {
        console.error('Failed to load completed bookings:', err)
      } finally {
        this.loading = false
      }
    }
  },
  async mounted() {
    await this.loadData()
  }
}
</script>

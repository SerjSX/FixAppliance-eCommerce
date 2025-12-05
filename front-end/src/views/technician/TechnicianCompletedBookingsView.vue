<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 bottom-0 w-64 bg-primary-800 text-white overflow-y-auto" role="navigation" aria-label="Technician navigation">
      <!-- Logo -->
      <div class="p-6 border-b border-primary-700">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <img src="/images/logo/fixappliance-icon.svg" alt="FixAppliance" class="w-6 h-6">
          </div>
          <div>
            <p class="font-bold">FixAppliance</p>
            <p class="text-xs text-primary-300">Technician Portal</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1">
        <router-link to="/technician-dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/technician/pending-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Pending Bookings</span>
        </router-link>

        <router-link to="/technician/active-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>Active Bookings</span>
        </router-link>

        <router-link to="/technician/completed-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-700 text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Completed</span>
          <span v-if="completedBookings.length > 0" class="ml-auto bg-success-500 text-white text-xs px-2 py-0.5 rounded-full">{{ completedBookings.length }}</span>
        </router-link>

        <router-link to="/technician/earnings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Earnings</span>
        </router-link>

        <div class="pt-4 pb-2 px-4">
          <span class="text-xs text-primary-400 uppercase tracking-wider">Settings</span>
        </div>

        <router-link to="/technician/profile" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Profile</span>
        </router-link>

        <router-link to="/technician/specialties" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Specialty Areas</span>
        </router-link>

        <router-link to="/technician/service-areas" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Service Areas</span>
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-700">
        <button type="button" @click="handleLogout" class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>

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
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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
                    <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
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

export default {
  name: 'TechnicianCompletedBookingsView',
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

<style scoped>
.badge-completed {
  @apply bg-success-100 text-success-800 px-2 py-1 rounded-full text-xs font-medium;
}
</style>

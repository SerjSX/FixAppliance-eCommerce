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

        <router-link to="/technician/active-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-700 text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>Active Bookings</span>
          <span v-if="activeBookings.length > 0" class="ml-auto bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">{{ activeBookings.length }}</span>
        </router-link>

        <router-link to="/technician/completed-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Completed</span>
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
            <h1 class="text-xl font-semibold text-neutral-900">Active Bookings</h1>
            <p class="text-sm text-neutral-500">Manage your confirmed and in-progress jobs</p>
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
          <!-- Error Alert -->
          <AlertMessage 
            v-if="error" 
            type="error" 
            :message="error"
            class="mb-6"
            @dismiss="error = null"
          />

          <!-- Filter Tabs -->
          <div class="flex gap-4 mb-6">
            <button 
              @click="filter = 'all'"
              :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', filter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100']"
            >
              All ({{ activeBookings.length }})
            </button>
            <button 
              @click="filter = 'confirmed'"
              :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', filter === 'confirmed' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100']"
            >
              Confirmed ({{ confirmedBookings.length }})
            </button>
            <button 
              @click="filter = 'in_progress'"
              :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', filter === 'in_progress' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100']"
            >
              In Progress ({{ inProgressBookings.length }})
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="filteredBookings.length === 0" class="card p-12 text-center">
            <svg class="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-neutral-900 mb-2">No active bookings</h3>
            <p class="text-neutral-500 mb-4">Accept pending bookings to start working</p>
            <router-link to="/technician/pending-bookings" class="btn btn-primary">View Pending Bookings</router-link>
          </div>

          <!-- Bookings List -->
          <div v-else class="space-y-4">
            <div v-for="booking in filteredBookings" :key="booking.id" class="card">
              <div class="card-body">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-start gap-4">
                    <!-- Appliance Icon -->
                    <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-neutral-900">{{ booking.applianceName }}</h3>
                      <p class="text-sm text-neutral-500">Booking #{{ booking.id }}</p>
                    </div>
                  </div>
                  <span :class="['badge', booking.status === 'confirmed' ? 'badge-confirmed' : 'badge-in-progress']">
                    {{ booking.status === 'confirmed' ? 'Confirmed' : 'In Progress' }}
                  </span>
                </div>

                <!-- Booking Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Customer</p>
                    <p class="font-medium text-neutral-900">{{ booking.customerName }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Phone</p>
                    <p class="font-medium text-neutral-900">{{ booking.customerPhone || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Scheduled Date</p>
                    <p class="font-medium text-neutral-900">{{ formatDate(booking.scheduledDate) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Time</p>
                    <p class="font-medium text-neutral-900">{{ formatTime(booking.scheduledTime) }}</p>
                  </div>
                </div>

                <!-- Address -->
                <div class="mb-4">
                  <p class="text-sm text-neutral-500 mb-1">Address</p>
                  <p class="text-neutral-900">
                    {{ booking.streetAddress }}, {{ booking.buildingName }}
                    <span v-if="booking.floor">, Floor {{ booking.floor }}</span>
                    <br>{{ booking.city }}
                    <span v-if="booking.postalCode"> - {{ booking.postalCode }}</span>
                  </p>
                </div>

                <!-- Issue Description -->
                <div v-if="booking.issueDescription" class="mb-4">
                  <p class="text-sm text-neutral-500 mb-1">Issue Description</p>
                  <p class="text-neutral-700 bg-neutral-50 p-3 rounded-lg">{{ booking.issueDescription }}</p>
                </div>

                <!-- Price & Payment -->
                <div class="flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div>
                    <p class="text-sm text-neutral-500">Total Amount</p>
                    <p class="text-xl font-bold text-primary-600">${{ booking.totalPrice?.toFixed(2) || '0.00' }}</p>
                    <p v-if="booking.paymentStatus" class="text-xs text-neutral-500">
                      Payment: <span :class="booking.paymentStatus === 'completed' ? 'text-success-600' : 'text-warning-600'">{{ booking.paymentStatus }}</span>
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      v-if="booking.status === 'confirmed'"
                      @click="startJob(booking.id)"
                      :disabled="actionLoading === booking.id"
                      class="btn btn-primary"
                    >
                      <span v-if="actionLoading === booking.id">Starting...</span>
                      <span v-else>Start Job</span>
                    </button>
                    <button 
                      v-if="booking.status === 'in_progress'"
                      @click="completeJob(booking.id)"
                      :disabled="actionLoading === booking.id"
                      class="btn btn-success"
                    >
                      <span v-if="actionLoading === booking.id">Completing...</span>
                      <span v-else>Mark Complete</span>
                    </button>
                    <a 
                      v-if="booking.customerPhone"
                      :href="'tel:' + booking.customerPhone" 
                      class="btn btn-ghost"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      Call
                    </a>
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
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'TechnicianActiveBookingsView',
  components: {
    AlertMessage
  },
  data() {
    return {
      loading: false,
      actionLoading: null,
      filter: 'all',
      error: null
    }
  },
  computed: {
    technicianAuthStore() {
      return useTechnicianAuthStore()
    },
    technicianStore() {
      return useTechnicianStore()
    },
    activeBookings() {
      return this.technicianStore.activeBookings || []
    },
    confirmedBookings() {
      return this.activeBookings.filter(b => b.status === 'confirmed')
    },
    inProgressBookings() {
      return this.activeBookings.filter(b => b.status === 'in_progress')
    },
    filteredBookings() {
      if (this.filter === 'confirmed') return this.confirmedBookings
      if (this.filter === 'in_progress') return this.inProgressBookings
      return this.activeBookings
    }
  },
  methods: {
    formatDate,
    formatTime(time) {
      if (!time) return 'TBD'
      // If time is a string like "14:00:00", format it nicely
      const parts = time.split(':')
      if (parts.length >= 2) {
        const hour = parseInt(parts[0])
        const minute = parts[1]
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 || 12
        return `${hour12}:${minute} ${ampm}`
      }
      return time
    },
    async handleLogout() {
      await this.technicianAuthStore.logout()
      this.$router.push('/technician-login')
    },
    async startJob(bookingId) {
      this.actionLoading = bookingId
      try {
        await this.technicianStore.startBooking(bookingId)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to start job'
      } finally {
        this.actionLoading = null
      }
    },
    async completeJob(bookingId) {
      if (!confirm('Are you sure you want to mark this job as complete?')) return
      this.actionLoading = bookingId
      try {
        await this.technicianStore.completeBooking(bookingId)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to complete job'
      } finally {
        this.actionLoading = null
      }
    },
    async loadData() {
      this.loading = true
      try {
        await this.technicianStore.fetchActiveBookings()
      } catch (err) {
        console.error('Failed to load active bookings:', err)
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
.badge-confirmed {
  @apply bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium;
}
.badge-in-progress {
  @apply bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium;
}
.btn-success {
  @apply bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded-lg font-medium transition-colors;
}
</style>

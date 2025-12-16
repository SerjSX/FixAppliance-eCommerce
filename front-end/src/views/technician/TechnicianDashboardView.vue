<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <TechnicianSidebar />

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="ml-14 lg:ml-0">
            <h1 class="text-xl font-semibold text-neutral-900">Dashboard</h1>
            <p class="text-sm text-neutral-500">Welcome back, {{ technician.firstName || 'Technician' }}!</p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button type="button" class="relative p-2 text-neutral-500 hover:text-neutral-700 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span v-if="pendingCount > 0" class="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
            </button>
            <!-- Profile -->
            <div class="flex items-center gap-3">
              <span class="avatar avatar-md bg-primary-100 text-primary-600">{{ technicianInitials }}</span>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-neutral-900">{{ technicianName }}</p>
                <p class="text-xs text-neutral-500">{{ technician.verified ? 'Verified Technician' : 'Pending Verification' }}</p>
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
          <AlertMessage 
            v-if="error" 
            type="error" 
            :message="error"
            class="mb-6"
            @dismiss="error = null"
          />

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Pending Requests -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Pending Requests</p>
                    <p class="text-3xl font-bold text-neutral-900">{{ pendingCount }}</p>
                  </div>
                  <div class="icon-box icon-box-warning">
                    <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <router-link to="/technician/pending-bookings" class="text-sm text-primary-600 hover:underline mt-3 inline-block">View all →</router-link>
              </div>
            </div>

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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <router-link to="/technician/active-bookings" class="text-sm text-primary-600 hover:underline mt-3 inline-block">Manage →</router-link>
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-success-600 mt-3">Great work!</p>
              </div>
            </div>

            <!-- Earnings This Month -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Earnings (Month)</p>
                    <p class="text-3xl font-bold text-neutral-900">${{ earningsThisMonth }}</p>
                  </div>
                  <div class="icon-box icon-box-secondary">
                    <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <router-link to="/technician/earnings" class="text-sm text-primary-600 hover:underline mt-3 inline-block">View details →</router-link>
              </div>
            </div>
          </div>

          <!-- Recent Activity & Pending Bookings -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Pending Bookings to Accept -->
            <div class="card">
              <div class="card-header flex items-center justify-between">
                <h3 class="font-semibold text-neutral-900">Pending Bookings</h3>
                <router-link to="/technician/pending-bookings" class="text-sm text-primary-600 hover:underline">View all</router-link>
              </div>
              
              <!-- Empty State -->
              <div v-if="pendingBookings.length === 0" class="p-8 text-center">
                <svg class="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <p class="text-neutral-500">No pending bookings</p>
              </div>

              <div v-else class="divide-y divide-neutral-100">
                <!-- Booking Item -->
                <div v-for="booking in pendingBookings.slice(0, 3)" :key="booking.id" class="p-4 hover:bg-neutral-50 transition-colors">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h4 class="font-medium text-neutral-900">{{ booking.applianceName || 'Appliance Repair' }}</h4>
                      <p class="text-sm text-neutral-500">{{ booking.city || 'Location TBD' }}</p>
                    </div>
                    <span class="badge badge-pending">New</span>
                  </div>
                  <p class="text-sm text-neutral-600 mb-3 line-clamp-1">{{ booking.issueDescription || 'No description' }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-neutral-500">{{ formatDate(booking.scheduledDate) }}</span>
                    <div class="flex gap-2">
                      <button type="button" @click="acceptBooking(booking.id)" class="btn btn-primary btn-sm">Accept</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <!-- Recent Ratings -->
          <div class="card">
            <div class="card-header flex items-center justify-between">
              <h3 class="font-semibold text-neutral-900">Recent Ratings</h3>
              <div class="flex items-center gap-1 text-warning-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="font-semibold">{{ averageRating }}</span>
                <span class="text-sm text-neutral-500">({{ totalReviews }} reviews)</span>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-if="recentRatings.length === 0" class="p-8 text-center">
              <svg class="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              <p class="text-neutral-500">No ratings yet</p>
            </div>

            <div v-else class="divide-y divide-neutral-100">
              <!-- Rating Item -->
              <div v-for="booking in recentRatings" :key="booking.id" class="p-4">
                <div class="flex items-start gap-3">
                  <span class="avatar avatar-sm bg-primary-100 text-primary-600">{{ getCustomerInitials(booking) }}</span>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-medium text-neutral-900">{{ booking.customerName || 'Customer' }}</span>
                      <div class="flex items-center gap-0.5 text-warning-500">
                        <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= booking.rating ? 'text-warning-500' : 'text-neutral-300'" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    <p v-if="booking.review" class="text-sm text-neutral-600 mb-1">{{ booking.review }}</p>
                    <span class="text-xs text-neutral-400">{{ formatDate(booking.completedAt) }} • {{ booking.applianceName }}</span>
                  </div>
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
import TechnicianSidebar from '@/components/technician/TechnicianSidebar.vue'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

export default {
  name: 'TechnicianDashboardView',
  components: {
    AlertMessage,
    TechnicianSidebar
  },
  data() {
    const { isRefreshing, lastUpdated, startAutoRefresh, stopAutoRefresh } = useAutoRefresh();
    return {
      loading: false,
      error: null,
      isRefreshing,
      lastUpdated,
      startAutoRefresh,
      stopAutoRefresh
    }
  },
  computed: {
    technicianAuthStore() {
      return useTechnicianAuthStore()
    },
    technicianStore() {
      return useTechnicianStore()
    },
    technician() {
      return this.technicianAuthStore.currentTechnician || {}
    },
    technicianName() {
      if (this.technician.firstName && this.technician.lastName) {
        return `${this.technician.firstName} ${this.technician.lastName}`
      }
      return this.technician.name || 'Technician'
    },
    technicianInitials() {
      if (this.technician.firstName && this.technician.lastName) {
        return `${this.technician.firstName[0]}${this.technician.lastName[0]}`.toUpperCase()
      }
      return this.technicianName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'T'
    },
    pendingBookings() {
      return this.technicianStore.pendingBookings || []
    },
    activeBookings() {
      return this.technicianStore.activeBookings || []
    },
    completedBookings() {
      return this.technicianStore.completedBookings || []
    },
    earnings() {
      return this.technicianStore.earnings || {}
    },
    pendingCount() {
      return this.pendingBookings.length
    },
    activeBookingsCount() {
      return this.activeBookings.length
    },
    completedThisMonth() {
      // Filter completed bookings by current month
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      return this.completedBookings.filter(b => {
        const completedDate = new Date(b.completedAt)
        return completedDate.getMonth() === currentMonth && completedDate.getFullYear() === currentYear
      }).length
    },
    earningsThisMonth() {
      // Calculate earnings from monthly breakdown for current month
      if (this.earnings?.monthlyBreakdown?.length > 0) {
        const now = new Date()
        const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
        const currentMonthData = this.earnings.monthlyBreakdown.find(m => m.month === currentMonthStr)
        if (currentMonthData) {
          return parseFloat(currentMonthData.earnings || 0).toFixed(2)
        }
      }
      // Fallback to total earnings if no monthly breakdown
      if (this.earnings?.summary?.totalEarnings) {
        return parseFloat(this.earnings.summary.totalEarnings).toFixed(2)
      }
      return '0.00'
    },
    // Get recent ratings from completed bookings
    recentRatings() {
      return this.completedBookings
        .filter(b => b.rating)
        .slice(0, 3)
    },
    // Calculate average rating
    averageRating() {
      const ratedBookings = this.completedBookings.filter(b => b.rating)
      if (ratedBookings.length === 0) return 0
      const sum = ratedBookings.reduce((acc, b) => acc + (b.rating || 0), 0)
      return (sum / ratedBookings.length).toFixed(1)
    },
    totalReviews() {
      return this.completedBookings.filter(b => b.rating).length
    }
  },
  methods: {
    formatDate,
    getCustomerInitials(booking) {
      const name = booking.customerName || 'Customer'
      const parts = name.split(' ')
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      }
      return name.substring(0, 2).toUpperCase()
    },
    async handleLogout() {
      await this.technicianAuthStore.logout()
      this.$router.push('/technician-login')
    },
    async acceptBooking(bookingId) {
      try {
        await this.technicianStore.acceptBooking(bookingId)
        await this.loadDashboardData()
        this.error = null
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to accept booking'
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // Refresh dashboard data to remove stale/cancelled bookings
        try {
          await this.loadDashboardData()
        } catch (refreshErr) {
          console.error('Failed to refresh dashboard data:', refreshErr)
        }
      }
    },
    async loadDashboardData() {
      this.loading = true
      try {
        await Promise.all([
          this.technicianAuthStore.fetchProfile(),
          this.technicianStore.fetchPendingBookings(),
          this.technicianStore.fetchActiveBookings(),
          this.technicianStore.fetchCompletedBookings(),
          this.technicianStore.fetchEarnings()
        ])
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        this.loading = false
      }
    }
  },
  async mounted() {
    await this.loadDashboardData()

    this.startAutoRefresh(async () => {
      await this.loadDashboardData()
    }, 15000)
  },
  unmounted() {
    this.stopAutoRefresh()
  }
}
</script>

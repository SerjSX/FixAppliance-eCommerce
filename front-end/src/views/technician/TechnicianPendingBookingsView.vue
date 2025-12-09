<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <TechnicianSidebar />

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="ml-14 lg:ml-0">
            <h1 class="text-xl font-semibold text-neutral-900">Pending Bookings</h1>
            <p class="text-sm text-neutral-500">Review and accept new booking requests</p>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-4 sm:p-6">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner spinner-lg"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="pendingBookings.length === 0" class="card p-12 text-center">
          <svg class="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">No pending bookings</h3>
          <p class="text-neutral-500">You don't have any new booking requests at the moment.</p>
        </div>

        <!-- Bookings List -->
        <div v-else class="space-y-4">
          <div v-for="booking in pendingBookings" :key="booking.id" class="card">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-start gap-4">
                <!-- Info -->
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="text-lg font-semibold text-neutral-900">{{ booking.applianceName }}</h3>
                    <span class="badge badge-pending">Pending</span>
                  </div>
                  <p class="text-sm text-neutral-600 mb-3">{{ booking.issueDescription }}</p>
                  <div class="flex flex-wrap gap-4 text-sm text-neutral-500">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      </svg>
                      <span>{{ booking.serviceArea }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{{ formatDate(booking.scheduledDate) }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"></path>
                      </svg>
                      <span>${{ booking.totalPrice }}</span>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
                  <button @click="acceptBooking(booking.id)" class="btn btn-primary btn-sm">Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TechnicianSidebar from '@/components/technician/TechnicianSidebar.vue';
import { useTechnicianStore } from '@/store/technician'
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import { formatDate } from '@/utils/dateUtils'

export default {
  name: 'TechnicianPendingBookingsView',
  components: {
    TechnicianSidebar,
  },
  data() {
    return { loading: false }
  },
  computed: {
    pendingBookings() {
      return useTechnicianStore().pendingBookings
    }
  },
  methods: {
    formatDate,
    async handleLogout() {
      await useTechnicianAuthStore().logout()
      this.$router.push('/technician-login')
    },
    // Accept a booking
    async acceptBooking(bookingId) {
      try {
        await useTechnicianStore().acceptBooking(bookingId)
        await this.loadData()
      } catch (err) {
        console.error('Failed to accept booking:', err)
      }
    },
    async loadData() {
      this.loading = true
      await useTechnicianStore().fetchPendingBookings()
      this.loading = false
    }
  },
  async mounted() {
    await this.loadData()
  }
}
</script>

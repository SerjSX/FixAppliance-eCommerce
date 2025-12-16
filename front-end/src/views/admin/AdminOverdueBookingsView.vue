<template>
  <div class="min-h-screen flex overflow-x-hidden">
    <AdminSidebar />

    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4 sticky top-0 z-10">
        <h1 class="text-xl font-semibold text-neutral-900">Overdue Bookings</h1>
        <p class="text-sm text-neutral-500">Paid but not completed past scheduled date</p>
      </header>

      <div class="p-4 sm:p-6">
        <!-- Refresh Button -->
        <div class="mb-6">
          <button @click="loadBookings" class="btn btn-primary">
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>

        <!-- Bookings Table -->
        <div class="card">
          <div class="card-body p-0">
            <div v-if="loading" class="p-8 text-center">
              <div class="inline-block animate-spin">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
            </div>

            <div v-else-if="bookings.length === 0" class="p-8 text-center text-neutral-500">
              <p>No overdue bookings found</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Booking ID</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">User</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Technician</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Status</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Days Overdue</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Payment</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-200">
                  <tr v-for="booking in bookings" :key="booking.Booking_ID" class="hover:bg-neutral-50">
                    <td class="px-4 py-3 text-sm font-medium text-neutral-900">#{{ booking.Booking_ID }}</td>
                    <td class="px-4 py-3 text-sm">
                      <div>{{ booking.User_Name }}</div>
                      <div class="text-xs text-neutral-500">{{ booking.User_Email }}</div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <div>{{ booking.Technician_Name }}</div>
                      <div class="text-xs text-neutral-500">{{ booking.Technician_Phone }}</div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <span class="px-2 py-1 bg-error-100 text-error-700 rounded text-xs font-medium capitalize">
                        {{ booking.Status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <span class="px-2 py-1 bg-error-100 text-error-700 rounded text-xs font-medium">
                        {{ booking.Days_Overdue }} days
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <div class="font-semibold text-neutral-900">${{ booking.Paid_Amount }}</div>
                      <div class="text-xs text-neutral-500">{{ booking.Payment_Method }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Summary Stats -->
        <div v-if="bookings.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div class="card">
            <div class="card-body">
              <p class="text-sm text-neutral-500 mb-1">Total Overdue Amount</p>
              <p class="text-2xl font-bold text-error-600">${{ totalAmount }}</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p class="text-sm text-neutral-500 mb-1">Booking Count</p>
              <p class="text-2xl font-bold text-neutral-900">{{ bookings.length }}</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p class="text-sm text-neutral-500 mb-1">Avg Days Overdue</p>
              <p class="text-2xl font-bold text-neutral-900">{{ avgDaysOverdue }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useAdminStore } from '@/store/admin'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'

export default {
  name: 'AdminOverdueBookingsView',
  components: { AdminSidebar },
  data() {
    return {
      bookings: [],
      loading: false
    }
  },
  computed: {
    totalAmount() {
      return this.bookings.reduce((sum, b) => sum + (b.Paid_Amount || 0), 0).toFixed(2)
    },
    avgDaysOverdue() {
      if (this.bookings.length === 0) return 0
      const sum = this.bookings.reduce((total, b) => total + (b.Days_Overdue || 0), 0)
      return Math.round(sum / this.bookings.length)
    }
  },
  async mounted() {
    await this.loadBookings()
  },
  methods: {
    async loadBookings() {
      this.loading = true
      const adminStore = useAdminStore()
      try {
        const result = await adminStore.fetchPaidOverdue()
        this.bookings = result.data || []
      } catch (error) {
        console.error('Error loading bookings:', error)
        this.bookings = []
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

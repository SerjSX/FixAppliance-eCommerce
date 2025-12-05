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
            <h1 class="text-xl font-semibold text-neutral-900">My Earnings</h1>
            <p class="text-sm text-neutral-500">Track your income and completed jobs</p>
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
          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="card">
              <div class="card-body">
                <p class="text-sm text-neutral-500 mb-1">Total Earnings</p>
                <p class="text-3xl font-bold text-success-600">${{ earningsSummary.totalEarnings }}</p>
                <p class="text-xs text-neutral-400 mt-1">After platform fees</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <p class="text-sm text-neutral-500 mb-1">Total Revenue</p>
                <p class="text-3xl font-bold text-neutral-900">${{ earningsSummary.totalRevenue }}</p>
                <p class="text-xs text-neutral-400 mt-1">Before fees</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <p class="text-sm text-neutral-500 mb-1">Platform Fees</p>
                <p class="text-3xl font-bold text-warning-600">${{ earningsSummary.totalPlatformFees }}</p>
                <p class="text-xs text-neutral-400 mt-1">15% commission</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <p class="text-sm text-neutral-500 mb-1">Completed Jobs</p>
                <p class="text-3xl font-bold text-primary-600">{{ earningsSummary.totalBookings }}</p>
                <p class="text-xs text-neutral-400 mt-1">Avg: ${{ earningsSummary.averageBookingValue }}</p>
              </div>
            </div>
          </div>

          <!-- Monthly Breakdown -->
          <div class="card">
            <div class="card-body">
              <h3 class="text-lg font-semibold text-neutral-900 mb-4">Monthly Breakdown</h3>
              
              <!-- Empty State -->
              <div v-if="!monthlyBreakdown.length" class="text-center py-8 text-neutral-500">
                No earnings data yet. Complete some jobs to see your earnings here.
              </div>

              <!-- History Table -->
              <div v-else class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-neutral-200">
                      <th class="text-left py-3 px-4 text-sm font-medium text-neutral-500">Month</th>
                      <th class="text-center py-3 px-4 text-sm font-medium text-neutral-500">Jobs Completed</th>
                      <th class="text-right py-3 px-4 text-sm font-medium text-neutral-500">Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in monthlyBreakdown" :key="item.month" class="border-b border-neutral-100 hover:bg-neutral-50">
                      <td class="py-3 px-4 text-sm font-medium">{{ formatMonth(item.month) }}</td>
                      <td class="py-3 px-4 text-sm text-center">{{ item.bookingsCount }}</td>
                      <td class="py-3 px-4 text-sm text-right font-medium text-success-600">${{ item.earnings }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="bg-neutral-50">
                      <td class="py-3 px-4 text-sm font-semibold">Total</td>
                      <td class="py-3 px-4 text-sm text-center font-semibold">{{ earningsSummary.totalBookings }}</td>
                      <td class="py-3 px-4 text-sm text-right font-semibold text-success-600">${{ earningsSummary.totalEarnings }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { useTechnicianStore } from '@/store/technician'
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import TechnicianSidebar from '@/components/technician/TechnicianSidebar.vue'

export default {
  name: 'TechnicianEarningsView',
  components: {
    TechnicianSidebar
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    technicianStore() {
      return useTechnicianStore()
    },
    earnings() {
      return this.technicianStore.earnings || {}
    },
    earningsSummary() {
      return this.earnings.summary || {
        totalBookings: 0,
        totalRevenue: '0.00',
        totalPlatformFees: '0.00',
        totalEarnings: '0.00',
        averageBookingValue: '0.00'
      }
    },
    monthlyBreakdown() {
      return this.earnings.monthlyBreakdown || []
    }
  },
  methods: {
    formatMonth(monthStr) {
      if (!monthStr) return 'N/A'
      // monthStr is in format "yyyy-MM"
      const [year, month] = monthStr.split('-')
      const date = new Date(year, parseInt(month) - 1)
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    },
    async handleLogout() {
      await useTechnicianAuthStore().logout()
      this.$router.push('/technician-login')
    }
  },
  async mounted() {
    this.loading = true
    try {
      await this.technicianStore.fetchEarnings()
    } catch (err) {
      console.error('Failed to load earnings:', err)
    } finally {
      this.loading = false
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex overflow-x-hidden">
    <AdminSidebar />

    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4 sticky top-0 z-10">
        <div class="ml-14 lg:ml-0">
          <h1 class="text-xl font-semibold text-neutral-900">Technician Performance</h1>
          <p class="text-sm text-neutral-500">Low-rated and high-performing technicians</p>
        </div>

      </header>

      <div class="p-4 sm:p-6">
        <!-- Tabs -->
        <div class="flex gap-4 mb-6 border-b border-neutral-200">
          <button @click="activeTab = 'low'"
            :class="['px-4 py-2 font-medium border-b-2 transition-colors', activeTab === 'low' ? 'border-error-500 text-error-600' : 'border-transparent text-neutral-600 hover:text-neutral-900']">
            Low Rated
          </button>
          <button @click="activeTab = 'high'"
            :class="['px-4 py-2 font-medium border-b-2 transition-colors', activeTab === 'high' ? 'border-success-500 text-success-600' : 'border-transparent text-neutral-600 hover:text-neutral-900']">
            High Performers
          </button>
        </div>

        <!-- Low Rated Technicians -->
        <div v-if="activeTab === 'low'" class="card">
          <div class="card-body p-0">
            <div v-if="loadingLow" class="p-8 text-center">
              <div class="inline-block animate-spin">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                  </path>
                </svg>
              </div>
            </div>

            <div v-else-if="lowRatedTechs.length === 0" class="p-8 text-center text-neutral-500">
              <p>No low-rated technicians</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Name</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Email</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Rating</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Jobs</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Reviews</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Status</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-200">
                  <tr v-for="tech in lowRatedTechs" :key="tech.Technician_ID" class="hover:bg-neutral-50">
                    <td class="px-4 py-3 text-sm font-medium text-neutral-900">{{ tech.Technician_Name }}</td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ tech.Email }}</td>
                    <td class="px-4 py-3 text-sm">
                      <span class="px-2 py-1 bg-error-100 text-error-700 rounded text-xs font-semibold">
                        {{ tech.Average_Rating }}/5
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ tech.Total_Jobs }}</td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ tech.Total_Reviews }}</td>
                    <td class="px-4 py-3 text-sm">
                      <span
                        :class="['px-2 py-1 rounded text-xs font-medium', tech.Verified ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700']">
                        {{ tech.Verified ? 'Verified' : 'Unverified' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <button
                        @click="$router.push({ name: 'AdminTechnicianDetails', params: { id: tech.Technician_ID } })"
                        class="text-primary-600 hover:text-primary-800 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- High Performers -->
        <div v-if="activeTab === 'high'" class="card">
          <div class="card-body p-0">
            <div v-if="loadingHigh" class="p-8 text-center">
              <div class="inline-block animate-spin">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                  </path>
                </svg>
              </div>
            </div>

            <div v-else-if="highPerformers.length === 0" class="p-8 text-center text-neutral-500">
              <p>No high-performing technicians</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Name</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Email</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Rating</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Jobs</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Reviews</th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-200">
                  <tr v-for="tech in highPerformers" :key="tech.Technician_ID" class="hover:bg-neutral-50">
                    <td class="px-4 py-3 text-sm font-medium text-neutral-900">{{ tech.Technician_Name }}</td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ tech.Email }}</td>
                    <td class="px-4 py-3 text-sm">
                      <span class="px-2 py-1 bg-success-100 text-success-700 rounded text-xs font-semibold">
                        {{ tech.Average_Rating }}/5 ⭐
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ tech.Total_Jobs }}</td>
                    <td class="px-4 py-3 text-sm text-neutral-600">{{ tech.Total_Reviews }}</td>
                    <td class="px-4 py-3 text-sm">
                      <button
                        @click="$router.push({ name: 'AdminTechnicianDetails', params: { id: tech.Technician_ID } })"
                        class="text-primary-600 hover:text-primary-800 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  name: 'AdminPerformanceView',
  components: { AdminSidebar },
  data() {
    return {
      activeTab: 'low',
      lowRatedTechs: [],
      highPerformers: [],
      loadingLow: false,
      loadingHigh: false
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      const adminStore = useAdminStore()
      this.loadingLow = true
      this.loadingHigh = true

      try {
        const [lowRes, highRes] = await Promise.all([
          adminStore.fetchLowRatedTechnicians(3),
          adminStore.fetchHighPerformanceTechnicians(3)
        ])
        this.lowRatedTechs = lowRes.data || []
        this.highPerformers = highRes.data || []
      } catch (error) {
        console.error('Error loading technician data:', error)
        this.lowRatedTechs = []
        this.highPerformers = []
      } finally {
        this.loadingLow = false
        this.loadingHigh = false
      }
    }
  }
}
</script>

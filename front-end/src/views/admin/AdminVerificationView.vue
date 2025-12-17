<template>
  <div class="min-h-screen flex overflow-x-hidden">
    <AdminSidebar />

    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4 sticky top-0 z-10">
        <div class="ml-14 lg:ml-0">
          <h1 class="text-xl font-semibold text-neutral-900">Technician Verification</h1>
          <p class="text-sm text-neutral-500">Review and verify pending technician applications</p>
        </div>
      </header>

      <div class="p-4 sm:p-6">
        <div class="card">
          <div class="card-body p-0">
            <div v-if="loading" class="p-8 text-center">
              <div class="inline-block animate-spin">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                  </path>
                </svg>
              </div>
            </div>

            <div v-else-if="technicians.length === 0" class="p-8 text-center text-neutral-500">
              <p>No pending technicians to verify</p>
            </div>

            <div v-else class="space-y-4 p-6">
              <div v-for="tech in technicians" :key="tech.Technician_ID"
                class="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Info Section -->
                  <div>
                    <h3 class="text-sm font-semibold text-neutral-900 mb-2">{{ tech.First_Name }} {{ tech.Last_Name }}
                    </h3>
                    <div class="space-y-1 text-xs text-neutral-600">
                      <p><span class="font-medium">Email:</span> {{ tech.Email }}</p>
                      <p><span class="font-medium">Phone:</span> {{ tech.Phone }}</p>
                      <p><span class="font-medium">Specialties:</span> {{ tech.Specialties || 'N/A' }}</p>
                      <p><span class="font-medium">Years Experience:</span> {{ tech.Years_Experience || 'N/A' }}</p>
                      <p v-if="tech.Average_Rating">
                        <span class="font-medium">Current Rating:</span>
                        <span class="text-warning-600">{{ tech.Average_Rating }}/5</span>
                      </p>
                    </div>
                  </div>

                  <!-- Action Section -->
                  <div class="flex flex-col gap-2">
                    <button @click="verifyTechnician(tech.Technician_ID)" :disabled="verifyingId === tech.Technician_ID"
                      class="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium">
                      {{ verifyingId === tech.Technician_ID ? 'Verifying...' : 'Verify Technician' }}
                    </button>
                    <button @click="rejectTechnician(tech.Technician_ID)"
                      class="px-4 py-2 border border-error-600 text-error-600 rounded-lg hover:bg-error-50 transition-colors text-sm font-medium">
                      Reject Application
                    </button>
                    <button @click="viewProfile(tech.Technician_ID)"
                      class="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium">
                      View Full Profile
                    </button>
                  </div>
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
import { useAdminStore } from '@/store/admin'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'

export default {
  name: 'AdminVerificationView',
  components: { AdminSidebar },
  data() {
    return {
      technicians: [],
      loading: false,
      verifyingId: null
    }
  },
  async mounted() {
    await this.loadTechnicians()
  },
  methods: {
    async loadTechnicians() {
      this.loading = true
      const adminStore = useAdminStore()
      try {
        const result = await adminStore.fetchUnverifiedTechnicians()
        this.technicians = result.data || []
      } catch (error) {
        console.error('Error loading technicians:', error)
        this.technicians = []
      } finally {
        this.loading = false
      }
    },
    async verifyTechnician(technicianId) {
      this.verifyingId = technicianId
      const adminStore = useAdminStore()
      try {
        await adminStore.verifyTechnician(technicianId)
        this.technicians = this.technicians.filter(t => t.Technician_ID !== technicianId)
      } catch (error) {
        console.error('Error verifying technician:', error)
      } finally {
        this.verifyingId = null
      }
    },
    async rejectTechnician(technicianId) {
      if (confirm('Are you sure you want to reject this technician?')) {
        // Add rejection logic if needed
        this.technicians = this.technicians.filter(t => t.Technician_ID !== technicianId)
      }
    },
    viewProfile(technicianId) {
      this.$router.push({ name: 'AdminTechnicianDetails', params: { id: technicianId } })
    }
  }
}
</script>

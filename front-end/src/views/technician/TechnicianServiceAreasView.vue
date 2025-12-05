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
            <h1 class="text-xl font-semibold text-neutral-900">My Service Areas</h1>
            <p class="text-sm text-neutral-500">Select the areas where you provide services</p>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-6">
        <div class="card">
          <div class="card-body">
            <!-- Loading -->
            <div v-if="loading" class="loading-container-sm">
              <div class="spinner spinner-lg"></div>
            </div>

            <!-- Areas Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <label 
                v-for="area in allAreas" 
                :key="area.id" 
                class="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors"
                :class="{ 'border-primary-500 bg-primary-50': isSelected(area.id) }"
              >
                <input 
                  type="checkbox" 
                  :checked="isSelected(area.id)"
                  @change="toggleArea(area.id)"
                  class="form-checkbox"
                >
                <div>
                  <span class="text-sm font-medium">{{ area.name }}</span>
                  <p v-if="area.city" class="text-xs text-neutral-500">{{ area.city }}</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Selected Summary -->
        <div class="card mt-6">
          <div class="card-body">
            <h3 class="font-semibold text-neutral-900 mb-3">Selected Areas ({{ selectedAreas.length }})</h3>
            <div v-if="selectedAreas.length" class="flex flex-wrap gap-2">
              <span v-for="area in selectedAreas" :key="area.id" class="tag tag-primary">
                {{ area.name }}
              </span>
            </div>
            <p v-else class="text-neutral-500 text-sm">No areas selected</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useTechnicianStore } from '@/store/technician'
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import { useServiceAreaStore } from '@/store/serviceArea'
import TechnicianSidebar from '@/components/technician/TechnicianSidebar.vue';

export default {
  name: 'TechnicianServiceAreasView',
  data() {
    return { loading: false }
  }, 
  components: {
    TechnicianSidebar
  },
  computed: {
    allAreas() {
      return useServiceAreaStore().areas
    },
    selectedAreas() {
      return useTechnicianStore().serviceAreas
    }
  },
  methods: {
    async handleLogout() {
      await useTechnicianAuthStore().logout()
      this.$router.push('/technician-login')
    },
    // Check if area is selected
    isSelected(areaId) {
      return this.selectedAreas.some(a => a.id === areaId || a.serviceAreaId === areaId)
    },
    // Toggle area selection
    async toggleArea(areaId) {
      const store = useTechnicianStore()
      if (this.isSelected(areaId)) {
        await store.removeServiceArea(areaId)
      } else {
        await store.addServiceArea(areaId)
      }
    }
  },
  async mounted() {
    this.loading = true
    await useServiceAreaStore().fetchAll()
    await useTechnicianStore().fetchServiceAreas()
    this.loading = false
  }
}
</script>

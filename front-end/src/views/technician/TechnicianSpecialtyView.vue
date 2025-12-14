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
            <h1 class="text-xl font-semibold text-neutral-900">My Specialties</h1>
            <p class="text-sm text-neutral-500">Select the appliance types you specialize in</p>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-4 sm:p-6">
        <div class="card">
          <div class="card-body">
            <!-- Loading -->
            <div v-if="loading" class="loading-container">
              <div class="spinner spinner-lg"></div>
            </div>

            <!-- Category Selection Grid -->
            <div v-else>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <label 
                  v-for="category in categories" 
                  :key="category.id" 
                  class="relative cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    :checked="isCategorySelected(category.id)"
                    @change="toggleSpecialty(category.id)"
                    class="peer sr-only"
                  >
                  <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300 hover:shadow-sm">
                    <img 
                      v-if="category.fileName" 
                      class="w-12 h-12 mx-auto mb-3" 
                      :src="'/images/appliance-categories/' + category.fileName"
                      :alt="category.name"
                    />
                    <span class="text-sm font-medium block">{{ category.name }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Selected Summary -->
        <div class="card mt-6">
          <div class="card-body">
            <h3 class="font-semibold text-neutral-900 mb-3">Selected Specialties ({{ selectedSpecialties.length }})</h3>
            <div v-if="selectedSpecialties.length" class="flex flex-wrap gap-2">
              <span v-for="spec in selectedSpecialties" :key="spec.id" class="tag tag-primary">
                {{ spec.name }}
              </span>
            </div>
            <p v-else class="text-neutral-500 text-sm">No specialties selected yet. Choose categories from above.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useTechnicianStore } from '@/store/technician'
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import { useApplianceStore } from '@/store/appliance'
import TechnicianSidebar from '@/components/technician/TechnicianSidebar.vue';

export default {
  name: 'TechnicianSpecialtyView',
  data() {
    return { 
      loading: false
    }
  },
  components: {
    TechnicianSidebar
  },
  computed: {
    categories() {
      return useApplianceStore().categories
    },
    selectedSpecialties() {
      return useTechnicianStore().specialties
    }
  },
  methods: {
    async handleLogout() {
      await useTechnicianAuthStore().logout()
      this.$router.push('/technician-login')
    },
    // Check if a category is selected as specialty
    isCategorySelected(categoryId) {
      return this.selectedSpecialties.some(s => s.id === categoryId || s.categoryId === categoryId)
    },
    // Toggle specialty (add or remove category)
    async toggleSpecialty(categoryId) {
      const store = useTechnicianStore()
      if (this.isCategorySelected(categoryId)) {
        await store.removeSpecialty(categoryId)
      } else {
        // Add specialty with default 0 years experience
        await store.addSpecialty(categoryId, 0)
      }
    }
  },
  async mounted() {
    this.loading = true
    await useApplianceStore().fetchCategories()
    await useTechnicianStore().fetchSpecialties()
    this.loading = false
  }
}
</script>

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
            <p class="text-sm text-neutral-500">Select the appliance categories you specialize in</p>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-4 sm:p-6">
        <div class="card">
          <div class="card-body">
            <!-- Loading -->
            <div v-if="loading" class="loading-container-sm">
              <div class="spinner spinner-lg"></div>
            </div>

            <!-- Categories Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <label 
                v-for="category in categories" 
                :key="category.id" 
                class="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors"
                :class="{ 'border-primary-500 bg-primary-50': isSelected(category.id) }"
              >
                <input 
                  type="checkbox" 
                  :checked="isSelected(category.id)"
                  @change="toggleSpecialty(category.id)"
                  class="form-checkbox"
                >
                <span class="text-sm font-medium">{{ category.name }}</span>
              </label>
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
                <span v-if="spec.yearsOfExperience" class="ml-1 text-xs opacity-75">({{ spec.yearsOfExperience }} yrs)</span>
              </span>
            </div>
            <p v-else class="text-neutral-500 text-sm">No specialties selected</p>
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
    return { loading: false }
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
    // Check if category is selected as specialty
    isSelected(categoryId) {
      return this.selectedSpecialties.some(s => s.id === categoryId || s.categoryId === categoryId)
    },
    // Toggle specialty (add or remove category)
    async toggleSpecialty(categoryId) {
      const store = useTechnicianStore()
      if (this.isSelected(categoryId)) {
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

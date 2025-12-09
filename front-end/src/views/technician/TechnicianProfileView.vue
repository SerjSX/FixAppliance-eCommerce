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
            <h1 class="text-xl font-semibold text-neutral-900">My Profile</h1>
            <p class="text-sm text-neutral-500">Manage your technician account</p>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-4 sm:p-6">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner spinner-xl"></div>
        </div>

        <template v-else>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="card">
                <div class="card-body text-center py-8">
                  <div class="avatar avatar-2xl bg-primary-100 text-primary-600 mx-auto mb-4">
                    <span class="font-bold">{{ initials }}</span>
                  </div>
                  <h3 class="text-lg font-semibold text-neutral-900">{{ fullName }}</h3>
                  <p class="text-sm text-neutral-500">{{ technician.email }}</p>
                  <span 
                    v-if="technician.verified" 
                    class="tag tag-success tag-sm mt-2"
                  >
                    Verified Technician
                  </span>
                  <span 
                    v-else 
                    class="tag tag-warning tag-sm mt-2"
                  >
                    Pending Verification
                  </span>
                </div>
                
                <!-- Stats -->
                <div class="border-t border-neutral-200 px-6 py-4">
                  <div class="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p class="text-2xl font-bold text-primary-600">{{ technician.totalJobs || 0 }}</p>
                      <p class="text-xs text-neutral-500">Total Jobs</p>
                    </div>
                    <div>
                      <p class="text-2xl font-bold text-warning-500">{{ technician.averageRating?.toFixed(1) || 'N/A' }}</p>
                      <p class="text-xs text-neutral-500">Avg Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form -->
            <div class="lg:col-span-2">
              <div class="card">
                <div class="card-body">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-6">Edit Profile</h3>
                  
                  <!-- Error Message -->
                  <AlertMessage 
                    v-if="error" 
                    type="error" 
                    :message="error"
                    class="mb-4"
                    @dismiss="error = null"
                  />
                  
                  <!-- Success Message -->
                  <AlertMessage 
                    v-if="success" 
                    type="success" 
                    :message="success"
                    class="mb-4"
                    @dismiss="success = null"
                  />
                  
                  <form @submit.prevent="handleSubmit" class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="form-group">
                        <label for="firstName" class="form-label">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          v-model="form.firstName" 
                          class="form-input"
                          required
                        >
                      </div>
                      <div class="form-group">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          v-model="form.lastName" 
                          class="form-input"
                          required
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        v-model="form.email" 
                        class="form-input bg-neutral-50" 
                        disabled
                      >
                      <p class="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div class="form-group">
                      <label for="phone" class="form-label">Phone</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        v-model="form.phone" 
                        class="form-input"
                        required
                      >
                    </div>
                    <div class="flex justify-end gap-3">
                      <button type="button" class="btn btn-outline" @click="resetForm">Cancel</button>
                      <button type="submit" class="btn btn-primary" :disabled="saving">
                        {{ saving ? 'Saving...' : 'Save Changes' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <!-- Specialties Section -->
              <div class="card mt-6" v-if="technician.applianceCategories">
                <div class="card-body">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-4">My Specialties</h3>
                  <div v-if="technician.applianceCategories.length > 0" class="flex flex-wrap gap-2">
                    <span 
                      v-for="specialty in technician.applianceCategories" 
                      :key="specialty.categoryId"
                      class="tag tag-primary"
                    >
                      {{ specialty.nameEN }} ({{ specialty.yearsOfExperience }} yrs)
                    </span>
                  </div>
                  <p v-else class="text-neutral-500 text-sm">No specialties added yet.</p>
                  <router-link to="/technician/specialties" class="btn btn-outline btn-sm mt-4">
                    Manage Specialties
                  </router-link>
                </div>
              </div>
              
              <!-- Service Areas Section -->
              <div class="card mt-6" v-if="technician.serviceAreas">
                <div class="card-body">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-4">Service Areas</h3>
                  <div v-if="technician.serviceAreas.length > 0" class="flex flex-wrap gap-2">
                    <span 
                      v-for="area in technician.serviceAreas" 
                      :key="area.areaId"
                      class="tag tag-secondary"
                    >
                      {{ area.nameEN }}
                    </span>
                  </div>
                  <p v-else class="text-neutral-500 text-sm">No service areas added yet.</p>
                  <router-link to="/technician/service-areas" class="btn btn-outline btn-sm mt-4">
                    Manage Service Areas
                  </router-link>
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
import AlertMessage from '@/components/common/AlertMessage.vue'
import TechnicianSidebar from '@/components/technician/TechnicianSidebar.vue';

export default {
  name: 'TechnicianProfileView',
  components: {
    AlertMessage,
    TechnicianSidebar
  },
  data() {
    return {
      loading: true,
      saving: false,
      error: null,
      success: null,
      form: { 
        firstName: '', 
        lastName: '', 
        email: '',
        phone: '' 
      }
    }
  },
  computed: {
    technician() {
      return useTechnicianAuthStore().currentTechnician || {}
    },
    fullName() {
      if (this.technician.firstName && this.technician.lastName) {
        return `${this.technician.firstName} ${this.technician.lastName}`
      }
      return 'Technician'
    },
    initials() {
      const first = this.technician.firstName?.[0] || ''
      const last = this.technician.lastName?.[0] || ''
      return (first + last).toUpperCase() || 'T'
    }
  },
  methods: {
    async handleLogout() {
      await useTechnicianAuthStore().logout()
      this.$router.push('/technician-login')
    },
    async handleSubmit() {
      this.saving = true
      this.error = null
      this.success = null
      try {
        await useTechnicianAuthStore().updateProfile({
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          phone: this.form.phone
        })
        this.success = 'Profile updated successfully!'
        // Refresh profile data
        await this.loadProfile()
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update profile'
      } finally {
        this.saving = false
      }
    },
    resetForm() {
      this.form = { 
        firstName: this.technician.firstName || '', 
        lastName: this.technician.lastName || '',
        email: this.technician.email || '',
        phone: this.technician.phone || ''
      }
      this.error = null
      this.success = null
    },
    async loadProfile() {
      this.loading = true
      try {
        await useTechnicianAuthStore().fetchProfile()
        this.resetForm()
      } catch (err) {
        this.error = 'Failed to load profile'
      } finally {
        this.loading = false
      }
    }
  },
  async mounted() {
    await this.loadProfile()
  }
}
</script>

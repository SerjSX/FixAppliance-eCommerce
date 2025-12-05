<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 bottom-0 w-64 bg-primary-800 text-white overflow-y-auto" role="navigation" aria-label="Technician navigation">
      <!-- Logo -->
      <div class="p-6 border-b border-primary-700">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <img src="/images/logo/fixappliance-icon.svg" alt="FixAppliance" class="w-6 h-6">
          </div>
          <div>
            <p class="font-bold">FixAppliance</p>
            <p class="text-xs text-primary-300">Technician Portal</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1">
        <router-link to="/technician-dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/technician/pending-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Pending Bookings</span>
        </router-link>

        <router-link to="/technician/active-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>Active Bookings</span>
        </router-link>

        <router-link to="/technician/completed-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Completed</span>
        </router-link>

        <router-link to="/technician/earnings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Earnings</span>
        </router-link>

        <div class="pt-4 pb-2 px-4">
          <span class="text-xs text-primary-400 uppercase tracking-wider">Settings</span>
        </div>

        <router-link to="/technician/profile" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-700 text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Profile</span>
        </router-link>

        <router-link to="/technician/specialties" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Specialty Areas</span>
        </router-link>

        <router-link to="/technician/service-areas" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Service Areas</span>
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-700">
        <button type="button" @click="handleLogout" class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-64 bg-neutral-50 min-h-screen">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-neutral-900">My Profile</h1>
            <p class="text-sm text-neutral-500">Manage your technician account</p>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <template v-else>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="card">
                <div class="card-body text-center py-8">
                  <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-3xl font-bold text-primary-600">{{ initials }}</span>
                  </div>
                  <h3 class="text-lg font-semibold text-neutral-900">{{ fullName }}</h3>
                  <p class="text-sm text-neutral-500">{{ technician.email }}</p>
                  <span 
                    v-if="technician.verified" 
                    class="inline-block mt-2 px-3 py-1 bg-success-100 text-success-700 text-xs rounded-full"
                  >
                    Verified Technician
                  </span>
                  <span 
                    v-else 
                    class="inline-block mt-2 px-3 py-1 bg-warning-100 text-warning-700 text-xs rounded-full"
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
                      class="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
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
                      class="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
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

export default {
  name: 'TechnicianProfileView',
  components: {
    AlertMessage
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

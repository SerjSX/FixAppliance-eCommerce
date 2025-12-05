<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">My Profile</span>
        </nav>
        <h1 class="page-title">My Profile</h1>
        <p class="page-description">Manage your account information</p>
      </div>
    </div>

    <!-- Profile Content -->
    <section class="section-sm">
      <div class="container-wide">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner spinner-lg"></div>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="card">
              <div class="card-body text-center py-8">
                <!-- Avatar -->
                <div class="avatar avatar-2xl bg-primary-100 text-primary-600 mx-auto mb-4">
                  <span class="font-bold">{{ userInitials }}</span>
                </div>
                <h3 class="text-lg font-semibold text-neutral-900">{{ userName }}</h3>
                <p class="text-sm text-neutral-500">{{ user.email }}</p>
                <p class="text-xs text-neutral-400 mt-2">Member since {{ formatDate(user.createdAt) }}</p>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="card mt-4">
              <div class="card-body">
                <h4 class="font-semibold text-neutral-900 mb-4">Booking Statistics</h4>
                <div class="space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-neutral-500">Total Bookings</span>
                    <span class="font-medium">{{ stats.total }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-neutral-500">Completed</span>
                    <span class="font-medium text-success-600">{{ stats.completed }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-neutral-500">In Progress</span>
                    <span class="font-medium text-primary-600">{{ stats.inProgress }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-6">Edit Profile</h3>

                <!-- Error/Success Messages -->
                <AlertMessage 
                  v-if="error" 
                  type="error" 
                  :message="error"
                  class="mb-4"
                  @dismiss="error = null"
                />
                <AlertMessage 
                  v-if="successMessage" 
                  type="success" 
                  :message="successMessage"
                  class="mb-4"
                  @dismiss="successMessage = null"
                />

                <!-- Profile Form -->
                <form @submit.prevent="handleSubmit" class="space-y-5">
                  <div class="form-row">
                    <!-- First Name -->
                    <div class="form-group">
                      <label for="firstName" class="form-label">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        v-model="form.firstName"
                        class="form-input" 
                        placeholder="Enter your first name"
                      >
                    </div>

                    <!-- Last Name -->
                    <div class="form-group">
                      <label for="lastName" class="form-label">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        v-model="form.lastName"
                        class="form-input" 
                        placeholder="Enter your last name"
                      >
                    </div>
                  </div>

                  <!-- Email (readonly) -->
                  <div class="form-group">
                    <label for="email" class="form-label">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="form.email"
                      class="form-input" 
                    >
                    <p class="form-hint">Email can be changed but must be unique</p>
                  </div>

                  <!-- Phone -->
                  <div class="form-group">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      v-model="form.phone"
                      class="form-input" 
                      placeholder="Enter your phone number"
                    >
                  </div>

                  <!-- Address Section -->
                  <div class="form-section">
                    <h4 class="form-section-title">Address</h4>
                    
                    <div class="form-group">
                      <label for="streetAddress" class="form-label">Street Address</label>
                      <input 
                        type="text" 
                        id="streetAddress" 
                        v-model="form.streetAddress"
                        class="form-input" 
                        placeholder="Enter your street address"
                      >
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label for="buildingName" class="form-label">Building Name</label>
                        <input 
                          type="text" 
                          id="buildingName" 
                          v-model="form.buildingName"
                          class="form-input" 
                          placeholder="Building name"
                        >
                      </div>
                      <div class="form-group">
                        <label for="floor" class="form-label">Floor</label>
                        <input 
                          type="text" 
                          id="floor" 
                          v-model="form.floor"
                          class="form-input" 
                          placeholder="Floor"
                        >
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label for="city" class="form-label">City</label>
                        <input 
                          type="text" 
                          id="city" 
                          v-model="form.city"
                          class="form-input" 
                          placeholder="City"
                        >
                      </div>
                      <div class="form-group">
                        <label for="postalCode" class="form-label">Postal Code</label>
                        <input 
                          type="text" 
                          id="postalCode" 
                          v-model="form.postalCode"
                          class="form-input" 
                          placeholder="Postal code"
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Submit -->
                  <div class="flex justify-end gap-3 pt-4">
                    <button type="button" class="btn btn-outline" @click="resetForm">Cancel</button>
                    <button type="submit" class="btn btn-primary" :disabled="saving">
                      {{ saving ? 'Saving...' : 'Save Changes' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Change Password Section -->
            <div class="card mt-6">
              <div class="card-body">
                <h3 class="text-lg font-semibold text-neutral-900 mb-6">Change Password</h3>
                <form @submit.prevent="handlePasswordChange" class="space-y-5">
                  <div class="form-group">
                    <label for="current-password" class="form-label">Current Password</label>
                    <input type="password" id="current-password" v-model="passwordForm.current" class="form-input">
                  </div>
                  <div class="form-group">
                    <label for="new-password" class="form-label">New Password</label>
                    <input type="password" id="new-password" v-model="passwordForm.new" class="form-input">
                  </div>
                  <div class="form-group">
                    <label for="confirm-password" class="form-label">Confirm New Password</label>
                    <input type="password" id="confirm-password" v-model="passwordForm.confirm" class="form-input">
                  </div>
                  <div class="flex justify-end">
                    <button type="submit" class="btn btn-primary">Update Password</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useBookingStore } from '@/store/booking'
import { formatDate } from '@/utils/dateUtils'
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'UserProfileView',
  components: {
    AlertMessage
  },
  data() {
    return {
      loading: false,
      saving: false,
      error: null,
      successMessage: null,
      form: { 
        firstName: '', 
        lastName: '',
        email: '',
        phone: '', 
        streetAddress: '',
        buildingName: '',
        floor: '',
        city: '',
        postalCode: ''
      },
      passwordForm: { current: '', new: '', confirm: '' },
      stats: { total: 0, completed: 0, inProgress: 0 }
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    // Get user from store
    user() {
      return this.authStore.currentUser || {}
    },
    // Get full name
    userName() {
      if (this.user.firstName && this.user.lastName) {
        return `${this.user.firstName} ${this.user.lastName}`
      }
      return this.user.name || 'User'
    },
    // Generate user initials
    userInitials() {
      if (this.user.firstName && this.user.lastName) {
        return `${this.user.firstName[0]}${this.user.lastName[0]}`.toUpperCase()
      }
      return this.userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'U'
    }
  },
  methods: {
    formatDate,
    // Submit profile updates
    async handleSubmit() {
      this.saving = true
      this.error = null
      this.successMessage = null
      try {
        await this.authStore.updateProfile(this.form)
        this.successMessage = 'Profile updated successfully!'
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to update profile'
      } finally {
        this.saving = false
      }
    },
    // Reset form to current values
    resetForm() {
      this.form = { 
        firstName: this.user.firstName || '', 
        lastName: this.user.lastName || '',
        email: this.user.email || '',
        phone: this.user.phone || '', 
        streetAddress: this.user.streetAddress || '',
        buildingName: this.user.buildingName || '',
        floor: this.user.floor || '',
        city: this.user.city || '',
        postalCode: this.user.postalCode || ''
      }
      this.error = null
      this.successMessage = null
    },
    // Handle password change
    async handlePasswordChange() {
      if (this.passwordForm.new !== this.passwordForm.confirm) {
        alert('Passwords do not match')
        return
      }
      // Password change logic would go here
      alert('Password change is not yet implemented')
    },
    // Calculate stats from bookings
    calculateStats() {
      const store = useBookingStore()
      this.stats = {
        total: store.allBookings.length,
        completed: store.completed.length,
        inProgress: store.inProgress.length
      }
    },
    // Load profile data
    async loadProfile() {
      this.loading = true
      try {
        await this.authStore.fetchProfile()
        this.resetForm()
        await useBookingStore().fetchAll()
        this.calculateStats()
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to load profile'
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

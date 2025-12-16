<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Admin Login</span>
        </nav>
        <h1 class="page-title">Admin Portal</h1>
        <p class="page-description">Sign in to the admin dashboard</p>
      </div>
    </div>

    <!-- Login Form Section -->
    <section class="section-sm">
      <div class="container-wide">
        <div class="max-w-md mx-auto">
          <div class="card">
            <div class="card-body py-8 px-6 md:px-8">
              <!-- Logo -->
              <div class="text-center mb-8">
                <img 
                  src="/images/logo/fixappliance-icon.svg" 
                  alt="FixAppliance Admin" 
                  class="h-10 w-auto mx-auto mb-4"
                >
                <h2 class="text-xl font-semibold text-neutral-900">Admin Sign In</h2>
                <p class="text-sm text-neutral-500 mt-2">Secure access to platform administration</p>
              </div>

              <!-- Login Form -->
              <form @submit.prevent="handleLogin" class="space-y-5">
                <!-- Error Alert -->
                <AlertMessage 
                  v-if="error" 
                  type="error" 
                  :message="error"
                  @dismiss="error = null"
                />

                <!-- Email -->
                <div class="form-group">
                  <label for="admin-email" class="form-label">Email Address</label>
                  <div class="form-input-wrapper">
                    <svg class="form-input-icon form-input-icon-left-position w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <input 
                      type="email" 
                      id="admin-email"
                      v-model="formData.email" 
                      class="form-input !pl-10" 
                      placeholder="admin@fixappliance.com"
                      required
                      autocomplete="email"
                    >
                  </div>
                </div>

                <!-- Password -->
                <div class="form-group">
                  <label for="admin-password" class="form-label">Password</label>
                  <div class="form-input-wrapper">
                    <svg class="form-input-icon form-input-icon-left-position w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      id="admin-password"
                      v-model="formData.password" 
                      class="form-input !pl-10 pr-10" 
                      placeholder="Enter your password"
                      required
                      autocomplete="current-password"
                    >
                    <button 
                      type="button"
                      @click="showPassword = !showPassword"
                      class="form-input-icon form-input-icon-right-position"
                      tabindex="-1"
                    >
                      <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  class="btn btn-primary w-full"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner spinner-sm mr-2"></span>
                  {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
              </form>

              <!-- Security Notice -->
              <div class="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <div class="flex gap-3">
                  <svg class="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <div class="text-sm">
                    <p class="font-medium text-warning-900">Secure Admin Access</p>
                    <p class="text-warning-700 mt-1">This portal is for authorized administrators only. All access attempts are logged and monitored.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useAdminAuthStore } from '@/store/adminAuth'
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'AdminLoginView',
  components: {
    AlertMessage
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      showPassword: false,
      loading: false,
      error: null
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null

      try {
        const adminAuthStore = useAdminAuthStore()
        await adminAuthStore.login(this.formData)
        
        // Redirect to admin dashboard on success
        this.$router.push('/admin/dashboard')
      } catch (err) {
        this.error = err.response?.data?.message || 'Invalid email or password'
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

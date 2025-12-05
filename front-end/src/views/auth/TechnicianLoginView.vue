<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header bg-primary-700 text-white">
      <div class="container-wide">
        <nav class="breadcrumb mb-4 text-primary-200">
          <router-link to="/" class="breadcrumb-link text-primary-200 hover:text-white">Home</router-link>
          <span class="breadcrumb-separator text-primary-400">/</span>
          <span class="breadcrumb-current text-white">Technician Login</span>
        </nav>
        <h1 class="page-title text-white">Technician Portal</h1>
        <p class="page-description text-primary-100">Sign in to manage your bookings and profile</p>
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
                <div class="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-neutral-900">Technician Sign In</h2>
                <p class="text-sm text-neutral-500 mt-1">Access your technician dashboard</p>
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
                  <label for="tech-email" class="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="tech-email" 
                    v-model="form.email"
                    class="form-input" 
                    placeholder="technician@example.com"
                    autocomplete="email"
                    required
                  >
                </div>

                <!-- Password -->
                <div class="form-group">
                  <div class="flex items-center justify-between mb-1.5">
                    <label for="tech-password" class="form-label mb-0">Password</label>
                    <router-link to="/coming-soon" class="text-sm text-primary-600 hover:underline">Forgot password?</router-link>
                  </div>
                  <div class="form-input-wrapper">
                    <input 
                      type="password" 
                      id="tech-password" 
                      v-model="form.password"
                      class="form-input" 
                      placeholder="Enter your password"
                      autocomplete="current-password"
                      required
                    >
                    <button type="button" class="form-input-icon form-input-icon-right-position text-neutral-400 hover:text-neutral-600" aria-label="Toggle password visibility">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Remember Me -->
                <div class="form-check">
                  <input type="checkbox" id="tech-remember" class="form-checkbox">
                  <label for="tech-remember" class="form-check-label">Keep me signed in</label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-full" :disabled="loading">
                  {{ loading ? 'Signing in...' : 'Sign In to Dashboard' }}
                </button>
              </form>

              <!-- Register Link -->
              <p class="text-center text-sm text-neutral-600 mt-8">
                Not a registered technician? 
                <router-link to="/technician-register" class="text-primary-600 font-medium hover:underline">Apply now</router-link>
              </p>

              <!-- Customer Login Link -->
              <div class="mt-6 pt-6 border-t border-neutral-200 text-center">
                <p class="text-sm text-neutral-500 mb-2">Looking for customer login?</p>
                <router-link to="/login" class="text-sm text-primary-600 font-medium hover:underline">Sign in as Customer →</router-link>
              </div>
            </div>
          </div>

          <!-- Info Card -->
          <div class="card mt-6 bg-primary-50 border-primary-100">
            <div class="card-body">
              <div class="flex gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h4 class="font-medium text-primary-900 mb-1">Account Verification Required</h4>
                  <p class="text-sm text-primary-700">
                    After registration, your account must be verified by our admin team before you can start accepting bookings.
                  </p>
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
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'TechnicianLoginView',
  components: {
    AlertMessage
  },
  data() {
    return {
      form: { email: '', password: '' },
      loading: false,
      error: null
    }
  },
  methods: {
    // Handle login
    async handleLogin() {
      this.loading = true
      this.error = null
      try {
        await useTechnicianAuthStore().login(this.form)
        this.$router.push('/technician-dashboard')
      } catch (err) {
        this.error = err.message || 'Login failed'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

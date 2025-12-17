<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Login</span>
        </nav>
        <h1 class="page-title">Welcome Back</h1>
        <p class="page-description">Sign in to your account</p>
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
                  alt="FixAppliance" 
                  class="h-10 w-auto mx-auto mb-4"
                >
                <h2 class="text-xl font-semibold text-neutral-900">Sign in to your account</h2>
              </div>

              <!-- Login Form -->
              <form @submit.prevent="handleLogin" class="space-y-5" ref="formTop">
                <!-- Error Alert -->
                <AlertMessage 
                  v-if="error" 
                  type="error" 
                  :message="error"
                  @dismiss="error = null"
                />

                <!-- Email -->
                <div class="form-group">
                  <label for="login-email" class="form-label">Email Address</label>
                  <div class="form-input-wrapper">
                    <svg class="form-input-icon form-input-icon-left-position w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <input 
                      type="email" 
                      id="login-email" 
                      v-model="form.email"
                      class="form-input form-input-icon-left" 
                      placeholder="name@example.com"
                      autocomplete="email"
                      required
                    >
                  </div>
                </div>

                <!-- Password -->
                <div class="form-group">
                  <div class="form-input-wrapper">
                    <svg class="form-input-icon form-input-icon-left-position w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <input 
                      type="password" 
                      id="login-password" 
                      v-model="form.password"
                      class="form-input form-input-icon-left" 
                      placeholder="Enter your password"
                      autocomplete="current-password"
                      required
                    >
                  </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-full" :disabled="loading">
                  {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
              </form>

              <!-- Register Link -->
              <p class="text-center text-sm text-neutral-600 mt-8">
                Don't have an account? 
                <router-link to="/register" class="text-primary-600 font-medium hover:underline">Create one now</router-link>
              </p>

              <!-- Technician Login Link -->
              <div class="mt-6 pt-6 border-t border-neutral-200 text-center">
                <p class="text-sm text-neutral-500 mb-2">Are you a technician?</p>
                <router-link to="/technician-login" class="text-sm text-primary-600 font-medium hover:underline">Sign in to Technician Portal →</router-link>
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
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'LoginView',
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
    // Handle login form submission
    async handleLogin() {
      this.loading = true
      this.error = null
      try {
        await useAuthStore().login(this.form)
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.message || 'Login failed'
        this.$nextTick(() => this.$refs.formTop?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

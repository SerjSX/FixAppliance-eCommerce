<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header bg-primary-700 text-white">
      <div class="container-wide">
        <nav class="breadcrumb mb-4 text-primary-200">
          <router-link to="/" class="breadcrumb-link text-primary-200 hover:text-white">Home</router-link>
          <span class="breadcrumb-separator text-primary-400">/</span>
          <span class="breadcrumb-current text-white">Become a Technician</span>
        </nav>
        <h1 class="page-title text-white">Join Our Technician Network</h1>
        <p class="page-description text-primary-100">Apply to become a verified technician on FixAppliance</p>
      </div>
    </div>

    <!-- Benefits Section -->
    <section class="section-sm bg-white">
      <div class="container-wide">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="h3 mb-4">Why Join FixAppliance?</h2>
          <p class="text-neutral-600">
            Join our growing network of technicians and connect with customers who need your expertise.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <!-- Benefit 1 -->
          <div class="card p-6 text-center">
            <div class="icon-box-round icon-box-success mx-auto mb-4">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-900 mb-2">Earn More</h3>
            <p class="text-sm text-neutral-600">
              Keep 85% of each booking. Get paid for your expertise.
            </p>
          </div>

          <!-- Benefit 2 -->
          <div class="card p-6 text-center">
            <div class="icon-box-round icon-box-primary mx-auto mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-900 mb-2">Flexible Schedule</h3>
            <p class="text-sm text-neutral-600">
              Accept bookings that fit your schedule and service areas.
            </p>
          </div>

          <!-- Benefit 3 -->
          <div class="card p-6 text-center">
            <div class="icon-box-round icon-box-secondary mx-auto mb-4">
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-900 mb-2">Grow Your Business</h3>
            <p class="text-sm text-neutral-600">
              Build your reputation through ratings and get more customers.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Registration Form Section -->
    <section class="section-sm bg-neutral-50">
      <div class="container-wide">
        <div class="max-w-2xl mx-auto">
          <div class="card">
            <div class="card-header">
              <h3 class="font-semibold text-neutral-900">Technician Registration</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleRegister" class="space-y-6">
                <!-- Error Alert -->
                <AlertMessage 
                  v-if="error" 
                  type="error" 
                  :message="error"
                  @dismiss="error = null"
                />

                <!-- Success Alert -->
                <AlertMessage 
                  v-if="success" 
                  type="success" 
                  :message="success"
                  :dismissible="false"
                />

                <!-- Personal Information Section -->
                <div class="form-section">
                  <h3 class="form-section-title">Personal Information</h3>
                  
                  <div class="form-row">
                    <!-- First Name -->
                    <div class="form-group">
                      <label for="tech-first-name" class="form-label form-label-required">First Name</label>
                      <input 
                        type="text" 
                        id="tech-first-name" 
                        v-model="form.firstName"
                        class="form-input" 
                        placeholder="Ahmad"
                        autocomplete="given-name"
                        required
                      >
                    </div>

                    <!-- Last Name -->
                    <div class="form-group">
                      <label for="tech-last-name" class="form-label form-label-required">Last Name</label>
                      <input 
                        type="text" 
                        id="tech-last-name" 
                        v-model="form.lastName"
                        class="form-input" 
                        placeholder="Hassan"
                        autocomplete="family-name"
                        required
                      >
                    </div>
                  </div>

                  <div class="form-row">
                    <!-- Email -->
                    <div class="form-group">
                      <label for="tech-email" class="form-label form-label-required">Email Address</label>
                      <input 
                        type="email" 
                        id="tech-email" 
                        v-model="form.email"
                        class="form-input" 
                        placeholder="ahmad@example.com"
                        autocomplete="email"
                        required
                      >
                    </div>

                    <!-- Phone -->
                    <div class="form-group">
                      <label for="tech-phone" class="form-label form-label-required">Phone Number</label>
                      <div class="input-group">
                        <span class="input-group-text">+961</span>
                        <input 
                          type="tel" 
                          id="tech-phone" 
                          v-model="form.phone"
                          class="form-input" 
                          placeholder="71 234 567"
                          autocomplete="tel"
                          required
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Password Section -->
                <div class="form-section">
                  <h3 class="form-section-title">Create Password</h3>
                  
                  <div class="form-row">
                    <!-- Password -->
                    <div class="form-group">
                      <label for="tech-password" class="form-label form-label-required">Password</label>
                      <div class="form-input-wrapper">
                        <input 
                          type="password" 
                          id="tech-password" 
                          v-model="form.password"
                          class="form-input" 
                          placeholder="Create a strong password"
                          autocomplete="new-password"
                          required
                        >
                        <button type="button" class="form-input-icon form-input-icon-right-position text-neutral-400 hover:text-neutral-600" aria-label="Toggle password visibility">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                      </div>
                      <p class="form-hint">Minimum 8 characters with uppercase, lowercase, number, and special character</p>
                    </div>

                    <!-- Confirm Password -->
                    <div class="form-group">
                      <label for="tech-confirm-password" class="form-label form-label-required">Confirm Password</label>
                      <input 
                        type="password" 
                        id="tech-confirm-password" 
                        v-model="form.confirmPassword"
                        class="form-input" 
                        placeholder="Confirm your password"
                        autocomplete="new-password"
                        required
                      >
                    </div>
                  </div>
                </div>

                <!-- Additional Information Notice -->
                <div class="alert alert-info">
                  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium">Next Steps After Registration</h4>
                    <p class="text-sm opacity-90">
                      After registering, you'll be able to set your specialty areas, service locations, 
                      and experience details. Your account will be reviewed and verified by our team before activation.
                    </p>
                  </div>
                </div>

                <!-- Background Check -->
                <div class="form-check">
                  <input type="checkbox" id="background-check" v-model="form.backgroundCheck" class="form-checkbox" required>
                  <label for="background-check" class="form-check-label">
                    I consent to a background check as part of the verification process
                  </label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-full btn-lg" :disabled="loading || !isFormValid">
                  <svg v-if="loading" class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loading ? 'Submitting Application...' : 'Submit Application' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Already registered -->
          <p class="text-center text-sm text-neutral-600 mt-6">
            Already have a technician account? 
            <router-link to="/technician-login" class="text-primary-600 font-medium hover:underline">Sign in</router-link>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'TechnicianRegisterView',
  components: {
    AlertMessage
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        backgroundCheck: false
      },
      loading: false,
      error: null,
      success: null
    }
  },
  computed: {
    isFormValid() {
      return this.form.firstName && 
             this.form.lastName && 
             this.form.email && 
             this.form.phone && 
             this.form.password && 
             this.form.confirmPassword &&
             this.form.backgroundCheck
    }
  },
  methods: {
    async handleRegister() {
      // Validate passwords match
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }
      
      this.loading = true
      this.error = null
      this.success = null
      
      try {
        const registerData = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password
        }
        
        await useTechnicianAuthStore().register(registerData)
        this.success = 'Registration successful! Redirecting to login...'
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          this.$router.push('/technician-login')
        }, 2000)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Registration failed'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

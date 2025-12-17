<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Register</span>
        </nav>
        <h1 class="page-title">Create Your Account</h1>
        <p class="page-description">Join thousands of homeowners using FixAppliance</p>
      </div>
    </div>

    <!-- Register Form Section -->
    <section class="section-sm">
      <div class="container-wide">
        <div class="max-w-2xl mx-auto">
          <div class="card">
            <div class="card-body py-8 px-6 md:px-8">
              <!-- Register Form -->
              <form @submit.prevent="handleRegister" class="space-y-6" ref="formTop">
                <!-- Error Alert -->
                <AlertMessage 
                  v-if="error" 
                  type="error" 
                  :message="error"
                  @dismiss="error = null"
                />

                <!-- Personal Information Section -->
                <div class="form-section">
                  <h3 class="form-section-title">Personal Information</h3>
                  
                  <div class="form-row">
                    <!-- First Name -->
                    <div class="form-group">
                      <label for="first-name" class="form-label form-label-required">First Name</label>
                      <input 
                        type="text" 
                        id="first-name" 
                        v-model="form.firstName"
                        class="form-input" 
                        placeholder="John"
                        autocomplete="given-name"
                        required
                      >
                    </div>

                    <!-- Last Name -->
                    <div class="form-group">
                      <label for="last-name" class="form-label form-label-required">Last Name</label>
                      <input 
                        type="text" 
                        id="last-name" 
                        v-model="form.lastName"
                        class="form-input" 
                        placeholder="Doe"
                        autocomplete="family-name"
                        required
                      >
                    </div>
                  </div>

                  <div class="form-row">
                    <!-- Email -->
                    <div class="form-group">
                      <label for="register-email" class="form-label form-label-required">Email Address</label>
                      <input 
                        type="email" 
                        id="register-email" 
                        v-model="form.email"
                        class="form-input" 
                        placeholder="name@example.com"
                        autocomplete="email"
                        required
                      >
                    </div>

                    <!-- Phone -->
                    <div class="form-group">
                      <label for="phone" class="form-label form-label-required">Phone Number</label>
                      <div class="input-group">
                        <span class="input-group-text">+961</span>
                        <input 
                          type="tel" 
                          id="phone" 
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

                <!-- Address Section -->
                <div class="form-section">
                  <h3 class="form-section-title">Address</h3>
                  <p class="form-section-description">Your address helps technicians locate you for service visits</p>
                  
                  <!-- Street Address -->
                  <div class="form-group">
                    <label for="street-address" class="form-label form-label-required">Street Address</label>
                    <input 
                      type="text" 
                      id="street-address" 
                      v-model="form.streetAddress"
                      class="form-input" 
                      placeholder="123 Main Street"
                      autocomplete="street-address"
                      required
                    >
                  </div>

                  <div class="form-row">
                    <!-- Building Name -->
                    <div class="form-group">
                      <label for="building-name" class="form-label form-label-required">Building Name</label>
                      <input 
                        type="text" 
                        id="building-name" 
                        v-model="form.buildingName"
                        class="form-input" 
                        placeholder="Sunset Tower"
                        required
                      >
                    </div>

                    <!-- Floor -->
                    <div class="form-group">
                      <label for="floor" class="form-label form-label-required">Floor</label>
                      <input 
                        type="text" 
                        id="floor" 
                        v-model="form.floor"
                        class="form-input" 
                        placeholder="3rd Floor"
                        required
                      >
                    </div>
                  </div>

                  <div class="form-row">
                    <!-- City -->
                    <div class="form-group">
                      <label for="city" class="form-label form-label-required">City</label>
                      <select id="city" v-model="form.city" class="form-select" required>
                        <option value="">Select city...</option>
                        <option value="beirut">Beirut</option>
                        <option value="tripoli">Tripoli</option>
                        <option value="sidon">Sidon</option>
                        <option value="byblos">Byblos</option>
                        <option value="jounieh">Jounieh</option>
                        <option value="zahle">Zahle</option>
                        <option value="batroun">Batroun</option>
                        <option value="aley">Aley</option>
                        <option value="baabda">Baabda</option>
                        <option value="metn">Metn</option>
                      </select>
                    </div>

                    <!-- Postal Code -->
                    <div class="form-group">
                      <label for="postal-code" class="form-label form-label-required">Postal Code</label>
                      <input 
                        type="text" 
                        id="postal-code" 
                        v-model="form.postalCode"
                        class="form-input" 
                        placeholder="1234"
                        autocomplete="postal-code"
                        required
                      >
                    </div>
                  </div>
                </div>

                <!-- Password Section -->
                <div class="form-section">
                  <h3 class="form-section-title">Create Password</h3>
                  
                  <div class="form-row">
                    <!-- Password -->
                    <div class="form-group">
                      <label for="register-password" class="form-label form-label-required">Password</label>
                      <div class="form-input-wrapper">
                        <input 
                          type="password" 
                          id="register-password" 
                          v-model="form.password"
                          class="form-input" 
                          placeholder="Create a strong password"
                          autocomplete="new-password"
                          required
                        >
                      </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="form-group">
                      <label for="confirm-password" class="form-label form-label-required">Confirm Password</label>
                      <input 
                        type="password" 
                        id="confirm-password" 
                        v-model="form.confirmPassword"
                        class="form-input" 
                        placeholder="Confirm your password"
                        autocomplete="new-password"
                        required
                      >
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-full btn-lg" :disabled="loading">
                  {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </form>

              <!-- Login Link -->
              <p class="text-center text-sm text-neutral-600 mt-6">
                Already have an account? 
                <router-link to="/login" class="text-primary-600 font-medium hover:underline">Sign in</router-link>
              </p>

              <!-- Technician Register Link -->
              <div class="mt-6 pt-6 border-t border-neutral-200 text-center">
                <p class="text-sm text-neutral-500 mb-2">Are you a technician looking to join our platform?</p>
                <router-link to="/technician-register" class="text-sm text-primary-600 font-medium hover:underline">Register as a Technician →</router-link>
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
  name: 'RegisterView',
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
        streetAddress: '',
        buildingName: '',
        floor: '',
        city: '',
        postalCode: '',
        password: '',
        confirmPassword: '',
        newsletter: true
      },
      loading: false,
      error: null
    }
  },
  methods: {
    // Handle registration form
    async handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match'
        this.$nextTick(() => this.$refs.formTop?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
      this.loading = true
      this.error = null
      try {
        // Send data matching backend expectations
        const userData = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password,
          streetAddress: this.form.streetAddress,
          buildingName: this.form.buildingName,
          floor: this.form.floor,
          city: this.form.city,
          postalCode: this.form.postalCode
        }
        await useAuthStore().register(userData)
        this.$router.push('/login')
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Registration failed'
        this.$nextTick(() => this.$refs.formTop?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

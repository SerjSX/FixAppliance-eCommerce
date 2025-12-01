<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <a href="/" class="breadcrumb-link">Home</a>
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
              <form class="space-y-6">
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
                        class="form-input" 
                        placeholder="John"
                        autocomplete="given-name"
                      >
                    </div>

                    <!-- Last Name -->
                    <div class="form-group">
                      <label for="last-name" class="form-label form-label-required">Last Name</label>
                      <input 
                        type="text" 
                        id="last-name" 
                        class="form-input" 
                        placeholder="Doe"
                        autocomplete="family-name"
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
                        class="form-input" 
                        placeholder="name@example.com"
                        autocomplete="email"
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
                          class="form-input" 
                          placeholder="71 234 567"
                          autocomplete="tel"
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
                      class="form-input" 
                      placeholder="123 Main Street"
                      autocomplete="street-address"
                    >
                  </div>

                  <div class="form-row">
                    <!-- Building Name -->
                    <div class="form-group">
                      <label for="building-name" class="form-label form-label-required">Building Name</label>
                      <input 
                        type="text" 
                        id="building-name" 
                        class="form-input" 
                        placeholder="Sunset Tower"
                      >
                    </div>

                    <!-- Floor -->
                    <div class="form-group">
                      <label for="floor" class="form-label form-label-required">Floor</label>
                      <input 
                        type="text" 
                        id="floor" 
                        class="form-input" 
                        placeholder="3rd Floor"
                      >
                    </div>
                  </div>

                  <div class="form-row">
                    <!-- City -->
                    <div class="form-group">
                      <label for="city" class="form-label form-label-required">City</label>
                      <select id="city" class="form-select">
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
                        class="form-input" 
                        placeholder="1234"
                        autocomplete="postal-code"
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
                          class="form-input" 
                          placeholder="Create a strong password"
                          autocomplete="new-password"
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
                      <label for="confirm-password" class="form-label form-label-required">Confirm Password</label>
                      <input 
                        type="password" 
                        id="confirm-password" 
                        class="form-input" 
                        placeholder="Confirm your password"
                        autocomplete="new-password"
                      >
                    </div>
                  </div>

                  <!-- Password Strength Indicator -->
                  <div class="mt-2">
                    <div class="flex gap-1">
                      <div class="h-1 flex-1 rounded bg-neutral-200"></div>
                      <div class="h-1 flex-1 rounded bg-neutral-200"></div>
                      <div class="h-1 flex-1 rounded bg-neutral-200"></div>
                      <div class="h-1 flex-1 rounded bg-neutral-200"></div>
                    </div>
                    <p class="text-xs text-neutral-500 mt-1">Enter a password to see its strength</p>
                  </div>
                </div>

                <!-- Terms Agreement -->
                <div class="form-check">
                  <input type="checkbox" id="terms-agree" class="form-checkbox">
                  <label for="terms-agree" class="form-check-label">
                    I agree to the <a href="/terms" class="text-primary-600 hover:underline">Terms of Service</a> 
                    and <a href="/privacy" class="text-primary-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <!-- Newsletter Opt-in -->
                <div class="form-check">
                  <input type="checkbox" id="newsletter" class="form-checkbox" checked>
                  <label for="newsletter" class="form-check-label">
                    Send me helpful tips and maintenance reminders via email
                  </label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-full btn-lg">
                  Create Account
                </button>
              </form>

              <!-- Login Link -->
              <p class="text-center text-sm text-neutral-600 mt-6">
                Already have an account? 
                <a href="/login" class="text-primary-600 font-medium hover:underline">Sign in</a>
              </p>

              <!-- Technician Register Link -->
              <div class="mt-6 pt-6 border-t border-neutral-200 text-center">
                <p class="text-sm text-neutral-500 mb-2">Are you a technician looking to join our platform?</p>
                <a href="/technician-register" class="text-sm text-primary-600 font-medium hover:underline">Register as a Technician →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RegisterView'
}
</script>

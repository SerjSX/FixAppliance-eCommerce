<template>
  <!-- Register Form Component -->
  <div class="w-full max-w-2xl mx-auto">
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
        <h3 class="form-section-title">Password</h3>
        
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
            <div class="h-1 flex-1 rounded bg-error-400"></div>
            <div class="h-1 flex-1 rounded bg-neutral-200"></div>
            <div class="h-1 flex-1 rounded bg-neutral-200"></div>
            <div class="h-1 flex-1 rounded bg-neutral-200"></div>
          </div>
          <p class="text-xs text-neutral-500 mt-1">Password strength: Weak</p>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary w-full btn-lg">
        Create Account
      </button>

      <!-- Login Link -->
      <p class="text-center text-sm text-neutral-600">
        Already have an account? 
        <router-link to="/login" class="text-primary-600 font-medium hover:underline">Sign in</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm'
}
</script>

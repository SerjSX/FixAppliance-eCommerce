<template>
  <div class="main-content min-h-screen flex items-center justify-center">
    <div class="text-center px-4">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <svg class="w-48 h-48 mx-auto text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-bold text-primary-600 mb-4">404</h1>

      <!-- Error Message -->
      <h2 class="text-2xl font-semibold text-neutral-900 mb-4">Page Not Found</h2>
      <p class="text-neutral-600 max-w-md mx-auto mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/" class="btn btn-primary btn-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
            </path>
          </svg>
          Go Home
        </router-link>
        <router-link to="/contact" class="btn btn-outline btn-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
            </path>
          </svg>
          Contact Support
        </router-link>
      </div>

      <!-- Helpful Links -->
      <div class="mt-12 pt-8 border-t border-neutral-200">
        <p class="text-sm text-neutral-500 mb-4">Looking for something specific?</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <router-link to="/book-technician" class="text-sm text-primary-600 hover:underline">Book a
            Technician</router-link>
          <router-link to="/coming-soon" class="text-sm text-primary-600 hover:underline">DIY Guides</router-link>
          <router-link to="/my-bookings" class="text-sm text-primary-600 hover:underline">My Bookings</router-link>
          <router-link to="/about" class="text-sm text-primary-600 hover:underline">About Us</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

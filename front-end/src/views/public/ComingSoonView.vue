<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      <!-- Icon -->
      <div class="w-24 h-24 mx-auto mb-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
        Coming Soon
      </h1>

      <!-- Description -->
      <p class="text-lg text-neutral-600 mb-8">
        We're working hard to bring you this feature. Stay tuned for updates!
      </p>

      <!-- Feature hint based on page -->
      <div class="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h2 class="text-xl font-semibold text-neutral-900 mb-3">What to expect</h2>
        <ul class="text-left space-y-3 text-neutral-600">
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Step-by-step troubleshooting guides</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Video tutorials in Arabic and English</span>
          </li>
          <li class="flex items-start gap-3">
            <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>DIY repair tips from expert technicians</span>
          </li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/" class="btn btn-primary btn-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </router-link>
        <router-link to="/book-technician" class="btn btn-outline btn-lg">
          Book a Technician
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoonView'
}
</script>

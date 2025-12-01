<template>
  <!-- Alert Component - Multiple Variants -->
  
  <!-- Info Alert -->
  <div class="alert alert-info" role="alert">
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div class="flex-1">
      <h4 class="font-medium">Information</h4>
      <p class="text-sm opacity-90">This is an informational message.</p>
    </div>
    <button type="button" class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <!-- Success Alert -->
  <!--
  <div class="alert alert-success" role="alert">
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div class="flex-1">
      <h4 class="font-medium">Success</h4>
      <p class="text-sm opacity-90">Your booking has been confirmed successfully.</p>
    </div>
    <button type="button" class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  -->

  <!-- Warning Alert -->
  <!--
  <div class="alert alert-warning" role="alert">
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
    <div class="flex-1">
      <h4 class="font-medium">Warning</h4>
      <p class="text-sm opacity-90">Please complete your profile to book technicians.</p>
    </div>
    <button type="button" class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  -->

  <!-- Error Alert -->
  <!--
  <div class="alert alert-error" role="alert">
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div class="flex-1">
      <h4 class="font-medium">Error</h4>
      <p class="text-sm opacity-90">Something went wrong. Please try again.</p>
    </div>
    <button type="button" class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  -->
</template>

<script>
export default {
  name: 'AlertMessage'
}
</script>

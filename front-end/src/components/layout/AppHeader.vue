<template>
  <header class="header">
    <div class="header-inner">
      <!-- Logo -->
      <a href="/" class="header-logo">
        <img 
          src="/images/logo/fixappliance-logo.svg" 
          alt="FixAppliance Logo" 
          class="h-8 w-auto"
        >
        <span class="hidden sm:inline">FixAppliance</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="header-nav">
        <a href="/" class="header-nav-link active">Home</a>
        <a href="/services" class="header-nav-link">Services</a>
        <a href="/book-technician" class="header-nav-link">Book a Technician</a>
        <a href="/about" class="header-nav-link">About Us</a>
        <a href="/contact" class="header-nav-link">Contact</a>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Language Toggle -->
        <button 
          type="button" 
          class="btn-ghost btn-icon-sm hidden md:flex items-center gap-1 text-sm"
          aria-label="Switch language"
        >
          <span>EN</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Login/Register buttons (shown when not logged in) -->
        <div class="hidden md:flex items-center gap-2">
          <a href="/login" class="btn btn-ghost btn-sm">Login</a>
          <a href="/register" class="btn btn-primary btn-sm">Get Started</a>
        </div>

        <!-- User Menu (shown when logged in) - TODO: Implement with Vue reactivity based on auth state -->

        <!-- Mobile Menu Toggle -->
        <button 
          type="button" 
          class="btn-ghost btn-icon md:hidden"
          aria-label="Toggle mobile menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu-overlay"></div>
    <div class="mobile-menu">
      <div class="flex items-center justify-between p-4 border-b border-neutral-100">
        <span class="text-lg font-bold text-primary-600">FixAppliance</span>
        <button type="button" class="btn-ghost btn-icon-sm" aria-label="Close menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav class="p-4 space-y-1">
        <a href="/" class="block px-4 py-3 text-base font-medium text-neutral-900 rounded-lg hover:bg-neutral-50">Home</a>
        <a href="/services" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50">Services</a>
        <a href="/book-technician" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50">Book a Technician</a>
        <a href="/about" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50">About Us</a>
        <a href="/contact" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50">Contact</a>
      </nav>
      <div class="p-4 border-t border-neutral-100 space-y-3">
        <a href="/login" class="btn btn-outline w-full">Login</a>
        <a href="/register" class="btn btn-primary w-full">Get Started</a>
      </div>
      <div class="p-4 border-t border-neutral-100">
        <button type="button" class="flex items-center gap-2 text-sm text-neutral-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          <span>English</span>
          <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

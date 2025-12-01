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
        <a href="/articles" class="header-nav-link">DIY Articles</a>
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

        <!-- User Menu (shown when logged in) -->
        <!-- 
        <div class="relative">
          <button type="button" class="flex items-center gap-2">
            <span class="avatar avatar-sm">JD</span>
            <span class="hidden md:inline text-sm font-medium">John Doe</span>
            <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="/dashboard" class="dropdown-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Dashboard
            </a>
            <a href="/my-bookings" class="dropdown-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              My Bookings
            </a>
            <a href="/profile" class="dropdown-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Profile
            </a>
            <div class="dropdown-divider"></div>
            <button type="button" class="dropdown-item text-error-600 hover:bg-error-50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
        -->

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
        <a href="/articles" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50">DIY Articles</a>
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

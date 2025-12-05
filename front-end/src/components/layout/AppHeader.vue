<template>
  <header class="header">
    <div class="header-inner">
      <!-- Logo -->
      <router-link to="/" class="header-logo">
        <img 
          src="/images/logo/fixappliance-icon.svg" 
          alt="FixAppliance Logo" 
          class="h-8 w-auto"
        >
        <span class="hidden sm:inline">FixAppliance</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="header-nav">
        <router-link to="/" class="header-nav-link" exact-active-class="active">Home</router-link>
        <router-link to="/book-technician" class="header-nav-link">Book a Technician</router-link>
        <router-link to="/about" class="header-nav-link">About Us</router-link>
        <router-link to="/contact" class="header-nav-link">Contact</router-link>
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

        <!-- When User is Logged In -->
        <div v-if="isUserAuthenticated" class="hidden md:flex items-center gap-2">
          <router-link to="/my-bookings" class="btn btn-ghost btn-sm">Dashboard</router-link>
          <button @click="handleUserLogout" class="btn btn-primary btn-sm">Logout</button>
        </div>

        <!-- When Technician is Logged In -->
        <div v-else-if="isTechnicianAuthenticated" class="hidden md:flex items-center gap-2">
          <router-link to="/technician-dashboard" class="btn btn-ghost btn-sm">Dashboard</router-link>
          <button @click="handleTechnicianLogout" class="btn btn-primary btn-sm">Logout</button>
        </div>

        <!-- Login/Register buttons (shown when not logged in) -->
        <div v-else class="hidden md:flex items-center gap-2">
          <router-link to="/login" class="btn btn-ghost btn-sm">Login</router-link>
          <router-link to="/register" class="btn btn-primary btn-sm">Get Started</router-link>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          type="button" 
          class="btn-ghost btn-icon md:hidden"
          aria-label="Toggle mobile menu"
          @click="toggleMobileMenu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu-overlay" :class="{ active: mobileMenuOpen }" @click="closeMobileMenu"></div>
    <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
      <div class="flex items-center justify-between p-4 border-b border-neutral-100">
        <span class="text-lg font-bold text-primary-600">FixAppliance</span>
        <button type="button" class="btn-ghost btn-icon-sm" aria-label="Close menu" @click="closeMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav class="p-4 space-y-1">
        <router-link to="/" class="block px-4 py-3 text-base font-medium text-neutral-900 rounded-lg hover:bg-neutral-50" @click="closeMobileMenu">Home</router-link>
        <router-link to="/coming-soon" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50" @click="closeMobileMenu">Services</router-link>
        <router-link to="/book-technician" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50" @click="closeMobileMenu">Book a Technician</router-link>
        <router-link to="/about" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50" @click="closeMobileMenu">About Us</router-link>
        <router-link to="/contact" class="block px-4 py-3 text-base font-medium text-neutral-600 rounded-lg hover:bg-neutral-50" @click="closeMobileMenu">Contact</router-link>
      </nav>
      <div class="p-4 border-t border-neutral-100 space-y-3">
        <!-- When User is Logged In (Mobile) -->
        <template v-if="isUserAuthenticated">
          <router-link to="/my-bookings" class="btn btn-outline w-full" @click="closeMobileMenu">Dashboard</router-link>
          <button @click="handleUserLogout" class="btn btn-primary w-full">Logout</button>
        </template>

        <!-- When Technician is Logged In (Mobile) -->
        <template v-else-if="isTechnicianAuthenticated">
          <router-link to="/technician-dashboard" class="btn btn-outline w-full" @click="closeMobileMenu">Dashboard</router-link>
          <button @click="handleTechnicianLogout" class="btn btn-primary w-full">Logout</button>
        </template>

        <!-- Not Logged In (Mobile) -->
        <template v-else>
          <router-link to="/login" class="btn btn-outline w-full" @click="closeMobileMenu">Login</router-link>
          <router-link to="/register" class="btn btn-primary w-full" @click="closeMobileMenu">Get Started</router-link>
        </template>
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
import { useAuthStore } from '@/store/auth'
import { useTechnicianAuthStore } from '@/store/technicianAuth'

export default {
  name: 'AppHeader',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    technicianAuthStore() {
      return useTechnicianAuthStore()
    },
    isUserAuthenticated() {
      return this.authStore.isAuthenticated
    },
    isTechnicianAuthenticated() {
      return this.technicianAuthStore.isAuthenticated
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    async handleUserLogout() {
      try {
        await this.authStore.logout()
        this.closeMobileMenu()
        this.$router.push('/')
      } catch (err) {
        console.error('Logout failed:', err)
      }
    },
    async handleTechnicianLogout() {
      try {
        await this.technicianAuthStore.logout()
        this.closeMobileMenu()
        this.$router.push('/')
      } catch (err) {
        console.error('Logout failed:', err)
      }
    }
  }
}
</script>

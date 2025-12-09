<template>
  <div>
    <!-- Mobile Menu Toggle Button -->
    <button 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-800 text-white rounded-lg shadow-lg"
      :class="{ 'left-[17rem]': isOpen }"
      aria-label="Toggle sidebar menu"
    >
      <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Mobile Overlay -->
    <div 
      v-if="isOpen" 
      class="lg:hidden fixed inset-0 bg-black/50 z-30"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="fixed left-0 top-0 bottom-0 w-64 bg-primary-800 text-white overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out"
      :class="{ '-translate-x-full lg:translate-x-0': !isOpen, 'translate-x-0': isOpen }"
      role="navigation" 
      aria-label="User navigation"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-primary-700">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <img src="/images/logo/fixappliance-icon.svg" alt="FixAppliance" class="w-6 h-6">
          </div>
          <div class="text-white">
            <p class="font-bold text-white">FixAppliance</p>
            <p class="text-xs text-primary-300">Customer Portal</p>
          </div>
        </div>
      </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-1">
      <router-link 
        to="/dashboard" 
        :class="getLinkClass('/dashboard')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link 
        to="/book-technician" 
        :class="getLinkClass('/book-technician')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Book a Technician</span>
      </router-link>

      <router-link 
        to="/my-bookings" 
        :class="getLinkClass('/my-bookings')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>My Bookings</span>
        <span v-if="activeCount > 0" class="ml-auto bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">{{ activeCount }}</span>
      </router-link>

      <div class="pt-4 pb-2 px-4">
        <span class="text-xs text-primary-400 uppercase tracking-wider">Account</span>
      </div>

      <router-link 
        to="/profile" 
        :class="getLinkClass('/profile')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <span>My Profile</span>
      </router-link>

      <div class="pt-4 pb-2 px-4">
        <span class="text-xs text-primary-400 uppercase tracking-wider">Quick Links</span>
      </div>

      <router-link 
        to="/" 
        :class="getLinkClass('/')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
        <span>Home Page</span>
      </router-link>

      <router-link 
        to="/about" 
        :class="getLinkClass('/about')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>About Us</span>
      </router-link>

      <router-link 
        to="/contact" 
        :class="getLinkClass('/contact')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <span>Contact</span>
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-700">
      <button type="button" @click="handleLogout" class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </aside>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useBookingStore } from '@/store/booking'

export default {
  name: 'UserSidebar',
  data() {
    return {
      authStore: null,
      bookingStore: null,
      isOpen: false
    }
  },
  created() {
    // Initialize stores once when component is created
    this.authStore = useAuthStore()
    this.bookingStore = useBookingStore()
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
    activeCount() {
      if (!this.bookingStore) return 0
      // Count pending + confirmed + in-progress bookings
      const pending = this.bookingStore.pending?.length || 0
      const confirmed = this.bookingStore.confirmed?.length || 0
      const inProgress = this.bookingStore.inProgress?.length || 0
      return pending + confirmed + inProgress
    }
  },
  watch: {
    // Close sidebar on route change (mobile)
    '$route'() {
      this.isOpen = false
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    },
    closeSidebar() {
      this.isOpen = false
    },
    getLinkClass(path) {
      const baseClasses = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors'
      const isActive = this.currentPath === path || 
        (path !== '/' && this.currentPath.startsWith(path))
      
      if (isActive) {
        return `${baseClasses} bg-primary-700 text-white hover:bg-primary-600 hover:text-white`
      }
      return `${baseClasses} text-primary-200 hover:bg-primary-700 hover:text-white`
    },
    async handleLogout() {
      try {
        await this.authStore.logout()
      } catch (err) {
        console.error('Logout error:', err)
      }
      this.$router.push('/login')
    }
  }
}
</script>

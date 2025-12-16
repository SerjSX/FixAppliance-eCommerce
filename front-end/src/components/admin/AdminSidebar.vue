<template>
  <div>
    <!-- Mobile Menu Toggle Button -->
    <button 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-error-600 text-white rounded-lg shadow-lg"
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
      class="fixed left-0 top-0 bottom-0 w-64 bg-error-700 text-white overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out"
      :class="{ '-translate-x-full lg:translate-x-0': !isOpen, 'translate-x-0': isOpen }"
      role="navigation" 
      aria-label="Admin navigation"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-error-600">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <img src="/images/logo/fixappliance-icon.svg" alt="FixAppliance" class="w-6 h-6">
          </div>
          <div class="text-white">
            <p class="font-bold text-white">FixAppliance</p>
            <p class="text-xs text-error-200">Admin Portal</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1">
        <router-link 
          to="/admin/dashboard" 
          :class="getLinkClass('/admin/dashboard')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard</span>
        </router-link>

        <!-- Appliance Management -->
        <div class="pt-4 pb-2 px-4">
          <p class="text-xs font-semibold text-error-200 uppercase tracking-wider">Appliances</p>
        </div>

        <router-link 
          to="/admin/appliances" 
          :class="getLinkClass('/admin/appliances')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span>Manage Appliances</span>
        </router-link>

        <!-- Booking Monitoring -->
        <div class="pt-4 pb-2 px-4">
          <p class="text-xs font-semibold text-error-200 uppercase tracking-wider">Booking Alerts</p>
        </div>

        <router-link 
          to="/admin/bookings/unpaid" 
          :class="getLinkClass('/admin/bookings/unpaid')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Unpaid Bookings</span>
        </router-link>

        <router-link 
          to="/admin/bookings/incomplete" 
          :class="getLinkClass('/admin/bookings/incomplete')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Incomplete Bookings</span>
        </router-link>

        <router-link 
          to="/admin/bookings/overdue" 
          :class="getLinkClass('/admin/bookings/overdue')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span>Overdue Bookings</span>
        </router-link>

        <!-- Technician Management -->
        <div class="pt-4 pb-2 px-4">
          <p class="text-xs font-semibold text-error-200 uppercase tracking-wider">Technicians</p>
        </div>

        <router-link 
          to="/admin/technicians/verification" 
          :class="getLinkClass('/admin/technicians/verification')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <span>Verification Queue</span>
        </router-link>

        <router-link 
          to="/admin/technicians/performance" 
          :class="getLinkClass('/admin/technicians/performance')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
          <span>Performance Review</span>
        </router-link>

        <router-link 
          to="/admin/technicians" 
          :class="getLinkClass('/admin/technicians')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span>Manage All Technicians</span>
        </router-link>

        <!-- Profile & Logout -->
        <div class="pt-4 pb-2 px-4 border-t border-error-600 mt-4">
          <p class="text-xs font-semibold text-error-200 uppercase tracking-wider">Account</p>
        </div>

        <button 
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-white hover:bg-error-600 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  </div>
</template>

<script>
import { useAdminAuthStore } from '@/store/adminAuth'

export default {
  name: 'AdminSidebar',
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
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
      const isActive = this.currentPath === path

      if (isActive) {
          return `${baseClasses} bg-error-600 font-medium text-white hover:text-white`
      }
      return `${baseClasses} text-error-100 hover:bg-error-600 hover:text-white`
    },
    async handleLogout() {
      try {
        const adminAuthStore = useAdminAuthStore()
        await adminAuthStore.logout()
        this.$router.push('/admin-login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
  },
  watch: {
    '$route'() {
      // Close sidebar on route change (mobile)
      if (window.innerWidth < 1024) {
        this.closeSidebar()
      }
    }
  }
}
</script>

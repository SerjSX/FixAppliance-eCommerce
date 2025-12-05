<template>
  <aside class="fixed left-0 top-0 bottom-0 w-64 bg-primary-800 text-white overflow-y-auto" role="navigation" aria-label="Technician navigation">
    <!-- Logo -->
    <div class="p-6 border-b border-primary-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <img src="/images/logo/fixappliance-icon.svg" alt="FixAppliance" class="w-6 h-6">
        </div>
        <div>
          <p class="font-bold">FixAppliance</p>
          <p class="text-xs text-primary-300">Technician Portal</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-1">
      <router-link 
        to="/technician-dashboard" 
        :class="getLinkClass('/technician-dashboard')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link 
        to="/technician/pending-bookings" 
        :class="getLinkClass('/technician/pending-bookings')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Pending Bookings</span>
        <span v-if="pendingCount > 0" class="ml-auto bg-secondary-500 text-white text-xs px-2 py-0.5 rounded-full">{{ pendingCount }}</span>
      </router-link>

      <router-link 
        to="/technician/active-bookings" 
        :class="getLinkClass('/technician/active-bookings')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>Active Bookings</span>
        <span v-if="activeCount > 0" class="ml-auto bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">{{ activeCount }}</span>
      </router-link>

      <router-link 
        to="/technician/completed-bookings" 
        :class="getLinkClass('/technician/completed-bookings')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Completed</span>
        <span v-if="completedCount > 0" class="ml-auto bg-success-500 text-white text-xs px-2 py-0.5 rounded-full">{{ completedCount }}</span>
      </router-link>

      <router-link 
        to="/technician/earnings" 
        :class="getLinkClass('/technician/earnings')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Earnings</span>
      </router-link>

      <div class="pt-4 pb-2 px-4">
        <span class="text-xs text-primary-400 uppercase tracking-wider">Settings</span>
      </div>

      <router-link 
        to="/technician/profile" 
        :class="getLinkClass('/technician/profile')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <span>Profile</span>
      </router-link>

      <router-link 
        to="/technician/specialties" 
        :class="getLinkClass('/technician/specialties')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>Specialty Areas</span>
      </router-link>

      <router-link 
        to="/technician/service-areas" 
        :class="getLinkClass('/technician/service-areas')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>Service Areas</span>
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
</template>

<script>
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import { useTechnicianStore } from '@/store/technician'

export default {
  name: 'TechnicianSidebar',
  computed: {
    technicianAuthStore() {
      return useTechnicianAuthStore()
    },
    technicianStore() {
      return useTechnicianStore()
    },
    currentPath() {
      return this.$route.path
    },
    pendingCount() {
      return this.technicianStore.pendingBookings?.length || 0
    },
    activeCount() {
      return this.technicianStore.activeBookings?.length || 0
    },
    completedCount() {
      return this.technicianStore.completedBookings?.length || 0
    }
  },
  methods: {
    getLinkClass(path) {
      const baseClasses = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors'
      const isActive = this.currentPath === path
      
      if (isActive) {
        // Active state: keep white text on hover too
        return `${baseClasses} bg-primary-700 text-white hover:bg-primary-600 hover:text-white`
      }
      return `${baseClasses} text-primary-200 hover:bg-primary-700 hover:text-white`
    },
    async handleLogout() {
      await this.technicianAuthStore.logout()
      this.$router.push('/technician-login')
    }
  }
}
</script>

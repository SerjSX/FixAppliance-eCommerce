<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- Header (hidden on portal pages which have their own layout) -->
    <AppHeader v-if="!isPortalPage" />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer (hidden on portal pages) -->
    <AppFooter v-if="!isPortalPage" />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { useAuthStore } from '@/store/auth'
import { useTechnicianAuthStore } from '@/store/technicianAuth'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    isPortalPage() {
      const path = this.$route.path
      const authStore = useAuthStore()
      const techAuthStore = useTechnicianAuthStore()
      
      // Technician portal pages (only if logged in as technician)
      const isTechnicianPortal = techAuthStore.isAuthenticated && (
        path.startsWith('/technician-dashboard') || 
        (path.startsWith('/technician/') && 
         !path.includes('/technician-login') && 
         !path.includes('/technician-register'))
      )
      
      // User portal pages (only if logged in as user)
      // book-technician is accessible without login, so only hide header if authenticated
      const isUserPortal = authStore.isAuthenticated && (
        path === '/dashboard' ||
        path.startsWith('/my-bookings') ||
        path.startsWith('/booking/') ||
        path === '/profile' ||
        path === '/book-technician'
      )
      
      return isTechnicianPortal || isUserPortal
    }
  }
}
</script>

<style>
/* Global app styles are imported via main.js from styles/main.css */
</style>

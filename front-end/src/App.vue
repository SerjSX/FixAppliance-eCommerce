<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- Header (hidden on technician portal pages which have their own layout) -->
    <AppHeader v-if="!isTechnicianPortal" />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer (hidden on technician portal pages) -->
    <AppFooter v-if="!isTechnicianPortal" />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    isTechnicianPortal() {
      // Hide header/footer on technician dashboard pages (they have their own layout)
      const path = this.$route.path
      return path.startsWith('/technician-dashboard') || 
             (path.startsWith('/technician/') && 
              !path.includes('/technician-login') && 
              !path.includes('/technician-register'))
    }
  }
}
</script>

<style>
/* Global app styles are imported via main.js from styles/main.css */
</style>

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import { useAuthStore } from './store/auth'
import { useTechnicianAuthStore } from './store/technicianAuth'

// Import global styles
import './styles/main.css'
import './styles/base.css'
import './styles/typography.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/forms.css'
import './styles/utilities.css'

const app = createApp(App)
app.use(pinia)
app.use(router)

// Auth initialization promise - router will wait for this
let authInitPromise = null

export const getAuthInitPromise = () => authInitPromise

// Initialize auth state before mounting
const initAuth = async () => {
  const authStore = useAuthStore()
  const technicianAuthStore = useTechnicianAuthStore()
  
  // Create promise that router can wait for
  authInitPromise = Promise.all([
    // Try to restore user session
    authStore.fetchProfile().catch(() => {
      // User not authenticated, that's fine
    }),
    // Try to restore technician session
    technicianAuthStore.fetchProfile().catch(() => {
      // Technician not authenticated, that's fine
    })
    // Note: Admin auth is not checked on init for security purposes
    // Admin must explicitly login each session
  ])
  
  await authInitPromise
  app.mount('#app')
}

initAuth()

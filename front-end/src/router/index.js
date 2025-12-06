// Vue Router Configuration
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useTechnicianAuthStore } from '@/store/technicianAuth'

// Flag to track if auth has been initialized
let authInitialized = false

// Public Views
import HomeView from '@/views/public/HomeView.vue'
import AboutView from '@/views/public/AboutView.vue'
import ContactView from '@/views/public/ContactView.vue'
import ComingSoonView from '@/views/public/ComingSoonView.vue'

// Auth Views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import TechnicianLoginView from '@/views/auth/TechnicianLoginView.vue'
import TechnicianRegisterView from '@/views/auth/TechnicianRegisterView.vue'

// User Views
import UserDashboardView from '@/views/user/UserDashboardView.vue'
import BookTechnicianView from '@/views/user/BookTechnicianView.vue'
import MyBookingsView from '@/views/user/MyBookingsView.vue'
import UserProfileView from '@/views/user/UserProfileView.vue'
import BookingDetailView from '@/views/user/BookingDetailView.vue'

// Technician Views
import TechnicianDashboardView from '@/views/technician/TechnicianDashboardView.vue'
import TechnicianProfileView from '@/views/technician/TechnicianProfileView.vue'
import TechnicianPendingBookingsView from '@/views/technician/TechnicianPendingBookingsView.vue'
import TechnicianActiveBookingsView from '@/views/technician/TechnicianActiveBookingsView.vue'
import TechnicianCompletedBookingsView from '@/views/technician/TechnicianCompletedBookingsView.vue'
import TechnicianEarningsView from '@/views/technician/TechnicianEarningsView.vue'
import TechnicianSpecialtyView from '@/views/technician/TechnicianSpecialtyView.vue'
import TechnicianServiceAreasView from '@/views/technician/TechnicianServiceAreasView.vue'

const routes = [
  // ========================================
  // PUBLIC ROUTES
  // ========================================
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'FixAppliance - Trusted Appliance Repair in Lebanon',
      description: 'Book verified technicians or learn to DIY with Arabic and English troubleshooting guides. Serving homeowners across Mount Lebanon.'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: {
      title: 'About Us - FixAppliance',
      description: 'Learn about FixAppliance, Lebanon\'s premier platform for appliance repairs, connecting homeowners with verified technicians.'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
    meta: {
      title: 'Contact Us - FixAppliance',
      description: 'Get in touch with FixAppliance for questions about bookings, technician inquiries, or partnerships.'
    }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: ComingSoonView,
    meta: {
      title: 'Coming Soon - FixAppliance',
      description: 'This feature is coming soon. Stay tuned for updates!'
    }
  },

  // ========================================
  // AUTH ROUTES - CUSTOMERS
  // ========================================
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Login - FixAppliance',
      description: 'Sign in to your FixAppliance account to manage bookings and access your dashboard.'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {
      title: 'Create Account - FixAppliance',
      description: 'Join FixAppliance to book verified technicians and access DIY troubleshooting guides.'
    }
  },

  // ========================================
  // USER DASHBOARD ROUTES
  // ========================================
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboardView,
    meta: {
      title: 'Dashboard - FixAppliance',
      description: 'View your booking overview, manage payments, and access quick actions.',
      requiresAuth: true
    }
  },
  {
    path: '/book-technician',
    name: 'BookTechnician',
    component: BookTechnicianView,
    meta: {
      title: 'Book a Technician - FixAppliance',
      description: 'Book a verified appliance repair technician in your area. Quick, easy, and reliable service.'
    }
  },
  {
    path: '/my-bookings',
    name: 'MyBookings',
    component: MyBookingsView,
    meta: {
      title: 'My Bookings - FixAppliance',
      description: 'View and manage your appliance repair bookings.',
      requiresAuth: true
    }
  },
  {
    path: '/booking/:id',
    name: 'BookingDetail',
    component: BookingDetailView,
    meta: { title: 'Booking Details - FixAppliance', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfileView,
    meta: { title: 'My Profile - FixAppliance', requiresAuth: true }
  },

  // ========================================
  // TECHNICIAN PORTAL ROUTES
  // ========================================
  {
    path: '/technician-login',
    name: 'TechnicianLogin',
    component: TechnicianLoginView,
    meta: {
      title: 'Technician Login - FixAppliance',
      description: 'Sign in to the FixAppliance technician portal to manage your bookings and profile.'
    }
  },
  {
    path: '/technician-register',
    name: 'TechnicianRegister',
    component: TechnicianRegisterView,
    meta: {
      title: 'Become a Technician - FixAppliance',
      description: 'Join the FixAppliance technician network and connect with customers who need your expertise.'
    }
  },
  {
    path: '/technician-dashboard',
    name: 'TechnicianDashboard',
    component: TechnicianDashboardView,
    meta: {
      title: 'Technician Dashboard - FixAppliance',
      description: 'Manage your bookings, earnings, and profile from the technician dashboard.',
      requiresTechnicianAuth: true
    }
  },
  {
    path: '/technician/profile',
    name: 'TechnicianProfile',
    component: TechnicianProfileView,
    meta: { title: 'Technician Profile - FixAppliance', requiresTechnicianAuth: true }
  },
  {
    path: '/technician/pending-bookings',
    name: 'TechnicianPendingBookings',
    component: TechnicianPendingBookingsView,
    meta: { title: 'Pending Bookings - FixAppliance', requiresTechnicianAuth: true }
  },
  {
    path: '/technician/active-bookings',
    name: 'TechnicianActiveBookings',
    component: TechnicianActiveBookingsView,
    meta: { title: 'Active Bookings - FixAppliance', requiresTechnicianAuth: true }
  },
  {
    path: '/technician/completed-bookings',
    name: 'TechnicianCompletedBookings',
    component: TechnicianCompletedBookingsView,
    meta: { title: 'Completed Bookings - FixAppliance', requiresTechnicianAuth: true }
  },
  {
    path: '/technician/earnings',
    name: 'TechnicianEarnings',
    component: TechnicianEarningsView,
    meta: { title: 'My Earnings - FixAppliance', requiresTechnicianAuth: true }
  },
  {
    path: '/technician/specialties',
    name: 'TechnicianSpecialties',
    component: TechnicianSpecialtyView,
    meta: { title: 'My Specialties - FixAppliance', requiresTechnicianAuth: true }
  },
  {
    path: '/technician/service-areas',
    name: 'TechnicianServiceAreas',
    component: TechnicianServiceAreasView,
    meta: { title: 'Service Areas - FixAppliance', requiresTechnicianAuth: true }
  },

  // ========================================
  // CATCH-ALL / 404
  // ========================================
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/public/NotFoundView.vue'),
    meta: {
      title: 'Page Not Found - FixAppliance'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard for setting page title, meta, and auth checking
router.beforeEach(async (to, from, next) => {
  // Get auth stores
  const authStore = useAuthStore()
  const technicianAuthStore = useTechnicianAuthStore()
  
  // Wait for auth initialization on first navigation
  if (!authInitialized) {
    // Import getAuthInitPromise dynamically to avoid circular dependency
    const { getAuthInitPromise } = await import('@/main.js')
    const authInitPromise = getAuthInitPromise()
    if (authInitPromise) {
      await authInitPromise
    }
    authInitialized = true
  }
  
  // Check if route requires user authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Redirect to login with return URL
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  
  // Check if route requires technician authentication
  if (to.meta.requiresTechnicianAuth) {
    if (!technicianAuthStore.isAuthenticated) {
      // Redirect to technician login with return URL
      return next({
        path: '/technician-login',
        query: { redirect: to.fullPath }
      })
    }
  }
  
  // Redirect authenticated users away from login/register pages
  if (to.path === '/login' || to.path === '/register') {
    if (authStore.isAuthenticated) {
      return next('/dashboard')
    }
  }
  
  // Redirect authenticated technicians away from technician login/register pages
  if (to.path === '/technician-login' || to.path === '/technician-register') {
    if (technicianAuthStore.isAuthenticated) {
      return next('/technician-dashboard')
    }
  }
  
  // Set document title
  document.title = to.meta.title || 'FixAppliance'
  
  // Set meta description
  const description = to.meta.description || 'FixAppliance - Trusted Appliance Repair in Lebanon'
  let metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', description)
  } else {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    metaDescription.setAttribute('content', description)
    document.head.appendChild(metaDescription)
  }

  next()
})

export default router

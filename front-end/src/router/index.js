// Vue Router Configuration
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import { useAdminAuthStore } from '@/store/adminAuth'

// Flag to track if auth has been initialized
let authInitialized = false

// Public Views
import HomeView from '@/views/public/HomeView.vue'
import AboutView from '@/views/public/AboutView.vue'
import ContactView from '@/views/public/ContactView.vue'

// Auth Views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import TechnicianLoginView from '@/views/auth/TechnicianLoginView.vue'
import TechnicianRegisterView from '@/views/auth/TechnicianRegisterView.vue'
import AdminLoginView from '@/views/auth/AdminLoginView.vue'

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

// Admin Views
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminAppliancesView from '@/views/admin/AdminAppliancesView.vue'
import AdminUnpaidBookingsView from '@/views/admin/AdminUnpaidBookingsView.vue'
import AdminIncompleteBookingsView from '@/views/admin/AdminIncompleteBookingsView.vue'
import AdminOverdueBookingsView from '@/views/admin/AdminOverdueBookingsView.vue'
import AdminVerificationView from '@/views/admin/AdminVerificationView.vue'
import AdminPerformanceView from '@/views/admin/AdminPerformanceView.vue'
import AdminTechniciansView from '@/views/admin/AdminTechniciansView.vue'
import AdminTechnicianDetailsView from '@/views/admin/AdminTechnicianDetailsView.vue'

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
      description: 'Book verified technicians. Serving homeowners across Mount Lebanon.'
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
      description: 'Join FixAppliance to book verified technicians.'
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
  // ADMIN PORTAL ROUTES
  // ========================================
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLoginView,
    meta: {
      title: 'Admin Login - FixAppliance',
      description: 'Sign in to the FixAppliance admin portal to manage the platform.'
    }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboardView,
    meta: {
      title: 'Admin Dashboard - FixAppliance',
      description: 'Admin platform overview and key metrics.',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/appliances',
    name: 'AdminAppliances',
    component: AdminAppliancesView,
    meta: {
      title: 'Appliance Management - FixAppliance',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/bookings/unpaid',
    name: 'AdminUnpaidBookings',
    component: AdminUnpaidBookingsView,
    meta: {
      title: 'Unpaid Bookings - FixAppliance',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/bookings/incomplete',
    name: 'AdminIncompleteBookings',
    component: AdminIncompleteBookingsView,
    meta: {
      title: 'Incomplete Bookings - FixAppliance',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/bookings/overdue',
    name: 'AdminOverdueBookings',
    component: AdminOverdueBookingsView,
    meta: {
      title: 'Overdue Bookings - FixAppliance',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/technicians/verification',
    name: 'AdminVerification',
    component: AdminVerificationView,
    meta: {
      title: 'Technician Verification - FixAppliance',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/technicians/performance',
    name: 'AdminPerformance',
    component: AdminPerformanceView,
    meta: {
      title: 'Technician Performance - FixAppliance',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/technicians',
    name: 'AdminTechnicians',
    component: AdminTechniciansView,
    meta: {
      title: 'Manage Technicians - FixAppliance',
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/technicians/:id',
    name: 'AdminTechnicianDetails',
    component: AdminTechnicianDetailsView,
    meta: {
      title: 'Technician Details - FixAppliance',
      requiresAdminAuth: true
    }
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
  // ALl routes when clicked on scroll back up to the page
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})

// Navigation guard for setting page title, meta, and auth checking
router.beforeEach(async (to, from, next) => {
  // Get auth stores
  const authStore = useAuthStore()
  const technicianAuthStore = useTechnicianAuthStore()
  const adminAuthStore = useAdminAuthStore()

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

  // Check if route requires admin authentication
  if (to.meta.requiresAdminAuth) {
    if (!adminAuthStore.isAuthenticated) {
      // Redirect to admin login with return URL
      return next({
        path: '/admin-login',
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

  // Redirect authenticated admins away from admin login page
  if (to.path === '/admin-login') {
    if (adminAuthStore.isAuthenticated) {
      return next('/admin/dashboard')
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

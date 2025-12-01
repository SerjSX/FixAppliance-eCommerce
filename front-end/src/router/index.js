/**
 * Vue Router Configuration
 * 
 * This file defines all the routes for the FixAppliance frontend application.
 * Routes are organized by functionality: public, auth, user dashboard, technician portal.
 */

import { createRouter, createWebHistory } from 'vue-router'

// Import Views
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import BookTechnicianView from '@/views/BookTechnicianView.vue'
import MyBookingsView from '@/views/MyBookingsView.vue'
import ComingSoonView from '@/views/ComingSoonView.vue'
import TechnicianLoginView from '@/views/TechnicianLoginView.vue'
import TechnicianRegisterView from '@/views/TechnicianRegisterView.vue'
import TechnicianDashboardView from '@/views/TechnicianDashboardView.vue'
import ContactView from '@/views/ContactView.vue'
import AboutView from '@/views/AboutView.vue'

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
      title: 'Coming Soon - DIY Guides - FixAppliance',
      description: 'DIY troubleshooting guides are coming soon. Learn to fix common appliance problems yourself.'
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

  // ========================================
  // CATCH-ALL / 404
  // ========================================
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
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

// Navigation guard for setting page title and meta
router.beforeEach((to, from, next) => {
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

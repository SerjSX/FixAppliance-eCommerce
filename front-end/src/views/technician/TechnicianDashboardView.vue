<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 bottom-0 w-64 bg-primary-800 text-white overflow-y-auto" role="navigation" aria-label="Technician dashboard navigation">
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
        <router-link to="/technician-dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-700 text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/technician/pending-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Pending Bookings</span>
          <span v-if="pendingCount > 0" class="ml-auto bg-secondary-500 text-white text-xs px-2 py-0.5 rounded-full">{{ pendingCount }}</span>
        </router-link>

        <router-link to="/technician/active-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>Active Bookings</span>
          <span v-if="activeBookingsCount > 0" class="ml-auto bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">{{ activeBookingsCount }}</span>
        </router-link>

        <router-link to="/technician/completed-bookings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Completed</span>
        </router-link>

        <router-link to="/technician/earnings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Earnings</span>
        </router-link>

        <div class="pt-4 pb-2 px-4">
          <span class="text-xs text-primary-400 uppercase tracking-wider">Settings</span>
        </div>

        <router-link to="/technician/profile" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Profile</span>
        </router-link>

        <router-link to="/technician/specialties" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Specialty Areas</span>
        </router-link>

        <router-link to="/technician/service-areas" class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-200 hover:bg-primary-700 hover:text-white transition-colors">
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

    <!-- Main Content -->
    <main class="flex-1 ml-64 bg-neutral-50 min-h-screen">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-neutral-900">Dashboard</h1>
            <p class="text-sm text-neutral-500">Welcome back, {{ technician.firstName || 'Technician' }}!</p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button type="button" class="relative p-2 text-neutral-500 hover:text-neutral-700 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span v-if="pendingCount > 0" class="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
            </button>
            <!-- Profile -->
            <div class="flex items-center gap-3">
              <span class="avatar avatar-md bg-primary-100 text-primary-600">{{ technicianInitials }}</span>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-neutral-900">{{ technicianName }}</p>
                <p class="text-xs text-neutral-500">{{ technician.isVerified ? 'Verified Technician' : 'Pending Verification' }}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="p-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>

        <template v-else>
          <!-- Error Alert -->
          <AlertMessage 
            v-if="error" 
            type="error" 
            :message="error"
            class="mb-6"
            @dismiss="error = null"
          />

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Pending Requests -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Pending Requests</p>
                    <p class="text-3xl font-bold text-neutral-900">{{ pendingCount }}</p>
                  </div>
                  <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <router-link to="/technician/pending-bookings" class="text-sm text-primary-600 hover:underline mt-3 inline-block">View all →</router-link>
              </div>
            </div>

            <!-- Active Bookings -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Active Bookings</p>
                    <p class="text-3xl font-bold text-neutral-900">{{ activeBookingsCount }}</p>
                  </div>
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <router-link to="/technician/active-bookings" class="text-sm text-primary-600 hover:underline mt-3 inline-block">Manage →</router-link>
              </div>
            </div>

            <!-- Completed This Month -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Completed (Month)</p>
                    <p class="text-3xl font-bold text-neutral-900">{{ completedThisMonth }}</p>
                  </div>
                  <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-success-600 mt-3">Great work!</p>
              </div>
            </div>

            <!-- Earnings This Month -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 mb-1">Earnings (Month)</p>
                    <p class="text-3xl font-bold text-neutral-900">${{ earningsThisMonth }}</p>
                  </div>
                  <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <router-link to="/technician/earnings" class="text-sm text-primary-600 hover:underline mt-3 inline-block">View details →</router-link>
              </div>
            </div>
          </div>

          <!-- Recent Activity & Pending Bookings -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Pending Bookings to Accept -->
            <div class="card">
              <div class="card-header flex items-center justify-between">
                <h3 class="font-semibold text-neutral-900">Pending Bookings</h3>
                <router-link to="/technician/pending-bookings" class="text-sm text-primary-600 hover:underline">View all</router-link>
              </div>
              
              <!-- Empty State -->
              <div v-if="pendingBookings.length === 0" class="p-8 text-center">
                <svg class="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <p class="text-neutral-500">No pending bookings</p>
              </div>

              <div v-else class="divide-y divide-neutral-100">
                <!-- Booking Item -->
                <div v-for="booking in pendingBookings.slice(0, 3)" :key="booking.id" class="p-4 hover:bg-neutral-50 transition-colors">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h4 class="font-medium text-neutral-900">{{ booking.applianceType || 'Appliance Repair' }}</h4>
                      <p class="text-sm text-neutral-500">{{ booking.serviceArea || booking.city || 'Location TBD' }}</p>
                    </div>
                    <span class="badge badge-pending">New</span>
                  </div>
                  <p class="text-sm text-neutral-600 mb-3 line-clamp-1">{{ booking.description || 'No description' }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-neutral-500">{{ formatDate(booking.scheduledDate) }}</span>
                    <div class="flex gap-2">
                      <button type="button" @click="declineBooking(booking.id)" class="btn btn-ghost btn-sm text-error-600 hover:bg-error-50">Decline</button>
                      <button type="button" @click="acceptBooking(booking.id)" class="btn btn-primary btn-sm">Accept</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <!-- Recent Ratings -->
          <div class="card">
            <div class="card-header flex items-center justify-between">
              <h3 class="font-semibold text-neutral-900">Recent Ratings</h3>
              <div class="flex items-center gap-1 text-warning-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="font-semibold">4.8</span>
                <span class="text-sm text-neutral-500">(156 reviews)</span>
              </div>
            </div>
            <div class="divide-y divide-neutral-100">
              <!-- Rating Item 1 -->
              <div class="p-4">
                <div class="flex items-start gap-3">
                  <span class="avatar avatar-sm bg-primary-100 text-primary-600">SH</span>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-medium text-neutral-900">Sara Haddad</span>
                      <div class="flex items-center gap-1 text-warning-500">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      </div>
                    </div>
                    <p class="text-sm text-neutral-600 mb-1">Excellent service! Fixed my washing machine quickly.</p>
                    <span class="text-xs text-neutral-400">2 days ago • Washing Machine</span>
                  </div>
                </div>
              </div>

              <!-- Rating Item 2 -->
              <div class="p-4">
                <div class="flex items-start gap-3">
                  <span class="avatar avatar-sm bg-primary-100 text-primary-600">MK</span>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-medium text-neutral-900">Marwan Khalil</span>
                      <div class="flex items-center gap-1 text-warning-500">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg class="w-4 h-4 text-neutral-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      </div>
                    </div>
                    <p class="text-sm text-neutral-600 mb-1">Great work on my AC. Very professional.</p>
                    <span class="text-xs text-neutral-400">5 days ago • Air Conditioner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { useTechnicianAuthStore } from '@/store/technicianAuth'
import { useTechnicianStore } from '@/store/technician'
import { formatDate } from '@/utils/dateUtils'
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'TechnicianDashboardView',
  components: {
    AlertMessage
  },
  data() {
    return {
      loading: false,
      error: null
    }
  },
  computed: {
    technicianAuthStore() {
      return useTechnicianAuthStore()
    },
    technicianStore() {
      return useTechnicianStore()
    },
    technician() {
      return this.technicianAuthStore.currentTechnician || {}
    },
    technicianName() {
      if (this.technician.firstName && this.technician.lastName) {
        return `${this.technician.firstName} ${this.technician.lastName}`
      }
      return this.technician.name || 'Technician'
    },
    technicianInitials() {
      if (this.technician.firstName && this.technician.lastName) {
        return `${this.technician.firstName[0]}${this.technician.lastName[0]}`.toUpperCase()
      }
      return this.technicianName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'T'
    },
    pendingBookings() {
      return this.technicianStore.pendingBookings || []
    },
    activeBookings() {
      return this.technicianStore.activeBookings || []
    },
    completedBookings() {
      return this.technicianStore.completedBookings || []
    },
    earnings() {
      return this.technicianStore.earnings || {}
    },
    pendingCount() {
      return this.pendingBookings.length
    },
    activeBookingsCount() {
      return this.activeBookings.length
    },
    completedThisMonth() {
      // Filter completed bookings by current month
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      return this.completedBookings.filter(b => {
        const completedDate = new Date(b.completedAt)
        return completedDate.getMonth() === currentMonth && completedDate.getFullYear() === currentYear
      }).length
    },
    earningsThisMonth() {
      // Calculate earnings from monthly breakdown or summary
      if (this.earnings.summary?.thisMonthEarnings) {
        return this.earnings.summary.thisMonthEarnings.toFixed(2)
      }
      if (this.earnings.monthlyBreakdown?.length > 0) {
        const currentMonthData = this.earnings.monthlyBreakdown[0]
        return (currentMonthData?.totalEarnings || 0).toFixed(2)
      }
      return '0.00'
    }
  },
  methods: {
    formatDate,
    async handleLogout() {
      await this.technicianAuthStore.logout()
      this.$router.push('/technician-login')
    },
    async acceptBooking(bookingId) {
      try {
        await this.technicianStore.acceptBooking(bookingId)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to accept booking'
      }
    },
    async declineBooking(bookingId) {
      if (!confirm('Are you sure you want to decline this booking?')) return
      try {
        await this.technicianStore.declineBooking(bookingId)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to decline booking'
      }
    },
    async loadDashboardData() {
      this.loading = true
      try {
        await Promise.all([
          this.technicianAuthStore.fetchProfile(),
          this.technicianStore.fetchPendingBookings(),
          this.technicianStore.fetchActiveBookings(),
          this.technicianStore.fetchCompletedBookings(),
          this.technicianStore.fetchEarnings()
        ])
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        this.loading = false
      }
    }
  },
  async mounted() {
    await this.loadDashboardData()
  }
}
</script>

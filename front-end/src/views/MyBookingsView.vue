<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <a href="/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">My Bookings</span>
        </nav>
        <h1 class="page-title">My Bookings</h1>
        <p class="page-description">Track and manage your appliance repair bookings</p>
      </div>
    </div>

    <!-- Bookings Content -->
    <section class="section-sm">
      <div class="container-wide">
        <!-- Tabs -->
        <div class="tabs mb-6">
          <button type="button" class="tab active">All Bookings</button>
          <button type="button" class="tab">Pending</button>
          <button type="button" class="tab">Confirmed</button>
          <button type="button" class="tab">In Progress</button>
          <button type="button" class="tab">Completed</button>
          <button type="button" class="tab">Cancelled</button>
        </div>

        <!-- Filters and Search -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-1 form-search-wrapper">
            <svg class="form-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" class="form-search" placeholder="Search bookings...">
          </div>
          <select class="form-select w-auto">
            <option value="">All Appliances</option>
            <option value="washing-machine">Washing Machine</option>
            <option value="refrigerator">Refrigerator</option>
            <option value="ac">Air Conditioner</option>
          </select>
          <select class="form-select w-auto">
            <option value="">Sort by Date</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <!-- Bookings List -->
        <div class="space-y-4">
          <!-- Booking Card 1 - Pending -->
          <div class="card">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-center gap-4">
                <!-- Appliance Icon -->
                <div class="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary-50 rounded-xl">
                  <img src="/images/icons/washing-machine.svg" alt="Washing Machine" class="w-8 h-8">
                </div>

                <!-- Booking Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-neutral-900">Washing Machine Repair</h3>
                      <p class="text-sm text-neutral-500">Booking #BK-12345</p>
                    </div>
                    <span class="badge badge-pending">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"></circle>
                      </svg>
                      Pending
                    </span>
                  </div>

                  <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
                    Machine is making loud noises during spin cycle and leaking water from the bottom.
                  </p>

                  <div class="flex flex-wrap gap-4 text-sm text-neutral-500">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>Dec 20, 2024 at 10:00 AM</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>$50.00</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>Awaiting technician</span>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2 md:flex-col">
                  <a href="/booking/12345" class="btn btn-outline btn-sm w-full">View Details</a>
                  <button type="button" class="btn btn-ghost btn-sm w-full text-error-600 hover:bg-error-50">Cancel</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Card 2 - Confirmed -->
          <div class="card">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-center gap-4">
                <!-- Appliance Icon -->
                <div class="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary-50 rounded-xl">
                  <img src="/images/icons/refrigerator.svg" alt="Refrigerator" class="w-8 h-8">
                </div>

                <!-- Booking Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-neutral-900">Refrigerator Repair</h3>
                      <p class="text-sm text-neutral-500">Booking #BK-12344</p>
                    </div>
                    <span class="badge badge-confirmed">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"></circle>
                      </svg>
                      Confirmed
                    </span>
                  </div>

                  <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
                    Refrigerator is not cooling properly, ice is forming at the back.
                  </p>

                  <div class="flex flex-wrap gap-4 text-sm text-neutral-500">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>Dec 22, 2024 at 2:00 PM</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>$65.00</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>Ahmad Mansour</span>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2 md:flex-col">
                  <a href="/booking/12344" class="btn btn-outline btn-sm w-full">View Details</a>
                  <button type="button" class="btn btn-primary btn-sm w-full">Pay Now</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Card 3 - Completed -->
          <div class="card">
            <div class="card-body">
              <div class="flex flex-col md:flex-row md:items-center gap-4">
                <!-- Appliance Icon -->
                <div class="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary-50 rounded-xl">
                  <img src="/images/icons/air-conditioner.svg" alt="Air Conditioner" class="w-8 h-8">
                </div>

                <!-- Booking Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-neutral-900">Air Conditioner Maintenance</h3>
                      <p class="text-sm text-neutral-500">Booking #BK-12340</p>
                    </div>
                    <span class="badge badge-completed">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"></circle>
                      </svg>
                      Completed
                    </span>
                  </div>

                  <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
                    Annual AC maintenance and cleaning. Technician was excellent!
                  </p>

                  <div class="flex flex-wrap gap-4 text-sm text-neutral-500">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>Nov 15, 2024</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>$45.00 (Paid)</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>Hassan Khoury</span>
                    </div>
                    <div class="flex items-center gap-1 text-warning-500">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span>5.0</span>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2 md:flex-col">
                  <a href="/booking/12340" class="btn btn-outline btn-sm w-full">View Details</a>
                  <button type="button" class="btn btn-ghost btn-sm w-full">Book Again</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-8">
          <p class="text-sm text-neutral-500">Showing 1-3 of 12 bookings</p>
          <div class="flex items-center gap-1">
            <button type="button" class="btn btn-ghost btn-icon-sm" disabled>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button type="button" class="btn btn-primary btn-sm">1</button>
            <button type="button" class="btn btn-ghost btn-sm">2</button>
            <button type="button" class="btn btn-ghost btn-sm">3</button>
            <button type="button" class="btn btn-ghost btn-sm">4</button>
            <button type="button" class="btn btn-ghost btn-icon-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 
          EMPTY STATE USAGE:
          ====================
          Show this section when the user has no bookings.
          
          In your script, use a condition like:
          
          <template v-if="bookings.length === 0">
            <!-- Empty state content here -->
          </template>
          <template v-else>
            <!-- Bookings list content here -->
          </template>
          
          Or use v-show for simple toggle:
          <div v-show="bookings.length === 0" class="empty-state">
            ...
          </div>
        -->
        <!-- Empty State (when no bookings) -->
        <!--
        <div class="empty-state">
          <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="empty-state-title">No bookings yet</h3>
          <p class="empty-state-description">You haven't made any bookings yet. Book a technician to get started.</p>
          <a href="/book-technician" class="btn btn-primary">Book a Technician</a>
        </div>
        -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MyBookingsView'
}
</script>

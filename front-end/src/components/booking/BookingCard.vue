<template>
  <!-- Booking Card Component -->
  <div class="card">
    <div class="card-body">
      <!-- Header with Status -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-neutral-900">Washing Machine Repair</h3>
          <p class="text-sm text-neutral-500">Booking #12345</p>
        </div>
        <span class="badge badge-pending">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3"></circle>
          </svg>
          Pending
        </span>
      </div>

      <!-- Booking Details -->
      <div class="space-y-3 mb-4">
        <!-- Date & Time -->
        <div class="flex items-center gap-3 text-sm">
          <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span class="text-neutral-600">December 15, 2024 at 10:00 AM</span>
        </div>

        <!-- Technician (if assigned) -->
        <div class="flex items-center gap-3 text-sm">
          <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="text-neutral-600">Awaiting technician assignment</span>
        </div>

        <!-- Issue Description -->
        <div class="flex items-start gap-3 text-sm">
          <svg class="w-5 h-5 text-neutral-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span class="text-neutral-600">Machine is making loud noises during spin cycle and leaking water.</span>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-3 text-sm">
          <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-neutral-900 font-medium">$50.00 USD</span>
          <span class="badge badge-warning text-xs">Payment Pending</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <a href="/booking/12345" class="btn btn-outline btn-sm flex-1">View Details</a>
        <button type="button" class="btn btn-primary btn-sm flex-1">Pay Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingCard'
}
</script>

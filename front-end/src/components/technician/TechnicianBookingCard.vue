<template>
  <div class="card">
    <div class="card-body">
      <div class="flex flex-col md:flex-row md:items-start gap-4">
        <!-- Appliance Icon -->
        <div class="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary-50 rounded-xl">
          <img 
            :src="`/images/icons/${applianceIcon}.svg`" 
            :alt="applianceType" 
            class="w-8 h-8"
          >
        </div>

        <!-- Booking Details -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="text-lg font-semibold text-neutral-900">
                {{ applianceType }} {{ issueType }}
              </h3>
              <p class="text-sm text-neutral-500">Booking #{{ bookingId }}</p>
            </div>
            <span class="badge" :class="statusClass">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3"></circle>
              </svg>
              {{ statusText }}
            </span>
          </div>

          <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
            {{ description }}
          </p>

          <!-- Info Grid -->
          <div class="flex flex-wrap gap-4 text-sm text-neutral-500">
            <!-- Location -->
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ location }}</span>
            </div>

            <!-- Date & Time -->
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formattedDate }}</span>
            </div>

            <!-- Customer Name -->
            <div class="flex items-center gap-1" v-if="customerName">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ customerName }}</span>
            </div>

            <!-- Price -->
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>${{ price }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 md:flex-col">
          <button 
            v-if="showAccept"
            type="button" 
            class="btn btn-primary btn-sm w-full"
            @click="$emit('accept', bookingId)"
          >
            Accept
          </button>
          <button 
            v-if="showStart"
            type="button" 
            class="btn btn-secondary btn-sm w-full"
            @click="$emit('start', bookingId)"
          >
            Start Job
          </button>
          <button 
            v-if="showComplete"
            type="button" 
            class="btn btn-success btn-sm w-full"
            @click="$emit('complete', bookingId)"
          >
            Mark Complete
          </button>
          <button 
            v-if="showDecline"
            type="button" 
            class="btn btn-ghost btn-sm w-full text-error-600 hover:bg-error-50"
            @click="$emit('decline', bookingId)"
          >
            Decline
          </button>
          <a 
            :href="`/technician-dashboard/booking/${bookingId}`" 
            class="btn btn-outline btn-sm w-full"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechnicianBookingCard',
  props: {
    bookingId: {
      type: [String, Number],
      required: true
    },
    applianceType: {
      type: String,
      required: true
    },
    applianceIcon: {
      type: String,
      default: 'washing-machine'
    },
    issueType: {
      type: String,
      default: 'Repair'
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    customerName: {
      type: String,
      default: null
    },
    price: {
      type: [String, Number],
      required: true
    },
    status: {
      type: String,
      default: 'pending',
      validator: (value) => ['pending', 'confirmed', 'in_progress', 'completed', 'declined'].includes(value)
    }
  },
  computed: {
    formattedDate() {
      return `${this.date} at ${this.time}`
    },
    statusClass() {
      const statusMap = {
        'pending': 'badge-pending',
        'confirmed': 'badge-confirmed',
        'in_progress': 'badge-in-progress',
        'completed': 'badge-completed',
        'declined': 'badge-cancelled'
      }
      return statusMap[this.status] || 'badge-pending'
    },
    statusText() {
      const textMap = {
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'in_progress': 'In Progress',
        'completed': 'Completed',
        'declined': 'Declined'
      }
      return textMap[this.status] || 'Pending'
    },
    showAccept() {
      return this.status === 'pending'
    },
    showStart() {
      return this.status === 'confirmed'
    },
    showComplete() {
      return this.status === 'in_progress'
    },
    showDecline() {
      return this.status === 'pending'
    }
  },
  emits: ['accept', 'decline', 'start', 'complete']
}
</script>

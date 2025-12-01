<template>
  <!-- 
    Booking Status Badge Component
    
    Usage: Pass a status prop to display the appropriate badge
    Available statuses: pending, confirmed, in-progress, completed, cancelled
    
    Example: <BookingStatusBadge status="pending" />
  -->
  
  <!-- Dynamic Status Badge - The actual status will be passed as a prop -->
  <span class="badge" :class="badgeClass">
    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="3"></circle>
    </svg>
    {{ statusText }}
  </span>
</template>

<script>
export default {
  name: 'BookingStatusBadge',
  props: {
    status: {
      type: String,
      default: 'pending',
      validator: (value) => ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].includes(value)
    }
  },
  computed: {
    badgeClass() {
      const statusClasses = {
        'pending': 'badge-pending',
        'confirmed': 'badge-confirmed',
        'in-progress': 'badge-in-progress',
        'completed': 'badge-completed',
        'cancelled': 'badge-cancelled'
      }
      return statusClasses[this.status] || 'badge-pending'
    },
    statusText() {
      const statusTexts = {
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
      }
      return statusTexts[this.status] || 'Pending'
    }
  }
}
</script>

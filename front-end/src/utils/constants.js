// Application constants

// Helper function to get image URL (works in both dev and production)
// In dev: proxy forwards to backend
// In production: served from same domain
export const getImageUrl = (filename) => {
  if (!filename) return null
  return `/images/appliance-categories/${filename}`
}

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const STATUS_COLORS = {
  pending: 'yellow',
  confirmed: 'blue',
  'in-progress': 'purple',
  completed: 'green',
  cancelled: 'red'
}

export const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled'
}

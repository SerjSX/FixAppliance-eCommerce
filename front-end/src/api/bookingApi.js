// User booking API calls
import api from './axios'

export const bookingApi = {
  // Request a new booking
  request: (bookingData) => api.post('/user/booking/request', bookingData),

  // Pay for a booking - backend expects: bookingID, transactionID (optional)
  pay: (bookingId, transactionId = null) => api.post('/user/booking/pay', { 
    bookingID: bookingId,
    transactionID: transactionId
  }),

  // Cancel a pending booking - backend expects: bookingID
  cancel: (bookingId) => api.post('/user/booking/cancel', { bookingID: bookingId }),

  // Rate a completed booking - backend expects: bookingID, ratingScore (1-5), reviewText (min 15 chars)
  rate: (bookingId, ratingScore, reviewText) => api.post('/user/booking/rate', { 
    bookingID: bookingId, 
    ratingScore: ratingScore, 
    reviewText: reviewText 
  }),

  // Get pending bookings
  getPending: () => api.get('/user/booking/pending'),

  // Get confirmed bookings
  getConfirmed: () => api.get('/user/booking/confirmed'),

  // Get in-progress bookings
  getInProgress: () => api.get('/user/booking/in-progress'),

  // Get completed bookings
  getCompleted: () => api.get('/user/booking/completed'),

  // Get cancelled bookings
  getCancelled: () => api.get('/user/booking/cancelled'),

  // Get all bookings by fetching each status
  getAll: async () => {
    const [pending, confirmed, inProgress, completed, cancelled] = await Promise.all([
      api.get('/user/booking/pending'),
      api.get('/user/booking/confirmed'),
      api.get('/user/booking/in-progress'),
      api.get('/user/booking/completed'),
      api.get('/user/booking/cancelled')
    ])
    
    // Helper to normalize booking data from backend format to frontend format
    const normalizeBooking = (booking, status) => ({
      id: booking.Booking_ID,
      scheduledDate: booking['Scheduled Date'],
      scheduledTime: booking['Scheduled Time'],
      price: booking['Total Price'],
      applianceType: booking["Appliance's Name (EN)"],
      applianceTypeAR: booking["Appliance's Name (AR)"],
      description: booking['Issue Description'],
      technicianName: booking["Technician's First Name"] && booking["Technician's Last Name"] 
        ? `${booking["Technician's First Name"]} ${booking["Technician's Last Name"]}`
        : null,
      technicianPhone: booking["Technician's Phone Number"],
      paymentStatus: booking['Payment Status'],
      paymentMethod: booking['Payment Method'],
      isPaid: booking['Payment Status'] === 'completed',
      rating: booking['Rating Score'] || null,
      reviewText: booking['Review Text'] || null,
      isRated: booking['Rating Score'] !== null && booking['Rating Score'] !== undefined,
      status: status,
      createdAt: booking["Created At"]
    })
    
    const normalizeBookings = (bookings, status) => 
      (bookings || []).map(b => normalizeBooking(b, status))
    
    return {
      pending: normalizeBookings(pending.data?.bookings, 'pending'),
      confirmed: normalizeBookings(confirmed.data?.bookings, 'confirmed'),
      inProgress: normalizeBookings(inProgress.data?.bookings, 'in-progress'),
      completed: normalizeBookings(completed.data?.bookings, 'completed'),
      cancelled: normalizeBookings(cancelled.data?.bookings, 'cancelled')
    }
  }
}

export default bookingApi

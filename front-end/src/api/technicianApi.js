// Technician API calls
import api from './axios'

export const technicianApi = {
  // Auth
  register: (data) => api.post('/technician/register', data),
  login: (credentials) => api.post('/technician/login', credentials),
  logout: () => api.post('/technician/logout'),

  // Profile
  getProfile: () => api.get('/technician/profile'),
  updateProfile: (data) => api.put('/technician/profile', data),

  // Specialties - backend expects applianceCategoryID and yearsOfExperience
  addSpecialty: (categoryId, yearsOfExperience = 0, certificateDate = null) => 
    api.post('/technician/specialty', { 
      applianceCategoryID: categoryId, 
      yearsOfExperience,
      certificateDate 
    }),
  getSpecialties: () => api.get('/technician/specialties'),
  removeSpecialty: (categoryId) => api.delete(`/technician/specialty/${categoryId}`),

  // Service Areas - backend expects serviceAreaID and priority
  addServiceArea: (areaId, priority = 1) => 
    api.post('/technician/service-area', { 
      serviceAreaID: areaId,
      priority 
    }),
  getServiceAreas: () => api.get('/technician/service-areas'),
  removeServiceArea: (areaId) => api.delete(`/technician/service-area/${areaId}`),

  // Bookings - backend expects bookingID
  getPendingBookings: () => api.get('/technician/booking/get-pendings'),
  getActiveBookings: () => api.get('/technician/booking/active'),
  getCompletedBookings: () => api.get('/technician/booking/completed'),
  acceptBooking: (bookingId) => api.post('/technician/booking/accept', { bookingID: bookingId }),
  declineBooking: (bookingId) => api.post('/technician/booking/decline', { bookingID: bookingId }),
  startBooking: (bookingId) => api.post('/technician/booking/start', { bookingID: bookingId }),
  completeBooking: (bookingId) => api.post('/technician/booking/complete', { bookingID: bookingId }),

  // Earnings
  getEarnings: () => api.get('/technician/earnings')
}

export default technicianApi

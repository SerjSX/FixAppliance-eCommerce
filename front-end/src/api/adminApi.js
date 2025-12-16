// Admin API calls
import api from './axios'

export const adminApi = {
  // Authentication
  login: (credentials) => api.post('/admin/login', credentials),
  logout: () => api.post('/admin/logout'),

  // Appliance Management
  addCategory: (formData) => api.post('/admin/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  // Note: Use applianceApi.getCategories() to fetch categories
  addApplianceType: (categoryId, typeData) => 
    api.post(`/admin/categories/${categoryId}/types`, typeData),
  updateTypePrice: (typeId, priceData) => 
    api.patch(`/admin/types/${typeId}/price`, priceData),

  // Booking Monitoring
  getCompletedUnpaid: (days = 7) => 
    api.get(`/admin/bookings/completed-unpaid?days=${days}`),
  getAcceptedIncomplete: (days = 3) => 
    api.get(`/admin/bookings/accepted-incomplete?days=${days}`),
  getPaidOverdue: () => 
    api.get('/admin/bookings/paid-overdue'),

  // Technician Management
  getAllTechnicians: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return api.get(`/admin/technicians${query ? `?${query}` : ''}`)
  },
  getLowRatedTechnicians: (threshold = 3) => 
    api.get(`/admin/technicians/low-rated?threshold=${threshold}`),
  getHighPerformers: (threshold = 3) => 
    api.get(`/admin/technicians/high-performers?threshold=${threshold}`),
  getUnverifiedTechnicians: () => 
    api.get('/admin/technicians/unverified'),
  verifyTechnician: (technicianId) => 
    api.patch(`/admin/technicians/${technicianId}/verify`),
  revokeVerification: (technicianId) => 
    api.patch(`/admin/technicians/${technicianId}/revoke-verification`),
  deactivateTechnician: (technicianId) => 
    api.patch(`/admin/technicians/${technicianId}/deactivate`),
  activateTechnician: (technicianId) => 
    api.patch(`/admin/technicians/${technicianId}/activate`),
  getTechnicianDetails: (technicianId) => 
    api.get(`/admin/technicians/${technicianId}`),

  // Financial Reporting
  getFinancials: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return api.get(`/admin/financials${query ? `?${query}` : ''}`)
  },

  // Analytics & User Management
  getUserDetails: (userId) => 
    api.get(`/admin/users/${userId}`)
}

export default adminApi

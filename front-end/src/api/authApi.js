// User authentication API calls
import api from './axios'

export const authApi = {
  // Register new user
  register: (userData) => api.post('/user/register', userData),

  // Login user
  login: (credentials) => api.post('/user/login', credentials),

  // Logout user
  logout: () => api.post('/user/logout'),

  // Get user profile
  getProfile: () => api.get('/user/profile'),

  // Update user profile
  updateProfile: (data) => api.put('/user/profile', data)
}

export default authApi

// Axios base configuration with interceptors
import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Proxy handles routing to backend
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred'
    return Promise.reject({ message, status: error.response?.status })
  }
)

export default api

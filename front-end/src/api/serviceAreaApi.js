// Public service area API calls
import api from './axios'

export const serviceAreaApi = {
  // Get all active service areas
  getAll: () => api.get('/service-areas')
}

export default serviceAreaApi

// Public appliance API calls
import api from './axios'

export const applianceApi = {
  // Get all appliance categories
  getCategories: () => api.get('/appliances/categories'),

  // Get appliance types by category
  getTypes: (categoryId) => api.get('/appliances/types', { params: { categoryId } })
}

export default applianceApi

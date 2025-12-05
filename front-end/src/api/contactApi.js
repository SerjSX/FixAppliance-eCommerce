// Contact form API calls
import api from './axios'

export const contactApi = {
  // Submit contact form
  submit: (formData) => api.post('/contact', formData)
}

export default contactApi

// Technician auth store
import { defineStore } from 'pinia'
import { technicianApi } from '@/api'

export const useTechnicianAuthStore = defineStore('technicianAuth', {
  state: () => ({
    technician: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    currentTechnician: (state) => state.technician,
    isLoading: (state) => state.loading
  },

  actions: {
    // Register technician (does not auto-login, technician must login after registration)
    async register(data) {
      this.loading = true
      this.error = null
      try {
        const { data: response } = await technicianApi.register(data)
        // Don't set technician or isAuthenticated - technician must login after registration
        return response
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Login technician
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await technicianApi.login(credentials)
        this.technician = data.technician
        this.isAuthenticated = true
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Logout technician
    async logout() {
      try {
        await technicianApi.logout()
      } finally {
        this.technician = null
        this.isAuthenticated = false
      }
    },

    // Fetch profile
    async fetchProfile() {
      this.loading = true
      try {
        const { data } = await technicianApi.getProfile()
        this.technician = data
        this.isAuthenticated = true
        return data
      } catch (err) {
        this.isAuthenticated = false
        throw err
      } finally {
        this.loading = false
      }
    },

    // Update profile
    async updateProfile(profileData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await technicianApi.updateProfile(profileData)
        this.technician = { ...this.technician, ...data }
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})

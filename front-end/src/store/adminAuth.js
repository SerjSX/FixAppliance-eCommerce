// Admin auth store
import { defineStore } from 'pinia'
import { adminApi } from '@/api/adminApi'

export const useAdminAuthStore = defineStore('adminAuth', {
  state: () => ({
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    currentAdmin: (state) => state.admin,
    isLoading: (state) => state.loading
  },

  actions: {
    // Login admin
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.login(credentials)
        this.admin = data.admin
        this.isAuthenticated = true
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Logout admin
    async logout() {
      this.loading = true
      this.error = null
      try {
        await adminApi.logout()
        this.admin = null
        this.isAuthenticated = false
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Initialize admin auth from cookie
    initializeAuth(adminData) {
      if (adminData) {
        this.admin = adminData
        this.isAuthenticated = true
      }
    },

    // Clear auth state
    clearAuth() {
      this.admin = null
      this.isAuthenticated = false
      this.error = null
    }
  }
})

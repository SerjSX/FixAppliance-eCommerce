// Auth store for user authentication
import { defineStore } from 'pinia'
import { authApi } from '@/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    // Get current user
    currentUser: (state) => state.user,
    // Check if loading
    isLoading: (state) => state.loading
  },

  actions: {
    // Register new user (does not auto-login, user must login after registration)
    async register(userData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authApi.register(userData)
        // Don't set user or isAuthenticated - user must login after registration
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Login user
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authApi.login(credentials)
        this.user = data.user
        this.isAuthenticated = true
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Logout user
    async logout() {
      try {
        await authApi.logout()
      } finally {
        this.user = null
        this.isAuthenticated = false
      }
    },

    // Fetch user profile
    async fetchProfile() {
      this.loading = true
      try {
        const { data } = await authApi.getProfile()
        this.user = data
        this.isAuthenticated = true
        return data
      } catch (err) {
        this.isAuthenticated = false
        throw err
      } finally {
        this.loading = false
      }
    },

    // Update user profile
    async updateProfile(profileData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authApi.updateProfile(profileData)
        this.user = { ...this.user, ...data }
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

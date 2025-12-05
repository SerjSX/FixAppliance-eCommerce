// UI store for alerts and loading states
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    alert: null,
    globalLoading: false
  }),

  actions: {
    // Show success alert
    showSuccess(message, title = '') {
      this.alert = { type: 'success', message, title }
      setTimeout(() => this.clearAlert(), 5000)
    },

    // Show error alert
    showError(message, title = '') {
      this.alert = { type: 'error', message, title }
      setTimeout(() => this.clearAlert(), 5000)
    },

    // Show warning alert
    showWarning(message, title = '') {
      this.alert = { type: 'warning', message, title }
      setTimeout(() => this.clearAlert(), 5000)
    },

    // Show info alert
    showInfo(message, title = '') {
      this.alert = { type: 'info', message, title }
      setTimeout(() => this.clearAlert(), 5000)
    },

    // Clear alert
    clearAlert() {
      this.alert = null
    },

    // Set global loading
    setLoading(value) {
      this.globalLoading = value
    }
  }
})

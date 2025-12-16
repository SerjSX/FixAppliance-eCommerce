// Admin operations store
import { defineStore } from 'pinia'
import { adminApi } from '@/api/adminApi'
import { applianceApi } from '@/api/applianceApi'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // Appliance management
    categories: [],
    applianceTypes: [],

    // Booking monitoring
    completedUnpaidBookings: [],
    acceptedIncompleteBookings: [],
    paidOverdueBookings: [],

    // Technician management
    lowRatedTechnicians: [],
    highPerformers: [],
    unverifiedTechnicians: [],
    allTechnicians: [],
    techniciansPagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0
    },

    // Financial data
    financialSummary: null,
    
    loading: false,
    error: null
  }),

  actions: {
    // Appliance Management
    async createCategory(formData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.addCategory(formData)
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      this.loading = true
      this.error = null
      try {
        const { data } = await applianceApi.getCategories()
        this.categories = data.data || []
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async createApplianceType(categoryId, nameEN, nameAR, basePrice, averageRepairTimeMin) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.addApplianceType(categoryId, {
          nameEN,
          nameAR,
          basePrice,
          averageRepairTimeMin
        })
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateTypePrice(typeId, basePrice) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.updateTypePrice(typeId, { basePrice })
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Booking Monitoring
    async fetchCompletedUnpaid(days = 7) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getCompletedUnpaid(days)
        this.completedUnpaidBookings = data.data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchAcceptedIncomplete(days = 3) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getAcceptedIncomplete(days)
        this.acceptedIncompleteBookings = data.data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchPaidOverdue() {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getPaidOverdue()
        this.paidOverdueBookings = data.data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Technician Management
    async fetchAllTechnicians(params = {}) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getAllTechnicians(params)
        this.allTechnicians = data.data || []
        this.techniciansPagination = data.pagination || {
          page: 1,
          limit: 20,
          total: 0,
          pages: 0
        }
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchLowRatedTechnicians(threshold = 3) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getLowRatedTechnicians(threshold)
        this.lowRatedTechnicians = data.data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchHighPerformers(threshold = 3) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getHighPerformers(threshold)
        this.highPerformers = data.data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchHighPerformanceTechnicians(threshold = 3) {
      return this.fetchHighPerformers(threshold)
    },

    async fetchUnverifiedTechnicians() {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getUnverifiedTechnicians()
        this.unverifiedTechnicians = data.data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async verifyTechnician(technicianId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.verifyTechnician(technicianId)
        // Remove from unverified list
        this.unverifiedTechnicians = this.unverifiedTechnicians.filter(
          t => t.Technician_ID !== technicianId
        )
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async revokeVerification(technicianId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.revokeVerification(technicianId)
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchTechnicianDetails(technicianId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getTechnicianDetails(technicianId)
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async deactivateTechnician(technicianId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.deactivateTechnician(technicianId)
        // Update in allTechnicians list if present
        const index = this.allTechnicians.findIndex(t => t.Technician_ID === technicianId)
        if (index !== -1) {
          this.allTechnicians[index].isActive = false
        }
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async activateTechnician(technicianId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.activateTechnician(technicianId)
        // Update in allTechnicians list if present
        const index = this.allTechnicians.findIndex(t => t.Technician_ID === technicianId)
        if (index !== -1) {
          this.allTechnicians[index].isActive = true
        }
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async verifyTechnicianFromList(technicianId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.verifyTechnician(technicianId)
        // Update in allTechnicians list if present
        const index = this.allTechnicians.findIndex(t => t.Technician_ID === technicianId)
        if (index !== -1) {
          this.allTechnicians[index].Verified = true
        }
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async revokeVerificationFromList(technicianId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.revokeVerification(technicianId)
        // Update in allTechnicians list if present
        const index = this.allTechnicians.findIndex(t => t.Technician_ID === technicianId)
        if (index !== -1) {
          this.allTechnicians[index].Verified = false
        }
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Financial Reporting
    async fetchFinancials(startDate = null, endDate = null) {
      this.loading = true
      this.error = null
      try {
        const params = {}
        if (startDate) params.startDate = startDate
        if (endDate) params.endDate = endDate
        
        const { data } = await adminApi.getFinancials(params)
        this.financialSummary = data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Analytics
    async fetchUserDetails(userId) {
      this.loading = true
      this.error = null
      try {
        const { data } = await adminApi.getUserDetails(userId)
        return data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },
  }
})

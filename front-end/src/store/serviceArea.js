// Service areas store
import { defineStore } from 'pinia'
import { serviceAreaApi } from '@/api'

export const useServiceAreaStore = defineStore('serviceArea', {
  state: () => ({
    areas: [],
    loading: false,
    error: null
  }),

  actions: {
    // Fetch all service areas
    async fetchAll() {
      this.loading = true
      try {
        const { data } = await serviceAreaApi.getAll()
        const rawAreas = data?.data || []
        this.areas = rawAreas.map(area => ({
          id: area.Area_ID,
          name: area.NameEN,
          nameAr: area.NameAR,
          region: area.Region,
          isActive: area.isActive
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})

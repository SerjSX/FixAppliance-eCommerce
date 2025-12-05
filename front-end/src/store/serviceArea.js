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
        // Normalize backend field names (Area_ID, NameEN) to frontend (id, name)
        const rawAreas = data?.data || data || []
        this.areas = rawAreas.map(area => ({
          id: area.Area_ID || area.areaId || area.id,
          name: area.NameEN || area.nameEN || area.name,
          nameAr: area.NameAR || area.nameAR || area.nameAr,
          region: area.Region || area.region,
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

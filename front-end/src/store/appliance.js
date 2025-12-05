// Appliance data store
import { defineStore } from 'pinia'
import { applianceApi } from '@/api'

export const useApplianceStore = defineStore('appliance', {
  state: () => ({
    categories: [],
    types: [],
    selectedCategoryId: null,
    loading: false,
    error: null
  }),

  getters: {
    // Get types for selected category
    filteredTypes: (state) => {
      if (!state.selectedCategoryId) return state.types
      return state.types.filter(t => t.categoryId === state.selectedCategoryId)
    }
  },

  actions: {
    // Fetch categories
    async fetchCategories() {
      this.loading = true
      try {
        const { data } = await applianceApi.getCategories()
        // Normalize: Backend returns Category_ID, NameEN, NameAR
        this.categories = (data.data || []).map(cat => ({
          id: cat.Category_ID,
          name: cat.NameEN,
          nameAR: cat.NameAR,
          isActive: cat.isActive
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // Fetch types by category
    async fetchTypes(categoryId) {
      this.loading = true
      this.selectedCategoryId = categoryId
      try {
        const { data } = await applianceApi.getTypes(categoryId)
        // Normalize: Backend returns Appliance_Type_ID, Category_ID, nameEN, nameAR, Base_Price, etc.
        this.types = (data.data || []).map(type => ({
          id: type.Appliance_Type_ID,
          categoryId: type.Category_ID,
          name: type.nameEN,
          nameAR: type.nameAR,
          basePrice: type.Base_Price,
          avgRepairTime: type.Average_Repair_Time_Min,
          description: type.DescriptionEN,
          descriptionAR: type.DescriptionAR,
          isActive: type.isActive
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})

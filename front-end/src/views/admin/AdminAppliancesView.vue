<template>
  <div class="min-h-screen flex overflow-x-hidden">
    <AdminSidebar />

    <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
      <!-- Top Bar -->
      <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4 sticky top-0 z-10">
        <div class="ml-14 lg:ml-0">
          <h1 class="text-xl font-semibold text-neutral-900">Appliance Management</h1>
          <p class="text-sm text-neutral-500">Add and manage appliance categories and types</p>
        </div>
      </header>

      <div class="p-4 sm:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Add Category Form -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Add Category</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="addCategory" class="space-y-4">
                <div>
                  <label class="form-label">Category Name (English)</label>
                  <input v-model="categoryForm.nameEN" type="text" class="form-input"
                    placeholder="e.g., Washing Machine" required />
                </div>

                <div>
                  <label class="form-label">Category Name (Arabic)</label>
                  <input v-model="categoryForm.nameAR" type="text" class="form-input" placeholder="مثل: غسالة" />
                </div>

                <div>
                  <label class="form-label">Category Icon</label>
                  <input @change="handleIconUpload" type="file" accept="image/*" class="form-input" required />
                  <p class="text-xs text-neutral-500 mt-1">Max 2MB, PNG/JPG/SVG</p>
                </div>

                <button type="submit" :disabled="categoryLoading" class="btn btn-primary w-full">
                  {{ categoryLoading ? 'Adding...' : 'Add Category' }}
                </button>

                <div v-if="categoryError" class="alert alert-error">
                  {{ categoryError }}
                </div>
                <div v-if="categorySuccess" class="alert alert-success">
                  Category added successfully!
                </div>
              </form>
            </div>
          </div>

          <!-- Add Appliance Type Form -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Add Appliance Type</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="addApplianceType" class="space-y-4">
                <div>
                  <label class="form-label">Category</label>
                  <select v-model="typeForm.categoryId" class="form-input" required>
                    <option value="">Select a category</option>
                    <option v-for="cat in categories" :key="cat.Category_ID" :value="cat.Category_ID">
                      {{ cat.NameEN }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="form-label">Type Name (English)</label>
                  <input v-model="typeForm.nameEN" type="text" class="form-input" placeholder="e.g., Front Load"
                    required />
                </div>

                <div>
                  <label class="form-label">Type Name (Arabic)</label>
                  <input v-model="typeForm.nameAR" type="text" class="form-input" placeholder="مثل: أمامي" />
                </div>

                <div>
                  <label class="form-label">Base Price ($)</label>
                  <input v-model.number="typeForm.basePrice" type="number" step="0.01" class="form-input"
                    placeholder="50.00" required />
                </div>

                <div>
                  <label class="form-label">Avg Repair Time (minutes)</label>
                  <input v-model.number="typeForm.averageRepairTimeMin" type="number" class="form-input"
                    placeholder="60" required />
                </div>

                <button type="submit" :disabled="typeLoading" class="btn btn-primary w-full">
                  {{ typeLoading ? 'Adding...' : 'Add Type' }}
                </button>

                <div v-if="typeError" class="alert alert-error">
                  {{ typeError }}
                </div>
                <div v-if="typeSuccess" class="alert alert-success">
                  Type added successfully!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useAdminStore } from '@/store/admin'
import { computed } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'

export default {
  name: 'AdminAppliancesView',
  components: { AdminSidebar },
  setup() {
    const adminStore = useAdminStore()
    const categories = computed(() => adminStore.categories || [])
    return { adminStore, categories }
  },
  data() {
    return {
      categoryForm: {
        nameEN: '',
        nameAR: '',
        icon: null
      },
      typeForm: {
        categoryId: '',
        nameEN: '',
        nameAR: '',
        basePrice: null,
        averageRepairTimeMin: null
      },
      categoryLoading: false,
      typeLoading: false,
      categoryError: null,
      typeError: null,
      categorySuccess: false,
      typeSuccess: false
    }
  },
  async mounted() {
    await this.loadCategories()
  },
  methods: {
    async loadCategories() {
      try {
        await this.adminStore.fetchCategories()
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    },
    handleIconUpload(e) {
      this.categoryForm.icon = e.target.files[0]
    },
    async addCategory() {
      this.categoryLoading = true
      this.categoryError = null
      this.categorySuccess = false

      const formData = new FormData()
      formData.append('nameEN', this.categoryForm.nameEN)
      formData.append('nameAR', this.categoryForm.nameAR)
      formData.append('icon', this.categoryForm.icon)

      try {
        await this.adminStore.createCategory(formData)
        this.categorySuccess = true
        this.categoryForm = { nameEN: '', nameAR: '', icon: null }
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
        await this.loadCategories()
        setTimeout(() => (this.categorySuccess = false), 3000)
      } catch (error) {
        this.categoryError = error.message || 'Failed to add category'
      } finally {
        this.categoryLoading = false
      }
    },
    async addApplianceType() {
      if (!this.typeForm.categoryId) {
        this.typeError = 'Please select a category'
        return
      }

      this.typeLoading = true
      this.typeError = null
      this.typeSuccess = false

      try {
        await this.adminStore.createApplianceType(
          this.typeForm.categoryId,
          this.typeForm.nameEN,
          this.typeForm.nameAR,
          this.typeForm.basePrice,
          this.typeForm.averageRepairTimeMin
        )
        this.typeSuccess = true
        this.typeForm = {
          categoryId: '',
          nameEN: '',
          nameAR: '',
          basePrice: null,
          averageRepairTimeMin: null
        }
        setTimeout(() => (this.typeSuccess = false), 3000)
      } catch (error) {
        this.typeError = error.message || 'Failed to add type'
      } finally {
        this.typeLoading = false
      }
    }
  }
}
</script>

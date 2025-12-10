<template>
  <div :class="isAuthenticated ? 'min-h-screen flex' : 'main-content'">
    <!-- Sidebar (only when logged in) -->
    <UserSidebar v-if="isAuthenticated" />

    <!-- Main Content -->
    <main :class="isAuthenticated ? 'flex-1 lg:ml-64 bg-neutral-50 min-h-screen' : ''">
      <!-- Top Bar (only when logged in) -->
      <header v-if="isAuthenticated" class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="ml-14 lg:ml-0">
            <h1 class="text-xl font-semibold text-neutral-900">Book a Technician</h1>
            <p class="text-sm text-neutral-500">Get your appliance fixed by a verified professional</p>
          </div>
        </div>
      </header>

      <!-- Page Header (only when NOT logged in) -->
      <div v-if="!isAuthenticated" class="page-header">
        <div class="container-wide">
          <nav class="breadcrumb mb-4">
            <router-link to="/" class="breadcrumb-link">Home</router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">Book a Technician</span>
          </nav>
          <h1 class="page-title">Book a Technician</h1>
          <p class="page-description">Get your appliance fixed by a verified professional</p>
        </div>
      </div>

      <!-- Booking Form Section -->
      <div :class="isAuthenticated ? 'p-6' : 'section-sm'" ref="formTop">
        <div :class="isAuthenticated ? '' : 'container-wide'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Form -->
          <div class="lg:col-span-2">
            <div class="card">
              <div class="card-body">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <!-- Error Alert -->
                  <AlertMessage 
                    v-if="error" 
                    type="error" 
                    :message="error"
                    @dismiss="error = null"
                  />

                  <!-- Success Alert -->
                  <AlertMessage 
                    v-if="success" 
                    type="success" 
                    :message="success"
                    :dismissible="false"
                  />

                  <!-- Appliance Selection -->
                  <div class="form-section">
                    <h3 class="form-section-title">Select Your Appliance</h3>
                    
                    <!-- Loading -->
                    <div v-if="loadingAppliances" class="flex items-center justify-center py-8">
                      <div class="spinner spinner-lg"></div>
                    </div>

                    <!-- Category Tabs + Accordion Style -->
                    <div v-else>
                      <!-- Category Tabs -->
                      <div class="flex flex-wrap gap-2 mb-4">
                        <button
                          v-for="category in groupedAppliances"
                          :key="category.id"
                          type="button"
                          @click="selectCategory(category.id)"
                          :class="[
                            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                            selectedCategoryId === category.id
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50'
                          ]"
                        >
                          <img 
                            v-if="category.fileName" 
                            class="w-5 h-5" 
                            :src="'/images/appliance-categories/' + category.fileName"
                            :alt="category.name"
                          />
                          <span>{{ category.name }}</span>
                          <span class="text-xs opacity-75">({{ category.types.length }})</span>
                        </button>
                      </div>

                      <!-- Selected Category Types -->
                      <div v-if="selectedCategory" class="border border-neutral-200 rounded-lg p-4 bg-white">
                        <div class="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-100">
                          <img 
                            v-if="selectedCategory.fileName" 
                            class="w-6 h-6" 
                            :src="'/images/appliance-categories/' + selectedCategory.fileName"
                            :alt="selectedCategory.name"
                          />
                          <h4 class="font-semibold text-neutral-900">{{ selectedCategory.name }}</h4>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3" role="radiogroup" aria-label="Select appliance type">
                          <label v-for="type in selectedCategory.types" :key="type.id" class="relative cursor-pointer">
                            <input 
                              type="radio" 
                              name="appliance-type" 
                              :value="type.id" 
                              v-model="form.applianceTypeId" 
                              class="peer sr-only" 
                              :aria-label="type.name"
                            >
                            <div class="p-3 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300 hover:shadow-sm">
                              <span class="text-sm font-medium block mb-1">{{ type.name }}</span>
                              <span class="text-xs text-neutral-500">${{ type.basePrice?.toFixed(2) || '0.00' }}</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <!-- Prompt to select category -->
                      <div v-else class="border border-dashed border-neutral-300 rounded-lg p-6 text-center bg-neutral-50">
                        <svg class="w-10 h-10 mx-auto text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                        </svg>
                        <p class="text-neutral-500 text-sm">Select a category above to view available appliances</p>
                      </div>

                      <!-- Selected Appliance Display -->
                      <div v-if="selectedAppliance" class="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg flex items-center gap-3">
                        <svg class="w-5 h-5 text-success-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <div class="flex-1">
                          <span class="text-sm font-medium text-success-800">Selected: {{ selectedAppliance.name }}</span>
                          <span class="text-xs text-success-600 ml-2">${{ selectedAppliance.basePrice?.toFixed(2) }}</span>
                        </div>
                        <button type="button" @click="form.applianceTypeId = null" class="text-success-600 hover:text-success-800">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Issue Description -->
                  <div class="form-section">
                    <h3 class="form-section-title">Describe the Issue</h3>
                    
                    <div class="form-group">
                      <label for="issue-description" class="form-label form-label-required">
                        What's the problem?
                      </label>
                      <textarea 
                        id="issue-description" 
                        v-model="form.description"
                        class="form-textarea" 
                        rows="3"
                        placeholder="Describe the problem with your appliance..."
                        required
                      ></textarea>
                    </div>

                    <!-- Quick Issue Tags -->
                    <div class="flex flex-wrap gap-2">
                      <button type="button" @click="appendToDescription('Not starting')" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Not starting</button>
                      <button type="button" @click="appendToDescription('Strange noise')" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Strange noise</button>
                      <button type="button" @click="appendToDescription('Leaking water')" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Leaking water</button>
                      <button type="button" @click="appendToDescription('Not cooling')" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Not cooling</button>
                      <button type="button" @click="appendToDescription('Not heating')" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Not heating</button>
                      <button type="button" @click="appendToDescription('Electrical issue')" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Electrical issue</button>
                    </div>
                  </div>

                  <!-- Date and Time Selection -->
                  <div class="form-section">
                    <h3 class="form-section-title">Schedule Your Appointment</h3>
                    
                    <div class="form-row">
                      <div class="form-group">
                        <label for="booking-date" class="form-label form-label-required">
                          Preferred Date
                        </label>
                        <input 
                          type="date" 
                          id="booking-date" 
                          v-model="form.scheduledDate"
                          :min="minDate"
                          class="form-date"
                          required
                        >
                      </div>
                      <div class="form-group">
                        <label for="booking-time" class="form-label form-label-required">
                          Preferred Time
                        </label>
                        <select id="booking-time" v-model="form.scheduledTime" class="form-select" required>
                          <option value="">Select a time slot...</option>
                          <option value="08:00:00">8:00 AM - 10:00 AM</option>
                          <option value="10:00:00">10:00 AM - 12:00 PM</option>
                          <option value="12:00:00">12:00 PM - 2:00 PM</option>
                          <option value="14:00:00">2:00 PM - 4:00 PM</option>
                          <option value="16:00:00">4:00 PM - 6:00 PM</option>
                          <option value="18:00:00">6:00 PM - 8:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- Payment Method -->
                  <div class="form-section">
                    <h3 class="form-section-title">Payment Method</h3>
                    
                    <div class="grid grid-cols-3 md:grid-cols-5 gap-2">
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="cash" v-model="form.paymentMethod" class="peer sr-only" checked>
                        <div class="p-3 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-5 h-5 mx-auto mb-1 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <span class="text-xs font-medium">Cash</span>
                        </div>
                      </label>

                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="credit_card" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-3 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-5 h-5 mx-auto mb-1 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          <span class="text-xs font-medium">Credit</span>
                        </div>
                      </label>

                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="debit_card" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-3 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-5 h-5 mx-auto mb-1 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          <span class="text-xs font-medium">Debit</span>
                        </div>
                      </label>

                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="whish" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-3 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-5 h-5 mx-auto mb-1 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"></path>
                          </svg>
                          <span class="text-xs font-medium">Whish</span>
                        </div>
                      </label>

                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="omt" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-3 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-5 h-5 mx-auto mb-1 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"></path>
                          </svg>
                          <span class="text-xs font-medium">OMT</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                    <router-link to="/dashboard" class="btn btn-ghost">Cancel</router-link>
                    <button type="submit" class="btn btn-secondary" :disabled="loading || !isFormValid">
                      <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ loading ? 'Submitting...' : 'Book Now' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Price Summary Card -->
            <div class="card sticky top-6">
              <div class="card-header">
                <h3 class="font-semibold text-neutral-900">Booking Summary</h3>
              </div>
              <div class="card-body">
                <div class="space-y-4">
                  <!-- Selected Appliance -->
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-lg">
                      <svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-neutral-500">Appliance</p>
                      <p class="font-medium text-neutral-900">{{ selectedApplianceName || 'Select an appliance' }}</p>
                    </div>
                  </div>

                  <!-- Selected Date -->
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-lg">
                      <svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-neutral-500">Date & Time</p>
                      <p class="font-medium text-neutral-900">{{ formattedDateTime || 'Select date and time' }}</p>
                    </div>
                  </div>

                  <div class="border-t border-neutral-100 pt-4 mt-4"></div>

                  <!-- Price Breakdown -->
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-neutral-600">Service Fee</span>
                      <span class="font-medium">{{ serviceFee > 0 ? '$' + serviceFee.toFixed(2) : '--' }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-neutral-600">Platform Fee ({{ platformFeeRate }}%)</span>
                      <span class="font-medium">{{ platformFee > 0 ? '$' + platformFee.toFixed(2) : '--' }}</span>
                    </div>
                  </div>

                  <div class="border-t border-neutral-100 pt-4 mt-4"></div>

                  <div class="flex justify-between text-base">
                    <span class="font-semibold text-neutral-900">Total</span>
                    <span class="font-bold text-primary-600">{{ totalPrice > 0 ? '$' + totalPrice.toFixed(2) : '--' }}</span>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="flex items-center gap-2 text-sm text-neutral-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useApplianceStore } from '@/store/appliance'
import { useBookingStore } from '@/store/booking'
import { useAuthStore } from '@/store/auth'
import { formatDate } from '@/utils/dateUtils'
import AlertMessage from '@/components/common/AlertMessage.vue'
import UserSidebar from '@/components/user/UserSidebar.vue'

export default {
  name: 'BookTechnicianView',
  components: {
    AlertMessage,
    UserSidebar
  },
  data() {
    return {
      authStore: null,
      form: {
        applianceTypeId: null,
        description: '',
        scheduledDate: '',
        scheduledTime: '',
        paymentMethod: 'cash',
      },
      selectedCategoryId: null,
      loading: false,
      loadingAppliances: false,
      error: null,
      success: null
    }
  },
  created() {
    this.authStore = useAuthStore()
  },
  computed: {
    isAuthenticated() {
      return this.authStore?.isAuthenticated || false
    },
    appliances() {
      return useApplianceStore().types
    },
    categories() {
      return useApplianceStore().categories
    },
    groupedAppliances() {
      const grouped = []
      
      this.categories.forEach(category => {
        const types = this.appliances.filter(type => type.categoryId === category.id)
        
        if (types.length > 0) {
          grouped.push({
            id: category.id,
            name: category.name,
            fileName: category.fileName,
            types: types
          })
        }
      })
      
      return grouped
    },
    selectedCategory() {
      if (!this.selectedCategoryId) return null
      return this.groupedAppliances.find(c => c.id === this.selectedCategoryId) || null
    },
    selectedAppliance() {
      if (!this.form.applianceTypeId) return null
      return this.appliances.find(a => a.id === this.form.applianceTypeId) || null
    },
    selectedApplianceName() {
      return this.selectedAppliance ? this.selectedAppliance.name : null
    },
    serviceFee() {
      return this.selectedAppliance?.basePrice || 0
    },
    platformFeeRate() {
      return 15
    },
    platformFee() {
      return (this.serviceFee * this.platformFeeRate) / 100
    },
    totalPrice() {
      return this.serviceFee + this.platformFee
    },
    formattedDateTime() {
      if (!this.form.scheduledDate || !this.form.scheduledTime) return null
      const date = new Date(this.form.scheduledDate)
      const timeMap = {
        '08:00:00': '8:00 AM',
        '10:00:00': '10:00 AM',
        '12:00:00': '12:00 PM',
        '14:00:00': '2:00 PM',
        '16:00:00': '4:00 PM',
        '18:00:00': '6:00 PM'
      }
      return `${formatDate(date)} at ${timeMap[this.form.scheduledTime] || this.form.scheduledTime}`
    },
    minDate() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    },
    isFormValid() {
      return this.form.applianceTypeId && 
             this.form.description && 
             this.form.scheduledDate && 
             this.form.scheduledTime 
    }
  },
  methods: {
    formatDate,
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId
      // Clear appliance selection when changing category
      this.form.applianceTypeId = null
    },
    appendToDescription(text) {
      if (this.form.description) {
        this.form.description += '. ' + text
      } else {
        this.form.description = text
      }
    },
    scrollToTop() {
      this.$refs.formTop?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    async loadAppliances() {
      this.loadingAppliances = true
      try {
        await useApplianceStore().fetchCategories()
        await useApplianceStore().fetchTypes(null)
      } catch (err) {
        console.error('Failed to load appliances:', err)
      } finally {
        this.loadingAppliances = false
      }
    },
    async handleSubmit() {
      if (!this.isFormValid) return
      
      this.loading = true
      this.error = null
      this.success = null
      
      try {
        const bookingData = {
          applianceTypeID: this.form.applianceTypeId,
          issueDescription: this.form.description,
          bookingDate: this.form.scheduledDate,
          bookingTime: this.form.scheduledTime,
          paymentMethod: this.form.paymentMethod
        }
        
        await useBookingStore().requestBooking(bookingData)
        this.success = 'Booking submitted successfully! Redirecting to your pending bookings...'
        
        // Scroll to top to show success message
        this.$nextTick(() => {
          this.scrollToTop()
        })
        
        setTimeout(() => {
          this.$router.push('/my-bookings?tab=pending')
        }, 2000)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to submit booking'
        // Scroll to top to show error message
        this.$nextTick(() => {
          this.scrollToTop()
        })
      } finally {
        this.loading = false
      }
    }
  },
  async mounted() {
    await this.loadAppliances()
    // Auto-select first category if available
    if (this.groupedAppliances.length > 0) {
      this.selectedCategoryId = this.groupedAppliances[0].id
    }
  }
}
</script>

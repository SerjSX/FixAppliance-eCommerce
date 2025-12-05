<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
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
    <section class="section-sm">
      <div class="container-wide">
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

                  <!-- Step Indicator -->
                  <div class="flex items-center justify-center gap-4 mb-8">
                    <div class="flex items-center gap-2">
                      <span class="w-8 h-8 flex items-center justify-center rounded-full bg-primary-600 text-white text-sm font-medium">1</span>
                      <span class="text-sm font-medium text-neutral-900">Details</span>
                    </div>
                    <div class="w-12 h-0.5 bg-neutral-200"></div>
                    <div class="flex items-center gap-2">
                      <span class="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 text-neutral-600 text-sm font-medium">2</span>
                      <span class="text-sm text-neutral-500">Payment</span>
                    </div>
                    <div class="w-12 h-0.5 bg-neutral-200"></div>
                    <div class="flex items-center gap-2">
                      <span class="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 text-neutral-600 text-sm font-medium">3</span>
                      <span class="text-sm text-neutral-500">Confirm</span>
                    </div>
                  </div>

                  <!-- Appliance Selection -->
                  <div class="form-section">
                    <h3 class="form-section-title">Select Your Appliance</h3>
                    
                    <!-- Loading -->
                    <div v-if="loadingAppliances" class="loading-container-sm">
                      <div class="spinner spinner-lg"></div>
                    </div>

                    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-3" role="radiogroup" aria-label="Select appliance type">
                      <label v-for="appliance in appliances" :key="appliance.id" class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" :value="appliance.id" v-model="form.applianceTypeId" class="peer sr-only" :aria-label="appliance.name">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-10 h-10 mx-auto mb-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                          </svg>
                          <span class="text-sm font-medium block">{{ appliance.name }}</span>
                        </div>
                      </label>
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
                        rows="4"
                        placeholder="Please describe the problem with your appliance in detail. For example: 'My washing machine makes a loud banging noise during the spin cycle and has started leaking water from the bottom.'"
                        required
                      ></textarea>
                      <p class="form-hint">The more details you provide, the better prepared the technician will be</p>
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
                    
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <!-- Cash -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="cash" v-model="form.paymentMethod" class="peer sr-only" checked>
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <span class="text-sm font-medium">Cash</span>
                        </div>
                      </label>

                      <!-- Credit Card -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="credit_card" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          <span class="text-sm font-medium">Credit</span>
                        </div>
                      </label>

                      <!-- Debit Card -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="debit_card" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          <span class="text-sm font-medium">Debit</span>
                        </div>
                      </label>

                      <!-- Whish -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="whish" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"></path>
                          </svg>
                          <span class="text-sm font-medium">Whish</span>
                        </div>
                      </label>

                      <!-- OMT -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="omt" v-model="form.paymentMethod" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"></path>
                          </svg>
                          <span class="text-sm font-medium">OMT</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="flex justify-end gap-3 pt-4">
                    <router-link to="/" class="btn btn-ghost">Cancel</router-link>
                    <button type="submit" class="btn btn-secondary btn-lg" :disabled="loading || !isFormValid">
                      <svg v-if="loading" class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
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
            <div class="card sticky top-24">
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

                  <div class="divider"></div>

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

                  <div class="divider"></div>

                  <div class="flex justify-between text-base">
                    <span class="font-semibold text-neutral-900">Total</span>
                    <span class="font-bold text-primary-600">{{ totalPrice > 0 ? '$' + totalPrice.toFixed(2) : 'Select appliance' }}</span>
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

            <!-- Help Card -->
            <div class="card mt-6">
              <div class="card-body">
                <h4 class="font-semibold text-neutral-900 mb-3">Need Help?</h4>
                <p class="text-sm text-neutral-600 mb-4">
                  Can't find your appliance or have questions about our service?
                </p>
                <router-link to="/contact" class="btn btn-outline btn-sm w-full">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  Contact Support
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useApplianceStore } from '@/store/appliance'
import { useBookingStore } from '@/store/booking'
import { formatDate } from '@/utils/dateUtils'
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'BookTechnicianView',
  components: {
    AlertMessage
  },
  data() {
    return {
      form: {
        applianceTypeId: null,
        description: '',
        scheduledDate: '',
        scheduledTime: '',
        paymentMethod: 'cash',
      },
      loading: false,
      loadingAppliances: false,
      error: null,
      success: null
    }
  },
  computed: {
    appliances() {
      return useApplianceStore().types
    },
    selectedAppliance() {
      if (!this.form.applianceTypeId) return null
      return this.appliances.find(a => a.id === this.form.applianceTypeId) || null
    },
    selectedApplianceName() {
      return this.selectedAppliance ? this.selectedAppliance.name : null
    },
    // Dynamic pricing based on selected appliance
    serviceFee() {
      return this.selectedAppliance?.basePrice || 0
    },
    platformFeeRate() {
      return 15 // 15% platform fee as per backend
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
    appendToDescription(text) {
      if (this.form.description) {
        this.form.description += '. ' + text
      } else {
        this.form.description = text
      }
    },
    async loadAppliances() {
      this.loadingAppliances = true
      try {
        await useApplianceStore().fetchCategories()
        // Load all types (assuming no category filter needed)
        await useApplianceStore().fetchTypes()
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
        // Backend expects: applianceTypeID, issueDescription, bookingDate, bookingTime, paymentMethod
        const bookingData = {
          applianceTypeID: this.form.applianceTypeId,
          issueDescription: this.form.description,
          bookingDate: this.form.scheduledDate,
          bookingTime: this.form.scheduledTime,
          paymentMethod: this.form.paymentMethod
        }
        
        await useBookingStore().requestBooking(bookingData)
        this.success = 'Booking submitted successfully! Redirecting to your bookings...'
        
        // Redirect after a short delay
        setTimeout(() => {
          this.$router.push('/my-bookings')
        }, 2000)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to submit booking'
      } finally {
        this.loading = false
      }
    }
  },
  async mounted() {
    await this.loadAppliances()
  }
}
</script>

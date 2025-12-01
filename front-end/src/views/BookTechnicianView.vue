<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <a href="/" class="breadcrumb-link">Home</a>
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
                <form class="space-y-6">
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
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <!-- Washing Machine -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="1" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/washing-machine.svg" alt="Washing Machine" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Washing Machine</span>
                        </div>
                      </label>

                      <!-- Refrigerator -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="2" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/refrigerator.svg" alt="Refrigerator" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Refrigerator</span>
                        </div>
                      </label>

                      <!-- Air Conditioner -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="3" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/air-conditioner.svg" alt="Air Conditioner" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Air Conditioner</span>
                        </div>
                      </label>

                      <!-- Oven -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="4" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/oven.svg" alt="Oven & Stove" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Oven & Stove</span>
                        </div>
                      </label>

                      <!-- Dishwasher -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="5" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/dishwasher.svg" alt="Dishwasher" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Dishwasher</span>
                        </div>
                      </label>

                      <!-- Dryer -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="6" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/dryer.svg" alt="Dryer" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Dryer</span>
                        </div>
                      </label>

                      <!-- Microwave -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="7" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/microwave.svg" alt="Microwave" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Microwave</span>
                        </div>
                      </label>

                      <!-- Water Heater -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="appliance-type" value="8" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/icons/water-heater.svg" alt="Water Heater" class="w-10 h-10 mx-auto mb-2">
                          <span class="text-sm font-medium block">Water Heater</span>
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
                        class="form-textarea" 
                        rows="4"
                        placeholder="Please describe the problem with your appliance in detail. For example: 'My washing machine makes a loud banging noise during the spin cycle and has started leaking water from the bottom.'"
                      ></textarea>
                      <p class="form-hint">The more details you provide, the better prepared the technician will be</p>
                    </div>

                    <!-- Quick Issue Tags -->
                    <div class="flex flex-wrap gap-2">
                      <button type="button" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Not starting</button>
                      <button type="button" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Strange noise</button>
                      <button type="button" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Leaking water</button>
                      <button type="button" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Not cooling</button>
                      <button type="button" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Not heating</button>
                      <button type="button" class="badge badge-neutral hover:bg-neutral-200 cursor-pointer">Electrical issue</button>
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
                          class="form-date"
                        >
                      </div>
                      <div class="form-group">
                        <label for="booking-time" class="form-label form-label-required">
                          Preferred Time
                        </label>
                        <select id="booking-time" class="form-select">
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
                        <input type="radio" name="payment-method" value="cash" class="peer sr-only" checked>
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <span class="text-sm font-medium">Cash</span>
                        </div>
                      </label>

                      <!-- Credit Card -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="credit_card" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          <span class="text-sm font-medium">Credit</span>
                        </div>
                      </label>

                      <!-- Debit Card -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="debit_card" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          <span class="text-sm font-medium">Debit</span>
                        </div>
                      </label>

                      <!-- Whish -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="whish" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/payments/whish-logo.png" alt="Whish" class="w-6 h-6 mx-auto mb-2 object-contain">
                          <span class="text-sm font-medium">Whish</span>
                        </div>
                      </label>

                      <!-- OMT -->
                      <label class="relative cursor-pointer">
                        <input type="radio" name="payment-method" value="omt" class="peer sr-only">
                        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
                          <img src="/images/payments/omt-logo.png" alt="OMT" class="w-6 h-6 mx-auto mb-2 object-contain">
                          <span class="text-sm font-medium">OMT</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Terms Agreement -->
                  <div class="form-check">
                    <input type="checkbox" id="terms" class="form-checkbox">
                    <label for="terms" class="form-check-label">
                      I agree to the <a href="/terms" class="text-primary-600 hover:underline">Terms of Service</a> 
                      and <a href="/privacy" class="text-primary-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>

                  <!-- Submit Button -->
                  <div class="flex justify-end gap-3 pt-4">
                    <a href="/" class="btn btn-ghost">Cancel</a>
                    <button type="submit" class="btn btn-secondary btn-lg">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Book Now
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
                      <p class="font-medium text-neutral-900">Select an appliance</p>
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
                      <p class="font-medium text-neutral-900">Select date and time</p>
                    </div>
                  </div>

                  <div class="divider"></div>

                  <!-- Price Breakdown -->
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-neutral-600">Service Fee</span>
                      <span class="font-medium">$50.00</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-neutral-600">Platform Fee (15%)</span>
                      <span class="font-medium">$7.50</span>
                    </div>
                  </div>

                  <div class="divider"></div>

                  <div class="flex justify-between text-base">
                    <span class="font-semibold text-neutral-900">Total</span>
                    <span class="font-bold text-primary-600">$57.50</span>
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
                <a href="/contact" class="btn btn-outline btn-sm w-full">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BookTechnicianView'
}
</script>

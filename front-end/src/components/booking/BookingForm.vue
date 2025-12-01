<template>
  <!-- Booking Form Component -->
  <form class="space-y-6">
    <!-- Appliance Selection -->
    <div class="form-group">
      <label for="appliance-type" class="form-label form-label-required">
        Appliance Type
      </label>
      <select id="appliance-type" class="form-select">
        <option value="">Select an appliance...</option>
        <option value="1">Washing Machine</option>
        <option value="2">Refrigerator</option>
        <option value="3">Air Conditioner</option>
        <option value="4">Oven / Stove</option>
        <option value="5">Dishwasher</option>
        <option value="6">Dryer</option>
        <option value="7">Microwave</option>
        <option value="8">Water Heater</option>
      </select>
      <p class="form-hint">Select the appliance that needs repair</p>
    </div>

    <!-- Issue Description -->
    <div class="form-group">
      <label for="issue-description" class="form-label form-label-required">
        Describe the Issue
      </label>
      <textarea 
        id="issue-description" 
        class="form-textarea" 
        rows="4"
        placeholder="Please describe the problem with your appliance in detail..."
      ></textarea>
      <p class="form-hint">The more details you provide, the better prepared the technician will be</p>
    </div>

    <!-- Date and Time Selection -->
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

    <!-- Payment Method -->
    <div class="form-group">
      <label class="form-label form-label-required">Payment Method</label>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
        <!-- Cash -->
        <label class="relative cursor-pointer">
          <input type="radio" name="payment-method" value="cash" class="peer sr-only">
          <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
            <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="text-sm font-medium">Cash</span>
          </div>
        </label>

        <!-- Credit Card -->
        <label class="relative cursor-pointer">
          <input type="radio" name="payment-method" value="credit_card" class="peer sr-only">
          <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
            <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            <span class="text-sm font-medium">Credit Card</span>
          </div>
        </label>

        <!-- Debit Card -->
        <label class="relative cursor-pointer">
          <input type="radio" name="payment-method" value="debit_card" class="peer sr-only">
          <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
            <svg class="w-6 h-6 mx-auto mb-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            <span class="text-sm font-medium">Debit Card</span>
          </div>
        </label>

        <!-- Whish -->
        <label class="relative cursor-pointer">
          <input type="radio" name="payment-method" value="whish" class="peer sr-only">
          <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
            <img src="/images/payments/whish-logo.png" alt="Whish" class="w-6 h-6 mx-auto mb-2 object-contain">
            <span class="text-sm font-medium">Whish</span>
          </div>
        </label>

        <!-- OMT -->
        <label class="relative cursor-pointer">
          <input type="radio" name="payment-method" value="omt" class="peer sr-only">
          <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
            <img src="/images/payments/omt-logo.png" alt="OMT" class="w-6 h-6 mx-auto mb-2 object-contain">
            <span class="text-sm font-medium">OMT</span>
          </div>
        </label>
      </div>
    </div>

    <!-- Price Summary -->
    <div class="card bg-neutral-50 border-neutral-200">
      <div class="card-body">
        <h4 class="font-semibold text-neutral-900 mb-4">Booking Summary</h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-neutral-600">Service Fee</span>
            <span class="font-medium">$50.00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-600">Platform Fee (15%)</span>
            <span class="font-medium">$7.50</span>
          </div>
          <div class="divider"></div>
          <div class="flex justify-between text-base">
            <span class="font-semibold text-neutral-900">Total</span>
            <span class="font-bold text-primary-600">$57.50</span>
          </div>
        </div>
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
    <div class="form-actions">
      <button type="button" class="btn btn-ghost">Cancel</button>
      <button type="submit" class="btn btn-secondary btn-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        Book Now
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BookingForm'
}
</script>

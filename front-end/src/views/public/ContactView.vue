<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Contact Us</span>
        </nav>
        <h1 class="page-title">Contact Us</h1>
        <p class="page-description">We're here to help with any questions or concerns</p>
      </div>
    </div>

    <!-- Contact Content -->
    <section class="section-sm">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="card">
              <div class="card-header">
                <h3 class="font-semibold text-neutral-900">Send us a Message</h3>
              </div>
              <div class="card-body">
                <form @submit.prevent="handleSubmit" class="space-y-5">
                  <!-- Success Alert -->
                  <AlertMessage 
                    v-if="success" 
                    type="success" 
                    message="Your message has been sent successfully!"
                    @dismiss="success = false"
                  />

                  <!-- Error Alert -->
                  <AlertMessage 
                    v-if="error" 
                    type="error" 
                    :message="error"
                    @dismiss="error = null"
                  />

                  <div class="form-row">
                    <div class="form-group">
                      <label for="contact-name" class="form-label form-label-required">Full Name</label>
                      <input type="text" id="contact-name" v-model="form.name" class="form-input" placeholder="Your name" required>
                    </div>
                    <div class="form-group">
                      <label for="contact-email" class="form-label form-label-required">Email Address</label>
                      <input type="email" id="contact-email" v-model="form.email" class="form-input" placeholder="name@example.com" required>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="contact-phone" class="form-label">Phone Number (Optional)</label>
                    <div class="input-group">
                      <span class="input-group-text">+961</span>
                      <input type="tel" id="contact-phone" v-model="form.phone" class="form-input" placeholder="71 234 567">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="contact-subject" class="form-label form-label-required">Subject</label>
                    <select id="contact-subject" v-model="form.subject" class="form-select" required>
                      <option value="">Select a topic...</option>
                      <option value="booking">Booking Issue</option>
                      <option value="payment">Payment Problem</option>
                      <option value="technician">Technician Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="contact-message" class="form-label form-label-required">Message</label>
                    <textarea id="contact-message" v-model="form.message" class="form-textarea" rows="6" placeholder="How can we help you?" required></textarea>
                  </div>

                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    {{ loading ? 'Sending...' : 'Send Message' }}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6">
            <!-- Contact Cards -->
            <div class="card">
              <div class="card-body">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-neutral-900 mb-1">Phone</h4>
                    <p class="text-neutral-600">+961 1 234 567</p>
                    <p class="text-sm text-neutral-500 mt-1">Mon-Fri 9am-6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-success-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-neutral-900 mb-1">WhatsApp</h4>
                    <p class="text-neutral-600">+961 71 234 567</p>
                    <p class="text-sm text-neutral-500 mt-1">Quick responses</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-neutral-900 mb-1">Email</h4>
                    <p class="text-neutral-600">support@fixappliance.lb</p>
                    <p class="text-sm text-neutral-500 mt-1">24-48 hour response</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-neutral-900 mb-1">Office</h4>
                    <p class="text-neutral-600">Mount Lebanon, Lebanon</p>
                    <p class="text-sm text-neutral-500 mt-1">By appointment only</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ Link -->
            <div class="card bg-primary-50 border-primary-100">
              <div class="card-body text-center">
                <h4 class="font-semibold text-primary-900 mb-2">Need More Help?</h4>
                <p class="text-sm text-primary-700 mb-4">Learn about our services and technicians</p>
                <router-link to="/about" class="btn btn-primary btn-sm">About Us</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { contactApi } from '@/api'
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  name: 'ContactView',
  components: {
    AlertMessage
  },
  data() {
    return {
      form: { name: '', email: '', phone: '', subject: '', message: '' },
      loading: false,
      error: null,
      success: false
    }
  },
  methods: {
    // Submit contact form
    async handleSubmit() {
      this.loading = true
      this.error = null
      this.success = false
      try {
        await contactApi.submit(this.form)
        this.success = true
        this.form = { name: '', email: '', phone: '', subject: '', message: '' }
      } catch (err) {
        this.error = err.message || 'Failed to send message'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

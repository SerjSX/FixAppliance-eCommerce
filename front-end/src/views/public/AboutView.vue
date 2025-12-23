<template>
  <div class="main-content">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-pattern"></div>
      <div class="hero-content">
        <span class="badge badge-secondary mb-4">About Us</span>
        <h1 class="hero-title">Connecting You With<br>Trusted Technicians</h1>
        <p class="hero-subtitle">
          FixAppliance is Lebanon's premier platform for appliance repairs,
          connecting homeowners with verified technicians across Mount Lebanon.
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="section bg-white">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="badge badge-primary mb-4">Our Story</span>
            <h2 class="h2 mb-6">Making Appliance Repair Simple</h2>
            <div class="space-y-4 text-neutral-600">
              <p>
                We started FixAppliance with a simple mission: to make finding reliable
                appliance repair technicians as easy as possible for Lebanese homeowners.
              </p>
              <p>
                Too often, people struggle to find qualified technicians when their appliances
                break down. They rely on word of mouth, uncertain about quality and pricing.
                We're changing that.
              </p>
              <p>
                Our platform connects you with verified, skilled technicians in your area.
                Every technician on our platform is vetted for quality and professionalism,
                giving you peace of mind when you book.
              </p>
            </div>
          </div>
          <div>
            <img src="/images/about/team-photo.jpg" alt="FixAppliance Team" class="rounded-2xl shadow-medium w-full">
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section bg-neutral-50">
      <div class="container-wide">
        <div class="text-center mb-12">
          <span class="badge badge-primary mb-4">Our Values</span>
          <h2 class="h2 mb-4">What We Stand For</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            These principles guide everything we do at FixAppliance
          </p>
        </div>

        <div class="flex justify-center items-center flex-col lg:flex-row">
          <!-- Trust -->
          <div class="text-center w-80 mb-10 lg:mr-40">
            <div class="icon-box icon-box-lg icon-box-primary mx-auto mb-6">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Trust & Reliability</h3>
            <p class="text-neutral-600">
              Every technician is verified and rated by real customers.
              We ensure you always get quality service.
            </p>
          </div>

          <!-- Transparency -->
          <div class="text-center w-80">
            <div class="icon-box icon-box-lg icon-box-secondary mx-auto mb-6">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Transparency</h3>
            <p class="text-neutral-600">
              Clear pricing, honest reviews, and no hidden fees.
              You always know what to expect.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section bg-primary-700 text-white">
      <div class="container-wide">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p class="!text-neutral-300 text-4xl md:text-5xl font-bold mb-2">500+</p>
            <p class="text-primary-200">Verified Technicians</p>
          </div>
          <div>
            <p class="!text-neutral-300 text-4xl md:text-5xl font-bold mb-2">10,000+</p>
            <p class="text-primary-200">Repairs Completed</p>
          </div>
          <div>
            <p class="!text-neutral-300 text-4xl md:text-5xl font-bold mb-2">4.8★</p>
            <p class="text-primary-200">Average Rating</p>
          </div>
          <div>
            <p class="!text-neutral-300 text-4xl md:text-5xl font-bold mb-2">100+</p>
            <p class="text-primary-200">DIY Guides</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Area Section -->
    <section class="section bg-white">
      <div class="container-wide">
        <div class="grid gap-12 items-center">
          <div>
            <span class="badge badge-secondary mb-4">Service Area</span>
            <h2 class="h2 mb-6">Currently Serving Mount Lebanon</h2>
            <p class="text-neutral-600 mb-6">
              We're currently focused on providing the best service to homeowners
              in Mount Lebanon. Our network of technicians covers:
            </p>

            <!-- Loading State -->
            <div v-if="loadingServiceAreas" class="py-4">
              <div class="spinner spinner-md"></div>
              <p class="text-neutral-500 mt-2">Loading service areas...</p>
            </div>

            <!-- Dynamic Service Areas -->
            <div v-else-if="serviceAreas.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <div v-for="area in serviceAreas" :key="area.id" class="flex items-center gap-2 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ area.name }}</span>
              </div>
            </div>

            <!-- Fallback -->
            <div v-else class="grid grid-cols-2 gap-3">
              <div class="flex items-center gap-2 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Mount Lebanon</span>
              </div>
            </div>
            <p class="text-sm text-neutral-500 mt-6">
              We're actively expanding to serve more areas across Lebanon.
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container-wide text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-lg text-white/90 max-w-xl mx-auto mb-8">
          Join thousands of satisfied homeowners or become a verified technician on our platform.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/book-technician" class="btn btn-white btn-lg">
            Book a Technician
          </router-link>
          <router-link to="/technician-register"
            class="btn btn-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white/20">
            Join as Technician
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useServiceAreaStore } from '@/store/serviceArea'

export default {
  name: 'AboutView',
  data() {
    return {
      serviceAreaStore: null
    }
  },
  computed: {
    serviceAreas() {
      return this.serviceAreaStore?.areas?.filter(area => area.isActive !== false) || []
    },
    loadingServiceAreas() {
      return this.serviceAreaStore?.loading ?? true
    }
  },
  mounted() {
    this.serviceAreaStore = useServiceAreaStore()
    this.fetchServiceAreas()
  },
  methods: {
    async fetchServiceAreas() {
      await this.serviceAreaStore.fetchAll()
    }
  }
}
</script>

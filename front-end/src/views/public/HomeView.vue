<template>
  <div class="main-content">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-pattern"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          Fix Your Appliances with<br>
          <span class="text-secondary-400">Trusted Technicians</span>
        </h1>
        <p class="hero-subtitle">
          Book verified technicians or learn to DIY with our troubleshooting guides.
          Serving homeowners across {{ serviceAreasText }}.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/book-technician" class="btn btn-secondary btn-lg shadow-secondary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Book a Technician
          </router-link>
          <router-link to="/register" class="btn btn-white btn-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Create Free Account
          </router-link>
        </div>
        <!-- Trust Indicators -->
        <div class="flex flex-wrap justify-center gap-8 mt-12">
          <div class="text-center">
            <p class="text-3xl font-bold text-white">500+</p>
            <p class="text-sm text-primary-200">Verified Technicians</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">10k+</p>
            <p class="text-sm text-primary-200">Repairs Completed</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">4.8★</p>
            <p class="text-sm text-primary-200">Average Rating</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">24/7</p>
            <p class="text-sm text-primary-200">Support Available</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section bg-white">
      <div class="container-wide">
        <div class="text-center mb-12">
          <h2 class="h2 mb-4">Appliances We Service</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            From washing machines to air conditioners, our technicians are trained to handle all major appliances.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loadingCategories" class="text-center py-12">
          <div class="spinner spinner-lg mx-auto"></div>
          <p class="text-neutral-500 mt-4">Loading services...</p>
        </div>

        <!-- Appliance Categories (Dynamic) -->
        <div v-else-if="applianceCategories.length > 0" class="grid-services">
          <div v-for="category in applianceCategories" :key="category.id" class="service-card">
            <div class="service-card-icon">
              <img class="w-8 h-8" :src="'/images/appliance-categories/' + category.fileName" :alt="category.name" />
            </div>
            <h3 class="service-card-title">{{ category.name }}</h3>
            <p class="service-card-description">{{ category.description || 'Professional repair services' }}</p>
            <router-link to="/book-technician" class="btn btn-outline btn-sm mt-4">Book Repair</router-link>
          </div>
        </div>

        <!-- Fallback if no categories -->
        <div v-else class="text-center py-12">
          <p class="text-neutral-500">Loading appliance categories...</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section bg-neutral-50">
      <div class="container-wide">
        <div class="text-center mb-12">
          <h2 class="h2 mb-4">How It Works</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Get your appliance fixed in three simple steps
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div
              class="w-16 h-16 mx-auto mb-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Book Online</h3>
            <p class="text-neutral-600">
              Select your appliance type, describe the issue, and choose a convenient time slot.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div
              class="w-16 h-16 mx-auto mb-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Get Matched</h3>
            <p class="text-neutral-600">
              A verified technician in your area accepts your request and comes to your location.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div
              class="w-16 h-16 mx-auto mb-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Problem Solved</h3>
            <p class="text-neutral-600">
              Your appliance is fixed, you pay securely, and rate your experience.
            </p>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link to="/book-technician" class="btn btn-secondary btn-lg">
            Book Your First Repair
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="section bg-white">
      <div class="container-wide">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1">
            <span class="badge badge-secondary mb-4">Why FixAppliance</span>
            <h2 class="h2 mb-4">Reliable Appliance Repairs You Can Trust</h2>
            <p class="text-lg text-neutral-600 mb-6">
              We connect you with verified, skilled technicians who can fix your appliances quickly and professionally.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Verified and experienced technicians
              </li>
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Transparent pricing with no hidden fees
              </li>
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Easy online booking system
              </li>
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Customer ratings and reviews
              </li>
            </ul>
            <router-link to="/book-technician" class="btn btn-primary">
              Book a Technician
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                </path>
              </svg>
            </router-link>
          </div>
          <div class="flex-1">
            <img src="/images/home/technician-at-work.jpg" alt="Professional Technician at Work"
              class="w-full max-w-md mx-auto">
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section bg-neutral-50">
      <div class="container-wide">
        <div class="text-center mb-12">
          <h2 class="h2 mb-4">What Our Customers Say</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of satisfied homeowners across Lebanon
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="card">
            <div class="card-body">
              <div class="flex items-center gap-1 mb-4">
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
              </div>
              <p class="text-neutral-600 mb-4">
                "The technician arrived on time and fixed my washing machine in under an hour. Very professional
                service!"
              </p>
              <div class="flex items-center gap-3">
                <span class="avatar avatar-sm bg-primary-100 text-primary-600">SH</span>
                <div>
                  <p class="text-sm font-medium text-neutral-900">Sara Haddad</p>
                  <p class="text-xs text-neutral-500">Beirut</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="card">
            <div class="card-body">
              <div class="flex items-center gap-1 mb-4">
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
              </div>
              <p class="text-neutral-600 mb-4">
                "The technician was very knowledgeable about my AC system. He fixed it quickly and explained what was
                wrong!"
              </p>
              <div class="flex items-center gap-3">
                <span class="avatar avatar-sm bg-primary-100 text-primary-600">MK</span>
                <div>
                  <p class="text-sm font-medium text-neutral-900">Marwan Khalil</p>
                  <p class="text-xs text-neutral-500">Jounieh</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="card">
            <div class="card-body">
              <div class="flex items-center gap-1 mb-4">
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
              </div>
              <p class="text-neutral-600 mb-4">
                "Finally a reliable service for appliance repairs! The booking process was super easy."
              </p>
              <div class="flex items-center gap-3">
                <span class="avatar avatar-sm bg-primary-100 text-primary-600">RA</span>
                <div>
                  <p class="text-sm font-medium text-neutral-900">Rima Abbas</p>
                  <p class="text-xs text-neutral-500">Baabda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container-wide text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Book a verified technician now and get your appliance fixed quickly.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/book-technician" class="btn btn-white btn-lg">
            Book a Technician
          </router-link>
          <router-link to="/register"
            class="btn btn-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white/20">
            Create Free Account
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useApplianceStore } from '@/store/appliance'
import { useServiceAreaStore } from '@/store/serviceArea'

export default {
  name: 'HomeView',
  data() {
    return {
      applianceStore: useApplianceStore(),
      serviceAreaStore: useServiceAreaStore()
    }
  },
  computed: {
    applianceCategories() {
      return this.applianceStore.categories.filter(cat => cat.isActive)
    },
    serviceAreas() {
      return this.serviceAreaStore.areas.filter(area => area.isActive)
    },
    loadingCategories() {
      return this.applianceStore.loading
    },
    loadingServiceAreas() {
      return this.serviceAreaStore.loading
    },
    serviceAreasText() {
      if (this.serviceAreas.length === 0) return 'Mount Lebanon'

      const regions = [...new Set(this.serviceAreas.map(area => area.region))].filter(Boolean)
      if (regions.length > 0) {
        return regions.join(', ')
      }

      // Fallback to first 3 area names
      const areaNames = this.serviceAreas.slice(0, 3).map(area => area.name)
      return areaNames.length > 0 ? areaNames.join(', ') : 'Mount Lebanon'
    }
  },
  async mounted() {
    // Fetch data using stores
    await Promise.all([
      this.applianceStore.fetchCategories(),
      this.serviceAreaStore.fetchAll()
    ])
  }
}
</script>

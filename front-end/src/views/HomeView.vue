<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-pattern"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          Fix Your Appliances with<br>
          <span class="text-secondary-400">Trusted Technicians</span>
        </h1>
        <p class="hero-subtitle">
          Book verified technicians or learn to DIY with our Arabic and English troubleshooting guides. 
          Serving homeowners across Mount Lebanon.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/book-technician" class="btn btn-secondary btn-lg shadow-secondary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Book a Technician
          </a>
          <a href="/articles" class="btn btn-white btn-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Browse DIY Guides
          </a>
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

        <div class="grid-services">
          <!-- Washing Machine -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/washing-machine.svg" alt="Washing Machine" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Washing Machine</h3>
            <p class="service-card-description">Repairs for all brands and types</p>
            <a href="/services/washing-machine" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>

          <!-- Refrigerator -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/refrigerator.svg" alt="Refrigerator" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Refrigerator</h3>
            <p class="service-card-description">Cooling issues and repairs</p>
            <a href="/services/refrigerator" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>

          <!-- Air Conditioner -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/air-conditioner.svg" alt="Air Conditioner" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Air Conditioner</h3>
            <p class="service-card-description">Installation and maintenance</p>
            <a href="/services/air-conditioner" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>

          <!-- Oven & Stove -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/oven.svg" alt="Oven & Stove" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Oven & Stove</h3>
            <p class="service-card-description">Gas and electric repairs</p>
            <a href="/services/oven" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>

          <!-- Dishwasher -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/dishwasher.svg" alt="Dishwasher" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Dishwasher</h3>
            <p class="service-card-description">Drainage and cleaning issues</p>
            <a href="/services/dishwasher" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>

          <!-- Dryer -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/dryer.svg" alt="Dryer" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Dryer</h3>
            <p class="service-card-description">Heating and drum repairs</p>
            <a href="/services/dryer" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>

          <!-- Microwave -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/microwave.svg" alt="Microwave" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Microwave</h3>
            <p class="service-card-description">All types of microwaves</p>
            <a href="/services/microwave" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>

          <!-- Water Heater -->
          <div class="service-card">
            <div class="service-card-icon">
              <img src="/images/icons/water-heater.svg" alt="Water Heater" class="w-8 h-8">
            </div>
            <h3 class="service-card-title">Water Heater</h3>
            <p class="service-card-description">Tank and tankless repairs</p>
            <a href="/services/water-heater" class="btn btn-outline btn-sm mt-4">Learn More</a>
          </div>
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
            <div class="w-16 h-16 mx-auto mb-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Book Online</h3>
            <p class="text-neutral-600">
              Select your appliance type, describe the issue, and choose a convenient time slot.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Get Matched</h3>
            <p class="text-neutral-600">
              A verified technician in your area accepts your request and comes to your location.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Problem Solved</h3>
            <p class="text-neutral-600">
              Your appliance is fixed, you pay securely, and rate your experience.
            </p>
          </div>
        </div>

        <div class="text-center mt-10">
          <a href="/book-technician" class="btn btn-secondary btn-lg">
            Book Your First Repair
          </a>
        </div>
      </div>
    </section>

    <!-- DIY Section -->
    <section class="section bg-white">
      <div class="container-wide">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1">
            <span class="badge badge-secondary mb-4">DIY Resources</span>
            <h2 class="h2 mb-4">Try Fixing It Yourself First</h2>
            <p class="text-lg text-neutral-600 mb-6">
              Many appliance issues have simple solutions. Browse our free troubleshooting guides 
              available in both Arabic and English.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Step-by-step video tutorials
              </li>
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Arabic troubleshooting guides
              </li>
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Common problems and solutions
              </li>
              <li class="flex items-center gap-3 text-neutral-700">
                <svg class="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save money on simple repairs
              </li>
            </ul>
            <a href="/articles" class="btn btn-primary">
              Browse DIY Guides
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
          <div class="flex-1">
            <img 
              src="/images/home/diy-guides-illustration.svg" 
              alt="DIY Repair Guides" 
              class="w-full max-w-md mx-auto"
            >
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
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p class="text-neutral-600 mb-4">
                "The technician arrived on time and fixed my washing machine in under an hour. Very professional service!"
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
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p class="text-neutral-600 mb-4">
                "I fixed my AC issue myself using their Arabic troubleshooting guide. Saved me a lot of money!"
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
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg class="star star-filled" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
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
          Book a verified technician now or browse our free DIY guides.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/book-technician" class="btn btn-white btn-lg">
            Book a Technician
          </a>
          <a href="/register" class="btn btn-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white/20">
            Create Free Account
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<template>
  <div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container-wide">
        <nav class="breadcrumb mb-4">
          <a href="/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">DIY Articles</span>
        </nav>
        <h1 class="page-title">DIY Troubleshooting Guides</h1>
        <p class="page-description">Learn to fix common appliance problems yourself with our step-by-step guides</p>
      </div>
    </div>

    <!-- Articles Content -->
    <section class="section-sm">
      <div class="container-wide">
        <!-- Search and Filters -->
        <div class="flex flex-col lg:flex-row gap-4 mb-8">
          <!-- Search -->
          <div class="flex-1 form-search-wrapper">
            <svg class="form-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" class="form-search" placeholder="Search articles...">
          </div>

          <!-- Filters -->
          <div class="flex gap-3">
            <select class="form-select w-auto">
              <option value="">All Categories</option>
              <option value="washing-machine">Washing Machine</option>
              <option value="refrigerator">Refrigerator</option>
              <option value="ac">Air Conditioner</option>
              <option value="oven">Oven & Stove</option>
              <option value="dishwasher">Dishwasher</option>
            </select>
            <select class="form-select w-auto">
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
            <select class="form-select w-auto">
              <option value="">Sort by</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <!-- Category Pills -->
        <div class="flex flex-wrap gap-2 mb-8">
          <button type="button" class="badge badge-primary">All</button>
          <button type="button" class="badge badge-neutral hover:bg-neutral-200">Washing Machine</button>
          <button type="button" class="badge badge-neutral hover:bg-neutral-200">Refrigerator</button>
          <button type="button" class="badge badge-neutral hover:bg-neutral-200">Air Conditioner</button>
          <button type="button" class="badge badge-neutral hover:bg-neutral-200">Oven & Stove</button>
          <button type="button" class="badge badge-neutral hover:bg-neutral-200">Dishwasher</button>
          <button type="button" class="badge badge-neutral hover:bg-neutral-200">Dryer</button>
          <button type="button" class="badge badge-neutral hover:bg-neutral-200">Microwave</button>
        </div>

        <!-- Featured Article -->
        <div class="card mb-8 overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="relative aspect-video lg:aspect-auto">
              <img 
                src="/images/articles/featured-article.jpg" 
                alt="Complete Guide to Washing Machine Troubleshooting" 
                class="w-full h-full object-cover"
              >
              <span class="absolute top-4 left-4 badge badge-secondary">Featured</span>
              <span class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                12:45
              </span>
            </div>
            <div class="p-6 lg:p-8 flex flex-col justify-center">
              <span class="badge badge-primary w-fit mb-3">Washing Machine</span>
              <h2 class="text-2xl font-bold text-neutral-900 mb-3">
                <a href="/articles/complete-washing-machine-guide" class="hover:text-primary-600 transition-colors">
                  Complete Guide to Washing Machine Troubleshooting
                </a>
              </h2>
              <p class="text-neutral-600 mb-4">
                Learn how to diagnose and fix the most common washing machine problems. From strange noises to leaks, 
                this comprehensive guide covers everything you need to know.
              </p>
              <div class="flex items-center gap-4 text-sm text-neutral-500 mb-6">
                <div class="flex items-center gap-2">
                  <span class="avatar avatar-sm bg-primary-100 text-primary-600">AH</span>
                  <span>Ahmad Hassan</span>
                </div>
                <span>•</span>
                <span>15 min read</span>
                <span>•</span>
                <span>Dec 1, 2024</span>
              </div>
              <a href="/articles/complete-washing-machine-guide" class="btn btn-primary w-fit">
                Read Article
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="grid-articles">
          <!-- Article Card 1 -->
          <article class="card-hover">
            <div class="relative aspect-video">
              <img 
                src="/images/articles/refrigerator-not-cooling.jpg" 
                alt="Refrigerator Not Cooling" 
                class="w-full h-full object-cover"
              >
              <span class="absolute top-4 left-4 badge badge-primary">Refrigerator</span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                <a href="/articles/refrigerator-not-cooling">
                  Why Is My Refrigerator Not Cooling? 5 Common Causes
                </a>
              </h3>
              <p class="text-sm text-neutral-500 line-clamp-2 mb-4">
                Discover the most common reasons why your refrigerator might not be cooling properly and how to fix them.
              </p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-600">8 min read</span>
                <span class="text-neutral-400">Nov 28, 2024</span>
              </div>
            </div>
          </article>

          <!-- Article Card 2 -->
          <article class="card-hover">
            <div class="relative aspect-video">
              <img 
                src="/images/articles/ac-maintenance.jpg" 
                alt="AC Maintenance Tips" 
                class="w-full h-full object-cover"
              >
              <span class="absolute top-4 left-4 badge badge-primary">Air Conditioner</span>
              <span class="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                8:20
              </span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                <a href="/articles/ac-maintenance-tips">
                  Essential AC Maintenance Tips for Summer
                </a>
              </h3>
              <p class="text-sm text-neutral-500 line-clamp-2 mb-4">
                Keep your air conditioner running efficiently with these simple maintenance tips.
              </p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-600">6 min read</span>
                <span class="text-neutral-400">Nov 25, 2024</span>
              </div>
            </div>
          </article>

          <!-- Article Card 3 -->
          <article class="card-hover">
            <div class="relative aspect-video">
              <img 
                src="/images/articles/dishwasher-not-draining.jpg" 
                alt="Dishwasher Not Draining" 
                class="w-full h-full object-cover"
              >
              <span class="absolute top-4 left-4 badge badge-primary">Dishwasher</span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                <a href="/articles/dishwasher-not-draining">
                  Dishwasher Not Draining? Here's What to Do
                </a>
              </h3>
              <p class="text-sm text-neutral-500 line-clamp-2 mb-4">
                Step-by-step guide to unclog your dishwasher and get it draining properly again.
              </p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-600">5 min read</span>
                <span class="text-neutral-400">Nov 22, 2024</span>
              </div>
            </div>
          </article>

          <!-- Article Card 4 - Arabic (RTL direction based on article language) -->
          <article class="card-hover rtl-text">
            <div class="relative aspect-video">
              <img 
                src="/images/articles/washing-machine-noise-ar.jpg" 
                alt="صوت غسالة الملابس" 
                class="w-full h-full object-cover"
              >
              <span class="absolute top-4 right-4 badge badge-primary font-arabic">غسالة الملابس</span>
              <span class="absolute top-4 left-4 badge badge-neutral">العربية</span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors font-arabic">
                <a href="/articles/washing-machine-noise-ar">
                  لماذا تصدر غسالتي أصواتاً غريبة؟
                </a>
              </h3>
              <p class="text-sm text-neutral-500 line-clamp-2 mb-4 font-arabic">
                دليل شامل لفهم وحل مشاكل الأصوات الغريبة في غسالة الملابس.
              </p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-600 font-arabic">٧ دقائق قراءة</span>
                <span class="text-neutral-400">Nov 20, 2024</span>
              </div>
            </div>
          </article>

          <!-- Article Card 5 -->
          <article class="card-hover">
            <div class="relative aspect-video">
              <img 
                src="/images/articles/oven-not-heating.jpg" 
                alt="Oven Not Heating" 
                class="w-full h-full object-cover"
              >
              <span class="absolute top-4 left-4 badge badge-primary">Oven & Stove</span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                <a href="/articles/oven-not-heating">
                  Oven Not Heating? Troubleshooting Guide
                </a>
              </h3>
              <p class="text-sm text-neutral-500 line-clamp-2 mb-4">
                Common reasons why your oven might not be heating and how to diagnose the problem.
              </p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-600">7 min read</span>
                <span class="text-neutral-400">Nov 18, 2024</span>
              </div>
            </div>
          </article>

          <!-- Article Card 6 -->
          <article class="card-hover">
            <div class="relative aspect-video">
              <img 
                src="/images/articles/dryer-not-drying.jpg" 
                alt="Dryer Not Drying Clothes" 
                class="w-full h-full object-cover"
              >
              <span class="absolute top-4 left-4 badge badge-primary">Dryer</span>
              <span class="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                6:15
              </span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                <a href="/articles/dryer-not-drying">
                  Why Is My Dryer Not Drying Clothes?
                </a>
              </h3>
              <p class="text-sm text-neutral-500 line-clamp-2 mb-4">
                Learn how to fix a dryer that's not properly drying your clothes.
              </p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-600">6 min read</span>
                <span class="text-neutral-400">Nov 15, 2024</span>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More -->
        <div class="text-center mt-10">
          <button type="button" class="btn btn-outline btn-lg">
            Load More Articles
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container-wide text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Can't Find a Solution?</h2>
        <p class="text-lg text-white/90 max-w-xl mx-auto mb-6">
          If DIY isn't working out, our verified technicians are ready to help.
        </p>
        <a href="/book-technician" class="btn btn-white btn-lg">
          Book a Technician
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ArticlesView'
}
</script>

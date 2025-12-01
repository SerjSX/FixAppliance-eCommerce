<template>
  <!-- Article Card Component -->
  <article class="card-hover">
    <!-- Article Image -->
    <div class="relative aspect-video">
      <img 
        src="/images/articles/placeholder-article-image.jpg" 
        alt="How to troubleshoot your washing machine" 
        class="w-full h-full object-cover"
      >
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 badge badge-primary">
        Washing Machine
      </span>
      <!-- Video Badge (if article has video) -->
      <span class="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        5:30
      </span>
    </div>

    <!-- Article Content -->
    <div class="p-5">
      <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
        <a href="/articles/how-to-troubleshoot-washing-machine">
          How to Troubleshoot Your Washing Machine: A Complete Guide
        </a>
      </h3>
      <p class="text-sm text-neutral-500 line-clamp-2 mb-4">
        Learn the most common washing machine problems and how to diagnose them yourself before calling a technician.
      </p>

      <!-- Meta Info -->
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-2">
          <span class="avatar avatar-xs bg-primary-100 text-primary-600">A</span>
          <span class="text-neutral-600">Ahmad Hassan</span>
        </div>
        <span class="text-neutral-400">5 min read</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArticleCard'
}
</script>

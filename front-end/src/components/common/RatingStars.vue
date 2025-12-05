<template>
  <div class="flex items-center gap-1">
    <!-- Stars -->
    <svg 
      v-for="star in 5" 
      :key="star"
      class="star"
      :class="star <= Math.floor(rating) ? 'star-filled' : ''"
      :fill="star <= Math.floor(rating) ? 'currentColor' : 'none'"
      :stroke="star <= Math.floor(rating) ? 'none' : 'currentColor'"
      viewBox="0 0 20 20"
    >
      <path 
        v-if="star <= Math.floor(rating)"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
      <path 
        v-else
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>

    <!-- Rating Text -->
    <span v-if="showText" class="ml-2 text-sm text-neutral-600">
      {{ rating.toFixed(1) }} <span v-if="reviewCount">({{ reviewCount }} {{ reviewCount === 1 ? 'review' : 'reviews' }})</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0 && value <= 5
    },
    reviewCount: {
      type: Number,
      default: null
    },
    showText: {
      type: Boolean,
      default: true
    }
  }
}
</script>

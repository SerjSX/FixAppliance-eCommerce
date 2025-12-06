<template>
  <!-- Modal Component -->
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full" role="dialog" aria-modal="true" :aria-labelledby="title">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-neutral-200">
          <h3 class="text-lg font-semibold text-neutral-900">
            {{ title }}
          </h3>
          <button 
            type="button" 
            @click="$emit('close')"
            class="text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body (slot) -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    title: {
      type: String,
      default: 'Modal'
    }
  },
  emits: ['close']
}
</script>

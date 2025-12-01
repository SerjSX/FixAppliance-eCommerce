<template>
  <!-- Modal Component -->
  <div class="modal-overlay">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <!-- Modal Header -->
      <div class="modal-header">
        <h3 id="modal-title" class="text-lg font-semibold text-neutral-900">
          Modal Title
        </h3>
        <button 
          type="button" 
          class="btn-ghost btn-icon-sm text-neutral-400 hover:text-neutral-600"
          aria-label="Close modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <p class="text-neutral-600">
          Modal content goes here. You can add any content, forms, or interactive elements.
        </p>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost">Cancel</button>
        <button type="button" class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal'
}
</script>

<template>
  <Transition name="alert-fade">
    <div v-if="visible" :class="alertClasses" role="alert">
      <!-- Icon -->
      <component :is="iconComponent" class="w-5 h-5 flex-shrink-0" />
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h4 v-if="title" class="font-medium">{{ title }}</h4>
        <p :class="['text-sm', title ? 'opacity-90' : '']">{{ message }}</p>
      </div>
      
      <!-- Close Button -->
      <button 
        v-if="dismissible"
        type="button" 
        class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        @click="handleDismiss"
        aria-label="Dismiss alert"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script>
import { h } from 'vue'

// SVG Icon components for each alert type
const InfoIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const SuccessIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

const WarningIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' })
    ])
  }
}

const ErrorIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
}

export default {
  name: 'AlertMessage',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
    },
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    autoDismiss: {
      type: Number,
      default: 0 // 0 means no auto-dismiss, otherwise milliseconds
    }
  },
  emits: ['dismiss'],
  data() {
    return {
      visible: true,
      dismissTimer: null
    }
  },
  computed: {
    alertClasses() {
      return ['alert', `alert-${this.type}`]
    },
    iconComponent() {
      const icons = {
        info: InfoIcon,
        success: SuccessIcon,
        warning: WarningIcon,
        error: ErrorIcon
      }
      return icons[this.type]
    }
  },
  mounted() {
    if (this.autoDismiss > 0) {
      this.dismissTimer = setTimeout(() => this.handleDismiss(), this.autoDismiss)
    }
  },
  beforeUnmount() {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer)
    }
  },
  methods: {
    handleDismiss() {
      this.visible = false
      this.$emit('dismiss')
    }
  }
}
</script>

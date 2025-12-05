<template>
  <div class="card">
    <div class="card-header flex items-center justify-between">
      <div>
        <h3 class="font-semibold text-neutral-900">{{ title }}</h3>
        <p class="text-sm text-neutral-500" v-if="subtitle">{{ subtitle }}</p>
      </div>
      <slot name="header-action"></slot>
    </div>
    <div class="card-body">
      <!-- Total Earnings -->
      <div class="mb-6">
        <p class="text-sm text-neutral-500 mb-1">Total Earnings</p>
        <p class="text-3xl font-bold text-neutral-900">${{ formattedTotal }}</p>
        <p class="text-sm mt-1" :class="trendClass" v-if="trend">
          {{ trendIcon }} {{ Math.abs(trend) }}% from last {{ period }}
        </p>
      </div>

      <!-- Breakdown -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-600">Completed Jobs</span>
          <span class="font-medium text-neutral-900">{{ completedJobs }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-600">Service Fees</span>
          <span class="font-medium text-neutral-900">${{ formattedServiceFees }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-600">Platform Fee ({{ platformFeePercent }}%)</span>
          <span class="font-medium text-error-600">-${{ formattedPlatformFee }}</span>
        </div>
        <div class="divider"></div>
        <div class="flex items-center justify-between">
          <span class="font-semibold text-neutral-900">Net Earnings</span>
          <span class="font-bold text-success-600">${{ formattedNetEarnings }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <a 
          :href="detailsLink" 
          class="btn btn-outline btn-sm flex-1"
        >
          View Details
        </a>
        <button 
          type="button" 
          class="btn btn-primary btn-sm flex-1"
          @click="$emit('withdraw')"
          v-if="showWithdraw"
        >
          Withdraw
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechnicianEarningsCard',
  props: {
    title: {
      type: String,
      default: 'Earnings Overview'
    },
    subtitle: {
      type: String,
      default: null
    },
    totalEarnings: {
      type: [Number, String],
      required: true
    },
    serviceFees: {
      type: [Number, String],
      required: true
    },
    platformFee: {
      type: [Number, String],
      required: true
    },
    platformFeePercent: {
      type: [Number, String],
      default: 15
    },
    completedJobs: {
      type: [Number, String],
      required: true
    },
    trend: {
      type: Number,
      default: null
    },
    period: {
      type: String,
      default: 'month'
    },
    detailsLink: {
      type: String,
      default: '/technician-dashboard/earnings'
    },
    showWithdraw: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formattedTotal() {
      return parseFloat(this.totalEarnings).toFixed(2)
    },
    formattedServiceFees() {
      return parseFloat(this.serviceFees).toFixed(2)
    },
    formattedPlatformFee() {
      return parseFloat(this.platformFee).toFixed(2)
    },
    formattedNetEarnings() {
      return (parseFloat(this.serviceFees) - parseFloat(this.platformFee)).toFixed(2)
    },
    trendClass() {
      return this.trend >= 0 ? 'text-success-600' : 'text-error-600'
    },
    trendIcon() {
      return this.trend >= 0 ? '↑' : '↓'
    }
  },
  emits: ['withdraw']
}
</script>

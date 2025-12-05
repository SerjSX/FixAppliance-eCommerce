<template>
  <div class="form-group">
    <label class="form-label form-label-required">
      {{ label }}
    </label>
    <p class="form-hint mb-3" v-if="hint">{{ hint }}</p>
    
    <div class="space-y-2">
      <label 
        v-for="area in serviceAreas" 
        :key="area.id"
        class="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
        :class="{ 'bg-primary-50 border-primary-300': isSelected(area.id) }"
      >
        <input 
          type="checkbox" 
          :value="area.id"
          :checked="isSelected(area.id)"
          @change="toggleArea(area.id)"
          class="form-checkbox"
        >
        <div class="flex-1">
          <span class="font-medium text-neutral-900">{{ area.name }}</span>
          <p class="text-xs text-neutral-500" v-if="area.description">
            {{ area.description }}
          </p>
        </div>
      </label>
    </div>

    <p class="form-hint mt-2" v-if="selectedCount > 0">
      Serving {{ selectedCount }} {{ selectedCount === 1 ? 'area' : 'areas' }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TechnicianServiceAreaSelector',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    serviceAreas: {
      type: Array,
      required: true,
      // Expected format: [{ id: 1, name: 'Beirut', description: 'City center and suburbs' }]
    },
    label: {
      type: String,
      default: 'Select Service Areas'
    },
    hint: {
      type: String,
      default: 'Choose the areas where you can provide service'
    }
  },
  computed: {
    selectedCount() {
      return this.modelValue.length
    }
  },
  methods: {
    isSelected(id) {
      return this.modelValue.includes(id)
    },
    toggleArea(id) {
      const newValue = this.isSelected(id)
        ? this.modelValue.filter(item => item !== id)
        : [...this.modelValue, id]
      
      this.$emit('update:modelValue', newValue)
    }
  },
  emits: ['update:modelValue']
}
</script>

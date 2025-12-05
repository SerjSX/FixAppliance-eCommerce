<template>
  <div class="form-group">
    <label class="form-label form-label-required">
      {{ label }}
    </label>
    <p class="form-hint mb-3" v-if="hint">{{ hint }}</p>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <label 
        v-for="specialty in specialties" 
        :key="specialty.id"
        class="relative cursor-pointer"
      >
        <input 
          type="checkbox" 
          :value="specialty.id"
          :checked="isSelected(specialty.id)"
          @change="toggleSpecialty(specialty.id)"
          class="peer sr-only"
          :aria-label="specialty.name"
        >
        <div class="p-4 border-2 border-neutral-200 rounded-lg text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all hover:border-primary-300">
          <img 
            :src="`/images/icons/${specialty.icon}.svg`" 
            alt="" 
            class="w-10 h-10 mx-auto mb-2" 
            aria-hidden="true"
          >
          <span class="text-sm font-medium block">{{ specialty.name }}</span>
        </div>
      </label>
    </div>

    <p class="form-hint mt-2" v-if="selectedCount > 0">
      {{ selectedCount }} {{ selectedCount === 1 ? 'specialty' : 'specialties' }} selected
    </p>
  </div>
</template>

<script>
export default {
  name: 'TechnicianSpecialtySelector',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    specialties: {
      type: Array,
      required: true,
      // Expected format: [{ id: 1, name: 'Washing Machine', icon: 'washing-machine' }]
    },
    label: {
      type: String,
      default: 'Select Your Specialties'
    },
    hint: {
      type: String,
      default: 'Choose the appliances you can repair'
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
    toggleSpecialty(id) {
      const newValue = this.isSelected(id)
        ? this.modelValue.filter(item => item !== id)
        : [...this.modelValue, id]
      
      this.$emit('update:modelValue', newValue)
    }
  },
  emits: ['update:modelValue']
}
</script>

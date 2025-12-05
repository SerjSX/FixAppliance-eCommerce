// Form validation utilities
export const required = (value) => !!value || 'This field is required'

export const email = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value) || 'Invalid email address'
}

export const minLength = (min) => (value) => {
  return (value && value.length >= min) || `Minimum ${min} characters required`
}

export const maxLength = (max) => (value) => {
  return (!value || value.length <= max) || `Maximum ${max} characters allowed`
}

export const phone = (value) => {
  if (!value) return true
  const pattern = /^[\d\s\-+()]+$/
  return pattern.test(value) || 'Invalid phone number'
}

export const numeric = (value) => {
  return !isNaN(value) || 'Must be a number'
}

export const positiveNumber = (value) => {
  return (value > 0) || 'Must be a positive number'
}

// Validate form with rules
export const validateForm = (data, rules) => {
  const errors = {}
  for (const field in rules) {
    for (const rule of rules[field]) {
      const result = rule(data[field])
      if (result !== true) {
        errors[field] = result
        break
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors }
}

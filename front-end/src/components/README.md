# FixAppliance Vue.js Components Guide

This guide explains how to use the reusable components in the FixAppliance frontend.

## Table of Contents

- [Common Components](#common-components)
  - [AlertMessage](#alertmessage)
  - [BaseButton](#basebutton)
  - [BaseModal](#basemodal)
  - [LoadingSpinner](#loadingspinner)
  - [RatingStars](#ratingstars)
  - [BookingStatusBadge](#bookingstatusbadge)
  - [ServiceCard](#servicecard)

---

## Common Components

### AlertMessage

The `AlertMessage` component displays notification messages with different severity levels (info, success, warning, error).

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | String | `'info'` | Alert type: `'info'`, `'success'`, `'warning'`, `'error'` |
| `title` | String | `''` | Optional title for the alert |
| `message` | String | `''` | Main message content |
| `dismissible` | Boolean | `true` | Whether the alert can be dismissed |

#### Usage Example

```vue
<template>
  <div>
    <!-- Info Alert -->
    <AlertMessage 
      type="info" 
      title="Information" 
      message="Your profile has been updated." 
    />

    <!-- Success Alert -->
    <AlertMessage 
      type="success" 
      title="Success!" 
      message="Your booking has been confirmed." 
    />

    <!-- Warning Alert -->
    <AlertMessage 
      type="warning" 
      title="Warning" 
      message="Please complete your profile to book technicians." 
    />

    <!-- Error Alert -->
    <AlertMessage 
      type="error" 
      title="Error" 
      message="Something went wrong. Please try again." 
    />
  </div>
</template>

<script>
import AlertMessage from '@/components/common/AlertMessage.vue'

export default {
  components: { AlertMessage }
}
</script>
```

#### Handling Dismiss Event

```vue
<template>
  <AlertMessage 
    v-if="showAlert"
    type="success" 
    message="Booking confirmed!" 
    @dismiss="showAlert = false"
  />
</template>

<script>
export default {
  data() {
    return {
      showAlert: true
    }
  }
}
</script>
```

---

### BaseButton

The `BaseButton` component is a reusable button with multiple variants and sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | String | `'primary'` | Button style: `'primary'`, `'secondary'`, `'outline'`, `'ghost'`, `'danger'` |
| `size` | String | `'md'` | Button size: `'sm'`, `'md'`, `'lg'` |
| `disabled` | Boolean | `false` | Disable the button |
| `loading` | Boolean | `false` | Show loading spinner |
| `type` | String | `'button'` | Button type: `'button'`, `'submit'`, `'reset'` |

#### Usage Example

```vue
<template>
  <div>
    <!-- Primary Button -->
    <BaseButton variant="primary">Book Now</BaseButton>

    <!-- Secondary Button -->
    <BaseButton variant="secondary">Learn More</BaseButton>

    <!-- Outline Button -->
    <BaseButton variant="outline" size="sm">Cancel</BaseButton>

    <!-- Loading Button -->
    <BaseButton variant="primary" :loading="isLoading">
      Submitting...
    </BaseButton>

    <!-- Submit Button -->
    <BaseButton type="submit" variant="primary">
      Create Account
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  components: { BaseButton },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>
```

---

### BaseModal

The `BaseModal` component displays a modal dialog overlay.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | Boolean | `false` | Controls modal visibility |
| `title` | String | `''` | Modal title |
| `size` | String | `'md'` | Modal size: `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `closeOnOverlay` | Boolean | `true` | Close when clicking overlay |

#### Events

| Event | Description |
|-------|-------------|
| `close` | Emitted when modal is closed |
| `confirm` | Emitted when confirm button is clicked |

#### Usage Example

```vue
<template>
  <div>
    <BaseButton @click="showModal = true">Open Modal</BaseButton>

    <BaseModal 
      :isOpen="showModal" 
      title="Confirm Booking"
      @close="showModal = false"
      @confirm="handleConfirm"
    >
      <p>Are you sure you want to confirm this booking?</p>
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  components: { BaseModal, BaseButton },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    handleConfirm() {
      // Handle confirmation logic
      console.log('Booking confirmed!')
      this.showModal = false
    }
  }
}
</script>
```

#### Custom Footer Slot

```vue
<BaseModal :isOpen="showModal" title="Custom Footer">
  <p>Modal content here</p>
  
  <template #footer>
    <BaseButton variant="ghost" @click="showModal = false">
      Cancel
    </BaseButton>
    <BaseButton variant="danger" @click="handleDelete">
      Delete
    </BaseButton>
  </template>
</BaseModal>
```

---

### LoadingSpinner

The `LoadingSpinner` component shows a loading indicator.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | String | `'md'` | Spinner size: `'sm'`, `'md'`, `'lg'` |
| `color` | String | `'primary'` | Spinner color class |

#### Usage Example

```vue
<template>
  <div>
    <!-- Default spinner -->
    <LoadingSpinner />

    <!-- Small spinner -->
    <LoadingSpinner size="sm" />

    <!-- Large spinner with custom color -->
    <LoadingSpinner size="lg" color="secondary" />

    <!-- Conditional rendering -->
    <LoadingSpinner v-if="isLoading" />
    <div v-else>Content loaded!</div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

export default {
  components: { LoadingSpinner }
}
</script>
```

---

### RatingStars

The `RatingStars` component displays a star rating.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | Number | `0` | Current rating (0-5) |
| `maxRating` | Number | `5` | Maximum rating value |
| `readonly` | Boolean | `true` | Whether rating can be changed |
| `size` | String | `'md'` | Star size: `'sm'`, `'md'`, `'lg'` |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:rating` | Number | Emitted when rating changes |

#### Usage Example

```vue
<template>
  <div>
    <!-- Display-only rating -->
    <RatingStars :rating="4.5" readonly />

    <!-- Interactive rating -->
    <RatingStars 
      v-model:rating="userRating" 
      :readonly="false"
    />
    
    <!-- Small rating display -->
    <RatingStars :rating="3" size="sm" />
  </div>
</template>

<script>
import RatingStars from '@/components/common/RatingStars.vue'

export default {
  components: { RatingStars },
  data() {
    return {
      userRating: 0
    }
  }
}
</script>
```

---

### BookingStatusBadge

The `BookingStatusBadge` component displays a colored badge indicating booking status.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | String | `'pending'` | Status: `'pending'`, `'confirmed'`, `'in-progress'`, `'completed'`, `'cancelled'` |

#### Usage Example

```vue
<template>
  <div>
    <BookingStatusBadge status="pending" />
    <BookingStatusBadge status="confirmed" />
    <BookingStatusBadge status="in-progress" />
    <BookingStatusBadge status="completed" />
    <BookingStatusBadge status="cancelled" />
  </div>
</template>

<script>
import BookingStatusBadge from '@/components/common/BookingStatusBadge.vue'

export default {
  components: { BookingStatusBadge }
}
</script>
```

---

### ServiceCard

The `ServiceCard` component displays an appliance service type with icon and description.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | `''` | Service title |
| `description` | String | `''` | Service description |
| `icon` | String | `''` | Icon image path |
| `href` | String | `'#'` | Link URL |

#### Usage Example

```vue
<template>
  <ServiceCard
    title="Washing Machine"
    description="Repairs for all brands and types"
    icon="/images/icons/washing-machine.svg"
    href="/services/washing-machine"
  />
</template>

<script>
import ServiceCard from '@/components/common/ServiceCard.vue'

export default {
  components: { ServiceCard }
}
</script>
```

---

## UI Patterns

### Empty State Pattern

Use empty states when there's no data to display. Example from MyBookingsView:

```vue
<template>
  <div>
    <!-- Show empty state when no data -->
    <div v-if="bookings.length === 0" class="empty-state">
      <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
        </path>
      </svg>
      <h3 class="empty-state-title">No bookings yet</h3>
      <p class="empty-state-description">
        You haven't made any bookings yet. Book a technician to get started.
      </p>
      <a href="/book-technician" class="btn btn-primary">Book a Technician</a>
    </div>

    <!-- Show list when data exists -->
    <div v-else>
      <BookingCard 
        v-for="booking in bookings" 
        :key="booking.id" 
        :booking="booking" 
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookings: [] // Empty array shows empty state
    }
  }
}
</script>
```

---

## Best Practices

1. **Import Components**: Always import components from their path:
   ```javascript
   import AlertMessage from '@/components/common/AlertMessage.vue'
   ```

2. **Register Components**: Register in the `components` option or globally in `main.js`

3. **Use Props**: Pass data through props, don't modify parent data directly

4. **Emit Events**: Use `$emit` to communicate with parent components

5. **Scoped Styles**: Component styles are scoped by default - global styles are in `/src/styles/`

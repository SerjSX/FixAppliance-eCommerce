# FixAppliance Frontend - Component Documentation

## Overview
This document describes all reusable Vue components in the FixAppliance platform, their props, events, and usage examples.

---

## Common Components

### AlertMessage
Displays alert messages with different variants (info, success, warning, error).

**Usage:**
```vue
<AlertMessage 
  variant="success" 
  title="Booking Confirmed"
  message="Your booking has been successfully confirmed."
  :dismissible="true"
  @close="handleClose"
/>
```

**Props:**
- `variant` (String): 'info' | 'success' | 'warning' | 'error' - Default: 'info'
- `title` (String): Alert heading
- `message` (String): Alert message text
- `dismissible` (Boolean): Show close button - Default: true

**Events:**
- `close`: Emitted when close button clicked

---

### BaseButton
Basic button component with multiple variants and sizes.

**Usage:**
```vue
<BaseButton variant="primary" size="lg" @click="handleClick">
  Submit Form
</BaseButton>
```

**Props:**
- `variant` (String): 'primary' | 'secondary' | 'outline' | 'ghost' - Default: 'primary'
- `size` (String): 'xs' | 'sm' | 'md' | 'lg' | 'xl' - Default: 'md'
- `disabled` (Boolean): Disable button - Default: false

---

### BaseModal
Modal dialog component with header, body, and footer slots.

**Usage:**
```vue
<BaseModal 
  v-model="isOpen" 
  title="Confirm Action"
  :closeable="true"
>
  <template #body>
    <p>Are you sure you want to proceed?</p>
  </template>
  <template #footer>
    <button @click="isOpen = false">Cancel</button>
    <button @click="confirm">Confirm</button>
  </template>
</BaseModal>
```

**Props:**
- `modelValue` (Boolean): Controls modal visibility
- `title` (String): Modal title
- `closeable` (Boolean): Show close button - Default: true

---

### BookingStatusBadge
Displays booking status with appropriate color coding.

**Usage:**
```vue
<BookingStatusBadge status="confirmed" />
```

**Props:**
- `status` (String): 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' - Required

---

### LoadingSpinner
Simple loading spinner indicator.

**Usage:**
```vue
<LoadingSpinner :size="'lg'" />
```

**Props:**
- `size` (String): 'sm' | 'md' | 'lg' - Default: 'md'

---

### RatingStars
Displays star rating with optional review count.

**Usage:**
```vue
<RatingStars 
  :rating="4.5" 
  :reviewCount="128"
  :showText="true"
/>
```

**Props:**
- `rating` (Number): Rating value 0-5 - Required
- `reviewCount` (Number): Number of reviews - Optional
- `showText` (Boolean): Show rating text - Default: true

---

### ServiceCard
Card component for displaying service offerings.

**Usage:**
```vue
<ServiceCard 
  title="Washing Machine Repair"
  description="Expert repairs for all brands"
  icon="washing-machine"
  link="/services/washing-machine"
/>
```

**Props:**
- `title` (String): Service title - Required
- `description` (String): Service description
- `icon` (String): Icon name - Required
- `link` (String): Service detail page link

---

## Booking Components

### BookingCard
Displays booking information in a card format.

**Usage:**
```vue
<BookingCard 
  :booking="bookingData"
  @view="handleView"
  @cancel="handleCancel"
  @pay="handlePay"
/>
```

**Props:**
- `booking` (Object): Booking data object containing:
  - `id`: Booking ID
  - `applianceType`: Type of appliance
  - `status`: Current status
  - `date`: Appointment date
  - `time`: Appointment time
  - `price`: Service price
  - `description`: Issue description
  - `technicianName`: Assigned technician (optional)

**Events:**
- `view`: View booking details
- `cancel`: Cancel booking
- `pay`: Proceed to payment

---

### BookingForm
Form for creating new bookings.

**Usage:**
```vue
<BookingForm 
  :appliances="appliancesList"
  :serviceAreas="serviceAreasList"
  @submit="handleBookingSubmit"
/>
```

**Props:**
- `appliances` (Array): List of available appliances
- `serviceAreas` (Array): List of service areas
- `initialData` (Object): Pre-fill form data - Optional

**Events:**
- `submit`: Form submission with booking data

---

## Layout Components

### AppHeader
Main navigation header with user authentication state.

**Usage:**
```vue
<AppHeader 
  :user="currentUser"
  :isAuthenticated="true"
  @logout="handleLogout"
/>
```

**Props:**
- `user` (Object): Current user data
- `isAuthenticated` (Boolean): User login state

---

### AppFooter
Footer with links, contact info, and social media.

**Usage:**
```vue
<AppFooter />
```

No props required.

---

### AppSidebar
Dashboard sidebar navigation.

**Usage:**
```vue
<AppSidebar 
  :activeRoute="currentRoute"
  :user="currentUser"
/>
```

**Props:**
- `activeRoute` (String): Current route name
- `user` (Object): User data

---

## Technician Components

### TechnicianBookingCard
Booking card specifically for technician dashboard.

**Usage:**
```vue
<TechnicianBookingCard 
  :bookingId="12345"
  applianceType="Washing Machine"
  applianceIcon="washing-machine"
  issueType="Repair"
  description="Machine making loud noise..."
  location="Beirut, Lebanon"
  date="Dec 20, 2024"
  time="10:00 AM"
  customerName="John Doe"
  :price="50"
  status="pending"
  @accept="handleAccept"
  @decline="handleDecline"
  @start="handleStart"
  @complete="handleComplete"
/>
```

**Props:**
- `bookingId` (String|Number): Booking ID - Required
- `applianceType` (String): Appliance type - Required
- `applianceIcon` (String): Icon name - Default: 'washing-machine'
- `issueType` (String): Type of service - Default: 'Repair'
- `description` (String): Issue description - Required
- `location` (String): Service location - Required
- `date` (String): Appointment date - Required
- `time` (String): Appointment time - Required
- `customerName` (String): Customer name - Optional
- `price` (String|Number): Service price - Required
- `status` (String): 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'declined'

**Events:**
- `accept`: Accept booking
- `decline`: Decline booking
- `start`: Start job
- `complete`: Mark job as complete

---

### TechnicianSpecialtySelector
Multi-select component for choosing appliance specialties.

**Usage:**
```vue
<TechnicianSpecialtySelector 
  v-model="selectedSpecialties"
  :specialties="appliancesList"
  label="Select Your Specialties"
  hint="Choose the appliances you can repair"
/>
```

**Props:**
- `modelValue` (Array): Selected specialty IDs - Default: []
- `specialties` (Array): Available specialties - Required
  - Format: `[{ id: 1, name: 'Washing Machine', icon: 'washing-machine' }]`
- `label` (String): Form label
- `hint` (String): Helper text

**Events:**
- `update:modelValue`: Emits updated selections

---

### TechnicianServiceAreaSelector
Multi-select component for choosing service areas.

**Usage:**
```vue
<TechnicianServiceAreaSelector 
  v-model="selectedAreas"
  :serviceAreas="areasList"
  label="Select Service Areas"
  hint="Choose the areas where you can provide service"
/>
```

**Props:**
- `modelValue` (Array): Selected area IDs - Default: []
- `serviceAreas` (Array): Available service areas - Required
  - Format: `[{ id: 1, name: 'Beirut', description: 'City center' }]`
- `label` (String): Form label
- `hint` (String): Helper text

**Events:**
- `update:modelValue`: Emits updated selections

---

### TechnicianEarningsCard
Displays earnings summary with breakdown.

**Usage:**
```vue
<TechnicianEarningsCard 
  title="Monthly Earnings"
  subtitle="December 2024"
  :totalEarnings="1420"
  :serviceFees="1680"
  :platformFee="260"
  :platformFeePercent="15"
  :completedJobs="28"
  :trend="12"
  period="month"
  detailsLink="/technician-dashboard/earnings"
  :showWithdraw="true"
  @withdraw="handleWithdraw"
/>
```

**Props:**
- `title` (String): Card title - Default: 'Earnings Overview'
- `subtitle` (String): Subtitle - Optional
- `totalEarnings` (Number|String): Total earnings amount - Required
- `serviceFees` (Number|String): Total service fees - Required
- `platformFee` (Number|String): Platform fee amount - Required
- `platformFeePercent` (Number|String): Platform fee percentage - Default: 15
- `completedJobs` (Number|String): Number of completed jobs - Required
- `trend` (Number): Percentage change from last period - Optional
- `period` (String): Time period - Default: 'month'
- `detailsLink` (String): Link to detailed earnings page
- `showWithdraw` (Boolean): Show withdraw button - Default: true

**Events:**
- `withdraw`: Initiate withdrawal process

---

## Auth Components

### LoginForm
User login form.

**Usage:**
```vue
<LoginForm 
  @submit="handleLogin"
  @forgotPassword="handleForgotPassword"
/>
```

**Events:**
- `submit`: Login form submission
- `forgotPassword`: Forgot password clicked

---

### RegisterForm
User registration form.

**Usage:**
```vue
<RegisterForm 
  :cities="citiesList"
  @submit="handleRegister"
/>
```

**Props:**
- `cities` (Array): List of available cities

**Events:**
- `submit`: Registration form submission

---

## Best Practices

1. **Always use props for dynamic data** - Never hardcode values in templates
2. **Emit events for user actions** - Don't directly manipulate parent state
3. **Use v-model for form inputs** - Enables two-way data binding
4. **Provide default prop values** - Makes components more flexible
5. **Add prop validation** - Use type checking and validators
6. **Use named slots** - For flexible content composition
7. **Keep components focused** - Each component should have a single responsibility
8. **Document complex props** - Add comments explaining expected formats

## Styling Guidelines

1. **Use TailwindCSS utility classes** - Prefer `class="btn btn-primary"` over custom CSS
2. **Follow spacing conventions** - Use consistent gap/padding utilities
3. **Maintain responsive design** - Include mobile-first breakpoints
4. **Use CSS custom classes for complex styles** - Defined in `src/styles/components.css`
5. **Keep HTML clean** - Extract repeated patterns into components
6. **Use semantic HTML** - Proper tags for accessibility

## Accessibility

1. **Add ARIA labels** - For icon-only buttons and interactive elements
2. **Use semantic HTML** - `<button>`, `<nav>`, `<main>`, etc.
3. **Include alt text** - For all images
4. **Support keyboard navigation** - Proper tab order and focus states
5. **Provide form labels** - All inputs need associated labels

<template>
  <!-- Login Form Component -->
  <div class="w-full max-w-md mx-auto">
    <form class="space-y-5">
      <!-- Email -->
      <div class="form-group">
        <label for="login-email" class="form-label">Email Address</label>
        <div class="form-input-wrapper">
          <svg class="form-input-icon form-input-icon-left-position w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <input 
            type="email" 
            id="login-email" 
            class="form-input form-input-icon-left" 
            placeholder="name@example.com"
            autocomplete="email"
          >
        </div>
      </div>

      <!-- Password -->
      <div class="form-group">
        <div class="flex items-center justify-between mb-1.5">
          <label for="login-password" class="form-label mb-0">Password</label>
          <a href="/forgot-password" class="text-sm text-primary-600 hover:underline">Forgot password?</a>
        </div>
        <div class="form-input-wrapper">
          <svg class="form-input-icon form-input-icon-left-position w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <input 
            type="password" 
            id="login-password" 
            class="form-input form-input-icon-left" 
            placeholder="Enter your password"
            autocomplete="current-password"
          >
          <button type="button" class="form-input-icon form-input-icon-right-position text-neutral-400 hover:text-neutral-600" aria-label="Toggle password visibility">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Remember Me -->
      <div class="form-check">
        <input type="checkbox" id="remember-me" class="form-checkbox">
        <label for="remember-me" class="form-check-label">Remember me</label>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary w-full">
        Sign In
      </button>

      <!-- Divider -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-neutral-200"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-white text-neutral-500">Or continue with</span>
        </div>
      </div>

      <!-- Social Login Options -->
      <div class="grid grid-cols-2 gap-3">
        <button type="button" class="btn btn-outline">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button type="button" class="btn btn-outline">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>

      <!-- Register Link -->
      <p class="text-center text-sm text-neutral-600 mt-6">
        Don't have an account? 
        <a href="/register" class="text-primary-600 font-medium hover:underline">Create one now</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>

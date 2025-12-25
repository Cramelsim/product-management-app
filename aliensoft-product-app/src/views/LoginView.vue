<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <div class="bg-primary p-3 rounded-full">
            <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          AlienSoft Product Manager
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to access the product management system
        </p>
      </div>
      
      <div class="card">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ errorMessage }}
          </div>
          
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              v-model="credentials.username"
              type="text"
              required
              class="input-field"
              placeholder="Enter your username"
              :disabled="isLoading"
            >
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="input-field"
              placeholder="Enter your password"
              :disabled="isLoading"
            >
          </div>
          
          <div>
            <button
              type="submit"
              class="w-full btn-primary flex justify-center items-center"
              :disabled="isLoading"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Demo Credentials</span>
            </div>
          </div>
          
          <div class="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p class="font-medium mb-1">Use these credentials to login:</p>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span class="font-medium">Username:</span> emilys
              </div>
              <div>
                <span class="font-medium">Password:</span> emilyspass
              </div>
              <div>
                <span class="font-medium">Username:</span> atuny0
              </div>
              <div>
                <span class="font-medium">Password:</span> 9uQFF1Lh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  username: '',
  password: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

onMounted(() => {
  // Pre-fill demo credentials for easier testing
  credentials.value.username = 'emilys'
  credentials.value.password = 'emilyspass'
})

const handleLogin = async () => {
  if (!credentials.value.username || !credentials.value.password) {
    errorMessage.value = 'Please enter both username and password'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    await authStore.login(credentials.value)
    router.push('/products')
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
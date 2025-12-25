import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin } from '@/api/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials)
      token.value = response.accessToken
      user.value = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      }
      
      // Save to localStorage
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Login failed. Please check your credentials.')
    }
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const restoreSession = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken) {
      token.value = savedToken
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    restoreSession
  }
})
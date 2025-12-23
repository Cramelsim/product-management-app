import axios from 'axios'

const API_BASE = 'https://dummyjson.com/auth'

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 401) {
      throw new Error('Invalid username or password')
    }
    throw new Error('Network error. Please try again.')
  }
}

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch user data')
  }
}
import axios from 'axios'

const API_BASE = 'https://dummyjson.com/products'

const createHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

export const fetchProducts = async (params = {}, token = '') => {
  try {
    const queryParams = new URLSearchParams(params).toString()
    const url = queryParams ? `${API_BASE}?${queryParams}` : API_BASE
    
    const response = await axios.get(url, {
      headers: createHeaders(token)
    })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

export const fetchProductById = async (id, token = '') => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`, {
      headers: createHeaders(token)
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw new Error(`Failed to fetch product with ID ${id}`)
  }
}

export const addProduct = async (productData, token = '') => {
  try {
    const response = await axios.post(`${API_BASE}/add`, productData, {
      headers: createHeaders(token)
    })
    return response.data
  } catch (error) {
    console.error('Error adding product:', error)
    throw new Error('Failed to add product')
  }
}

export const updateProduct = async (id, updates, token = '') => {
  try {
    const response = await axios.put(`${API_BASE}/${id}`, updates, {
      headers: createHeaders(token)
    })
    return response.data
  } catch (error) {
    console.error(`Error updating product ${id}:`, error)
    throw new Error(`Failed to update product with ID ${id}`)
  }
}

export const deleteProduct = async (id, token = '') => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`, {
      headers: createHeaders(token)
    })
    return response.data
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw new Error(`Failed to delete product with ID ${id}`)
  }
}

export const searchProducts = async (query, token = '') => {
  try {
    const response = await axios.get(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
      headers: createHeaders(token)
    })
    return response.data
  } catch (error) {
    console.error('Error searching products:', error)
    throw new Error('Failed to search products')
  }
}

export const fetchCategories = async (token = '') => {
  try {
    const response = await axios.get(`${API_BASE}/categories`, {
      headers: createHeaders(token)
    })
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}
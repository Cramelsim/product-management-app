
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  fetchProducts, 
  fetchProductById, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  searchProducts,
  fetchCategories 
} from '@/api/products'
import { useAuthStore } from '@/stores/auth.store'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const authStore = useAuthStore()

  const getProductById = (id) => {
    return products.value.find(product => product.id === parseInt(id))
  }

  const loadProducts = async (params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const token = authStore.token
      const data = await fetchProducts(params, token)
      products.value = data.products || []
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const loadProductById = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      const token = authStore.token
      const existingProduct = getProductById(id)
      
      if (existingProduct) {
        return existingProduct
      }
      
      const product = await fetchProductById(id, token)
      
      // Update or add to products array
      const index = products.value.findIndex(p => p.id === product.id)
      if (index !== -1) {
        products.value[index] = product
      } else {
        products.value.push(product)
      }
      
      return product
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createProduct = async (productData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const token = authStore.token
      const newProduct = await addProduct(productData, token)
      products.value.unshift(newProduct)
      return newProduct
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const modifyProduct = async (id, updates) => {
    isLoading.value = true
    error.value = null
    
    try {
      const token = authStore.token
      const updatedProduct = await updateProduct(id, updates, token)
      
      const index = products.value.findIndex(p => p.id === parseInt(id))
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...updatedProduct }
      }
      
      return updatedProduct
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const removeProduct = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      const token = authStore.token
      await deleteProduct(id, token)
      
      const index = products.value.findIndex(p => p.id === parseInt(id))
      if (index !== -1) {
        products.value.splice(index, 1)
      }
      
      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const searchProductsByQuery = async (query) => {
    isLoading.value = true
    error.value = null
    
    try {
      const token = authStore.token
      const data = await searchProducts(query, token)
      products.value = data.products || []
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const loadCategories = async () => {
    try {
      const token = authStore.token
      const data = await fetchCategories(token)
      categories.value = data
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const filteredProducts = computed(() => {
    return products.value
  })

  return {
    products,
    categories,
    isLoading,
    error,
    filteredProducts,
    getProductById,
    loadProducts,
    loadProductById,
    createProduct,
    modifyProduct,
    removeProduct,
    searchProductsByQuery,
    loadCategories
  }
})
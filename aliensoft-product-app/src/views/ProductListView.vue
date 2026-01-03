<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Products</h1>
      <p class="text-gray-600 mt-2">Manage your product inventory</p>
    </div>

    <div class="card mb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              class="pl-10 input-field"
              placeholder="Search products by title or description..."
              @input="handleSearch"
            >
          </div>
        </div>
        
        <div class="flex space-x-3">
          <select 
            v-model="selectedCategory" 
            class="input-field md:w-48"
            @change="handleCategoryFilter"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ formatCategory(category) }}
            </option>
          </select>
          
          <button 
            @click="router.push('/products/new')"
            class="btn-primary flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add Product</span>
          </button>
        </div>
      </div>
      
      <div v-if="store.categories.length === 0" class="mt-4">
        <button @click="loadCategories" class="text-sm text-primary hover:text-blue-900">
          Load categories
        </button>
      </div>
    </div>

    <div v-if="store.isLoading && store.products.length === 0" class="card">
      <div class="animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div class="space-y-3">
          <div v-for="i in 5" :key="i" class="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="store.error && store.products.length === 0" class="card">
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error loading products</h3>
        <p class="mt-1 text-sm text-gray-500">{{ store.error }}</p>
        <button @click="loadProducts" class="mt-4 btn-primary">
          Try Again
        </button>
      </div>
    </div>

    <div v-else>
      <ProductTable
        :products="filteredProducts"
        :loading="store.isLoading"
        @view-product="viewProduct"
        @edit-product="editProduct"
      />
    </div>

    <div v-if="store.products.length > 0" class="mt-6 flex items-center justify-between text-sm text-gray-700">
      <div>
        Showing <span class="font-medium">{{ filteredProducts.length }}</span> of 
        <span class="font-medium">{{ store.products.length }}</span> products
      </div>
      <div class="flex space-x-2">
        <button 
          @click="loadProducts" 
          :disabled="store.isLoading"
          class="text-primary hover:text-blue-900 disabled:text-gray-400"
        >
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products.store'
import ProductTable from '@/components/ProductTable.vue'
import AppSpinner from '@/components/AppSpinner.vue'

const router = useRouter()
const store = useProductsStore()

const searchQuery = ref('')
const selectedCategory = ref('')

const categories = computed(() => store.categories)

const filteredProducts = computed(() => {
  let filtered = [...store.products]
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => 
      product.category === selectedCategory.value
    )
  }
  
  return filtered
})

onMounted(async () => {
  await loadProducts()
})

const loadProducts = async () => {
  try {
    await store.loadProducts()
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

const loadCategories = async () => {
  try {
    await store.loadCategories()
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

const handleSearch = () => {
  // Debounced search could be implemented here
  // For now, we'll just use the computed filteredProducts
}

const handleCategoryFilter = () => {
  // Filtering is handled by computed property
}

const viewProduct = (id) => {
  router.push(`/products/${id}`)
}

const editProduct = (id) => {
  // Navigate to edit page (could be implemented later)
  router.push(`/products/${id}?edit=true`)
}

const formatCategory = (category) => {
  if (!category) return ''
  
  // Handle object format from API
  if (typeof category === 'object') {
    category = category.slug || category.name || ''
  }
  
  if (typeof category !== 'string') return ''
  
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>
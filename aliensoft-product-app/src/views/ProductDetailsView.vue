<template>
  <div>
    <div class="mb-6">
      <button 
        @click="router.push('/products')"
        class="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span>Back to Products</span>
      </button>
    </div>

    <div v-if="isLoading" class="card">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="h-64 bg-gray-200 rounded"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="card">
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error loading product</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        <button @click="loadProduct" class="mt-4 btn-primary">
          Try Again
        </button>
      </div>
    </div>

    <div v-else-if="product" class="card">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div>
          <div class="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              :src="product.thumbnail || 'https://via.placeholder.com/400'" 
              :alt="product.title"
              class="w-full h-64 lg:h-80 object-cover"
            />
          </div>
          
          <div v-if="product.images && product.images.length > 1" class="mt-4 grid grid-cols-4 gap-2">
            <img 
              v-for="(image, index) in product.images.slice(0, 4)" 
              :key="index"
              :src="image" 
              :alt="`${product.title} image ${index + 1}`"
              class="h-20 w-full object-cover rounded cursor-pointer hover:opacity-75"
              @click="product.thumbnail = image"
            />
          </div>
        </div>

        <!-- Product Details -->
        <div>
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ product.title }}</h1>
              <div class="mt-2 flex items-center space-x-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {{ formatCategory(product.category) }}
                </span>
                <span v-if="product.brand" class="text-gray-600">
                  Brand: {{ product.brand }}
                </span>
              </div>
            </div>
            
            <div class="text-right">
              <div class="text-3xl font-bold text-primary">${{ product.price.toFixed(2) }}</div>
              <div v-if="product.discountPercentage" class="text-sm text-green-600">
                Save {{ product.discountPercentage }}%
              </div>
            </div>
          </div>

          <!-- Rating -->
          <div v-if="product.rating" class="mt-4 flex items-center">
            <div class="flex items-center">
              <svg v-for="star in 5" :key="star" 
                class="h-5 w-5" 
                :class="star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
                fill="currentColor" viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="ml-2 text-gray-600">{{ product.rating.toFixed(1) }}</span>
          </div>

          <!-- Description -->
          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p class="text-gray-600 whitespace-pre-line">{{ product.description }}</p>
          </div>

          <!-- Stock Status -->
          <div class="mt-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Availability</span>
              <span :class="[
                'text-sm font-medium',
                product.stock > 20 ? 'text-green-600' : 
                product.stock > 5 ? 'text-yellow-600' : 'text-red-600'
              ]">
                {{ product.stock > 20 ? 'In Stock' : product.stock > 5 ? 'Low Stock' : 'Out of Stock' }}
                ({{ product.stock }} units)
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                :class="[
                  'h-2 rounded-full',
                  product.stock > 20 ? 'bg-green-500' : 
                  product.stock > 5 ? 'bg-yellow-500' : 'bg-red-500'
                ]"
                :style="{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }"
              ></div>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="mt-8 grid grid-cols-2 gap-4">
            <div v-if="product.weight">
              <span class="text-sm text-gray-500">Weight</span>
              <p class="font-medium">{{ product.weight }} kg</p>
            </div>
            <div v-if="product.dimensions">
              <span class="text-sm text-gray-500">Dimensions</span>
              <p class="font-medium">
                {{ product.dimensions.width }} × {{ product.dimensions.height }} × {{ product.dimensions.depth }}
              </p>
            </div>
            <div v-if="product.warrantyInformation">
              <span class="text-sm text-gray-500">Warranty</span>
              <p class="font-medium">{{ product.warrantyInformation }}</p>
            </div>
            <div v-if="product.shippingInformation">
              <span class="text-sm text-gray-500">Shipping</span>
              <p class="font-medium">{{ product.shippingInformation }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 flex space-x-4 pt-6 border-t border-gray-200">
            <button 
              @click="router.push(`/products/new`)"
              class="btn-primary flex-1"
            >
              Add Similar Product
            </button>
            <button 
              @click="handleDelete"
              class="btn-danger flex-1"
              :disabled="isDeleting"
            >
              <span v-if="isDeleting">Deleting...</span>
              <span v-else>Delete Product</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div v-if="product.reviews && product.reviews.length > 0" class="mt-12">
        <h3 class="text-lg font-medium text-gray-900 mb-6">Customer Reviews</h3>
        <div class="space-y-4">
          <div v-for="review in product.reviews" :key="review.date" class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-gray-900">{{ review.reviewerName }}</h4>
                <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
              </div>
              <div class="flex items-center">
                <svg v-for="star in 5" :key="star" 
                  class="h-4 w-4" 
                  :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor" viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-gray-600">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products.store'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()

const product = ref(null)
const isLoading = ref(false)
const error = ref('')
const isDeleting = ref(false)

onMounted(async () => {
  await loadProduct()
})

watch(() => route.params.id, async () => {
  await loadProduct()
})

const loadProduct = async () => {
  if (!route.params.id) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    product.value = await store.loadProductById(route.params.id)
  } catch (err) {
    error.value = err.message || 'Failed to load product details'
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    return
  }
  
  isDeleting.value = true
  
  try {
    await store.removeProduct(route.params.id)
    router.push('/products')
  } catch (err) {
    alert(`Failed to delete product: ${err.message}`)
  } finally {
    isDeleting.value = false
  }
}

const formatCategory = (category) => {
  if (!category) return ''
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
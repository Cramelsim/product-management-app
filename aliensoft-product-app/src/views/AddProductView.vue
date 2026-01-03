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

    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p class="text-gray-600 mt-2">Fill in the details below to add a new product to your inventory</p>
      </div>

      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div v-if="errorMessage" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ errorMessage }}
          </div>

          <div class="space-y-6">
            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                Product Title <span class="text-red-500">*</span>
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="input-field"
                placeholder="Enter product title"
                :class="{ 'border-red-300': errors.title }"
              >
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="input-field"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                  Category <span class="text-red-500">*</span>
                </label>
                <select v-model="form.category" required>
    <option value="" disabled>Select a category</option>
    <option v-for="category in categories" 
            :key="category.slug || category" 
            :value="category.slug || category">
      {{ formatCategory(category) }}
    </option>
    <option value="other">Other</option>
  </select>
                <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
              </div>

              <!-- Brand -->
              <div>
                <label for="brand" class="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  id="brand"
                  v-model="form.brand"
                  type="text"
                  class="input-field"
                  placeholder="Enter brand name"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Price -->
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
                  Price <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500">$</span>
                  </div>
                  <input
                    id="price"
                    v-model="form.price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="input-field pl-7"
                    placeholder="0.00"
                    :class="{ 'border-red-300': errors.price }"
                  >
                </div>
                <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
              </div>

              <!-- Stock -->
              <div>
                <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">
                  Stock <span class="text-red-500">*</span>
                </label>
                <input
                  id="stock"
                  v-model="form.stock"
                  type="number"
                  min="0"
                  required
                  class="input-field"
                  placeholder="Enter stock quantity"
                  :class="{ 'border-red-300': errors.stock }"
                >
                <p v-if="errors.stock" class="mt-1 text-sm text-red-600">{{ errors.stock }}</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Discount Percentage -->
              <div>
                <label for="discountPercentage" class="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage
                </label>
                <div class="relative">
                  <input
                    id="discountPercentage"
                    v-model="form.discountPercentage"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    class="input-field"
                    placeholder="0.00"
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500">%</span>
                  </div>
                </div>
              </div>

              <!-- Rating -->
              <div>
                <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input
                  id="rating"
                  v-model="form.rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  class="input-field"
                  placeholder="0.0 - 5.0"
                >
              </div>
            </div>

            <!-- Thumbnail URL -->
            <div>
              <label for="thumbnail" class="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail Image URL
              </label>
              <input
                id="thumbnail"
                v-model="form.thumbnail"
                type="url"
                class="input-field"
                placeholder="https://example.com/image.jpg"
              >
              <p class="mt-1 text-sm text-gray-500">
                Enter a valid URL for the product thumbnail image
              </p>
            </div>

            <!-- Additional Images -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Additional Image URLs (one per line)
              </label>
              <textarea
                v-model="additionalImages"
                rows="3"
                class="input-field"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              ></textarea>
            </div>

            <!-- Weight and Dimensions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="weight" class="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  v-model="form.weight"
                  type="number"
                  step="0.1"
                  min="0"
                  class="input-field"
                  placeholder="0.0"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  v-model="tagsInput"
                  type="text"
                  class="input-field"
                  placeholder="tag1, tag2, tag3"
                >
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="mt-8 flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              @click="router.push('/products')"
              class="btn-secondary"
              :disabled="isSubmitting"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn-primary flex items-center space-x-2"
              :disabled="isSubmitting"
            >
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isSubmitting ? 'Adding Product...' : 'Add Product' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Preview Section -->
      <div v-if="form.title || form.description || form.thumbnail" class="mt-8">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Preview</h2>
        <div class="card">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-if="form.thumbnail" class="md:col-span-1">
              <img 
                :src="form.thumbnail" 
                :alt="form.title || 'Product preview'"
                class="w-full h-48 object-cover rounded-lg"
                @error="form.thumbnail = ''"
              />
            </div>
            <div :class="form.thumbnail ? 'md:col-span-2' : 'md:col-span-3'">
              <h3 class="text-xl font-semibold text-gray-900">{{ form.title || 'Product Title' }}</h3>
              <p v-if="form.category" class="mt-1 text-sm text-gray-600">
                Category: {{ formatCategory(form.category) }}
              </p>
              <p v-if="form.price" class="mt-2 text-lg font-bold text-primary">
                ${{ parseFloat(form.price).toFixed(2) }}
              </p>
              <p v-if="form.description" class="mt-3 text-gray-600 line-clamp-3">
                {{ form.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products.store'

const router = useRouter()
const store = useProductsStore()

const form = ref({
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  discountPercentage: '',
  rating: '',
  stock: '',
  thumbnail: '',
  weight: '',
  tags: []
})

const additionalImages = ref('')
const tagsInput = ref('')
const errors = ref({})
const errorMessage = ref('')
const isSubmitting = ref(false)

const categories = computed(() => store.categories)

onMounted(async () => {
  if (store.categories.length === 0) {
    await store.loadCategories()
  }
})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.title.trim()) {
    errors.value.title = 'Title is required'
  }
  
  if (!form.value.category) {
    errors.value.category = 'Category is required'
  }
  
  if (!form.value.price || parseFloat(form.value.price) <= 0) {
    errors.value.price = 'Price must be greater than 0'
  }
  
  if (!form.value.stock || parseInt(form.value.stock) < 0) {
    errors.value.stock = 'Stock must be 0 or greater'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Prepare product data
    const productData = {
      title: form.value.title,
      description: form.value.description || '',
      category: typeof form.value.category === 'string' 
        ? form.value.category 
        : form.value.category?.slug || form.value.category,
      price: parseFloat(form.value.price),
      stock: parseInt(form.value.stock),
      thumbnail: form.value.thumbnail || undefined,
      brand: form.value.brand || undefined,
      discountPercentage: form.value.discountPercentage ? parseFloat(form.value.discountPercentage) : undefined,
      rating: form.value.rating ? parseFloat(form.value.rating) : undefined,
      weight: form.value.weight ? parseFloat(form.value.weight) : undefined
    }

    // Add tags if provided
    if (tagsInput.value.trim()) {
      productData.tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    // Add additional images if provided
    if (additionalImages.value.trim()) {
      productData.images = additionalImages.value
        .split('\n')
        .map(url => url.trim())
        .filter(url => url)
    }

    const newProduct = await store.createProduct(productData)
    
    // Reset form
    form.value = {
      title: '',
      description: '',
      category: '',
      brand: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
      thumbnail: '',
      weight: '',
      tags: []
    }
    additionalImages.value = ''
    tagsInput.value = ''
    
    // Redirect to the new product's details page
    router.push(`/products/${newProduct.id}`)
    
  } catch (error) {
    errorMessage.value = error.message || 'Failed to add product. Please try again.'
    console.error('Add product error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const formatCategory = (category) => {
  if (!category) return ''
  
  // Handle both formats: string or {slug, name}
  let categoryStr = ''
  
  if (typeof category === 'string') {
    categoryStr = category
  } else if (category && typeof category === 'object') {
    categoryStr = category.slug || category.name || ''
  }
  
  if (!categoryStr) return ''
  
  return categoryStr
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>
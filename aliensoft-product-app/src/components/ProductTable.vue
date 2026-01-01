<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
      <thead class="bg-gray-50">
        <tr>
          <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product</th>
          <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th>
          <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
          <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Stock</th>
          <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr 
          v-for="product in products" 
          :key="product.id"
          class="hover:bg-gray-50 transition-colors cursor-pointer"
          @click="$emit('view-product', product.id)"
        >
          <td class="py-4 px-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 flex-shrink-0">
                <img 
                  :src="product.thumbnail || 'https://via.placeholder.com/48'" 
                  :alt="product.title"
                  class="w-full h-full object-cover rounded-full border border-gray-200"
                />
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ product.title }}</h3>
                <p class="text-xs text-gray-500 mt-1 max-w-xs truncate">
                  {{ truncateDescription(product.description) }}
                </p>
              </div>
            </div>
          </td>
          <td class="py-4 px-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ formatCategory(product.category) }}
            </span>
          </td>
          <td class="py-4 px-4">
            <div class="text-sm font-medium text-gray-900">${{ product.price.toFixed(2) }}</div>
            <div v-if="product.discountPercentage" class="text-xs text-green-600">
              {{ product.discountPercentage }}% off
            </div>
          </td>
          <td class="py-4 px-4">
            <div class="flex items-center">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  :class="[
                    'h-2 rounded-full',
                    product.stock > 20 ? 'bg-green-500' : 
                    product.stock > 5 ? 'bg-yellow-500' : 'bg-red-500'
                  ]"
                  :style="{ width: `${Math.min(product.stock, 100)}%` }"
                ></div>
              </div>
              <span class="ml-2 text-sm text-gray-600 min-w-[2rem]">{{ product.stock }}</span>
            </div>
          </td>
          <td class="py-4 px-4">
            <div class="flex space-x-2">
              <button 
                @click.stop="$emit('view-product', product.id)"
                class="text-primary hover:text-blue-900 text-sm font-medium"
              >
                View
              </button>
              <button 
                @click.stop="$emit('edit-product', product.id)"
                class="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="products.length === 0 && !loading" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view-product', 'edit-product'])

const truncateDescription = (description) => {
  if (!description) return ''
  return description.length > 80 ? description.substring(0, 80) + '...' : description
}

const formatCategory = (category) => {
  if (!category) return ''
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const LoginView = () => import('@/views/LoginView.vue')
const ProductListView = () => import('@/views/ProductListView.vue')
const ProductDetailsView = () => import('@/views/ProductDetailsView.vue')
const AddProductView = () => import('@/views/AddProductView.vue')

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/products',
    name: 'products',
    component: ProductListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/new',  // ✅ Specific route MUST come first
    name: 'add-product',
    component: AddProductView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',  // ✅ Dynamic route comes second
    name: 'product-details',
    component: ProductDetailsView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Restore session if needed
  if (!authStore.isAuthenticated) {
    authStore.restoreSession()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/products')
  } else {
    next()
  }
})

export default router
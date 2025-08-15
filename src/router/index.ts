import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/productos',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/producto/:name',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
  ],
})

export default router

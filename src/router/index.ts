import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import WorkWithUsView from '@/views/WorkWithUsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Scroll al top para páginas de productos y detalle de producto
    if (to.name === 'products' || to.name === 'product-detail') {
      return { top: 0 }
    }
    // Para otras rutas, mantener comportamiento por defecto
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
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
  {
    path: '/carrito',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/trabaja-con-nosotros',
    name: 'work-with-us',
    component: WorkWithUsView
  },
  ],
})

export default router

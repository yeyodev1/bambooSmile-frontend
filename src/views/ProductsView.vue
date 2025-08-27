<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const selectedCategory = ref<string>('all')
const addingToCart = ref<string | null>(null)
const showSuccessToast = ref(false)
const toastTimeout = ref<number | null>(null)

// Computed para obtener productos filtrados
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return productsStore.allProducts
  }
  return productsStore.getProductsByCategory(selectedCategory.value)
})

// Función para seleccionar categoría
const selectCategory = (categoryName: string) => {
  selectedCategory.value = categoryName
}

// Función para formatear precio
const formatPrice = (price: string) => {
  return `$${price}`
}

// Función para navegar al detalle del producto
const goToProductDetail = (productName: string) => {
  router.push(`/producto/${encodeURIComponent(productName)}`)
}

// Función para agregar al carrito
const addToCart = async (product: any, event: Event) => {
  event.stopPropagation() // Evitar que se active el click del card
  
  addingToCart.value = product.name
  
  // Simular un pequeño delay para mostrar el estado de carga
  await new Promise(resolve => setTimeout(resolve, 300))
  
  cartStore.addToCart(product, 1)
  
  addingToCart.value = null
  
  // Mostrar toast de éxito
  showSuccessToast.value = true
  
  // Limpiar timeout anterior si existe
  if (toastTimeout.value) {
    clearTimeout(toastTimeout.value)
  }
  
  // Ocultar toast después de 4 segundos
  toastTimeout.value = setTimeout(() => {
    showSuccessToast.value = false
  }, 4000)
}

// Función para ir al carrito desde el toast
const goToCart = () => {
  router.push('/carrito')
  showSuccessToast.value = false
}
</script>

<template>
  <div class="products-view">
    <!-- Header -->
    <div class="products-header">
      <h1 class="products-title">Nuestros Productos</h1>
      <p class="products-subtitle">
        Descubre nuestra línea completa de productos sostenibles para el cuidado personal
      </p>
    </div>

    <!-- Category Selector -->
    <div class="category-selector">
      <button 
        :class="['category-btn', { active: selectedCategory === 'all' }]"
        @click="selectCategory('all')"
      >
        Todos
      </button>
      <button 
        v-for="category in productsStore.categories"
        :key="category.id"
        :class="['category-btn', { active: selectedCategory === category.name }]"
        @click="selectCategory(category.name)"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div 
        v-for="product in filteredProducts"
        :key="product.name"
        class="product-card"
      >
        <!-- Product Image -->
        <div class="product-image">
          <img 
            :src="product.images[0] || '/placeholder-product.jpg'"
            :alt="product.name"
            loading="lazy"
          />
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description.substring(0, 120) }}...</p>
          
          <!-- Flavor info if available -->
          <div v-if="'flavor' in product && product.flavor" class="product-flavor">
            <span class="flavor-icon">{{ product.flavorIcon }}</span>
            <span class="flavor-text">{{ product.flavor }}</span>
          </div>
          
          <div class="product-footer">
            <span class="product-price">{{ formatPrice(product.precio) }}</span>
            <div class="product-actions">
              <button 
                class="view-product-btn"
                @click="goToProductDetail(product.name)"
              >
                Ver producto
              </button>
              <button 
                class="add-to-cart-btn"
                :class="{ loading: addingToCart === product.name }"
                :disabled="addingToCart === product.name"
                @click="addToCart(product, $event)"
              >
                <span v-if="addingToCart === product.name" class="loading-spinner"></span>
                <span v-else>Agregar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <p>No se encontraron productos en esta categoría.</p>
    </div>

    <!-- Success Toast -->
    <Transition name="toast">
      <div v-if="showSuccessToast" class="success-toast">
        <div class="toast-content">
          <div class="toast-icon">✅</div>
          <div class="toast-text">
            <p class="toast-title">¡Producto agregado!</p>
            <p class="toast-subtitle">Ve a tu carrito en la esquina superior derecha</p>
          </div>
          <button class="toast-cart-btn" @click="goToCart">
            🛒 Ir al carrito
          </button>
          <button class="toast-close" @click="showSuccessToast = false">
            ×
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/colorVariables.module.scss';

$transition-elegant: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

.products-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, $neutral-50 0%, $neutral-100 100%);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
}

.products-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
  background: $white;
  border-radius: 24px;
  margin-bottom: 4rem;
  border: 1px solid $border-light;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $accent-600 0%, $accent-secondary 100%);
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    padding: 2rem 1rem;
  }
}

.products-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
}

.products-subtitle {
  font-size: 1.125rem;
  color: $text-secondary;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
}

.category-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
}

.category-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid $border-medium;
  background: $white;
  color: $text-secondary;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: $transition-elegant;
  font-size: 0.875rem;
  box-shadow: $shadow-sm;

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }

  &:hover {
    border-color: $accent-primary;
    background: $accent-50;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  &.active {
    background: $accent-primary;
    border-color: $accent-primary;
    color: $white;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 4rem 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 3rem 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.product-card {
  background: transparent;
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  transition: $transition-elegant;
  border: none;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    
    @media (min-width: 769px) {
      .product-actions {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }
    }
  }

  // Touch devices - show actions on tap/touch
  &:active {
    @media (max-width: 768px) {
      .product-actions {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }
    }
  }

  // Ensure actions are always visible on mobile
  @media (max-width: 768px) {
    .product-actions {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
  }
}

.product-image {
  width: 100%;
  height: 420px;
  overflow: visible;
  background: transparent;
  border-radius: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: $transition-elegant;
    filter: none;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 360px;
    padding: 0.75rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    height: 320px;
    padding: 0.5rem;
  }
}

.product-info {
  padding: 0;
  background: transparent;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0;
  }
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.product-description {
  color: $text-secondary;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
}

.product-flavor {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background: $neutral-100;
  border-radius: 6px;
  border: none;
}

.flavor-icon {
  font-size: 1.25rem;
}

.flavor-text {
  font-size: 0.8rem;
  color: $text-secondary;
  font-weight: 500;
}

.product-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  min-height: 80px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    min-height: auto;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
}

.product-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.view-product-btn {
  background: rgba(255, 255, 255, 0.9);
  color: $text-primary;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition-elegant;
  font-size: 0.75rem;
  letter-spacing: 0;
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem;
  }

  &:hover {
    background: $white;
    color: $text-primary;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
}

.add-to-cart-btn {
  background: $text-primary;
  color: $white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: $transition-elegant;
  font-size: 0.75rem;
  position: relative;
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem;
    min-width: auto;
  }

  &:hover:not(:disabled) {
    background: $accent-primary;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.loading {
    pointer-events: none;
  }
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Toast Styles
.success-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}

.toast-content {
  background: $white;
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: $shadow-lg;
  border: 1px solid $border-light;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  backdrop-filter: blur(20px);
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.75rem;
  }
}

.toast-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.toast-text {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 700;
  color: $text-primary;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
}

.toast-subtitle {
  color: $text-secondary;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
}

.toast-cart-btn {
  background: $accent-primary;
  color: $white;
  border: none;
  padding: 0.625rem 1rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: $transition-elegant;
  flex-shrink: 0;
  box-shadow: $shadow-sm;
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
  
  &:hover {
    background: $accent-700;
    transform: translateY(-1px);
    box-shadow: $shadow-md;
  }
  
  &:active {
    transform: translateY(0);
  }
}

.toast-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: $text-muted;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition-elegant;
  border-radius: 50%;
  
  @media (max-width: 768px) {
    top: 0.625rem;
    right: 0.625rem;
    font-size: 1.125rem;
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    color: $text-secondary;
    background: $neutral-100;
  }
}

// Toast Transitions
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  color: $text-secondary;
  font-size: 1.25rem;
  background: $white;
  border-radius: 32px;
  border: 1px solid $border-light;
  box-shadow: $shadow-sm;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    font-size: 1.125rem;
  }
}
</style>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/stores/products'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const currentImageIndex = ref(0)
const quantity = ref(1)
const isAddingToCart = ref(false)
const showAddedMessage = ref(false)

// Obtener el producto actual
const product = computed(() => {
  const productName = route.params.name as string
  return productsStore.getProductById(decodeURIComponent(productName))
})

// Productos relacionados
const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.getRelatedProducts(product.value, 4)
})

// Función para cambiar imagen
const changeImage = (index: number) => {
  currentImageIndex.value = index
}

// Función para formatear precio
const formatPrice = (price: string) => {
  return `$${price}`
}

// Función para incrementar cantidad
const incrementQuantity = () => {
  quantity.value++
}

// Función para decrementar cantidad
const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Función para agregar al carrito
const addToCart = async () => {
  if (!product.value) return
  
  isAddingToCart.value = true
  
  try {
    cartStore.addToCart(product.value, quantity.value)
    
    // Mostrar mensaje de confirmación
    showAddedMessage.value = true
    setTimeout(() => {
      showAddedMessage.value = false
    }, 2000)
    
    // Resetear cantidad
    quantity.value = 1
  } catch (error) {
    console.error('Error al agregar al carrito:', error)
  } finally {
    isAddingToCart.value = false
  }
}

// Función para navegar a producto relacionado
const goToProduct = (productName: string) => {
  router.push(`/producto/${encodeURIComponent(productName)}`)
}

// Función para volver a productos
const goBack = () => {
  router.push('/productos')
}

// Verificar si el producto existe
onMounted(() => {
  if (!product.value) {
    router.push('/productos')
  }
})
</script>

<template>
  <div v-if="product" class="product-detail">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <button @click="goBack" class="breadcrumb-link">
        ← Volver a productos
      </button>
    </nav>

    <!-- Product Main Section -->
    <div class="product-main">
      <!-- Image Gallery -->
      <div class="image-gallery">
        <div class="main-image">
          <img 
            :src="product.images[currentImageIndex] || '/placeholder-product.jpg'"
            :alt="product.name"
            class="main-img"
          />
        </div>
        
        <!-- Thumbnails -->
        <div v-if="product.images.length > 1" class="thumbnails">
          <button 
            v-for="(image, index) in product.images"
            :key="index"
            :class="['thumbnail', { active: currentImageIndex === index }]"
            @click="changeImage(index)"
          >
            <img :src="image" :alt="`${product.name} - imagen ${index + 1}`" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        
        <!-- Flavor info if available -->
        <div v-if="'flavor' in product && product.flavor" class="product-flavor">
          <span class="flavor-icon">{{ product.flavorIcon }}</span>
          <span class="flavor-text">Sabor: {{ product.flavor }}</span>
        </div>
        
        <div class="price-section">
          <span class="price">{{ formatPrice(product.precio) }}</span>
          <span class="price-label">por unidad</span>
        </div>

        <!-- Quantity Selector -->
        <div class="quantity-section">
          <label class="quantity-label">Cantidad:</label>
          <div class="quantity-controls">
            <button 
              @click="decrementQuantity"
              :disabled="quantity <= 1"
              class="quantity-btn"
            >
              -
            </button>
            <span class="quantity-display">{{ quantity }}</span>
            <button 
              @click="incrementQuantity"
              class="quantity-btn"
            >
              +
            </button>
          </div>
        </div>

        <!-- Add to Cart -->
        <button 
          @click="addToCart" 
          :disabled="isAddingToCart"
          class="add-to-cart"
          :class="{ loading: isAddingToCart, success: showAddedMessage }"
        >
          <span v-if="isAddingToCart">Agregando...</span>
          <span v-else-if="showAddedMessage">✓ Agregado al carrito</span>
          <span v-else>Agregar al carrito - {{ formatPrice((parseFloat(product.precio) * quantity).toFixed(2)) }}</span>
        </button>
        
        <!-- Success Message -->
        <div v-if="showAddedMessage" class="success-message">
          <span class="success-icon">✓</span>
          <span class="success-text">Producto agregado al carrito exitosamente</span>
        </div>

        <!-- Product Features -->
        <div class="product-features">
          <div class="feature">
            <span class="feature-icon">🌱</span>
            <span class="feature-text">100% Natural</span>
          </div>
          <div class="feature">
            <span class="feature-icon">♻️</span>
            <span class="feature-text">Eco-friendly</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🚚</span>
            <span class="feature-text">Envío gratis</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Description -->
    <div class="product-description">
      <h2 class="description-title">Descripción del producto</h2>
      <div class="description-content">
        <p v-for="paragraph in product.description.split('\n\n')" :key="paragraph" class="description-paragraph">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts.length > 0" class="related-products">
      <h2 class="related-title">Productos relacionados</h2>
      <div class="related-grid">
        <div 
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.name"
          class="related-card"
          @click="goToProduct(relatedProduct.name)"
        >
          <div class="related-image">
            <img 
              :src="relatedProduct.images[0] || '/placeholder-product.jpg'"
              :alt="relatedProduct.name"
            />
          </div>
          <div class="related-info">
            <h3 class="related-name">{{ relatedProduct.name }}</h3>
            <span class="related-price">{{ formatPrice(relatedProduct.precio) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading/Error State -->
  <div v-else class="error-state">
    <h2>Producto no encontrado</h2>
    <p>El producto que buscas no existe o ha sido eliminado.</p>
    <button @click="goBack" class="back-btn">
      Volver a productos
    </button>
  </div>
</template>

<style lang="scss" scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
}

.breadcrumb {
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
}

.breadcrumb-link {
  background: none;
  border: none;
  color: #84cc16;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #65a30d;
  }
}

.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }
}

.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  background: #f9fafb;

  @media (max-width: 768px) {
    height: 300px;
  }
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.25rem 0;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  &.active {
    border-color: #84cc16;
  }

  &:hover {
    border-color: #84cc16;
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.product-flavor {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f0fdf4;
  border-radius: 0.75rem;
  border: 1px solid #bbf7d0;
}

.flavor-icon {
  font-size: 1.5rem;
}

.flavor-text {
  color: #166534;
  font-weight: 600;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.price {
  font-size: 2.25rem;
  font-weight: 800;
  color: #2d5016;

  @media (max-width: 768px) {
    font-size: 1.875rem;
  }
}

.price-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}

.quantity-label {
  font-weight: 600;
  color: #374151;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f9fafb;
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #84cc16;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.quantity-display {
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: white;
}

.add-to-cart {
  background: #84cc16;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: #65a30d;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  &.loading {
    background: #a3a3a3;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border: 2px solid transparent;
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  &.success {
    background: #16a34a;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 0.75rem;
  animation: slideIn 0.3s ease-out;
}

.success-icon {
  color: #16a34a;
  font-size: 1.25rem;
  font-weight: 700;
}

.success-text {
  color: #166534;
  font-weight: 600;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-icon {
  font-size: 1.25rem;
}

.feature-text {
  color: #475569;
  font-weight: 500;
}

.product-description {
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
}

.description-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
}

.description-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.description-paragraph {
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.related-products {
  margin-bottom: 2rem;
}

.related-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
}

.related-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  }
}

.related-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  background: #f9fafb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.related-info {
  padding: 1rem;
}

.related-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.related-price {
  font-size: 1rem;
  font-weight: 700;
  color: #2d5016;
}

.error-state {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;

  h2 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin-bottom: 2rem;
  }
}

.back-btn {
  background: #84cc16;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #65a30d;
  }
}
</style>
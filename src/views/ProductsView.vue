<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const router = useRouter()
const productsStore = useProductsStore()
const selectedCategory = ref<string>('all')

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
        @click="goToProductDetail(product.name)"
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
            <button class="add-to-cart-btn">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <p>No se encontraron productos en esta categoría.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
}

.products-header {
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
}

.products-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d5016;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
}

.products-subtitle {
  font-size: 1.125rem;
  color: #666;
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
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }

  &:hover {
    border-color: #84cc16;
    background: #f7fee7;
    transform: translateY(-2px);
  }

  &.active {
    background: #84cc16;
    border-color: #84cc16;
    color: white;
    transform: translateY(-2px);
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.product-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f9fafb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.product-info {
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.product-description {
  color: #6b7280;
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
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f0fdf4;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
}

.flavor-icon {
  font-size: 1.25rem;
}

.flavor-text {
  font-size: 0.875rem;
  color: #166534;
  font-weight: 500;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d5016;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
}

.add-to-cart-btn {
  background: #84cc16;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.875rem;
  }

  &:hover {
    background: #65a30d;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-size: 1.125rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    font-size: 1rem;
  }
}
</style>
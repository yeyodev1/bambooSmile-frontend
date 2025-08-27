<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore, type Product } from '@/stores/products'

const router = useRouter()
const productsStore = useProductsStore()

const searchQuery = ref('')
const isOpen = ref(false)
const selectedIndex = ref(-1)
const searchInput = ref<HTMLInputElement | null>(null)
const resultsContainer = ref<HTMLElement | null>(null)

// Computed para filtrar productos basado en la búsqueda
const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.toLowerCase().trim()

  return productsStore.allProducts
    .filter((product: Product) => {
      const nameMatch = product.name.toLowerCase().includes(query)
      const descriptionMatch = product.description.toLowerCase().includes(query)
      const flavorMatch = ('flavor' in product && product.flavor) ? product.flavor.toLowerCase().includes(query) : false

      return nameMatch || descriptionMatch || flavorMatch
    })
    .slice(0, 8) // Limitar a 8 resultados para mejor UX
})

// Función para navegar al producto seleccionado
const goToProduct = (productName: string) => {
  router.push(`/producto/${encodeURIComponent(productName)}`)
  closeSearch()
}

// Función para cerrar la búsqueda
const closeSearch = () => {
  isOpen.value = false
  searchQuery.value = ''
  selectedIndex.value = -1
}

// Función para manejar la navegación con teclado
const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value || filteredProducts.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredProducts.value.length - 1)
      scrollToSelected()
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      scrollToSelected()
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0) {
        goToProduct(filteredProducts.value[selectedIndex.value].name)
      }
      break
    case 'Escape':
      closeSearch()
      break
  }
}

// Función para hacer scroll al elemento seleccionado
const scrollToSelected = () => {
  if (!resultsContainer.value) return

  const selectedElement = resultsContainer.value.children[selectedIndex.value] as HTMLElement
  if (selectedElement) {
    selectedElement.scrollIntoView({ block: 'nearest' })
  }
}

// Función para formatear precio
const formatPrice = (price: string) => {
  return `$${price}`
}

// Función para resaltar texto coincidente
const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// Función para actualizar posición del dropdown
const updateDropdownPosition = () => {
  if (!searchInput.value || !resultsContainer.value) return

  const inputRect = searchInput.value.getBoundingClientRect()
  const containerElement = resultsContainer.value

  // Calcular posición
  const top = inputRect.bottom + 8 // 8px de margen
  const left = inputRect.left
  const width = inputRect.width

  // Establecer variables CSS
  containerElement.style.setProperty('--search-results-top', `${top}px`)
  containerElement.style.setProperty('--search-results-left', `${left}px`)
  containerElement.style.setProperty('--search-results-width', `${width}px`)
}

// Watcher para abrir/cerrar resultados
watch(searchQuery, (newQuery) => {
  isOpen.value = newQuery.trim().length > 0
  selectedIndex.value = -1

  if (isOpen.value) {
    // Actualizar posición cuando se abre
    nextTick(() => {
      updateDropdownPosition()
    })
  }
})

// Actualizar posición en resize y scroll
const handleResize = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

const handleScroll = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

// Función para manejar clicks fuera del componente
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const searchContainer = searchInput.value?.closest('.product-search')

  if (searchContainer && !searchContainer.contains(target)) {
    closeSearch()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div class="product-search">
    <!-- Search Input -->
    <div class="search-input-container">
      <div class="search-icon">
        <i class="fas fa-search"></i>
      </div>
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        placeholder="Buscar productos..."
        class="search-input"
        @keydown="handleKeydown"
        @focus="isOpen = searchQuery.trim().length > 0; nextTick(updateDropdownPosition)"
      />
      <button
        v-if="searchQuery"
        class="clear-button"
        @click="closeSearch"
      >
        ×
      </button>
    </div>

    <!-- Search Results -->
    <Transition name="search-results">
      <div
        v-if="isOpen && searchQuery.trim()"
        class="search-results"
        ref="resultsContainer"
      >
        <!-- Results List -->
        <div v-if="filteredProducts.length > 0" class="results-list">
          <div
            v-for="(product, index) in filteredProducts"
            :key="product.name"
            :class="['result-item', { selected: index === selectedIndex }]"
            @click="goToProduct(product.name)"
            @mouseenter="selectedIndex = index"
          >
            <!-- Product Image -->
            <div class="result-image">
              <img
                :src="product.images[0] || '/placeholder-product.jpg'"
                :alt="product.name"
                loading="lazy"
              />
            </div>

            <!-- Product Info -->
            <div class="result-info">
              <h4 class="result-name" v-html="highlightMatch(product.name, searchQuery)"></h4>
              <p class="result-description" v-html="highlightMatch(product.description.substring(0, 80) + '...', searchQuery)"></p>
              
              <!-- Flavor info if available -->
          <div v-if="'flavor' in product && product.flavor" class="result-flavor">
            <span class="flavor-icon">{{ 'flavorIcon' in product ? product.flavorIcon : '' }}</span>
            <span class="flavor-text">{{ product.flavor }}</span>
          </div>
            </div>

            <!-- Product Price -->
            <div class="result-price">
              {{ formatPrice(product.precio) }}
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="no-results">
          <div class="no-results-icon"><i class="fas fa-search"></i></div>
          <p class="no-results-text">No se encontraron productos</p>
          <p class="no-results-suggestion">Intenta con otros términos de búsqueda</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/colorVariables.module.scss';

$transition-elegant: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.product-search {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 1000;
  isolation: isolate;
  width: 90%;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: $white;
  border: 2px solid $border-light;
  border-radius: 16px;
  padding: 0.75rem 1rem;
  transition: $transition-elegant;
  box-shadow: $shadow-sm;

  &:focus-within {
    border-color: $accent-primary;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.625rem 0.875rem;
  }
}

.search-icon {
  font-size: 1.25rem;
  color: $text-muted;
  margin-right: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-right: 0.5rem;
  }
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: $text-primary;
  background: transparent;
  font-weight: 500;

  &::placeholder {
    color: $text-muted;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
}

.clear-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: $text-muted;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: $transition-elegant;
  margin-left: 0.5rem;

  &:hover {
    background: $neutral-100;
    color: $text-secondary;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    width: 20px;
    height: 20px;
  }
}

.search-results {
  position: fixed;
  top: var(--search-results-top, 0);
  left: var(--search-results-left, 0);
  width: var(--search-results-width, 100%);
  background: $white;
  border: 1px solid $border-light;
  border-radius: 16px;
  box-shadow: $shadow-lg;
  z-index: 999999;
  max-height: 400px;
  overflow-y: auto;
  backdrop-filter: blur(20px);
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    max-height: 350px;
  }
}

.results-list {
  padding: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem;
  border-radius: 12px;
  cursor: pointer;
  transition: $transition-elegant;
  border: 1px solid transparent;

  &:hover,
  &.selected {
    background: $accent-50;
    border-color: $accent-200;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0.75rem;
  }
}

.result-image {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: $neutral-50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;

  :deep(mark) {
    background: $accent-200;
    color: $accent-800;
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
}

.result-description {
  font-size: 0.8rem;
  color: $text-secondary;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;

  :deep(mark) {
    background: $accent-200;
    color: $accent-800;
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
}

.result-flavor {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.25rem;
}

.flavor-icon {
  font-size: 0.875rem;
}

.flavor-text {
  font-size: 0.7rem;
  color: $text-muted;
  font-weight: 500;
}

.result-price {
  font-size: 0.9rem;
  font-weight: 700;
  color: $accent-primary;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  color: $text-muted;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.no-results-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: $text-secondary;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.no-results-suggestion {
  font-size: 0.875rem;
  color: $text-muted;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
}

// Transitions
.search-results-enter-active {
  transition: all 0.2s ease-out;
}

.search-results-leave-active {
  transition: all 0.15s ease-in;
}

.search-results-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.search-results-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}

.search-results-enter-to,
.search-results-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

// Custom scrollbar for results
.search-results::-webkit-scrollbar {
  width: 6px;
}

.search-results::-webkit-scrollbar-track {
  background: $neutral-100;
  border-radius: 3px;
}

.search-results::-webkit-scrollbar-thumb {
  background: $border-medium;
  border-radius: 3px;

  &:hover {
    background: $text-muted;
  }
}
</style>
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Importar todos los datos de productos
import { cepillos, type Cepillo } from '@/data/cepillos'
import { cuidadoPersonalData, type CuidadoPersonal } from '@/data/cuidado-personal'
import { eatAndDrinkData, type EatAndDrink } from '@/data/eat-and-drink'
import { higieneBucal, type HigieneBucal } from '@/data/higiene-bucal'
import { kitYRegalos, type KitYRegalos } from '@/data/kit-y-regalos'

// Tipo unión para todos los productos
export type Product = Cepillo | CuidadoPersonal | EatAndDrink | HigieneBucal | KitYRegalos

// Interfaz para las categorías
export interface Category {
  id: string
  name: string
  description: string
  icon: string
  products: Product[]
  count: number
}

export const useProductsStore = defineStore('products', () => {
  // Estado reactivo
  const selectedCategoryId = ref<string>('all')
  const searchQuery = ref<string>('')
  
  // Definición de categorías con sus datos
  const categories = ref<Category[]>([
    {
      id: 'all',
      name: 'Todos los Productos',
      description: 'Todos nuestros productos eco-amigables',
      icon: '🌿',
      products: [],
      count: 0
    },
    {
      id: 'cepillos',
      name: 'Cepillos',
      description: 'Cepillos de bambú para el cuidado bucal',
      icon: '🪥',
      products: cepillos,
      count: cepillos.length
    },
    {
      id: 'cuidado-personal',
      name: 'Cuidado Personal',
      description: 'Productos para el cuidado personal sostenible',
      icon: '🧴',
      products: cuidadoPersonalData,
      count: cuidadoPersonalData.length
    },
    {
      id: 'eat-and-drink',
      name: 'Eat & Drink',
      description: 'Utensilios sostenibles para comer y beber',
      icon: '🍽️',
      products: eatAndDrinkData,
      count: eatAndDrinkData.length
    },
    {
      id: 'higiene-bucal',
      name: 'Higiene Bucal',
      description: 'Productos para una higiene bucal natural',
      icon: '🦷',
      products: higieneBucal,
      count: higieneBucal.length
    },
    {
      id: 'kit-y-regalos',
      name: 'Kits y Regalos',
      description: 'Kits especiales y opciones de regalo',
      icon: '🎁',
      products: kitYRegalos,
      count: kitYRegalos.length
    }
  ])

  // Actualizar la categoría "all" con todos los productos
  const allProducts = [
    ...cepillos,
    ...cuidadoPersonalData,
    ...eatAndDrinkData,
    ...higieneBucal,
    ...kitYRegalos
  ]
  
  categories.value[0].products = allProducts
  categories.value[0].count = allProducts.length

  // Computed properties
  const selectedCategory = computed(() => {
    return categories.value.find(cat => cat.id === selectedCategoryId.value) || categories.value[0]
  })

  const filteredProducts = computed(() => {
    let products = selectedCategory.value.products
    
    // Filtrar por búsqueda si hay query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      products = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }
    
    return products
  })

  const totalProductsCount = computed(() => {
    return allProducts.length
  })

  // Actions
  const setSelectedCategory = (categoryId: string) => {
    selectedCategoryId.value = categoryId
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const getProductById = (id: string): Product | undefined => {
    return allProducts.find(product => product.name === id)
  }

  const getProductsByCategory = (categoryName: string): Product[] => {
    return categories.value.find(cat => cat.name === categoryName)?.products || []
  }

  const getCategoryById = (categoryId: string): Category | undefined => {
    return categories.value.find(cat => cat.id === categoryId)
  }

  // Función para obtener productos relacionados (misma categoría)
  const getRelatedProducts = (currentProduct: Product, limit: number = 4): Product[] => {
    return allProducts
      .filter(product => product.name !== currentProduct.name)
      .slice(0, limit)
  }

  return {
    // State
    selectedCategoryId,
    searchQuery,
    categories,
    
    // Computed
    selectedCategory,
    filteredProducts,
    totalProductsCount,
    allProducts,
    
    // Actions
    setSelectedCategory,
    setSearchQuery,
    getProductById,
    getProductsByCategory,
    getCategoryById,
    getRelatedProducts
  }
})
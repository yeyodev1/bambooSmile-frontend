import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
  id: string
}

export const useCartStore = defineStore('cart', () => {
  // Clave para localStorage
  const CART_STORAGE_KEY = 'bamboo-smile-cart'

  // Función para cargar carrito desde localStorage
  const loadCartFromStorage = (): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.warn('Error al cargar carrito desde localStorage:', error)
      return []
    }
  }

  // Función para guardar carrito en localStorage
  const saveCartToStorage = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.warn('Error al guardar carrito en localStorage:', error)
    }
  }

  // Estado reactivo - inicializar con datos del localStorage
  const items = ref<CartItem[]>(loadCartFromStorage())
  const isOpen = ref(false)

  // Watcher para guardar automáticamente cuando cambie el carrito
  watch(items, (newItems) => {
    saveCartToStorage(newItems)
  }, { deep: true })

  // Computed properties
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (parseFloat(item.product.precio) * item.quantity)
    }, 0)
  })

  // Constantes de envío
  const SHIPPING_COST = 3.50
  const FREE_SHIPPING_THRESHOLD = 35.00

  // Cálculo del costo de envío
  const shippingCost = computed(() => {
    return totalPrice.value >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  })

  // Total con envío incluido
  const totalWithShipping = computed(() => {
    return totalPrice.value + shippingCost.value
  })

  const formattedTotal = computed(() => {
    return `$${totalPrice.value.toFixed(2)}`
  })

  const formattedShipping = computed(() => {
    return shippingCost.value === 0 ? 'GRATIS' : `$${shippingCost.value.toFixed(2)}`
  })

  const formattedTotalWithShipping = computed(() => {
    return `$${totalWithShipping.value.toFixed(2)}`
  })

  // Verificar si califica para envío gratis
  const qualifiesForFreeShipping = computed(() => {
    return totalPrice.value >= FREE_SHIPPING_THRESHOLD
  })

  // Cantidad restante para envío gratis
  const amountForFreeShipping = computed(() => {
    const remaining = FREE_SHIPPING_THRESHOLD - totalPrice.value
    return remaining > 0 ? remaining : 0
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  // Actions
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find(item => item.product.name === product.name)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        id: `${product.name}-${Date.now()}`
      }
      items.value.push(newItem)
    }
  }

  const removeFromCart = (itemId: string) => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const incrementQuantity = (itemId: string) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      item.quantity++
    }
  }

  const decrementQuantity = (itemId: string) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeFromCart(itemId)
      }
    }
  }

  const clearCart = () => {
    items.value = []
    // También limpiar localStorage
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  // Función para limpiar cache del carrito
  const clearCartCache = () => {
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const openCart = () => {
    isOpen.value = true
  }

  const closeCart = () => {
    isOpen.value = false
  }

  // Función para generar mensaje de WhatsApp
  const generateWhatsAppMessage = (customerInfo: { name: string; phone: string; address: string }) => {
    let message = `🛒 *NUEVO PEDIDO - BAMBOO SMILE*\n\n`
    message += `👤 *Cliente:* ${customerInfo.name}\n`
    message += `📱 *Teléfono:* ${customerInfo.phone}\n`
    message += `📍 *Dirección:* ${customerInfo.address}\n\n`
    message += `📦 *PRODUCTOS:*\n`
    
    items.value.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio unitario: $${item.product.precio}\n`
      message += `   Subtotal: $${(parseFloat(item.product.precio) * item.quantity).toFixed(2)}\n\n`
    })
    
    message += `💰 *RESUMEN:*\n`
    message += `   Subtotal: ${formattedTotal.value}\n`
    message += `   Envío: ${formattedShipping.value}\n`
    if (qualifiesForFreeShipping.value) {
      message += `   🎉 ¡Envío gratis por compra mayor a $35!\n`
    }
    message += `   *TOTAL FINAL: ${formattedTotalWithShipping.value}*\n\n`
    message += `¡Gracias por tu pedido! 🌱`
    
    return encodeURIComponent(message)
  }

  const sendWhatsAppOrder = (customerInfo: { name: string; phone: string; address: string }) => {
    const whatsappNumber = '593960800024' // Número de WhatsApp de BambooSmile desde TheFooter.vue
    const message = generateWhatsAppMessage(customerInfo)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    
    // Abrir WhatsApp en una nueva ventana
    window.open(whatsappUrl, '_blank')
    
    // Limpiar carrito después de enviar
    clearCart()
    closeCart()
  }

  return {
    // Estado
    items,
    isOpen,
    
    // Computed
    itemCount,
    totalPrice,
    formattedTotal,
    isEmpty,
    
    // Shipping computed
    shippingCost,
    totalWithShipping,
    formattedShipping,
    formattedTotalWithShipping,
    qualifiesForFreeShipping,
    amountForFreeShipping,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    clearCartCache,
    toggleCart,
    openCart,
    closeCart,
    generateWhatsAppMessage,
    sendWhatsAppOrder
  }
})
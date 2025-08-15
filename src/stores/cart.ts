import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
  id: string
}

export const useCartStore = defineStore('cart', () => {
  // Estado reactivo
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  // Computed properties
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (parseFloat(item.product.precio) * item.quantity)
    }, 0)
  })

  const formattedTotal = computed(() => {
    return `$${totalPrice.value.toFixed(2)}`
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
    
    message += `💰 *TOTAL: ${formattedTotal.value}*\n\n`
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
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    generateWhatsAppMessage,
    sendWhatsAppOrder
  }
})
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// Estado del formulario de checkout
const showCheckout = ref(false)
const isProcessingOrder = ref(false)
const customerInfo = ref({
  name: '',
  phone: '',
  address: ''
})

// Estado del modal de confirmación de eliminación
const showDeleteConfirm = ref(false)
const productToDelete = ref<string | null>(null)

// Validación del formulario
const isFormValid = computed(() => {
  return customerInfo.value.name.trim() !== '' &&
         customerInfo.value.phone.trim() !== '' &&
         customerInfo.value.address.trim() !== ''
})

// Función para formatear precio
const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

// Función para continuar comprando
const continueShopping = () => {
  router.push('/productos')
}

// Función para proceder al checkout
const proceedToCheckout = () => {
  showCheckout.value = true
}

// Función para cancelar checkout
const cancelCheckout = () => {
  showCheckout.value = false
  customerInfo.value = {
    name: '',
    phone: '',
    address: ''
  }
}

// Función para procesar el pedido
const processOrder = async () => {
  if (!isFormValid.value) return
  
  isProcessingOrder.value = true
  
  try {
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Enviar pedido por WhatsApp
    cartStore.sendWhatsAppOrder(customerInfo.value)
    
    // Resetear formulario
    customerInfo.value = {
      name: '',
      phone: '',
      address: ''
    }
    showCheckout.value = false
    
    // Redirigir a productos
    router.push('/productos')
  } catch (error) {
    console.error('Error al procesar pedido:', error)
  } finally {
    isProcessingOrder.value = false
  }
}

// Función para calcular subtotal de un item
const getItemSubtotal = (price: string, quantity: number) => {
  return parseFloat(price) * quantity
}

// Función para mostrar confirmación de eliminación
const confirmRemoveProduct = (productId: string) => {
  productToDelete.value = productId
  showDeleteConfirm.value = true
}

// Función para cancelar eliminación
const cancelDelete = () => {
  showDeleteConfirm.value = false
  productToDelete.value = null
}

// Función para confirmar eliminación
const confirmDelete = () => {
  if (productToDelete.value) {
    cartStore.removeFromCart(productToDelete.value)
  }
  showDeleteConfirm.value = false
  productToDelete.value = null
}
</script>

<template>
  <div class="cart-view">
    <!-- Header -->
    <div class="cart-header">
      <h1 class="cart-title"><i class="fas fa-shopping-cart"></i> Mi Carrito</h1>
      <p class="cart-subtitle">{{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'producto' : 'productos' }}</p>
    </div>

    <!-- Cart Content -->
    <div v-if="!cartStore.isEmpty" class="cart-content">
      <!-- Cart Items -->
      <div class="cart-items">
        <div 
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item"
        >
          <!-- Product Image -->
          <div class="item-image">
            <img 
              :src="item.product.images[0] || '/placeholder-product.jpg'"
              :alt="item.product.name"
            />
          </div>

          <!-- Product Info -->
          <div class="item-info">
            <h3 class="item-name">{{ item.product.name }}</h3>
            <p class="item-price">{{ formatPrice(parseFloat(item.product.precio)) }} c/u</p>
            
            <!-- Flavor if available -->
            <div v-if="'flavor' in item.product && item.product.flavor" class="item-flavor">
              <span class="flavor-icon">{{ item.product.flavorIcon }}</span>
              <span class="flavor-text">{{ item.product.flavor }}</span>
            </div>
          </div>

          <!-- Quantity Controls -->
          <div class="item-quantity">
            <label class="quantity-label">Cantidad:</label>
            <div class="quantity-controls">
              <button 
                @click="cartStore.decrementQuantity(item.id)"
                class="quantity-btn"
              >
                -
              </button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button 
                @click="cartStore.incrementQuantity(item.id)"
                class="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          <!-- Subtotal -->
          <div class="item-subtotal">
            <span class="subtotal-label">Subtotal:</span>
            <span class="subtotal-amount">{{ formatPrice(getItemSubtotal(item.product.precio, item.quantity)) }}</span>
          </div>

          <!-- Remove Button -->
          <button 
            @click="confirmRemoveProduct(item.id)"
            class="remove-btn"
            title="Eliminar producto"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <div class="summary-row">
          <span class="summary-label">Subtotal:</span>
          <span class="summary-value">{{ cartStore.formattedTotal }}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Envío:</span>
          <span class="summary-value free">GRATIS</span>
        </div>
        <div class="summary-row total">
          <span class="summary-label">Total:</span>
          <span class="summary-value">{{ cartStore.formattedTotal }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="cart-actions">
        <button @click="continueShopping" class="continue-btn">
          Continuar comprando
        </button>
        <button @click="proceedToCheckout" class="checkout-btn">
          Proceder al checkout
        </button>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="empty-cart">
      <div class="empty-icon"><i class="fas fa-shopping-cart"></i></div>
      <h2 class="empty-title">Tu carrito está vacío</h2>
      <p class="empty-message">¡Agrega algunos productos increíbles de BambooSmile!</p>
      <button @click="continueShopping" class="shop-btn">
        Ir a productos
      </button>
    </div>

    <!-- Checkout Modal -->
    <div v-if="showCheckout" class="checkout-modal">
      <div class="modal-overlay" @click="cancelCheckout"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Finalizar Pedido</h2>
          <button @click="cancelCheckout" class="close-btn"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <!-- Order Summary -->
          <div class="order-summary">
            <h3 class="summary-title">Resumen del pedido</h3>
            <div class="summary-items">
              <div 
                v-for="item in cartStore.items"
                :key="item.id"
                class="summary-item"
              >
                <span class="summary-item-name">{{ item.product.name }} x{{ item.quantity }}</span>
                <span class="summary-item-price">{{ formatPrice(getItemSubtotal(item.product.precio, item.quantity)) }}</span>
              </div>
            </div>
            <div class="summary-total">
              <strong>Total: {{ cartStore.formattedTotal }}</strong>
            </div>
          </div>

          <!-- Customer Form -->
          <form @submit.prevent="processOrder" class="customer-form">
            <h3 class="form-title">Información de entrega</h3>
            
            <div class="form-group">
              <label for="name" class="form-label">Nombre completo *</label>
              <input 
                id="name"
                v-model="customerInfo.name"
                type="text"
                class="form-input"
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">Teléfono *</label>
              <input 
                id="phone"
                v-model="customerInfo.phone"
                type="tel"
                class="form-input"
                placeholder="Tu número de teléfono"
                required
              />
            </div>

            <div class="form-group">
              <label for="address" class="form-label">Dirección de entrega *</label>
              <textarea 
                id="address"
                v-model="customerInfo.address"
                class="form-textarea"
                placeholder="Tu dirección completa de entrega"
                rows="3"
                required
              ></textarea>
            </div>

            <div class="form-actions">
              <button 
                type="button" 
                @click="cancelCheckout"
                class="cancel-btn"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                :disabled="!isFormValid || isProcessingOrder"
                class="submit-btn"
                :class="{ loading: isProcessingOrder }"
              >
                <span v-if="isProcessingOrder">Procesando...</span>
                <span v-else>Enviar pedido por WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="delete-modal">
      <div class="modal-overlay" @click="cancelDelete"></div>
      <div class="delete-modal-content">
        <div class="delete-modal-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h3 class="delete-modal-title">¿Estás seguro?</h3>
        <p class="delete-modal-message">
          ¿Realmente quieres eliminar este producto de tu carrito?
        </p>
        <div class="delete-modal-actions">
          <button @click="cancelDelete" class="delete-cancel-btn">
            Cancelar
          </button>
          <button @click="confirmDelete" class="delete-confirm-btn">
            <i class="fas fa-trash-alt"></i>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 80vh;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
}

.cart-header {
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
}

.cart-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.cart-subtitle {
  color: #6b7280;
  font-size: 1.125rem;
}

.cart-content {
  display: grid;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 968px) {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #f9fafb;

  @media (max-width: 968px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.3;
}

.item-price {
  color: #2d5016;
  font-weight: 600;
}

.item-flavor {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.flavor-icon {
  font-size: 1rem;
}

.flavor-text {
  color: #166534;
  font-weight: 500;
}

.item-quantity {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: center;
  }
}

.quantity-label {
  font-size: 0.875rem;
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
  width: 35px;
  height: 35px;
  border: none;
  background: #f9fafb;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #84cc16;
    color: white;
  }
}

.quantity-display {
  width: 50px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: white;
}

.item-subtotal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 968px) {
    grid-column: 1 / -1;
  }
}

.subtotal-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.subtotal-amount {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2d5016;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #fee2e2;
  }

  @media (max-width: 968px) {
    grid-column: 1 / -1;
    align-self: center;
  }
}

.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  &.total {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    border-top: 2px solid #e5e7eb;
    margin-top: 0.5rem;
    padding-top: 1rem;
  }
}

.summary-label {
  color: #6b7280;
}

.summary-value {
  font-weight: 600;
  color: #2d5016;

  &.free {
    color: #16a34a;
  }
}

.cart-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.continue-btn {
  background: white;
  color: #84cc16;
  border: 2px solid #84cc16;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #84cc16;
    color: white;
  }
}

.checkout-btn {
  background: #84cc16;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #65a30d;
    transform: translateY(-2px);
  }
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.empty-message {
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.shop-btn {
  background: #84cc16;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #65a30d;
    transform: translateY(-2px);
  }
}

.checkout-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f3f4f6;
  }
}

.modal-body {
  padding: 1.5rem;
}

.order-summary {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.summary-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
}

.summary-item-name {
  color: #374151;
}

.summary-item-price {
  font-weight: 600;
  color: #2d5016;
}

.summary-total {
  text-align: right;
  font-size: 1.125rem;
  color: #1f2937;
  padding-top: 1rem;
  border-top: 2px solid #e2e8f0;
}

.customer-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #374151;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #84cc16;
    box-shadow: 0 0 0 3px rgba(132, 204, 22, 0.1);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.cancel-btn {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
}

.submit-btn {
  background: #84cc16;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover:not(:disabled) {
    background: #65a30d;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.loading {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 1rem;
      width: 16px;
      height: 16px;
      margin-top: -8px;
      border: 2px solid transparent;
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Delete Confirmation Modal Styles
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

.delete-modal-content {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 3px solid #fef2f2;
  animation: slideUp 0.3s ease;
}

.delete-modal-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #fca5a5;
  animation: bounce 0.6s ease;

  i {
    font-size: 2.5rem;
    color: #dc2626;
  }
}

.delete-modal-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.delete-modal-message {
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.delete-modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.delete-cancel-btn {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
  }
}

.delete-confirm-btn {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 140px;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);

  &:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  }

  i {
    font-size: 0.875rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}
</style>
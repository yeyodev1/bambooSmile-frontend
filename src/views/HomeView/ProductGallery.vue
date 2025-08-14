<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Imports de imágenes
import pasta1Image from '@/assets/products/pastas/pasta-1.jpeg'
import pasta2Image from '@/assets/products/pastas/pasta-2.jpeg'
import pasta3Image from '@/assets/products/pastas/pasta-3.jpeg'
import pasta4Image from '@/assets/products/pastas/pasta-4.jpeg'

const isVisible = ref(false)
const whatsappNumber = '+593960800024'

const products = [
  {
    id: 1,
    name: 'Pasta Dental Natural Kids 125ml',
    description: 'Sin alcohol para los más pequeñitos',
    image: pasta1Image,
    benefits: ['Sin químicos', 'Antibacterial natural', 'Protege el esmalte'],
    price: 7.73
  },
  {
    id: 2,
    name: 'Pasta Dental Natural Carbón Activado 125ml',
    description: 'Blanqueamiento natural con el poder del carbón activado.',
    image: pasta2Image,
    benefits: ['Blanqueamiento natural', 'Carbón activado', 'Fórmula natural'],
    price: 7.73
  },
  {
    id: 3,
    name: 'Pasta Dental Natural Fresh 125ml',
    description: 'Fórmula natural con acción refrescante para una limpieza profunda.',
    image: pasta3Image,
    benefits: ['Acción refrescante', 'Fórmula natural', 'Limpieza profunda'],
    price: 7.73
  },
  {
    id: 4,
    name: 'Pasta Dental Natural Sangre de Drago 125ml',
    description: 'Fórmula especial para dientes sensibles con sangre de drago.',
    image: pasta4Image,
    benefits: ['Para dientes sensibles', 'Con sangre de drago', 'Fórmula natural'],
    price: 7.73
  }
]

const contactWhatsApp = (productName: string) => {
  const message = `Hola, estoy interesado en ${productName} de bambooSmile. ¿Podrían darme más información?`
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.2 }
  )

  const element = document.querySelector('.products')
  if (element) {
    observer.observe(element)
  }
})
</script>

<template>
  <section id="products" class="products" :class="{ 'products--visible': isVisible }">
    <div class="products__container">
      <div class="products__header">
        <h2 class="products__title">
          Nuestros <span class="products__title-highlight">Productos</span>
        </h2>
        <p class="products__subtitle">
          Descubre nuestra línea completa de pastas dentales naturales con bambú.
          Cada producto está diseñado para cuidar tu sonrisa de manera natural y efectiva.
        </p>
      </div>
      
      <div class="products__grid">
        <div 
          v-for="(product, index) in products" 
          :key="product.id"
          class="products__card"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="contactWhatsApp(product.name)"
        >
          <div class="products__card-image">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="products__image"
            >
            <div class="products__card-overlay">
              <span class="products__cta-text">Consultar por WhatsApp</span>
              <div class="products__whatsapp-icon">📱</div>
            </div>
          </div>
          
          <div class="products__card-content">
            <h3 class="products__card-title">{{ product.name }}</h3>
            <p class="products__card-description">{{ product.description }}</p>
            
            <div class="products__benefits">
              <div 
                v-for="benefit in product.benefits" 
                :key="benefit"
                class="products__benefit"
              >
                <span class="products__benefit-icon">✓</span>
                <span class="products__benefit-text">{{ benefit }}</span>
              </div>
            </div>
            
            <button 
              class="products__contact-btn"
              @click.stop="contactWhatsApp(product.name)"
            >
              Consultar Precio
            </button>
          </div>
        </div>
      </div>
      
      <div class="products__footer">
        <p class="products__footer-text">
          ¿Tienes dudas sobre cuál producto es mejor para ti?
        </p>
        <button 
          class="products__consultation-btn"
          @click="contactWhatsApp('consulta personalizada')"
        >
          Solicita una Consulta Gratuita
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use 'sass:string';
@import '@/styles/colorVariables.module.scss';

.products {
  padding: 5rem 0;
  background: linear-gradient(135deg, $white 0%, color.adjust($BAMBOO-GREEN, $lightness: 48%) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="0.5" fill="%23#{string.slice(#{$BAMBOO-GREEN}, 2)}" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>') repeat;
    z-index: 1;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
  }

  &__header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  &--visible &__header {
    opacity: 1;
    transform: translateY(0);
  }

  &__title {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 700;
    color: $BAMBOO-BLACK;
    margin: 0 0 1rem 0;
    line-height: 1.2;

    &-highlight {
      color: $BAMBOO-GREEN;
    }
  }

  &__subtitle {
    font-size: 1.2rem;
    color: color.adjust($BAMBOO-BLACK, $lightness: 20%);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  &__card {
    background: $white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba($BAMBOO-GREEN, 0.1);
    transition: all 0.4s ease;
    cursor: pointer;
    opacity: 0;
    transform: translateY(50px);
    animation: slideInUp 0.8s ease forwards;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba($BAMBOO-GREEN, 0.2);
    }
  }

  &--visible &__card {
    opacity: 1;
    transform: translateY(0);
  }

  &__card-image {
    position: relative;
    height: 250px;
    overflow: hidden;

    &:hover .products__card-overlay {
      opacity: 1;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;

    .products__card:hover & {
      transform: scale(1.1);
    }
  }

  &__card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba($BAMBOO-GREEN, 0.9) 0%, rgba($BAMBOO-BLACK, 0.8) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
    color: $white;
  }

  &__cta-text {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__whatsapp-icon {
    font-size: 2rem;
    animation: bounce 2s infinite;
  }

  &__card-content {
    padding: 1.5rem;
  }

  &__card-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: $BAMBOO-BLACK;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
  }

  &__card-description {
    font-size: 0.95rem;
    color: color.adjust($BAMBOO-BLACK, $lightness: 30%);
    line-height: 1.5;
    margin: 0 0 1.5rem 0;
  }

  &__benefits {
    margin-bottom: 1.5rem;
  }

  &__benefit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    &-icon {
      width: 20px;
      height: 20px;
      background: $BAMBOO-GREEN;
      color: $white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
      flex-shrink: 0;
    }

    &-text {
      font-size: 0.9rem;
      color: $BAMBOO-BLACK;
    }
  }

  &__contact-btn {
    width: 100%;
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    color: $white;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba($BAMBOO-GREEN, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($BAMBOO-GREEN, 0.4);
      background: linear-gradient(135deg, color.adjust($BAMBOO-GREEN, $lightness: -5%) 0%, color.adjust($BAMBOO-GREEN, $lightness: -15%) 100%);
    }
  }

  &__footer {
    text-align: center;
    padding: 2rem;
    background: rgba($white, 0.8);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease 0.4s;
  }

  &--visible &__footer {
    opacity: 1;
    transform: translateY(0);
  }

  &__footer-text {
    font-size: 1.1rem;
    color: $BAMBOO-BLACK;
    margin: 0 0 1.5rem 0;
    font-weight: 500;
  }

  &__consultation-btn {
    background: linear-gradient(135deg, $BAMBOO-BLACK 0%, color.adjust($BAMBOO-BLACK, $lightness: -10%) 100%);
    color: $white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba($BAMBOO-BLACK, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($BAMBOO-BLACK, 0.4);
    }
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}
</style>
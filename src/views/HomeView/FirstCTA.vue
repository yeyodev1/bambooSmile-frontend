<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const whatsappNumber = '+593960800024'

const contactWhatsApp = () => {
  const message = 'Hola, estoy interesado en descargar la guía gratuita de bambooSmile y conocer más sobre los beneficios exclusivos y descuentos. ¿Podrían ayudarme?'
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
    { threshold: 0.3 }
  )
  
  const element = document.querySelector('.first-cta')
  if (element) {
    observer.observe(element)
  }
})
</script>

<template>
  <section class="first-cta" :class="{ 'first-cta--visible': isVisible }">
    <div class="first-cta__container">
      <div class="first-cta__content">
        <div class="first-cta__text-section">
          <h2 class="first-cta__title">
            Descubre el <span class="first-cta__title-highlight">poder de lo natural</span>
          </h2>
          <p class="first-cta__subtitle">
            Descarga una guía gratuita, recibe beneficios exclusivos mensuales y obtén un descuento en tu primera compra.
          </p>
          
          <div class="first-cta__benefits">
            <div class="first-cta__benefit">
              <div class="first-cta__benefit-icon">📖</div>
              <div class="first-cta__benefit-content">
                <h3 class="first-cta__benefit-title">Guía Gratuita</h3>
                <p class="first-cta__benefit-text">Aprende todo sobre el cuidado dental natural</p>
              </div>
            </div>
            
            <div class="first-cta__benefit">
              <div class="first-cta__benefit-icon">🎁</div>
              <div class="first-cta__benefit-content">
                <h3 class="first-cta__benefit-title">Beneficios Exclusivos</h3>
                <p class="first-cta__benefit-text">Ofertas especiales cada mes solo para ti</p>
              </div>
            </div>
            
            <div class="first-cta__benefit">
              <div class="first-cta__benefit-icon">💰</div>
              <div class="first-cta__benefit-content">
                <h3 class="first-cta__benefit-title">Descuento Especial</h3>
                <p class="first-cta__benefit-text">Ahorra en tu primera compra de productos bambooSmile</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="first-cta__action-section">
          <div class="first-cta__card">
            <div class="first-cta__card-header">
              <h3 class="first-cta__card-title">¡Comienza Ahora!</h3>
              <p class="first-cta__card-subtitle">Únete a miles de personas que ya cuidan su sonrisa naturalmente</p>
            </div>
            
            <div class="first-cta__card-content">
              <div class="first-cta__features">
                <div class="first-cta__feature">
                  <span class="first-cta__feature-icon">✓</span>
                  <span class="first-cta__feature-text">Guía PDF descargable</span>
                </div>
                <div class="first-cta__feature">
                  <span class="first-cta__feature-icon">✓</span>
                  <span class="first-cta__feature-text">Tips de expertos</span>
                </div>
                <div class="first-cta__feature">
                  <span class="first-cta__feature-icon">✓</span>
                  <span class="first-cta__feature-text">Ofertas mensuales</span>
                </div>
                <div class="first-cta__feature">
                  <span class="first-cta__feature-icon">✓</span>
                  <span class="first-cta__feature-text">Descuento inmediato</span>
                </div>
              </div>
              
              <button 
                class="first-cta__button"
                @click="contactWhatsApp"
              >
                <span class="first-cta__button-text">Obtener Guía Gratuita</span>
                <span class="first-cta__button-icon">📱</span>
              </button>
              
              <p class="first-cta__disclaimer">
                * Sin spam. Solo contenido valioso sobre salud dental natural.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="first-cta__background-elements">
        <div class="first-cta__circle first-cta__circle--1"></div>
        <div class="first-cta__circle first-cta__circle--2"></div>
        <div class="first-cta__circle first-cta__circle--3"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use 'sass:string';
@import '@/styles/colorVariables.module.scss';

.first-cta {
  padding: 6rem 0;
  background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -15%) 100%);
  position: relative;
  overflow: hidden;
  color: $white;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s ease;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }
  }

  &--visible &__content {
    opacity: 1;
    transform: translateY(0);
  }

  &__text-section {
    @media (max-width: 968px) {
      order: 2;
    }
  }

  &__title {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    line-height: 1.2;

    &-highlight {
      color: $white;
      text-shadow: 0 2px 10px rgba($white, 0.3);
    }
  }

  &__subtitle {
    font-size: 1.3rem;
    line-height: 1.6;
    margin: 0 0 3rem 0;
    opacity: 0.95;
    font-weight: 400;
  }

  &__benefits {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__benefit {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: rgba($white, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba($white, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: rgba($white, 0.15);
      transform: translateX(10px);
    }

    &-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    &-content {
      flex: 1;
    }

    &-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      color: $white;
    }

    &-text {
      font-size: 0.95rem;
      margin: 0;
      opacity: 0.9;
      line-height: 1.4;
    }
  }

  &__action-section {
    @media (max-width: 968px) {
      order: 1;
    }
  }

  &__card {
    background: $white;
    border-radius: 25px;
    padding: 2.5rem;
    box-shadow: 0 20px 60px rgba($BAMBOO-BLACK, 0.2);
    color: $BAMBOO-BLACK;
    transform: translateY(20px);
    transition: all 0.8s ease 0.3s;

    @media (max-width: 768px) {
      padding: 2rem;
    }
  }

  &--visible &__card {
    transform: translateY(0);
  }

  &__card-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__card-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $BAMBOO-GREEN;
    margin: 0 0 0.75rem 0;
  }

  &__card-subtitle {
    font-size: 1rem;
    color: color.adjust($BAMBOO-BLACK, $lightness: 20%);
    margin: 0;
    line-height: 1.5;
  }

  &__features {
    margin-bottom: 2rem;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;

    &-icon {
      width: 24px;
      height: 24px;
      background: $BAMBOO-GREEN;
      color: $white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: bold;
      flex-shrink: 0;
    }

    &-text {
      font-size: 1rem;
      color: $BAMBOO-BLACK;
      font-weight: 500;
    }
  }

  &__button {
    width: 100%;
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    color: $white;
    border: none;
    padding: 1.25rem 2rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba($BAMBOO-GREEN, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1rem;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba($BAMBOO-GREEN, 0.5);
      background: linear-gradient(135deg, color.adjust($BAMBOO-GREEN, $lightness: -5%) 0%, color.adjust($BAMBOO-GREEN, $lightness: -15%) 100%);
    }

    &-text {
      font-weight: 700;
    }

    &-icon {
      font-size: 1.2rem;
      animation: pulse 2s infinite;
    }
  }

  &__disclaimer {
    font-size: 0.85rem;
    color: color.adjust($BAMBOO-BLACK, $lightness: 30%);
    text-align: center;
    margin: 0;
    font-style: italic;
  }

  &__background-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
  }

  &__circle {
    position: absolute;
    border-radius: 50%;
    background: rgba($white, 0.05);
    animation: float 6s ease-in-out infinite;

    &--1 {
      width: 200px;
      height: 200px;
      top: 10%;
      right: 10%;
      animation-delay: 0s;
    }

    &--2 {
      width: 150px;
      height: 150px;
      bottom: 20%;
      left: 5%;
      animation-delay: 2s;
    }

    &--3 {
      width: 100px;
      height: 100px;
      top: 60%;
      right: 20%;
      animation-delay: 4s;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}
</style>
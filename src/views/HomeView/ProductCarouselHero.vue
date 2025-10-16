<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Importando las mejores imágenes PNG de productos
const pasta1Image = 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1759848582/fresh_60ml_zedhuw.png'
const pasta2Image = 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1759848682/kids_60ml_ibmg3n.png'
const pasta3Image = 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1759849537/sensitive_60ml_ucyaby.png'
const pasta4Image = 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1756309667/Cepillo_10.000_Cerdas_wtobsm.png'

const currentSlide = ref(0)
const isVisible = ref(false)
const autoplayInterval = ref<ReturnType<typeof setInterval> | null>(null)
const isPaused = ref(false)


interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  cta: string
  image: string
  background: string
  whatsappMessage: string
  isPromo?: boolean
  isNew?: boolean
}


const slides: Slide[] = [
  {
    id: 1,
    title: '¡Gracias por Elegirnos! ✨',
    subtitle: '¡Tu Sonrisa Natural Nos Inspira!',
    description: '¡Más de 10,000 familias brillan con bambooSmile! Únete a la revolución del cuidado dental eco-friendly.',
    cta: '¡Descubre la Magia!',
    image: pasta1Image,
    background: 'linear-gradient(135deg, #f1f3f4 0%, #e9ecef 100%)',
    whatsappMessage: 'Hola! Me interesa conocer más sobre bambooSmile y sus productos de cuidado dental eco-friendly. ¿Podrían darme más información? 😊'
  },
  /*
  {
    id: 2,
    title: '¡AHORRA 20% HOY! 🌟',
    subtitle: '¡Tu Pasta Favorita Siempre Lista!',
    description: '¡Suscríbete y recibe tu pasta Fresh mensualmente con un SUPER descuento! ¡Nunca te quedes sin tu sonrisa perfecta!',
    cta: '¡Quiero Mi Descuento!',
    image: pasta2Image,
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    isPromo: true,
    whatsappMessage: 'Hola! Me interesa la suscripción mensual con 20% de descuento en pasta Fresh. ¿Podrían darme más detalles sobre esta promoción? 🌟'
  },
  */
  {
    id: 3,
    title: '¡NUEVO! Pasta Sensitive 🌿',
    subtitle: '¡El Secreto Ancestral de la Amazonía!',
    description: '¡Descubre el poder milenario! Nuestra fórmula revolucionaria con Sangre de Dragón fortalece y regenera naturalmente.',
    cta: '¡Descúbrelo Ya!',
    image: pasta3Image,
    background: 'linear-gradient(135deg, #f1f3f4 0%, #dee2e6 100%)',
    isNew: true,
    whatsappMessage: 'Hola! Me interesa mucho la nueva pasta dental con Sangre de Dragón. ¿Podrían contarme más sobre sus beneficios y cómo conseguirla? 🌿'
  },
  {
    id: 4,
    title: '¡Cepillo Premium! ✨',
    subtitle: '¡10,000 Cerdas de Lujo!',
    description: '¡Experimenta una limpieza sin igual! Nuestro cepillo premium con 10,000 cerdas suaves te brinda la experiencia de cepillado más completa.',
    cta: '¡Descubre el Premium!',
    image: pasta4Image,
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    whatsappMessage: 'Hola! Me interesa el Cepillo Premium con 10,000 cerdas. ¿Podrían darme más información sobre este producto de lujo? ✨'
  }
]
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoplay = () => {
  if (autoplayInterval.value) clearInterval(autoplayInterval.value)
  autoplayInterval.value = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 6000)
}

const pauseAutoplay = () => {
  isPaused.value = true
}

const resumeAutoplay = () => {
  isPaused.value = false
}

const openWhatsApp = (slide: Slide) => {
  const phoneNumber = '593960800024'
  const message = encodeURIComponent(slide.whatsappMessage)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappUrl, '_blank')
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  startAutoplay()
})

onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
})
</script>

<template>
  <section class="hero-carousel" :class="{ 'hero-carousel--visible': isVisible }">
    <div class="hero-carousel__container">
      <!-- Slides -->
      <div class="hero-carousel__slides">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          class="hero-carousel__slide"
          :class="{
            'hero-carousel__slide--active': index === currentSlide,
            'hero-carousel__slide--prev': index === (currentSlide - 1 + slides.length) % slides.length,
            'hero-carousel__slide--next': index === (currentSlide + 1) % slides.length
          }"
          :style="{ background: slide.background }"
          @mouseenter="pauseAutoplay"
          @mouseleave="resumeAutoplay"
        >
          <div class="hero-carousel__content">
            <!-- Text Content -->
            <div class="hero-carousel__text">
              <div class="hero-carousel__badges" v-if="slide.isPromo || slide.isNew">
                <span v-if="slide.isPromo" class="hero-carousel__badge hero-carousel__badge--promo">20% OFF</span>
                <span v-if="slide.isNew" class="hero-carousel__badge hero-carousel__badge--new">NUEVO</span>
              </div>
              
              <h1 class="hero-carousel__title">{{ slide.title }}</h1>
              <h2 class="hero-carousel__subtitle">{{ slide.subtitle }}</h2>
              <p class="hero-carousel__description">{{ slide.description }}</p>
              
              <button class="hero-carousel__cta" @click="openWhatsApp(slide)">
                {{ slide.cta }}
                <span class="hero-carousel__cta-arrow">→</span>
              </button>
            </div>
            
            <!-- Image Content -->
            <div class="hero-carousel__visual">
              <div class="hero-carousel__image-container">
                <img 
                  :src="slide.image" 
                  :alt="slide.title"
                  class="hero-carousel__image"
                >
                <div class="hero-carousel__image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation Controls -->
      <div class="hero-carousel__navigation">
        <!-- Dots -->
        <div class="hero-carousel__dots">
          <button 
            v-for="(slide, index) in slides"
            :key="index"
            class="hero-carousel__dot"
            :class="{ 'hero-carousel__dot--active': index === currentSlide }"
            @click="goToSlide(index)"
            :aria-label="`Ir al slide ${index + 1}`"
          ></button>
        </div>
        
        <!-- Arrow Controls -->
        <div class="hero-carousel__arrows">
          <button 
            class="hero-carousel__arrow hero-carousel__arrow--prev"
            @click="prevSlide"
            aria-label="Slide anterior"
          >
            ←
          </button>
          <button 
            class="hero-carousel__arrow hero-carousel__arrow--next"
            @click="nextSlide"
            aria-label="Siguiente slide"
          >
            →
          </button>
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div class="hero-carousel__progress">
        <div 
          class="hero-carousel__progress-bar"
          :style="{ width: `${((currentSlide + 1) / slides.length) * 100}%` }"
        ></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/colorVariables.module.scss';

.hero-carousel {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__slides {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateX(100px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;

    &--active {
      opacity: 1;
      transform: translateX(0);
      z-index: 2;
    }

    &--prev {
      transform: translateX(-100px);
    }

    &--next {
      transform: translateX(100px);
    }
  }

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    height: 100%;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
      padding: 2rem 1rem;
    }
  }

  &__text {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease 0.2s;
  }

  &__slide--active &__text {
    opacity: 1;
    transform: translateY(0);
  }

  &__badges {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &--promo {
      background: linear-gradient(135deg, $accent-600, color.adjust($accent-600, $lightness: -10%));
      color: white;
    }

    &--new {
      background: linear-gradient(135deg, $accent-600, color.adjust($accent-600, $lightness: -10%));
      color: white;
    }
  }

  &__title {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 0.9;
    margin: 0 0 1rem 0;
    color: $neutral-900;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 1.5rem 0;
    color: $neutral-700;
  }

  &__description {
    font-size: 1.125rem;
    line-height: 1.6;
    margin: 0 0 2.5rem 0;
    color: $neutral-600;
    max-width: 500px;

    @media (max-width: 768px) {
      max-width: none;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: transparent;
    border: 2px solid $neutral-900;
    border-radius: 0;
    color: $neutral-900;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $neutral-900;
      color: white;
      transform: translateY(-2px);

      .hero-carousel__cta-arrow {
        transform: translateX(5px);
      }
    }

    @media (max-width: 480px) {
      width: 100%;
      justify-content: center;
    }
  }

  &__cta-arrow {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: all 0.8s ease 0.4s;

    @media (max-width: 768px) {
      order: -1;
    }
  }

  &__slide--active &__visual {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  &__image-container {
    position: relative;
    width: clamp(250px, 35vw, 450px);
    height: clamp(250px, 35vw, 450px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba($neutral-900, 0.1);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &__image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba($accent-600, 0.1), rgba($accent-600, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__image-container:hover {
    .hero-carousel__image {
      transform: scale(1.05);
    }

    .hero-carousel__image-overlay {
      opacity: 1;
    }
  }

  &__navigation {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10;

    @media (max-width: 768px) {
      bottom: 1rem;
      right: 1rem;
      left: 1rem;
      justify-content: space-between;
    }
  }

  &__dots {
    display: flex;
    gap: 0.5rem;
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba($neutral-900, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;

    &--active {
      background: $neutral-900;
      transform: scale(1.2);
    }

    &:hover {
      background: rgba($neutral-900, 0.6);
    }
  }

  &__arrows {
    display: flex;
    gap: 0.5rem;

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }

  &__arrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba($neutral-900, 0.2);
    background: rgba(white, 0.9);
    color: $neutral-900;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);

    &:hover {
      background: $neutral-900;
      color: white;
      border-color: $neutral-900;
      transform: scale(1.1);
    }
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba($neutral-900, 0.1);
    z-index: 10;
  }

  &__progress-bar {
    height: 100%;
    background: linear-gradient(90deg, $accent-600, color.adjust($accent-600, $lightness: -10%));
    transition: width 0.8s ease;
  }

  // Entrance animation
  &--visible {
    .hero-carousel__slide--active {

      .hero-carousel__text,
      .hero-carousel__visual {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .hero-carousel {
    &__content {
      padding: 1rem;
    }

    &__title {
      font-size: 2.5rem;
    }

    &__subtitle {
      font-size: 1.25rem;
    }

    &__description {
      font-size: 1rem;
    }
  }
}
</style>
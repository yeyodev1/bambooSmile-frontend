<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Interfaz para los testimonios
interface Testimonial {
  id: number
  rating: number
  text: string
  author: string
}

// Datos de los testimonios
const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    rating: 5,
    text: "La mejor inversión para mi salud dental. Mis encías sanas y mi aliento es fresco todo el día.",
    author: "Carlos Rodríguez"
  },
  {
    id: 2,
    rating: 5,
    text: "bambooSmile cambió completamente mi rutina de higiene dental. Mis dientes se sienten más limpios que nunca.",
    author: "María González"
  },
  {
    id: 3,
    rating: 4,
    text: "Desde que uso bambooSmile, mi dentista nota la diferencia. Es increíble cómo un producto natural puede ser tan efectivo.",
    author: "Ana Martínez"
  },
  {
    id: 4,
    rating: 5,
    text: "Recomiendo 100% bambooSmile. La calidad es excepcional y los resultados son visibles desde la primera semana.",
    author: "Luis Herrera"
  }
])

// Estado del carrusel
const currentIndex = ref(0)
const isAnimating = ref(false)
const animationDirection = ref<'next' | 'prev'>('next')

// Computed para el testimonio actual
const currentTestimonial = computed(() => testimonials.value[currentIndex.value])

// Funciones de navegación
const goToNext = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  animationDirection.value = 'next'

  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
    setTimeout(() => {
      isAnimating.value = false
    }, 400)
  }, 400)
}

const goToPrev = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  animationDirection.value = 'prev'

  setTimeout(() => {
    currentIndex.value = currentIndex.value === 0 ? testimonials.value.length - 1 : currentIndex.value - 1
    setTimeout(() => {
      isAnimating.value = false
    }, 400)
  }, 400)
}

const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentIndex.value) return

  isAnimating.value = true
  animationDirection.value = index > currentIndex.value ? 'next' : 'prev'

  setTimeout(() => {
    currentIndex.value = index
    setTimeout(() => {
      isAnimating.value = false
    }, 400)
  }, 400)
}

// Generar estrellas para el rating
const generateStars = (rating: number) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push('full')
    } else if (i - 0.5 <= rating) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }
  return stars
}

// Intersection Observer para animaciones
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

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

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section 
    ref="sectionRef" 
    class="testimonials-carousel"
    :class="{ 'testimonials-carousel--visible': isVisible }"
  >
    <div class="testimonials-carousel__container">
      <!-- Título de la sección -->
      <div class="testimonials-carousel__header">
        <h2 class="testimonials-carousel__title">
          Lo que dicen nuestros
          <span class="testimonials-carousel__title-highlight">clientes</span>
        </h2>
      </div>

      <!-- Carrusel principal -->
      <div class="testimonials-carousel__wrapper">
        <!-- Botón anterior -->
        <button 
          @click="goToPrev"
          class="testimonials-carousel__nav testimonials-carousel__nav--prev"
          :disabled="isAnimating"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <!-- Contenedor del testimonio -->
        <div class="testimonials-carousel__content">
          <!-- Icono de comillas -->
          <div class="testimonials-carousel__quote-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
          </div>

          <!-- Testimonio con animación de cubo -->
          <div 
            class="testimonials-carousel__testimonial"
            :class="{
              'testimonials-carousel__testimonial--animating-next': isAnimating && animationDirection === 'next',
              'testimonials-carousel__testimonial--animating-prev': isAnimating && animationDirection === 'prev'
            }"
          >
            <!-- Rating con estrellas -->
            <div class="testimonials-carousel__rating">
              <div 
                v-for="(star, index) in generateStars(currentTestimonial.rating)"
                :key="index"
                class="testimonials-carousel__star"
                :class="`testimonials-carousel__star--${star}`"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>

            <!-- Texto del testimonio -->
            <blockquote class="testimonials-carousel__text">
              {{ currentTestimonial.text }}
            </blockquote>

            <!-- Autor -->
            <cite class="testimonials-carousel__author">
              {{ currentTestimonial.author }}
            </cite>
          </div>
        </div>

        <!-- Botón siguiente -->
        <button 
          @click="goToNext"
          class="testimonials-carousel__nav testimonials-carousel__nav--next"
          :disabled="isAnimating"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>

      <!-- Indicadores (dots) -->
      <div class="testimonials-carousel__indicators">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          @click="goToSlide(index)"
          class="testimonials-carousel__dot"
          :class="{ 'testimonials-carousel__dot--active': index === currentIndex }"
          :disabled="isAnimating"
        >
          <span class="sr-only">Ir al testimonio {{ index + 1 }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/colorVariables.module.scss';

.testimonials-carousel {
  padding: 80px 0;
  background: #e9f5f1;
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  &__container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
  }

  &__header {
    text-align: center;
    margin-bottom: 60px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
    }
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: $BAMBOO-BLACK;
    margin-bottom: 16px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.6rem;
    }
  }

  &__title-highlight {
    color: $BAMBOO-GREEN;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-bottom: 40px;
    position: relative;
    min-height: 300px;

    @media (max-width: 768px) {
      gap: 20px;
      min-height: 250px;
    }
  }

  &__nav {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    border: 2px solid #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 2;

    &:hover:not(:disabled) {
      background: $BAMBOO-GREEN;
      border-color: $BAMBOO-GREEN;
      transform: scale(1.1);

      svg {
        color: white;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #6c757d;
      transition: color 0.3s ease;
    }

    @media (max-width: 768px) {
      width: 40px;
      height: 40px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__content {
    flex: 1;
    max-width: 600px;
    position: relative;
    perspective: 1000px;
  }

  &__quote-icon {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    opacity: 0.1;
    z-index: 1;

    svg {
      width: 100%;
      height: 100%;
      color: $BAMBOO-GREEN;
    }

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
      top: -15px;
    }
  }

  &__testimonial {
    background: white;
    border-radius: 20px;
    padding: 40px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 768px) {
      padding: 30px 20px;
      border-radius: 15px;
    }

    // Animación de cubo 3D hacia arriba (salida)
    &--animating-next {
      animation: cubeRotateUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    // Animación de cubo 3D hacia arriba (salida) para anterior
    &--animating-prev {
      animation: cubeRotateDown 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  }

  &__rating {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: 20px;
  }

  &__star {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }

    svg {
      width: 100%;
      height: 100%;
    }

    &--full svg {
      color: #ffc107;
    }

    &--half svg {
      color: #ffc107;
      opacity: 0.5;
    }

    &--empty svg {
      color: #e9ecef;
    }

    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }

  &__text {
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.6;
    color: $BAMBOO-BLACK;
    margin-bottom: 20px;
    font-style: normal;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      line-height: 1.5;
    }
  }

  &__author {
    font-size: 1rem;
    font-weight: 300;
    color: #6c757d;
    font-style: normal;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  &__indicators {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: #e9ecef;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: lighten($BAMBOO-GREEN, 20%);
      transform: scale(1.2);
    }

    &--active {
      background: $BAMBOO-GREEN;
      transform: scale(1.3);
    }

    &:disabled {
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      width: 10px;
      height: 10px;
      gap: 8px;
    }
  }

  // Animación de entrada
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  // Clase para ocultar texto durante scroll
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

// Animaciones de cubo 3D
@keyframes cubeRotateUp {
  0% {
    transform: rotateX(0deg) translateZ(0);
    opacity: 1;
  }

  50% {
    transform: rotateX(-90deg) translateZ(150px);
    opacity: 0.5;
  }

  100% {
    transform: rotateX(-180deg) translateZ(0);
    opacity: 0;
  }
}

@keyframes cubeRotateDown {
  0% {
    transform: rotateX(0deg) translateZ(0);
    opacity: 1;
  }

  50% {
    transform: rotateX(90deg) translateZ(150px);
    opacity: 0.5;
  }

  100% {
    transform: rotateX(180deg) translateZ(0);
    opacity: 0;
  }
}

// Animación de entrada para el nuevo testimonio
@keyframes cubeEnterFromBottom {
  0% {
    transform: rotateX(180deg) translateZ(0);
    opacity: 0;
  }

  50% {
    transform: rotateX(90deg) translateZ(150px);
    opacity: 0.5;
  }

  100% {
    transform: rotateX(0deg) translateZ(0);
    opacity: 1;
  }
}

@keyframes cubeEnterFromTop {
  0% {
    transform: rotateX(-180deg) translateZ(0);
    opacity: 0;
  }

  50% {
    transform: rotateX(-90deg) translateZ(150px);
    opacity: 0.5;
  }

  100% {
    transform: rotateX(0deg) translateZ(0);
    opacity: 1;
  }
}
</style>
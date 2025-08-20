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
          <!-- Testimonio con transición suave -->
          <div 
            class="testimonials-carousel__testimonial"
            :class="{
              'testimonials-carousel__testimonial--animating': isAnimating
            }"
          >
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
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/colorVariables.module.scss';

.testimonials-carousel {
  padding: 80px 0;
  background: transparent;
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  &__container {
    max-width: 800px;
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
    color: $neutral-900;
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
    color: $accent-600;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    position: relative;
    min-height: 200px;

    @media (max-width: 768px) {
      gap: 20px;
      min-height: 180px;
    }
  }

  &__nav {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2;
    opacity: 0.6;

    &:hover:not(:disabled) {
      opacity: 1;
      transform: scale(1.1);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    svg {
      width: 24px;
      height: 24px;
      color: $neutral-700;
      transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__content {
    flex: 1;
    max-width: 600px;
    position: relative;
  }

  &__testimonial {
    text-align: center;
    position: relative;
    transition: opacity 0.5s ease, transform 0.5s ease;

    &--animating {
      opacity: 0.3;
      transform: translateY(10px);
    }
  }

  &__text {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.7;
    color: $neutral-800;
    margin-bottom: 24px;
    font-style: italic;
    font-family: Georgia, 'Times New Roman', serif;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  &__author {
    font-size: 1rem;
    font-weight: 500;
    color: $neutral-600;
    font-style: normal;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
      font-size: 0.9rem;
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
}
</style>
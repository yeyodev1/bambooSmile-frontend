<script setup lang="ts">
import { ref, onMounted } from 'vue'
import persona1Image from '@/assets/testimonios/persona-1.png'
import persona2Image from '@/assets/testimonios/persona-2.png'

// Datos de los testimonios
const testimonials = ref([
  {
    id: 1,
    name: 'María González',
    image: persona1Image,
    quote: '"BambooSmile cambió completamente mi rutina de higiene dental. Mis dientes se sienten más limpios y mi sonrisa es más brillante que nunca."',
    videoUrl: 'https://www.youtube.com/watch?v=_Jk38-QH8_8&list=PLggk7H-KGC_zBvXXMDM1crF5g9sBJ1rIt&index=3'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    image: persona2Image,
    quote: '"Desde que uso BambooSmile, mi dentista nota la diferencia. Es increíble cómo un producto natural puede ser tan efectivo."',
    videoUrl: 'https://www.youtube.com/watch?v=LrvhRLCKbBc&list=PLggk7H-KGC_wfGoOgSpqC-4-xknXH0NH9'
  }
])

// Función para abrir video en nueva pestaña
const watchTestimonial = (videoUrl: string) => {
  window.open(videoUrl, '_blank')
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
    class="testimonials"
    :class="{ 'testimonials--visible': isVisible }"
  >
    <div class="testimonials__container">
      <!-- Título de la sección -->
      <div class="testimonials__header">
        <h2 class="testimonials__title">
          Lo que dicen nuestros
          <span class="testimonials__title-highlight">clientes</span>
        </h2>
        <p class="testimonials__subtitle">
          Historias reales de personas que han transformado su sonrisa con BambooSmile
        </p>
      </div>

      <!-- Grid de testimonios -->
      <div class="testimonials__grid">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          class="testimonial-card"
          :class="`testimonial-card--${index + 1}`"
        >
          <!-- Imagen del cliente -->
          <div class="testimonial-card__image-container">
            <img 
              :src="testimonial.image" 
              :alt="`Testimonio de ${testimonial.name}`"
              class="testimonial-card__image"
            >
            <div class="testimonial-card__play-overlay">
              <svg 
                class="testimonial-card__play-icon" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          <!-- Contenido del testimonio -->
          <div class="testimonial-card__content">
            <blockquote class="testimonial-card__quote">
              {{ testimonial.quote }}
            </blockquote>
            
            <div class="testimonial-card__author">
              <h4 class="testimonial-card__name">{{ testimonial.name }}</h4>
              <p class="testimonial-card__role">Cliente BambooSmile</p>
            </div>

            <!-- Botón para ver testimonio -->
            <button 
              @click="watchTestimonial(testimonial.videoUrl)"
              class="testimonial-card__watch-btn"
            >
              <svg class="testimonial-card__watch-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Ver testimonio completo
            </button>
          </div>
        </div>
      </div>

      <!-- Call to action adicional -->
      <div class="testimonials__cta">
        <p class="testimonials__cta-text">
          ¿Quieres ser parte de estas historias de éxito?
        </p>
        <button 
          @click="watchTestimonial('https://wa.me/593960800024?text=Hola,%20quiero%20conocer%20más%20sobre%20BambooSmile')"
          class="testimonials__cta-btn"
        >
          Comienza tu transformación
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:string';
@use 'sass:color';
@import '../../styles/colorVariables.module.scss';

.testimonials {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%);
  position: relative;
  overflow: hidden;

  // Animación de entrada
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  // Decoración de fondo
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba($BAMBOO-GREEN, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 1;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 2;
  }

  &__header {
    text-align: center;
    margin-bottom: 60px;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: $BAMBOO-BLACK;
    margin-bottom: 16px;
    line-height: 1.2;

    &-highlight {
      color: $BAMBOO-GREEN;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, $BAMBOO-GREEN, $BAMBOO-ORANGE);
        border-radius: 2px;
      }
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: $text-light;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 40px;
    margin-bottom: 60px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }

  &__cta {
    text-align: center;
    padding: 40px;
    background: rgba($white, 0.8);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba($BAMBOO-GREEN, 0.1);
  }

  &__cta-text {
    font-size: 1.25rem;
    color: $BAMBOO-BLACK;
    margin-bottom: 24px;
    font-weight: 500;
  }

  &__cta-btn {
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    color: $white;
    border: none;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba($BAMBOO-GREEN, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba($BAMBOO-GREEN, 0.4);
    }
  }
}

.testimonial-card {
  background: $white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba($BAMBOO-BLACK, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  // Animación escalonada
  &--1 {
    animation-delay: 0.2s;
  }

  &--2 {
    animation-delay: 0.4s;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba($BAMBOO-BLACK, 0.12);

    .testimonial-card__play-overlay {
      opacity: 1;
    }

    .testimonial-card__image {
      transform: scale(1.05);
    }
  }

  &__image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &__play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($BAMBOO-BLACK, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__play-icon {
    width: 60px;
    height: 60px;
    color: $white;
    background: rgba($BAMBOO-GREEN, 0.9);
    border-radius: 50%;
    padding: 16px;
    box-shadow: 0 4px 20px rgba($BAMBOO-GREEN, 0.4);
  }

  &__content {
    padding: 32px;
  }

  &__quote {
    font-size: 1.125rem;
    line-height: 1.7;
    color: $BAMBOO-BLACK;
    margin-bottom: 24px;
    font-style: italic;
    position: relative;

    &::before {
      content: '"';
      font-size: 4rem;
      color: $BAMBOO-GREEN;
      position: absolute;
      top: -20px;
      left: -16px;
      font-family: serif;
      opacity: 0.3;
    }
  }

  &__author {
    margin-bottom: 24px;
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 600;
    color: $BAMBOO-BLACK;
    margin-bottom: 4px;
  }

  &__role {
    color: $text-light;
    font-size: 0.875rem;
  }

  &__watch-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    color: $white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    justify-content: center;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($BAMBOO-GREEN, 0.3);
    }
  }

  &__watch-icon {
    width: 16px;
    height: 16px;
  }
}

// Responsive
@media (max-width: 768px) {
  .testimonials {
    padding: 60px 0;

    &__container {
      padding: 0 16px;
    }

    &__grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    &__cta {
      padding: 32px 24px;
    }
  }

  .testimonial-card {
    &__content {
      padding: 24px;
    }

    &__quote {
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .testimonials {
    &__grid {
      grid-template-columns: 1fr;
    }
  }

  .testimonial-card {
    &__image-container {
      height: 160px;
    }

    &__content {
      padding: 20px;
    }
  }
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Datos de impacto ecológico
const impactData = ref([
  {
    id: 1,
    icon: 'fas fa-leaf',
    number: '15,000+',
    label: 'Cepillos plásticos evitados',
    description: 'Reduciendo el impacto ambiental'
  },
  {
    id: 2,
    icon: 'fas fa-recycle',
    number: '2.5 Kg',
    label: 'Plástico ahorrado mensualmente',
    description: 'Por cada familia que usa bambooSmile'
  },
  {
    id: 3,
    icon: 'fas fa-users',
    number: '5,000+',
    label: 'Familias comprometidas',
    description: 'Con el cambio hacia lo natural'
  },
  {
    id: 4,
    icon: 'fas fa-heart',
    label: 'Comunidad saludable',
    description: 'Promoviendo bienestar y sostenibilidad'
  }
])

// Función para contactar por WhatsApp
const contactWhatsApp = () => {
  const message = encodeURIComponent('Hola Henry, me inspira tu mensaje sobre bambooSmile. Quiero ser parte del cambio hacia una sonrisa más natural y sostenible.')
  window.open(`https://wa.me/593960800024?text=${message}`, '_blank')
}

// Intersection Observer para animaciones
const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const isVisible = ref(false)
const isVideoPlaying = ref(false)

// Control del video
const toggleVideo = () => {
  if (videoRef.value) {
    if (isVideoPlaying.value) {
      videoRef.value.pause()
      isVideoPlaying.value = false
    } else {
      videoRef.value.play()
      isVideoPlaying.value = true
    }
  }
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

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  // Event listeners para el video
  if (videoRef.value) {
    videoRef.value.addEventListener('play', () => {
      isVideoPlaying.value = true
    })

    videoRef.value.addEventListener('pause', () => {
      isVideoPlaying.value = false
    })

    videoRef.value.addEventListener('ended', () => {
      isVideoPlaying.value = false
    })
  }
})
</script>

<template>
  <section 
    ref="sectionRef" 
    class="ceo-video"
    :class="{ 'ceo-video--visible': isVisible }"
  >
    <div class="ceo-video__container">
      <!-- Título de la sección -->
      <div class="ceo-video__header">
        <h2 class="ceo-video__title">
          Un mensaje de 
          <span class="ceo-video__title-highlight">Henry</span>
        </h2>
        <p class="ceo-video__subtitle">
          Director de bambooSmile, comprometido con tu salud y el planeta
        </p>
      </div>

      <!-- Video y contenido principal -->
      <div class="ceo-video__content">
        <!-- Video del CEO -->
        <div class="ceo-video__video-container">
          <video 
            ref="videoRef"
            class="ceo-video__video"
            preload="metadata"
            @click="toggleVideo"
          >
            <source src="/src/assets/ceo/motivacional.mp4" type="video/mp4">
            Tu navegador no soporta el elemento de video.
          </video>
          
          <!-- Overlay de control -->
          <div 
            class="ceo-video__overlay"
            :class="{ 'ceo-video__overlay--hidden': isVideoPlaying }"
            @click="toggleVideo"
          >
            <div class="ceo-video__play-button">
              <i class="fas fa-play"></i>
            </div>
            <div class="ceo-video__video-info">
              <h3>Mensaje Inspirador</h3>
              <p>Descubre la visión detrás de bambooSmile</p>
            </div>
          </div>
        </div>

        <!-- Métricas de impacto -->
        <div class="ceo-video__metrics">
          <h3 class="ceo-video__metrics-title">
            Nuestro impacto juntos
          </h3>
          
          <div class="ceo-video__metrics-grid">
            <div 
              v-for="(metric, index) in impactData" 
              :key="metric.id"
              class="metric-card"
              :class="`metric-card--${index + 1}`"
            >
              <div class="metric-card__icon">
                <i :class="metric.icon"></i>
              </div>
              <div class="metric-card__content">
                <div v-if="metric.number" class="metric-card__number">
                  {{ metric.number }}
                </div>
                <h4 class="metric-card__label">{{ metric.label }}</h4>
                <p class="metric-card__description">{{ metric.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="ceo-video__cta">
        <div class="ceo-video__cta-content">
          <h3 class="ceo-video__cta-title">
            ¿Te sumas al cambio?
          </h3>
          <p class="ceo-video__cta-text">
            Únete a nuestra comunidad y sé parte de la revolución hacia una higiene dental más natural y sostenible.
          </p>
          <button 
            @click="contactWhatsApp"
            class="ceo-video__cta-button"
          >
            <i class="fab fa-whatsapp"></i>
            Hablar con nuestro agente
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.ceo-video {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5f0 100%);
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
    top: -30%;
    left: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba($BAMBOO-GREEN, 0.03) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 1;
  }

  &__container {
    max-width: 1400px;
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
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: $BAMBOO-BLACK;
    margin-bottom: 16px;
    line-height: 1.1;

    &-highlight {
      color: $BAMBOO-GREEN;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, $BAMBOO-GREEN, $BAMBOO-ORANGE);
        border-radius: 2px;
      }
    }
  }

  &__subtitle {
    font-size: 1.25rem;
    color: black;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
    margin-bottom: 80px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  &__video-container {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba($BAMBOO-BLACK, 0.15);
    background: $BAMBOO-BLACK;
  }

  &__video {
    width: 100%;
    height: auto;
    min-height: 400px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba($BAMBOO-BLACK, 0.7) 0%, rgba($BAMBOO-BLACK, 0.4) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &--hidden {
      opacity: 0;
      pointer-events: none;
    }
  }

  &__play-button {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    box-shadow: 0 8px 30px rgba($BAMBOO-GREEN, 0.4);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 40px rgba($BAMBOO-GREEN, 0.5);
    }

    i {
      font-size: 24px;
      color: $white;
      margin-left: 4px;
    }
  }

  &__video-info {
    text-align: center;
    color: $white;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 8px;
    }

    p {
      font-size: 1rem;
      opacity: 0.9;
    }
  }

  &__metrics {
    background: $white;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba($BAMBOO-BLACK, 0.08);
  }

  &__metrics-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: $BAMBOO-BLACK;
    margin-bottom: 32px;
    text-align: center;
  }

  &__metrics-grid {
    display: grid;
    gap: 24px;
  }

  &__cta {
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -5%) 100%);
    border-radius: 24px;
    padding: 60px 40px;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200px;
      height: 200px;
      background: rgba($white, 0.1);
      border-radius: 50%;
      z-index: 1;
    }
  }

  &__cta-content {
    position: relative;
    z-index: 2;
  }

  &__cta-title {
    font-size: 2rem;
    font-weight: 700;
    color: $white;
    margin-bottom: 16px;
  }

  &__cta-text {
    font-size: 1.125rem;
    color: rgba($white, 0.9);
    margin-bottom: 32px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  &__cta-button {
    background: $white;
    color: $BAMBOO-GREEN;
    border: none;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 20px rgba($white, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba($white, 0.4);
    }

    i {
      font-size: 1.25rem;
    }
  }
}

.metric-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%);
  border: 1px solid rgba($BAMBOO-GREEN, 0.1);
  transition: all 0.3s ease;

  // Animación escalonada
  &--1 {
    animation-delay: 0.1s;
  }

  &--2 {
    animation-delay: 0.2s;
  }

  &--3 {
    animation-delay: 0.3s;
  }

  &--4 {
    animation-delay: 0.4s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba($BAMBOO-GREEN, 0.15);
    border-color: rgba($BAMBOO-GREEN, 0.2);
  }

  &__icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 20px;
      color: $white;
    }
  }

  &__content {
    flex: 1;
  }

  &__number {
    font-size: 1.5rem;
    font-weight: 700;
    color: $BAMBOO-GREEN;
    margin-bottom: 4px;
  }

  &__label {
    font-size: 1rem;
    font-weight: 600;
    color: $BAMBOO-BLACK;
    margin-bottom: 4px;
  }

  &__description {
    font-size: 0.875rem;
    color: color.adjust($BAMBOO-BLACK, $lightness: 15%);
    font-weight: 500;
    line-height: 1.4;
  }
}

// Responsive
@media (max-width: 768px) {
  .ceo-video {
    padding: 60px 0;

    &__container {
      padding: 0 16px;
    }

    &__content {
      gap: 32px;
      margin-bottom: 60px;
    }

    &__video {
      min-height: 300px;
    }

    &__metrics {
      padding: 32px 24px;
    }

    &__cta {
      padding: 40px 24px;
    }
  }

  .metric-card {
    padding: 16px;
    gap: 12px;

    &__icon {
      width: 40px;
      height: 40px;

      i {
        font-size: 16px;
      }
    }

    &__number {
      font-size: 1.25rem;
    }
  }
}

@media (max-width: 480px) {
  .ceo-video {
    &__video {
      min-height: 250px;
    }

    &__play-button {
      width: 60px;
      height: 60px;

      i {
        font-size: 18px;
      }
    }
  }

  .metric-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}
</style>
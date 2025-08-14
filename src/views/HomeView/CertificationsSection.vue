<script setup lang="ts">
import { ref, onMounted } from 'vue'

import certificado1Image from '@/assets/certificates/certificado-1.png'
import certificado2Image from '@/assets/certificates/certificado-2.png'

// Certificaciones disponibles
const certifications = ref([
  {
    id: 1,
    name: 'Certificación de Calidad Premium',
    image: certificado1Image,
    description: 'Fórmula alemana certificada'
  },
  {
    id: 2,
    name: 'Sello de Sostenibilidad',
    image: certificado2Image,
    description: 'Compromiso ecológico verificado'
  }
])

// Animación de entrada
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
    {
      threshold: 0.2
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section 
    ref="sectionRef" 
    class="certifications"
    :class="{ 'certifications--visible': isVisible }"
  >
    <div class="certifications__container">
      <!-- Encabezado -->
      <div class="certifications__header">
        <h2 class="certifications__title">
          Certificaciones y 
          <span class="certifications__title-highlight">Calidad Garantizada</span>
        </h2>
        <p class="certifications__subtitle">
          Respaldados por los más altos estándares de calidad internacional
        </p>
      </div>

      <!-- Grid de certificaciones -->
      <div class="certifications__grid">
        <div 
          v-for="(cert, index) in certifications" 
          :key="cert.id"
          class="certifications__card"
          :style="{ '--delay': `${index * 0.2}s` }"
        >
          <div class="certifications__card-inner">
            <div class="certifications__image-container">
              <img 
                :src="cert.image" 
                :alt="cert.name"
                class="certifications__image"
                loading="lazy"
              >
            </div>
            <div class="certifications__content">
              <h3 class="certifications__card-title">{{ cert.name }}</h3>
              <p class="certifications__card-description">{{ cert.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Características destacadas -->
      <div class="certifications__features">
        <div class="certifications__feature">
          <div class="certifications__feature-icon">🇩🇪</div>
          <span class="certifications__feature-text">Fórmula Alemana</span>
        </div>
        <div class="certifications__feature">
          <div class="certifications__feature-icon">🌱</div>
          <span class="certifications__feature-text">100% Natural</span>
        </div>
        <div class="certifications__feature">
          <div class="certifications__feature-icon">✓</div>
          <span class="certifications__feature-text">Calidad Certificada</span>
        </div>
        <div class="certifications__feature">
          <div class="certifications__feature-icon">🌍</div>
          <span class="certifications__feature-text">Sostenible</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.certifications {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%);
  position: relative;
  overflow: hidden;

  // Patrón de fondo sutil
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(76, 175, 80, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
  }

  &__header {
    text-align: center;
    margin-bottom: 60px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;

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
      font-size: 1.75rem;
    }

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
    color: color.adjust($BAMBOO-BLACK, $lightness: 20%);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 60px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 40px;
    }
  }

  &__card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    transition-delay: var(--delay);

    &-inner {
      background: $white;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(76, 175, 80, 0.1);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
        border-color: rgba(76, 175, 80, 0.2);
      }

      @media (max-width: 768px) {
        padding: 24px;
      }
    }
  }

  &__image-container {
    width: 120px;
    height: 120px;
    margin-bottom: 24px;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(76, 175, 80, 0.1);

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;

    .certifications__card:hover & {
      transform: scale(1.05);
    }
  }

  &__content {
    flex: 1;
  }

  &__card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: $BAMBOO-BLACK;
    margin-bottom: 8px;
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: 1.125rem;
    }
  }

  &__card-description {
    font-size: 0.95rem;
    color: color.adjust($BAMBOO-BLACK, $lightness: 30%);
    line-height: 1.5;
  }

  &__features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 24px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    transition-delay: 0.4s;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__feature {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 20px;
    background: $white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(76, 175, 80, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border-color: rgba(76, 175, 80, 0.2);
    }

    @media (max-width: 768px) {
      padding: 12px 16px;
      gap: 8px;
    }
  }

  &__feature-icon {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $BAMBOO-GREEN, color.adjust($BAMBOO-GREEN, $lightness: 10%));
    border-radius: 50%;
    color: $white;
    font-weight: 600;

    @media (max-width: 768px) {
      width: 36px;
      height: 36px;
      font-size: 1.25rem;
    }
  }

  &__feature-text {
    font-size: 0.95rem;
    font-weight: 600;
    color: $BAMBOO-BLACK;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  // Animaciones de entrada
  &--visible {

    .certifications__header,
    .certifications__card,
    .certifications__features {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
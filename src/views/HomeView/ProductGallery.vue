<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Imports de certificados
import certificado1 from '@/assets/certificates/certificado-1.png'
import certificado2 from '@/assets/certificates/certificado-2.png'

const isVisible = ref(false)

const brandAttributes = [
  {
    id: 1,
    title: 'Ingredientes Naturales',
    description: 'Derivados de fuentes naturales y sostenibles',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
      <path d="M8 21L9.09 14.74L16 14L9.09 13.26L8 7L6.91 13.26L0 14L6.91 14.74L8 21Z"/>
    </svg>`
  },
  {
    id: 2,
    title: 'EWG Verified',
    description: 'Certificación de seguridad reconocida',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 12L11 14L15 10"/>
      <circle cx="12" cy="12" r="9"/>
    </svg>`,
    certificate: certificado1
  },
  {
    id: 3,
    title: 'Empaque Reciclable',
    description: 'Tubo de metal 100% reciclable',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M3 6L5 6L21 6"/>
      <path d="M19 6V20A2 2 0 0 1 17 20H7A2 2 0 0 1 5 20V6M8 6V4A2 2 0 0 1 10 4H14A2 2 0 0 1 16 4V6"/>
      <path d="M10 11V17"/>
      <path d="M14 11V17"/>
    </svg>`
  },
  {
    id: 4,
    title: 'Hecho en Ecuador',
    description: 'Orgullosamente fabricado en Ecuador',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 12 1A9 9 0 0 1 21 10Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`
  },
  {
    id: 5,
    title: 'Sin Artificiales',
    description: 'Libre de sabores, colores o preservantes artificiales',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M4.93 4.93L19.07 19.07"/>
    </svg>`
  },
  {
    id: 6,
    title: 'Empaque Sostenible',
    description: 'Certificación FSC para empaque sostenible',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
      <path d="M2 17L12 22L22 17"/>
      <path d="M2 12L12 17L22 12"/>
    </svg>`,
    certificate: certificado2
  },
  {
    id: 7,
    title: 'Sin Sodio Lauril Sulfato',
    description: 'Fórmula libre de SLS para mayor suavidad',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"/>
      <path d="M21 9V7L15 1L13 3L15 5V7H9V5L11 3L9 1L3 7V9H21Z"/>
      <path d="M3 11V13H21V11H3Z"/>
      <path d="M5 15V17H19V15H5Z"/>
      <path d="M7 19V21H17V19H7Z"/>
    </svg>`
  },
  {
    id: 8,
    title: 'Apto para Veganos',
    description: 'Fórmula 100% vegana y libre de crueldad',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M2 3H6L8 17H19L21 9H9"/>
      <circle cx="9" cy="20" r="1"/>
      <circle cx="20" cy="20" r="1"/>
      <path d="M6 6H17L15 13H8L6 6Z"/>
    </svg>`
  }
]

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
  <section id="brand-attributes" class="brand-attributes" :class="{ 'brand-attributes--visible': isVisible }">
    <div class="brand-attributes__container">
      <div class="brand-attributes__header">
        <h2 class="brand-attributes__title">
          Calidad y <span class="brand-attributes__title-highlight">Confianza</span>
        </h2>
        <p class="brand-attributes__subtitle">
          Comprometidos con la excelencia en cada producto que creamos
        </p>
      </div>
      
      <div class="brand-attributes__grid">
        <div 
          v-for="(attribute, index) in brandAttributes" 
          :key="attribute.id"
          class="brand-attributes__card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="brand-attributes__icon" v-html="attribute.icon"></div>
          <h3 class="brand-attributes__title-card">{{ attribute.title }}</h3>
          <p class="brand-attributes__description">{{ attribute.description }}</p>
          
          <div v-if="attribute.certificate" class="brand-attributes__certificate">
            <img 
              :src="attribute.certificate" 
              :alt="`Certificado ${attribute.title}`"
              class="brand-attributes__certificate-image"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.brand-attributes {
  padding: 4rem 0;
  background: #f8f9fa;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  &__header {
    text-align: center;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  &--visible &__header {
    opacity: 1;
    transform: translateY(0);
  }

  &__title {
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 300;
    color: #2c3e50;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    &-highlight {
      color: $BAMBOO-GREEN;
      font-weight: 400;
    }
  }

  &__subtitle {
    font-size: 1rem;
    color: #6c757d;
    font-weight: 300;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.5;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  &__card {
    background: $white;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
  }

  &--visible &__card {
    opacity: 1;
    transform: translateY(0);
  }

  &__icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1.25rem;
    color: $BAMBOO-GREEN;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__title-card {
    font-size: 1rem;
    font-weight: 500;
    color: #2c3e50;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  &__description {
    font-size: 0.875rem;
    color: #6c757d;
    font-weight: 300;
    line-height: 1.4;
    margin: 0 0 1rem 0;
  }

  &__certificate {
    margin-top: 1rem;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  &__certificate-image {
    width: 60px;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
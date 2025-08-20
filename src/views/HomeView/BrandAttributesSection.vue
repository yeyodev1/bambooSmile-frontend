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
    icon: 'fas fa-leaf'
  },
  {
    id: 2,
    title: 'EWG Verified',
    description: 'Certificación de seguridad reconocida',
    icon: 'fas fa-shield-alt',
    certificate: certificado1
  },
  {
    id: 3,
    title: 'Empaque Reciclable',
    description: 'Tubo de metal 100% reciclable',
    icon: 'fas fa-recycle'
  },
  {
    id: 4,
    title: 'Hecho en Ecuador',
    description: 'Orgullosamente fabricado en Ecuador',
    icon: 'fas fa-map-marker-alt'
  },
  {
    id: 5,
    title: 'Sin Artificiales',
    description: 'Libre de sabores, colores o preservantes artificiales',
    icon: 'fas fa-ban'
  },
  {
    id: 6,
    title: 'Empaque Sostenible',
    description: 'Certificación FSC para empaque sostenible',
    icon: 'fas fa-tree',
    certificate: certificado2
  },
  {
    id: 7,
    title: 'Sin Sodio Lauril Sulfato',
    description: 'Fórmula libre de SLS para mayor suavidad',
    icon: 'fas fa-flask'
  },
  {
    id: 8,
    title: 'Apto para Veganos',
    description: 'Fórmula 100% vegana y libre de crueldad',
    icon: 'fas fa-seedling'
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
          <div class="brand-attributes__icon" v-if="!attribute.certificate">
            <i :class="attribute.icon"></i>
          </div>
          
          <div v-if="attribute.certificate" class="brand-attributes__certificate-main">
            <img 
              :src="attribute.certificate" 
              :alt="`Certificado ${attribute.title}`"
              class="brand-attributes__certificate-main-image"
            >
          </div>
          
          <h3 class="brand-attributes__title-card">{{ attribute.title }}</h3>
          <p class="brand-attributes__description">{{ attribute.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/colorVariables.module.scss';

.brand-attributes {
  padding: 4rem 0;
  background: $neutral-100;
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
    color: $neutral-900;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    &-highlight {
      color: $accent-600;
      font-weight: 400;
    }
  }

  &__subtitle {
    font-size: 1rem;
    color: $neutral-600;
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
    background: $neutral-50;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba($neutral-900, 0.04);
    border: 1px solid rgba($neutral-300, 0.3);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba($neutral-900, 0.08);
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
    color: $accent-600;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 2rem;
    }
  }

  &__title-card {
    font-size: 1rem;
    font-weight: 500;
    color: $neutral-900;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  &__description {
    font-size: 0.875rem;
    color: $neutral-600;
    font-weight: 300;
    line-height: 1.4;
    margin: 0 0 1rem 0;
  }

  &__certificate-main {
    width: 48px;
    height: 48px;
    margin: 0 auto 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__certificate-main-image {
    width: 48px;
    height: 48px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba($neutral-900, 0.1);
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
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
  background: #dae6df;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem 4rem;
    max-width: 1000px;
    margin: 0 auto;

    @media (max-width: 768px) {
      gap: 2rem 3rem;
    }

    @media (max-width: 480px) {
      gap: 2rem 1rem;
      flex-direction: column;
      align-items: center;
    }
  }

  &__card {
    text-align: center;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
    flex: 0 0 auto;
    min-width: 180px;
    max-width: 220px;

    &:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      min-width: 160px;
      max-width: 200px;
    }
  }

  &--visible &__card {
    opacity: 1;
    transform: translateY(0);
  }

  &__icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    color: $neutral-700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;

    i {
      font-size: 1.75rem;
    }

    .brand-attributes__card:hover & {
      color: $accent-600;
    }
  }

  &__title-card {
    font-size: 0.9rem;
    font-weight: 500;
    color: $neutral-900;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    letter-spacing: -0.01em;
  }

  &__description {
    font-size: 0.8rem;
    color: grey;
    font-weight: 300;
    line-height: 1.4;
    margin: 0;
    opacity: 0.9;
  }

  &__certificate-main {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__certificate-main-image {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 6px;
    filter: grayscale(0.2);
    transition: filter 0.3s ease;

    .brand-attributes__card:hover & {
      filter: grayscale(0);
    }
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
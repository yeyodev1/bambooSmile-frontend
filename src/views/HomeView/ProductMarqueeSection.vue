<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { higieneBucal } from '@/data/higiene-bucal'

interface MarqueeItem {
  type: 'text' | 'product'
  content?: string
  name?: string
  image?: string
}

const isVisible = ref(false)

// Seleccionar productos destacados para el marquee
const featuredProducts = [
  {
    name: 'PASTA DENTAL FRESH',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755267043/pasta-125_bu89sh.jpg'
  },
  {
    name: 'PASTA DENTAL SANGRE DE DRAGO',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755201596/pasta-drago_2_t4cigy.png'
  },
  {
    name: 'PASTA DENTAL KIDS',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755267281/pasta-nino_fgvhie.jpg'
  },
  {
    name: 'ENJUAGUE BUCAL NATURAL',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755200830/enjuague_sa6nwy.png'
  },
  {
    name: 'HILO DENTAL BAMBÚ',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755200947/hilo-dental_cfzw9b.jpg'
  },
  {
    name: 'CEPILLO BAMBÚ ADULTO',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755200947/cepillo-adulto_abc123.jpg'
  },
  {
    name: 'CEPILLO BAMBÚ NIÑOS',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755200947/cepillo-ninos_def456.jpg'
  },
  {
    name: 'PASTA DENTAL CARBÓN ACTIVADO',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755267043/pasta-carbon_ghi789.jpg'
  },
  {
    name: 'KIT FAMILIAR COMPLETO',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755267043/kit-familiar_jkl012.jpg'
  },
  {
    name: 'BLANQUEADOR NATURAL',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755267043/blanqueador_mno345.jpg'
  },
  {
    name: 'PASTA DENTAL SENSITIVE',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755267043/pasta-sensitive_pqr678.jpg'
  },
  {
    name: 'ENJUAGUE KIDS FRUTAL',
    image: 'https://res.cloudinary.com/dpimsaaa4/image/upload/v1755200830/enjuague-kids_stu901.png'
  }
]

// Crear contenido del marquee con repetición
const createMarqueeContent = (): MarqueeItem[] => {
  const content: MarqueeItem[] = []
  const promotionalTexts = ['NEW', 'NATURAL', 'ECO', 'BAMBÚ', 'FRESH', 'ORGANIC', 'PREMIUM', 'HEALTHY']

  featuredProducts.forEach((product, index) => {
    // Agregar textos promocionales variados
    const randomText1 = promotionalTexts[index % promotionalTexts.length]
    const randomText2 = promotionalTexts[(index + 1) % promotionalTexts.length]
    const randomText3 = promotionalTexts[(index + 2) % promotionalTexts.length]

    content.push({ type: 'text', content: randomText1 })
    content.push({ type: 'text', content: '·' })
    content.push({ type: 'text', content: randomText2 })
    content.push({ type: 'text', content: '·' })
    content.push({ type: 'text', content: randomText3 })
    content.push({ type: 'text', content: '·' })
    content.push({ type: 'text', content: '100% NATURAL' })
    content.push({ type: 'text', content: '·' })

    // Agregar producto
    content.push({ type: 'product', ...product })

    content.push({ type: 'text', content: '·' })
    content.push({ type: 'text', content: 'SOSTENIBLE' })
    content.push({ type: 'text', content: '·' })
    content.push({ type: 'text', content: 'BIODEGRADABLE' })
    content.push({ type: 'text', content: '·' })
  })

  return content
}

const marqueeContent = createMarqueeContent()

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )

  const element = document.querySelector('.marquee-section')
  if (element) {
    observer.observe(element)
  }
})
</script>

<template>
  <section class="marquee-section" :class="{ 'marquee-section--visible': isVisible }">
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- Primer conjunto de contenido -->
        <div class="marquee-content">
          <template v-for="(item, index) in marqueeContent" :key="`first-${index}`">
            <span v-if="item.type === 'text'" class="marquee-text">{{ item.content }}</span>
            <div v-else-if="item.type === 'product'" class="marquee-product">
              <img 
                :src="item.image" 
                :alt="item.name"
                class="marquee-product-image"
              >
              <span class="marquee-product-name">{{ item.name }}</span>
            </div>
          </template>
        </div>
        
        <!-- Segundo conjunto de contenido (para loop infinito) -->
        <div class="marquee-content">
          <template v-for="(item, index) in marqueeContent" :key="`second-${index}`">
            <span v-if="item.type === 'text'" class="marquee-text">{{ item.content }}</span>
            <div v-else-if="item.type === 'product'" class="marquee-product">
              <img 
                :src="item.image" 
                :alt="item.name"
                class="marquee-product-image"
              >
              <span class="marquee-product-name">{{ item.name }}</span>
            </div>
          </template>
        </div>
        
        <!-- Tercer conjunto de contenido (para loop más suave) -->
        <div class="marquee-content">
          <template v-for="(item, index) in marqueeContent" :key="`third-${index}`">
            <span v-if="item.type === 'text'" class="marquee-text">{{ item.content }}</span>
            <div v-else-if="item.type === 'product'" class="marquee-product">
              <img 
                :src="item.image" 
                :alt="item.name"
                class="marquee-product-image"
              >
              <span class="marquee-product-name">{{ item.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.marquee-section {
  padding: 4rem 0;
  background: $neutral-100;
  overflow: hidden;
  position: relative;

  &__container {
    width: 100%;
  }
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: flex;
  animation: marqueeScroll 3s linear infinite;
  will-change: transform;
}

.marquee-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 3rem;
  padding-right: 3rem;
  min-width: 100vw;

  @media (max-width: 768px) {
    gap: 2rem;
    padding-right: 2rem;
  }
}

.marquee-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: $neutral-700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
  }
}

.marquee-product {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }
}

.marquee-product-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  background: $neutral-50;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba($neutral-900, 0.1);

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
}

.marquee-product-name {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  color: $accent-600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
  }
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-33.333%);
  }
}

// Optimizaciones de rendimiento
.marquee-track {
  backface-visibility: hidden;
  perspective: 1000px;
}

// Animación continua sin pausa al hacer hover

// Animación de entrada
.marquee-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
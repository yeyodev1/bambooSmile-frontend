<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

// Mensajes sobre productos sostenibles e higiene bucal
const sustainableMessages = [
  'LA MEJOR HIGIENE BUCAL',
  'PRODUCTOS SOSTENIBLES',
  'CUIDADO NATURAL',
  'BAMBÚ ECOLÓGICO',
  'INGREDIENTES NATURALES',
  'SALUD BUCAL CONSCIENTE',
  'SOSTENIBILIDAD',
  'CERO PLÁSTICO',
  'BIODEGRADABLE',
  'ECO-FRIENDLY'
]

// Crear contenido del marquee con separadores
const createMarqueeContent = (): string[] => {
  const content: string[] = []

  sustainableMessages.forEach((message, index) => {
    content.push(message)
    if (index < sustainableMessages.length - 1) {
      content.push('·')
    }
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

  const element = document.querySelector('.sustainable-marquee')
  if (element) {
    observer.observe(element)
  }
})
</script>

<template>
  <section class="sustainable-marquee" :class="{ 'sustainable-marquee--visible': isVisible }">
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- Primer conjunto de contenido -->
        <div class="marquee-content">
          <span 
            v-for="(message, index) in marqueeContent" 
            :key="`first-${index}`"
            class="marquee-text"
            :class="{ 'marquee-separator': message === '·' }"
          >
            {{ message }}
          </span>
        </div>
        
        <!-- Segundo conjunto de contenido (duplicado para loop infinito) -->
        <div class="marquee-content">
          <span 
            v-for="(message, index) in marqueeContent" 
            :key="`second-${index}`"
            class="marquee-text"
            :class="{ 'marquee-separator': message === '·' }"
          >
            {{ message }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sustainable-marquee {
  padding: 3rem 0;
  background: linear-gradient(135deg, $BAMBOO-GREEN 0%, lighten($BAMBOO-GREEN, 10%) 100%);
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: flex;
  animation: sustainableScroll 15s linear infinite;
  will-change: transform;
}

.marquee-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 4rem;
  padding-right: 4rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 2.5rem;
    padding-right: 2.5rem;
  }
}

.marquee-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.marquee-separator {
    font-weight: 400;
    font-size: clamp(2rem, 5vw, 3.5rem);
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 5vw, 3rem);

    &.marquee-separator {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
    }
  }
}

@keyframes sustainableScroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

// Optimizaciones de rendimiento
.marquee-track {
  backface-visibility: hidden;
  perspective: 1000px;
}

// Animación de entrada
.sustainable-marquee {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Efecto de brillo sutil
.marquee-text:not(.marquee-separator) {
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0.8) 100%);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {

  0%,
  100% {
    background-position: 200% 0;
  }

  50% {
    background-position: -200% 0;
  }
}
</style>
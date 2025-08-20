<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Intersection Observer para animaciones
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Función para contactar por WhatsApp
const contactWhatsApp = () => {
  const message = encodeURIComponent('Hola, me interesa conocer más sobre los cepillos de bambú bambooSmile y cómo puedo contribuir a evitar más cepillos plásticos. ¿Pueden ayudarme?')
  window.open(`https://wa.me/593960800024?text=${message}`, '_blank')
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
    { threshold: 0.3 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section 
    ref="sectionRef" 
    class="environmental-impact"
    :class="{ 'environmental-impact--visible': isVisible }"
  >
    <div class="environmental-impact__container">
      <!-- Número principal -->
      <div class="environmental-impact__number">
        15,000+
      </div>
      
      <!-- Texto descriptivo -->
      <div class="environmental-impact__content">
        <h2 class="environmental-impact__title">
          cepillos plásticos evitados gracias a nuestros productos sostenibles.
        </h2>
        
        <p class="environmental-impact__description">
          En bambooSmile, creemos en una solución mejor, más sostenible y amigable con el medio ambiente. Nuestros 
          cepillos de bambú no solo ofrecen una limpieza efectiva y un diseño moderno, sino que también son 
          completamente biodegradables. Cada cepillo que eliges ayuda a reducir los desechos plásticos y 
          microplásticos en el medio ambiente, contribuyendo a un futuro más limpio para todos.
        </p>
        
        <!-- Botón de acción -->
        <button 
          @click="contactWhatsApp"
          class="environmental-impact__button"
        >
          conoce cómo puedes hacer la diferencia
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/colorVariables.module.scss';

.environmental-impact {
  background: #dae6df;
  padding: 120px 0;
  position: relative;
  overflow: hidden;

  // Animación de entrada
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &__container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 60px;

    @media (max-width: 768px) {
      padding: 0 1.5rem;
      gap: 40px;
    }
  }

  &__number {
    font-size: clamp(4rem, 12vw, 8rem);
    font-weight: 800;
    color: grey;
    line-height: 0.9;
    letter-spacing: -0.02em;
    text-align: center;

    @media (max-width: 1024px) {
      font-size: clamp(3rem, 10vw, 6rem);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    text-align: center;
  }

  &__title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 600;
    color: $neutral-800;
    line-height: 1.2;
    margin: 0;
  }

  &__description {
    font-size: 1.125rem;
    color: $neutral-700;
    line-height: 1.6;
    margin: 0;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  &__button {
    background: transparent;
    border: 2px solid $neutral-600;
    color: $neutral-800;
    padding: 16px 32px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: lowercase;
    letter-spacing: 0.5px;
    align-self: center;

    &:hover {
      background: $neutral-600;
      color: $white;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba($neutral-600, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .environmental-impact {
    padding: 80px 0;

    &__container {
      padding: 0 1rem;
      gap: 32px;
    }

    &__button {
      width: 100%;
      padding: 18px 24px;
    }
  }
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="hero" :class="{ 'hero--visible': isVisible }">
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__text">
          <h1 class="hero__title">
            <span class="hero__title-highlight">bambooSmile</span>
            <br>
            La revolución natural
            <br>
            para tu sonrisa
          </h1>
          <p class="hero__subtitle">
            Descubre el poder del bambú en el cuidado dental. 
            Nuestras pastas dentales 100% naturales cuidan tu sonrisa 
            mientras protegen el planeta.
          </p>
          <div class="hero__features">
            <div class="hero__feature">
              <span class="hero__feature-icon">🌱</span>
              <span class="hero__feature-text">100% Natural</span>
            </div>
            <div class="hero__feature">
              <span class="hero__feature-icon">🦷</span>
              <span class="hero__feature-text">Cuidado Completo</span>
            </div>
            <div class="hero__feature">
              <span class="hero__feature-icon">🌍</span>
              <span class="hero__feature-text">Eco-Friendly</span>
            </div>
          </div>
          <div class="hero__actions">
            <a 
              href="https://wa.me/573001234567?text=Hola,%20quiero%20conocer%20más%20sobre%20bambooSmile" 
              target="_blank" 
              class="hero__cta-primary"
            >
              Descubre bambooSmile
            </a>
            <button class="hero__cta-secondary" @click="$emit('scrollToProducts')">
              Ver Productos
            </button>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__image-container">
            <img 
              src="@/assets/logos/bamboo-green.png" 
              alt="bambooSmile - Cuidado dental natural" 
              class="hero__logo"
            >
            <div class="hero__decorative-elements">
              <div class="hero__leaf hero__leaf--1"></div>
              <div class="hero__leaf hero__leaf--2"></div>
              <div class="hero__leaf hero__leaf--3"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__scroll-indicator">
        <span class="hero__scroll-text">Desliza para descubrir</span>
        <div class="hero__scroll-arrow"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use 'sass:string';
@import '@/styles/colorVariables.module.scss';

.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, $white 0%, color.adjust($BAMBOO-GREEN, $lightness: 45%) 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="bamboo" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23#{string.slice(#{$BAMBOO-GREEN}, 2)}" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23bamboo)"/></svg>') repeat;
    z-index: 1;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
    width: 100%;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    min-height: 80vh;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
      min-height: auto;
    }
  }

  &__text {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.8s ease;
  }

  &--visible &__text {
    opacity: 1;
    transform: translateX(0);
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
    color: $BAMBOO-BLACK;

    &-highlight {
      color: $BAMBOO-GREEN;
      display: block;
      font-size: clamp(3rem, 6vw, 5rem);
      margin-bottom: 0.5rem;
    }
  }

  &__subtitle {
    font-size: 1.25rem;
    line-height: 1.6;
    color: color.adjust($BAMBOO-BLACK, $lightness: 20%);
    margin: 0 0 2rem 0;
    max-width: 500px;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      max-width: none;
    }
  }

  &__features {
    display: flex;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      justify-content: center;
      gap: 1.5rem;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba($white, 0.8);
    border-radius: 25px;
    box-shadow: 0 4px 15px rgba($BAMBOO-GREEN, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($BAMBOO-GREEN, 0.2);
    }

    &-icon {
      font-size: 1.5rem;
    }

    &-text {
      font-weight: 600;
      color: $BAMBOO-BLACK;
      font-size: 0.9rem;
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 768px) {
      justify-content: center;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }
  }

  &__cta-primary {
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    color: $white;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba($BAMBOO-GREEN, 0.3);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($BAMBOO-GREEN, 0.4);
      background: linear-gradient(135deg, color.adjust($BAMBOO-GREEN, $lightness: -5%) 0%, color.adjust($BAMBOO-GREEN, $lightness: -15%) 100%);
    }

    @media (max-width: 480px) {
      width: 100%;
      justify-content: center;
    }
  }

  &__cta-secondary {
    background: transparent;
    color: $BAMBOO-GREEN;
    border: 2px solid $BAMBOO-GREEN;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $BAMBOO-GREEN;
      color: $white;
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.8s ease 0.2s;

    @media (max-width: 768px) {
      order: -1;
    }
  }

  &--visible &__visual {
    opacity: 1;
    transform: translateX(0);
  }

  &__image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__logo {
    width: clamp(200px, 30vw, 400px);
    height: auto;
    filter: drop-shadow(0 10px 30px rgba($BAMBOO-GREEN, 0.2));
    animation: float 6s ease-in-out infinite;
  }

  &__decorative-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  &__leaf {
    position: absolute;
    width: 30px;
    height: 30px;
    background: $BAMBOO-GREEN;
    border-radius: 0 100% 0 100%;
    opacity: 0.6;
    animation: leafFloat 8s ease-in-out infinite;

    &--1 {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    &--2 {
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }

    &--3 {
      bottom: 30%;
      left: 20%;
      animation-delay: 4s;
    }
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.7;
    animation: bounce 2s infinite;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__scroll-text {
    font-size: 0.9rem;
    color: $BAMBOO-BLACK;
    font-weight: 500;
  }

  &__scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid $BAMBOO-GREEN;
    border-bottom: 2px solid $BAMBOO-GREEN;
    transform: rotate(45deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes leafFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(5deg);
  }
  66% {
    transform: translateY(-5px) rotate(-3deg);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>
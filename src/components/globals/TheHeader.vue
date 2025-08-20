<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const contactWhatsApp = () => {
  window.open('https://wa.me/593960800024?text=Hola, me interesa conocer más sobre sus productos sostenibles de bambú', '_blank')
  closeMenu()
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (sectionId: string) => {
  // Si no estamos en la página home, navegar primero
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      // Esperar un poco para que la página se cargue completamente
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    })
  } else {
    // Si ya estamos en home, hacer scroll directamente
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const goToCart = () => {
  router.push('/carrito')
  closeMenu()
}

const goToProducts = () => {
  router.push('/productos')
  closeMenu()
}

const goToAboutUs = () => {
  router.push('/sobre-nosotros')
  closeMenu()
}
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <nav class="nav">
      <div class="nav__container">
        <!-- Mobile Menu Button (Left side) -->
        <button 
          class="nav__toggle"
          :class="{ 'nav__toggle--active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <span class="nav__toggle-line"></span>
          <span class="nav__toggle-line"></span>
          <span class="nav__toggle-line"></span>
        </button>

        <!-- Logo -->
        <RouterLink to="/" class="nav__logo" @click="closeMenu">
          <img 
            src="@/assets/logos/bamboo-green.png" 
            alt="bambooSmile" 
            class="nav__logo-img"
          />
        </RouterLink>

        <!-- Desktop Navigation Menu -->
        <div class="nav__menu">
          <button class="nav__link" @click="goToProducts">Productos</button>
          <button class="nav__link" @click="goToAboutUs">Nosotros</button>
          <button class="nav__link" @click="scrollToSection('testimonios'); closeMenu()">Testimonios</button>
        </div>

        <!-- Desktop Actions (Right side) -->
        <div class="nav__actions">
          <!-- Cart Button -->
          <button @click="goToCart" class="nav__cart-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-if="cartStore.itemCount > 0" class="nav__cart-badge">{{ cartStore.itemCount }}</span>
          </button>

          <!-- Contact Button -->
          <button @click="contactWhatsApp" class="nav__contact-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="currentColor"/>
            </svg>
            Contactar
          </button>
        </div>
      </div>

      <!-- Mobile Menu Sidebar -->
      <div class="nav__mobile" :class="{ 'nav__mobile--open': isMenuOpen }" @click.self="closeMenu">
        <div class="nav__mobile-content">
          <!-- Sidebar Header -->
          <div class="nav__mobile-header">
            <h3>Menú</h3>
          </div>
          
          <!-- Close Button -->
          <button class="nav__mobile-close" @click="closeMenu" aria-label="Cerrar menú">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <!-- Navigation Links -->
          <nav class="nav__mobile-nav">
            <button class="nav__mobile-link" @click="goToProducts">Productos</button>
            <button class="nav__mobile-link" @click="goToAboutUs">Nosotros</button>
            <button class="nav__mobile-link" @click="scrollToSection('testimonios'); closeMenu()">Testimonios</button>
            
            <!-- WhatsApp Contact Button -->
            <button class="nav__mobile-link nav__mobile-link--contact" @click="contactWhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="currentColor"/>
              </svg>
              Contactar por WhatsApp
            </button>
          </nav>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem 0;

  &--scrolled {
    padding: 0.75rem 0;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.nav {
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;

    @media (max-width: 768px) {
      padding: 0 1rem;
      height: 70px;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.2s ease;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    @media (min-width: 1024px) {
      position: static;
      transform: none;
      margin-right: auto;
    }

    &:hover {
      transform: translateX(-50%) scale(1.05);

      @media (min-width: 1024px) {
        transform: scale(1.05);
      }
    }

    &-img {
      height: 48px;
      width: auto;

      @media (max-width: 768px) {
        height: 40px;
      }
    }
  }

  &__menu {
    display: none;
    align-items: center;
    gap: 2rem;

    @media (min-width: 1024px) {
      display: flex;
    }
  }

  &__link {
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    position: relative;
    transition: all 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;

    &:hover {
      color: #059669;
      background: rgba(16, 185, 129, 0.1);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;

    @media (max-width: 1023px) {
      .nav__contact-button {
        display: none;
      }
    }
  }

  &__contact-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: white;
    border: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(5, 150, 105, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(5, 150, 105, 0.3);
      background: linear-gradient(135deg, #10b981 0%, #065f46 100%);
    }

    svg {
      flex-shrink: 0;
    }
  }

  &__cart-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 2px solid #059669;
    color: #059669;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #059669;
      color: white;
      transform: scale(1.05);
    }
  }

  &__cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #059669;
    color: #f9fafb;
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.2s ease;
    border-radius: 8px;

    @media (min-width: 1024px) {
      display: none;
    }

    &:hover {
      background: rgba(229, 231, 235, 0.5);
      transform: scale(1.05);
    }

    &-line {
      width: 24px;
      height: 3px;
      background: #374151;
      margin: 3px 0;
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    &--active {
      .nav__toggle-line {
        &:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }
      }
    }
  }

  &__mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;

    &--open {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    }

    &-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 320px;
      height: 100vh;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      padding: 2rem 0;
      display: flex;
      flex-direction: column;
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      transform: translateX(-100%);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      @media (max-width: 375px) {
        width: 280px;
      }
    }

    &--open &-content {
      transform: translateX(0);
    }

    &-header {
      padding: 2rem 2rem 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;

      h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
      }
    }

    &-close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 40px;
      height: 40px;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }

      svg {
        width: 24px;
        height: 24px;
        color: #6b7280;
      }
    }

    &-nav {
      flex: 1;
      padding: 0 1rem;
    }

    &-link {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 1rem 1.5rem;
      background: none;
      border: none;
      color: #374151;
      font-size: 1rem;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 12px;
      margin: 0.25rem 0;
      position: relative;

      &:hover {
        background: rgba(16, 185, 129, 0.1);
        color: #059669;
        transform: translateX(8px);
      }

      &:active {
        transform: translateX(4px) scale(0.98);
      }

      &--contact {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        color: white;
        margin: 0;
        border-radius: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(5, 150, 105, 0.25);

        &:hover {
          background: linear-gradient(135deg, #10b981 0%, #065f46 100%);
          color: white;
          transform: translateX(0) translateY(-2px);
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.35);
        }

        &:active {
          transform: translateX(0) translateY(0) scale(0.98);
        }

        svg {
          flex-shrink: 0;
        }
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
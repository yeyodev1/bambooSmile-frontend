<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const contactWhatsApp = () => {
  window.open('https://wa.me/593960800024', '_blank')
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
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
</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="nav__container">
        <!-- Logo -->
        <RouterLink to="/" class="nav__logo" @click="closeMenu">
          <img 
            src="@/assets/logos/bamboo-green.png" 
            alt="bambooSmile" 
            class="nav__logo-img"
          />
        </RouterLink>

        <!-- Navigation Menu -->
        <div class="nav__menu">
          <button class="nav__link" @click="goToProducts">Productos</button>
          <button class="nav__link" @click="scrollToSection('testimonios'); closeMenu()">Testimonios</button>
          <button class="nav__link" @click="scrollToSection('certificaciones'); closeMenu()">Certificaciones</button>
        </div>

        <!-- Cart Button -->
        <div class="nav__cart">
          <button @click="goToCart" class="nav__cart-button">
            <div class="nav__cart-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span v-if="cartStore.itemCount > 0" class="nav__cart-badge">{{ cartStore.itemCount }}</span>
            </div>
          </button>
        </div>

        <!-- Contact Button -->
        <div class="nav__contact">
          <button @click="contactWhatsApp" class="nav__contact-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="currentColor"/>
            </svg>
            Contactar
          </button>
        </div>

        <!-- Mobile Menu Button -->
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
      </div>

      <!-- Mobile Navigation -->
      <div class="nav__mobile" :class="{ 'nav__mobile--open': isMenuOpen }">
        <div class="nav__mobile-menu">
          <!-- Mobile Menu Links -->
          <div class="nav__mobile-links">
            <button class="nav__mobile-link" @click="goToProducts">Productos</button>
            <button class="nav__mobile-link" @click="goToCart">
              Carrito
              <span v-if="cartStore.itemCount > 0" class="nav__mobile-cart-badge">({{ cartStore.itemCount }})</span>
            </button>
            <button class="nav__mobile-link" @click="scrollToSection('testimonios'); closeMenu()">Testimonios</button>
            <button class="nav__mobile-link" @click="scrollToSection('certificaciones'); closeMenu()">Certificaciones</button>
          </div>
          
          <!-- Mobile Contact -->
          <div class="nav__mobile-contact">
            <button @click="contactWhatsApp" class="nav__mobile-contact-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="currentColor"/>
              </svg>
              Contactar por WhatsApp
            </button>
          </div>
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
  background: rgba($white, 0.98);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba($BAMBOO-GREEN, 0.1);
  box-shadow: 0 2px 20px rgba($BAMBOO-GREEN, 0.08);
  transition: all 0.3s ease;
}

.nav {
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &-img {
      height: 36px;
      width: auto;

      @media (min-width: 768px) {
        height: 44px;
      }
    }
  }

  &__menu {
    display: none;
    align-items: center;
    gap: 2.5rem;

    @media (min-width: 768px) {
      display: flex;
    }
  }

  &__cart {
    display: none;
    align-items: center;
    margin-right: 1rem;

    @media (min-width: 768px) {
      display: flex;
    }

    &-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: 2px solid $BAMBOO-GREEN;
      color: $BAMBOO-GREEN;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: $BAMBOO-GREEN;
        color: white;
        transform: scale(1.05);
      }
    }

    &-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ef4444;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse 2s infinite;
    }
  }

  &__contact {
    display: none;
    align-items: center;

    @media (min-width: 768px) {
      display: flex;
    }

    &-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
      color: white;
      border: none;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba($BAMBOO-GREEN, 0.2);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba($BAMBOO-GREEN, 0.3);
        background: linear-gradient(135deg, color.adjust($BAMBOO-GREEN, $lightness: -5%) 0%, color.adjust($BAMBOO-GREEN, $lightness: -15%) 100%);
      }

      svg {
        flex-shrink: 0;
      }
    }
  }

  &__user-menu {
    position: relative;
  }

  &__user-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    color: $BAMBOO-BLACK;

    &:hover {
      background: rgba($BAMBOO-GREEN, 0.1);
    }

    &--active {
      background: rgba($BAMBOO-GREEN, 0.1);
    }
  }

  &__user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
  }

  &__user-name {
    font-weight: 500;
    font-size: 0.95rem;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__user-chevron {
    transition: transform 0.2s ease;
    color: $BAMBOO-BLACK;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    padding: 1rem;
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
    z-index: 1000;
    border: 1px solid rgba($BAMBOO-GREEN, 0.1);

    &--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  &__user-info {
    margin-bottom: 0.75rem;
  }

  &__user-email {
    font-size: 0.875rem;
    color: $BAMBOO-BLACK;
    margin: 0 0 0.25rem 0;
    font-weight: 500;
  }

  &__user-status {
    font-size: 0.75rem;
    color: #f59e0b;
    background: rgba(#f59e0b, 0.1);
    padding: 0.125rem 0.5rem;
    border-radius: 12px;
    font-weight: 500;
  }

  &__user-divider {
    border: none;
    height: 1px;
    background: rgba($BAMBOO-GREEN, 0.1);
    margin: 0.75rem 0;
  }

  &__user-logout {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    background: none;
    border: none;
    color: #dc2626;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(#dc2626, 0.1);
    }
  }

  &__link {
    color: $BAMBOO-BLACK;
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
      color: $BAMBOO-GREEN;
      background: rgba($BAMBOO-GREEN, 0.1);
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.2s ease;

    @media (min-width: 768px) {
      display: none;
    }

    &:hover {
      transform: scale(1.1);
    }

    &-line {
      width: 20px;
      height: 2px;
      background: $BAMBOO-BLACK;
      margin: 2px 0;
      transition: all 0.3s ease;
      border-radius: 1px;
    }

    &--active {
      .nav__toggle-line {
        &:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      }
    }
  }

  &__mobile {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: $white;
    border-bottom: 1px solid rgba($BAMBOO-GREEN, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba($BAMBOO-GREEN, 0.15);

    @media (min-width: 768px) {
      display: none;
    }

    &--open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    &-menu {
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    &-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    &-link {
      color: $BAMBOO-BLACK;
      text-decoration: none;
      font-weight: 500;
      font-size: 1.1rem;
      padding: 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      border-bottom: 1px solid rgba($BAMBOO-GREEN, 0.1);
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
      cursor: pointer;
      font-family: inherit;
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        background: rgba($BAMBOO-GREEN, 0.1);
        color: $BAMBOO-GREEN;
        padding-left: 1.5rem;
      }
    }

    &-cart-badge {
      background: #ef4444;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      margin-left: 0.5rem;
    }

    &-contact {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba($BAMBOO-GREEN, 0.1);

      &-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        background: linear-gradient(135deg, $BAMBOO-GREEN 0%, color.adjust($BAMBOO-GREEN, $lightness: -10%) 100%);
        color: white;
        border: none;
        font-weight: 600;
        font-size: 1.1rem;
        padding: 1rem 2rem;
        border-radius: 25px;
        cursor: pointer;
        width: 100%;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba($BAMBOO-GREEN, 0.2);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba($BAMBOO-GREEN, 0.3);
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
<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bamboosmile_ec/',
    icon: 'instagram'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/BambooSmile.ec',
    icon: 'facebook-f'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@bamboosmile_ec',
    icon: 'tiktok'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/593960800024',
    icon: 'whatsapp'
  }
]

const contactInfo = {
  email: 'team.bamboosmile@gmail.com',
  phone: '+593 96 080 0024',
  address: 'Quito, Ecuador'
}
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Main Footer Content -->
      <div class="footer__content">
        <!-- Brand Section -->
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo">
            <img 
              src="@/assets/logos/bamboo-light.png" 
              alt="bambooSmile" 
              class="footer__logo-img"
            />
          </RouterLink>
          <p class="footer__description">
            Cuidado dental natural y sostenible para una sonrisa saludable y un planeta mejor.
          </p>
        </div>

        <!-- Contact Info -->
        <div class="footer__contact">
          <h4 class="footer__contact-title">Contacto</h4>
          <div class="footer__contact-info">
            <a 
              :href="`mailto:${contactInfo.email}`" 
              class="footer__contact-item"
            >
              <i class="fas fa-envelope"></i>
              {{ contactInfo.email }}
            </a>
            <a 
              :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`" 
              class="footer__contact-item"
            >
              <i class="fas fa-phone"></i>
              {{ contactInfo.phone }}
            </a>
            <div class="footer__contact-item">
              <i class="fas fa-map-marker-alt"></i>
              {{ contactInfo.address }}
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="footer__social">
          <h4 class="footer__social-title">Síguenos</h4>
          <div class="footer__social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="`fab fa-${social.icon}`" class="footer__social-icon"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer__bottom">
        <div class="footer__bottom-content">
          <p class="footer__copyright">
            © {{ currentYear }} bambooSmile. Todos los derechos reservados.
          </p>
          <div class="footer__bottom-links">
            <a href="https://mkt.bamboosmile.org/politicas-y-condiciones" target="_blank" class="footer__policies-link">
              Términos y Condiciones
            </a>
            <a href="https://mkt.bamboosmile.org/politicas-y-condiciones" target="_blank" class="footer__policies-link">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/styles/colorVariables.module.scss';

.footer {
  background: $BAMBOO-BLACK;
  color: $white;
  margin-top: auto;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  &__content {
    padding: 3rem 0 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;

    @media (min-width: 768px) {
      grid-template-columns: 2fr 1fr 1fr;
      text-align: left;
      gap: 3rem;
      padding: 4rem 0 2.5rem;
    }

  }

  &__brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (min-width: 768px) {
      align-items: flex-start;
    }
  }

  &__logo {
    display: inline-block;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &-img {
      height: 36px;
      width: auto;

      @media (min-width: 768px) {
        height: 42px;
      }
    }
  }

  &__description {
    color: rgba($white, 0.85);
    line-height: 1.6;
    font-size: 0.95rem;
    margin: 0;
    max-width: 300px;

    @media (min-width: 768px) {
      max-width: 350px;
      font-size: 1rem;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (min-width: 768px) {
      align-items: flex-start;
    }

    &-title {
      color: $BAMBOO-GREEN;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      margin-bottom: 0.5rem;
    }

    &-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    &-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba($white, 0.8);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;

      &:hover {
        color: $BAMBOO-GREEN;
      }

      i {
        width: 16px;
        color: $BAMBOO-GREEN;
        flex-shrink: 0;
      }
    }
  }

  &__social {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (min-width: 768px) {
      align-items: flex-start;
    }

    &-title {
      color: $BAMBOO-GREEN;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
    }

    &-links {
      display: flex;
      gap: 1rem;
      justify-content: center;

      @media (min-width: 768px) {
        justify-content: flex-start;
      }
    }

    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: rgba($BAMBOO-GREEN, 0.1);
      border: 1px solid rgba($BAMBOO-GREEN, 0.2);
      border-radius: 50%;
      color: $white;
      text-decoration: none;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      @media (min-width: 768px) {
        width: 48px;
        height: 48px;
      }

      &:hover {
        background: $BAMBOO-GREEN;
        border-color: $BAMBOO-GREEN;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba($BAMBOO-GREEN, 0.4);
      }
    }

    &-icon {
      font-size: 1.2rem;

      @media (min-width: 768px) {
        font-size: 1.3rem;
      }
    }
  }

  &__bottom {
    border-top: 1px solid rgba($white, 0.1);
    padding: 1.5rem 0;

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
        gap: 1rem;
      }
    }

    &-links {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;

      @media (min-width: 768px) {
        justify-content: flex-end;
      }
    }
  }

  &__copyright {
    color: rgba($white, 0.7);
    font-size: 0.85rem;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 0.9rem;
    }
  }

  &__policies-link {
    color: rgba($white, 0.8);
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    border-bottom: 1px solid transparent;
    padding: 0.25rem 0;

    @media (min-width: 768px) {
      font-size: 0.9rem;
    }

    &:hover {
      color: $BAMBOO-GREEN;
      border-bottom-color: $BAMBOO-GREEN;
    }
  }
}

// Font Awesome icons are used directly with fab fa-* classes</style>
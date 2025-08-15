<script setup lang="ts">
const contactInfo = {
  email: 'team.bamboosmile@gmail.com',
  phone: '+593 96 080 0024'
}

const sendEmail = () => {
  const subject = 'Interés en trabajar con bambooSmile'
  const body = 'Hola equipo de bambooSmile,\n\nEstoy interesado/a en formar parte de su equipo. Me gustaría conocer más sobre las oportunidades laborales disponibles.\n\nSaludos cordiales.'
  const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.open(mailtoUrl, '_blank')
}

const sendWhatsApp = () => {
  const message = 'Hola, estoy interesado/a en trabajar con bambooSmile. ¿Podrían proporcionarme información sobre las oportunidades laborales disponibles?'
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/593960800024?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}
</script>

<template>
  <div class="work-with-us">
    <!-- Hero Section -->
    <section class="work-with-us__hero">
      <div class="work-with-us__hero-container">
        <div class="work-with-us__hero-content">
          <h1 class="work-with-us__hero-title">
            <i class="fas fa-users"></i>
            Trabaja con nosotros
          </h1>
          <p class="work-with-us__hero-subtitle">
            Únete a nuestro equipo y forma parte del cambio hacia un cuidado dental más natural y sostenible
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="work-with-us__content">
      <div class="work-with-us__container">
        <!-- Why Work With Us -->
        <div class="work-with-us__section">
          <h2 class="work-with-us__section-title">
            <i class="fas fa-heart"></i>
            ¿Por qué trabajar con bambooSmile?
          </h2>
          <div class="work-with-us__benefits">
            <div class="work-with-us__benefit">
              <div class="work-with-us__benefit-icon">
                <i class="fas fa-leaf"></i>
              </div>
              <h3 class="work-with-us__benefit-title">Misión con propósito</h3>
              <p class="work-with-us__benefit-description">
                Contribuye a un mundo más sostenible mientras ayudas a las personas a cuidar su salud dental de forma natural.
              </p>
            </div>
            <div class="work-with-us__benefit">
              <div class="work-with-us__benefit-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3 class="work-with-us__benefit-title">Crecimiento profesional</h3>
              <p class="work-with-us__benefit-description">
                Forma parte de una empresa en crecimiento con oportunidades de desarrollo y aprendizaje continuo.
              </p>
            </div>
            <div class="work-with-us__benefit">
              <div class="work-with-us__benefit-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3 class="work-with-us__benefit-title">Equipo colaborativo</h3>
              <p class="work-with-us__benefit-description">
                Trabaja en un ambiente dinámico y colaborativo donde cada idea cuenta y se valora la innovación.
              </p>
            </div>
          </div>
        </div>

        <!-- Open Positions -->
        <div class="work-with-us__section">
          <h2 class="work-with-us__section-title">
            <i class="fas fa-briefcase"></i>
            Áreas de oportunidad
          </h2>
          <div class="work-with-us__positions">
            <div class="work-with-us__position">
              <h3 class="work-with-us__position-title">Marketing Digital</h3>
              <p class="work-with-us__position-description">
                Gestión de redes sociales, campañas publicitarias y estrategias de contenido para impulsar nuestra presencia digital.
              </p>
            </div>
            <div class="work-with-us__position">
              <h3 class="work-with-us__position-title">Ventas y Atención al Cliente</h3>
              <p class="work-with-us__position-description">
                Asesoramiento personalizado a clientes y desarrollo de estrategias comerciales para expandir nuestro alcance.
              </p>
            </div>
            <div class="work-with-us__position">
              <h3 class="work-with-us__position-title">Logística y Distribución</h3>
              <p class="work-with-us__position-description">
                Gestión de inventarios, coordinación de envíos y optimización de procesos de distribución.
              </p>
            </div>
            <div class="work-with-us__position">
              <h3 class="work-with-us__position-title">Desarrollo de Producto</h3>
              <p class="work-with-us__position-description">
                Investigación e innovación en productos naturales para el cuidado dental y sostenibilidad.
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="work-with-us__contact">
          <h2 class="work-with-us__contact-title">
            <i class="fas fa-envelope"></i>
            ¿Interesado en unirte?
          </h2>
          <p class="work-with-us__contact-description">
            Nos encantaría conocerte y saber cómo puedes contribuir a nuestra misión. Contáctanos y cuéntanos sobre ti.
          </p>
          <div class="work-with-us__contact-buttons">
            <button 
              @click="sendEmail"
              class="work-with-us__contact-button work-with-us__contact-button--email"
            >
              <i class="fas fa-envelope"></i>
              Enviar correo
            </button>
            <button 
              @click="sendWhatsApp"
              class="work-with-us__contact-button work-with-us__contact-button--whatsapp"
            >
              <i class="fab fa-whatsapp"></i>
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.work-with-us {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5f3 100%);

  &__hero {
    background: linear-gradient(135deg, $BAMBOO-GREEN 0%, darken($BAMBOO-GREEN, 10%) 100%);
    color: $white;
    padding: 6rem 0 4rem;
    text-align: center;

    &-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;

      @media (min-width: 768px) {
        padding: 0 2rem;
      }
    }

    &-content {
      max-width: 800px;
      margin: 0 auto;
    }

    &-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      @media (min-width: 768px) {
        font-size: 3.5rem;
      }

      i {
        font-size: 0.8em;
      }
    }

    &-subtitle {
      font-size: 1.2rem;
      line-height: 1.6;
      opacity: 0.95;
      margin: 0;

      @media (min-width: 768px) {
        font-size: 1.4rem;
      }
    }
  }

  &__content {
    padding: 4rem 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  &__section {
    margin-bottom: 4rem;

    &-title {
      font-size: 2rem;
      color: $BAMBOO-BLACK;
      text-align: center;
      margin-bottom: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;

      @media (min-width: 768px) {
        font-size: 2.5rem;
      }

      i {
        color: $BAMBOO-GREEN;
        font-size: 0.8em;
      }
    }
  }

  &__benefits {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }
  }

  &__benefit {
    background: $white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 20px rgba($BAMBOO-GREEN, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba($BAMBOO-GREEN, 0.1);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba($BAMBOO-GREEN, 0.2);
    }

    &-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, $BAMBOO-GREEN, lighten($BAMBOO-GREEN, 10%));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;

      i {
        font-size: 2rem;
        color: $white;
      }
    }

    &-title {
      font-size: 1.3rem;
      color: $BAMBOO-BLACK;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    &-description {
      color: rgba($BAMBOO-BLACK, 0.7);
      line-height: 1.6;
      margin: 0;
    }
  }

  &__positions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  &__position {
    background: $white;
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid $BAMBOO-GREEN;
    box-shadow: 0 2px 15px rgba($BAMBOO-GREEN, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 25px rgba($BAMBOO-GREEN, 0.15);
    }

    &-title {
      font-size: 1.2rem;
      color: $BAMBOO-GREEN;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    &-description {
      color: rgba($BAMBOO-BLACK, 0.7);
      line-height: 1.6;
      margin: 0;
    }
  }

  &__contact {
    background: linear-gradient(135deg, $white 0%, #f8fffe 100%);
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 6px 30px rgba($BAMBOO-GREEN, 0.1);
    border: 1px solid rgba($BAMBOO-GREEN, 0.1);

    &-title {
      font-size: 2rem;
      color: $BAMBOO-BLACK;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;

      i {
        color: $BAMBOO-GREEN;
      }
    }

    &-description {
      font-size: 1.1rem;
      color: rgba($BAMBOO-BLACK, 0.7);
      line-height: 1.6;
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    &-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
        gap: 1.5rem;
      }
    }

    &-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      border-radius: 30px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      border: 2px solid transparent;
      min-width: 200px;
      justify-content: center;

      &--email {
        background: $BAMBOO-GREEN;
        color: $white;
        border-color: $BAMBOO-GREEN;

        &:hover {
          background: transparent;
          color: $BAMBOO-GREEN;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba($BAMBOO-GREEN, 0.3);
        }
      }

      &--whatsapp {
        background: #25D366;
        color: $white;
        border-color: #25D366;

        &:hover {
          background: transparent;
          color: #25D366;
          border-color: #25D366;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(#25D366, 0.3);
        }
      }

      i {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
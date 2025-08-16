<script setup lang="ts">
// No reactive data needed for this static content page
</script>

<template>
  <div class="about-us">
    <!-- Hero Section -->
    <section class="about-us__hero">
      <div class="about-us__hero-container">
        <div class="about-us__hero-content">
          <h1 class="about-us__hero-title">
            <i class="fas fa-leaf"></i>
            Conoce más de nosotros
          </h1>
          <p class="about-us__hero-subtitle">
            Una historia de compromiso con el planeta y la sostenibilidad
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="about-us__content">
      <div class="about-us__container">
        <!-- Story Section -->
        <div class="about-us__story">
          <div class="about-us__story-content">
            <div class="about-us__story-text">
              <h2 class="about-us__section-title">
                <i class="fas fa-heart"></i>
                Nuestra Historia
              </h2>
              <div class="about-us__story-paragraphs">
                <p class="about-us__paragraph">
                  <strong>bambooSmile</strong> fue creado por <strong>Monika Nätscher</strong>, una alemana que, desde 2017, vive en Ecuador. Llegó de vacaciones y decidió quedarse debido al encanto de la naturaleza y las playas ecuatorianas.
                </p>
                <p class="about-us__paragraph">
                  Durante varios de sus viajes, Monika notó que al caminar por la arena, pisaba microplásticos, una consecuencia del uso masivo de plástico que daña nuestro planeta.
                </p>
                <p class="about-us__paragraph">
                  Conversando con los comuneros de estas playas, comprendió que esto se debe a dos factores principales:
                </p>
                <ul class="about-us__list">
                  <li class="about-us__list-item">
                    <i class="fas fa-exclamation-triangle"></i>
                    Falta de conocimiento sobre el impacto ambiental del uso de plásticos.
                  </li>
                  <li class="about-us__list-item">
                    <i class="fas fa-ban"></i>
                    Carencia de alternativas sustentables.
                  </li>
                </ul>
                <p class="about-us__paragraph about-us__paragraph--highlight">
                  En ese momento, Monika entendió que su misión era desarrollar alternativas sustentables, facilitar el cambio, concientizar a la sociedad y contribuir a un planeta más limpio y sano.
                </p>
              </div>
            </div>
            <div class="about-us__story-image">
              <div class="about-us__image-placeholder">
                <i class="fas fa-user-circle"></i>
                <span>Monika Nätscher</span>
                <small>Fundadora de bambooSmile</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Video Section -->
        <div class="about-us__video-section">
          <h2 class="about-us__section-title">
            <i class="fas fa-play-circle"></i>
            Esto es nuestra historia
          </h2>
          <div class="about-us__video-container">
            <iframe 
              class="about-us__video"
              src="https://www.youtube.com/embed/mWHT7JS-Hp8"
              title="Historia de bambooSmile"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Mission & Vision -->
        <div class="about-us__mission-vision">
          <div class="about-us__mission">
            <div class="about-us__card">
              <div class="about-us__card-header">
                <div class="about-us__card-icon">
                  <i class="fas fa-bullseye"></i>
                </div>
                <h3 class="about-us__card-title">Misión</h3>
              </div>
              <p class="about-us__card-content">
                bambooSmile crea alternativas sustentables y eco-amigables que permiten disfrutar de un estilo de vida sano y en armonía con la naturaleza, reduciendo la dependencia del plástico.
              </p>
            </div>
          </div>
          <div class="about-us__vision">
            <div class="about-us__card">
              <div class="about-us__card-header">
                <div class="about-us__card-icon">
                  <i class="fas fa-eye"></i>
                </div>
                <h3 class="about-us__card-title">Visión</h3>
              </div>
              <p class="about-us__card-content">
                Queremos ser una marca que transforme la industria convencional, respetando y contribuyendo al cuidado del planeta y de quienes lo habitan. Aplicamos un modelo de negocio de triple impacto: económico, ambiental y social.
              </p>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="about-us__values">
          <h2 class="about-us__section-title">
            <i class="fas fa-star"></i>
            Nuestros Valores
          </h2>
          <div class="about-us__values-grid">
            <div class="about-us__value">
              <div class="about-us__value-icon">
                <i class="fas fa-leaf"></i>
              </div>
              <h4 class="about-us__value-title">Sostenibilidad</h4>
              <p class="about-us__value-description">
                Comprometidos con el desarrollo de productos que respeten el medio ambiente.
              </p>
            </div>
            <div class="about-us__value">
              <div class="about-us__value-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h4 class="about-us__value-title">Bienestar</h4>
              <p class="about-us__value-description">
                Promovemos la salud y el bienestar a través de productos naturales.
              </p>
            </div>
            <div class="about-us__value">
              <div class="about-us__value-icon">
                <i class="fas fa-users"></i>
              </div>
              <h4 class="about-us__value-title">Comunidad</h4>
              <p class="about-us__value-description">
                Trabajamos junto a las comunidades para generar un impacto positivo.
              </p>
            </div>
            <div class="about-us__value">
              <div class="about-us__value-icon">
                <i class="fas fa-lightbulb"></i>
              </div>
              <h4 class="about-us__value-title">Innovación</h4>
              <p class="about-us__value-description">
                Buscamos constantemente nuevas formas de crear productos eco-amigables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about-us {
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

  &__section-title {
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

  &__story {
    margin-bottom: 5rem;

    &-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: center;

      @media (min-width: 768px) {
        grid-template-columns: 2fr 1fr;
        gap: 4rem;
      }
    }

    &-text {
      order: 2;

      @media (min-width: 768px) {
        order: 1;
      }
    }

    &-image {
      order: 1;
      display: flex;
      justify-content: center;

      @media (min-width: 768px) {
        order: 2;
      }
    }

    &-paragraphs {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  &__paragraph {
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba($BAMBOO-BLACK, 0.8);
    margin: 0;

    &--highlight {
      background: linear-gradient(135deg, rgba($BAMBOO-GREEN, 0.1), rgba($BAMBOO-GREEN, 0.05));
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 4px solid $BAMBOO-GREEN;
      font-weight: 500;
      color: $BAMBOO-BLACK;
    }

    strong {
      color: $BAMBOO-GREEN;
      font-weight: 600;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;

    &-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem 0;
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba($BAMBOO-BLACK, 0.8);

      i {
        color: #e74c3c;
        margin-top: 0.2rem;
        flex-shrink: 0;
      }
    }
  }

  &__image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 300px;
    background: linear-gradient(135deg, rgba($BAMBOO-GREEN, 0.1), rgba($BAMBOO-GREEN, 0.05));
    border-radius: 20px;
    border: 2px solid rgba($BAMBOO-GREEN, 0.2);
    text-align: center;
    gap: 1rem;

    i {
      font-size: 4rem;
      color: $BAMBOO-GREEN;
    }

    span {
      font-size: 1.2rem;
      font-weight: 600;
      color: $BAMBOO-BLACK;
    }

    small {
      font-size: 0.9rem;
      color: rgba($BAMBOO-BLACK, 0.6);
    }
  }

  &__video-section {
    margin-bottom: 5rem;
  }

  &__video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba($BAMBOO-GREEN, 0.2);
  }

  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__mission-vision {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 5rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
  }

  &__card {
    background: $white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 6px 25px rgba($BAMBOO-GREEN, 0.1);
    border: 1px solid rgba($BAMBOO-GREEN, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 35px rgba($BAMBOO-GREEN, 0.2);
    }

    &-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    &-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, $BAMBOO-GREEN, lighten($BAMBOO-GREEN, 10%));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 1.5rem;
        color: $white;
      }
    }

    &-title {
      font-size: 1.5rem;
      color: $BAMBOO-BLACK;
      margin: 0;
      font-weight: 600;
    }

    &-content {
      font-size: 1.1rem;
      line-height: 1.7;
      color: rgba($BAMBOO-BLACK, 0.8);
      margin: 0;
    }
  }

  &__values {
    &-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  &__value {
    background: $white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 20px rgba($BAMBOO-GREEN, 0.08);
    border: 1px solid rgba($BAMBOO-GREEN, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba($BAMBOO-GREEN, 0.15);
    }

    &-icon {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, rgba($BAMBOO-GREEN, 0.1), rgba($BAMBOO-GREEN, 0.05));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      border: 2px solid rgba($BAMBOO-GREEN, 0.2);

      i {
        font-size: 1.8rem;
        color: $BAMBOO-GREEN;
      }
    }

    &-title {
      font-size: 1.2rem;
      color: $BAMBOO-BLACK;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    &-description {
      font-size: 0.95rem;
      line-height: 1.6;
      color: rgba($BAMBOO-BLACK, 0.7);
      margin: 0;
    }
  }
}
</style>
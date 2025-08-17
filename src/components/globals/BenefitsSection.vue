<script setup lang="ts">
import { ref } from 'vue'

// Estado para controlar qué tooltip está activo
const activeTooltip = ref<number | null>(null)

// Función para mostrar tooltip
const showTooltip = (index: number) => {
  activeTooltip.value = index
}

// Función para cerrar tooltip
const closeTooltip = () => {
  activeTooltip.value = null
}

// Beneficios de nuestras pastas dentales
const benefits = [
  {
    title: 'Reduce la sensibilidad naturalmente',
    description: 'Nuestras pastas con Sangre de Drago ayudan a fortalecer el esmalte dental y reducir la sensibilidad de forma natural, proporcionando alivio duradero sin químicos agresivos.',
    position: { top: '25%', left: '75%' }
  },
  {
    title: 'Fortalece el esmalte y previene caries',
    description: 'El carbón activado y los ingredientes naturales trabajan juntos para remineralizar el esmalte dental, creando una barrera protectora contra las bacterias y la formación de caries.',
    position: { top: '65%', left: '85%' }
  }
]

// Función para navegar a productos
const learnMore = () => {
  // Aquí puedes agregar la navegación que desees
  console.log('Navegando a más información...')
}
</script>

<template>
  <section class="lifestyle-section">
    <!-- Imagen de fondo del contenedor completo -->
    <div class="background-overlay"></div>
    
    <div class="lifestyle-container">
      <!-- Contenido de texto -->
      <div class="lifestyle-content">
        <h2 class="main-title">
          Repara dientes sensibles y remineraliza el esmalte
        </h2>
        <p class="subtitle">
          Nuestras pastas dentales están formuladas con ingredientes naturales como la Sangre de Drago y carbón activado, 
          que proporcionan una protección completa mientras cuidan tu salud bucal de forma natural y efectiva.
        </p>
        <button 
          class="cta-button"
          @click="learnMore"
        >
          Conoce más
        </button>
      </div>
    </div>
    
    <!-- Hotspots interactivos sobre toda la sección -->
    <div 
      v-for="(benefit, index) in benefits" 
      :key="index"
      class="hotspot"
      :style="{ top: benefit.position.top, left: benefit.position.left }"
      @click="showTooltip(index)"
    >
      <div class="hotspot-button">
        <span class="plus-icon">+</span>
      </div>
      
      <!-- Tooltip emergente -->
      <Transition name="tooltip">
        <div 
          v-if="activeTooltip === index"
          class="tooltip"
          @click.stop
        >
          <button 
            class="close-button"
            @click="closeTooltip"
            aria-label="Cerrar"
          >
            ×
          </button>
          <h4 class="tooltip-title">{{ benefit.title }}</h4>
          <p class="tooltip-description">{{ benefit.description }}</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.lifestyle-section {
  position: relative;
  padding: 80px 0;
  min-height: 700px;
  background-image: url('/src/assets/stock/image-stock.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 0;
    min-height: 600px;
  }

  @media (max-width: 480px) {
    min-height: 500px;
  }
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, .5) 50%,
      rgba(255, 255, 255, 0) 100%);
  z-index: 1;
}

.lifestyle-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  min-height: 100%;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 16px;
    justify-content: center;
    text-align: center;
  }
}

.lifestyle-content {
  max-width: 600px;
  z-index: 3;

  @media (max-width: 968px) {
    max-width: 700px;
    margin: 0 auto;
  }
}

.main-title {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
  color: #2c3e50;
  margin-bottom: 24px;
  font-family: 'Inter', sans-serif;

  @media (max-width: 968px) {
    font-size: 2.8rem;
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
}

.subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 32px;
  max-width: 500px;

  @media (max-width: 968px) {
    max-width: 600px;
    margin: 0 auto 32px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 28px;
  }
}

.cta-button {
  padding: 14px 32px;
  border: 2px solid #27ae60;
  background: transparent;
  color: #27ae60;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #27ae60;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 0.9rem;
  }
}

.hotspot {
  position: absolute;
  cursor: pointer;
  z-index: 10;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
}

.hotspot-button {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.95);
  border: 3px solid #27ae60;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #27ae60;
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(39, 174, 96, 0.4);

    .plus-icon {
      color: white;
    }
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
}

.plus-icon {
  font-size: 24px;
  font-weight: 300;
  color: #27ae60;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 20px;
  }
}

.tooltip {
  position: absolute;
  top: -20px;
  right: 60px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  width: 320px;
  z-index: 20;

  @media (max-width: 968px) {
    right: -140px;
    width: 280px;
  }

  @media (max-width: 768px) {
    right: -120px;
    width: 260px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    right: -100px;
    width: 240px;
    padding: 16px;
  }
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #666;
  }
}

.tooltip-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  margin-right: 30px;
  line-height: 1.3;
}

.tooltip-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

// Animaciones para tooltips
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.tooltip-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.tooltip-enter-to,
.tooltip-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import { higieneBucal, type HigieneBucal } from '@/data/higiene-bucal'
import { cepillos, type Cepillo } from '@/data/cepillos'

interface ProductWithRating {
  name: string
  precio: string
  images: string[]
  description: string
  rating: number
  reviews: number
}

const router = useRouter()
const cartStore = useCartStore()
const productsStore = useProductsStore()

const isVisible = ref(false)
const cardsVisible = ref<boolean[]>([])
const currentImageIndex = ref(0)

// Producto destacado - usando pasta con Sangre de Drago con múltiples imágenes
const featuredProduct = computed((): ProductWithRating => ({
  ...higieneBucal[6], // Pasta Dental con Sangre de Drago Natural 125ml
  rating: 4.9,
  reviews: 234
}));

// Productos recomendados - mix de cepillos e higiene bucal
const recommendedProducts = computed((): ProductWithRating[] => [
  {
    ...cepillos[0], // Cepillo bambooEco
    rating: 4.7,
    reviews: 189
  },
  {
    ...higieneBucal[0], // Pasta Dental Natural Fresh
    rating: 4.8,
    reviews: 156
  },
  {
    ...cepillos[1], // Cepillo bambooEco con Carbón Activado
    rating: 4.6,
    reviews: 203
  },
  {
    ...higieneBucal[2], // Pasta Dental Natural Sangre de Drago
    rating: 4.9,
    reviews: 127
  }
]);

const generateStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return {
    full: fullStars,
    half: hasHalfStar,
    empty: emptyStars
  }
}

// Cambiar imagen del producto destacado
const changeImage = (index: number) => {
  currentImageIndex.value = index
}

// Auto-cambio de imágenes cada 3 segundos
const startImageRotation = () => {
  setInterval(() => {
    if (featuredProduct.value.images.length > 1) {
      currentImageIndex.value = (currentImageIndex.value + 1) % featuredProduct.value.images.length
    }
  }, 3000)
}

const shopNow = () => {
  // Solo añadir al carrito
  cartStore.addToCart(featuredProduct.value as any, 1)

  // Mostrar feedback visual en el botón
  const ctaButton = document.querySelector('.featured-product__cta') as HTMLButtonElement
  if (ctaButton) {
    const originalText = ctaButton.textContent
    ctaButton.textContent = '¡Añadido al Carrito! ✓'
    ctaButton.style.background = '#28a745'

    setTimeout(() => {
      ctaButton.textContent = originalText
      ctaButton.style.background = ''
    }, 2000)
  }
}

const addToCart = (product: ProductWithRating, event?: Event) => {
  cartStore.addToCart(product as any, 1)

  // Mostrar feedback visual temporal
  const button = event?.target as HTMLButtonElement
  if (button) {
    const originalText = button.textContent
    button.textContent = '¡Añadido! ✓'
    button.style.background = '#28a745'

    setTimeout(() => {
      button.textContent = originalText
      button.style.background = ''
    }, 2000)
  }
}

onMounted(() => {
  // Inicializar array de visibilidad para las tarjetas
  cardsVisible.value = new Array(recommendedProducts.value.length).fill(false)

  // Iniciar rotación automática de imágenes
  startImageRotation()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('featured-product')) {
            isVisible.value = true
          }

          if (entry.target.classList.contains('recommendations-grid')) {
            // Animar tarjetas con delay escalonado
            recommendedProducts.value.forEach((_, index) => {
              setTimeout(() => {
                cardsVisible.value[index] = true
              }, index * 150)
            })
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  const featuredElement = document.querySelector('.featured-product')
  const gridElement = document.querySelector('.recommendations-grid')

  if (featuredElement) observer.observe(featuredElement)
  if (gridElement) observer.observe(gridElement)
})
</script>

<template>
  <section class="featured-product-section">
    <!-- Producto Destacado -->
    <div class="featured-product" :class="{ 'featured-product--visible': isVisible }">
      <div class="featured-product__container">
        <div class="featured-product__content">
          <div class="featured-product__image-wrapper">
            <div class="featured-product__gallery">
              <img 
                :src="featuredProduct.images[currentImageIndex]" 
                :alt="featuredProduct.name"
                class="featured-product__image"
              />
              
              <!-- Indicadores de imagen -->
              <div v-if="featuredProduct.images.length > 1" class="featured-product__indicators">
                <button 
                  v-for="(image, index) in featuredProduct.images" 
                  :key="index"
                  @click="changeImage(index)"
                  class="featured-product__indicator"
                  :class="{ 'featured-product__indicator--active': currentImageIndex === index }"
                >
                  <img :src="image" :alt="`${featuredProduct.name} vista ${index + 1}`" />
                </button>
              </div>
            </div>
          </div>
            
            <div class="featured-product__info">
              <h2 class="featured-product__title">Producto Destacado</h2>
              <h3 class="featured-product__name">{{ featuredProduct.name }}</h3>
              
              <div class="featured-product__rating">
                <div class="featured-product__stars">
                  <span 
                    v-for="n in generateStars(featuredProduct.rating).full" 
                    :key="`full-${n}`"
                    class="featured-product__star featured-product__star--full"
                  >★</span>
                  <span 
                    v-if="generateStars(featuredProduct.rating).half"
                    class="featured-product__star featured-product__star--half"
                  >★</span>
                  <span 
                    v-for="n in generateStars(featuredProduct.rating).empty" 
                    :key="`empty-${n}`"
                    class="featured-product__star featured-product__star--empty"
                  >★</span>
                </div>
                <span class="featured-product__reviews">({{ featuredProduct.reviews }} reseñas)</span>
              </div>
              
              <p class="featured-product__price">${{ featuredProduct.precio }}</p>
            
            <button 
              class="featured-product__cta"
              @click="shopNow"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recomendaciones -->
    <div class="recommendations">
      <div class="recommendations__container">
        <h2 class="recommendations__title">Productos Recomendados</h2>
        
        <div class="recommendations-grid">
          <div 
            v-for="(product, index) in recommendedProducts" 
            :key="product.name"
            class="product-card"
            :class="{ 'product-card--visible': cardsVisible[index] }"
          >
            <div class="product-card__image-wrapper">
              <img 
                :src="product.images[0]" 
                :alt="product.name"
                class="product-card__image"
              />
            </div>
            
            <div class="product-card__content">
              <h3 class="product-card__name">{{ product.name }}</h3>
              
              <div class="product-card__rating">
                <div class="product-card__stars">
                  <span 
                    v-for="n in generateStars(product.rating).full" 
                    :key="`full-${n}`"
                    class="product-card__star product-card__star--full"
                  >★</span>
                  <span 
                    v-if="generateStars(product.rating).half"
                    class="product-card__star product-card__star--half"
                  >★</span>
                  <span 
                    v-for="n in generateStars(product.rating).empty" 
                    :key="`empty-${n}`"
                    class="product-card__star product-card__star--empty"
                  >★</span>
                </div>
                <span class="product-card__reviews">({{ product.reviews }})</span>
              </div>
              
              <p class="product-card__price">${{ product.precio }}</p>
              
              <button 
                class="product-card__add-to-cart"
                @click="addToCart(product, $event)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.featured-product-section {
  background: $white;
  padding: 8rem 0;
}

// Producto Destacado
.featured-product {
  margin-bottom: 8rem;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s ease;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 4rem;
      text-align: center;
    }
  }

  &--visible &__content {
    opacity: 1;
    transform: translateY(0);
  }

  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba($BAMBOO-BLACK, 0.08);
    position: relative;
    overflow: hidden;
    height: auto;

    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }

  &__gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }

  &__image {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 450px;
    object-fit: contain;
    transition: all 0.5s ease;
    border-radius: 15px;
    display: block;

    @media (max-width: 768px) {
      max-height: 350px;
    }

    &:hover {
      transform: scale(1.03);
    }
  }

  &__indicators {
    display: flex;
    gap: 0.8rem;
    margin-top: 2rem;
    justify-content: center;
    flex-wrap: wrap;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    @media (max-width: 968px) {
      display: none;
    }
  }

  &__indicator {
    width: 60px;
    height: 60px;
    border: 3px solid transparent;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    background: $white;
    padding: 4px;
    position: relative;
    z-index: 5;

    @media (max-width: 640px) {
      width: 50px;
      height: 50px;
      border-width: 2px;
    }

    &:hover {
      border-color: $BAMBOO-GREEN;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba($BAMBOO-GREEN, 0.2);
    }

    &--active {
      border-color: $BAMBOO-GREEN;
      box-shadow: 0 8px 25px rgba($BAMBOO-GREEN, 0.3);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
  }

  &__info {
    @media (max-width: 968px) {
      order: -1;
    }
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 500;
    color: $BAMBOO-GREEN;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  &__name {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    color: $BAMBOO-BLACK;
    margin: 0 0 2rem 0;
    line-height: 1.2;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @media (max-width: 968px) {
      justify-content: center;
    }
  }

  &__stars {
    display: flex;
    gap: 0.2rem;
  }

  &__star {
    font-size: 1.2rem;

    &--full {
      color: #ffc107;
    }

    &--half {
      color: #ffc107;
      opacity: 0.5;
    }

    &--empty {
      color: #e9ecef;
    }
  }

  &__reviews {
    font-size: 0.9rem;
    color: #6c757d;
  }

  &__price {
    font-size: 2rem;
    font-weight: 700;
    color: $BAMBOO-GREEN;
    margin: 0 0 2rem 0;
  }

  &__cta {
    background: $BAMBOO-GREEN;
    color: $white;
    border: none;
    padding: 1.2rem 3rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba($BAMBOO-GREEN, 0.3);
    position: relative;
    overflow: hidden;

    &:hover {
      background: darken($BAMBOO-GREEN, 10%);
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba($BAMBOO-GREEN, 0.4);
    }

    &:active {
      transform: translateY(-1px);
    }

    @media (max-width: 640px) {
      padding: 1rem 2.5rem;
      font-size: 1rem;
    }
  }
}

// Recomendaciones
.recommendations {
  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    color: $BAMBOO-BLACK;
    text-align: center;
    margin: 0 0 4rem 0;
  }
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 968px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

.product-card {
  background: $white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba($BAMBOO-BLACK, 0.08);
  transition: all 0.8s ease;
  opacity: 0;
  transform: translateY(20px);
  border: 1px solid #f1f3f4;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba($BAMBOO-BLACK, 0.15);
  }

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    margin-bottom: 1.5rem;
    background: #f8f9fa;
    border-radius: 15px;
    overflow: hidden;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__content {
    text-align: center;
  }

  &__name {
    font-size: 1.1rem;
    font-weight: 600;
    color: $BAMBOO-BLACK;
    margin: 0 0 1rem 0;
    line-height: 1.4;
    min-height: 2.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__stars {
    display: flex;
    gap: 0.1rem;
  }

  &__star {
    font-size: 1rem;

    &--full {
      color: #ffc107;
    }

    &--half {
      color: #ffc107;
      opacity: 0.5;
    }

    &--empty {
      color: #e9ecef;
    }
  }

  &__reviews {
    font-size: 0.8rem;
    color: #6c757d;
  }

  &__price {
    font-size: 1.4rem;
    font-weight: 700;
    color: $BAMBOO-GREEN;
    margin: 0 0 1.5rem 0;
  }

  &__add-to-cart {
    width: 100%;
    background: transparent;
    color: $BAMBOO-GREEN;
    border: 2px solid $BAMBOO-GREEN;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $BAMBOO-GREEN;
      color: $white;
      transform: translateY(-2px);
    }
  }
}
</style>
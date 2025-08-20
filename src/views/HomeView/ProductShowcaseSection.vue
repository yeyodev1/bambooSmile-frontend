<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { higieneBucal } from '@/data/higiene-bucal'
import { cepillos } from '@/data/cepillos'

interface ProductWithRating {
  name: string
  precio: string
  images: string[]
  description: string
  rating: number
  reviews: number
}

const router = useRouter()

const cardsVisible = ref<boolean[]>([])

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

// Navegar al detalle del producto
const goToProduct = (product: ProductWithRating) => {
  // Usar el nombre exacto del producto codificado para la URL
  router.push(`/producto/${encodeURIComponent(product.name)}`)
}

onMounted(() => {
  // Inicializar array de visibilidad para las tarjetas
  cardsVisible.value = new Array(recommendedProducts.value.length).fill(false)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('product-showcase__grid')) {
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

  const gridElement = document.querySelector('.product-showcase__grid')
  if (gridElement) observer.observe(gridElement)
})
</script>

<template>
  <section class="product-showcase">
    <div class="product-showcase__container">
      <div class="product-showcase__grid">
        <div 
          v-for="(product, index) in recommendedProducts" 
          :key="product.name"
          class="product-item"
          :class="{ 'product-item--visible': cardsVisible[index] }"
          @click="goToProduct(product)"
        >
          <div class="product-item__image">
            <img 
              :src="product.images[0]" 
              :alt="product.name"
            />
          </div>
          
          <div class="product-item__info">
            <h3 class="product-item__name">{{ product.name }}</h3>
            
            <div class="product-item__rating">
              <div class="product-item__stars">
                <span 
                  v-for="n in generateStars(product.rating).full" 
                  :key="`full-${n}`"
                  class="product-item__star product-item__star--full"
                >★</span>
                <span 
                  v-if="generateStars(product.rating).half"
                  class="product-item__star product-item__star--half"
                >★</span>
                <span 
                  v-for="n in generateStars(product.rating).empty" 
                  :key="`empty-${n}`"
                  class="product-item__star product-item__star--empty"
                >★</span>
              </div>
              <span class="product-item__reviews">{{ product.reviews }} Reviews</span>
            </div>
            
            <p class="product-item__price">$ {{ product.precio }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/colorVariables.module.scss';

.product-showcase {
  background: $neutral-50;
  padding: 4rem 0;

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  &--visible {
    opacity: 1;
    transform: translateY(0);

    &:hover {
      transform: translateY(-5px);
    }
  }

  &__image {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  &__info {
    width: 100%;
  }

  &__name {
    font-size: 0.9rem;
    font-weight: 400;
    color: $neutral-900;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
    min-height: 2.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &__stars {
    display: flex;
    gap: 0.1rem;
  }

  &__star {
    font-size: 0.8rem;
    color: $neutral-400;

    &--full,
    &--half {
      color: $neutral-400;
    }

    &--empty {
      color: $neutral-300;
    }
  }

  &__reviews {
    font-size: 0.75rem;
    color: $neutral-600;
    font-weight: 400;
  }

  &__price {
    font-size: 0.85rem;
    font-weight: 400;
    color: $neutral-700;
    margin: 0;
  }
}
</style>
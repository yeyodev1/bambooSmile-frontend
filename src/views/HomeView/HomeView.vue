<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import ProductGallery from './ProductGallery.vue'
import MarqueeSection from './MarqueeSection.vue'
import FeaturedProductSection from './FeaturedProductSection.vue'
import LifestyleSection from '../../components/globals/LifestyleSection.vue'
import SustainableMarquee from '../../components/globals/SustainableMarquee.vue'
import TestimonialsSection from './TestimonialsSection.vue'
import CEOVideoSection from './CEOVideoSection.vue'
import CertificationsSection from './CertificationsSection.vue'

const scrollToProducts = () => {
  const productsSection = document.getElementById('productos')
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home-view">
    <HeroSection @scroll-to-products="scrollToProducts" />
    <ProductGallery id="productos" />
    <MarqueeSection />
    <FeaturedProductSection />
    <LifestyleSection />
    <SustainableMarquee />
    <TestimonialsSection id="testimonios" />
    <CEOVideoSection />
    <CertificationsSection id="certificaciones" />
    <!-- <CEOVideoSection /> -->
    <!-- <ThirdCTA /> -->
    <!-- <CertificationsSection /> -->
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  overflow-x: hidden;
}
</style>
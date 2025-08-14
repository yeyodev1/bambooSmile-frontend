<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import ProductGallery from './ProductGallery.vue'

const scrollToProducts = () => {
  const productsSection = document.getElementById('products')
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home-view">
    <HeroSection @scroll-to-products="scrollToProducts" />
    
    <ProductGallery id="products" />
    <!-- <FirstCTA /> -->
    <!-- <TestimonialsSection /> -->
    <!-- <SecondCTA /> -->
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
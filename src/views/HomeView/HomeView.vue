<script setup lang="ts">
import ProductCarouselHero from './ProductCarouselHero.vue'
import BrandAttributesSection from './BrandAttributesSection.vue'
import ProductMarqueeSection from './ProductMarqueeSection.vue'
import ProductShowcaseSection from './ProductShowcaseSection.vue'
import BenefitsSection from '../../components/globals/BenefitsSection.vue'
import SustainabilityMarquee from '../../components/globals/SustainabilityMarquee.vue'
import TestimonialsSection from './TestimonialsSection.vue'
import FounderMessageSection from './FounderMessageSection.vue'
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
    <ProductCarouselHero @scroll-to-products="scrollToProducts" />
    <BrandAttributesSection id="productos" />
    <ProductMarqueeSection />
    <ProductShowcaseSection />
    <BenefitsSection />
    <SustainabilityMarquee />
    <FounderMessageSection />
    <TestimonialsSection id="testimonios" />
     <!-- <CertificationsSection id="certificaciones" /> -->
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
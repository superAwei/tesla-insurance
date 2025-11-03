<script setup>
import HeroSection from './components/HeroSection.vue'
import PainPointsSection from './components/PainPointsSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import CalculatorSection from './components/CalculatorSection.vue'
import SocialProofSection from './components/SocialProofSection.vue'
import ContactForm from './components/ContactForm.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="app">
    <HeroSection />
    <PainPointsSection />
    <FeaturesSection />
    <CalculatorSection />
    <SocialProofSection />
    <ContactForm />
    <FooterSection />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>

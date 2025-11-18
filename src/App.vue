<script setup>
import HeaderNavigation from './components/HeaderNavigation.vue'
import HeroSection from './components/HeroSection.vue'
import PainPointsSection from './components/PainPointsSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import CalculatorSection from './components/CalculatorSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import SocialProofSection from './components/SocialProofSection.vue'
import FAQSection from './components/FAQSection.vue'
import ContactForm from './components/ContactForm.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="app">
    <!-- Skip to content link for keyboard navigation -->
    <a href="#main-content" class="skip-link">跳至主要內容</a>

    <!-- Top Navigation -->
    <HeaderNavigation />

    <HeroSection />
    <main id="main-content">
      <PainPointsSection />
      <FeaturesSection />
      <CalculatorSection />
      <ProcessSection />
      <FAQSection />
      <SocialProofSection />
      <!-- ContactForm hidden - integrated into CalculatorSection -->
      <ContactForm v-if="false" />
    </main>
    <FooterSection />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  overflow-x: hidden;
}

/* Skip to content link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #E82127;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: 600;
  z-index: 9999;
  border-radius: 0 0 4px 0;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid white;
  outline-offset: 2px;
}
</style>

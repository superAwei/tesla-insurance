<template>
  <section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background with overlay -->
    <div class="absolute inset-0 z-0">
      <!-- Tesla background image -->
      <img
        src="https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2000&auto=format&fit=crop"
        alt="Tesla Car"
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-tesla-dark z-10"></div>
    </div>

    <!-- Content -->
    <div class="relative z-20 text-center px-6 md:px-12 max-w-5xl mx-auto">
      <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0 translate-y-10 leading-tight"
          :class="{ 'animate-fade-in-up': isVisible }">
        專為特斯拉車主設計的保險方案
      </h1>

      <p class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto opacity-0 translate-y-10 delay-100"
         :class="{ 'animate-fade-in-up': isVisible }">
        全方位保障，透明費率，專業服務<br>
        讓您的電動車之旅更加安心
      </p>

      <button
        @click="scrollToCalculator"
        class="btn-primary text-lg opacity-0 translate-y-10 delay-200"
        :class="{ 'animate-fade-in-up': isVisible }">
        立即規劃保險方案
      </button>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 delay-300"
           :class="{ 'animate-fade-in': isVisible }">
        <div class="scroll-indicator flex flex-col items-center text-gray-400">
          <span class="text-sm mb-2">向下探索</span>
          <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const scrollToCalculator = () => {
  const calculator = document.getElementById('calculator')
  if (calculator) {
    calculator.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

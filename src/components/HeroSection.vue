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
    <div class="relative z-20 text-center px-6 md:px-12 max-w-6xl mx-auto">
      <!-- Main Title -->
      <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8 opacity-0 translate-y-10 leading-tight"
          :class="{ 'animate-fade-in-up': isVisible }">
        專為特斯拉車主設計的保險方案
      </h1>

      <!-- Social Proof Stats - 社會證明數字列 -->
      <div class="stats-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 max-w-4xl mx-auto opacity-0 translate-y-10 delay-100"
           :class="{ 'animate-fade-in-up': isVisible }">
        <div class="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="text-4xl md:text-5xl font-bold text-tesla-red mb-2">
            {{ animatedStats.customers }}+
          </div>
          <div class="text-sm md:text-base text-gray-300">服務車主</div>
        </div>

        <div class="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="text-4xl md:text-5xl font-bold text-tesla-red mb-2">
            NT$ {{ animatedStats.savings.toLocaleString() }}
          </div>
          <div class="text-sm md:text-base text-gray-300">平均省下保費</div>
        </div>

        <div class="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="text-4xl md:text-5xl font-bold text-tesla-red mb-2">
            {{ animatedStats.satisfaction }}%
          </div>
          <div class="text-sm md:text-base text-gray-300">客戶滿意度</div>
        </div>
      </div>

      <!-- Subtitle -->
      <p class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto opacity-0 translate-y-10 delay-150"
         :class="{ 'animate-fade-in-up': isVisible }">
        全方位保障，透明費率，專業服務<br>
        讓您的電動車之旅更加安心
      </p>

      <!-- CTA Button -->
      <div class="cta-container opacity-0 translate-y-10 delay-200"
           :class="{ 'animate-fade-in-up': isVisible }">
        <button
          @click="scrollToCalculator"
          class="btn-primary text-lg px-12 py-4 mb-4">
          立即取得免費報價
        </button>

        <!-- Benefits Line -->
        <div class="benefits-line flex items-center justify-center gap-6 text-sm text-gray-400 mb-8">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            免費諮詢
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            24 小時回覆
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            隱私保護
          </span>
        </div>

        <!-- Trust Badges - 信任標章 -->
        <div class="trust-badges flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-tesla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span class="text-sm">專業保險經紀人證照</span>
          </div>

          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-tesla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span class="text-sm">合作 10+ 家保險公司</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator - 固定在畫面底部 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-0 delay-300"
         :class="{ 'animate-fade-in': isVisible }">
      <div class="scroll-indicator flex flex-col items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
           @click="scrollToCalculator">
        <span class="text-sm mb-2">向下探索</span>
        <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const isVisible = ref(false)

// 目標數字
const targetStats = {
  customers: 500,
  savings: 18000,
  satisfaction: 98
}

// 動畫中的數字
const animatedStats = reactive({
  customers: 0,
  savings: 0,
  satisfaction: 0
})

// 數字跳動動畫函數
const animateNumber = (key, target, duration = 2000) => {
  const startTime = Date.now()
  const startValue = 0

  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用 easeOutQuart 緩動函數
    const easeProgress = 1 - Math.pow(1 - progress, 4)

    animatedStats[key] = Math.floor(startValue + (target - startValue) * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedStats[key] = target
    }
  }

  animate()
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true

    // 延遲啟動數字動畫
    setTimeout(() => {
      animateNumber('customers', targetStats.customers, 2000)
      animateNumber('savings', targetStats.savings, 2500)
      animateNumber('satisfaction', targetStats.satisfaction, 2000)
    }, 500)
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

.delay-150 {
  animation-delay: 0.15s;
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

/* Stat cards hover effect */
.stat-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(232, 33, 39, 0.2);
}
</style>

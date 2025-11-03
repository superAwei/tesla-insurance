<template>
  <section class="social-proof-section section-padding bg-gradient-to-b from-black via-tesla-dark to-black">
    <div class="max-w-7xl mx-auto">

      <!-- Section Title -->
      <div class="text-center mb-12 md:mb-16 opacity-0"
           :class="{ 'animate-fade-in-up': isVisible }"
           ref="titleRef">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">為什麼選擇我們</h2>
        <p class="text-lg md:text-xl text-gray-400">真實數據，值得信賴</p>
      </div>

      <!-- 1. 數字成就 Statistics -->
      <div class="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">

        <!-- 服務車主數 -->
        <div class="stat-card bg-tesla-gray/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 text-center opacity-0 hover:bg-tesla-gray/30 transition-all duration-300"
             :class="{ 'animate-fade-in-up': isVisible }"
             style="animation-delay: 0.1s"
             ref="stat1Ref">
          <div class="stat-icon mb-4 flex justify-center">
            <svg class="w-12 h-12 md:w-14 md:h-14 text-tesla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div class="text-4xl md:text-5xl font-bold text-white mb-3">
            {{ animatedStats.customers }}+
          </div>
          <p class="text-sm md:text-base text-gray-400">服務特斯拉車主</p>
        </div>

        <!-- 平均節省保費 -->
        <div class="stat-card bg-tesla-gray/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 text-center opacity-0 hover:bg-tesla-gray/30 transition-all duration-300"
             :class="{ 'animate-fade-in-up': isVisible }"
             style="animation-delay: 0.2s"
             ref="stat2Ref">
          <div class="stat-icon mb-4 flex justify-center">
            <svg class="w-12 h-12 md:w-14 md:h-14 text-tesla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="flex items-baseline justify-center gap-2 mb-3">
            <span class="text-lg md:text-xl text-white">NT$</span>
            <span class="text-4xl md:text-5xl font-bold text-white">
              {{ animatedStats.savings.toLocaleString() }}
            </span>
          </div>
          <p class="text-sm md:text-base text-gray-400">平均為客戶節省保費</p>
        </div>

        <!-- 客戶滿意度 -->
        <div class="stat-card bg-tesla-gray/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 text-center opacity-0 hover:bg-tesla-gray/30 transition-all duration-300"
             :class="{ 'animate-fade-in-up': isVisible }"
             style="animation-delay: 0.3s"
             ref="stat3Ref">
          <div class="stat-icon mb-4 flex justify-center">
            <svg class="w-12 h-12 md:w-14 md:h-14 text-tesla-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div class="text-4xl md:text-5xl font-bold text-white mb-3">
            {{ animatedStats.satisfaction }}%
          </div>
          <p class="text-sm md:text-base text-gray-400">客戶滿意度</p>
        </div>
      </div>

      <!-- 2. 客戶見證輪播 Testimonials -->
      <div class="testimonials-section mb-16 md:mb-20 opacity-0"
           :class="{ 'animate-fade-in-up': isVisible }"
           style="animation-delay: 0.4s"
           ref="testimonialsRef">
        <h3 class="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">客戶真實評價</h3>

        <div class="relative max-w-4xl mx-auto">
          <!-- 輪播容器 -->
          <div class="overflow-hidden rounded-2xl">
            <div class="testimonial-slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="(testimonial, index) in testimonials" :key="index"
                   class="testimonial-slide flex-shrink-0 w-full px-4">
                <div class="bg-tesla-gray/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50">

                  <!-- 引號圖示 -->
                  <div class="mb-4">
                    <svg class="w-10 h-10 md:w-12 md:h-12 text-tesla-red opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>

                  <!-- 評價內容 -->
                  <p class="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                    {{ testimonial.content }}
                  </p>

                  <!-- 星星評分 -->
                  <div class="flex gap-1 mb-4">
                    <svg v-for="star in 5" :key="star" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>

                  <!-- 客戶資訊 -->
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-tesla-red to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {{ testimonial.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-semibold text-white">{{ testimonial.name }}</p>
                      <p class="text-sm text-gray-400">{{ testimonial.car }} 車主, {{ testimonial.location }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 輪播控制按鈕 -->
          <button
            @click="prevSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-tesla-gray/80 hover:bg-tesla-red rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gray-600">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            @click="nextSlide"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-tesla-gray/80 hover:bg-tesla-red rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gray-600">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- 輪播指示器 -->
          <div class="flex justify-center gap-2 mt-6">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="currentSlide = index"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-tesla-red w-8' : 'bg-gray-600 hover:bg-gray-500'">
            </button>
          </div>
        </div>
      </div>

      <!-- 3. 合作夥伴 Logo -->
      <div class="partners-section opacity-0"
           :class="{ 'animate-fade-in-up': isVisible }"
           style="animation-delay: 0.5s"
           ref="partnersRef">
        <h3 class="text-xl md:text-2xl font-bold text-center mb-8 text-gray-400">合作保險公司</h3>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div v-for="n in 10" :key="n"
               class="partner-logo bg-tesla-gray/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 flex items-center justify-center hover:bg-white/5 transition-all duration-300 hover:scale-105 group">
            <!-- Placeholder for Logo -->
            <div class="text-center">
              <div class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 bg-gray-700/50 rounded-lg flex items-center justify-center group-hover:bg-gray-600/50 transition-colors">
                <svg class="w-8 h-8 md:w-10 md:h-10 text-gray-500 group-hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <p class="text-xs text-gray-500 group-hover:text-gray-400">保險公司</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
const titleRef = ref(null)
const stat1Ref = ref(null)
const stat2Ref = ref(null)
const stat3Ref = ref(null)
const testimonialsRef = ref(null)
const partnersRef = ref(null)

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

// 客戶見證資料
const testimonials = [
  {
    content: '陳先生幫我比較了 7 家保險公司，最後省下 2 萬多！非常專業，而且很有耐心解釋每個方案的差異。強烈推薦給所有特斯拉車主！',
    name: '張先生',
    car: 'Model 3',
    location: '台北'
  },
  {
    content: '第一次買電動車，對保險完全不懂。陳先生從電池保固到充電設備都幫我規劃得很完善，理賠時也協助處理，真的很感謝！',
    name: '李小姐',
    car: 'Model Y',
    location: '新竹'
  },
  {
    content: '我原本的保單根本不適合電動車！經過專業分析後，不但保障更全面，保費還降低了 15%。這才是真正懂特斯拉的保險專家！',
    name: '王先生',
    car: 'Model S',
    location: '台中'
  }
]

// 輪播功能
const currentSlide = ref(0)
let autoPlayInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonials.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? testimonials.length - 1 : currentSlide.value - 1
}

// 自動輪播
const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000) // 每 5 秒切換
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
}

// Intersection Observer
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true

          // 延遲啟動數字動畫
          setTimeout(() => {
            animateNumber('customers', targetStats.customers, 2000)
            animateNumber('savings', targetStats.savings, 2500)
            animateNumber('satisfaction', targetStats.satisfaction, 2000)
          }, 300)
        }
      })
    },
    {
      threshold: 0.2
    }
  )

  // 觀察標題元素
  if (titleRef.value) {
    observer.observe(titleRef.value)
  }

  // 啟動自動輪播
  startAutoPlay()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
  stopAutoPlay()
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
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

/* Stat cards hover effect */
.stat-card:hover {
  transform: translateY(-4px);
}

/* 輪播動畫 */
.testimonial-slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

/* Partner logo grayscale effect */
.partner-logo {
  filter: grayscale(100%);
  opacity: 0.6;
}

.partner-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
}
</style>

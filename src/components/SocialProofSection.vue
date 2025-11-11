<template>
  <section class="social-proof-section section-padding bg-gradient-to-b from-tesla-dark via-black to-tesla-dark">
    <div class="max-w-7xl mx-auto">

      <!-- Section Title -->
      <div class="text-center mb-12 md:mb-16 opacity-0"
           :class="{ 'animate-fade-in-up': isVisible }"
           ref="titleRef">
        <div class="inline-block mb-4">
          <span class="text-tesla-red text-sm md:text-base font-semibold tracking-wider uppercase">Testimonials</span>
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          客戶真實評價
        </h2>
        <p class="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          聽聽其他特斯拉車主怎麼說，真實的使用體驗分享
        </p>
      </div>

      <!-- 客戶見證輪播 Testimonials -->
      <div class="testimonials-section opacity-0"
           :class="{ 'animate-fade-in-up': isVisible }"
           style="animation-delay: 0.2s"
           ref="testimonialsRef">

        <div class="relative max-w-5xl mx-auto">
          <!-- 輪播容器 -->
          <div class="overflow-hidden rounded-2xl">
            <div class="testimonial-slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="(testimonial, index) in testimonials" :key="index"
                   class="testimonial-slide flex-shrink-0 w-full px-4">
                <div class="relative bg-gradient-to-br from-tesla-gray/40 to-tesla-gray/20 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-gray-600/50 shadow-2xl hover:border-tesla-red/30 transition-all duration-300">

                  <!-- 裝飾性背景圖案 -->
                  <div class="absolute top-0 right-0 w-32 h-32 bg-tesla-red/5 rounded-full blur-3xl"></div>
                  <div class="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>

                  <!-- 引號圖示 - 更大更顯眼 -->
                  <div class="relative mb-6">
                    <svg class="w-12 h-12 md:w-16 md:h-16 text-tesla-red opacity-40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>

                  <!-- 評價內容 - 更大的字體 -->
                  <p class="relative text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light italic">
                    {{ testimonial.content }}
                  </p>

                  <!-- 分隔線 -->
                  <div class="w-16 h-1 bg-gradient-to-r from-tesla-red to-transparent mb-6"></div>

                  <!-- 星星評分 + 客戶資訊組合 -->
                  <div class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <!-- 客戶資訊 -->
                    <div class="flex items-center gap-4">
                      <div class="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-tesla-red via-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg ring-2 ring-tesla-red/30">
                        {{ testimonial.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-semibold text-white text-lg">{{ testimonial.name }}</p>
                        <p class="text-sm text-gray-400 flex items-center gap-2">
                          <svg class="w-4 h-4 text-tesla-red" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                          </svg>
                          <span>{{ testimonial.car }} 車主</span>
                          <span class="text-gray-500">•</span>
                          <span>{{ testimonial.location }}</span>
                        </p>
                      </div>
                    </div>

                    <!-- 星星評分 -->
                    <div class="flex gap-1">
                      <svg v-for="star in 5" :key="star" class="w-5 h-5 md:w-6 md:h-6 text-yellow-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 輪播控制按鈕 -->
          <button
            @click="prevSlide"
            aria-label="查看上一則客戶評價"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-tesla-gray/80 hover:bg-tesla-red rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gray-600">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            @click="nextSlide"
            aria-label="查看下一則客戶評價"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-tesla-gray/80 hover:bg-tesla-red rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gray-600">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- 輪播指示器 -->
          <div class="flex justify-center gap-2 mt-8" role="tablist" aria-label="客戶評價選擇">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="currentSlide = index"
              :aria-label="`查看第 ${index + 1} 則評價`"
              :aria-selected="currentSlide === index"
              role="tab"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-tesla-red w-10' : 'bg-gray-600 hover:bg-gray-500 w-1.5'">
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
const titleRef = ref(null)
const testimonialsRef = ref(null)

// 客戶見證資料
const testimonials = [
  {
    content: '團隊幫我比較了 7 家保險公司，最後省下 2 萬多！非常專業，而且很有耐心解釋每個方案的差異。強烈推薦給所有特斯拉車主！',
    name: '張先生',
    car: 'Model 3',
    location: '台北'
  },
  {
    content: '第一次買電動車，對保險完全不懂。團隊從電池保固到充電設備都幫我規劃得很完善，理賠時也協助處理，真的很感謝！',
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

/* 輪播動畫 */
.testimonial-slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

/* 漸變文字效果 */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>

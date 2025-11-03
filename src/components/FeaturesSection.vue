<template>
  <section class="features-section section-padding bg-tesla-dark">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">為什麼選擇我們</h2>
        <p class="text-xl text-gray-400">專業、透明、快速的保險服務</p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card group"
          :class="{ 'is-visible': visibleCards.includes(index) }"
          ref="cardRefs">
          <div class="feature-card-inner bg-tesla-gray/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50
                      hover:border-tesla-red/50 hover:bg-tesla-gray/50 transition-all duration-500
                      transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-tesla-red/10">
            <!-- Icon -->
            <div class="feature-icon mb-6 text-tesla-red text-5xl transform group-hover:scale-110 transition-transform duration-300">
              {{ feature.icon }}
            </div>

            <!-- Title -->
            <h3 class="text-2xl font-semibold mb-4 group-hover:text-tesla-red transition-colors duration-300">
              {{ feature.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const features = [
  {
    icon: '🎯',
    title: '專業評估',
    description: '專為特斯拉電動車設計的保險方案，深入了解每款車型的特性與風險'
  },
  {
    icon: '💎',
    title: '彈性方案',
    description: '依據您的需求客製化保險內容，從基本保障到全方位防護任您選擇'
  },
  {
    icon: '⚡',
    title: '快速理賠',
    description: '24/7 線上理賠服務，最快 3 個工作天完成審核與賠付'
  },
  {
    icon: '💰',
    title: '透明價格',
    description: '無隱藏費用，所有保費項目清楚列出，讓您明明白白投保'
  }
]

const cardRefs = ref([])
const visibleCards = ref([])

const observeCards = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.value.indexOf(entry.target)
          if (index !== -1 && !visibleCards.value.includes(index)) {
            setTimeout(() => {
              visibleCards.value.push(index)
            }, index * 100) // Stagger animation
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  cardRefs.value.forEach((card) => {
    if (card) observer.observe(card)
  })

  return observer
}

let observer = null

onMounted(() => {
  observer = observeCards()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.feature-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.feature-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>

<template>
  <section id="features" class="features-section section-padding bg-tesla-dark">
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
          class="feature-card group h-full"
          :class="{ 'is-visible': visibleCards.includes(index) }"
          ref="cardRefs">
          <div class="feature-card-inner bg-tesla-gray/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50
                      hover:border-tesla-red/50 hover:bg-tesla-gray/50 transition-all duration-500
                      transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-tesla-red/10
                      h-full flex flex-col">
            <!-- Icon -->
            <div class="feature-icon mb-6 transform group-hover:scale-110 transition-all duration-300">
              <svg class="w-14 h-14 stroke-gray-400 group-hover:stroke-tesla-red transition-colors duration-300"
                   fill="none"
                   stroke="currentColor"
                   stroke-width="1.5"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" :d="feature.iconPath"/>
              </svg>
            </div>

            <!-- Title -->
            <h3 class="text-2xl font-semibold mb-4 group-hover:text-tesla-red transition-colors duration-300">
              {{ feature.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-400 leading-relaxed flex-grow">
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
    iconPath: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    title: '專業評估',
    description: '專為特斯拉電動車設計的保險方案，深入了解每款車型的特性與風險'
  },
  {
    iconPath: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75',
    title: '彈性方案',
    description: '依據您的需求客製化保險內容，從基本保障到全方位防護任您選擇'
  },
  {
    iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
    title: '投保後續支援',
    description: '保單檢視、續保提醒、理賠諮詢'
  },
  {
    iconPath: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z',
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

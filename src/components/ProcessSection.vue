<template>
  <section id="process" class="process-section section-padding bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">簡單 4 步驟</h2>
        <p class="text-xl text-gray-600">輕鬆完成 Tesla 保險投保</p>
      </div>

      <!-- Process Steps -->
      <div class="relative">
        <!-- Steps Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="process-card relative"
            :class="{ 'is-visible': visibleCards.includes(index) }"
            ref="cardRefs">

            <!-- Card -->
            <div class="process-card-inner bg-white p-8 rounded-xl border-2 border-gray-200 relative z-10">

              <!-- Step Number -->
              <div class="step-number absolute -top-4 -left-4 w-12 h-12 bg-tesla-red text-white rounded-full
                          flex items-center justify-center font-bold text-xl shadow-lg">
                {{ step.number }}
              </div>

              <!-- Icon -->
              <div class="process-icon mb-6 flex justify-center">
                <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-tesla-red"
                       fill="currentColor"
                       viewBox="0 0 24 24">
                    <path :d="step.iconPath"/>
                  </svg>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold mb-3 text-gray-900 text-center">
                {{ step.title }}
              </h3>

              <!-- Description -->
              <p class="text-gray-600 text-center leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const steps = [
  {
    number: '①',
    iconPath: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z', // description icon
    title: '填寫需求',
    description: '30 秒完成線上表單'
  },
  {
    number: '②',
    iconPath: 'M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z', // phone icon
    title: '確認需求',
    description: '1-2 個工作天內聯繫'
  },
  {
    number: '③',
    iconPath: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z', // assignment icon
    title: '方案討論',
    description: '提供多家方案比較'
  },
  {
    number: '④',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', // check_circle icon
    title: '完成投保',
    description: '約定時間填寫文件'
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
            }, index * 150) // Stagger animation
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
.process-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.process-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Ensure card takes full height on mobile */
.process-card-inner {
  height: 100%;
  min-height: 280px;
}
</style>

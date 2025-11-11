<template>
  <section id="faq" class="faq-section section-padding bg-gradient-to-b from-black to-tesla-dark">
    <div class="max-w-4xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">常見問題</h2>
        <p class="text-xl text-gray-400">解答您關於特斯拉保險的疑問</p>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="faq-item bg-tesla-gray/30 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden
                 hover:border-tesla-red/50 transition-all duration-300">

          <button
            @click="toggleItem(index)"
            class="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left
                   hover:bg-white/5 transition-all duration-300"
            :aria-expanded="openItems.includes(index)">
            <span class="text-lg md:text-xl font-semibold pr-8">{{ item.question }}</span>
            <svg
              class="w-6 h-6 flex-shrink-0 text-tesla-red transition-transform duration-300"
              :class="{ 'rotate-180': openItems.includes(index) }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <transition name="faq-content">
            <div v-if="openItems.includes(index)" class="px-6 md:px-8 pb-5 md:pb-6">
              <p class="text-gray-400 leading-relaxed">{{ item.answer }}</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <p class="text-gray-400 mb-4">還有其他問題？</p>
        <a
          href="#contact"
          @click.prevent="scrollToContact"
          class="inline-block btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4">
          聯絡我們
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openItems = ref([0]) // 預設展開第一項

const faqItems = [
  {
    question: '特斯拉保險與一般車險有什麼不同？',
    answer: '特斯拉保險專為電動車設計，涵蓋電池保固、充電設備、自動駕駛系統等特殊項目。我們的專業團隊深入了解特斯拉車款特性，能為您規劃最適合的保障方案。'
  },
  {
    question: '保費試算需要多久時間？',
    answer: '填寫基本資料後，系統會立即提供初步報價。我們的專業顧問會在 24 小時內與您聯繫，提供詳細的保險方案比較與建議。'
  },
  {
    question: '可以比較多家保險公司的方案嗎？',
    answer: '是的！我們與 10+ 家保險公司合作，會為您比較不同公司的方案，找出最符合您需求且價格最優惠的保險組合。'
  },
  {
    question: '理賠時需要注意什麼？',
    answer: '發生事故時請先確保人員安全，拍照記錄現場，並立即通知我們。我們提供 24/7 理賠協助服務，會全程協助您處理理賠事宜，最快 3 個工作天完成賠付。'
  },
  {
    question: '中途可以調整保險內容嗎？',
    answer: '可以的。如果您的需求改變（如增加駕駛人、改變使用方式等），隨時可以聯絡我們調整保障內容。我們會重新評估並提供最適合的方案。'
  },
  {
    question: '購買保險需要準備哪些文件？',
    answer: '您需要準備：1) 身分證明文件 2) 駕照 3) 行照 4) 特斯拉購車證明或車輛登記書。我們的顧問會協助您完成所有文件準備。'
  }
]

const toggleItem = (index) => {
  const itemIndex = openItems.value.indexOf(index)
  if (itemIndex > -1) {
    openItems.value.splice(itemIndex, 1)
  } else {
    openItems.value.push(index)
  }
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
/* FAQ 內容過渡動畫 */
.faq-content-enter-active,
.faq-content-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.faq-content-enter-from,
.faq-content-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.faq-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item:hover {
  transform: translateX(4px);
}
</style>

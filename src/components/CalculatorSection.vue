<template>
  <section id="calculator" class="calculator-section section-padding bg-gradient-to-b from-tesla-dark to-black">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">保險方案試算</h2>
        <p class="text-xl text-gray-400">選擇您的愛車，立即取得專屬報價</p>
      </div>

      <div class="calculator-container bg-tesla-gray/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">
        <!-- Step 1: Car Model Selection -->
        <div class="mb-12">
          <label class="block text-2xl font-semibold mb-6">選擇車型</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div
              v-for="model in carModels"
              :key="model.name"
              @click="selectedModel = model"
              class="car-card cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105"
              :class="selectedModel?.name === model.name
                ? 'border-tesla-red shadow-lg shadow-tesla-red/30'
                : 'border-gray-700 hover:border-gray-500'">
              <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <img
                  :src="model.image"
                  :alt="model.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div v-if="selectedModel?.name === model.name"
                     class="absolute top-2 right-2 bg-tesla-red text-white w-6 h-6 rounded-full flex items-center justify-center">
                  ✓
                </div>
              </div>
              <div class="p-4 text-center bg-tesla-gray/30">
                <h3 class="font-semibold text-lg">{{ model.name }}</h3>
                <p class="text-sm text-gray-400">{{ model.type }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Year Selection -->
        <div class="mb-12">
          <label class="block text-xl font-semibold mb-4">車款年份</label>
          <select
            v-model="selectedYear"
            class="w-full md:w-64 px-6 py-4 bg-tesla-gray border border-gray-600 rounded-lg text-white
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
            <option value="">請選擇年份</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }} 年</option>
          </select>
        </div>

        <!-- Step 3: Purchase Date -->
        <div class="mb-12">
          <label class="block text-xl font-semibold mb-4">購入時間</label>
          <div class="flex gap-4">
            <select
              v-model="purchaseMonth"
              class="flex-1 md:flex-none md:w-48 px-6 py-4 bg-tesla-gray border border-gray-600 rounded-lg text-white
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
              <option value="">月份</option>
              <option v-for="month in 12" :key="month" :value="month">{{ month }} 月</option>
            </select>
            <select
              v-model="purchaseYear"
              class="flex-1 md:flex-none md:w-48 px-6 py-4 bg-tesla-gray border border-gray-600 rounded-lg text-white
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
              <option value="">年份</option>
              <option v-for="year in purchaseYears" :key="year" :value="year">{{ year }} 年</option>
            </select>
          </div>
        </div>

        <!-- Step 4: Budget Slider -->
        <div class="mb-12">
          <label class="block text-xl font-semibold mb-4">
            保費預算
            <span class="text-tesla-red ml-4 text-3xl font-bold">NT$ {{ budget.toLocaleString() }}</span>
          </label>
          <div class="relative pt-2">
            <input
              type="range"
              v-model="budget"
              min="20000"
              max="100000"
              step="5000"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-gray-500 mt-2">
              <span>NT$ 20,000</span>
              <span>NT$ 100,000</span>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div v-if="showResults" class="results-panel bg-gradient-to-br from-tesla-red/10 to-tesla-red/5 rounded-xl p-8 border border-tesla-red/30">
          <h3 class="text-2xl font-bold mb-6 text-tesla-red">推薦保險方案</h3>

          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="bg-tesla-gray/30 p-6 rounded-lg">
              <h4 class="font-semibold text-lg mb-2">車輛資訊</h4>
              <p class="text-gray-300">{{ selectedModel.name }} {{ selectedYear }}</p>
              <p class="text-sm text-gray-400">購入時間：{{ purchaseYear }}/{{ purchaseMonth }}</p>
            </div>
            <div class="bg-tesla-gray/30 p-6 rounded-lg">
              <h4 class="font-semibold text-lg mb-2">預估保費</h4>
              <p class="text-3xl font-bold text-tesla-red">NT$ {{ budget.toLocaleString() }}</p>
              <p class="text-sm text-gray-400">年繳保費</p>
            </div>
          </div>

          <div class="coverage-list">
            <h4 class="font-semibold text-lg mb-4">保障內容</h4>
            <div class="grid md:grid-cols-2 gap-3">
              <div v-for="item in coverageItems" :key="item" class="flex items-center gap-2">
                <svg class="w-5 h-5 text-tesla-red" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-300">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Car models with images from Unsplash (high-quality Tesla images)
// 圖片來源：Unsplash - 免費高品質特斯拉照片
const carModels = [
  {
    name: 'Model 3',
    type: '入門轎車',
    // Model 3 紅色側面照
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&h=600&auto=format&fit=crop'
  },
  {
    name: 'Model Y',
    type: 'SUV',
    // Model Y 白色側面照
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=800&h=600&auto=format&fit=crop'
  },
  {
    name: 'Model S',
    type: '豪華轎車',
    // Model S 銀色側面照
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=800&h=600&auto=format&fit=crop'
  },
  {
    name: 'Model X',
    type: '豪華 SUV',
    // Model X 黑色側面照（鷹翼門）
    image: 'https://images.unsplash.com/photo-1583267746897-cb95d1d6b194?q=80&w=800&h=600&auto=format&fit=crop'
  },
  {
    name: 'Cybertruck',
    type: '電動皮卡',
    // Cybertruck 銀色側面照
    image: 'https://images.unsplash.com/photo-1623641362687-808095da0cd9?q=80&w=800&h=600&auto=format&fit=crop'
  }
]

const years = Array.from({ length: 8 }, (_, i) => 2025 - i)
const purchaseYears = Array.from({ length: 8 }, (_, i) => 2025 - i)

const selectedModel = ref(null)
const selectedYear = ref('')
const purchaseMonth = ref('')
const purchaseYear = ref('')
const budget = ref(50000)

const showResults = computed(() => {
  return selectedModel.value && selectedYear.value && purchaseMonth.value && purchaseYear.value
})

const coverageItems = computed(() => {
  const base = [
    '車體損失險',
    '第三人責任險',
    '竊盜損失險',
    '乘客責任險'
  ]

  if (budget.value >= 40000) {
    base.push('超額責任險', '颱風地震險')
  }

  if (budget.value >= 60000) {
    base.push('道路救援服務', '代步車費用補償')
  }

  if (budget.value >= 80000) {
    base.push('新車價格保證', '原廠零件保證')
  }

  return base
})
</script>

<style scoped>
/* Custom slider styling */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #E82127;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(232, 33, 39, 0.5);
  transition: all 0.3s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(232, 33, 39, 0.8);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #E82127;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(232, 33, 39, 0.5);
  transition: all 0.3s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(232, 33, 39, 0.8);
}
</style>

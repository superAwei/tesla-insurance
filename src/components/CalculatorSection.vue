<template>
  <section id="calculator" class="calculator-section section-padding bg-gradient-to-b from-tesla-dark to-black">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">保險方案試算</h2>
        <p class="text-xl text-gray-400">選擇您的愛車，立即取得專屬報價</p>
      </div>

      <div class="calculator-container bg-tesla-gray/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">

        <!-- 稀缺性提示區塊 -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-600/50">
          <!-- 限定優惠 -->
          <div class="flex items-center gap-2 bg-tesla-red/10 px-4 py-3 rounded-lg border border-tesla-red/30">
            <span class="text-2xl">⏰</span>
            <p class="text-sm md:text-base text-gray-200">
              本月限定: 填寫表單即送<span class="text-tesla-red font-semibold">『特斯拉車險完整指南』</span>電子書
            </p>
          </div>

          <!-- 今日人數 -->
          <div class="flex items-center gap-2 text-sm md:text-base text-gray-400">
            <span class="text-xl">👥</span>
            <span>今日已有 <span class="text-tesla-red font-bold text-lg">{{ todayConsultations }}</span> 位車主填寫諮詢</span>
          </div>
        </div>

        <!-- 進度指示器 - Sticky 定位，隨時可見 -->
        <div class="progress-section sticky top-0 z-40 bg-tesla-gray/95 backdrop-blur-md -mx-8 md:-mx-12 px-8 md:px-12 py-4 mb-6 border-b border-gray-600/50">
          <div class="flex justify-between items-center mb-3">
            <div v-for="(step, index) in steps" :key="index"
                 class="flex items-center"
                 :class="{ 'flex-1': index < steps.length - 1 }">
              <div class="flex items-center gap-2">
                <div class="step-circle w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm transition-all duration-300"
                     :class="currentStep >= index + 1 ? 'bg-tesla-red text-white' : 'bg-gray-700 text-gray-400'">
                  {{ index + 1 }}
                </div>
                <span class="text-xs font-medium hidden sm:inline"
                      :class="currentStep >= index + 1 ? 'text-white' : 'text-gray-500'">
                  {{ step }}
                </span>
              </div>
              <!-- 連接線 -->
              <div v-if="index < steps.length - 1"
                   class="flex-1 h-1 mx-2 md:mx-3 rounded transition-all duration-300"
                   :class="currentStep > index + 1 ? 'bg-tesla-red' : 'bg-gray-700'">
              </div>
            </div>
          </div>

          <!-- 進度條 -->
          <div class="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-tesla-red to-red-600 h-full transition-all duration-500 ease-out"
                 :style="{ width: progressPercentage + '%' }">
            </div>
          </div>
          <p class="text-right text-xs text-gray-400 mt-1.5">{{ progressPercentage }}% 完成</p>
        </div>
        <!-- Step 1: Car Model Selection -->
        <div class="mb-8">
          <label class="block text-lg md:text-xl font-semibold mb-4">選擇車型</label>

          <!-- 下拉選單 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <!-- 左側：下拉選單 -->
            <div>
              <select
                v-model="selectedModelName"
                @change="handleModelChange"
                class="w-full px-4 py-3 bg-tesla-gray border-2 border-gray-600 rounded-lg text-white text-base
                       focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all
                       cursor-pointer hover:border-gray-500">
                <option value="">請選擇您的特斯拉車款</option>
                <option v-for="model in carModels" :key="model.name" :value="model.name">
                  {{ model.name }} - {{ model.type }}
                </option>
              </select>

              <!-- 車款資訊 -->
              <div v-if="selectedModel" class="mt-4 p-4 bg-tesla-gray/50 rounded-lg border border-gray-600">
                <h3 class="text-lg font-bold text-white mb-1">{{ selectedModel.name }}</h3>
                <p class="text-gray-300 mb-3 text-sm">{{ selectedModel.type }}</p>
                <div class="space-y-1 text-xs text-gray-400">
                  <p>✓ 專業電動車保障</p>
                  <p>✓ 電池保固涵蓋</p>
                  <p>✓ 充電設備保險</p>
                </div>
              </div>
            </div>

            <!-- 右側：車輛展示區 -->
            <div class="relative h-48 md:h-64 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700">

              <!-- Loading Skeleton -->
              <div v-if="imageLoading && selectedModel" class="absolute inset-0 flex items-center justify-center">
                <div class="animate-pulse flex flex-col items-center gap-4">
                  <div class="w-32 h-32 md:w-40 md:h-40 bg-gray-700/50 rounded-lg"></div>
                  <div class="w-24 h-3 bg-gray-700/50 rounded"></div>
                </div>
              </div>

              <!-- Error Fallback -->
              <div v-else-if="imageError && selectedModel" class="text-center text-gray-500">
                <svg class="w-16 h-16 mx-auto mb-4 text-red-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-sm">圖片載入失敗</p>
                <p class="text-xs mt-1 text-gray-600">{{ selectedModel.name }}</p>
              </div>

              <!-- 預設提示 -->
              <div v-else-if="!selectedModel" class="text-center text-gray-500">
                <svg class="w-20 h-20 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <p class="text-lg">選擇車款以預覽</p>
              </div>

              <!-- 車輛圖片 - 從右側滑入 -->
              <transition name="slide-in-right">
                <div v-if="selectedModel && !imageLoading && !imageError"
                     :key="selectedModel.name"
                     class="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    :src="selectedModel.displayImage"
                    :alt="`${selectedModel.name} - ${selectedModel.type}`"
                    class="max-w-full max-h-full object-contain drop-shadow-2xl"
                    loading="eager"
                    @load="imageLoading = false"
                    @error="imageError = true; imageLoading = false"
                  />
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Step 2: Year Selection -->
        <div class="mb-6">
          <label class="block text-base md:text-lg font-semibold mb-3">車款年份</label>
          <select
            v-model="selectedYear"
            class="w-full md:w-64 px-4 py-3 bg-tesla-gray border border-gray-600 rounded-lg text-white text-sm
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
            <option value="">請選擇年份</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }} 年</option>
          </select>
        </div>

        <!-- Step 3: Purchase Date -->
        <div class="mb-6">
          <label class="block text-base md:text-lg font-semibold mb-3">購入時間</label>
          <div class="flex gap-3">
            <select
              v-model="purchaseMonth"
              class="flex-1 md:flex-none md:w-40 px-4 py-3 bg-tesla-gray border border-gray-600 rounded-lg text-white text-sm
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
              <option value="">月份</option>
              <option v-for="month in 12" :key="month" :value="month">{{ month }} 月</option>
            </select>
            <select
              v-model="purchaseYear"
              class="flex-1 md:flex-none md:w-40 px-4 py-3 bg-tesla-gray border border-gray-600 rounded-lg text-white text-sm
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
              <option value="">年份</option>
              <option v-for="year in purchaseYears" :key="year" :value="year">{{ year }} 年</option>
            </select>
          </div>
        </div>

        <!-- Step 4: Budget Slider -->
        <div class="mb-8">
          <label class="block text-base md:text-lg font-semibold mb-3">
            保費預算
            <span class="text-tesla-red ml-3 text-2xl md:text-3xl font-bold">NT$ {{ budget.toLocaleString() }}</span>
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

          <!-- 即時反饋文字 -->
          <div class="mt-3 p-3 rounded-lg transition-all duration-300"
               :class="budgetFeedback.bgClass">
            <div class="flex items-center gap-2">
              <span class="text-xl">{{ budgetFeedback.icon }}</span>
              <p class="text-xs md:text-sm" :class="budgetFeedback.textClass">
                {{ budgetFeedback.message }}
              </p>
            </div>
          </div>
        </div>

        <!-- 降低承諾門檻提示 -->
        <div v-if="showResults" class="commitment-section mb-6 p-4 md:p-5 bg-gradient-to-r from-green-900/20 to-green-800/10 rounded-xl border border-green-700/30">
          <h4 class="text-base md:text-lg font-semibold text-green-400 mb-3 text-center">安心保證</h4>
          <div class="grid md:grid-cols-3 gap-3">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs md:text-sm text-gray-300">免費諮詢，無購買壓力</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs md:text-sm text-gray-300">隱私保護，絕不騷擾</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs md:text-sm text-gray-300">24小時內專人回覆</span>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div v-if="showResults" class="results-panel bg-gradient-to-br from-tesla-red/10 to-tesla-red/5 rounded-xl p-5 md:p-6 border border-tesla-red/30">
          <h3 class="text-xl md:text-2xl font-bold mb-4 text-tesla-red">推薦保險方案</h3>

          <div class="grid md:grid-cols-2 gap-4 mb-5">
            <div class="bg-tesla-gray/30 p-4 rounded-lg">
              <h4 class="font-semibold text-base mb-2">車輛資訊</h4>
              <p class="text-gray-300 text-sm">{{ selectedModel.name }} {{ selectedYear }}</p>
              <p class="text-xs text-gray-400">購入時間：{{ purchaseYear }}/{{ purchaseMonth }}</p>
            </div>
            <div class="bg-tesla-gray/30 p-4 rounded-lg">
              <h4 class="font-semibold text-base mb-2">預估保費</h4>
              <p class="text-2xl md:text-3xl font-bold text-tesla-red">NT$ {{ budget.toLocaleString() }}</p>
              <p class="text-xs text-gray-400">年繳保費</p>
            </div>
          </div>

          <div class="coverage-list">
            <h4 class="font-semibold text-base md:text-lg mb-3">保障內容</h4>
            <div class="grid md:grid-cols-2 gap-2">
              <div v-for="item in coverageItems" :key="item" class="flex items-center gap-2">
                <svg class="w-4 h-4 text-tesla-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-300 text-sm">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 步驟定義
const steps = ['選擇車型', '設定預算', '取得報價']

// 今日諮詢人數（動態生成 18-28 之間的隨機數）
const todayConsultations = ref(23)

// 在組件掛載時生成隨機人數
onMounted(() => {
  todayConsultations.value = Math.floor(Math.random() * 11) + 18 // 18-28
})

// Car models with images
// 圖片來源：PNG 去背車輛圖片，展現賽車遊戲風格
const carModels = [
  {
    name: 'Model 3',
    type: '入門轎車',
    // 縮圖用（有背景）
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&h=600&auto=format&fit=crop',
    // 大圖展示用（去背 PNG）
    displayImage: 'https://www.pngmart.com/files/22/Tesla-Model-3-PNG-Isolated-Photo.png'
  },
  {
    name: 'Model Y',
    type: 'SUV',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=800&h=600&auto=format&fit=crop',
    displayImage: 'https://www.pngmart.com/files/22/Tesla-Model-Y-PNG-Photo.png'
  },
  {
    name: 'Model S',
    type: '豪華轎車',
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=800&h=600&auto=format&fit=crop',
    displayImage: 'https://www.pngmart.com/files/22/Tesla-Model-S-PNG-Isolated-File.png'
  },
  {
    name: 'Model X',
    type: '豪華 SUV',
    image: 'https://images.unsplash.com/photo-1583267746897-cb95d1d6b194?q=80&w=800&h=600&auto=format&fit=crop',
    displayImage: 'https://www.pngmart.com/files/22/Tesla-Model-X-Transparent-PNG.png'
  },
  {
    name: 'Cybertruck',
    type: '電動皮卡',
    image: 'https://images.unsplash.com/photo-1623641362687-808095da0cd9?q=80&w=800&h=600&auto=format&fit=crop',
    displayImage: 'https://www.pngmart.com/files/23/Tesla-Cybertruck-PNG-Image.png'
  }
]

const years = Array.from({ length: 8 }, (_, i) => 2025 - i)
const purchaseYears = Array.from({ length: 8 }, (_, i) => 2025 - i)

// 設定預設值
const selectedModelName = ref('Model 3')
const selectedModel = ref(null)
const selectedYear = ref('2024')
const purchaseMonth = ref('1')
const purchaseYear = ref('2024')
const budget = ref(50000)

// 圖片載入狀態
const imageLoading = ref(true)
const imageError = ref(false)
const imageLoaded = ref({})

// 圖片預載入函數
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      imageLoaded.value[src] = true
      resolve(src)
    }
    img.onerror = () => {
      imageLoaded.value[src] = false
      reject(src)
    }
    img.src = src
  })
}

// 處理車款變更
const handleModelChange = () => {
  imageLoading.value = true
  imageError.value = false
  const model = carModels.find(m => m.name === selectedModelName.value) || null
  selectedModel.value = model

  // 預載入新選擇的圖片
  if (model && model.displayImage) {
    preloadImage(model.displayImage)
      .then(() => {
        imageLoading.value = false
      })
      .catch(() => {
        imageLoading.value = false
        imageError.value = true
      })
  }
}

// 預載入所有車款圖片
const preloadAllImages = async () => {
  const imagePromises = carModels.map(model =>
    preloadImage(model.displayImage).catch(() => null)
  )
  await Promise.allSettled(imagePromises)
}

const showResults = computed(() => {
  return selectedModel.value && selectedYear.value && purchaseMonth.value && purchaseYear.value
})

// 計算當前步驟
const currentStep = computed(() => {
  if (!selectedModel.value) return 1
  if (!selectedYear.value || !purchaseMonth.value || !purchaseYear.value) return 2
  return 3
})

// 計算進度百分比
const progressPercentage = computed(() => {
  let progress = 0

  // 步驟 1: 選擇車型
  if (selectedModel.value) progress += 33

  // 步驟 2: 設定年份和購入時間
  if (selectedYear.value && purchaseMonth.value && purchaseYear.value) progress += 34

  // 步驟 3: 完成所有填寫
  if (showResults.value) progress += 33

  return Math.min(progress, 100)
})

// 預算反饋
const budgetFeedback = computed(() => {
  if (budget.value < 30000) {
    return {
      icon: '⚠️',
      message: '建議提高預算以獲得更全面保障',
      bgClass: 'bg-yellow-900/20 border border-yellow-700/30',
      textClass: 'text-yellow-300'
    }
  } else if (budget.value >= 30000 && budget.value <= 60000) {
    return {
      icon: '✅',
      message: '此預算可獲得完整保障方案',
      bgClass: 'bg-green-900/20 border border-green-700/30',
      textClass: 'text-green-300'
    }
  } else {
    return {
      icon: '⭐',
      message: '您可享有頂級全方位保障',
      bgClass: 'bg-blue-900/20 border border-blue-700/30',
      textClass: 'text-blue-300'
    }
  }
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

// 組件掛載時初始化
onMounted(async () => {
  // 設定預設車款為 Model 3
  handleModelChange()

  // 背景預載入所有圖片（不阻塞）
  preloadAllImages()
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

/* 賽車遊戲風格 - 車輛從右側滑入動畫 */
.slide-in-right-enter-active {
  animation: slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-in-right-leave-active {
  animation: slideOutToLeft 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(120%) scale(0.8);
    opacity: 0;
  }
  60% {
    transform: translateX(-5%) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes slideOutToLeft {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-120%) scale(0.8);
    opacity: 0;
  }
}
</style>

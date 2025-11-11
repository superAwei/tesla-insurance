<template>
  <section id="calculator" class="calculator-section section-padding bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">保險方案試算</h2>
        <p class="text-xl text-gray-600">選擇您的愛車，立即取得專屬報價</p>
      </div>

      <div class="calculator-container">

        <!-- 稀缺性提示區塊 -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <!-- 限定優惠 -->
          <div class="flex items-center gap-2 bg-tesla-red/5 px-4 py-3 rounded-lg border border-tesla-red/20">
            <span class="text-2xl" role="img" aria-label="時間限制">⏰</span>
            <p class="text-sm md:text-base text-gray-700">
              本月限定: 填寫表單即送<span class="text-tesla-red font-semibold">『特斯拉車險完整指南』</span>電子書
            </p>
          </div>

          <!-- 今日人數 -->
          <div class="flex items-center gap-2 text-sm md:text-base text-gray-600">
            <span class="text-xl" role="img" aria-label="用戶人數">👥</span>
            <span>今日已有 <span class="text-tesla-red font-bold text-lg">{{ todayConsultations }}</span> 位車主填寫諮詢</span>
          </div>
        </div>

        <!-- Step 1: Car Model Selection -->
        <div class="mb-8">
          <label class="block text-lg md:text-xl font-semibold mb-4 text-gray-900">選擇車型</label>

          <!-- 下拉選單 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <!-- 左側：下拉選單 -->
            <div>
              <select
                v-model="selectedModelName"
                @change="handleModelChange"
                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 text-base
                       focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all
                       cursor-pointer hover:border-gray-400">
                <option value="">請選擇您的特斯拉車款</option>
                <option v-for="model in carModels" :key="model.name" :value="model.name">
                  {{ model.name }}
                </option>
              </select>

              <!-- 車款資訊 -->
              <div v-if="selectedModel" class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 class="text-lg font-bold text-gray-900">{{ selectedModel.name }}</h3>
              </div>
            </div>

            <!-- 右側：車輛展示區 -->
            <div class="relative h-48 md:h-64 flex items-center justify-center">

              <!-- Loading Skeleton -->
              <div v-if="imageLoading && selectedModel" class="absolute inset-0 flex items-center justify-center">
                <div class="animate-pulse flex flex-col items-center gap-4">
                  <div class="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-lg"></div>
                  <div class="w-24 h-3 bg-gray-100 rounded"></div>
                </div>
              </div>

              <!-- Error Fallback -->
              <div v-else-if="imageError && selectedModel" class="text-center text-gray-400">
                <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-sm text-gray-600">圖片載入失敗</p>
                <p class="text-xs mt-1 text-gray-500">{{ selectedModel.name }}</p>
              </div>

              <!-- 預設提示 -->
              <div v-else-if="!selectedModel" class="text-center text-gray-400">
                <svg class="w-20 h-20 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <p class="text-base text-gray-400">選擇車款以預覽</p>
              </div>

              <!-- 車輛圖片 - 從右側滑入 -->
              <transition name="slide-in-right">
                <div v-if="selectedModel && !imageLoading && !imageError"
                     :key="selectedModel.name"
                     class="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    :src="selectedModel.displayImage"
                    :alt="`${selectedModel.name} - ${selectedModel.type}`"
                    class="w-full h-full object-contain filter drop-shadow-lg vehicle-image"
                    style="max-width: 100%; max-height: 100%;"
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
          <label class="block text-base md:text-lg font-semibold mb-3 text-gray-900">車款年份</label>
          <select
            v-model="selectedYear"
            class="w-full md:w-64 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
            <option value="">請選擇年份</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }} 年</option>
          </select>
        </div>

        <!-- Step 3: Purchase Date -->
        <div class="mb-6">
          <label class="block text-base md:text-lg font-semibold mb-3 text-gray-900">購入時間</label>
          <div class="flex gap-3">
            <select
              v-model="purchaseMonth"
              class="flex-1 md:flex-none md:w-40 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
              <option value="">月份</option>
              <option v-for="month in 12" :key="month" :value="month">{{ month }} 月</option>
            </select>
            <select
              v-model="purchaseYear"
              class="flex-1 md:flex-none md:w-40 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all">
              <option value="">年份</option>
              <option v-for="year in purchaseYears" :key="year" :value="year">{{ year }} 年</option>
            </select>
          </div>
        </div>

        <!-- Step 4: Budget Slider -->
        <div class="mb-8">
          <label class="block text-base md:text-lg font-semibold mb-3 text-gray-900">
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
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
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
        <div v-if="showResults" class="commitment-section mb-6 p-4 md:p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <h4 class="text-base md:text-lg font-semibold text-green-700 mb-3 text-center">安心保證</h4>
          <div class="grid md:grid-cols-3 gap-3">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs md:text-sm text-gray-700">免費諮詢，無購買壓力</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs md:text-sm text-gray-700">隱私保護，絕不騷擾</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs md:text-sm text-gray-700">24小時內專人回覆</span>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div v-if="showResults" class="results-panel bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 md:p-6 border border-tesla-red/30">
          <h3 class="text-xl md:text-2xl font-bold mb-4 text-tesla-red">推薦保險方案</h3>

          <div class="grid md:grid-cols-2 gap-4 mb-5">
            <div class="bg-white/60 p-4 rounded-lg border border-gray-200">
              <h4 class="font-semibold text-base mb-2 text-gray-900">車輛資訊</h4>
              <p class="text-gray-700 text-sm">{{ selectedModel.name }} {{ selectedYear }}</p>
              <p class="text-xs text-gray-500">購入時間：{{ purchaseYear }}/{{ purchaseMonth }}</p>
            </div>
            <div class="bg-white/60 p-4 rounded-lg border border-gray-200">
              <h4 class="font-semibold text-base mb-2 text-gray-900">預估保費</h4>
              <p class="text-2xl md:text-3xl font-bold text-tesla-red">NT$ {{ budget.toLocaleString() }}</p>
              <p class="text-xs text-gray-500">年繳保費</p>
            </div>
          </div>

          <div class="coverage-list">
            <h4 class="font-semibold text-base md:text-lg mb-3 text-gray-900">保障內容</h4>
            <div class="grid md:grid-cols-2 gap-2">
              <div v-for="item in coverageItems" :key="item" class="flex items-center gap-2">
                <svg class="w-4 h-4 text-tesla-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-700 text-sm">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useVehicleData } from '../composables/useVehicleData'

// 使用車輛資料 composable
const { updateVehicleData } = useVehicleData()

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
    // 大圖展示用（白底車款圖片）
    displayImage: '/images/cars/model-3.png'
  },
  {
    name: 'Model Y',
    type: 'SUV',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=800&h=600&auto=format&fit=crop',
    displayImage: '/images/cars/model-Y.png'
  },
  {
    name: 'Model S',
    type: '豪華轎車',
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=800&h=600&auto=format&fit=crop',
    displayImage: '/images/cars/model-S.png'
  },
  {
    name: 'Model X',
    type: '豪華 SUV',
    image: 'https://images.unsplash.com/photo-1583267746897-cb95d1d6b194?q=80&w=800&h=600&auto=format&fit=crop',
    displayImage: '/images/cars/model-X.png'
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

// 預算反饋
const budgetFeedback = computed(() => {
  if (budget.value < 30000) {
    return {
      icon: '⚠️',
      message: '建議提高預算以獲得更全面保障',
      bgClass: 'bg-yellow-50 border border-yellow-200',
      textClass: 'text-yellow-700'
    }
  } else if (budget.value >= 30000 && budget.value <= 60000) {
    return {
      icon: '✅',
      message: '此預算可獲得完整保障方案',
      bgClass: 'bg-green-50 border border-green-200',
      textClass: 'text-green-700'
    }
  } else {
    return {
      icon: '⭐',
      message: '您可享有頂級全方位保障',
      bgClass: 'bg-blue-50 border border-blue-200',
      textClass: 'text-blue-700'
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

// 監聽車輛資料變化，自動同步到共享狀態
watch([selectedModel, selectedYear, purchaseMonth, purchaseYear], () => {
  updateVehicleData({
    modelName: selectedModel.value?.name || '',
    modelType: selectedModel.value?.type || '',
    year: selectedYear.value,
    purchaseMonth: purchaseMonth.value,
    purchaseYear: purchaseYear.value
  })
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
  transition: opacity 0.2s ease-out;
  opacity: 0;
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

/* 車輛圖片統一大小設定 */
.vehicle-image {
  /* 確保所有車款圖片視覺大小一致 */
  min-width: 85%;
  min-height: 85%;
  /* 保持圖片比例，不變形 */
  object-fit: contain;
  /* 讓圖片盡可能填滿容器 */
  object-position: center;
}

/* 針對不同螢幕尺寸調整 */
@media (max-width: 768px) {
  .vehicle-image {
    min-width: 90%;
    min-height: 90%;
  }
}
</style>

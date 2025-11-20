<template>
  <section id="calculator" class="calculator-section section-padding bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">取得您的專屬 Tesla 保險方案</h2>
        <p class="text-xl text-gray-600">三步驟取得最適合的保障</p>
      </div>

      <div class="calculator-container">

        <!-- 稀缺性提示區塊 -->
        <div class="flex justify-center items-center mb-8 pb-6 border-b border-gray-200">
          <!-- 今日人數 -->
          <div class="flex items-center gap-2 text-sm md:text-base text-gray-600">
            <span class="text-xl" role="img" aria-label="用戶人數">👥</span>
            <span>今日已有 <span class="text-tesla-red font-bold text-lg">{{ todayConsultations }}</span> 位車主填寫諮詢</span>
          </div>
        </div>

        <!-- Step 1: Car Model Selection -->
        <div class="mb-8">
          <label class="block text-lg md:text-xl font-semibold mb-4 text-gray-900">
            <span class="inline-flex items-center gap-2">
              <span class="step-number">①</span>
              選擇您的 Tesla 車型
            </span>
          </label>

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

        <!-- Year Selection -->
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

        <!-- Step 2: Budget Slider -->
        <div class="mb-8">
          <label class="block text-base md:text-lg font-semibold mb-3 text-gray-900">
            <span class="inline-flex items-center gap-2 mb-2">
              <span class="step-number">②</span>
              您的預算範圍
            </span>
            <div class="mt-2">
              <span class="text-gray-700 text-base">保費預算</span>
              <span class="text-tesla-red ml-3 text-2xl md:text-3xl font-bold">NT$ {{ budget.toLocaleString() }}</span>
            </div>
          </label>
          <div class="relative pt-2">
            <input
              type="range"
              v-model="budget"
              min="30000"
              max="100000"
              step="5000"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div class="flex justify-between text-sm text-gray-500 mt-2">
              <span>NT$ 30,000</span>
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

          <!-- 免責聲明 -->
          <p class="text-sm text-gray-300 text-center mt-4">
            * Tesla 車險需人工審核,最終保費以保險公司核保結果為準
          </p>
        </div>

        <!-- Step 3: Contact Information -->
        <div class="mt-10 pt-8 border-t border-gray-200">
          <div class="mb-6">
            <h3 class="text-lg md:text-xl font-semibold text-gray-900">
              <span class="inline-flex items-center gap-2">
                <span class="step-number">③</span>
                留下聯絡方式，我們提供專屬方案
              </span>
            </h3>
            <p class="text-sm text-gray-600 mt-2">填寫以下資訊，專業顧問將在 24 小時內與您聯繫</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- 稱謂 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                稱謂 <span class="text-tesla-red">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.title"
                  @blur="validateField('title')"
                  @change="validateField('title')"
                  :class="getFieldClass('title')"
                  class="w-full px-4 py-3 bg-gray-50 border-2 rounded-lg text-gray-900 text-base
                         focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all pr-12">
                  <option value="">請選擇</option>
                  <option value="先生">先生</option>
                  <option value="小姐">小姐</option>
                </select>
                <!-- 驗證圖標 -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg v-if="validFields.title" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p v-if="errors.title" class="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.title }}
              </p>
            </div>

            <!-- 姓名 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                姓名 <span class="text-tesla-red">*</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="formData.name"
                  @blur="validateField('name')"
                  @input="clearError('name')"
                  :class="getFieldClass('name')"
                  placeholder="請輸入您的姓名"
                  class="w-full px-4 py-3 bg-gray-50 border-2 rounded-lg text-gray-900 text-base
                         focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all pr-12"
                />
                <!-- 驗證圖標 -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg v-if="validFields.name" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p v-if="errors.name" class="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.name }}
              </p>
            </div>

            <!-- 手機號碼 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                手機號碼 <span class="text-tesla-red">*</span>
              </label>
              <div class="relative">
                <input
                  type="tel"
                  v-model="formData.phone"
                  @blur="validateField('phone')"
                  @input="clearError('phone')"
                  :class="getFieldClass('phone')"
                  placeholder="09xxxxxxxx"
                  maxlength="10"
                  class="w-full px-4 py-3 bg-gray-50 border-2 rounded-lg text-gray-900 text-base
                         focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all pr-12"
                />
                <!-- 驗證圖標 -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg v-if="validFields.phone" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p v-if="errors.phone" class="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.phone }}
              </p>
            </div>

            <!-- LINE ID (選填) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                LINE ID <span class="text-gray-400 text-xs">(選填)</span>
              </label>
              <input
                type="text"
                v-model="formData.lineId"
                placeholder="方便我們透過 LINE 聯繫您"
                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 text-base
                       focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
              />
            </div>

            <!-- 方便聯絡時段 -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                方便聯絡時段 <span class="text-tesla-red">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.contactTime"
                  @blur="validateField('contactTime')"
                  @change="validateField('contactTime')"
                  :class="getFieldClass('contactTime')"
                  class="w-full px-4 py-3 bg-gray-50 border-2 rounded-lg text-gray-900 text-base
                         focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all pr-12">
                  <option value="">請選擇</option>
                  <option value="平日白天">平日白天 (9:00-18:00)</option>
                  <option value="平日晚上">平日晚上 (18:00-21:00)</option>
                  <option value="週末">週末 (9:00-18:00)</option>
                </select>
                <!-- 驗證圖標 -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg v-if="validFields.contactTime" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p v-if="errors.contactTime" class="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.contactTime }}
              </p>
            </div>

          </div>

          <!-- Submit Button -->
          <div class="mt-8">
            <button
              @click="handleSubmit"
              :disabled="isSubmitting"
              class="w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-tesla-red to-red-600 text-white rounded-lg
                     hover:from-red-600 hover:to-tesla-red transition-all duration-300 transform hover:scale-[1.02]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl
                     relative overflow-hidden group">
              <span class="relative z-10 flex items-center justify-center gap-2">
                <span v-if="!isSubmitting">取得專屬報價方案</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>送出中...</span>
                </span>
              </span>
            </button>

            <!-- Trust Indicators -->
            <div class="mt-4 text-center text-sm text-gray-600">
              <div class="flex items-center justify-center gap-4 flex-wrap mb-3">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  免費諮詢
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  1-2個工作天回覆
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  資料保密
                </span>
              </div>
              <p class="text-xs text-gray-400">
                * 保費試算僅供參考,實際費用以保險公司審核為準
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message Overlay -->
    <div v-if="showSuccess" class="success-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="success-message bg-white rounded-2xl p-8 md:p-12 max-w-md mx-4 text-center shadow-2xl transform animate-scale-in">
        <div class="success-checkmark mb-6">
          <svg class="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">已收到您的需求！</h3>
        <p class="text-lg text-gray-700 mb-2">我們會在 24 小時內聯繫您</p>
        <p class="text-sm text-gray-500">請留意您的手機來電</p>
        <button
          @click="closeSuccessMessage"
          class="mt-6 px-6 py-2 bg-tesla-red text-white rounded-lg hover:bg-red-600 transition-colors">
          關閉
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useVehicleData } from '../composables/useVehicleData'
import emailjs from '@emailjs/browser'

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

// 設定預設值
const selectedModelName = ref('Model 3')
const selectedModel = ref(null)
const selectedYear = ref('2024')
const budget = ref(50000)

// 聯絡表單資料
const formData = reactive({
  title: '',
  name: '',
  phone: '',
  lineId: '',
  contactTime: '',
  referrer: ''
})

// 表單驗證狀態
const errors = reactive({
  title: '',
  name: '',
  phone: '',
  contactTime: ''
})

const validFields = reactive({
  title: false,
  name: false,
  phone: false,
  contactTime: false
})

// 表單提交狀態
const isSubmitting = ref(false)
const showSuccess = ref(false)

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

  // Google Analytics 事件追蹤 - 車型選擇
  if (model && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'model_select', {
      'event_category': 'engagement',
      'event_label': 'car_model',
      'value': model.name
    })
  }

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
  return selectedModel.value && selectedYear.value
})

// 預算反饋
const budgetFeedback = computed(() => {
  if (budget.value < 40000) {
    return {
      icon: '⚠️',
      message: '提醒:Tesla 車險保費通常在 4 萬元以上,低於此金額可能較難找到承保方案',
      bgClass: 'bg-amber-100 border-l-4 border-amber-500',
      textClass: 'text-amber-800'
    }
  } else if (budget.value >= 40000 && budget.value < 50000) {
    return {
      icon: '💡',
      message: '此預算可提供基本保障,如需更完整方案建議提高至 5 萬元以上',
      bgClass: 'bg-blue-100 border-l-4 border-blue-500',
      textClass: 'text-blue-800'
    }
  } else if (budget.value >= 50000 && budget.value < 70000) {
    return {
      icon: '✓',
      message: '此預算可獲得完整保障方案',
      bgClass: 'bg-green-100 border-l-4 border-green-500',
      textClass: 'text-green-800'
    }
  } else {
    return {
      icon: '⭐',
      message: '優質預算!可獲得全方位保障與最佳理賠條件',
      bgClass: 'bg-yellow-100 border-l-4 border-yellow-500',
      textClass: 'text-yellow-800'
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

// 表單驗證函數
const validateField = (field) => {
  switch (field) {
    case 'title':
      if (!formData.title) {
        errors.title = '請選擇稱謂'
        validFields.title = false
      } else {
        errors.title = ''
        validFields.title = true
      }
      break

    case 'name':
      if (!formData.name.trim()) {
        errors.name = '請輸入姓名'
        validFields.name = false
      } else if (formData.name.trim().length < 2) {
        errors.name = '姓名至少需要 2 個字'
        validFields.name = false
      } else {
        errors.name = ''
        validFields.name = true
      }
      break

    case 'phone':
      const phoneRegex = /^09\d{8}$/
      const cleanPhone = formData.phone.replace(/[-\s]/g, '')
      if (!cleanPhone) {
        errors.phone = '請輸入手機號碼'
        validFields.phone = false
      } else if (!phoneRegex.test(cleanPhone)) {
        errors.phone = '請輸入有效的手機號碼 (09開頭，共10位數字)'
        validFields.phone = false
      } else {
        errors.phone = ''
        validFields.phone = true
        // 自動格式化電話號碼
        formData.phone = cleanPhone
      }
      break

    case 'contactTime':
      if (!formData.contactTime) {
        errors.contactTime = '請選擇方便聯絡的時段'
        validFields.contactTime = false
      } else {
        errors.contactTime = ''
        validFields.contactTime = true
      }
      break
  }
}

// 清除錯誤訊息
const clearError = (field) => {
  errors[field] = ''
}

// 取得欄位的 class
const getFieldClass = (field) => {
  if (errors[field]) {
    return 'border-red-500'
  } else if (validFields[field]) {
    return 'border-green-500'
  } else {
    return 'border-gray-300'
  }
}

// 驗證所有欄位
const validateForm = () => {
  validateField('title')
  validateField('name')
  validateField('phone')
  validateField('contactTime')

  return validFields.title && validFields.name && validFields.phone && validFields.contactTime
}

// 處理表單提交
const handleSubmit = async () => {
  // 先驗證表單
  if (!validateForm()) {
    // 捲動到第一個錯誤欄位
    const firstError = Object.keys(errors).find(key => errors[key])
    if (firstError) {
      const element = document.querySelector(`[name="${firstError}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.focus()
      }
    }
    return
  }

  // 檢查車型和年份是否已選擇
  if (!selectedModel.value || !selectedYear.value) {
    alert('請先選擇車型和年份')
    return
  }

  isSubmitting.value = true

  try {
    // 準備 EmailJS 模板參數
    const templateParams = {
      from_name: formData.name,
      title: formData.title,
      phone: formData.phone,
      line_id: formData.lineId || '未提供',
      contact_time: formData.contactTime,
      referrer: formData.referrer || '無',
      car_model: selectedModel.value.name,
      car_year: selectedYear.value,
      budget_range: `NT$ ${budget.value.toLocaleString()}`,
      submission_time: new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }

    console.log('準備發送 Email，資料:', templateParams)

    // 發送 Email
    const response = await emailjs.send(
      'service_888',           // Service ID
      'template_c4rbkhg',      // Template ID
      templateParams,
      'EsPjaV71G8VIxLRNz'      // Public Key
    )

    console.log('Email 發送成功:', response)

    // Google Analytics 事件追蹤
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': 'insurance_inquiry',
        'value': 1
      })
    }

    // 顯示成功訊息
    showSuccess.value = true

    // 重置表單
    formData.title = ''
    formData.name = ''
    formData.phone = ''
    formData.lineId = ''
    formData.contactTime = ''
    formData.referrer = ''

    // 重置驗證狀態
    Object.keys(errors).forEach(key => {
      errors[key] = ''
      validFields[key] = false
    })

  } catch (error) {
    console.error('Email 發送失敗:', error)

    // 顯示友善的錯誤訊息
    let errorMessage = '✗ 發送失敗，請稍後再試或直接來電'

    if (error.text) {
      console.error('錯誤詳情:', error.text)
    }

    alert(errorMessage)
  } finally {
    isSubmitting.value = false
  }
}

// 關閉成功訊息
const closeSuccessMessage = () => {
  showSuccess.value = false
  // 滾動到頁面頂部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 組件掛載時初始化
onMounted(async () => {
  // 設定預設車款為 Model 3
  handleModelChange()

  // 背景預載入所有圖片（不阻塞）
  preloadAllImages()
})

// 監聽車輛資料變化，自動同步到共享狀態
watch([selectedModel, selectedYear], () => {
  updateVehicleData({
    modelName: selectedModel.value?.name || '',
    modelType: selectedModel.value?.type || '',
    year: selectedYear.value
  })
})

// 監聽預算變化，用於 GA 追蹤
watch(budget, (newBudget, oldBudget) => {
  // 只在實際變化時追蹤（避免初始化時觸發）
  if (oldBudget && newBudget !== oldBudget && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'budget_select', {
      'event_category': 'engagement',
      'event_label': 'budget_slider',
      'value': parseInt(newBudget)
    })
  }
})
</script>

<style scoped>
/* Step number styling */
.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #E82127 0%, #ff4146 100%);
  color: white;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(232, 33, 39, 0.3);
}

.step-number-small {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #E82127 0%, #ff4146 100%);
  color: white;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(232, 33, 39, 0.3);
}

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

/* Success message animation */
@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
</style>

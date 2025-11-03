<template>
  <section class="contact-section section-padding bg-tesla-dark">
    <div class="max-w-4xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <div class="inline-block mb-4">
          <span class="text-tesla-red text-sm md:text-base font-semibold tracking-wider uppercase">Contact Us</span>
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">立即取得免費報價</h2>
        <p class="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          24 小時內專人為您規劃最適合的保險方案
        </p>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="success-message bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/50 rounded-2xl p-8 md:p-10 mb-8 text-center backdrop-blur-sm">
        <div class="success-checkmark mb-6">
          <svg class="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-green-400 mb-3">感謝您！</h3>
        <p class="text-lg text-gray-300 mb-2">我們會在 24 小時內與您聯繫</p>
        <p class="text-sm text-gray-400">請留意您的手機和 Email</p>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="contact-form bg-tesla-gray/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">
        <!-- Name -->
        <div class="mb-6">
          <label for="name" class="block text-base md:text-lg font-semibold mb-2">
            姓名 <span class="text-tesla-red">*</span>
          </label>
          <div class="relative">
            <input
              id="name"
              v-model="formData.name"
              @blur="validateField('name')"
              @input="clearError('name')"
              type="text"
              required
              class="w-full px-4 md:px-6 py-3 md:py-4 bg-tesla-gray border rounded-lg text-white
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all pr-12"
              :class="getFieldClass('name')"
              placeholder="請輸入您的姓名"
            />
            <!-- 驗證圖標 -->
            <div class="absolute right-4 top-1/2 -translate-y-1/2">
              <svg v-if="validFields.name" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p v-if="errors.name" class="text-red-400 text-sm mt-2 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.name }}
          </p>
        </div>

        <!-- Phone -->
        <div class="mb-6">
          <label for="phone" class="block text-base md:text-lg font-semibold mb-2">
            手機號碼 <span class="text-tesla-red">*</span>
          </label>
          <div class="relative">
            <input
              id="phone"
              v-model="formData.phone"
              @blur="validateField('phone')"
              @input="clearError('phone')"
              type="tel"
              required
              class="w-full px-4 md:px-6 py-3 md:py-4 bg-tesla-gray border rounded-lg text-white
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all pr-12"
              :class="getFieldClass('phone')"
              placeholder="0912345678"
            />
            <!-- 驗證圖標 -->
            <div class="absolute right-4 top-1/2 -translate-y-1/2">
              <svg v-if="validFields.phone" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p v-if="errors.phone" class="text-red-400 text-sm mt-2 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.phone }}
          </p>
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label for="email" class="block text-base md:text-lg font-semibold mb-2">
            Email <span class="text-tesla-red">*</span>
          </label>
          <div class="relative">
            <input
              id="email"
              v-model="formData.email"
              @blur="validateField('email')"
              @input="clearError('email')"
              type="email"
              required
              class="w-full px-4 md:px-6 py-3 md:py-4 bg-tesla-gray border rounded-lg text-white
                     focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all pr-12"
              :class="getFieldClass('email')"
              placeholder="example@email.com"
            />
            <!-- 驗證圖標 -->
            <div class="absolute right-4 top-1/2 -translate-y-1/2">
              <svg v-if="validFields.email" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p v-if="errors.email" class="text-red-400 text-sm mt-2 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.email }}
          </p>
        </div>

        <!-- Car Info (Auto-filled from calculator if available) -->
        <div class="mb-6">
          <label for="carInfo" class="block text-base md:text-lg font-semibold mb-2">
            車輛資訊
          </label>
          <input
            id="carInfo"
            v-model="formData.carInfo"
            type="text"
            class="w-full px-4 md:px-6 py-3 md:py-4 bg-tesla-gray border border-gray-600 rounded-lg text-white
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
            placeholder="例：Model 3 2023"
          />
        </div>

        <!-- Message -->
        <div class="mb-8">
          <label for="message" class="block text-base md:text-lg font-semibold mb-2">
            備註
          </label>
          <textarea
            id="message"
            v-model="formData.message"
            rows="5"
            class="w-full px-4 md:px-6 py-3 md:py-4 bg-tesla-gray border border-gray-600 rounded-lg text-white resize-none
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
            placeholder="請告訴我們您的需求或問題..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full btn-primary text-base md:text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group">
          <span v-if="!isSubmitting" class="relative z-10">立即取得免費報價</span>
          <span v-else class="flex items-center justify-center gap-3 relative z-10">
            <svg class="animate-spin h-5 w-5 md:h-6 md:h-6" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>送出中... 請稍候</span>
          </span>
          <!-- 按鈕背景動畫效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-tesla-red via-red-600 to-tesla-red bg-size-200 group-hover:bg-pos-100 transition-all duration-500"></div>
        </button>

        <!-- 隱私保證 -->
        <div class="mt-4 text-center">
          <p class="text-xs md:text-sm text-gray-400 flex items-center justify-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
            <span>您的資料僅用於本次諮詢，我們重視隱私保護</span>
          </p>
        </div>

        <!-- EmailJS Setup Notice -->
        <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p class="text-xs md:text-sm text-gray-400 text-center">
            💡 提示：此表單使用 EmailJS 服務。部署時需設定環境變數
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

const formData = reactive({
  name: '',
  phone: '',
  email: '',
  carInfo: '',
  message: ''
})

const errors = reactive({
  name: '',
  phone: '',
  email: ''
})

const validFields = reactive({
  name: false,
  phone: false,
  email: false
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

// 即時驗證單個欄位
const validateField = (field) => {
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = '請告訴我們怎麼稱呼您 😊'
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
        errors.phone = '請留下您的聯絡電話'
        validFields.phone = false
      } else if (!phoneRegex.test(cleanPhone)) {
        errors.phone = '請輸入有效的手機號碼唷 (例: 0912345678)'
        validFields.phone = false
      } else {
        errors.phone = ''
        validFields.phone = true
      }
      break

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email) {
        errors.email = '請提供您的 Email 地址'
        validFields.email = false
      } else if (!emailRegex.test(formData.email)) {
        errors.email = '請輸入有效的 Email 格式 (例: example@email.com)'
        validFields.email = false
      } else {
        errors.email = ''
        validFields.email = true
      }
      break
  }
}

// 清除錯誤訊息（使用者輸入時）
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
    return 'border-gray-600'
  }
}

const validateForm = () => {
  // 驗證所有欄位
  validateField('name')
  validateField('phone')
  validateField('email')

  // 檢查是否全部有效
  return validFields.name && validFields.phone && validFields.email
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // EmailJS configuration
    // NOTE: Replace these with your actual EmailJS credentials
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

    // If credentials are not set, simulate success for demo
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
      console.log('表單資料（示範模式）:', formData)
      await new Promise(resolve => setTimeout(resolve, 1500))
      showSuccess.value = true
      resetForm()
      return
    }

    // Send email via EmailJS
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        car_info: formData.carInfo || '未提供',
        message: formData.message || '無',
      },
      PUBLIC_KEY
    )

    showSuccess.value = true
    resetForm()

    // Auto hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('發送失敗:', error)
    alert('發送失敗，請稍後再試或直接聯繫我們')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.name = ''
  formData.phone = ''
  formData.email = ''
  formData.carInfo = ''
  formData.message = ''
}
</script>

<style scoped>
.success-message {
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 成功勾勾動畫 */
.success-checkmark svg {
  animation: checkmarkScale 0.6s ease-out;
}

@keyframes checkmarkScale {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 按鈕背景動畫 */
.bg-size-200 {
  background-size: 200% auto;
}

.bg-pos-100 {
  background-position: 100% center;
}

/* 輸入框過渡效果 */
input, textarea {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>

<template>
  <section class="contact-section section-padding bg-tesla-dark">
    <div class="max-w-4xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">聯絡我們</h2>
        <p class="text-xl text-gray-400">填寫表單，我們將盡快與您聯繫</p>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccess" class="success-message bg-green-500/20 border border-green-500 rounded-lg p-6 mb-8 text-center">
        <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-2xl font-bold text-green-500 mb-2">感謝您的聯繫！</h3>
        <p class="text-gray-300">我們已收到您的訊息，將在 24 小時內與您聯繫。</p>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="contact-form bg-tesla-gray/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">
        <!-- Name -->
        <div class="mb-6">
          <label for="name" class="block text-lg font-semibold mb-2">
            姓名 <span class="text-tesla-red">*</span>
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="w-full px-6 py-4 bg-tesla-gray border rounded-lg text-white
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
            :class="errors.name ? 'border-red-500' : 'border-gray-600'"
            placeholder="請輸入您的姓名"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Phone -->
        <div class="mb-6">
          <label for="phone" class="block text-lg font-semibold mb-2">
            手機號碼 <span class="text-tesla-red">*</span>
          </label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            required
            class="w-full px-6 py-4 bg-tesla-gray border rounded-lg text-white
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
            :class="errors.phone ? 'border-red-500' : 'border-gray-600'"
            placeholder="0912-345-678"
          />
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label for="email" class="block text-lg font-semibold mb-2">
            Email <span class="text-tesla-red">*</span>
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full px-6 py-4 bg-tesla-gray border rounded-lg text-white
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
            :class="errors.email ? 'border-red-500' : 'border-gray-600'"
            placeholder="example@email.com"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Car Info (Auto-filled from calculator if available) -->
        <div class="mb-6">
          <label for="carInfo" class="block text-lg font-semibold mb-2">
            車輛資訊
          </label>
          <input
            id="carInfo"
            v-model="formData.carInfo"
            type="text"
            class="w-full px-6 py-4 bg-tesla-gray border border-gray-600 rounded-lg text-white
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
            placeholder="例：Model 3 2023"
          />
        </div>

        <!-- Message -->
        <div class="mb-8">
          <label for="message" class="block text-lg font-semibold mb-2">
            備註
          </label>
          <textarea
            id="message"
            v-model="formData.message"
            rows="5"
            class="w-full px-6 py-4 bg-tesla-gray border border-gray-600 rounded-lg text-white resize-none
                   focus:border-tesla-red focus:outline-none focus:ring-2 focus:ring-tesla-red/50 transition-all"
            placeholder="請告訴我們您的需求或問題..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed relative">
          <span v-if="!isSubmitting">送出表單</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            處理中...
          </span>
        </button>

        <!-- EmailJS Setup Notice -->
        <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p class="text-sm text-gray-400 text-center">
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

const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = () => {
  let isValid = true

  // Reset errors
  errors.name = ''
  errors.phone = ''
  errors.email = ''

  // Validate name
  if (!formData.name.trim()) {
    errors.name = '請輸入姓名'
    isValid = false
  }

  // Validate phone (Taiwan format)
  const phoneRegex = /^09\d{8}$/
  const cleanPhone = formData.phone.replace(/[-\s]/g, '')
  if (!cleanPhone) {
    errors.phone = '請輸入手機號碼'
    isValid = false
  } else if (!phoneRegex.test(cleanPhone)) {
    errors.phone = '請輸入有效的台灣手機號碼 (09xxxxxxxx)'
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email) {
    errors.email = '請輸入 Email'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = '請輸入有效的 Email 地址'
    isValid = false
  }

  return isValid
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
</style>

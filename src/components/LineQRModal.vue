<template>
  <!-- Modal 遮罩層 -->
  <transition name="modal-backdrop">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/70 z-[9998] flex items-center justify-center p-4"
      @click="closeModal">

      <!-- Modal 容器 -->
      <transition name="modal-content">
        <div
          v-if="isOpen"
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          @click.stop>

          <!-- 關閉按鈕 -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors duration-200"
            aria-label="關閉">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- 標題 -->
          <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">
            加入 LINE 官方帳號
          </h2>

          <!-- QR Code 區域 -->
          <div class="qr-code-container bg-gray-100 rounded-lg p-6 mb-6 flex flex-col items-center justify-center"
               style="min-height: 320px;">
            <!-- QR Code 圖片 -->
            <img
              :src="qrCodeImageUrl"
              alt="LINE 官方帳號 QR Code - @625xxgdn"
              loading="eager"
              class="qr-code-image"
            />
          </div>

          <!-- 說明文字 -->
          <div class="text-center mb-6">
            <p class="text-gray-600 flex items-center justify-center gap-2">
              <svg class="w-5 h-5 text-[#06C755]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              使用手機 LINE 掃描即可加入好友
            </p>
          </div>

          <!-- LINE ID 區域 -->
          <div
            @click="copyLineID"
            class="line-id-box bg-green-50 border-2 border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-100 hover:border-green-300 transition-all duration-200"
            :class="{ 'bg-green-200 border-green-400': copied }">
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-1">LINE ID</p>
              <p class="text-lg font-bold text-[#06C755]">{{ lineId }}</p>
              <p class="text-xs text-gray-500 mt-2">
                {{ copied ? '✓ 已複製!' : '點擊複製' }}
              </p>
            </div>
          </div>

        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const lineId = '@625xxgdn'
const copied = ref(false)
const qrCodeImageUrl = '/images/line-qrcode.png'

const closeModal = () => {
  emit('close')
}

const copyLineID = async () => {
  try {
    await navigator.clipboard.writeText(lineId)
    copied.value = true

    // 2秒後恢復
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('複製失敗:', err)
    // 降級方案：使用舊的方法
    const textArea = document.createElement('textarea')
    textArea.value = lineId
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// 監聽 ESC 鍵關閉
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEsc)
    document.body.style.overflow = ''
  }
})

const handleEsc = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}
</script>

<style scoped>
/* Modal 遮罩層動畫 */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

/* Modal 內容動畫 */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.qr-code-container {
  transition: all 0.3s ease;
}

/* QR Code 圖片樣式 */
.qr-code-image {
  width: 300px;
  height: 300px;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
  object-fit: contain;
  background: white;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.line-id-box {
  transition: all 0.2s ease;
}
</style>

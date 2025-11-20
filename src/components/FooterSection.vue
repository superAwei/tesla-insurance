<template>
  <footer class="footer-section bg-black border-t border-gray-800 py-12 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold mb-4">Tesla 車險服務</h3>
          <p class="text-gray-400 mb-4 max-w-md">
            專為特斯拉電動車車主提供最優質的保險服務，
            我們了解您的需求，為您量身打造最適合的保障方案。
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">快速連結</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-400 hover:text-tesla-red transition-colors">關於我們</a>
            </li>
            <li>
              <a href="#calculator" class="text-gray-400 hover:text-tesla-red transition-colors">保險試算</a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-tesla-red transition-colors">常見問題</a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-tesla-red transition-colors">隱私政策</a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4">聯絡資訊</h4>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a href="mailto:haoxianyouni@gmail.com" class="hover:text-tesla-red transition-colors">
                haoxianyouni@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Social Media -->
      <div class="border-t border-gray-800 pt-8 mb-8">
        <div class="flex justify-center">
          <button @click="handleLineClick" class="social-icon" aria-label="加入 LINE 官方帳號">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center text-gray-500 text-sm">
        <p>&copy; 2025 Tesla Insurance Service. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { inject } from 'vue'

// 從 App.vue 注入 handleLineClick 函數
const handleLineClick = inject('handleLineClick')
</script>

<style scoped>
.social-icon {
  @apply text-gray-400 hover:text-tesla-red transition-all duration-300 transform hover:scale-110;
}
</style>

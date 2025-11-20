<script setup>
import { ref, provide } from 'vue'
import HeaderNavigation from './components/HeaderNavigation.vue'
import HeroSection from './components/HeroSection.vue'
import PainPointsSection from './components/PainPointsSection.vue'
import ReferralBannerSection from './components/ReferralBannerSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import CalculatorSection from './components/CalculatorSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import SocialProofSection from './components/SocialProofSection.vue'
import FAQSection from './components/FAQSection.vue'
import ContactForm from './components/ContactForm.vue'
import FooterSection from './components/FooterSection.vue'
import LineQRModal from './components/LineQRModal.vue'

// LINE Modal 控制
const showLineModal = ref(false)
const lineUrl = 'https://line.me/R/ti/p/@625xxgdn'

// 處理 LINE 按鈕點擊
const handleLineClick = () => {
  // Google Analytics 事件追蹤 - LINE 按鈕點擊
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'line_click', {
      'event_category': 'engagement',
      'event_label': 'line_official'
    })
  }

  // 判斷是否為手機裝置 (< 768px)
  const isMobile = window.innerWidth < 768

  if (isMobile) {
    // 手機版：直接開啟 LINE App
    window.open(lineUrl, '_blank')
  } else {
    // 桌面版：顯示 QR Code Modal
    showLineModal.value = true
  }
}

// 關閉 Modal
const closeLineModal = () => {
  showLineModal.value = false
}

// 使用 provide 讓子組件可以使用 handleLineClick
provide('handleLineClick', handleLineClick)
</script>

<template>
  <div class="app">
    <!-- Skip to content link for keyboard navigation -->
    <a href="#main-content" class="skip-link">跳至主要內容</a>

    <!-- Top Navigation -->
    <HeaderNavigation />

    <HeroSection />
    <main id="main-content">
      <PainPointsSection />
      <ReferralBannerSection />
      <FeaturesSection />
      <CalculatorSection />
      <ProcessSection />
      <FAQSection />
      <SocialProofSection />
      <!-- ContactForm hidden - integrated into CalculatorSection -->
      <ContactForm v-if="false" />
    </main>
    <FooterSection />

    <!-- 浮動 LINE 按鈕 -->
    <button
      @click="handleLineClick"
      class="line-floating-btn"
      aria-label="加入 LINE 官方帳號">
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
    </button>

    <!-- LINE QR Code Modal -->
    <LineQRModal
      :is-open="showLineModal"
      @close="closeLineModal" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  overflow-x: hidden;
}

/* Skip to content link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #E82127;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: 600;
  z-index: 9999;
  border-radius: 0 0 4px 0;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid white;
  outline-offset: 2px;
}

/* 浮動 LINE 按鈕 */
.line-floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: #06C755; /* LINE 官方綠 */
  border-radius: 50%;
  border: none;
  box-shadow: 0 4px 12px rgba(6, 199, 85, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 998;
  transition: all 0.3s ease;
}

.line-floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(6, 199, 85, 0.6);
  background: #05b34b;
}

.line-floating-btn:active {
  transform: scale(1.05);
}

/* 手機版調整 */
@media (max-width: 768px) {
  .line-floating-btn {
    width: 56px;
    height: 56px;
    bottom: 16px;
    right: 16px;
  }
}
</style>

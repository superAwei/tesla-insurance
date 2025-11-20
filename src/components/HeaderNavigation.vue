<template>
  <header
    class="header-navigation fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{ 'header-scrolled': isScrolled }">
    <nav class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="flex items-center justify-between h-16 md:h-20">

        <!-- Logo / Brand -->
        <div class="flex-shrink-0">
          <a
            href="#"
            @click.prevent="scrollToTop"
            class="text-xl md:text-2xl font-bold text-white">
            Tesla 保險諮詢站
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="scrollToSection(item.id)"
            class="nav-link text-base font-medium text-gray-300 hover:text-white transition-all duration-300 relative"
            :class="{ 'active': activeSection === item.id }">
            {{ item.label }}
          </a>

          <!-- Referral Button -->
          <a
            href="#referral"
            @click.prevent="scrollToReferral"
            class="nav-referral-btn">
            <svg class="gift-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="10" width="18" height="12" rx="1"/>
              <rect x="3" y="10" width="18" height="4" rx="1"/>
              <line x1="12" y1="10" x2="12" y2="22"/>
              <path d="M12 10 C9 10, 9 6, 12 6 C15 6, 15 10, 12 10"/>
            </svg>
            <span>投保送$1000</span>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          aria-label="選單">
          <svg
            class="w-6 h-6 transition-transform duration-300"
            :class="{ 'rotate-90': isMobileMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Dropdown -->
    <transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden">
        <div class="px-6 py-4 space-y-3 bg-transparent backdrop-blur-xl">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="scrollToSection(item.id); toggleMobileMenu()"
            class="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            :class="{ 'bg-tesla-red/20 text-white': activeSection === item.id }">
            {{ item.label }}
          </a>

          <!-- Mobile Referral Button -->
          <a
            href="#referral"
            @click.prevent="scrollToReferral(); toggleMobileMenu()"
            class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-[#E31E2D] to-[#C41E3A] text-white hover:from-[#C41E3A] hover:to-[#A01828] transition-all duration-300">
            <svg class="gift-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="10" width="18" height="12" rx="1"/>
              <rect x="3" y="10" width="18" height="4" rx="1"/>
              <line x1="12" y1="10" x2="12" y2="22"/>
              <path d="M12 10 C9 10, 9 6, 12 6 C15 6, 15 10, 12 10"/>
            </svg>
            <span>投保送$1000</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('')

// 導航項目
const navItems = [
  { id: 'features', label: '關於我們' },
  { id: 'calculator', label: '保險試算' },
  { id: 'faq', label: '常見問題' }
]

// 滾動到頂部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isMobileMenuOpen.value = false
}

// 滾動到指定區塊
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 80 // 導航欄高度
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
  isMobileMenuOpen.value = false
}

// 切換移動選單
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 滾動到推薦區塊
const scrollToReferral = () => {
  // Google Analytics 事件追蹤 - 推薦按鈕點擊
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'referral_click', {
      'event_category': 'engagement',
      'event_label': 'referral_navigation'
    })
  }

  const faq = document.getElementById('faq')
  if (faq) {
    const headerOffset = 80
    const elementPosition = faq.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    // 稍微延遲後定位到推薦問題
    setTimeout(() => {
      const faqItems = document.querySelectorAll('.faq-item')
      if (faqItems[7]) {
        faqItems[7].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 800)
  }
  isMobileMenuOpen.value = false
}

// 監聽滾動事件
const handleScroll = () => {
  // 更新導航欄背景
  isScrolled.value = window.scrollY > 50

  // 更新當前活動區塊
  const sections = navItems.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  }))

  const scrollPosition = window.scrollY + 150

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section.element) {
      const sectionTop = section.element.offsetTop
      if (scrollPosition >= sectionTop) {
        activeSection.value = section.id
        break
      }
    }
  }

  // 如果在頁面頂部，清除活動狀態
  if (window.scrollY < 100) {
    activeSection.value = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始化檢查
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 完全透明毛玻璃導航欄 */
.header-navigation {
  /* 確保固定定位 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  /* 透明毛玻璃效果 */
  background: transparent;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  /* 移除所有邊框和陰影 */
  border: none;
  box-shadow: none;
}

/* 底部漸層羽化 - 自然過渡到透明 */
.header-navigation::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.01) 30%,
    transparent 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  pointer-events: none;
  z-index: -1;
  transition: all 0.3s ease;
}

/* 滾動時稍微加深背景 */
.header-scrolled {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
}

.header-scrolled::after {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.05) 30%,
    transparent 100%
  );
}

/* 導航連結底線動畫 */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 2px;
  background: #E82127;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  color: white;
}

/* 推薦按鈕樣式 */
.nav-referral-btn {
  background: linear-gradient(135deg, #E31E2D, #C41E3A);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 16px;
  white-space: nowrap;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.nav-referral-btn:hover {
  background: linear-gradient(135deg, #C41E3A, #A01828);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(227, 30, 45, 0.4);
}

/* 導航列禮物 Icon 樣式 */
.gift-icon-nav {
  width: 20px;
  height: 20px;
  color: #FFFFFF;
  stroke-width: 2;
  flex-shrink: 0;
}

/* 移動選單過渡動畫 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 防止移動選單打開時頁面滾動 */
body:has(.mobile-menu-open) {
  overflow: hidden;
}
</style>

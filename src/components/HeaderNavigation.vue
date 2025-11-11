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
            class="text-xl md:text-2xl font-bold text-white hover:text-tesla-red transition-colors duration-300">
            Tesla 保險專家
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
  { id: 'faq', label: '常見問題' },
  { id: 'contact', label: '聯絡我們' }
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
  background: rgba(0, 0, 0, 0.15);
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

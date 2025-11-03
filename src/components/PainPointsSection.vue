<template>
  <section class="pain-points-section section-padding bg-gradient-to-b from-black to-tesla-dark">
    <div class="max-w-5xl mx-auto">
      <!-- 深色卡片容器 -->
      <div class="pain-points-card bg-tesla-gray/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">

        <!-- 標題 -->
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-white">
          是否遇到這些困擾？
        </h2>

        <!-- 痛點列表 -->
        <div class="space-y-6 mb-10">
          <div
            v-for="(painPoint, index) in painPoints"
            :key="index"
            class="pain-point-item flex items-start gap-4 opacity-0"
            :class="{ 'animate-fade-in-left': visibleItems.includes(index) }"
            :style="{ 'animation-delay': `${index * 0.15}s` }"
            ref="painPointRefs">
            <!-- ❌ 圖標 -->
            <div class="flex-shrink-0 mt-1">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </div>
            <!-- 痛點文字 -->
            <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
              {{ painPoint }}
            </p>
          </div>
        </div>

        <!-- 分隔線 -->
        <div class="border-t border-gray-600/50 my-8 md:my-10"></div>

        <!-- 解決方案（綠色勾勾） -->
        <div
          class="solution-item flex items-center justify-center gap-4 opacity-0"
          :class="{ 'animate-fade-in-up': visibleItems.includes(4) }"
          ref="solutionRef">
          <!-- ✅ 圖標 -->
          <svg class="w-7 h-7 md:w-8 md:h-8 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <!-- 解決方案文字 -->
          <p class="text-xl md:text-2xl font-semibold text-green-400">
            讓專業保險經紀人為你量身規劃！
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const painPoints = [
  '特斯拉維修費用動輒數十萬，擔心保障不足？',
  '想找懂電動車的保險專家，而不是傳統業務員？',
  '各家保險公司方案看得眼花撩亂，不知如何選擇？',
  '不確定現有保單是否真的適合電動車？'
]

const visibleItems = ref([])
const painPointRefs = ref([])
const solutionRef = ref(null)
let observer = null

onMounted(() => {
  // 使用 Intersection Observer 監聽元素進入視窗
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 找出對應的 index
          const elements = [...painPointRefs.value, solutionRef.value]
          const index = elements.indexOf(entry.target)

          if (index !== -1 && !visibleItems.value.includes(index)) {
            visibleItems.value.push(index)
          }
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  // 觀察所有痛點項目
  setTimeout(() => {
    painPointRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })

    // 觀察解決方案項目
    if (solutionRef.value) {
      observer.observe(solutionRef.value)
    }
  }, 100)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* 從左側淡入動畫 */
.animate-fade-in-left {
  animation: fadeInLeft 0.6s ease-out forwards;
}

/* 從下方淡入動畫 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.6s;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover 效果 */
.pain-point-item {
  transition: transform 0.3s ease;
}

.pain-point-item:hover {
  transform: translateX(8px);
}

.solution-item {
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.solution-item:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.08) 100%);
  transform: scale(1.02);
}
</style>

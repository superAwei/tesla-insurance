import { reactive, computed } from 'vue'

// 全域共享的車輛資料狀態
const vehicleData = reactive({
  modelName: '',
  modelType: '',
  year: '',
  purchaseMonth: '',
  purchaseYear: ''
})

export function useVehicleData() {
  // 更新車輛資料
  const updateVehicleData = (data) => {
    if (data.modelName !== undefined) vehicleData.modelName = data.modelName
    if (data.modelType !== undefined) vehicleData.modelType = data.modelType
    if (data.year !== undefined) vehicleData.year = data.year
    if (data.purchaseMonth !== undefined) vehicleData.purchaseMonth = data.purchaseMonth
    if (data.purchaseYear !== undefined) vehicleData.purchaseYear = data.purchaseYear
  }

  // 清除車輛資料
  const clearVehicleData = () => {
    vehicleData.modelName = ''
    vehicleData.modelType = ''
    vehicleData.year = ''
    vehicleData.purchaseMonth = ''
    vehicleData.purchaseYear = ''
  }

  // 檢查是否有預填資料
  const hasVehicleData = computed(() => {
    return !!(vehicleData.modelName || vehicleData.year)
  })

  // 格式化的車輛資訊字串（用於表單顯示）
  const formattedVehicleInfo = computed(() => {
    const parts = []

    if (vehicleData.modelName) {
      parts.push(vehicleData.modelName)
    }

    if (vehicleData.year) {
      parts.push(vehicleData.year + '年')
    }

    if (vehicleData.purchaseYear && vehicleData.purchaseMonth) {
      parts.push(`(${vehicleData.purchaseYear}/${vehicleData.purchaseMonth} 購入)`)
    }

    return parts.length > 0 ? parts.join(' ') : ''
  })

  return {
    vehicleData,
    updateVehicleData,
    clearVehicleData,
    hasVehicleData,
    formattedVehicleInfo
  }
}

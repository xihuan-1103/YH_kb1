import { inspectionTypeStats, inspectionTaskCompletion, inspectionTrend, defectStats, bridgeDefectRanking } from '@/mock/inspection'

// 获取巡检类型统计
export function getInspectionTypeStats() {
  return Promise.resolve({
    code: 200,
    data: inspectionTypeStats
  })
}

// 获取巡检任务完成情况
export function getInspectionTaskCompletion() {
  return Promise.resolve({
    code: 200,
    data: inspectionTaskCompletion
  })
}

// 获取巡检趋势
export function getInspectionTrend() {
  return Promise.resolve({
    code: 200,
    data: inspectionTrend
  })
}

// 获取缺陷统计
export function getDefectStats() {
  return Promise.resolve({
    code: 200,
    data: defectStats
  })
}

// 获取桥梁缺陷排行
export function getBridgeDefectRanking() {
  return Promise.resolve({
    code: 200,
    data: bridgeDefectRanking
  })
}

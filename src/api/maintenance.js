import { constructionProjects, maintenanceRanking, maintenanceMonthlyTrend, maintenanceRepairStats, maintenanceRepairData } from '@/mock/maintenance'

// 获取施工项目统计
export function getConstructionProjects() {
  return Promise.resolve({
    code: 200,
    data: constructionProjects
  })
}

// 获取养护次数排名
export function getMaintenanceRanking() {
  return Promise.resolve({
    code: 200,
    data: maintenanceRanking
  })
}

// 获取养护月度趋势
export function getMaintenanceMonthlyTrend() {
  return Promise.resolve({
    code: 200,
    data: maintenanceMonthlyTrend
  })
}

// 获取养护维修统计
export function getMaintenanceRepairStats() {
  return Promise.resolve({
    code: 200,
    data: maintenanceRepairStats
  })
}

// 获取养护维修数据
export function getMaintenanceRepairData() {
  return Promise.resolve({
    code: 200,
    data: maintenanceRepairData
  })
}

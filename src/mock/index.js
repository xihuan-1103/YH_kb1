// Mock 数据入口 - 通过拦截 API 返回 mock 数据
// 此文件在 main.js 中引入，使 API 调用返回 mock 数据
// 后续接入真实后端时，只需移除 main.js 中的 import './mock' 即可

export { bridgeList, bridgeDetailMap, bridgeStatistics, comprehensiveIndicators, defectSummary, inspectionSummary, maintenanceProjectStats } from './bridge'
export { constructionProjects, maintenanceRanking, maintenanceMonthlyTrend, maintenanceRepairStats, maintenanceRepairData } from './maintenance'
export { inspectionTypeStats, inspectionTaskCompletion, inspectionTrend, defectStats, bridgeDefectRanking } from './inspection'

import { bridgeList, bridgeDetailMap, bridgeStatistics, comprehensiveIndicators, defectSummary, inspectionSummary, maintenanceProjectStats, roadList, roadDetailMap, roadStatistics, roadIndicators, roadConditionAssessment, pciRoadStats, tunnelList, tunnelDetailMap, tunnelDefectStats, tunnelMaintenanceProgress, tunnelInspectionStats, tunnelDefectFaultStats, tunnelPlanStats, tunnelMonitoringStats, tunnelElectromechanicalStats } from '@/mock/bridge'

// 获取桥梁列表
export function getBridgeList(params = {}) {
  return Promise.resolve({
    code: 200,
    data: params.keyword
      ? bridgeList.filter(b => b.name.includes(params.keyword))
      : bridgeList
  })
}

// 获取桥梁详情
export function getBridgeDetail(id) {
  const bridge = bridgeList.find(b => b.id === id)
  const detail = bridgeDetailMap[id] || {
    designInfo: { designUnit: '-', designLoad: '-', seismicGrade: '-' },
    maintenanceRecords: [],
    inspectionRecords: [],
    defectRecords: [],
    monitoringInfo: { hasMonitor: false, sensorCount: 0, lastDataTime: '-' }
  }
  return Promise.resolve({
    code: 200,
    data: { ...bridge, ...detail }
  })
}

// 获取桥梁统计
export function getBridgeStatistics() {
  return Promise.resolve({
    code: 200,
    data: bridgeStatistics
  })
}

// 获取综合指标
export function getComprehensiveIndicators() {
  return Promise.resolve({
    code: 200,
    data: comprehensiveIndicators
  })
}

// 获取病害汇总
export function getDefectSummary() {
  return Promise.resolve({
    code: 200,
    data: defectSummary
  })
}

// 获取巡检汇总
export function getInspectionSummary() {
  return Promise.resolve({
    code: 200,
    data: inspectionSummary
  })
}

// 获取养护工程统计
export function getMaintenanceProjectStats() {
  return Promise.resolve({
    code: 200,
    data: maintenanceProjectStats
  })
}

// 获取路面列表
export function getRoadList(params = {}) {
  return Promise.resolve({
    code: 200,
    data: params.keyword
      ? roadList.filter(r => r.name.includes(params.keyword))
      : roadList
  })
}

// 获取路面详情
export function getRoadDetail(id) {
  const road = roadList.find(r => r.id === id)
  const detail = roadDetailMap[id] || {
    basicInfo: { 
      designUnit: '-', 
      designLoad: '-', 
      designSpeed: '-',
      roadLength: '-',
      roadWidth: '-',
      lanes: '-',
      pavementType: '-',
      buildYear: '-',
      lastOverhaul: '-'
    },
    constructionRecords: [],
    inspectionRecords: [],
    defectLibrary: [],
    maintenanceRecords: []
  }
  return Promise.resolve({
    code: 200,
    data: { ...road, ...detail }
  })
}

// 获取路面统计
export function getRoadStatistics() {
  return Promise.resolve({
    code: 200,
    data: roadStatistics
  })
}

// 获取路面关键指标
export function getRoadIndicators() {
  return Promise.resolve({
    code: 200,
    data: roadIndicators
  })
}

// 获取总体路况评定
export function getRoadConditionAssessment() {
  return Promise.resolve({
    code: 200,
    data: roadConditionAssessment
  })
}

// 获取PCI路段里程占比
export function getPCIRoadStats() {
  return Promise.resolve({
    code: 200,
    data: pciRoadStats
  })
}

// 获取隧道列表
export function getTunnelList(params = {}) {
  return Promise.resolve({
    code: 200,
    data: params.keyword
      ? tunnelList.filter(t => t.name.includes(params.keyword))
      : tunnelList
  })
}

// 获取隧道详情
export function getTunnelDetail(id) {
  const tunnel = tunnelList.find(t => t.id === id)
  const detail = tunnelDetailMap[id] || {
    basicInfo: { 
      designUnit: '-', 
      designSpeed: '-', 
      tunnelLength: '-',
      tunnelWidth: '-',
      tunnelType: '-',
      buildYear: '-',
      lastOverhaul: '-'
    },
    maintenanceRecords: [],
    inspectionRecords: [],
    defectLibrary: [],
    monitoringInfo: { hasMonitor: false, sensorCount: 0, lastDataTime: '-' },
    electromechanicalInfo: { equipmentCount: 0, operationYears: 0, faultCount: 0, maintenanceRate: 0 }
  }
  return Promise.resolve({
    code: 200,
    data: { ...tunnel, ...detail }
  })
}

// 获取隧道病害分布统计
export function getTunnelDefectStats() {
  return Promise.resolve({
    code: 200,
    data: tunnelDefectStats
  })
}

// 获取隧道养护进度
export function getTunnelMaintenanceProgress() {
  return Promise.resolve({
    code: 200,
    data: tunnelMaintenanceProgress
  })
}

// 获取隧道巡检统计
export function getTunnelInspectionStats() {
  return Promise.resolve({
    code: 200,
    data: tunnelInspectionStats
  })
}

// 获取隧道病害/故障统计
export function getTunnelDefectFaultStats() {
  return Promise.resolve({
    code: 200,
    data: tunnelDefectFaultStats
  })
}

// 获取隧道计划统计
export function getTunnelPlanStats() {
  return Promise.resolve({
    code: 200,
    data: tunnelPlanStats
  })
}

// 获取隧道监测概况
export function getTunnelMonitoringStats() {
  return Promise.resolve({
    code: 200,
    data: tunnelMonitoringStats
  })
}

// 获取隧道机电统计
export function getTunnelElectromechanicalStats() {
  return Promise.resolve({
    code: 200,
    data: tunnelElectromechanicalStats
  })
}

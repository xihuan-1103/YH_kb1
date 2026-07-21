// 桥梁 Mock 数据 - 丽水地区
export const bridgeList = [
  {
    id: 'B001',
    name: '紫金大桥',
    lng: 119.9228,
    lat: 28.4672,
    bridgeType: '梁桥',
    structureType: '预应力混凝土连续梁',
    buildYear: 2005,
    bridgeAge: 21,
    span: '3×30m',
    length: 120,
    width: 12.5,
    maintenanceCategory: '一类',
    techGrade: '一等',
    lastInspectionDate: '2026-03-15',
    healthStatus: '良好',
    defectCount: 3,
    maintenanceCount: 8
  },
  {
    id: 'B002',
    name: '南明湖大桥',
    lng: 119.9125,
    lat: 28.4505,
    bridgeType: '拱桥',
    structureType: '钢筋混凝土拱桥',
    buildYear: 2010,
    bridgeAge: 16,
    span: '1×80m',
    length: 100,
    width: 15,
    maintenanceCategory: '二类',
    techGrade: '一等',
    lastInspectionDate: '2026-02-28',
    healthStatus: '良好',
    defectCount: 1,
    maintenanceCount: 5
  },
  {
    id: 'B003',
    name: '好溪大桥',
    lng: 119.7312,
    lat: 28.6523,
    bridgeType: '梁桥',
    structureType: '简支T梁',
    buildYear: 1998,
    bridgeAge: 28,
    span: '5×20m',
    length: 130,
    width: 10,
    maintenanceCategory: '三类',
    techGrade: '二等',
    lastInspectionDate: '2026-01-20',
    healthStatus: '一般',
    defectCount: 12,
    maintenanceCount: 15
  },
  {
    id: 'B004',
    name: '松阴溪大桥',
    lng: 119.4851,
    lat: 28.4492,
    bridgeType: '斜拉桥',
    structureType: '预应力混凝土斜拉桥',
    buildYear: 2015,
    bridgeAge: 11,
    span: '主跨168m',
    length: 380,
    width: 22,
    maintenanceCategory: '一类',
    techGrade: '一等',
    lastInspectionDate: '2026-03-01',
    healthStatus: '优秀',
    defectCount: 0,
    maintenanceCount: 3
  },
  {
    id: 'B005',
    name: '龙泉溪大桥',
    lng: 119.1416,
    lat: 28.0742,
    bridgeType: '梁桥',
    structureType: '预应力混凝土箱梁',
    buildYear: 2001,
    bridgeAge: 25,
    span: '4×25m',
    length: 120,
    width: 11,
    maintenanceCategory: '二类',
    techGrade: '二等',
    lastInspectionDate: '2026-02-10',
    healthStatus: '一般',
    defectCount: 7,
    maintenanceCount: 12
  },
  {
    id: 'B006',
    name: '仙都大桥',
    lng: 120.0872,
    lat: 28.6418,
    bridgeType: '拱桥',
    structureType: '石拱桥',
    buildYear: 1992,
    bridgeAge: 34,
    span: '1×50m',
    length: 68,
    width: 8,
    maintenanceCategory: '四类',
    techGrade: '三等',
    lastInspectionDate: '2026-03-20',
    healthStatus: '较差',
    defectCount: 18,
    maintenanceCount: 22
  },
  {
    id: 'B007',
    name: '云和湖大桥',
    lng: 119.5732,
    lat: 28.1158,
    bridgeType: '悬索桥',
    structureType: '自锚式悬索桥',
    buildYear: 2018,
    bridgeAge: 8,
    span: '主跨200m',
    length: 420,
    width: 24.5,
    maintenanceCategory: '一类',
    techGrade: '一等',
    lastInspectionDate: '2026-03-10',
    healthStatus: '优秀',
    defectCount: 0,
    maintenanceCount: 2
  },
  {
    id: 'B008',
    name: '遂昌大桥',
    lng: 119.2763,
    lat: 28.5927,
    bridgeType: '梁桥',
    structureType: '钢筋混凝土连续梁',
    buildYear: 2008,
    bridgeAge: 18,
    span: '6×25m',
    length: 180,
    width: 13,
    maintenanceCategory: '二类',
    techGrade: '一等',
    lastInspectionDate: '2026-02-25',
    healthStatus: '良好',
    defectCount: 4,
    maintenanceCount: 9
  }
]

// 桥梁详情（含养护/巡检/病害历史记录）
export const bridgeDetailMap = {
  B001: {
    designInfo: { designUnit: '浙江省交通规划设计研究院', designLoad: '公路-I级', seismicGrade: '7度' },
    maintenanceRecords: [
      { date: '2025-12-10', type: '日常养护', content: '桥面清扫、排水疏通', status: '已完成' },
      { date: '2025-09-05', type: '专项养护', content: '伸缩缝更换', status: '已完成' },
      { date: '2025-06-18', type: '日常养护', content: '护栏修复', status: '已完成' }
    ],
    inspectionRecords: [
      { date: '2026-03-15', type: '定期检查', inspector: '张工', result: '良好', score: 88 },
      { date: '2025-09-20', type: '经常检查', inspector: '李工', result: '良好', score: 85 },
      { date: '2025-03-10', type: '定期检查', inspector: '张工', result: '良好', score: 82 }
    ],
    defectRecords: [
      { id: 'D001', type: '裂缝', location: '主梁跨中', severity: '轻微', status: '已处置', date: '2025-06-10' },
      { id: 'D002', type: '渗水', location: '桥台背墙', severity: '中等', status: '已处置', date: '2025-08-15' },
      { id: 'D003', type: '混凝土剥落', location: '桥墩', severity: '轻微', status: '监测中', date: '2026-01-20' }
    ],
    monitoringInfo: { hasMonitor: true, sensorCount: 12, lastDataTime: '2026-04-13 10:00:00' }
  },
  B003: {
    designInfo: { designUnit: '丽水市公路设计院', designLoad: '汽-20', seismicGrade: '6度' },
    maintenanceRecords: [
      { date: '2026-01-05', type: '大修工程', content: '桥面铺装更换', status: '进行中' },
      { date: '2025-08-12', type: '专项养护', content: '支座更换', status: '已完成' },
      { date: '2025-05-20', type: '日常养护', content: '桥面病害修补', status: '已完成' }
    ],
    inspectionRecords: [
      { date: '2026-01-20', type: '特殊检查', inspector: '王工', result: '一般', score: 62 },
      { date: '2025-07-15', type: '定期检查', inspector: '赵工', result: '一般', score: 65 }
    ],
    defectRecords: [
      { id: 'D010', type: '裂缝', location: '主梁L/4处', severity: '严重', status: '已处置', date: '2025-05-10' },
      { id: 'D011', type: '钢筋锈蚀', location: '桥墩', severity: '中等', status: '处置中', date: '2025-11-20' },
      { id: 'D012', type: '支座脱空', location: '2#桥台', severity: '严重', status: '已处置', date: '2025-08-12' }
    ],
    monitoringInfo: { hasMonitor: true, sensorCount: 8, lastDataTime: '2026-04-13 09:30:00' }
  }
}

// 桥梁统计数据
export const bridgeStatistics = {
  total: 8,
  totalLength: 1518,
  byAge: [
    { range: '0-10年', count: 2 },
    { range: '10-20年', count: 3 },
    { range: '20-30年', count: 2 },
    { range: '30年以上', count: 1 }
  ],
  byType: [
    { type: '梁桥', count: 4 },
    { type: '拱桥', count: 2 },
    { type: '斜拉桥', count: 1 },
    { type: '悬索桥', count: 1 }
  ],
  byStructure: [
    { type: '预应力混凝土', count: 3 },
    { type: '钢筋混凝土', count: 3 },
    { type: '石拱', count: 1 },
    { type: '钢结构', count: 1 }
  ],
  byCategory: [
    { category: '一类', count: 3 },
    { category: '二类', count: 3 },
    { category: '三类', count: 1 },
    { category: '四类', count: 1 }
  ]
}

// 综合看板关键指标
export const comprehensiveIndicators = {
  bridgeTotal: 8,
  maintenanceTotal: 76,
  inspectionTotal: 156,
  defectTotal: 45,
  defectHandled: 38,
  defectPending: 7,
  healthExcellent: 2,
  healthGood: 3,
  healthNormal: 2,
  healthPoor: 1,
  // 跨径分类数据
  spanCategory: [
    { name: '小桥', value: 266 },
    { name: '中桥', value: 128 },
    { name: '大桥', value: 56 },
    { name: '特大桥', value: 23 }
  ],
  // 结构类型数据
  structureType: [
    { name: '梁式桥', value: 98 },
    { name: '斜拉桥', value: 1 },
    { name: '板拱桥', value: 2 },
    { name: '肋拱桥', value: 5 },
    { name: '箱形拱桥', value: 3 },
    { name: '双曲拱桥', value: 1 }
  ],
  // 桥龄数据
  bridgeAge: [
    { name: '<10年', value: 9, percent: 9 },
    { name: '10-20年', value: 37, percent: 37 },
    { name: '20-30年', value: 41, percent: 41 },
    { name: '>30年', value: 13, percent: 13 }
  ]
}

// 病害处置情况
export const defectSummary = {
  total: 45,
  handled: 38,
  pending: 7,
  byType: [
    { type: '裂缝', count: 15, handled: 13 },
    { type: '渗水', count: 8, handled: 7 },
    { type: '混凝土剥落', count: 7, handled: 6 },
    { type: '钢筋锈蚀', count: 5, handled: 4 },
    { type: '支座病害', count: 6, handled: 5 },
    { type: '其他', count: 4, handled: 3 }
  ]
}

// 巡检情况
export const inspectionSummary = {
  total: 156,
  completed: 148,
  completionRate: 94.9,
  monthlyTotal: 15,
  todayTotal: 3,
  // 巡检类型统计
  typeStats: [
    { name: '日常巡检', value: 85 },
    { name: '定期检查', value: 45 },
    { name: '特殊检查', value: 15 },
    { name: '专项检查', value: 11 }
  ],
  monthlyTrend: [
    { month: '2025-07', count: 12 },
    { month: '2025-08', count: 14 },
    { month: '2025-09', count: 11 },
    { month: '2025-10', count: 15 },
    { month: '2025-11', count: 13 },
    { month: '2025-12', count: 16 },
    { month: '2026-01', count: 10 },
    { month: '2026-02', count: 12 },
    { month: '2026-03', count: 15 },
    { month: '2026-04', count: 8 }
  ],
  // 巡检任务列表
  inspectionList: [
    { id: 'I001', bridgeName: '紫金大桥', type: '日常巡检', inspector: '张工', date: '2026-04-14', status: '已完成', result: '良好' },
    { id: 'I002', bridgeName: '南明湖大桥', type: '日常巡检', inspector: '李工', date: '2026-04-14', status: '已完成', result: '良好' },
    { id: 'I003', bridgeName: '好溪大桥', type: '定期检查', inspector: '王工', date: '2026-04-14', status: '进行中', result: '-' },
    { id: 'I004', bridgeName: '松阴溪大桥', type: '日常巡检', inspector: '赵工', date: '2026-04-13', status: '已完成', result: '优秀' },
    { id: 'I005', bridgeName: '龙泉溪大桥', type: '特殊检查', inspector: '张工', date: '2026-04-12', status: '已完成', result: '一般' },
    { id: 'I006', bridgeName: '仙都大桥', type: '日常巡检', inspector: '李工', date: '2026-04-12', status: '已完成', result: '较差' },
    { id: 'I007', bridgeName: '云和湖大桥', type: '专项检查', inspector: '王工', date: '2026-04-11', status: '已完成', result: '优秀' },
    { id: 'I008', bridgeName: '遂昌大桥', type: '日常巡检', inspector: '赵工', date: '2026-04-10', status: '已完成', result: '良好' },
    { id: 'I009', bridgeName: '紫金大桥', type: '定期检查', inspector: '张工', date: '2026-04-08', status: '已完成', result: '良好' },
    { id: 'I010', bridgeName: '南明湖大桥', type: '日常巡检', inspector: '李工', date: '2026-04-07', status: '已完成', result: '良好' }
  ]
}

// 养护工程统计
export const maintenanceProjectStats = {
  total: 12,
  completed: 9,
  inProgress: 2,
  planned: 1,
  completionRate: 75.0,
  totalInvestment: 2860 // 万元
}

// 路面数据
export const roadList = [
  {
    id: 'R001',
    name: '长深高速丽水段',
    lng: 119.9228,
    lat: 28.4672,
    roadType: '高速公路',
    pavementType: '沥青混凝土',
    buildYear: 2005,
    roadAge: 21,
    length: 85.6,
    width: 26,
    lanes: 4,
    maintenanceCategory: '结构性修复',
    lastInspectionDate: '2026-03-15',
    conditionStatus: '良好',
    defectCount: 8,
    maintenanceCount: 15
  },
  {
    id: 'R002',
    name: '龙丽高速',
    lng: 119.4851,
    lat: 28.4492,
    roadType: '高速公路',
    pavementType: '沥青混凝土',
    buildYear: 2010,
    roadAge: 16,
    length: 72.3,
    width: 24.5,
    lanes: 4,
    maintenanceCategory: '预防性养护',
    lastInspectionDate: '2026-02-28',
    conditionStatus: '优秀',
    defectCount: 3,
    maintenanceCount: 8
  },
  {
    id: 'R003',
    name: '丽龙高速',
    lng: 119.7312,
    lat: 28.6523,
    roadType: '高速公路',
    pavementType: '水泥混凝土',
    buildYear: 2000,
    roadAge: 26,
    length: 68.5,
    width: 22,
    lanes: 2,
    maintenanceCategory: '功能性修复',
    lastInspectionDate: '2026-01-20',
    conditionStatus: '一般',
    defectCount: 25,
    maintenanceCount: 22
  },
  {
    id: 'R004',
    name: 'S333省道',
    lng: 119.1416,
    lat: 28.0742,
    roadType: '省道',
    pavementType: '沥青混凝土',
    buildYear: 2015,
    roadAge: 11,
    length: 45.2,
    width: 12,
    lanes: 2,
    maintenanceCategory: '日常养护',
    lastInspectionDate: '2026-03-01',
    conditionStatus: '良好',
    defectCount: 5,
    maintenanceCount: 10
  },
  {
    id: 'R005',
    name: 'G25国道',
    lng: 120.0872,
    lat: 28.6418,
    roadType: '国道',
    pavementType: '沥青混凝土',
    buildYear: 2008,
    roadAge: 18,
    length: 52.8,
    width: 15,
    lanes: 2,
    maintenanceCategory: '应急养护',
    lastInspectionDate: '2026-03-20',
    conditionStatus: '较差',
    defectCount: 32,
    maintenanceCount: 28
  }
]

// 路面详情
export const roadDetailMap = {
  R001: {
    basicInfo: {
      designUnit: '浙江省交通规划设计研究院',
      designLoad: '公路-I级',
      designSpeed: '120km/h',
      roadLength: '85.6km',
      roadWidth: '26m',
      lanes: '双向4车道',
      pavementType: '沥青混凝土',
      buildYear: 2005,
      lastOverhaul: 2018
    },
    constructionRecords: [
      { date: '2005-08-15', type: '新建工程', content: '长深高速丽水段建成通车', status: '已完成' },
      { date: '2018-06-20', type: '大修工程', content: '路面整体翻新', status: '已完成' }
    ],
    inspectionRecords: [
      { date: '2026-03-15', type: '定期检测', inspector: '李工', result: '良好', score: 85 },
      { date: '2025-09-10', type: '日常巡查', inspector: '王工', result: '良好', score: 82 }
    ],
    defectLibrary: [
      { id: 'RD001', type: '裂缝', location: 'K12+300段', severity: '轻微', status: '已处置', date: '2026-01-10' },
      { id: 'RD002', type: '车辙', location: 'K18+500段', severity: '中等', status: '已处置', date: '2026-02-15' },
      { id: 'RD003', type: '坑槽', location: 'K25+800段', severity: '轻微', status: '监测中', date: '2026-03-05' }
    ],
    maintenanceRecords: [
      { date: '2026-03-10', type: '日常养护', content: '路面清扫、排水疏通', status: '已完成' },
      { date: '2026-02-15', type: '专项养护', content: '裂缝修补', status: '已完成' },
      { date: '2025-12-05', type: '预防性养护', content: '微表处处理', status: '已完成' }
    ]
  },
  R002: {
    basicInfo: {
      designUnit: '丽水市公路设计院',
      designLoad: '公路-I级',
      designSpeed: '100km/h',
      roadLength: '72.3km',
      roadWidth: '24.5m',
      lanes: '双向4车道',
      pavementType: '沥青混凝土',
      buildYear: 2010,
      lastOverhaul: 2022
    },
    constructionRecords: [
      { date: '2010-10-01', type: '新建工程', content: '龙丽高速建成通车', status: '已完成' }
    ],
    inspectionRecords: [
      { date: '2026-02-28', type: '定期检测', inspector: '张工', result: '优秀', score: 92 }
    ],
    defectLibrary: [
      { id: 'RD004', type: '微小裂缝', location: 'K8+200段', severity: '轻微', status: '已处置', date: '2026-02-20' }
    ],
    maintenanceRecords: [
      { date: '2026-03-05', type: '日常养护', content: '路面清扫', status: '已完成' }
    ]
  }
}

// 路面统计数据
export const roadStatistics = {
  total: 5,
  totalLength: 324.4,
  byAge: [
    { range: '0-10年', count: 2 },
    { range: '10-20年', count: 2 },
    { range: '20-30年', count: 1 }
  ],
  byMaintenanceCategory: [
    { category: '结构性修复', count: 1 },
    { category: '功能性修复', count: 1 },
    { category: '预防性养护', count: 1 },
    { category: '应急养护', count: 1 },
    { category: '日常养护', count: 1 }
  ]
}

// 路面看板关键指标
export const roadIndicators = {
  roadTotal: 5,
  totalLength: 324.4,
  maintenanceTotal: 83,
  inspectionTotal: 125,
  defectTotal: 73,
  defectHandled: 61,
  defectPending: 12,
  conditionExcellent: 1,
  conditionGood: 2,
  conditionNormal: 1,
  conditionPoor: 1
}

// 总体路况评定
export const roadConditionAssessment = {
  totalLength: 324.4,
  excellentLength: 254.3,
  goodLength: 61.2,
  mediumLength: 0,
  secondaryLength: 0,
  poorLength: 0,
  excellentRate: 100.0
}

// PCI路段里程占比
export const pciRoadStats = {
  totalLength: 324.4,
  data: [
    { name: '优', length: 254.3, color: '#67C23A' },
    { name: '良', length: 61.2, color: '#409EFF' },
    { name: '中', length: 0, color: '#E6A23C' },
    { name: '次', length: 0, color: '#F56C6C' },
    { name: '差', length: 0, color: '#909399' }
  ]
}

// 隧道列表
export const tunnelList = [
  {
    id: 'T001',
    name: '云台山隧道',
    lng: 119.85,
    lat: 28.55,
    tunnelType: '双洞',
    length: 2850,
    width: 10.5,
    buildYear: 2012,
    tunnelAge: 14,
    healthStatus: '良好',
    defectCount: 12,
    maintenanceCount: 8
  },
  {
    id: 'T002',
    name: '括苍山隧道',
    lng: 119.78,
    lat: 28.62,
    tunnelType: '单洞',
    length: 1520,
    width: 9.0,
    buildYear: 2008,
    tunnelAge: 18,
    healthStatus: '一般',
    defectCount: 25,
    maintenanceCount: 15
  },
  {
    id: 'T003',
    name: '九龙山隧道',
    lng: 119.95,
    lat: 28.48,
    tunnelType: '双洞',
    length: 3200,
    width: 11.0,
    buildYear: 2015,
    tunnelAge: 11,
    healthStatus: '优秀',
    defectCount: 5,
    maintenanceCount: 6
  },
  {
    id: 'T004',
    name: '仙霞岭隧道',
    lng: 119.68,
    lat: 28.72,
    tunnelType: '单洞',
    length: 1280,
    width: 9.5,
    buildYear: 2005,
    tunnelAge: 21,
    healthStatus: '较差',
    defectCount: 38,
    maintenanceCount: 22
  }
]

// 隧道详情
export const tunnelDetailMap = {
  T001: {
    basicInfo: {
      designUnit: '浙江省交通规划设计研究院',
      designSpeed: '80km/h',
      tunnelLength: '2850m',
      tunnelWidth: '10.5m',
      tunnelType: '双洞',
      buildYear: 2012,
      lastOverhaul: 2020
    },
    maintenanceRecords: [
      { date: '2026-03-10', type: '日常养护', content: '照明系统检查、通风系统维护', status: '已完成' },
      { date: '2026-02-15', type: '专项养护', content: '衬砌裂缝修补', status: '已完成' }
    ],
    inspectionRecords: [
      { date: '2026-03-20', type: '定期巡检', inspector: '李工', result: '良好', score: 85 },
      { date: '2025-11-10', type: '日常巡检', inspector: '王工', result: '良好', score: 82 }
    ],
    defectLibrary: [
      { id: 'TD001', type: '衬砌裂缝', location: '左洞K12+300段', severity: '轻微', status: '已处置', date: '2026-01-10' },
      { id: 'TD002', type: '路面破损', location: '右洞K18+500段', severity: '中等', status: '已处置', date: '2026-02-15' }
    ],
    monitoringInfo: {
      hasMonitor: true,
      sensorCount: 45,
      lastDataTime: '2026-04-14 14:30'
    },
    electromechanicalInfo: {
      equipmentCount: 120,
      operationYears: 14,
      faultCount: 5,
      maintenanceRate: 95.8
    }
  }
}

// 隧道病害分布统计
export const tunnelDefectStats = {
  byPosition: [
    { name: '衬砌', count: 35 },
    { name: '路面', count: 28 },
    { name: '排水系统', count: 15 },
    { name: '照明系统', count: 12 }
  ],
  totalCount: 90
}

// 隧道养护进度
export const tunnelMaintenanceProgress = {
  dailyComplete: 85,
  dailyTotal: 100,
  specialComplete: 92,
  specialTotal: 100,
  equipmentComplete: 78,
  equipmentTotal: 100
}

// 隧道巡检统计
export const tunnelInspectionStats = {
  planned: 120,
  completed: 115,
  overdue: 3,
  defectFound: 45
}

// 隧道病害/故障统计
export const tunnelDefectFaultStats = {
  byType: [
    { name: '衬砌裂缝', count: 35, severity: '中等' },
    { name: '路面破损', count: 28, severity: '轻微' },
    { name: '照明故障', count: 18, severity: '严重' },
    { name: '通风故障', count: 12, severity: '中等' },
    { name: '排水堵塞', count: 15, severity: '轻微' }
  ],
  totalCount: 108
}

// 隧道计划统计
export const tunnelPlanStats = {
  regularInspection: 98.5,
  specialInspection: 95.2,
  equipmentInspection: 92.8
}

// 隧道监测概况
export const tunnelMonitoringStats = {
  structureData: 1250,
  environmentData: 890,
  equipmentData: 780,
  warningCount: 5
}

// 隧道机电统计
export const tunnelElectromechanicalStats = {
  equipmentCount: 245,
  operationYears: 12,
  faultCount: 28,
  maintenanceRate: 92.5
}

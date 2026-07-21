// 巡检一张图 Mock 数据

// 巡检类型统计
export const inspectionTypeStats = [
  { type: '经常检查', count: 96, color: '#409EFF' },
  { type: '定期检查', count: 32, color: '#67C23A' },
  { type: '特殊检查', count: 8, color: '#E6A23C' },
  { type: '应急检查', count: 4, color: '#F56C6C' }
]

// 巡检任务完成情况
export const inspectionTaskCompletion = {
  total: 156,
  completed: 148,
  overdue: 3,
  pending: 5,
  completionRate: 94.9,
  byBridge: [
    { name: '紫金大桥', total: 24, completed: 24 },
    { name: '南明湖大桥', total: 20, completed: 20 },
    { name: '好溪大桥', total: 22, completed: 20 },
    { name: '松阴溪大桥', total: 18, completed: 18 },
    { name: '龙泉溪大桥', total: 22, completed: 20 },
    { name: '仙都大桥', total: 24, completed: 22 },
    { name: '云和湖大桥', total: 16, completed: 16 },
    { name: '遂昌大桥', total: 10, completed: 8 }
  ]
}

// 巡检趋势
export const inspectionTrend = [
  { month: '2025-07', regular: 10, periodic: 2, special: 0 },
  { month: '2025-08', regular: 12, periodic: 2, special: 0 },
  { month: '2025-09', regular: 9, periodic: 2, special: 0 },
  { month: '2025-10', regular: 11, periodic: 2, special: 2 },
  { month: '2025-11', regular: 10, periodic: 3, special: 0 },
  { month: '2025-12', regular: 12, periodic: 4, special: 0 },
  { month: '2026-01', regular: 8, periodic: 2, special: 0 },
  { month: '2026-02', regular: 9, periodic: 3, special: 0 },
  { month: '2026-03', regular: 10, periodic: 3, special: 2 },
  { month: '2026-04', regular: 5, periodic: 2, special: 1 }
]

// 缺陷统计
export const defectStats = {
  total: 45,
  newThisMonth: 3,
  handledThisMonth: 5,
  byLevel: [
    { level: '轻微', count: 20, color: '#67C23A' },
    { level: '中等', count: 15, color: '#E6A23C' },
    { level: '严重', count: 8, color: '#F56C6C' },
    { level: '危急', count: 2, color: '#ff0000' }
  ],
  byType: [
    { type: '裂缝', count: 15 },
    { type: '渗水', count: 8 },
    { type: '混凝土剥落', count: 7 },
    { type: '钢筋锈蚀', count: 5 },
    { type: '支座病害', count: 6 },
    { type: '其他', count: 4 }
  ]
}

// 桥梁缺陷数量排行
export const bridgeDefectRanking = [
  { name: '仙都大桥', total: 18, serious: 4, medium: 6, minor: 8 },
  { name: '好溪大桥', total: 12, serious: 2, medium: 4, minor: 6 },
  { name: '龙泉溪大桥', total: 7, serious: 1, medium: 3, minor: 3 },
  { name: '遂昌大桥', total: 4, serious: 0, medium: 2, minor: 2 },
  { name: '紫金大桥', total: 3, serious: 0, medium: 1, minor: 2 },
  { name: '南明湖大桥', total: 1, serious: 0, medium: 0, minor: 1 },
  { name: '松阴溪大桥', total: 0, serious: 0, medium: 0, minor: 0 },
  { name: '云和湖大桥', total: 0, serious: 0, medium: 0, minor: 0 }
]

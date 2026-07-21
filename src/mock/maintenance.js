// 养护一张图 Mock 数据

// 施工项目统计
export const constructionProjects = {
  total: 12,
  byStatus: [
    { status: '施工中', count: 5, color: '#409EFF' },
    { status: '已完工', count: 4, color: '#67C23A' },
    { status: '待开工', count: 2, color: '#E6A23C' },
    { status: '已验收', count: 1, color: '#909399' }
  ],
  projects: [
    { name: '好溪大桥桥面铺装工程', bridge: '好溪大桥', status: '施工中', progress: 65, startDate: '2025-11-01', endDate: '2026-06-30', investment: 480 },
    { name: '仙都大桥加固工程', bridge: '仙都大桥', status: '施工中', progress: 40, startDate: '2026-01-15', endDate: '2026-09-30', investment: 860 },
    { name: '紫金大桥伸缩缝更换', bridge: '紫金大桥', status: '已完工', progress: 100, startDate: '2025-08-01', endDate: '2025-11-30', investment: 120 },
    { name: '遂昌大桥栏杆维修', bridge: '遂昌大桥', status: '已完工', progress: 100, startDate: '2025-09-15', endDate: '2025-12-20', investment: 85 },
    { name: '龙泉溪大桥支座更换', bridge: '龙泉溪大桥', status: '施工中', progress: 75, startDate: '2025-10-01', endDate: '2026-04-30', investment: 260 },
    { name: '云和湖大桥日常养护', bridge: '云和湖大桥', status: '已完工', progress: 100, startDate: '2025-07-01', endDate: '2025-08-30', investment: 45 },
    { name: '南明湖大桥桥面修补', bridge: '南明湖大桥', status: '已完工', progress: 100, startDate: '2025-10-10', endDate: '2025-12-10', investment: 95 },
    { name: '好溪大桥支座更换工程', bridge: '好溪大桥', status: '施工中', progress: 50, startDate: '2026-02-01', endDate: '2026-07-30', investment: 320 },
    { name: '松阴溪大桥养护', bridge: '松阴溪大桥', status: '施工中', progress: 30, startDate: '2026-03-01', endDate: '2026-08-30', investment: 150 },
    { name: '仙都大桥桥墩加固', bridge: '仙都大桥', status: '待开工', progress: 0, startDate: '2026-05-01', endDate: '2026-12-31', investment: 520 },
    { name: '紫金大桥防水层修复', bridge: '紫金大桥', status: '待开工', progress: 0, startDate: '2026-06-01', endDate: '2026-09-30', investment: 180 },
    { name: '龙泉溪大桥综合检测', bridge: '龙泉溪大桥', status: '已验收', progress: 100, startDate: '2025-06-01', endDate: '2025-07-30', investment: 35 }
  ]
}

// 桥梁养护次数排名
export const maintenanceRanking = [
  { name: '仙都大桥', count: 22 },
  { name: '好溪大桥', count: 15 },
  { name: '龙泉溪大桥', count: 12 },
  { name: '遂昌大桥', count: 9 },
  { name: '紫金大桥', count: 8 },
  { name: '南明湖大桥', count: 5 },
  { name: '松阴溪大桥', count: 3 },
  { name: '云和湖大桥', count: 2 }
]

// 养护次数月度变化趋势
export const maintenanceMonthlyTrend = [
  { month: '2025-07', count: 8, investment: 120 },
  { month: '2025-08', count: 10, investment: 185 },
  { month: '2025-09', count: 7, investment: 95 },
  { month: '2025-10', count: 9, investment: 210 },
  { month: '2025-11', count: 12, investment: 340 },
  { month: '2025-12', count: 8, investment: 150 },
  { month: '2026-01', count: 6, investment: 280 },
  { month: '2026-02', count: 5, investment: 110 },
  { month: '2026-03', count: 7, investment: 165 },
  { month: '2026-04', count: 4, investment: 90 }
]

// 养护维修统计
export const maintenanceRepairStats = {
  byType: [
    { type: '日常养护', count: 42, investment: 380 },
    { type: '专项养护', count: 18, investment: 960 },
    { type: '大修工程', count: 3, investment: 1280 },
    { type: '预防性养护', count: 8, investment: 180 },
    { type: '应急抢修', count: 5, investment: 60 }
  ]
}

// 养护维修数据表
export const maintenanceRepairData = [
  { bridge: '仙都大桥', type: '大修工程', content: '桥墩加固及桥面修复', date: '2026-01-15', investment: 860, status: '施工中' },
  { bridge: '好溪大桥', type: '大修工程', content: '桥面铺装更换', date: '2025-11-01', investment: 480, status: '施工中' },
  { bridge: '龙泉溪大桥', type: '专项养护', content: '支座更换', date: '2025-10-01', investment: 260, status: '施工中' },
  { bridge: '松阴溪大桥', type: '专项养护', content: '拉索检测与防腐', date: '2026-03-01', investment: 150, status: '施工中' },
  { bridge: '紫金大桥', type: '专项养护', content: '伸缩缝更换', date: '2025-08-01', investment: 120, status: '已完工' },
  { bridge: '遂昌大桥', type: '日常养护', content: '栏杆维修', date: '2025-09-15', investment: 85, status: '已完工' },
  { bridge: '南明湖大桥', type: '日常养护', content: '桥面修补', date: '2025-10-10', investment: 95, status: '已完工' },
  { bridge: '云和湖大桥', type: '预防性养护', content: '涂装维护', date: '2025-07-01', investment: 45, status: '已完工' }
]

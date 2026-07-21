import * as echarts from 'echarts'

// 1. Definition of left/right panels for all 8 tabs
export const mockDataModel = {
  ref_inner: {
    left: [
      { title: '市场拓展-新签合同额', chartType: 'market_expansion', desc: '统计及深度分析年度新签合同指标及拓展完成情况。' },
      { title: '核心合同金额分类构成', chartType: 'contract_breakdown', desc: '展示各类型工程（公路大修、桥隧、市政等）合同占比。' },
      { title: '各区域中心市场拓展额', chartType: 'regional_market', desc: '反映各区域管理中心年内累计合同签约与市场拓展额。' }
    ],
    right: [
      { title: '集团核心项目信息看板', chartType: 'project_info', desc: '实时统计公司项目总数、在建与完工分布，以及日常、专项、全寿命、特殊项目的分类构成和明细。' },
      { title: '集团应收款情况', chartType: 'receivables_info', desc: '按区域统计应收款考核基数、本年收款、完成比例、未收款金额并支持下钻明细分析。' },
      { title: '季度实物产值转化进度', chartType: 'output_conversion', desc: '分析各季度已完工实物量转化为产值的进度与效率。' },
      { title: '集团经营回款周期率趋势', chartType: 'payment_collection', desc: '展现账期内工程回款率，评估资金周转与坏账控制。' }
    ]
  },
  wages_total: {
    left: [
      { title: '分子机构工资总额分配', chartType: 'wages_alloc', desc: '展示各子公司、职能部室本年度已核定的工资预算分布。' },
      { title: '工资总额预算执行进度', chartType: 'wages_budget', desc: '展示工资总额预算的累计使用率与额度结余。' },
      { title: '集团月度薪酬发放趋势', chartType: 'wages_trend', desc: '反映每月固定与绩效薪酬支出的变动趋势。' }
    ],
    right: [
      { title: '岗位类型薪酬分配结构', chartType: 'pos_salary', desc: '展示管理、专业技术、技能工人群体薪酬分配比例。' },
      { title: '绩效与基本薪酬占比对比', chartType: 'perf_ratio', desc: '分析基本工资与绩效激励部分的结构配比。' },
      { title: '人均经营创效能动对比', chartType: 'per_capita', desc: '对比各机构的人均产值与人均薪资支出比。' }
    ]
  },
  wages_labor: {
    left: [
      { title: '民工专户资金拨付到位率', chartType: 'labor_fund', desc: '监控工程款中农民工工资保证金与代发资金在各项目中的到位情况。' },
      { title: '实名制打卡及每日在岗人数', chartType: 'labor_attendance', desc: '展示实名制系统下，各项目工地每日考勤与刷卡人数。' },
      { title: '月度民工工资发放明细统计', chartType: 'labor_project', desc: '各在建项目的月度农民工实发薪资总金额。' }
    ],
    right: [
      { title: '欠薪预警投诉办结率', chartType: 'dispute_resolve', desc: '跟踪政府热线及内部投诉通道欠薪反馈的化解率。' },
      { title: '项目部自查合规率评分', chartType: 'compliance_rate', desc: '根据实名制管理、专户使用等维度的综合合规考评评分。' },
      { title: '欠薪风险等级项目分布', chartType: 'arrears_risk', desc: '对在建项目按资金链、合规情况进行红黄绿三级风险标识。' }
    ]
  },
  proj_done: {
    left: [
      { title: '累计完工项目数量与产值', chartType: 'completed_stats', desc: '展示近五年内竣工项目总量与累计结算产值。' },
      { title: '项目首次综合验收合格率', chartType: 'first_pass', desc: '反映各主要法人单位完工项目的品质验收通过水平。' },
      { title: '项目工期偏差分布分析', chartType: 'delay_deviation', desc: '统计工程按时完工与延误/提前完工项目的偏差天数分布。' }
    ],
    right: [
      { title: '竣工决算结算完成率对比', chartType: 'settle_rate', desc: '反映已完工项目通过最终审计、业主确认决算的比例。' },
      { title: '缺陷责任期养护支出跟踪', chartType: 'defect_cost', desc: '监控项目完工后、保修期内二次返修或质保期投入成本。' },
      { title: '完工项目净利润水平排行', chartType: 'profit_rank', desc: '展示近期完工项目实际实现利润率的优秀排行。' }
    ]
  },
  one_profit: {
    left: [
      { title: '净利润额度及增长速度', chartType: 'net_profit', desc: '国资委核心考核：累计利润总额与同比增速分析。' },
      { title: '资产负债率安全监测趋势', chartType: 'liability_ratio', desc: '监测整体负债红线，防范经营及杠杆资金风险。' },
      { title: '自主研发经费投入强度', chartType: 'rd_intensity', desc: '统计研发费用支出占营业总收入的比值变动。' }
    ],
    right: [
      { title: '营业收入利润率变动走势', chartType: 'income_margin', desc: '反映主营业务经营变现、成本加成与综合盈利能力。' },
      { title: '全员劳动生产率对比', chartType: 'labor_productivity', desc: '考核人均创造工业/服务业增加值的综合效能。' },
      { title: '净资产收益率(ROE)趋势', chartType: 'roe_trend', desc: '反映自有资本获得净收益的增值效率。' }
    ]
  },
  station_mgt: {
    left: [
      { title: '沥青拌合站产能及生产负荷', chartType: 'station_output', desc: '统计各沥青拌合场站的实际出料量与生产容量比。' },
      { title: '场站核心原材料库存监控', chartType: 'station_materials', desc: '沥青、碎石、矿粉、添加剂等储备量与消耗周转预警。' },
      { title: '关键生产机械设备利用率', chartType: 'machinery_util', desc: '监控拌合楼、破碎机、转运车等重型设备有效工时。' }
    ],
    right: [
      { title: '场站能耗及吨料消耗成本', chartType: 'energy_monitor', desc: '监控每吨混合料所耗电能、重油或天然气及标准煤。' },
      { title: '场站尾气粉尘环保达标率', chartType: 'env_compliance', desc: '在线环境检测PM2.5、二氧化硫达标率走势。' },
      { title: '路面铣刨废旧料回收再生率', chartType: 'recycle_rate', desc: '反映废旧沥青混凝土（RAP）再生材料的循环利用比例。' }
    ]
  },
  annual_task: {
    left: [
      { title: '年度重点专项项目进度', chartType: 'major_task_prog', desc: '跟踪政府年度督办、集团重大战略专项任务执行阶段。' },
      { title: '核心考核KPI综合达成率', chartType: 'kpi_completion', desc: '国资及主管机构年度综合责任目标完成雷达度量。' },
      { title: '年度养护投资计划执行进度', chartType: 'invest_progress', desc: '监测财政养护资金与自主投资的工程款支付及投资计划。' }
    ],
    right: [
      { title: '督办工作任务按时办结率', chartType: 'ontime_rate', desc: '督办系统中已分办任务的按时签收与反馈销号比例。' },
      { title: '各科室部室承办任务量分布', chartType: 'dept_task', desc: '展示本年度下发任务在集团各内设部门的权重分布。' },
      { title: '任务阻滞滞后等级预警', chartType: 'task_warning', desc: '对存在执行偏差、滞后预警的任务按等级分类管控。' }
    ]
  },
  jv_mgt: {
    left: [
      { title: '参控股合资公司资产规模', chartType: 'jv_assets', desc: '统计合资公司年报及最新季报总资产与净资产规模。' },
      { title: '合资公司股本出资结构', chartType: 'jv_equity', desc: '展现各方出资人持股比例与实质控制权。' },
      { title: '年度累计对外投资回报率(ROI)', chartType: 'jv_roi', desc: '对外投资产生的综合资本回报和红利回款率。' }
    ],
    right: [
      { title: '参控股合资公司净利润贡献', chartType: 'jv_profit', desc: '合资公司实现的净利润对母公司利润总额的贡献比。' },
      { title: '合资公司负债率红线对比', chartType: 'jv_debts', desc: '对比各合资单元负债水平，防止并表或连带担保危机。' },
      { title: '合规风控及自查考评得分', chartType: 'jv_compliance', desc: '合资公司在三重一大、法务审核及章程执行上的考评。' }
    ]
  }
}

// 2. High-fidelity dummy data generator for drill-down detailing
export function generateDrillData(chartType) {
  // Common theme colors
  const mainCyan = '#00f3ff'
  const mainGold = '#edbe75'
  const mainBlue = '#1b6cff'
  const textWhite = 'rgba(255, 255, 255, 0.85)'
  const borderBlue = 'rgba(41, 94, 151, 0.3)'

  // Map configuration metadata
  const config = {
    // ------------------- TAB 1 -------------------
    market_expansion: {
      kpis: [
        { label: '上年度新签合同额', value: '28,500', unit: '万元' },
        { label: '本年度目标', value: '35,000', unit: '万元' },
        { label: '本年度开累', value: '26,800', unit: '万元' },
        { label: '目标完成率', value: '76.57', unit: '%' }
      ],
      columns: [
        { prop: 'center', label: '区域中心' },
        { prop: 'lastYear', label: '上年新签' },
        { prop: 'target', label: '今年目标' },
        { prop: 'accumulated', label: '今年开累' },
        { prop: 'rate', label: '完成率(%)' }
      ],
      tableData: [],
      chartOption: {}
    },
    income_profit: {
      kpis: [
        { label: '本年累计营业收入', value: '44,950.8', unit: '万元' },
        { label: '累计实现净利润', value: '3,892.4', unit: '万元' },
        { label: '平均销售利润率', value: '8.66', unit: '%' },
        { label: '预算指标达成率', value: '103.1', unit: '%' }
      ],
      columns: [
        { prop: 'quarter', label: '财报季度', width: '120px' },
        { prop: 'income', label: '主营收入(万元)' },
        { prop: 'profit', label: '净利润(万元)' },
        { prop: 'rate', label: '利润率(%)' },
        { prop: 'growth', label: '同比增速(%)' }
      ],
      tableData: [
        { quarter: '2025 Q1', income: '34,291.5', profit: '2,148.2', rate: '6.27', growth: '5.2' },
        { quarter: '2025 Q2', income: '41,520.4', profit: '3,219.0', rate: '7.75', growth: '6.8' },
        { quarter: '2025 Q3', income: '39,812.8', profit: '2,895.4', rate: '7.27', growth: '4.9' },
        { quarter: '2025 Q4', income: '51,204.1', profit: '4,510.6', rate: '8.81', growth: '8.1' },
        { quarter: '2026 Q1', income: '36,890.2', profit: '2,410.5', rate: '6.53', growth: '7.5' },
        { quarter: '2026 Q2', income: '44,950.8', profit: '3,892.4', rate: '8.66', growth: '8.2' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: ['营业收入', '净利润'], textStyle: { color: textWhite } },
        xAxis: { type: 'category', data: ['25Q1', '25Q2', '25Q3', '25Q4', '26Q1', '26Q2'], axisLabel: { color: textWhite } },
        yAxis: [
          { type: 'value', name: '收入(万)', axisLabel: { color: textWhite }, splitLine: { lineStyle: { color: borderBlue } } },
          { type: 'value', name: '利润(万)', axisLabel: { color: textWhite }, splitLine: { show: false } }
        ],
        series: [
          { name: '营业收入', type: 'bar', barWidth: '35%', data: [34291, 41520, 39812, 51204, 36890, 44950], itemStyle: { color: mainBlue, borderRadius: [4, 4, 0, 0] } },
          { name: '净利润', type: 'line', yAxisIndex: 1, data: [2148, 3219, 2895, 4510, 2410, 3892], itemStyle: { color: mainCyan }, lineStyle: { width: 3 } }
        ]
      }
    },
    contract_breakdown: {
      kpis: [
        { label: '新签合同额总量', value: '52,480.0', unit: '万元' },
        { label: '公路大修工程类', value: '24,140.8', unit: '万元' },
        { label: '市政建设工程类', value: '15,620.2', unit: '万元' },
        { label: '桥隧特种加固类', value: '12,719.0', unit: '万元' }
      ],
      columns: [
        { prop: 'type', label: '合同板块', width: '150px' },
        { prop: 'count', label: '项目数量(个)' },
        { prop: 'value', label: '签约金额(万元)' },
        { prop: 'ratio', label: '占比(%)' }
      ],
      tableData: [
        { type: '公路大修养护', count: 18, value: '24,140.8', ratio: '46.0' },
        { type: '市政设施保养', count: 24, value: '15,620.2', ratio: '29.7' },
        { type: '桥隧专项特种加固', count: 12, value: '9,812.5', ratio: '18.7' },
        { type: '交通安全交安工程', count: 32, value: '2,906.5', ratio: '5.6' }
      ],
      chartOption: {
        tooltip: { trigger: 'item' },
        legend: { bottom: '5%', left: 'center', textStyle: { color: textWhite } },
        series: [{
          name: '合同构成',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false },
          data: [
            { value: 24140, name: '公路大修养护', itemStyle: { color: mainBlue } },
            { value: 15620, name: '市政设施保养', itemStyle: { color: mainCyan } },
            { value: 9812, name: '桥隧特种加固', itemStyle: { color: mainGold } },
            { value: 2906, name: '交安工程', itemStyle: { color: '#67C23A' } }
          ]
        }]
      }
    },
    regional_market: {
      kpis: [
        { label: '区域中心总开拓额', value: '38,500.0', unit: '万元' },
        { label: '领跑区域(莲都)', value: '11,480.0', unit: '万元' },
        { label: '腰部平均签约额', value: '4,277.0', unit: '万元' },
        { label: '签约合同项目数', value: '115', unit: '个' }
      ],
      columns: [
        { prop: 'center', label: '区域中心', width: '130px' },
        { prop: 'target', label: '年度考核目标(万)' },
        { prop: 'actual', label: '实际开拓签约(万)' },
        { prop: 'rate', label: '指标达成率(%)' }
      ],
      tableData: [
        { center: '莲都区域中心', target: '10,000.0', actual: '11,480.0', rate: '114.8' },
        { center: '缙云区域中心', target: '6,000.0', actual: '6,520.4', rate: '108.6' },
        { center: '龙泉区域中心', target: '5,000.0', actual: '4,890.1', rate: '97.8' },
        { center: '青田区域中心', target: '5,000.0', actual: '4,120.5', rate: '82.4' },
        { center: '遂昌区域中心', target: '3,000.0', actual: '3,210.6', rate: '107.0' },
        { center: '云和区域中心', target: '2,500.0', actual: '2,680.3', rate: '107.2' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: { type: 'value', axisLabel: { color: textWhite }, splitLine: { lineStyle: { color: borderBlue } } },
        yAxis: { type: 'category', data: ['云和', '遂昌', '青田', '龙泉', '缙云', '莲都'], axisLabel: { color: textWhite } },
        series: [{
          name: '开拓合同额(万)',
          type: 'bar',
          data: [2680, 3210, 4120, 4890, 6520, 11480],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(27,108,255,0.2)' },
              { offset: 1, color: mainCyan }
            ]),
            borderRadius: [0, 4, 4, 0]
          }
        }]
      }
    },
    project_info: {
      kpis: [
        { label: '公司项目总数', value: '300', unit: '个' },
        { label: '在建项目数', value: '254', unit: '个' },
        { label: '完工项目数', value: '46', unit: '个' },
        { label: '项目综合完工率', value: '15.33', unit: '%' }
      ],
      columns: [
        { prop: 'center', label: '区域中心/单位', width: '130px' },
        { prop: 'total', label: '项目总数' },
        { prop: 'underConstruction', label: '在建项目' },
        { prop: 'completed', label: '完工项目' },
        { prop: 'rate', label: '完工率(%)' }
      ],
      tableData: [
        { center: '杭州区域中心', total: 65, underConstruction: 55, completed: 10, rate: '15.38' },
        { center: '绍兴区域中心', total: 52, underConstruction: 45, completed: 7, rate: '13.46' },
        { center: '金衢区域中心', total: 45, underConstruction: 38, completed: 7, rate: '15.56' },
        { center: '甬舟区域中心', total: 38, underConstruction: 32, completed: 6, rate: '15.79' },
        { center: '台州区域中心', total: 35, underConstruction: 30, completed: 5, rate: '14.29' },
        { center: '嘉兴区域中心', total: 30, underConstruction: 25, completed: 5, rate: '16.67' },
        { center: '温州区域中心', total: 20, underConstruction: 17, completed: 3, rate: '15.00' },
        { center: '湖州区域中心', total: 15, underConstruction: 12, completed: 3, rate: '20.00' },
        { center: '丽水区域中心', total: 10, underConstruction: 8, completed: 2, rate: '20.00' }
      ],
      chartOption: {}
    },
    cost_breakdown: {
      kpis: [
        { label: '项目已发生成本', value: '31,240.5', unit: '万元' },
        { label: '沥青石料等材料', value: '18,744.3', unit: '万元' },
        { label: '机械租赁费成本', value: '6,248.1', unit: '万元' },
        { label: '劳务分包及人工', value: '4,686.0', unit: '万元' }
      ],
      columns: [
        { prop: 'costName', label: '成本要素', width: '150px' },
        { prop: 'budget', label: '目标预算(万元)' },
        { prop: 'actual', label: '实际支付(万元)' },
        { prop: 'deviation', label: '偏差节约(万元)' }
      ],
      tableData: [
        { costName: '核心大宗主材', budget: '19,500.0', actual: '18,744.3', deviation: '+755.7' },
        { costName: '设备租赁折旧', budget: '6,500.0', actual: '6,248.1', deviation: '+251.9' },
        { costName: '一线劳务用工', budget: '4,500.0', actual: '4,686.0', deviation: '-186.0' },
        { costName: '管理性间接费用', budget: '1,800.0', actual: '1,562.1', deviation: '+237.9' }
      ],
      chartOption: {
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          roseType: 'area',
          data: [
            { value: 18744, name: '核心主材', itemStyle: { color: mainBlue } },
            { value: 6248, name: '设备租赁', itemStyle: { color: mainCyan } },
            { value: 4686, name: '劳务人工', itemStyle: { color: mainGold } },
            { value: 1562, name: '间接管理费', itemStyle: { color: '#F56C6C' } }
          ],
          label: { color: textWhite, fontSize: 11 }
        }]
      }
    },
    output_conversion: {
      kpis: [
        { label: '上半年完成实物产值', value: '25,480.0', unit: '万元' },
        { label: '计量确权总金额', value: '22,932.0', unit: '万元' },
        { label: '综合计量确权率', value: '90.0', unit: '%' },
        { label: '二季度转化提速', value: '15.4', unit: '%' }
      ],
      columns: [
        { prop: 'month', label: '考核月份', width: '120px' },
        { prop: 'output', label: '实物产值(万元)' },
        { prop: 'billed', label: '确权开票(万元)' },
        { prop: 'rate', label: '确权转化率(%)' }
      ],
      tableData: [
        { month: '2026-01', output: '3,210.5', billed: '2,728.9', rate: '85.0' },
        { month: '2026-02', output: '2,904.8', billed: '2,527.1', rate: '87.0' },
        { month: '2026-03', output: '4,520.2', billed: '4,023.0', rate: '89.0' },
        { month: '2026-04', output: '4,890.1', billed: '4,450.0', rate: '91.0' },
        { month: '2026-05', output: '5,152.0', billed: '4,791.3', rate: '93.0' },
        { month: '2026-06', output: '4,802.4', billed: '4,411.7', rate: '91.9' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        legend: { data: ['完成实物产值', '确权开票'], textStyle: { color: textWhite } },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite }, splitLine: { lineStyle: { color: borderBlue } } },
        series: [
          { name: '完成实物产值', type: 'line', smooth: true, areaStyle: { opacity: 0.1 }, data: [3210, 2904, 4520, 4890, 5152, 4802], itemStyle: { color: mainCyan } },
          { name: '确权开票', type: 'line', smooth: true, data: [2728, 2527, 4023, 4450, 4791, 4411], itemStyle: { color: mainGold } }
        ]
      }
    },
    payment_collection: {
      kpis: [
        { label: '应收账款总余额', value: '18,520.4', unit: '万元' },
        { label: '半年内回款率', value: '88.5', unit: '%' },
        { label: '累计催收回款额', value: '15,480.0', unit: '万元' },
        { label: '坏账准备计提率', value: '1.25', unit: '%' }
      ],
      columns: [
        { prop: 'age', label: '账龄阶段', width: '130px' },
        { prop: 'amount', label: '应收账款余额(万元)' },
        { prop: 'ratio', label: '余额占比(%)' },
        { prop: 'handled', label: '年内已催回(万元)' }
      ],
      tableData: [
        { age: '0-3个月', amount: '12,410.5', ratio: '67.0', handled: '10,500.0' },
        { age: '3-6个月', amount: '3,120.2', ratio: '16.8', handled: '2,650.2' },
        { age: '6-12个月', amount: '1,842.1', ratio: '9.9', handled: '1,420.0' },
        { age: '1-2年', amount: '842.8', ratio: '4.6', handled: '680.4' },
        { age: '2年以上', amount: '304.8', ratio: '1.7', handled: '229.4' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['3M内', '3-6M', '6-12M', '1-2年', '2年以上'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite }, splitLine: { lineStyle: { color: borderBlue } } },
        series: [{
          name: '应收余额(万)',
          type: 'bar',
          barWidth: '40%',
          data: [12410, 3120, 1842, 842, 304],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: mainCyan },
              { offset: 1, color: mainBlue }
            ])
          }
        }]
      }
    },

    // ------------------- TAB 2 -------------------
    wages_alloc: {
      kpis: [
        { label: '工资总额预算包', value: '12,500.0', unit: '万元' },
        { label: '缙智养护建工', value: '5,400.0', unit: '万元' },
        { label: '畅达养护工程', value: '3,200.0', unit: '万元' },
        { label: '顺通养护筑路', value: '2,800.0', unit: '万元' }
      ],
      columns: [
        { prop: 'unit', label: '二级机构/机构名称' },
        { prop: 'budget', label: '预算指标(万)' },
        { prop: 'used', label: '实际已发放(万)' },
        { prop: 'rate', label: '使用率(%)' }
      ],
      tableData: [
        { unit: '浙江缙智交通养护建工有限公司', budget: '5,400.0', used: '3,120.5', rate: '57.8' },
        { unit: '缙云县畅达公路养护工程有限公司', budget: '3,200.0', used: '1,940.2', rate: '60.6' },
        { unit: '丽水市顺通公路养护筑路有限公司', budget: '2,800.0', used: '1,590.8', rate: '56.8' },
        { unit: '总部职能部室', budget: '1,100.0', used: '680.4', rate: '61.9' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['缙智建工', '畅达工程', '顺通筑路', '总部机关'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite } },
        series: [
          { name: '预算总额', type: 'bar', data: [5400, 3200, 2800, 1100], itemStyle: { color: 'rgba(255,255,255,0.15)' } },
          { name: '已使用额', type: 'bar', barGap: '-100%', data: [3120, 1940, 1590, 680], itemStyle: { color: mainCyan } }
        ]
      }
    },
    wages_budget: {
      kpis: [
        { label: '工资包预算总额', value: '12,500', unit: '万' },
        { label: '上半年已执行数', value: '7,552.5', unit: '万' },
        { label: '结余预算额度', value: '4,947.5', unit: '万' },
        { label: '整体执行百分比', value: '60.4', unit: '%' }
      ],
      columns: [
        { prop: 'month', label: '考评周期', width: '120px' },
        { prop: 'budget', label: '预算额度(万元)' },
        { prop: 'used', label: '当期支出(万元)' },
        { prop: 'accum', label: '累计支出(万元)' },
        { prop: 'ratio', label: '累计执行率(%)' }
      ],
      tableData: [
        { month: '2026-01', budget: '1,000.0', used: '980.2', accum: '980.2', ratio: '7.8' },
        { month: '2026-02', budget: '1,000.0', used: '950.5', accum: '1,930.7', ratio: '15.4' },
        { month: '2026-03', budget: '1,000.0', used: '1,240.8', accum: '3,171.5', ratio: '25.4' },
        { month: '2026-04', budget: '1,000.0', used: '1,120.0', accum: '4,291.5', ratio: '34.3' },
        { month: '2026-05', budget: '1,000.0', used: '1,510.6', accum: '5,802.1', ratio: '46.4' },
        { month: '2026-06', budget: '1,000.0', used: '1,750.4', accum: '7,552.5', ratio: '60.4' }
      ],
      chartOption: {
        series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          radius: '95%',
          center: ['50%', '75%'],
          axisLine: {
            lineStyle: {
              width: 18,
              color: [
                [0.6, mainCyan],
                [0.8, mainBlue],
                [1, 'rgba(255,255,255,0.1)']
              ]
            }
          },
          detail: { formatter: '已执: 60.4%', color: '#fff', fontSize: 16, offsetCenter: [0, '25%'] },
          data: [{ value: 60.42 }]
        }]
      }
    },
    wages_trend: {
      kpis: [
        { label: '月均薪酬总额支出', value: '1,258.8', unit: '万元' },
        { label: '峰值月份(6月)', value: '1,750.4', unit: '万元' },
        { label: '基本工资平稳线', value: '680.0', unit: '万元' },
        { label: '年终绩效核定总包', value: '2,400.0', unit: '万元' }
      ],
      columns: [
        { prop: 'month', label: '月份' },
        { prop: 'base', label: '基本薪酬(万)' },
        { prop: 'perf', label: '绩效薪酬(万)' },
        { prop: 'allowance', label: '津贴福利(万)' },
        { prop: 'total', label: '发放总额(万)' }
      ],
      tableData: [
        { month: '1月', base: '682.4', perf: '210.5', allowance: '87.3', total: '980.2' },
        { month: '2月', base: '680.2', perf: '185.0', allowance: '85.3', total: '950.5' },
        { month: '3月', base: '681.5', perf: '472.0', allowance: '87.3', total: '1240.8' },
        { month: '4月', base: '683.0', perf: '351.0', allowance: '86.0', total: '1120.0' },
        { month: '5月', base: '682.1', perf: '730.2', allowance: '98.3', total: '1510.6' },
        { month: '6月', base: '684.3', perf: '960.8', allowance: '105.3', total: '1750.4' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        legend: { data: ['基本薪酬', '绩效奖金', '津贴福利'], textStyle: { color: textWhite } },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', stacked: true, axisLabel: { color: textWhite } },
        series: [
          { name: '基本薪酬', type: 'line', stack: 'Total', areaStyle: {}, data: [682, 680, 681, 683, 682, 684], itemStyle: { color: mainBlue } },
          { name: '绩效奖金', type: 'line', stack: 'Total', areaStyle: {}, data: [210, 185, 472, 351, 730, 960], itemStyle: { color: mainCyan } },
          { name: '津贴福利', type: 'line', stack: 'Total', areaStyle: {}, data: [87, 85, 87, 86, 98, 105], itemStyle: { color: mainGold } }
        ]
      }
    },

    // ------------------- TAB 3 -------------------
    labor_fund: {
      kpis: [
        { label: '民工应拨付工资专户', value: '100', unit: '%' },
        { label: '专户监控到位金额', value: '4,520.4', unit: '万元' },
        { label: '覆盖在建工程项目', value: '24', unit: '个' },
        { label: '工资卡直发覆盖率', value: '100', unit: '%' }
      ],
      columns: [
        { prop: 'proj', label: '受控项目名称' },
        { prop: 'receivable', label: '应发金额(万)' },
        { prop: 'actual', label: '专户发放(万)' },
        { prop: 'diff', label: '挂账未发放' },
        { prop: 'status', label: '清算状态' }
      ],
      tableData: [
        { proj: '丽水G322生命防护加固项目', receivable: '154.2', actual: '154.2', diff: '0.0', status: '已足额发放' },
        { proj: '缙云大川隧道二期整治项目', receivable: '112.5', actual: '112.5', diff: '0.0', status: '已足额发放' },
        { proj: '遂昌红星大桥一期改扩建', receivable: '240.1', actual: '240.1', diff: '0.0', status: '已足额发放' },
        { proj: '云和环湖路路段改扩建工程', receivable: '98.6', actual: '98.6', diff: '0.0', status: '已足额发放' }
      ],
      chartOption: {
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: ['50%', '75%'],
          data: [
            { value: 4520, name: '已按期代发发放', itemStyle: { color: '#67C23A' } },
            { value: 0, name: '逾期暂挂欠薪', itemStyle: { color: '#F56C6C' } }
          ],
          label: { color: textWhite }
        }]
      }
    },
    labor_attendance: {
      kpis: [
        { label: '实名库登记总人数', value: '3,842', unit: '人' },
        { label: '昨日刷卡出勤在岗', value: '2,904', unit: '人' },
        { label: '全员安全培训覆盖', value: '100', unit: '%' },
        { label: '出勤人均工时', value: '8.4', unit: '时/天' }
      ],
      columns: [
        { prop: 'date', label: '统计日期', width: '120px' },
        { prop: 'registered', label: '实名库登记数' },
        { prop: 'active', label: '打卡出勤数' },
        { prop: 'ratio', label: '在岗率(%)' }
      ],
      tableData: [
        { date: '2026-07-15', registered: '3,830', active: '2,890', ratio: '75.4' },
        { date: '2026-07-16', registered: '3,835', active: '2,912', ratio: '75.9' },
        { date: '2026-07-17', registered: '3,835', active: '2,950', ratio: '76.9' },
        { date: '2026-07-18', registered: '3,842', active: '2,904', ratio: '75.5' },
        { date: '2026-07-19', registered: '3,842', active: '2,880', ratio: '74.9' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['15日', '16日', '17日', '18日', '19日'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite } },
        series: [{
          name: '在岗打卡人数',
          type: 'line',
          smooth: true,
          data: [2890, 2912, 2950, 2904, 2880],
          itemStyle: { color: mainCyan },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0,243,255,0.4)' },
              { offset: 1, color: 'rgba(0,243,255,0.01)' }
            ])
          }
        }]
      }
    },

    // ------------------- TAB 4 -------------------
    completed_stats: {
      kpis: [
        { label: '五年累计竣工数', value: '184', unit: '个' },
        { label: '累计实现确权结算', value: '15.42', unit: '亿元' },
        { label: '大中修道路里程', value: '450.8', unit: '公里' },
        { label: '特大桥梁竣工加固', value: '35', unit: '座' }
      ],
      columns: [
        { prop: 'year', label: '竣工年度', width: '120px' },
        { prop: 'count', label: '项目竣工数(个)' },
        { prop: 'value', label: '结算产值(万元)' },
        { prop: 'rate', label: '优良工程率(%)' }
      ],
      tableData: [
        { year: '2022', count: 32, value: '24,152.0', rate: '92.4' },
        { year: '2023', count: 38, value: '31,240.0', rate: '94.5' },
        { year: '2024', count: 42, value: '39,812.5', rate: '96.0' },
        { year: '2025', count: 45, value: '48,240.8', rate: '98.5' },
        { year: '2026 H1', count: 27, value: '25,480.0', rate: '98.8' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2022', '2023', '2024', '2025', '2026H1'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite } },
        series: [{
          name: '结算额度(万)',
          type: 'bar',
          data: [24152, 31240, 39812, 48240, 25480],
          itemStyle: { color: mainBlue }
        }]
      }
    },

    // ------------------- TAB 5 -------------------
    net_profit: {
      kpis: [
        { label: '累计利润总额', value: '2,148.5', unit: '万元' },
        { label: '同比利润增加', value: '182.4', unit: '万元' },
        { label: '利润总额增长率', value: '9.28', unit: '%' },
        { label: '目标进度达成', value: '62.4', unit: '%' }
      ],
      columns: [
        { prop: 'month', label: '考评期', width: '120px' },
        { prop: 'profit', label: '累计利润额(万元)' },
        { prop: 'budget', label: '考评目标值(万元)' },
        { prop: 'rate', label: '季度达成率(%)' }
      ],
      tableData: [
        { month: '2026 Q1', profit: '952.4', budget: '1,500.0', rate: '63.4' },
        { month: '2026 Q2', profit: '2,148.5', budget: '3,000.0', rate: '71.6' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['25Q1', '25Q2', '25Q3', '25Q4', '26Q1', '26Q2'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite } },
        series: [{
          name: '利润额(万)',
          type: 'line',
          smooth: true,
          data: [820, 1540, 1920, 2840, 952, 2148],
          itemStyle: { color: mainCyan },
          lineStyle: { width: 3 }
        }]
      }
    },

    // ------------------- TAB 6 -------------------
    station_output: {
      kpis: [
        { label: '本期沥青料生产量', value: '154,204', unit: '吨' },
        { label: '热拌沥青混合料', value: '112,410', unit: '吨' },
        { label: '温拌及特种料产量', value: '41,794', unit: '吨' },
        { label: '生产配合比达标率', value: '100', unit: '%' }
      ],
      columns: [
        { prop: 'station', label: '沥青拌合场站' },
        { prop: 'output', label: '实际出料量(吨)' },
        { prop: 'capacity', label: '核定产值负荷(%)' },
        { prop: 'status', label: '环保评级' }
      ],
      tableData: [
        { station: '莲都1号沥青拌合站', output: '45,210', capacity: '82.4', status: '优秀(绿色示范)' },
        { station: '缙云畅达2号环保场站', output: '38,420', capacity: '78.5', status: '优秀' },
        { station: '龙泉顺通3号预制楼', output: '32,150', capacity: '72.0', status: '合格' },
        { station: '遂昌4号临时机组', output: '38,424', capacity: '85.4', status: '合格' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['莲都站', '缙云站', '龙泉站', '遂昌站'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite } },
        series: [{
          name: '产量(吨)',
          type: 'bar',
          data: [45210, 38420, 32150, 38424],
          itemStyle: { color: mainGold }
        }]
      }
    },

    // ------------------- TAB 7 -------------------
    major_task_prog: {
      kpis: [
        { label: '督办重大考核任务', value: '85', unit: '项' },
        { label: '已顺利节点销号', value: '52', unit: '项' },
        { label: '正在稳步推进中', value: '33', unit: '项' },
        { label: '延期及滞后警告', value: '0', unit: '项' }
      ],
      columns: [
        { prop: 'task', label: '督办重大责任目标' },
        { prop: 'dept', label: '领衔部室' },
        { prop: 'progress', label: '形象进度(%)' },
        { prop: 'date', label: '时限节点' }
      ],
      tableData: [
        { task: '全省日常管养综合考评进位争先', dept: '养护管理部', progress: '85.0', date: '11月30日' },
        { task: '两项交通强省标志性成果落地', dept: '科创研发部', progress: '75.0', date: '10月15日' },
        { task: '缙云绿色低碳场站投产试运转', dept: '工程建工部', progress: '100.0', date: '已提前结案' },
        { task: '农民工实名制数字化100%全链穿透', dept: '法务合规部', progress: '92.0', date: '08月30日' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'value', max: 100, axisLabel: { color: textWhite } },
        yAxis: { type: 'category', data: ['考评进位', '强省科创', '场站投产', '实名穿透'], axisLabel: { color: textWhite } },
        series: [{
          name: '进度(%)',
          type: 'bar',
          data: [85, 75, 100, 92],
          itemStyle: { color: mainCyan }
        }]
      }
    },

    // ------------------- TAB 8 -------------------
    jv_assets: {
      kpis: [
        { label: '合资合作企业总数', value: '8', unit: '家' },
        { label: '参控股资产净额', value: '1.24', unit: '亿元' },
        { label: '合资单位总注册资本', value: '5,800', unit: '万元' },
        { label: '投资回收周期指数', value: '7.82', unit: '年' }
      ],
      columns: [
        { prop: 'jvName', label: '合资公司名称' },
        { prop: 'share', label: '出资持股(%)' },
        { prop: 'assets', label: '账面资产规模(万)' },
        { prop: 'profit', label: '当期利润(万)' }
      ],
      tableData: [
        { jvName: '丽水缙云聚力沥青材料研发有限公司', share: '45.0', assets: '4,520.0', profit: '342.1' },
        { jvName: '丽水市恒安交通路牌有限公司', share: '35.0', assets: '2,910.4', profit: '124.5' },
        { jvName: '遂昌路安沥青拌合有限公司', share: '51.0', assets: '3,842.0', profit: '281.9' },
        { jvName: '景宁交投新材料开发有限公司', share: '15.0', assets: '1,500.0', profit: '89.4' }
      ],
      chartOption: {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['聚力材料', '恒安交安', '路安拌合', '景宁新材'], axisLabel: { color: textWhite } },
        yAxis: { type: 'value', axisLabel: { color: textWhite } },
        series: [{
          name: '账面资产(万)',
          type: 'bar',
          data: [4520, 2910, 3842, 1500],
          itemStyle: { color: mainBlue }
        }]
      }
    }
  }

  // Fallback programmatic option builder for general/unspecified types
  const defaultItem = config[chartType] || {
    kpis: [
      { label: '累计指标数值', value: '3,842.0', unit: '万元' },
      { label: '同比增速', value: '8.45', unit: '%' },
      { label: '计划达成率', value: '98.5', unit: '%' },
      { label: '风险评估值', value: '安全', unit: '' }
    ],
    columns: [
      { prop: 'col1', label: '数据类别' },
      { prop: 'col2', label: '期末数值(万元)' },
      { prop: 'col3', label: '预算指标(万元)' },
      { prop: 'col4', label: '进度百分比' }
    ],
    tableData: [
      { col1: '主营大宗业务', col2: '2,410.5', col3: '2,500.0', col4: '96.4%' },
      { col1: '多元辅业发展', col2: '1,431.5', col3: '1,342.0', col4: '106.6%' }
    ],
    chartOption: {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['一期', '二期', '三期'], axisLabel: { color: textWhite } },
      yAxis: { type: 'value', axisLabel: { color: textWhite } },
      series: [{
        name: '实际值(万)',
        type: 'bar',
        barWidth: '50%',
        data: [2410, 1431, 3842],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: mainCyan },
            { offset: 1, color: mainBlue }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      }]
    }
  }

  return defaultItem
}

<template>
  <div class="container">
    <Layout ref="asideLayout">
      <!-- 1. Header Section Slot -->
      <template #header>
        <HeaderLayout>
          <template #left>
            <div class="header-left">
              <div class="header-brand">
                <img src="@/assets/logo-zhejiangjiaogong.png" class="brand-logo" alt="logo" />
                <span class="brand-name">浙江交工</span>
              </div>
            </div>
          </template>

          <template #middle>
            <div class="header-center-title">
              <div class="header-title-panel">
                <div class="title-panel-inner">
                  <div class="title-main-text">
                    交科养护 · 经营内参
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #right>
            <div class="header-right">
              <TimeCounter class="header-time" />
              <div class="header-user">
                <i class="el-icon-user-solid"></i>
                <span>周末</span>
              </div>
              <div class="header-fullscreen">
                <FullScreen />
              </div>
            </div>
          </template>
        </HeaderLayout>
      </template>

      <!-- 2. Background Map Slot -->
      <template #back>
        <QiaoLiangDiTu 
          :filterCompanies="filterCompanies" 
          :filterRegions="filterRegions" 
          :filterYears="filterYears"
          @distribution-change="handleDistributionChange"
          ref="refMap"
        />
      </template>

      <!-- 3. Dynamic Top Indicators based on map distribution filter -->
      <template #top>
        <div class="top-indicator-dashboard">

          <!-- MODE 0: Default -> 一利五率 & 人员/设备情况 -->
          <template v-if="!currentDistributionType">
            <!-- Line 1: 一利五率 -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat profit-main">
                <div class="main-stat-icon"><i class="el-icon-trophy"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">一利五率</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num gold">15.2</span>
                    <span class="main-stat-unit">%</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">利润总额</span>
                  <div class="sub-stat-value"><span class="sub-num gold">28.5</span><span class="sub-unit">亿</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">资产负债率</span>
                  <div class="sub-stat-value"><span class="sub-num gold">68.5</span><span class="sub-unit">%</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">净资产收益率</span>
                  <div class="sub-stat-value"><span class="sub-num gold">12.3</span><span class="sub-unit">%</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">研发投入强度</span>
                  <div class="sub-stat-value"><span class="sub-num gold">3.8</span><span class="sub-unit">%</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">劳动生产率</span>
                  <div class="sub-stat-value"><span class="sub-num gold">486</span><span class="sub-unit">万/人</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">营业收现率</span>
                  <div class="sub-stat-value"><span class="sub-num gold">92.6</span><span class="sub-unit">%</span></div>
                </div>
              </div>
            </div>

            <!-- Line 2: 人员情况 + 设备情况 -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat personnel-main">
                <div class="main-stat-icon"><i class="el-icon-user-solid"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">人员情况</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num cyan">{{ currentTopData.personnel.total }}</span>
                    <span class="main-stat-unit">人</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">正式员工</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">{{ currentTopData.personnel.regular }}</span><span class="sub-unit">人</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">劳务外包</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">{{ currentTopData.personnel.outsourced }}</span><span class="sub-unit">人</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">人均年龄</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">{{ currentTopData.personnel.avgAge }}</span><span class="sub-unit">岁</span></div>
                </div>
              </div>

              <div class="row-separator"></div>

              <div class="row-main-stat equipment-main">
                <div class="main-stat-icon"><i class="el-icon-truck"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">设备情况</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num green">{{ currentTopData.equipment.vehiclesTotal }}</span>
                    <span class="main-stat-unit">辆</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">在租车辆</span>
                  <div class="sub-stat-value"><span class="sub-num green">{{ currentTopData.equipment.vehiclesRented }}</span><span class="sub-unit">辆</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">站外租在场</span>
                  <div class="sub-stat-value"><span class="sub-num green">{{ currentTopData.equipment.rentedOnSite }}</span><span class="sub-unit">台/套</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">本年累计租金</span>
                  <div class="sub-stat-value"><span class="sub-num green">{{ currentTopData.equipment.yearRentFee }}</span><span class="sub-unit">万元</span></div>
                </div>
              </div>
            </div>
          </template>

          <!-- MODE 1: 'project' (项目分布) -> 项目总数, 在建/完工项目部, 按管养区域统计 -->
          <template v-else-if="currentDistributionType === 'project'">
            <!-- Line 1: 项目与项目部汇总 -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat project-main">
                <div class="main-stat-icon"><i class="el-icon-folder-opened"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">项目分布</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num gold">{{ filteredCounts.projectTotal }}</span>
                    <span class="main-stat-unit">个</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">在建项目部</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">{{ filteredCounts.activeOffice }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">完工项目部</span>
                  <div class="sub-stat-value"><span class="sub-num green">{{ filteredCounts.completedOffice }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">在建占比</span>
                  <div class="sub-stat-value"><span class="sub-num blue">{{ filteredCounts.activeRatio }}</span><span class="sub-unit">%</span></div>
                </div>
              </div>
            </div>

            <!-- Line 2: 按管养区域统计 -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat area-main">
                <div class="main-stat-icon"><i class="el-icon-map-location"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">管养区域分布</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num cyan">{{ filteredCounts.provIn + filteredCounts.provOut + filteredCounts.provOther + filteredCounts.abroad }}</span>
                    <span class="main-stat-unit">个</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">省内交投内</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">{{ filteredCounts.provIn }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">省内交投外</span>
                  <div class="sub-stat-value"><span class="sub-num gold">{{ filteredCounts.provOut }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">省外区域</span>
                  <div class="sub-stat-value"><span class="sub-num green">{{ filteredCounts.provOther }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">国外/跨境</span>
                  <div class="sub-stat-value"><span class="sub-num blue">{{ filteredCounts.abroad }}</span><span class="sub-unit">个</span></div>
                </div>
              </div>
            </div>
          </template>

          <!-- MODE 2: 'office' (项目部所在分布) -> 项目部数量及相关指标 -->
          <template v-else-if="currentDistributionType === 'office'">
            <!-- Line 1: 项目部概况 -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat office-main">
                <div class="main-stat-icon"><i class="el-icon-office-building"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">项目部</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num gold">{{ filteredCounts.officeTotal }}</span>
                    <span class="main-stat-unit">个</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">在建运行</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">{{ filteredCounts.runningOffice }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">完工/收尾</span>
                  <div class="sub-stat-value"><span class="sub-num green">{{ filteredCounts.finishOffice }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">平均配备人员</span>
                  <div class="sub-stat-value"><span class="sub-num blue">{{ filteredCounts.avgStaff }}</span><span class="sub-unit">人/部</span></div>
                </div>
              </div>
            </div>

            <!-- Line 2: 区域中心分布 -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat area-main">
                <div class="main-stat-icon"><i class="el-icon-s-home"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">区域中心分布</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num cyan">86</span>
                    <span class="main-stat-unit">个</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">浙东区域中心</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">24</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">浙西区域中心</span>
                  <div class="sub-stat-value"><span class="sub-num gold">22</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">浙南区域中心</span>
                  <div class="sub-stat-value"><span class="sub-num green">18</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">浙北区域中心</span>
                  <div class="sub-stat-value"><span class="sub-num blue">14</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">省外及跨境</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">8</span><span class="sub-unit">个</span></div>
                </div>
              </div>
            </div>
          </template>

          <!-- MODE 3: 'site' (施工点位分布) -> 正在施工数量, 施工类型(日常/专项/其他), 封道情况(一类、二类、三类) -->
          <template v-else-if="currentDistributionType === 'site'">
            <!-- Line 1: 正在施工总数与类型 -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat site-main">
                <div class="main-stat-icon"><i class="el-icon-guide"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">施工点位</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num cyan">{{ filteredCounts.siteTotal }}</span>
                    <span class="main-stat-unit">个</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">日常养护点位</span>
                  <div class="sub-stat-value"><span class="sub-num green">{{ filteredCounts.dailySite }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">专项工程点位</span>
                  <div class="sub-stat-value"><span class="sub-num gold">{{ filteredCounts.specSite }}</span><span class="sub-unit">个</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">其他应急点位</span>
                  <div class="sub-stat-value"><span class="sub-num blue">{{ filteredCounts.emerSite }}</span><span class="sub-unit">个</span></div>
                </div>
              </div>
            </div>

            <!-- Line 2: 封道情况统计 (一类、二类、三类) -->
            <div class="indicator-row ref-row">
              <div class="row-main-stat alert-main">
                <div class="main-stat-icon"><i class="el-icon-warning-outline"></i></div>
                <div class="main-stat-info">
                  <div class="main-stat-label">施工封道情况</div>
                  <div class="main-stat-value">
                    <span class="main-stat-num red">{{ filteredCounts.alert1 + filteredCounts.alert2 + filteredCounts.alert3 }}</span>
                    <span class="main-stat-unit">处</span>
                  </div>
                </div>
              </div>
              <div class="row-sub-stats">
                <div class="sub-stat-item">
                  <span class="sub-stat-label">一类封道</span>
                  <span class="sub-stat-sub">主线全封闭</span>
                  <div class="sub-stat-value"><span class="sub-num red">{{ filteredCounts.alert1 }}</span><span class="sub-unit">处</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">二类封道</span>
                  <span class="sub-stat-sub">借道/车道封</span>
                  <div class="sub-stat-value"><span class="sub-num gold">{{ filteredCounts.alert2 }}</span><span class="sub-unit">处</span></div>
                </div>
                <div class="sub-stat-item">
                  <span class="sub-stat-label">三类封道</span>
                  <span class="sub-stat-sub">移动/肩道施工</span>
                  <div class="sub-stat-value"><span class="sub-num cyan">{{ filteredCounts.alert3 }}</span><span class="sub-unit">处</span></div>
                </div>
              </div>
            </div>
          </template>

        </div>
      </template>

      <!-- 4. Left Sidebar (3 Modules) -->
      <template #left>
        <div class="sidebar-wrapper animate-left" :key="'left-' + activeTab">
          <div 
            class="card-item" 
            :class="{ 
              'market-card-item': item.chartType === 'market_expansion',
              'operation-card-item': item.chartType === 'group_operation', 
              'regional-card-item': item.chartType === 'regional_market',
              'warning-card-item': item.chartType === 'output_conversion',
              'jv-card-item': item.chartType === 'jv_companies'
            }"
            v-for="(item, idx) in currentTabConfig.left" 
            :key="'l-' + idx"
          >
            <ScreenSubtitle :name="item.title">
              <template #right>
                <el-button 
                  type="text" 
                  size="mini" 
                  class="detail-btn" 
                  icon="el-icon-zoom-in"
                  @click="handleViewDetail(item)"
                >
                  查看详情
                </el-button>
              </template>
            </ScreenSubtitle>
            <div class="chart-wrapper" :class="{ 
              'market-chart-wrapper': item.chartType === 'market_expansion',
              'operation-chart-wrapper': item.chartType === 'group_operation', 
              'regional-chart-wrapper': item.chartType === 'regional_market',
              'warning-chart-wrapper': item.chartType === 'output_conversion',
              'jv-chart-wrapper': item.chartType === 'jv_companies'
            }">
              <div v-if="item.chartType === 'market_expansion'" class="market-expansion-card">
                <!-- Highlight Row for Year Accumulated & Year Target & Target Rate -->
                <div class="market-highlight-row">
                  <div class="highlight-item accumulated">
                    <div class="highlight-label">
                      <span class="dot">●</span>本年度开累金额
                    </div>
                    <div class="highlight-value-wrap">
                      <span class="highlight-value">26,800</span>
                      <span class="highlight-unit">万元</span>
                    </div>
                  </div>
                  <div class="highlight-item target">
                    <div class="highlight-label">
                      <span class="dot">●</span>本年度目标金额
                    </div>
                    <div class="highlight-value-wrap">
                      <span class="highlight-value">35,000</span>
                      <span class="highlight-unit">万元</span>
                    </div>
                  </div>
                  <div class="highlight-item rate">
                    <div class="highlight-label">
                      <span class="dot">●</span>目标完成进度
                    </div>
                    <div class="highlight-value-wrap">
                      <span class="highlight-value highlight-gold">76.57</span>
                      <span class="highlight-unit">%</span>
                    </div>
                  </div>
                </div>

                <!-- Monthly New Contract Amount + Target Progress Line EChart -->
                <div :ref="'leftChart' + idx" class="echart-box-sub market-chart-sub"></div>
              </div>
              <div v-else-if="item.chartType === 'group_operation'" class="group-operation-card">
                <!-- 1. 顶部：四个关键指标数据 (开累产值, 已上报计量, 已收预付款, 已收计量款) -->
                <div class="op-metrics-grid">
                  <div class="op-metric-cell accum">
                    <div class="metric-icon"><i class="el-icon-s-data"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">开累产值</div>
                      <div class="metric-value">45,280 <span class="unit">万</span></div>
                    </div>
                  </div>
                  <div class="op-metric-cell reported">
                    <div class="metric-icon"><i class="el-icon-upload2"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">已上报计量</div>
                      <div class="metric-value">38,150 <span class="unit">万</span></div>
                    </div>
                  </div>
                  <div class="op-metric-cell prepayment">
                    <div class="metric-icon"><i class="el-icon-wallet"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">已收预付款</div>
                      <div class="metric-value">2,170 <span class="unit">万</span></div>
                    </div>
                  </div>
                  <div class="op-metric-cell payment">
                    <div class="metric-icon"><i class="el-icon-money"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">已收计量款</div>
                      <div class="metric-value">32,770 <span class="unit">万</span></div>
                    </div>
                  </div>
                </div>

                <!-- 2. 下部：仪表图展示计量形象比、收款计量比 -->
                <div class="op-gauges-row">
                  <!-- 仪表图 1: 计量形象比 -->
                  <div class="op-gauge-item">
                    <div class="gauge-dial-wrap">
                      <svg viewBox="0 0 120 70" class="gauge-svg">
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="7" stroke-linecap="round" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(0, 243, 255, 0.25)" stroke-width="7" stroke-dasharray="2 5" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="url(#gaugeCyanGrad)" stroke-width="7" stroke-linecap="round" stroke-dasharray="119.1 141.37" />
                        <defs>
                          <linearGradient id="gaugeCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#1b6cff" />
                            <stop offset="100%" stop-color="#00f3ff" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div class="gauge-center-val cyan">
                        84.25<span class="unit">%</span>
                      </div>
                    </div>
                    <div class="gauge-label">计量形象比</div>
                    <div class="gauge-sub">已上报计量 / 产值</div>
                  </div>

                  <!-- 仪表图 2: 收款计量比 -->
                  <div class="op-gauge-item">
                    <div class="gauge-dial-wrap">
                      <svg viewBox="0 0 120 70" class="gauge-svg">
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="7" stroke-linecap="round" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(237, 190, 117, 0.25)" stroke-width="7" stroke-dasharray="2 5" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="url(#gaugeGoldGrad)" stroke-width="7" stroke-linecap="round" stroke-dasharray="109.1 141.37" />
                        <defs>
                          <linearGradient id="gaugeGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#e6a23c" />
                            <stop offset="100%" stop-color="#edbe75" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div class="gauge-center-val gold">
                        77.16<span class="unit">%</span>
                      </div>
                    </div>
                    <div class="gauge-label">收款计量比</div>
                    <div class="gauge-sub">(已收计量款+已收预付款) / 产值</div>
                  </div>
                </div>
              </div>
              <div v-else-if="item.chartType === 'regional_market'" class="regional-market-card">
                <!-- Top 3 Key Metrics Summary -->
                <div class="annual-op-summary-row">
                  <div class="op-summary-item planned">
                    <div class="op-summary-label"><i class="el-icon-date"></i> 年度计划产值</div>
                    <div class="op-summary-val-wrap">
                      <span class="op-summary-num">50,000</span>
                      <span class="op-summary-unit">万元</span>
                    </div>
                  </div>
                  <div class="op-summary-item actual">
                    <div class="op-summary-label"><i class="el-icon-circle-check"></i> 年度实际产值</div>
                    <div class="op-summary-val-wrap">
                      <span class="op-summary-num">45,280</span>
                      <span class="op-summary-unit">万元</span>
                    </div>
                  </div>
                  <div class="op-summary-item rate">
                    <div class="op-summary-label"><i class="el-icon-trophy"></i> 达成率</div>
                    <div class="op-summary-val-wrap">
                      <span class="op-summary-num highlight-cyan">90.56</span>
                      <span class="op-summary-unit">%</span>
                    </div>
                  </div>
                </div>
                <!-- EChart Container -->
                <div :ref="'leftChart' + idx" class="echart-box-sub"></div>
              </div>

              <!-- Case: Progress Warning Carousel Card -->
              <div v-else-if="item.chartType === 'output_conversion'" class="progress-warning-card">
                <!-- Top Warning Header Stats -->
                <div class="warning-stats-header">
                  <div class="warning-badge-total">
                    <i class="el-icon-warning-outline"></i>
                    <span>实时预警 <b>{{ warningList.length }}</b> 项</span>
                  </div>
                  <div class="warning-badge-counts">
                    <span class="count-tag danger">严重 {{ dangerCount }}</span>
                    <span class="count-tag warning">警告 {{ warningCount }}</span>
                    <span class="count-tag info">提示 {{ infoCount }}</span>
                  </div>
                </div>

                <!-- Featured Active Warning Carousel Body -->
                <div 
                  class="warning-carousel-body"
                  @mouseenter="stopWarningTimer"
                  @mouseleave="startWarningTimer"
                >
                  <transition name="warning-slide" mode="out-in">
                    <div 
                      :key="currentWarning.id" 
                      class="active-warning-box"
                      :class="currentWarning.level"
                    >
                      <div class="active-warning-top">
                        <span class="warning-type-tag" :class="currentWarning.level">
                          <i :class="currentWarning.level === 'danger' ? 'el-icon-error' : currentWarning.level === 'warning' ? 'el-icon-warning' : 'el-icon-info'"></i>
                          {{ currentWarning.category }}
                        </span>
                        <span class="warning-dept"><i class="el-icon-office-building"></i> {{ currentWarning.dept }}</span>
                        <span class="warning-time">{{ currentWarning.time }}</span>
                      </div>
                      <div class="active-warning-title">{{ currentWarning.title }}</div>
                      <div class="active-warning-desc">{{ currentWarning.desc }}</div>
                    </div>
                  </transition>

                  <!-- Carousel Control Dots -->
                  <div class="warning-carousel-controls">
                    <div 
                      v-for="(wItem, wIdx) in warningList" 
                      :key="wItem.id"
                      class="control-dot"
                      :class="{ active: wIdx === activeWarningIndex, [wItem.level]: true }"
                      @click="activeWarningIndex = wIdx"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Case: Joint Venture Companies Status -->
              <div v-else-if="item.chartType === 'jv_companies'" class="jv-companies-card">
                <!-- Summary Bar -->
                <div class="jv-summary-bar">
                  <div class="jv-summary-item">
                    <span class="jv-sum-label">合资公司</span>
                    <span class="jv-sum-val cyan">6 <span class="unit">家</span></span>
                  </div>
                  <div class="jv-sum-divider"></div>
                  <div class="jv-summary-item">
                    <span class="jv-sum-label">交工委派</span>
                    <span class="jv-sum-val blue">28 <span class="unit">人</span></span>
                  </div>
                  <div class="jv-sum-divider"></div>
                  <div class="jv-summary-item">
                    <span class="jv-sum-label">年度总营收</span>
                    <span class="jv-sum-val gold">2.85 <span class="unit">亿元</span></span>
                  </div>
                </div>

                <!-- JV List Container -->
                <div class="jv-list-container">
                  <div class="jv-list-header">
                    <span class="col-name">合资公司名称</span>
                    <span class="col-share">股权比例</span>
                    <span class="col-staff">委派人员</span>
                    <span class="col-revenue">年度营收</span>
                  </div>
                  <div class="jv-list-body custom-scrollbar">
                    <div 
                      v-for="(jv, jvIdx) in jvCompanyList" 
                      :key="jvIdx" 
                      class="jv-row-item"
                    >
                      <div class="col-name" :title="jv.jvName">
                        <span class="dot"></span>
                        <span class="name-text">{{ jv.jvName }}</span>
                      </div>
                      <div class="col-share">
                        <span class="share-badge" :class="getShareBadgeClass(jv.shareNum)">{{ jv.share }}</span>
                      </div>
                      <div class="col-staff">
                        <i class="el-icon-user"></i>
                        <span class="staff-num">{{ jv.staffCount }}人</span>
                      </div>
                      <div class="col-revenue">
                        <span class="rev-num">{{ jv.revenue }}</span>
                        <span class="rev-unit">万</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else :ref="'leftChart' + idx" class="echart-box"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- 5. Right Sidebar (4 Modules for ref_inner, 3 for others) -->
      <template #right>
        <div class="sidebar-wrapper animate-right" :key="'right-' + activeTab">
          <div 
            class="card-item" 
            v-for="(item, idx) in currentTabConfig.right" 
            :key="'r-' + idx"
            :class="{ 
              'receivables-card-item': item.chartType === 'receivables_info', 
              'jv-card-item': item.chartType === 'jv_companies',
              'operation-card-item': item.chartType === 'group_operation',
              'regional-card-item': item.chartType === 'regional_market'
            }"
          >
            <ScreenSubtitle :name="item.title">
              <template #right>
                <el-button 
                  type="text" 
                  size="mini" 
                  class="detail-btn" 
                  icon="el-icon-zoom-in"
                  @click="handleViewDetail(item)"
                >
                  查看详情
                </el-button>
              </template>
            </ScreenSubtitle>
            <div class="chart-wrapper" :class="{ 
              'receivables-chart-wrapper': item.chartType === 'receivables_info', 
              'jv-chart-wrapper': item.chartType === 'jv_companies',
              'operation-chart-wrapper': item.chartType === 'group_operation',
              'regional-chart-wrapper': item.chartType === 'regional_market'
            }">
              <!-- Case 1: Project Info -->
              <div v-if="item.chartType === 'project_info'" class="project-info-side-card">
                <!-- Summary Row -->
                <div class="proj-sum-row">
                  <div class="sum-item total">
                    <span class="sum-val">300<span class="sum-unit">个</span></span>
                    <span class="sum-label">项目总数</span>
                  </div>
                  <div class="sum-item construction">
                    <span class="sum-val">254<span class="sum-unit">个</span></span>
                    <span class="sum-label">在建项目</span>
                  </div>
                  <div class="sum-item completed">
                    <span class="sum-val">46<span class="sum-unit">个</span></span>
                    <span class="sum-label">完工项目</span>
                  </div>
                </div>

                <!-- 4 Categories Grid (管养区域: 省内交投内, 省内交投外, 省外, 国外) -->
                <div class="proj-categories-grid">
                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot provIn"></span>省内交投内</span>
                      <span class="cat-num">182个 (60.7%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill provIn" style="width: 60.7%"></div>
                    </div>
                  </div>

                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot provOut"></span>省内交投外</span>
                      <span class="cat-num">68个 (22.7%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill provOut" style="width: 22.7%"></div>
                    </div>
                  </div>

                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot outProv"></span>省外</span>
                      <span class="cat-num">38个 (12.7%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill outProv" style="width: 12.7%"></div>
                    </div>
                  </div>

                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot abroad"></span>国外</span>
                      <span class="cat-num">12个 (3.9%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill abroad" style="width: 3.9%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 2: Group Operation Dashboard -->
              <div v-else-if="item.chartType === 'group_operation'" class="group-operation-card">
                <!-- 1. 顶部：四个关键指标数据 (开累产值, 已上报计量, 已收预付款, 已收计量款) -->
                <div class="op-metrics-grid">
                  <div class="op-metric-cell accum">
                    <div class="metric-icon"><i class="el-icon-s-data"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">开累产值</div>
                      <div class="metric-value">45,280 <span class="unit">万</span></div>
                    </div>
                  </div>
                  <div class="op-metric-cell reported">
                    <div class="metric-icon"><i class="el-icon-upload2"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">已上报计量</div>
                      <div class="metric-value">38,150 <span class="unit">万</span></div>
                    </div>
                  </div>
                  <div class="op-metric-cell prepayment">
                    <div class="metric-icon"><i class="el-icon-wallet"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">已收预付款</div>
                      <div class="metric-value">2,170 <span class="unit">万</span></div>
                    </div>
                  </div>
                  <div class="op-metric-cell payment">
                    <div class="metric-icon"><i class="el-icon-money"></i></div>
                    <div class="metric-content">
                      <div class="metric-label">已收计量款</div>
                      <div class="metric-value">32,770 <span class="unit">万</span></div>
                    </div>
                  </div>
                </div>

                <!-- 2. 下部：仪表图展示计量形象比、收款计量比 -->
                <div class="op-gauges-row">
                  <!-- 仪表图 1: 计量形象比 -->
                  <div class="op-gauge-item">
                    <div class="gauge-dial-wrap">
                      <svg viewBox="0 0 120 70" class="gauge-svg">
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="7" stroke-linecap="round" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(0, 243, 255, 0.25)" stroke-width="7" stroke-dasharray="2 5" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="url(#gaugeCyanGrad)" stroke-width="7" stroke-linecap="round" stroke-dasharray="119.1 141.37" />
                        <defs>
                          <linearGradient id="gaugeCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#1b6cff" />
                            <stop offset="100%" stop-color="#00f3ff" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div class="gauge-center-val cyan">
                        84.25<span class="unit">%</span>
                      </div>
                    </div>
                    <div class="gauge-label">计量形象比</div>
                    <div class="gauge-sub">已上报计量 / 产值</div>
                  </div>

                  <!-- 仪表图 2: 收款计量比 -->
                  <div class="op-gauge-item">
                    <div class="gauge-dial-wrap">
                      <svg viewBox="0 0 120 70" class="gauge-svg">
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="7" stroke-linecap="round" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="rgba(237, 190, 117, 0.25)" stroke-width="7" stroke-dasharray="2 5" />
                        <path d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="url(#gaugeGoldGrad)" stroke-width="7" stroke-linecap="round" stroke-dasharray="109.1 141.37" />
                        <defs>
                          <linearGradient id="gaugeGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#e6a23c" />
                            <stop offset="100%" stop-color="#edbe75" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div class="gauge-center-val gold">
                        77.16<span class="unit">%</span>
                      </div>
                    </div>
                    <div class="gauge-label">收款计量比</div>
                    <div class="gauge-sub">(已收计量款+已收预付款) / 产值</div>
                  </div>
                </div>
              </div>

              <!-- Case 3: Regional Market Completion -->
              <div v-else-if="item.chartType === 'regional_market'" class="regional-market-card">
                <!-- Top 3 Key Metrics Summary -->
                <div class="annual-op-summary-row">
                  <div class="op-summary-item planned">
                    <div class="op-summary-label"><i class="el-icon-date"></i> 年度计划产值</div>
                    <div class="op-summary-val-wrap">
                      <span class="op-summary-num">50,000</span>
                      <span class="op-summary-unit">万元</span>
                    </div>
                  </div>
                  <div class="op-summary-item actual">
                    <div class="op-summary-label"><i class="el-icon-circle-check"></i> 年度实际产值</div>
                    <div class="op-summary-val-wrap">
                      <span class="op-summary-num">45,280</span>
                      <span class="op-summary-unit">万元</span>
                    </div>
                  </div>
                  <div class="op-summary-item rate">
                    <div class="op-summary-label"><i class="el-icon-trophy"></i> 达成率</div>
                    <div class="op-summary-val-wrap">
                      <span class="op-summary-num highlight-cyan">90.56</span>
                      <span class="op-summary-unit">%</span>
                    </div>
                  </div>
                </div>
                <!-- EChart Container -->
                <div :ref="'rightChart' + idx" class="echart-box-sub"></div>
              </div>

              <!-- Case 4: Group Accounts Receivable (Standalone Card) -->
              <div v-else-if="item.chartType === 'receivables_info'" class="receivables-mini-panel">
                <div class="receivables-mini-table-wrapper" style="margin-top: 2px;">
                  <!-- Table Header -->
                  <div class="mini-table-header">
                    <div class="cell-region" style="width: 20%">区域</div>
                    <div class="cell-base" style="width: 22%">考核基数</div>
                    <div class="cell-received" style="width: 22%">本年收款</div>
                    <div class="cell-ratio" style="width: 18%">完成比例</div>
                    <div class="cell-uncollected" style="width: 18%">未收款</div>
                  </div>
                  
                  <!-- Table Body (Auto Scroll) -->
                  <div 
                    class="mini-table-body-scroll" 
                    ref="scrollContainer"
                    @mouseenter="isHoveringTable = true"
                    @mouseleave="isHoveringTable = false"
                  >
                    <div 
                      v-for="(row, rIdx) in sortedReceivables" 
                      :key="row.region"
                      class="mini-table-row"
                      :class="{ 'even-row': rIdx % 2 === 1 }"
                    >
                      <div class="cell-region" style="width: 20%">{{ row.region.replace('区域中心', '') }}</div>
                      <div class="cell-base num-font" style="width: 22%">{{ row.base.toFixed(0) }}</div>
                      <div class="cell-received num-font" style="width: 22%">{{ row.received.toFixed(0) }}</div>
                      <div class="cell-ratio num-font" style="width: 18%" :style="{ color: getRatioColor(row.ratio) }">
                        {{ (row.ratio * 100).toFixed(0) }}%
                      </div>
                      <div class="cell-uncollected num-font" style="width: 18%" :style="{ color: row.uncollected < 0 ? '#ff4d4f' : '#67c23a' }">
                        {{ row.uncollected.toFixed(0) }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Table Footer (Frozen / Sticky) -->
                  <div class="mini-table-footer">
                    <div class="cell-region" style="width: 20%">合计</div>
                    <div class="cell-base num-font" style="width: 22%">{{ totalBase.toFixed(0) }}</div>
                    <div class="cell-received num-font" style="width: 22%">{{ totalReceived.toFixed(0) }}</div>
                    <div class="cell-ratio num-font" style="width: 18%; color: #00f3ff">
                      {{ (totalRatio * 100).toFixed(0) }}%
                    </div>
                    <div class="cell-uncollected num-font" style="width: 18%" :style="{ color: totalUncollected < 0 ? '#ff4d4f' : '#67c23a' }">
                      {{ totalUncollected.toFixed(0) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 3: Progress Warning Carousel Card -->
              <div v-else-if="item.chartType === 'output_conversion'" class="progress-warning-card">
                <!-- Top Warning Header Stats -->
                <div class="warning-stats-header">
                  <div class="warning-badge-total">
                    <i class="el-icon-warning-outline"></i>
                    <span>实时预警 <b>{{ warningList.length }}</b> 项</span>
                  </div>
                  <div class="warning-badge-counts">
                    <span class="count-tag danger">严重 {{ dangerCount }}</span>
                    <span class="count-tag warning">警告 {{ warningCount }}</span>
                    <span class="count-tag info">提示 {{ infoCount }}</span>
                  </div>
                </div>

                <!-- Featured Active Warning Carousel Body -->
                <div 
                  class="warning-carousel-body"
                  @mouseenter="stopWarningTimer"
                  @mouseleave="startWarningTimer"
                >
                  <transition name="warning-slide" mode="out-in">
                    <div 
                      :key="currentWarning.id" 
                      class="active-warning-box"
                      :class="currentWarning.level"
                    >
                      <div class="active-warning-top">
                        <span class="warning-type-tag" :class="currentWarning.level">
                          <i :class="currentWarning.level === 'danger' ? 'el-icon-error' : currentWarning.level === 'warning' ? 'el-icon-warning' : 'el-icon-info'"></i>
                          {{ currentWarning.category }}
                        </span>
                        <span class="warning-dept"><i class="el-icon-office-building"></i> {{ currentWarning.dept }}</span>
                        <span class="warning-time">{{ currentWarning.time }}</span>
                      </div>
                      <div class="active-warning-title">{{ currentWarning.title }}</div>
                      <div class="active-warning-desc">{{ currentWarning.desc }}</div>
                    </div>
                  </transition>

                  <!-- Carousel Control Dots -->
                  <div class="warning-carousel-controls">
                    <div 
                      v-for="(wItem, wIdx) in warningList" 
                      :key="wItem.id"
                      class="control-dot"
                      :class="{ active: wIdx === activeWarningIndex, [wItem.level]: true }"
                      @click="activeWarningIndex = wIdx"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Case 4: Joint Venture Companies Status -->
              <div v-else-if="item.chartType === 'jv_companies'" class="jv-companies-card">
                <!-- Summary Bar -->
                <div class="jv-summary-bar">
                  <div class="jv-summary-item">
                    <span class="jv-sum-label">合资公司</span>
                    <span class="jv-sum-val cyan">6 <span class="unit">家</span></span>
                  </div>
                  <div class="jv-sum-divider"></div>
                  <div class="jv-summary-item">
                    <span class="jv-sum-label">交工委派</span>
                    <span class="jv-sum-val blue">28 <span class="unit">人</span></span>
                  </div>
                  <div class="jv-sum-divider"></div>
                  <div class="jv-summary-item">
                    <span class="jv-sum-label">年度总营收</span>
                    <span class="jv-sum-val gold">2.85 <span class="unit">亿元</span></span>
                  </div>
                </div>

                <!-- JV List Container -->
                <div class="jv-list-container">
                  <div class="jv-list-header">
                    <span class="col-name">合资公司名称</span>
                    <span class="col-share">股权比例</span>
                    <span class="col-staff">委派人员</span>
                    <span class="col-revenue">年度营收</span>
                  </div>
                  <div class="jv-list-body custom-scrollbar">
                    <div 
                      v-for="(jv, jvIdx) in jvCompanyList" 
                      :key="jvIdx" 
                      class="jv-row-item"
                    >
                      <div class="col-name" :title="jv.jvName">
                        <span class="dot"></span>
                        <span class="name-text">{{ jv.jvName }}</span>
                      </div>
                      <div class="col-share">
                        <span class="share-badge" :class="getShareBadgeClass(jv.shareNum)">{{ jv.share }}</span>
                      </div>
                      <div class="col-staff">
                        <i class="el-icon-user"></i>
                        <span class="staff-num">{{ jv.staffCount }}人</span>
                      </div>
                      <div class="col-revenue">
                        <span class="rev-num">{{ jv.revenue }}</span>
                        <span class="rev-unit">万</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 5: Echarts Fallback -->
              <div v-else :ref="'rightChart' + idx" class="echart-box"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- 6. Bottom Interactive Panel (Search Area) -->
      <template #bottom>
        <div class="bottom-integrated-panel">
          <!-- Requirement 4: Search/Filter Area (checkboxes) -->
          <div class="filter-row">
            <!-- 1. Qualifications Section -->
            <div class="filter-section">
              <span class="section-title">
                <i class="el-icon-office-building"></i>
                <span>养护资质</span>
              </span>
              <div class="checkbox-group">
                <div 
                  v-for="company in companyOptions" 
                  :key="company"
                  class="cyber-checkbox-label"
                  :class="{ checked: filterCompanies.includes(company) }"
                  @click="selectCompanyFilter(company)"
                >
                  <span class="custom-checkbox-btn">
                    <i class="el-icon-check" v-if="filterCompanies.includes(company)"></i>
                    {{ company }}
                  </span>
                </div>
              </div>

              <!-- Reset Button -->
              <div class="filter-header-action">
                <el-button 
                  type="primary" 
                  size="mini" 
                  icon="el-icon-refresh-left"
                  class="cyber-btn-reset"
                  @click="resetFilters"
                >
                  重置筛选
                </el-button>
              </div>
            </div>

            <!-- 2. Regions Section (9 regional centers) -->
            <div class="filter-section">
              <span class="section-title">
                <i class="el-icon-map-location"></i>
                <span>区域中心</span>
              </span>
              <div class="checkbox-group">
                <div 
                  v-for="region in regionOptions" 
                  :key="region"
                  class="cyber-checkbox-label"
                  :class="{ checked: filterRegions.includes(region) }"
                  @click="selectRegionFilter(region)"
                >
                  <span class="custom-checkbox-btn">
                    <i class="el-icon-check" v-if="filterRegions.includes(region)"></i>
                    {{ region }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 3. Years Section -->
            <div class="filter-section">
              <span class="section-title">
                <i class="el-icon-date"></i>
                <span>年度选择</span>
              </span>
              <div class="checkbox-group">
                <label 
                  v-for="year in yearOptions" 
                  :key="year"
                  class="cyber-checkbox-label"
                  :class="{ checked: filterYears.includes(year) }"
                >
                  <input 
                    type="checkbox" 
                    :value="year" 
                    v-model="filterYears" 
                    class="hidden-input"
                  />
                  <span class="custom-checkbox-btn">
                    <i class="el-icon-check" v-if="filterYears.includes(year)"></i>
                    {{ year }}年
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 7. Plate Switcher Grid Tabs (At absolute page bottom) -->
      <template #switcher>
        <div class="tabs-grid-row">
          <div 
            v-for="(tab, tIdx) in tabs" 
            :key="tab.key" 
            class="grid-tab-item"
            :class="{ active: activeTab === tIdx }"
            @click="handleTabClick(tIdx)"
          >
            <div class="tab-glow-layer"></div>
            <div class="tab-icon-wrap">
              <i :class="tab.icon"></i>
            </div>
            <div class="tab-title">{{ tab.label }}</div>
            <div class="tab-active-indicator"></div>
          </div>
        </div>
      </template>
    </Layout>

    <!-- Top-right warning ticker -->
    <div class="top-right-warning-ticker" @mouseenter="stopWarningTimer" @mouseleave="startWarningTimer">
      <div class="ticker-label">
        <i class="el-icon-warning-outline"></i>
        <span>预警信息</span>
      </div>
      <div class="ticker-window">
        <div class="ticker-track" :style="{ animationDuration: `${Math.max(warningList.length * 6, 24)}s` }">
          <div
            v-for="(wItem, wIdx) in marqueeWarningList"
            :key="`m-${wItem.id}-${wIdx}`"
            class="ticker-item"
            :class="wItem.level"
          >
            <span class="ticker-dot"></span>
            <span class="ticker-category">{{ wItem.category }}</span>
            <span class="ticker-title">{{ wItem.title }}</span>
            <span class="ticker-dept"><i class="el-icon-office-building"></i> {{ wItem.dept }}</span>
            <span class="ticker-time">{{ wItem.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Watermark Overlay -->
    <WaterMaker />

    <!-- Requirement 1: Detailed Down-Drill Dialog (查看详情弹窗) -->
    <el-dialog
      :title="detailDialogTitle"
      :visible.sync="detailDialogVisible"
      :width="activeDetailItem && (activeDetailItem.chartType === 'market_expansion' || activeDetailItem.chartType === 'regional_market' || activeDetailItem.chartType === 'project_info' || activeDetailItem.chartType === 'group_operation') ? '80%' : '1000px'"
      :custom-class="activeDetailItem && (activeDetailItem.chartType === 'market_expansion' || activeDetailItem.chartType === 'regional_market' || activeDetailItem.chartType === 'project_info' || activeDetailItem.chartType === 'group_operation') ? 'market-dialog-large' : ''"
      append-to-body
      class="detail-drill-dialog"
      @opened="handleDialogOpened"
      @closed="handleDialogClosed"
    >
      <div class="dialog-drill-container" v-if="activeDetailItem">
        
        <!-- Custom layout for market_expansion & regional_market -->
        <div v-if="activeDetailItem.chartType === 'market_expansion' || activeDetailItem.chartType === 'regional_market'" class="market-expansion-dialog-body">
          
          <!-- Top Row: Left (Table) & Right (Pie Chart) -->
          <div class="market-top-row">
            <!-- Left Panel: 区域中心指标明细账目 -->
            <div class="market-section-block top-left-panel">
              <div class="market-section-title">
                <span class="title-decorator"></span>
                <span>一、{{ activeDetailItem.chartType === 'regional_market' ? '九大区域中心产值完成明细账目 (降序排列)' : '区域中心指标明细账目 (降序排列)' }}</span>
              </div>
              <div class="table-container">
                <el-table 
                  :data="activeDetailItem.chartType === 'regional_market' ? regionalMarketTableData : marketRegionTableData" 
                  stripe 
                  size="mini"
                  height="100%"
                  style="width: 100%"
                  class="custom-image-style-table"
                >
                  <el-table-column prop="center" label="区域中心" width="110px" />
                  <el-table-column prop="lastYear" :label="activeDetailItem.chartType === 'regional_market' ? '上年完成(万)' : '上年新签(万)'" sortable />
                  <el-table-column prop="target" :label="activeDetailItem.chartType === 'regional_market' ? '今年计划(万)' : '今年目标(万)'" sortable />
                  <el-table-column prop="accumulated" :label="activeDetailItem.chartType === 'regional_market' ? '今年产值(万)' : '今年开累(万)'" sortable />
                  <el-table-column prop="rate" :label="activeDetailItem.chartType === 'regional_market' ? '达成率' : '目标完成率'" sortable width="100px">
                    <template slot-scope="scope">
                      <span style="color: #00f3ff; font-weight: bold;">{{ scope.row.rate }}%</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="monthly" label="本月新增(万)" sortable />
                </el-table>
              </div>
            </div>

            <!-- Right Panel: 资质类别统计 -->
            <div class="market-section-block top-right-panel">
              <div class="market-section-title">
                <span class="title-decorator"></span>
                <span>二、{{ activeDetailItem.chartType === 'regional_market' ? '三大承接资质完成产值占比' : '承接资质本年开累金额占比' }}</span>
              </div>
              <div class="pie-chart-wrapper">
                <div ref="dialogChartQual" style="height: 100%; width: 100%;"></div>
              </div>
            </div>
          </div>

          <!-- Bottom Row: 管养范围维度分析 -->
          <div class="market-section-block bottom-panel">
            <div class="market-section-title">
              <span class="title-decorator"></span>
              <span>三、管养范围维度分析</span>
            </div>

            <div class="scope-split-container">
              <!-- Left: Category list (省内, 省外, 国外) with clickable cards -->
              <div class="scope-left-panel">
                <div class="panel-subtitle">
                  <i class="el-icon-map-location"></i>
                  <span>管养范围分类统计 (点击大类查看下辖明细)</span>
                </div>
                <div class="scope-interactive-cards">
                  <div 
                    v-for="scopeItem in marketScopeSummary" 
                    :key="scopeItem.key" 
                    class="scope-summary-card"
                    :class="{ active: selectedScopeKey === scopeItem.key }"
                    @click="handleScopeClick(scopeItem.key)"
                  >
                    <div class="card-glow"></div>
                    <div class="scope-card-header">
                      <span class="scope-card-title">{{ scopeItem.label }}</span>
                      <span class="scope-card-percent">{{ scopeItem.ratio }}%</span>
                    </div>
                    <div class="scope-card-value">
                      <span class="val-num">{{ scopeItem.value }}</span>
                      <span class="val-unit">万元</span>
                    </div>
                    <div class="scope-card-sub" v-if="scopeItem.sub">
                      {{ scopeItem.sub }}
                    </div>
                    <div class="click-tip">点击切换明细 <i class="el-icon-arrow-right"></i></div>
                  </div>
                </div>
              </div>

              <!-- Right: Drill down places list -->
              <div class="scope-right-panel">
                <div class="panel-subtitle">
                  <i class="el-icon-location-information"></i>
                  <span>【{{ scopeTitleMap[selectedScopeKey] }}】具体区域明细数据</span>
                </div>
                
                <div class="scope-chart-container">
                  <div ref="dialogChartScopeSub" style="height: 100%; width: 100%;"></div>
                </div>

                <div class="scope-table-container">
                  <el-table 
                    :data="currentScopeTableData" 
                    stripe 
                    size="mini"
                    height="100%"
                    style="width: 100%"
                    class="custom-image-style-table"
                  >
                    <el-table-column prop="place" label="具体地点/项目" />
                    <el-table-column prop="accumulated" label="本年开累(万元)" sortable />
                    <el-table-column prop="ratio" label="分类占比(%)" sortable />
                  </el-table>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Custom layout for project_info -->
        <div v-else-if="activeDetailItem.chartType === 'project_info'" class="market-expansion-dialog-body">
          
          <!-- Top Row: Left (Table) & Right (Pie Chart) -->
          <div class="market-top-row">
            <!-- Left Panel: 区域中心指标明细账目 -->
            <div class="market-section-block top-left-panel">
              <div class="market-section-title">
                <span class="title-decorator"></span>
                <span>一、区域单位项目明细统计表</span>
              </div>
              <div class="table-container">
                <el-table 
                  :data="activeDetailTableData" 
                  stripe 
                  size="mini"
                  height="100%"
                  style="width: 100%"
                  class="custom-image-style-table"
                >
                  <el-table-column prop="center" label="区域中心/单位" width="130px" />
                  <el-table-column prop="total" label="项目总数(个)" sortable />
                  <el-table-column prop="underConstruction" label="在建项目(个)" sortable />
                  <el-table-column prop="completed" label="完工项目(个)" sortable />
                  <el-table-column prop="rate" label="项目完工率" sortable width="110px">
                    <template slot-scope="scope">
                      <span style="color: #67C23A; font-weight: bold;">{{ scope.row.rate }}%</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            <!-- Right Panel: 资质公司项目占比饼图 -->
            <div class="market-section-block top-right-panel">
              <div class="market-section-title">
                <span class="title-decorator"></span>
                <span>二、资质公司承接项目总数占比</span>
              </div>
              <div class="pie-chart-wrapper">
                <div ref="dialogChartQual" style="height: 100%; width: 100%;"></div>
              </div>
            </div>
          </div>

          <!-- Bottom Row: 管养区域与下辖明细 -->
          <div class="market-section-block bottom-panel">
            <div class="market-section-title">
              <span class="title-decorator"></span>
              <span>三、管养区域维度深度分析</span>
            </div>

            <div class="scope-split-container">
              <!-- Left: Category list (省内交投内, 省内交投外, 省外, 国外) -->
              <div class="scope-left-panel">
                <div class="panel-subtitle">
                  <i class="el-icon-folder-opened"></i>
                  <span>管养区域统计 (点击大类查看下辖明细)</span>
                </div>
                <div class="scope-interactive-cards">
                  <div 
                    v-for="scopeItem in projectScopeSummary" 
                    :key="scopeItem.key" 
                    class="scope-summary-card"
                    :class="{ active: selectedScopeKey === scopeItem.key }"
                    @click="handleScopeClick(scopeItem.key)"
                  >
                    <div class="card-glow"></div>
                    <div class="scope-card-header">
                      <span class="scope-card-title">{{ scopeItem.label }}</span>
                      <span class="scope-card-percent">{{ scopeItem.ratio }}%</span>
                    </div>
                    <div class="scope-card-value">
                      <span class="val-num">{{ scopeItem.value }}</span>
                      <span class="val-unit">个</span>
                    </div>
                    <div class="scope-card-sub" v-if="scopeItem.sub">
                      {{ scopeItem.sub }}
                    </div>
                    <div class="click-tip">点击切换明细 <i class="el-icon-arrow-right"></i></div>
                  </div>
                </div>
              </div>

              <!-- Right: Drill down places list -->
              <div class="scope-right-panel">
                <div class="panel-subtitle">
                  <i class="el-icon-tickets"></i>
                  <span>【{{ selectedScopeKey === 'provIn' ? '省内交投内' : selectedScopeKey === 'provOut' ? '省内交投外' : selectedScopeKey === 'outProv' ? '省外' : '国外' }}】具体项目明细账目</span>
                </div>

                <div class="scope-table-container">
                  <el-table 
                    :data="currentScopeTableData" 
                    stripe 
                    size="mini"
                    height="100%"
                    style="width: 100%"
                    class="custom-image-style-table"
                  >
                    <el-table-column prop="place" label="项目名称" />
                    <el-table-column prop="region" label="项目所属区域" />
                    <el-table-column prop="dept" label="项目所属项目部" />
                    <el-table-column prop="status" label="项目状态">
                      <template slot-scope="scope">
                        <el-tag :type="scope.row.status === '已完工' ? 'success' : 'primary'" size="mini" effect="dark">
                          {{ scope.row.status }}
                        </el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Custom layout for group_operation -->
        <div v-else-if="activeDetailItem.chartType === 'group_operation'" class="market-expansion-dialog-body">
          
          <!-- Top Row: Summary KPIs -->
          <div class="operation-dialog-summary-row">
            <div class="operation-summary-card highlight">
              <div class="summary-label">本年度开累产值</div>
              <div class="summary-value">
                <span class="val">45,280</span>
                <span class="unit">万元</span>
              </div>
            </div>
            <div class="operation-summary-card highlight">
              <div class="summary-label">已上报计量</div>
              <div class="summary-value">
                <span class="val">38,150</span>
                <span class="unit">万元</span>
              </div>
            </div>
            <div class="operation-summary-card highlight">
              <div class="summary-label">计量形象比</div>
              <div class="summary-value cyan">
                <span class="val">84.25</span>
                <span class="unit">%</span>
              </div>
              <div class="summary-tip">上报计量 / 产值</div>
            </div>
            <div class="operation-summary-card">
              <div class="summary-label">收款计量比</div>
              <div class="summary-value gold">
                <span class="val">77.16</span>
                <span class="unit">%</span>
              </div>
              <div class="summary-tip">(已收计量款+已收预付款) / 产值</div>
            </div>
          </div>

          <!-- Bottom Row: Table -->
          <div class="market-section-block" style="flex: 1; display: flex; flex-direction: column;">
            <div class="market-section-title">
              <span class="title-decorator"></span>
              <span>各区域/项目年度累计完成情况（点击表头可排序）</span>
            </div>
            
            <div style="display: flex; gap: 12px; margin-bottom: 12px; align-items: center;">
              <span class="sort-tip-label">排序方式：</span>
              <el-radio-group v-model="operationSortType" size="mini" fill="#00f3ff">
                <el-radio-button label="measureRatio">按计量形象比降序</el-radio-button>
                <el-radio-button label="collectionRatio">按收款计量比降序</el-radio-button>
              </el-radio-group>
            </div>

            <div class="table-container" style="flex: 1;">
              <el-table 
                :data="sortedOperationTableData" 
                stripe 
                size="mini"
                height="100%"
                style="width: 100%"
                class="custom-image-style-table"
              >
                <el-table-column prop="region" label="区域/项目" width="140px" fixed />
                <el-table-column prop="accumValue" label="年度累计产值(万)" sortable width="130px" />
                <el-table-column prop="reportedMeasure" label="已上报计量(万)" sortable width="120px" />
                <el-table-column label="已批复计量(万)" width="180px">
                  <template slot-scope="scope">
                    <span>{{ scope.row.approvedMeasure }}</span>
                    <span class="deduct-tip">(扣款: {{ scope.row.deductAmount }}万)</span>
                  </template>
                </el-table-column>
                <el-table-column prop="prepayment" label="已收预付款(万)" sortable width="120px" />
                <el-table-column prop="measurePayment" label="已收计量款(万)" sortable width="120px" />
                <el-table-column prop="measureRatio" label="计量形象比(%)" sortable width="120px">
                  <template slot-scope="scope">
                    <span style="color: #00f3ff; font-weight: bold;">{{ scope.row.measureRatio }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="collectionRatio" label="收款计量比(%)" sortable width="120px">
                  <template slot-scope="scope">
                    <span :style="{ color: parseFloat(scope.row.collectionRatio) >= 80 ? '#67C23A' : parseFloat(scope.row.collectionRatio) >= 70 ? '#E6A23C' : '#F56C6C' }">
                      {{ scope.row.collectionRatio }}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

        </div>

        <!-- Custom layout for jv_companies -->
        <div v-else-if="activeDetailItem.chartType === 'jv_companies'" class="market-expansion-dialog-body">
          <div class="operation-dialog-summary-row">
            <div class="operation-summary-card highlight">
              <div class="summary-label">合资公司总数</div>
              <div class="summary-value cyan">
                <span class="val">6</span>
                <span class="unit">家</span>
              </div>
            </div>
            <div class="operation-summary-card highlight">
              <div class="summary-label">交工委派人员</div>
              <div class="summary-value">
                <span class="val">28</span>
                <span class="unit">人</span>
              </div>
            </div>
            <div class="operation-summary-card highlight">
              <div class="summary-label">年度总营业收入</div>
              <div class="summary-value gold">
                <span class="val">28,450.0</span>
                <span class="unit">万元</span>
              </div>
            </div>
          </div>

          <div class="market-section-block" style="flex: 1; display: flex; flex-direction: column;">
            <div class="market-section-title">
              <span class="title-decorator"></span>
              <span>合资公司股权比例、委派人员及经营状况明细表</span>
            </div>
            <div class="table-container" style="flex: 1;">
              <el-table 
                :data="jvCompanyList" 
                stripe 
                size="mini"
                height="100%"
                style="width: 100%"
                class="custom-image-style-table"
              >
                <el-table-column prop="jvName" label="合资公司名称" min-width="200px" />
                <el-table-column prop="share" label="股权比例" width="120px" sortable>
                  <template slot-scope="scope">
                    <span class="share-badge" :class="getShareBadgeClass(scope.row.shareNum)">{{ scope.row.share }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="staffCount" label="交工委派人员(人)" width="150px" sortable>
                  <template slot-scope="scope">
                    <span style="color: #00f3ff; font-weight: bold;"><i class="el-icon-user"></i> {{ scope.row.staffCount }} 人</span>
                  </template>
                </el-table-column>
                <el-table-column prop="revenue" label="年度营业收入(万元)" width="170px" sortable>
                  <template slot-scope="scope">
                    <span style="color: #edbe75; font-weight: bold;">{{ scope.row.revenue }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="经营状态" width="100px">
                  <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.status === '正常' ? 'success' : 'warning'">{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <!-- Default Layout for other charts -->
        <div v-else>
          <!-- Top Metrics Row in Dialog -->
          <div class="drill-metrics-row">
            <div class="drill-metric-card" v-for="(kpi, kIdx) in activeDetailKPIs" :key="kIdx">
              <div class="kpi-label">{{ kpi.label }}</div>
              <div class="kpi-value-row">
                <span class="kpi-num">{{ kpi.value }}</span>
                <span class="kpi-unit" v-if="kpi.unit">{{ kpi.unit }}</span>
              </div>
            </div>
          </div>

          <!-- Middle Content Splitter: Chart + Table -->
          <div class="drill-content-body">
            <!-- Left: Secondary Deep EChart Breakdown -->
            <div class="drill-chart-panel">
              <div class="panel-subtitle">
                <i class="el-icon-pie-chart"></i>
                <span>深度维度交叉分析图表</span>
              </div>
              <div ref="dialogChart" class="dialog-chart-box"></div>
            </div>

            <!-- Right: Paginated Sortable Datatable -->
            <div class="drill-table-panel">
              <div class="panel-subtitle">
                <i class="el-icon-tickets"></i>
                <span>下钻底层关系明细账目</span>
              </div>
              <el-table 
                :data="activeDetailTableData" 
                stripe 
                size="mini"
                height="300px"
                style="width: 100%"
              >
                <el-table-column 
                  v-for="col in activeDetailColumns" 
                  :key="col.prop"
                  :prop="col.prop"
                  :label="col.label"
                  :width="col.width || 'auto'"
                  sortable
                />
              </el-table>
            </div>
          </div>
        </div>

        <!-- Footer / Close button -->
        <div class="drill-dialog-footer">
          <div class="desc-tip">
            <i class="el-icon-info"></i>
            <span>{{ activeDetailItem.desc || '已加载高可信度经营业务数据模型。' }}</span>
          </div>
          <el-button type="primary" size="small" @click="detailDialogVisible = false">关闭窗口</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- Accounts Receivable Detail Dialog -->
    <el-dialog
      title="集团应收款明细账目"
      :visible.sync="receivablesDialogVisible"
      width="85%"
      append-to-body
      class="detail-drill-dialog receivables-detail-dialog"
    >
      <div class="dialog-drill-container">
        <!-- Filter Row -->
        <div class="receivables-dialog-filter-bar">
          <div class="filter-item">
            <span class="label">选择所属区域中心:</span>
            <el-select v-model="dialogSelectedRegion" placeholder="请选择区域中心" size="small" clearable style="width: 200px;">
              <el-option
                v-for="item in regionOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="filter-item">
            <span class="label">选择年度:</span>
            <el-select v-model="dialogSelectedYear" placeholder="请选择年份" size="small" clearable style="width: 150px;">
              <el-option
                v-for="item in yearOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="filter-item">
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="resetDialogFilters">重置筛选</el-button>
          </div>
        </div>

        <div class="market-section-block bottom-panel" style="margin-top: 15px;">
          <div class="market-section-title">
            <span class="title-decorator"></span>
            <span>集团各区域项目应收款明细表 (共 {{ filteredReceivablesDetails.length }} 条记录)</span>
          </div>

          <div class="scope-table-container" style="height: 480px; overflow-y: auto;">
            <el-table 
              :data="filteredReceivablesDetails" 
              stripe 
              size="small"
              height="450px"
              style="width: 100%"
              class="custom-image-style-table"
            >
              <el-table-column prop="year" label="年度" width="90px" align="center" sortable />
              <el-table-column prop="maintenanceArea" label="管养区域" width="160px" show-overflow-tooltip sortable />
              <el-table-column prop="contractName" label="合同名称" min-width="220px" show-overflow-tooltip sortable />
              <el-table-column prop="projectNature" label="工程性质" width="120px" align="center" sortable>
                <template slot-scope="scope">
                  <el-tag 
                    :type="scope.row.projectNature === '日常养护' ? 'success' : scope.row.projectNature === '专项中修' ? 'warning' : 'info'" 
                    size="mini"
                  >
                    {{ scope.row.projectNature }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="region" label="所属区域" width="140px" sortable />
              <el-table-column prop="projectDept" label="所属项目部" width="160px" show-overflow-tooltip sortable />
              <el-table-column prop="receivablesInfo" label="应收款情况(万元)" min-width="260px">
                <template slot-scope="scope">
                  <div class="receivables-progress-cell">
                    <div class="prog-text">
                      <span>基数: <span class="num-highlight">{{ scope.row.base }}</span></span>
                      <span>已收: <span class="num-highlight green">{{ scope.row.received }}</span></span>
                      <span>比例: <span class="num-highlight cyan">{{ (scope.row.ratio * 100).toFixed(0) }}%</span></span>
                      <span>未收: <span :class="scope.row.uncollected < 0 ? 'num-highlight red' : 'num-highlight green'">{{ scope.row.uncollected }}</span></span>
                    </div>
                    <div class="mini-prog-bar">
                      <div class="mini-prog-fill" :style="{ width: Math.min(scope.row.ratio * 100, 100) + '%', background: getRatioColor(scope.row.ratio) }"></div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="drill-dialog-footer">
          <div class="desc-tip">
            <i class="el-icon-info"></i>
            <span>展示该筛选条件下的具体养护合同应收、已收及收款考核指标明细。</span>
          </div>
          <el-button type="primary" size="small" @click="receivablesDialogVisible = false">关闭窗口</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Layout from '@/components/Layout/aside.vue'
import { HeaderLayout, TimeCounter } from '@/components/Header/index.js'
import FullScreen from '@/components/FullScreen/index.vue'
import WaterMaker from '@/components/Watermaker/index.vue'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import QiaoLiangDiTu from './components/QiaoLiangDiTu/index.vue'
import * as echarts from 'echarts'
import { mockDataModel, generateDrillData } from './mockDashboardData'

export default {
  name: 'ComprehensiveDashboard',
  components: {
    Layout,
    HeaderLayout,
    TimeCounter,
    FullScreen,
    WaterMaker,
    ScreenSubtitle,
    QiaoLiangDiTu
  },
  data() {
    return {
      activeTab: 0,
      currentDistributionType: 'project',
      filterCompanies: [],
      filterRegions: [],
      filterYears: ['2026'],
      companyOptions: [
        '交工沪杭甬',
        '顺畅养护',
        '交工养护'
      ],
      regionOptions: [
        '杭州区域中心',
        '绍兴区域中心',
        '金衢区域中心',
        '甬舟区域中心',
        '台州区域中心',
        '嘉兴区域中心',
        '温州区域中心',
        '湖州区域中心',
        '丽水区域中心'
      ],
      yearOptions: ['2026', '2025', '2024', '2023', '2022'],
      
      // Dialog control states
      detailDialogVisible: false,
      activeDetailItem: null,
      activeDetailKPIs: [],
      activeDetailTableData: [],
      activeDetailColumns: [],

      // Accounts Receivable States
      receivablesDialogVisible: false,
      dialogSelectedRegion: '',
      dialogSelectedYear: '',
      isHoveringTable: false,

      // Joint Venture Companies Data
      jvCompanyList: [
        { jvName: '丽水缙云聚力沥青材料研发有限公司', share: '45.0%', shareNum: 45.0, staffCount: 6, revenue: '8,520.0', status: '正常' },
        { jvName: '丽水市恒安交通路牌有限公司', share: '35.0%', shareNum: 35.0, staffCount: 4, revenue: '4,910.4', status: '正常' },
        { jvName: '遂昌路安沥青拌合有限公司', share: '51.0%', shareNum: 51.0, staffCount: 8, revenue: '7,842.0', status: '正常' },
        { jvName: '景宁交投新材料开发有限公司', share: '40.0%', shareNum: 40.0, staffCount: 3, revenue: '3,200.0', status: '正常' },
        { jvName: '衢州浙交路桥养护工程有限公司', share: '49.0%', shareNum: 49.0, staffCount: 5, revenue: '2,680.0', status: '正常' },
        { jvName: '台州三门交投沥青科技有限公司', share: '30.0%', shareNum: 30.0, staffCount: 2, revenue: '1,297.6', status: '筹建' }
      ],
      receivablesRaw: [
        { region: '杭州区域中心', base: 8000.0, received: 7200.0 },
        { region: '绍兴区域中心', base: 5000.0, received: 4250.0 },
        { region: '甬舟区域中心', base: 4500.0, received: 3600.0 },
        { region: '嘉兴区域中心', base: 4000.0, received: 3000.0 },
        { region: '台州区域中心', base: 3500.0, received: 2450.0 },
        { region: '温州区域中心', base: 6000.0, received: 3900.0 },
        { region: '金衢区域中心', base: 4200.0, received: 2520.0 },
        { region: '湖州区域中心', base: 3000.0, received: 1650.0 },
        { region: '丽水区域中心', base: 2500.0, received: 1200.0 }
      ],
      receivablesDetails: [
        { year: '2026', maintenanceArea: '杭州绕城北线段', contractName: '2026年杭州绕城公路北线路桥日常养护项目', projectNature: '日常养护', region: '杭州区域中心', projectDept: '杭州日常第一项目部', base: 1200.0, received: 1100.0 },
        { year: '2026', maintenanceArea: '杭徽高速杭州段', contractName: '2026年杭徽高速浙江段边坡综合绿化保洁合同', projectNature: '日常养护', region: '杭州区域中心', projectDept: '杭州绿化大项目部', base: 1500.0, received: 1380.0 },
        { year: '2026', maintenanceArea: '绍兴诸永高速', contractName: '2026年诸永高速绍兴段中修及防撞钢护栏改造专项', projectNature: '专项中修', region: '绍兴区域中心', projectDept: '诸永大修中修项目部', base: 2200.0, received: 1870.0 },
        { year: '2026', maintenanceArea: '绍兴日常片区', contractName: '2026年度绍兴高速片区桥隧日常巡查保修维护', projectNature: '日常养护', region: '绍兴区域中心', projectDept: '绍兴桥隧常规项目部', base: 1800.0, received: 1620.0 },
        { year: '2026', maintenanceArea: '舟山跨海大桥', contractName: '2026年舟山跨海大桥特大索桥定期健康监测与防腐', projectNature: '专项中修', region: '甬舟区域中心', projectDept: '舟山海大桥专项部', base: 2500.0, received: 2120.0 },
        { year: '2025', maintenanceArea: '宁波绕城东段', contractName: '2025年宁波绕城高速路面微表处摊铺及预防性保养', projectNature: '专项中修', region: '甬舟区域中心', projectDept: '甬台温第二项目部', base: 2000.0, received: 1480.0 },
        { year: '2026', maintenanceArea: '嘉兴杭浦高速', contractName: '2026年杭浦高速嘉兴段机电收费系统智慧化升级', projectNature: '专项中修', region: '嘉兴区域中心', projectDept: '钱江通道机电维护部', base: 1900.0, received: 1425.0 },
        { year: '2025', maintenanceArea: '嘉兴日常片区', contractName: '2025年度嘉兴辖区常规波形梁钢护栏保洁维修', projectNature: '日常养护', region: '嘉兴区域中心', projectDept: '嘉兴常规维护项目部', base: 2100.0, received: 1575.0 },
        { year: '2026', maintenanceArea: '台州神仙居路段', contractName: '2026年诸永高速台州神仙居风景区边坡微型桩加固', projectNature: '专项中修', region: '台州区域中心', projectDept: '台州常规维护项目部', base: 1600.0, received: 1120.0 },
        { year: '2025', maintenanceArea: '台州全域一体化', contractName: '2025年台州片区长周期管养一体化示范协议A标段', projectNature: '日常养护', region: '台州区域中心', projectDept: '台州全域项目部', base: 1900.0, received: 1330.0 },
        { year: '2026', maintenanceArea: '温州甬台温高速', contractName: '2026年甬台温高速温州大桥主拱表面涂装抗风整治', projectNature: '专项中修', region: '温州区域中心', projectDept: '温州特种加固项目部', base: 3100.0, received: 2015.0 },
        { year: '2026', maintenanceArea: '温州常规养护', contractName: '2026年度温州片区隧道大照明系统应急检修与更换', projectNature: '日常养护', region: '温州区域中心', projectDept: '温州综合日常项目部', base: 2900.0, received: 1885.0 },
        { year: '2026', maintenanceArea: '金华金丽温高速', contractName: '2026年金丽温高速金华段部分高填方路基注浆加固', projectNature: '专项中修', region: '金衢区域中心', projectDept: '金衢路基大修项目部', base: 2400.0, received: 1440.0 },
        { year: '2025', maintenanceArea: '衢州日常养护', contractName: '2025年衢州片区连接线绿化景观日常修剪及除草', projectNature: '日常养护', region: '金衢区域中心', projectDept: '衢州保洁养护大队', base: 1800.0, received: 1080.0 },
        { year: '2026', maintenanceArea: '申苏浙皖湖州段', contractName: '2026年申苏浙皖高速路基排水及边沟疏通维修', projectNature: '日常养护', region: '湖州区域中心', projectDept: '申苏浙皖日常项目部', base: 1600.0, received: 880.0 },
        { year: '2025', maintenanceArea: '湖州常规桥梁', contractName: '2025年湖州辖区中小跨径桥梁抗震挡块更换工程', projectNature: '专项中修', region: '湖州区域中心', projectDept: '湖州桥梁加固项目部', base: 1400.0, received: 770.0 },
        { year: '2026', maintenanceArea: '丽水缙云片区', contractName: '2026年丽水缙云公路常规生命安全防护栏补强合同', projectNature: '日常养护', region: '丽水区域中心', projectDept: '缙云日常常规项目部', base: 1300.0, received: 624.0 },
        { year: '2025', maintenanceArea: '龙泉病害抢险', contractName: '2025年龙泉G235边坡坍塌泥石流抢险灾后路面修复', projectNature: '专项中修', region: '丽水区域中心', projectDept: '龙泉应急抢险施工部', base: 1200.0, received: 576.0 }
      ],
      
      chartInstances: {}, // Side panels chart instances
      dialogChartInstance: null, // Dialog inside chart instance
      dialogChartRegionInstance: null,
      dialogChartQualInstance: null,
      
      // Bottom Navigation Tabs definition
      tabs: [
        { key: 'ref_inner', label: '经营内参', icon: 'el-icon-s-finance' },
        { key: 'wages_total', label: '工资总额管理', icon: 'el-icon-money' },
        { key: 'wages_labor', label: '民工工资管理', icon: 'el-icon-user' },
        { key: 'proj_done', label: '完工项目管理', icon: 'el-icon-success' },
        { key: 'one_profit', label: '一利五率管理', icon: 'el-icon-data-line' },
        { key: 'station_mgt', label: '场站管理', icon: 'el-icon-office-building' },
        { key: 'annual_task', label: '年度工作任务', icon: 'el-icon-date' },
        { key: 'jv_mgt', label: '合资公司管理', icon: 'el-icon-connection' }
      ],

      // Market Expansion customized states
      selectedScopeKey: 'provIn',
      scopeTitleMap: {
        provIn: '省内（交投内、交投外）',
        provOut: '省外地区',
        countryOut: '国外地区'
      },
      scopeSubChartInstance: null,

      // Group Operation states
      operationSortType: 'measureRatio',
      operationTableData: [
        { region: '杭州区域中心', accumValue: '8,250.0', reportedMeasure: '7,420.5', approvedMeasure: '6,850.2', deductAmount: '120.5', prepayment: '500.0', measurePayment: '6,200.0', measureRatio: '89.7', collectionRatio: '81.2' },
        { region: '绍兴区域中心', accumValue: '6,120.0', reportedMeasure: '5,510.4', approvedMeasure: '5,120.0', deductAmount: '95.2', prepayment: '350.0', measurePayment: '4,650.0', measureRatio: '90.2', collectionRatio: '81.3' },
        { region: '金衢区域中心', accumValue: '5,840.0', reportedMeasure: '5,210.2', approvedMeasure: '4,850.0', deductAmount: '85.0', prepayment: '280.0', measurePayment: '4,320.0', measureRatio: '89.2', collectionRatio: '78.6' },
        { region: '甬舟区域中心', accumValue: '5,420.0', reportedMeasure: '4,820.5', approvedMeasure: '4,420.0', deductAmount: '78.5', prepayment: '250.0', measurePayment: '3,950.0', measureRatio: '89.3', collectionRatio: '76.9' },
        { region: '台州区域中心', accumValue: '4,850.0', reportedMeasure: '4,280.2', approvedMeasure: '3,920.0', deductAmount: '65.0', prepayment: '200.0', measurePayment: '3,480.0', measureRatio: '88.3', collectionRatio: '75.7' },
        { region: '嘉兴区域中心', accumValue: '4,520.0', reportedMeasure: '3,950.8', approvedMeasure: '3,650.0', deductAmount: '58.0', prepayment: '180.0', measurePayment: '3,200.0', measureRatio: '87.4', collectionRatio: '74.8' },
        { region: '温州区域中心', accumValue: '5,680.0', reportedMeasure: '5,020.5', approvedMeasure: '4,680.0', deductAmount: '92.0', prepayment: '320.0', measurePayment: '4,100.0', measureRatio: '88.4', collectionRatio: '77.6' },
        { region: '湖州区域中心', accumValue: '3,850.0', reportedMeasure: '3,380.2', approvedMeasure: '3,120.0', deductAmount: '52.0', prepayment: '150.0', measurePayment: '2,780.0', measureRatio: '87.8', collectionRatio: '76.1' },
        { region: '丽水区域中心', accumValue: '3,520.0', reportedMeasure: '3,050.0', approvedMeasure: '2,850.0', deductAmount: '45.0', prepayment: '120.0', measurePayment: '2,520.0', measureRatio: '86.6', collectionRatio: '75.0' }
      ],

      // Market Expansion Data
      marketRegionKPIs: [
        { label: '区域新签合同总目标', value: '31,500', unit: '万元' },
        { label: '本年区域开累总金额', value: '25,260', unit: '万元' },
        { label: '本月新增签约额', value: '3,050', unit: '万元' },
        { label: '整体区域完成率', value: '80.19', unit: '%' }
      ],
      marketRegionTableData: [
        { center: '绍兴区域中心', lastYear: '32,000', target: '40,000', accumulated: '36,000', rate: '90.00', monthly: '4,500' },
        { center: '金衢区域中心', lastYear: '28,000', target: '35,000', accumulated: '31,000', rate: '88.57', monthly: '3,000' },
        { center: '杭州区域中心', lastYear: '45,000', target: '55,000', accumulated: '48,000', rate: '87.27', monthly: '5,000' },
        { center: '台州区域中心', lastYear: '25,000', target: '30,000', accumulated: '25,500', rate: '85.00', monthly: '2,500' },
        { center: '甬舟区域中心', lastYear: '38,000', target: '45,000', accumulated: '37,000', rate: '82.22', monthly: '4,000' },
        { center: '嘉兴区域中心', lastYear: '26,000', target: '32,000', accumulated: '25,000', rate: '78.13', monthly: '2,800' },
        { center: '湖州区域中心', lastYear: '22,000', target: '28,000', accumulated: '21,000', rate: '75.00', monthly: '1,800' },
        { center: '温州区域中心', lastYear: '30,000', target: '38,000', accumulated: '27,000', rate: '71.05', monthly: '3,500' },
        { center: '丽水区域中心', lastYear: '18,000', target: '22,000', accumulated: '15,000', rate: '68.18', monthly: '1,200' }
      ],
      regionalMarketTableData: [
        { center: '杭州区域中心', lastYear: '10,000', target: '12,000', accumulated: '11,200', rate: '93.33', monthly: '1,200' },
        { center: '绍兴区域中心', lastYear: '7,500', target: '8,500', accumulated: '8,100', rate: '95.29', monthly: '850' },
        { center: '金衢区域中心', lastYear: '6,200', target: '7,500', accumulated: '6,950', rate: '92.67', monthly: '720' },
        { center: '甬舟区域中心', lastYear: '5,500', target: '6,800', accumulated: '6,120', rate: '90.00', monthly: '680' },
        { center: '台州区域中心', lastYear: '3,800', target: '4,500', accumulated: '4,180', rate: '92.89', monthly: '450' },
        { center: '嘉兴区域中心', lastYear: '3,200', target: '4,000', accumulated: '3,580', rate: '89.50', monthly: '380' },
        { center: '温州区域中心', lastYear: '2,500', target: '3,200', accumulated: '2,850', rate: '89.06', monthly: '310' },
        { center: '湖州区域中心', lastYear: '1,800', target: '2,000', accumulated: '1,400', rate: '70.00', monthly: '150' },
        { center: '丽水区域中心', lastYear: '1,200', target: '1,500', accumulated: '900', rate: '60.00', monthly: '90' }
      ],
      marketQualKPIs: [
        { label: '资质承接累计总额', value: '26,800', unit: '万元' },
        { label: '交工沪杭甬累计', value: '12,400', unit: '万元' },
        { label: '顺畅养护累计', value: '8,200', unit: '万元' },
        { label: '交工养护累计', value: '6,200', unit: '万元' }
      ],
      marketQualTableData: [
        { qual: '交工沪杭甬', accumulated: '12,400', ratio: '46.27', count: 42 },
        { qual: '顺畅养护', accumulated: '8,200', ratio: '30.60', count: 35 },
        { qual: '交工养护', accumulated: '6,200', ratio: '23.13', count: 28 }
      ],
      marketScopeSummary: [
        { key: 'provIn', label: '省内', value: '20,200', ratio: '75.37', sub: '交投内: 14,800万 | 交投外: 5,400万' },
        { key: 'provOut', label: '省外', value: '5,800', ratio: '21.64', sub: '江西、安徽、福建等区域' },
        { key: 'countryOut', label: '国外', value: '800', ratio: '2.99', sub: '东非、柬埔寨公路运营' }
      ],
      marketScopeDetailData: {
        provIn: [
          { place: '省内-交投内杭州区域', accumulated: '6,800', ratio: '33.66' },
          { place: '省内-交投内宁波区域', accumulated: '5,000', ratio: '24.75' },
          { place: '省内-交投外温州项目', accumulated: '3,200', ratio: '15.84' },
          { place: '省内-交投内绍兴区域', accumulated: '3,000', ratio: '14.85' },
          { place: '省内-交投外金华市政', accumulated: '2,200', ratio: '10.90' }
        ],
        provOut: [
          { place: '江西上饶大修项目', accumulated: '2,400', ratio: '41.38' },
          { place: '安徽黄山特种加固', accumulated: '1,800', ratio: '31.03' },
          { place: '福建南平隧道整治', accumulated: '1,000', ratio: '17.24' },
          { place: '四川广元市政维护', accumulated: '600', ratio: '10.35' }
        ],
        countryOut: [
          { place: '柬埔寨金港高速保养', accumulated: '450', ratio: '56.25' },
          { place: '埃塞俄比亚高架监测', accumulated: '350', ratio: '43.75' }
        ]
      },
      projectScopeSummary: [
        { key: 'provIn', label: '省内交投内', value: '182', ratio: '60.67', sub: '在建: 156个 | 完工: 26个' },
        { key: 'provOut', label: '省内交投外', value: '68', ratio: '22.67', sub: '在建: 58个 | 完工: 10个' },
        { key: 'outProv', label: '省外', value: '38', ratio: '12.67', sub: '在建: 32个 | 完工: 6个' },
        { key: 'abroad', label: '国外', value: '12', ratio: '4.00', sub: '在建: 8个 | 完工: 4个' }
      ],
      projectScopeDetailData: {
        provIn: [
          { place: '杭州绕城日常绿化保养项目', region: '杭州区域中心', dept: '杭州绿化养护项目部', status: '在建' },
          { place: '沪杭甬高速日常路面养护工程', region: '杭州区域中心', dept: '沪杭甬路面保洁项目部', status: '在建' },
          { place: '绍兴诸永高速桥梁日常维护项目', region: '绍兴区域中心', dept: '诸永桥隧日常养护项目部', status: '已完工' },
          { place: '甬台温路基日常巡查治理', region: '甬舟区域中心', dept: '甬台温日常维保项目部', status: '在建' },
          { place: '钱江通道机电系统日常保养', region: '嘉兴区域中心', dept: '钱江通道机电维护项目部', status: '已完工' },
          { place: '诸永高速高边坡专项灾害治理项目', region: '绍兴区域中心', dept: '诸永边坡综合治理项目部', status: '已完工' }
        ],
        provOut: [
          { place: '台州地方国省道管养一体化示范项目', region: '台州区域中心', dept: '台州一体化项目部', status: '在建' },
          { place: '丽水市县道生态养护长周期项目', region: '丽水区域中心', dept: '丽水生态保洁项目部', status: '在建' },
          { place: '温州地方干线公路桥梁定期检测', region: '温州区域中心', dept: '温州检测专项部', status: '已完工' },
          { place: '衢州地方公路地质灾害应急治理', region: '金衢区域中心', dept: '衢州应急防汛项目部', status: '在建' }
        ],
        outProv: [
          { place: '江西昌九高速公路大修养护项目', region: '江西分公司', dept: '昌九大修项目部', status: '在建' },
          { place: '安徽合宁高速边坡防护加固工程', region: '安徽分公司', dept: '合宁边坡专项项目部', status: '在建' },
          { place: '福建沈海高速公路路面预防性养护', region: '福建分公司', dept: '沈海微表处项目部', status: '已完工' },
          { place: '四川成渝高速特大桥梁健康监测', region: '四川分公司', dept: '桥梁监测项目部', status: '在建' }
        ],
        abroad: [
          { place: '柬埔寨金港高速公路常态化养护', region: '海外事业部', dept: '柬埔寨养护项目部', status: '在建' },
          { place: '埃塞俄比亚亚的斯亚贝巴高架结构维护', region: '海外事业部', dept: '东非监测养护中心', status: '已完工' },
          { place: '老挝万万高速路面及桥梁日常巡检', region: '海外事业部', dept: '东南亚养护第一部', status: '在建' }
        ]
      },

      // Progress Warning Carousel State
      activeWarningIndex: 0,
      warningTimer: null,
      warningList: [
        {
          id: 1,
          level: 'danger',
          category: '回款滞后',
          title: '杭州区域中心项目部应收款回款进度过慢',
          desc: '截至6月末回款完成率仅为48.2%，低于65%考核预警线，需加快推进确权与催收闭环。',
          time: '10分钟前',
          dept: '杭州项目部'
        },
        {
          id: 2,
          level: 'warning',
          category: '产值偏低',
          title: '湖州区域中心养护项目产值完成率过低',
          desc: '年度计划产值2,000万元，上半年实际完成1,400万元(70.0%)，进度滞后15%。',
          time: '25分钟前',
          dept: '湖州项目部'
        },
        {
          id: 3,
          level: 'danger',
          category: '计量偏低',
          title: '丽水区域中心代维项目计量形象比过低',
          desc: '已完成实物产值900万元，已上报计量仅520万元，形象比57.8%(预警线80%)。',
          time: '1小时前',
          dept: '丽水项目部'
        },
        {
          id: 4,
          level: 'warning',
          category: '履约风险',
          title: '申苏浙皖大中修项目防撞护栏材料到货延期',
          desc: '部分防撞钢护栏供应链到货延迟，影响下阶段交工验收节点履约进度。',
          time: '2小时前',
          dept: '申苏浙皖项目部'
        },
        {
          id: 5,
          level: 'info',
          category: '资金风险',
          title: '衢州保洁养护大队账期超6个月未收尾款偏高',
          desc: '未收款金额达720万元，建议项目部加强款项对接与收尾核销闭环。',
          time: '3小时前',
          dept: '衢州项目部'
        }
      ]
    }
  },
  computed: {
    currentWarning() {
      if (!this.warningList || this.warningList.length === 0) return {}
      return this.warningList[this.activeWarningIndex % this.warningList.length] || this.warningList[0]
    },
    dangerCount() {
      return (this.warningList || []).filter(w => w.level === 'danger').length
    },
    warningCount() {
      return (this.warningList || []).filter(w => w.level === 'warning').length
    },
    infoCount() {
      return (this.warningList || []).filter(w => w.level === 'info').length
    },
    marqueeWarningList() {
      const list = this.warningList || []
      return list.length > 0 ? [...list, ...list] : []
    },
    sortedOperationTableData() {
      const data = [...this.operationTableData];
      if (this.operationSortType === 'measureRatio') {
        return data.sort((a, b) => parseFloat(b.measureRatio) - parseFloat(a.measureRatio));
      } else {
        return data.sort((a, b) => parseFloat(b.collectionRatio) - parseFloat(a.collectionRatio));
      }
    },
    sortedReceivables() {
      return this.receivablesRaw.map(item => {
        const ratio = item.base > 0 ? (item.received / item.base) : 0;
        const uncollected = item.received - item.base;
        return {
          ...item,
          ratio,
          uncollected
        };
      }).sort((a, b) => b.ratio - a.ratio);
    },
    totalBase() {
      return this.sortedReceivables.reduce((sum, item) => sum + item.base, 0);
    },
    totalReceived() {
      return this.sortedReceivables.reduce((sum, item) => sum + item.received, 0);
    },
    totalRatio() {
      return this.totalBase > 0 ? (this.totalReceived / this.totalBase) : 0;
    },
    totalUncollected() {
      return this.totalReceived - this.totalBase;
    },
    filteredReceivablesDetails() {
      return this.receivablesDetails.filter(item => {
        const regionMatch = !this.dialogSelectedRegion || item.region === this.dialogSelectedRegion;
        const yearMatch = !this.dialogSelectedYear || item.year === this.dialogSelectedYear;
        return regionMatch && yearMatch;
      }).map(item => {
        const ratio = item.base > 0 ? (item.received / item.base) : 0;
        const uncollected = item.received - item.base;
        return {
          ...item,
          ratio,
          uncollected
        };
      });
    },
    currentTabName() {
      return this.tabs[this.activeTab].label
    },
    activeTabKey() {
      return this.tabs[this.activeTab].key
    },
    currentTabConfig() {
      return mockDataModel[this.activeTabKey] || { left: [], right: [] }
    },
    detailDialogTitle() {
      if (!this.activeDetailItem) return '指标深度下钻'
      return `【下钻分析】${this.activeDetailItem.title}`
    },
    // Dynamic filtered counts for map/mode indicators
    filteredCounts() {
      if (this.filterCompanies.length > 0) {
        const comp = this.filterCompanies[0]
        if (comp === '交工沪杭甬') {
          return {
            projectTotal: '112', activeOffice: '95', completedOffice: '17', activeRatio: '84.8',
            provIn: '68', provOut: '28', provOther: '12', abroad: '4',
            officeTotal: '32', runningOffice: '28', finishOffice: '4', avgStaff: '22',
            siteTotal: '58', dailySite: '30', specSite: '20', emerSite: '8',
            alert1: '3', alert2: '12', alert3: '43'
          }
        } else if (comp === '顺畅养护') {
          return {
            projectTotal: '98', activeOffice: '82', completedOffice: '16', activeRatio: '83.7',
            provIn: '60', provOut: '22', provOther: '12', abroad: '4',
            officeTotal: '28', runningOffice: '24', finishOffice: '4', avgStaff: '19',
            siteTotal: '48', dailySite: '26', specSite: '16', emerSite: '6',
            alert1: '2', alert2: '11', alert3: '35'
          }
        } else {
          return {
            projectTotal: '90', activeOffice: '77', completedOffice: '13', activeRatio: '85.5',
            provIn: '54', provOut: '18', provOther: '14', abroad: '4',
            officeTotal: '26', runningOffice: '20', finishOffice: '6', avgStaff: '16',
            siteTotal: '50', dailySite: '26', specSite: '18', emerSite: '6',
            alert1: '3', alert2: '12', alert3: '35'
          }
        }
      }
      if (this.filterRegions.length > 0) {
        return {
          projectTotal: '38', activeOffice: '32', completedOffice: '6', activeRatio: '84.2',
          provIn: '38', provOut: '0', provOther: '0', abroad: '0',
          officeTotal: '12', runningOffice: '10', finishOffice: '2', avgStaff: '20',
          siteTotal: '22', dailySite: '12', specSite: '8', emerSite: '2',
          alert1: '1', alert2: '5', alert3: '16'
        }
      }
      return {
        projectTotal: '300', activeOffice: '254', completedOffice: '46', activeRatio: '84.7',
        provIn: '182', provOut: '68', provOther: '38', abroad: '12',
        officeTotal: '86', runningOffice: '72', finishOffice: '14', avgStaff: '18',
        siteTotal: '156', dailySite: '82', specSite: '54', emerSite: '20',
        alert1: '8', alert2: '35', alert3: '113'
      }
    },
    // Top indicator dashboard data computed by current map distribution type
    currentTopData() {
      if (this.filterCompanies.length > 0) {
        const comp = this.filterCompanies[0]
        const companyDataMap = {
          '交工沪杭甬': {
            oneProfitFiveRatios: [
              { label: '利润总额', value: '620.0', unit: '万元', color: 'gold' },
              { label: '资产负债率', value: '59.10', unit: '%', color: 'cyan' },
              { label: '净资产收益率', value: '9.40', unit: '%', color: 'green' },
              { label: '研发投入强度', value: '4.20', unit: '%', color: 'blue' },
              { label: '全员劳动生产率', value: '54.20', unit: '万元/人', color: 'cyan' },
              { label: '营业收视率', value: '14.80', unit: '%', color: 'gold' }
            ],
            personnel: { total: '520', regular: '340', outsourced: '180', avgAge: '35.8' },
            equipment: { vehiclesTotal: '168', vehiclesRented: '45', rentedOnSite: '38', yearRentFee: '580.0' }
          },
          '顺畅养护': {
            oneProfitFiveRatios: [
              { label: '利润总额', value: '480.5', unit: '万元', color: 'gold' },
              { label: '资产负债率', value: '61.20', unit: '%', color: 'cyan' },
              { label: '净资产收益率', value: '8.90', unit: '%', color: 'green' },
              { label: '研发投入强度', value: '3.60', unit: '%', color: 'blue' },
              { label: '全员劳动生产率', value: '46.80', unit: '万元/人', color: 'cyan' },
              { label: '营业收视率', value: '11.90', unit: '%', color: 'gold' }
            ],
            personnel: { total: '410', regular: '280', outsourced: '130', avgAge: '37.1' },
            equipment: { vehiclesTotal: '124', vehiclesRented: '32', rentedOnSite: '26', yearRentFee: '410.0' }
          },
          '交工养护': {
            oneProfitFiveRatios: [
              { label: '利润总额', value: '437.5', unit: '万元', color: 'gold' },
              { label: '资产负债率', value: '64.50', unit: '%', color: 'cyan' },
              { label: '净资产收益率', value: '8.20', unit: '%', color: 'green' },
              { label: '研发投入强度', value: '3.40', unit: '%', color: 'blue' },
              { label: '全员劳动生产率', value: '43.10', unit: '万元/人', color: 'cyan' },
              { label: '营业收视率', value: '10.80', unit: '%', color: 'gold' }
            ],
            personnel: { total: '350', regular: '230', outsourced: '120', avgAge: '36.9' },
            equipment: { vehiclesTotal: '134', vehiclesRented: '35', rentedOnSite: '21', yearRentFee: '430.0' }
          }
        }
        if (companyDataMap[comp]) return companyDataMap[comp]
      } else if (this.filterRegions.length > 0) {
        return {
          oneProfitFiveRatios: [
            { label: '利润总额', value: '310.0', unit: '万元', color: 'gold' },
            { label: '资产负债率', value: '56.80', unit: '%', color: 'cyan' },
            { label: '净资产收益率', value: '9.80', unit: '%', color: 'green' },
            { label: '研发投入强度', value: '4.50', unit: '%', color: 'blue' },
            { label: '全员劳动生产率', value: '58.00', unit: '万元/人', color: 'cyan' },
            { label: '营业收视率', value: '15.20', unit: '%', color: 'gold' }
          ],
          personnel: { total: '240', regular: '170', outsourced: '70', avgAge: '34.8' },
          equipment: { vehiclesTotal: '85', vehiclesRented: '22', rentedOnSite: '18', yearRentFee: '290.0' }
        }
      }

      const distributionMap = {
        project: {
          oneProfitFiveRatios: [
            { label: '利润总额', value: '1,538.0', unit: '万元', color: 'gold' },
            { label: '资产负债率', value: '62.40', unit: '%', color: 'cyan' },
            { label: '净资产收益率', value: '8.70', unit: '%', color: 'green' },
            { label: '研发投入强度', value: '3.85', unit: '%', color: 'blue' },
            { label: '全员劳动生产率', value: '48.50', unit: '万元/人', color: 'cyan' },
            { label: '营业收视率', value: '12.60', unit: '%', color: 'gold' }
          ],
          personnel: {
            total: '1,280',
            regular: '850',
            outsourced: '430',
            avgAge: '36.5'
          },
          equipment: {
            vehiclesTotal: '426',
            vehiclesRented: '112',
            rentedOnSite: '85',
            yearRentFee: '1,420.0'
          }
        },
        office: {
          oneProfitFiveRatios: [
            { label: '利润总额', value: '920.5', unit: '万元', color: 'gold' },
            { label: '资产负债率', value: '58.20', unit: '%', color: 'cyan' },
            { label: '净资产收益率', value: '9.15', unit: '%', color: 'green' },
            { label: '研发投入强度', value: '4.10', unit: '%', color: 'blue' },
            { label: '全员劳动生产率', value: '52.30', unit: '万元/人', color: 'cyan' },
            { label: '营业收视率', value: '14.20', unit: '%', color: 'gold' }
          ],
          personnel: {
            total: '460',
            regular: '380',
            outsourced: '80',
            avgAge: '38.2'
          },
          equipment: {
            vehiclesTotal: '158',
            vehiclesRented: '35',
            rentedOnSite: '32',
            yearRentFee: '560.0'
          }
        },
        site: {
          oneProfitFiveRatios: [
            { label: '利润总额', value: '2,180.0', unit: '万元', color: 'gold' },
            { label: '资产负债率', value: '65.80', unit: '%', color: 'cyan' },
            { label: '净资产收益率', value: '8.10', unit: '%', color: 'green' },
            { label: '研发投入强度', value: '3.20', unit: '%', color: 'blue' },
            { label: '全员劳动生产率', value: '42.80', unit: '万元/人', color: 'cyan' },
            { label: '营业收视率', value: '11.50', unit: '%', color: 'gold' }
          ],
          personnel: {
            total: '2,150',
            regular: '920',
            outsourced: '1,230',
            avgAge: '34.1'
          },
          equipment: {
            vehiclesTotal: '680',
            vehiclesRented: '245',
            rentedOnSite: '142',
            yearRentFee: '2,380.0'
          }
        }
      }
      return distributionMap[this.currentDistributionType] || distributionMap.project
    },
    // Top executive statistics based on active tab
    topStats() {
      const statsMap = {
        ref_inner: [
          {
            title: '人员配置',
            icon: 'el-icon-user',
            items: [
              { label: '员工总数', value: '1,482', unit: '人', highlight: true },
              { label: '正式员工数', value: '620', unit: '人' },
              { label: '劳务外包员工数', value: '862', unit: '人' }
            ]
          },
          {
            title: '项目车辆',
            icon: 'el-icon-truck',
            items: [
              { label: '车辆总数', value: '186', unit: '台', highlight: true },
              { label: '单机成本费用', value: '3.25', unit: '元/公里' }
            ]
          },
          {
            title: '常租车辆',
            icon: 'el-icon-guide',
            items: [
              { label: '当前在租车辆', value: '45', unit: '台', highlight: true },
              { label: '本年发生成本费用', value: '280.5', unit: '万元' }
            ]
          },
          {
            title: '专项租赁设备',
            icon: 'el-icon-s-operation',
            items: [
              { label: '当前外租在场数量', value: '32', unit: '台/套', highlight: true },
              { label: '本年累计租金', value: '415.8', unit: '万元' }
            ]
          }
        ],
        wages_total: [
          { label: '全员预算总额', value: '12,500', unit: '万元', subText: '年内额度', icon: 'el-icon-money', trendClass: 'trend-neutral' },
          { label: '累计工资支出', value: '7,552.5', unit: '万元', subText: '执行率 60.4%', icon: 'el-icon-wallet', trendClass: 'trend-up' },
          { label: '人均薪资效能', value: '15.4', unit: '万元/人', subText: '同比 +4.8%', icon: 'el-icon-pie-chart', trendClass: 'trend-up' },
          { label: '预算剩余空间', value: '4,947.5', unit: '万元', subText: '安全结余', icon: 'el-icon-coin', trendClass: 'trend-up' }
        ],
        wages_labor: [
          { label: '实名登记农民工', value: '3,842', unit: '人', subText: '100%实名制', icon: 'el-icon-idcard', trendClass: 'trend-up' },
          { label: '专户资金到位率', value: '100', unit: '%', subText: '无违约拨付', icon: 'el-icon-circle-check', trendClass: 'trend-up' },
          { label: '月度发放金额', value: '1,480.2', unit: '万元', subText: '当月已清算', icon: 'el-icon-bank-card', trendClass: 'trend-up' },
          { label: '欠薪维权投诉', value: '0', unit: '起', subText: '零风险预警', icon: 'el-icon-message-solid', trendClass: 'trend-up' }
        ],
        proj_done: [
          { label: '累计完工项目', value: '45', unit: '个', subText: '同比 +12%', icon: 'el-icon-folder-checked', trendClass: 'trend-up' },
          { label: '首次验收合格率', value: '98.5', unit: '%', subText: '创历史新高', icon: 'el-icon-award', trendClass: 'trend-up' },
          { label: '结算完成总额', value: '4.82', unit: '亿元', subText: '转化率 82.4%', icon: 'el-icon-price-tag', trendClass: 'trend-up' },
          { label: '工期按时率', value: '96.2', unit: '%', subText: '平均提速5天', icon: 'el-icon-time', trendClass: 'trend-up' }
        ],
        one_profit: [
          { label: '年累计净利润额', value: '1,540.8', unit: '万元', subText: '同比 +8.2%', icon: 'el-icon-data-line', trendClass: 'trend-up' },
          { label: '资产负债平均率', value: '62.4', unit: '%', subText: '优于红线值', icon: 'el-icon-scale-to-original', trendClass: 'trend-up' },
          { label: '研发经费投入', value: '428.5', unit: '万元', subText: '占比 3.42%', icon: 'el-icon-cpu', trendClass: 'trend-up' },
          { label: '劳动生产率', value: '38.5', unit: '万元/人', subText: '增幅 +5.2%', icon: 'el-icon-lightning', trendClass: 'trend-up' }
        ],
        station_mgt: [
          { label: '沥青拌合年产量', value: '15.4', unit: '万吨', subText: '指标达成 78%', icon: 'el-icon-box', trendClass: 'trend-up' },
          { label: '拌合站综合能耗', value: '42.8', unit: 'kg/t', subText: '节能 3.4%', icon: 'el-icon-odometer', trendClass: 'trend-up' },
          { label: '废旧料循环利用', value: '35.8', unit: '%', subText: '绿化率 +2%', icon: 'el-icon-refresh', trendClass: 'trend-up' },
          { label: '场站环保达标率', value: '100', unit: '%', subText: '在线检测正常', icon: 'el-icon-sugar', trendClass: 'trend-neutral' }
        ],
        annual_task: [
          { label: '年度专项总任务', value: '85', unit: '项', subText: '按期推进中', icon: 'el-icon-notebook-2', trendClass: 'trend-neutral' },
          { label: '已销号结案任务', value: '52', unit: '项', subText: '结案率 61.2%', icon: 'el-icon-circle-check', trendClass: 'trend-up' },
          { label: '督办超期任务', value: '0', unit: '项', subText: '零延误督办', icon: 'el-icon-warning-outline', trendClass: 'trend-up' },
          { label: '重点改革指标', value: '100', unit: '%', subText: '已圆满达成', icon: 'el-icon-star-off', trendClass: 'trend-up' }
        ],
        jv_mgt: [
          { label: '参股控股公司', value: '8', unit: '家', subText: '运营正常', icon: 'el-icon-office-building', trendClass: 'trend-neutral' },
          { label: '累计认缴出资额', value: '1.24', unit: '亿元', subText: '持股占比合理', icon: 'el-icon-bank-card', trendClass: 'trend-neutral' },
          { label: '年累计投资回报', value: '1,420.5', unit: '万元', subText: '回报率 11.45%', icon: 'el-icon-pie-chart', trendClass: 'trend-up' },
          { label: '风控达标合格率', value: '100', unit: '%', subText: '无违约事件', icon: 'el-icon-document-checked', trendClass: 'trend-up' }
        ]
      }
      return statsMap[this.activeTabKey] || statsMap['ref_inner']
    },
    currentScopeTableData() {
      if (this.activeDetailItem && this.activeDetailItem.chartType === 'project_info') {
        return this.projectScopeDetailData[this.selectedScopeKey] || []
      }
      return this.marketScopeDetailData[this.selectedScopeKey] || []
    }
  },
  watch: {
    activeTab() {
      this.$nextTick(() => {
        this.renderAllSideCharts()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.renderAllSideCharts()
        this.startAutoScroll()
        this.startWarningTimer()
      }, 500)
    })
  },
  beforeDestroy() {
    this.stopAutoScroll()
    this.stopWarningTimer()
    this.disposeAllSideCharts()
    if (this.dialogChartInstance) {
      this.dialogChartInstance.dispose()
    }
    if (this.dialogChartRegionInstance) {
      this.dialogChartRegionInstance.dispose()
    }
    if (this.dialogChartQualInstance) {
      this.dialogChartQualInstance.dispose()
    }
    if (this.scopeSubChartInstance) {
      this.scopeSubChartInstance.dispose()
    }
  },
  methods: {
    handleDistributionChange(type) {
      this.currentDistributionType = type
    },
    handleExportReport() {
      this.$message({
        type: 'success',
        message: '基础报表已成功导出下载！',
        duration: 3000
      })
    },
    startWarningTimer() {
      this.stopWarningTimer()
      this.warningTimer = setInterval(() => {
        if (this.warningList && this.warningList.length > 0) {
          this.activeWarningIndex = (this.activeWarningIndex + 1) % this.warningList.length
        }
      }, 3500)
    },
    stopWarningTimer() {
      if (this.warningTimer) {
        clearInterval(this.warningTimer)
        this.warningTimer = null
      }
    },
    getRatioColor(ratio) {
      if (ratio >= 0.85) return '#00f3ff'
      if (ratio >= 0.70) return '#67C23A'
      if (ratio >= 0.55) return '#E6A23C'
      return '#F56C6C'
    },
    resetDialogFilters() {
      this.dialogSelectedRegion = ''
      this.dialogSelectedYear = ''
    },
    startAutoScroll() {
      this.stopAutoScroll()
      this.scrollTimer = setInterval(() => {
        let container = this.$refs.scrollContainer
        if (!container) return
        if (Array.isArray(container)) {
          container = container[0]
        }
        if (!container) return
        if (this.isHoveringTable) return
        
        container.scrollTop += 1
        if (container.scrollTop >= container.scrollHeight - container.clientHeight - 1) {
          container.scrollTop = 0
        }
      }, 50)
    },
    stopAutoScroll() {
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer)
        this.scrollTimer = null
      }
    },
    // Tab Change handler
    handleTabClick(idx) {
      if (idx !== 0) {
        this.$message({
          message: `【${this.tabs[idx].label}】正在建设中，敬请期待！`,
          type: 'warning',
          duration: 3000
        })
        return
      }
      this.activeTab = idx
    },
    getShareBadgeClass(shareNum) {
      if (shareNum >= 50) return 'holding'
      if (shareNum >= 40) return 'joint'
      return 'minor'
    },
    selectCompanyFilter(company) {
      if (this.filterCompanies.includes(company)) {
        this.filterCompanies = []
      } else {
        this.filterCompanies = [company]
        this.filterRegions = []
      }
      this.handleFilterChange()
    },
    selectRegionFilter(region) {
      if (this.filterRegions.includes(region)) {
        this.filterRegions = []
      } else {
        this.filterRegions = [region]
        this.filterCompanies = []
      }
      this.handleFilterChange()
    },
    // Reset Multi-dimensional Filter inputs
    resetFilters() {
      this.filterCompanies = []
      this.filterRegions = []
      this.filterYears = ['2026']
      this.handleFilterChange()
    },
    handleFilterChange() {
      this.$nextTick(() => {
        this.renderAllSideCharts()
      })
    },
    // Drill-down Detail Modal opening
    handleViewDetail(item) {
      if (item.chartType === 'receivables_info') {
        this.receivablesDialogVisible = true
        return
      }
      this.activeDetailItem = item
      
      this.selectedScopeKey = 'provIn'

      // Pull dynamic structured data model for down-drill pop-up
      const dataModel = generateDrillData(item.chartType)
      this.activeDetailKPIs = dataModel.kpis
      this.activeDetailTableData = dataModel.tableData
      this.activeDetailColumns = dataModel.columns
      
      this.detailDialogVisible = true
    },
    // Triggers rendering inside Dialog ECharts box once dialog DOM is open
    handleDialogOpened() {
      if (!this.activeDetailItem) return
      
      if (this.activeDetailItem.chartType === 'market_expansion' || this.activeDetailItem.chartType === 'regional_market') {
        this.renderMarketDialogChart()
      } else if (this.activeDetailItem.chartType === 'project_info') {
        this.renderProjectDialogChart()
      } else {
        const container = this.$refs.dialogChart
        if (!container) return
        if (this.dialogChartInstance) {
          this.dialogChartInstance.dispose()
        }
        this.dialogChartInstance = echarts.init(container)
        const dataModel = generateDrillData(this.activeDetailItem.chartType)
        this.dialogChartInstance.setOption(dataModel.chartOption)
      }
    },
    handleDialogClosed() {
      if (this.dialogChartInstance) {
        this.dialogChartInstance.dispose()
        this.dialogChartInstance = null
      }
      if (this.dialogChartRegionInstance) {
        this.dialogChartRegionInstance.dispose()
        this.dialogChartRegionInstance = null
      }
      if (this.dialogChartQualInstance) {
        this.dialogChartQualInstance.dispose()
        this.dialogChartQualInstance = null
      }
      if (this.scopeSubChartInstance) {
        this.scopeSubChartInstance.dispose()
        this.scopeSubChartInstance = null
      }
      this.activeDetailItem = null
    },
    handleScopeClick(key) {
      this.selectedScopeKey = key
      this.$nextTick(() => {
        if (this.activeDetailItem && this.activeDetailItem.chartType === 'project_info') {
          // No sub-chart for project_info, table updates dynamically
        } else {
          this.renderScopeSubChart()
        }
      })
    },
    renderMarketDialogChart() {
      this.$nextTick(() => {
        // 1. Render qualification pie chart
        const qualContainer = this.$refs.dialogChartQual
        if (qualContainer) {
          if (this.dialogChartQualInstance) {
            this.dialogChartQualInstance.dispose()
          }
          this.dialogChartQualInstance = echarts.init(qualContainer)

          const isRegionalMarket = this.activeDetailItem && this.activeDetailItem.chartType === 'regional_market'
          const qualData = isRegionalMarket
            ? [
                { value: 21000, name: '交工沪杭甬', itemStyle: { color: '#00f3ff' } },
                { value: 13800, name: '顺畅养护', itemStyle: { color: '#1b6cff' } },
                { value: 10480, name: '交工养护', itemStyle: { color: '#edbe75' } }
              ]
            : [
                { value: 12400, name: '交工沪杭甬', itemStyle: { color: '#00f3ff' } },
                { value: 8200, name: '顺畅养护', itemStyle: { color: '#1b6cff' } },
                { value: 6200, name: '交工养护', itemStyle: { color: '#edbe75' } }
              ]

          this.dialogChartQualInstance.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} 万元 ({d}%)' },
            legend: {
              orient: 'vertical',
              left: '5%',
              top: 'center',
              itemWidth: 10,
              itemHeight: 10,
              textStyle: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 10 }
            },
            series: [{
              name: isRegionalMarket ? '资质完成产值' : '资质开累金额',
              type: 'pie',
              radius: ['45%', '70%'],
              avoidLabelOverlap: true,
              center: ['62%', '50%'],
              label: { 
                show: true, 
                color: 'rgba(255, 255, 255, 0.85)', 
                formatter: '{b}\n{d}%',
                fontSize: 10
              },
              emphasis: {
                label: { show: true, fontSize: '11', fontWeight: 'bold' }
              },
              data: qualData
            }]
          })
        }

        // 2. Render scope sub bar chart
        this.renderScopeSubChart()
      })
    },
    renderScopeSubChart() {
      const chartContainer = this.$refs.dialogChartScopeSub
      if (!chartContainer) return
      if (this.scopeSubChartInstance) {
        this.scopeSubChartInstance.dispose()
      }
      this.scopeSubChartInstance = echarts.init(chartContainer)
      
      const currentData = this.currentScopeTableData
      const names = currentData.map(d => d.place.replace('省内-', '').replace('省外-', ''))
      const values = currentData.map(d => parseFloat(d.accumulated.replace(/,/g, '')))
      
      this.scopeSubChartInstance.setOption({
        tooltip: { trigger: 'axis', formatter: '{b}: {c} 万元' },
        grid: { left: '3%', right: '4%', bottom: '5%', top: '15%', containLabel: true },
        xAxis: {
          type: 'value',
          axisLabel: { color: 'rgba(255, 255, 255, 0.85)' },
          splitLine: { lineStyle: { color: 'rgba(41, 94, 151, 0.2)' } }
        },
        yAxis: {
          type: 'category',
          data: names.reverse(),
          axisLabel: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 10 }
        },
        series: [{
          name: '本年开累金额',
          type: 'bar',
          data: values.reverse(),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(27,108,255,0.2)' },
              { offset: 1, color: '#edbe75' }
            ]),
            borderRadius: [0, 4, 4, 0]
          }
        }]
      })
    },
    renderProjectDialogChart() {
      this.$nextTick(() => {
        // 1. Render qualification company project count pie chart
        const qualContainer = this.$refs.dialogChartQual
        if (qualContainer) {
          if (this.dialogChartQualInstance) {
            this.dialogChartQualInstance.dispose()
          }
          this.dialogChartQualInstance = echarts.init(qualContainer)
          this.dialogChartQualInstance.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c} 个 ({d}%)' },
            legend: {
              orient: 'vertical',
              left: '5%',
              top: 'center',
              itemWidth: 10,
              itemHeight: 10,
              textStyle: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 10 }
            },
            series: [{
              name: '资质公司项目总数占比',
              type: 'pie',
              radius: ['45%', '70%'],
              avoidLabelOverlap: true,
              center: ['62%', '50%'],
              label: { 
                show: true, 
                color: 'rgba(255, 255, 255, 0.85)', 
                formatter: '{b}\n{d}%',
                fontSize: 10
              },
              emphasis: {
                label: { show: true, fontSize: '11', fontWeight: 'bold' }
              },
              data: [
                { value: 138, name: '交工沪杭甬', itemStyle: { color: '#00f3ff' } },
                { value: 98, name: '顺畅养护', itemStyle: { color: '#1b6cff' } },
                { value: 64, name: '交工养护', itemStyle: { color: '#edbe75' } }
              ]
            }]
          })
        }
      })
    },
    // Dispose previous side charts
    disposeAllSideCharts() {
      Object.keys(this.chartInstances).forEach(key => {
        if (this.chartInstances[key]) {
          this.chartInstances[key].dispose()
        }
      })
      this.chartInstances = {}
    },
    // Render side panels' ECharts graphs dynamically
    renderAllSideCharts() {
      this.disposeAllSideCharts()
      
      // Render Left 3
      this.currentTabConfig.left.forEach((cfg, idx) => {
        const refName = `leftChart${idx}`
        const container = this.$refs[refName] ? this.$refs[refName][0] : null
        if (container) {
          const chart = echarts.init(container)
          this.chartInstances[refName] = chart
          chart.setOption(this.getSideChartOption(cfg.chartType))
        }
      })

      // Render Right 3
      this.currentTabConfig.right.forEach((cfg, idx) => {
        const refName = `rightChart${idx}`
        const container = this.$refs[refName] ? this.$refs[refName][0] : null
        if (container) {
          const chart = echarts.init(container)
          this.chartInstances[refName] = chart
          chart.setOption(this.getSideChartOption(cfg.chartType))
        }
      })
    },
    // Factory method for side ECharts visual styles
    getSideChartOption(chartType) {
      const optionMap = generateDrillData(chartType)
      return optionMap.chartOption || {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/scrollbar.scss';

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  width: 1920px;
  background-color: #030a1c;
  overflow: hidden;

  ::v-deep .bottomLayout {
    height: 180px !important;
    bottom: 95px !important;
    background: rgba(6, 18, 40, 0.64) !important;
    border: 1px solid rgba(41, 94, 151, 0.45);
    box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(15px);
  }
  
  ::v-deep .topLayout {
    height: 198px !important;
    top: 104px !important;
    left: 535px !important;
    width: 850px !important;
  }
}

/* === Top Indicator Dashboard (Line 1: 一利五率, Line 2: 人员情况 & 设备情况) === */
.top-indicator-dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;

  .gold {
    color: #edbe75 !important;
    text-shadow: 0 0 8px rgba(237, 190, 117, 0.4);
  }
  .cyan {
    color: #00f3ff !important;
    text-shadow: 0 0 8px rgba(0, 243, 255, 0.4);
  }
  .green {
    color: #67C23A !important;
    text-shadow: 0 0 8px rgba(103, 194, 58, 0.4);
  }
  .blue {
    color: #409EFF !important;
    text-shadow: 0 0 8px rgba(64, 158, 255, 0.4);
  }
  .red {
    color: #f56c6c !important;
    text-shadow: 0 0 8px rgba(245, 108, 108, 0.4);
  }

  .full-width-module {
    width: 100%;
  }

  .category-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    width: 100%;
    align-items: center;
  }

  .category-grid-5 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    width: 100%;
    align-items: center;
  }

  .category-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
    align-items: center;
  }

  .cat-stat-box {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(12, 38, 80, 0.55);
    border: 1px solid rgba(0, 243, 255, 0.25);
    border-radius: 4px;
    padding: 4px 8px;

    .box-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;

      &.provIn { background: #00f3ff; box-shadow: 0 0 6px #00f3ff; }
      &.provOut { background: #edbe75; box-shadow: 0 0 6px #edbe75; }
      &.provOther { background: #67C23A; box-shadow: 0 0 6px #67C23A; }
      &.abroad { background: #409EFF; box-shadow: 0 0 6px #409EFF; }
    }

    .box-info {
      display: flex;
      flex-direction: column;
      gap: 1px;

      .box-label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.85);
        white-space: nowrap;

        .label-sub {
          font-style: normal;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
        }
      }

      .box-val-wrap {
        display: flex;
        align-items: baseline;
        gap: 2px;

        .box-val {
          font-size: 15px;
          font-weight: bold;
          font-family: 'YJSZ', 'DIN Alternate', monospace, sans-serif;
        }

        .box-unit {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.65);
        }

        .box-ratio {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.65);
          margin-left: 2px;
        }
      }
    }
  }

  .alert-box-1 {
    border-color: rgba(245, 108, 108, 0.5);
    background: rgba(245, 108, 108, 0.12);
  }
  .alert-box-2 {
    border-color: rgba(237, 190, 117, 0.5);
    background: rgba(237, 190, 117, 0.12);
  }
  .alert-box-3 {
    border-color: rgba(0, 243, 255, 0.4);
    background: rgba(0, 243, 255, 0.08);
  }

  .indicator-row {
    box-sizing: border-box;
  }

  /* Reference style rows: 在建项目 / 在管基地 / 在管资产 */
  .ref-row {
    display: flex;
    align-items: stretch;
    gap: 10px;
    height: 60px;
    background: linear-gradient(180deg, rgba(8, 30, 68, 0.9) 0%, rgba(3, 16, 40, 0.95) 100%);
    border: 1.5px solid rgba(0, 243, 255, 0.35);
    border-radius: 8px;
    padding: 8px 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(0, 243, 255, 0.12);
    backdrop-filter: blur(8px);

    .row-main-stat {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 170px;
      flex-shrink: 0;
      padding-right: 12px;
      border-right: 1px solid rgba(0, 243, 255, 0.2);

      .main-stat-icon {
        width: 44px;
        height: 44px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        i {
          font-size: 22px;
        }
      }

      .main-stat-info {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .main-stat-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
          letter-spacing: 1px;
        }

        .main-stat-value {
          display: flex;
          align-items: baseline;
          gap: 3px;

          .main-stat-num {
            font-size: 24px;
            font-weight: bold;
            font-family: 'YJSZ', 'DIN Alternate', monospace, sans-serif;
          }

          .main-stat-unit {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.65);
          }

          .main-stat-sub {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.7);
            margin-left: 4px;
            font-weight: 500;
          }
        }
      }

      &.project-main .main-stat-icon {
        background: rgba(237, 190, 117, 0.12);
        border: 1px solid rgba(237, 190, 117, 0.35);
        i { color: #edbe75; }
      }

      &.base-main .main-stat-icon {
        background: rgba(103, 194, 58, 0.12);
        border: 1px solid rgba(103, 194, 58, 0.35);
        i { color: #67C23A; }
      }

      &.asset-main .main-stat-icon {
        background: rgba(0, 243, 255, 0.12);
        border: 1px solid rgba(0, 243, 255, 0.35);
        i { color: #00f3ff; }
      }

      &.profit-main .main-stat-icon {
        background: rgba(237, 190, 117, 0.12);
        border: 1px solid rgba(237, 190, 117, 0.35);
        i { color: #edbe75; }
      }

      &.personnel-main .main-stat-icon {
        background: rgba(0, 243, 255, 0.12);
        border: 1px solid rgba(0, 243, 255, 0.35);
        i { color: #00f3ff; }
      }

      &.equipment-main .main-stat-icon {
        background: rgba(103, 194, 58, 0.12);
        border: 1px solid rgba(103, 194, 58, 0.35);
        i { color: #67C23A; }
      }

      &.office-main .main-stat-icon {
        background: rgba(237, 190, 117, 0.12);
        border: 1px solid rgba(237, 190, 117, 0.35);
        i { color: #edbe75; }
      }

      &.area-main .main-stat-icon {
        background: rgba(0, 243, 255, 0.12);
        border: 1px solid rgba(0, 243, 255, 0.35);
        i { color: #00f3ff; }
      }

      &.site-main .main-stat-icon {
        background: rgba(0, 243, 255, 0.12);
        border: 1px solid rgba(0, 243, 255, 0.35);
        i { color: #00f3ff; }
      }

      &.alert-main .main-stat-icon {
        background: rgba(245, 108, 108, 0.12);
        border: 1px solid rgba(245, 108, 108, 0.35);
        i { color: #f56c6c; }
      }
    }

    .row-separator {
      width: 1px;
      align-self: stretch;
      background: rgba(0, 243, 255, 0.2);
      margin: 0 6px;
    }

    .row-sub-stats {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;

      .sub-stat-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 4px 6px;
        background: rgba(12, 38, 80, 0.45);
        border: 1px solid rgba(0, 243, 255, 0.15);
        border-radius: 4px;
        min-width: 0;

        .sub-stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.75);
          white-space: nowrap;
        }

        .sub-stat-sub {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.45);
          margin-top: -3px;
          white-space: nowrap;
        }

        .sub-stat-value {
          display: flex;
          align-items: baseline;
          gap: 2px;

          .sub-num {
            font-size: 17px;
            font-weight: bold;
            font-family: 'YJSZ', 'DIN Alternate', monospace, sans-serif;
          }

          .sub-unit {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.6);
          }

          .sub-ext {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.55);
            margin-left: 3px;
          }
        }
      }
    }
  }

  /* Line 1: 一利五率 */
  .row-one-profit {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 52px;
    background: linear-gradient(180deg, rgba(8, 30, 68, 0.88) 0%, rgba(3, 16, 40, 0.92) 100%);
    border: 1.5px solid rgba(0, 243, 255, 0.45);
    border-radius: 6px;
    padding: 0 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(0, 243, 255, 0.15);
    backdrop-filter: blur(8px);

    .row-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 76px;
      height: 40px;
      background: linear-gradient(135deg, rgba(0, 243, 255, 0.25) 0%, rgba(8, 50, 110, 0.6) 100%);
      border: 1px solid rgba(0, 243, 255, 0.6);
      border-radius: 4px;
      color: #00f3ff;
      font-weight: bold;
      font-size: 13px;
      letter-spacing: 1px;
      flex-shrink: 0;

      i {
        font-size: 14px;
        color: #edbe75;
        margin-bottom: 2px;
      }
    }

    .metrics-grid {
      display: flex;
      flex: 1;
      gap: 6px;
      height: 40px;

      .metric-card {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(12, 38, 80, 0.65);
        border: 1px solid rgba(0, 243, 255, 0.25);
        border-radius: 4px;
        padding: 2px 4px;

        .metric-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.82);
          white-space: nowrap;
        }

        .metric-val-wrap {
          display: flex;
          align-items: baseline;
          gap: 2px;
          margin-top: 1px;

          .metric-val {
            font-size: 15px;
            font-weight: bold;
            font-family: 'YJSZ', 'DIN Alternate', monospace, sans-serif;
          }

          .metric-unit {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.65);
          }
        }
      }
    }
  }

  /* Line 2: Personnel & Equipment Modules */
  .row-modules {
    display: flex;
    gap: 10px;
    height: 94px;

    .status-module {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: linear-gradient(180deg, rgba(8, 30, 68, 0.88) 0%, rgba(3, 16, 40, 0.92) 100%);
      border: 1.5px solid rgba(0, 243, 255, 0.4);
      border-radius: 6px;
      padding: 6px 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(0, 243, 255, 0.12);
      backdrop-filter: blur(8px);

      .module-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: bold;
        color: #00f3ff;
        border-bottom: 1px solid rgba(0, 243, 255, 0.25);
        padding-bottom: 4px;
        margin-bottom: 6px;

        i {
          font-size: 14px;
          color: #edbe75;
        }
      }

      .module-body {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex: 1;

        .module-v-divider {
          width: 1px;
          height: 44px;
          background: rgba(0, 243, 255, 0.25);
        }

        .stat-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;

          &.single-stat {
            align-items: center;
          }

          .group-label {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.8);
            white-space: nowrap;
          }

          .group-val-wrap {
            display: flex;
            align-items: baseline;
            gap: 3px;

            .group-val {
              font-size: 17px;
              font-weight: bold;
              font-family: 'YJSZ', 'DIN Alternate', monospace, sans-serif;
            }

            .group-unit {
              font-size: 10px;
              color: rgba(255, 255, 255, 0.65);
            }
          }

          .breakdown-chips {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 2px;

            .chip {
              font-size: 10px;
              color: rgba(255, 255, 255, 0.85);
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(0, 243, 255, 0.2);
              border-radius: 3px;
              padding: 1px 5px;
              white-space: nowrap;

              b {
                font-weight: bold;
                font-size: 11px;
              }
            }
          }
        }
      }
    }
  }
}

/* === Header CSS styles (Matching Reference Screenshot) === */
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  padding-left: 8px;

  .header-brand-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    letter-spacing: 1px;

    i {
      color: #00f3ff;
      font-size: 15px;
    }
  }

  .header-divider {
    width: 1px;
    height: 14px;
    background: rgba(255, 255, 255, 0.2);
  }

  .header-hotline {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.75);

    i {
      color: #edbe75;
      font-size: 13px;
    }
  }
}

.header-left,
.header-right {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
}

.header-left {
  padding-left: 18px;

  .header-brand {
    display: flex;
    align-items: center;
    gap: 10px;

    .brand-logo {
      width: 32px;
      height: 32px;
      object-fit: contain;
      display: block;
    }

    .brand-name {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 1px;
      text-shadow: 0 0 8px rgba(0, 180, 255, 0.5);
    }
  }
}

.header-right {
  padding-right: 18px;
  justify-content: flex-end;
  gap: 16px;

  .header-time {
    font-size: 14px;
    color: #ffffff;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .header-user {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;

    i {
      font-size: 15px;
      color: #00f3ff;
    }
  }

  .header-fullscreen {
    display: flex;
    align-items: center;

    ::v-deep i,
    ::v-deep .el-icon-full-screen,
    ::v-deep .el-icon-rank {
      font-size: 16px;
      color: #00f3ff;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: #ffffff;
        transform: scale(1.1);
      }
    }
  }
}

.header-center-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .header-title-panel {
    position: relative;
    width: 640px;
    height: 92px;
    background: linear-gradient(180deg, rgba(32, 100, 195, 0.95) 0%, rgba(20, 72, 150, 0.95) 100%);
    clip-path: polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      inset 0 1px 0 rgba(120, 200, 255, 0.6),
      0 8px 30px rgba(0, 60, 150, 0.45);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 8%;
      right: 8%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(150, 220, 255, 0.9), transparent);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 5%, rgba(100, 190, 255, 0.6) 20%, rgba(150, 225, 255, 0.9) 50%, rgba(100, 190, 255, 0.6) 80%, transparent 95%);
    }

    .title-panel-inner {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 60px;

      .title-main-text {
        font-size: 34px;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 8px;
        text-shadow: 0 0 10px rgba(100, 195, 255, 0.7), 0 0 22px rgba(0, 120, 255, 0.45);
        font-family: '黑体', 'Microsoft YaHei', sans-serif;
      }
    }
  }
}

.header-right-panel {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  gap: 14px;
  padding-right: 8px;

  .header-time {
    font-size: 14px;
    color: #ffffff;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .action-icon {
      width: 26px;
      height: 26px;
      border-radius: 4px;
      background: rgba(0, 243, 255, 0.08);
      border: 1px solid rgba(0, 243, 255, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(0, 243, 255, 0.2);
        border-color: rgba(0, 243, 255, 0.5);
        transform: scale(1.1);
      }

      i {
        font-size: 13px;
        color: #00f3ff;
      }
    }
  }

  .user-dropdown {
    cursor: pointer;

    .user-dropdown-link {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s;

      .user-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(0, 243, 255, 0.15);
        border: 1px solid rgba(0, 243, 255, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #00f3ff;
      }

      &:hover {
        color: #00f3ff;
      }
    }
  }
}

/* === Top-right warning ticker === */
.top-right-warning-ticker {
  position: absolute;
  top: 96px;
  right: 30px;
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 480px;
  height: 40px;
  padding: 0 12px;
  background: rgba(8, 24, 52, 0.85);
  border: 1px solid rgba(255, 77, 79, 0.45);
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(255, 77, 79, 0.08);
  backdrop-filter: blur(10px);

  .ticker-label {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: bold;
    color: #ff4d4f;

    i {
      font-size: 16px;
    }
  }

  .ticker-window {
    flex: 1;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }

  .ticker-track {
    display: flex;
    align-items: center;
    gap: 36px;
    white-space: nowrap;
    animation: tickerScroll linear infinite;
    will-change: transform;
  }

  &:hover .ticker-track {
    animation-play-state: paused;
  }

  .ticker-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);

    .ticker-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    &.danger .ticker-dot { background: #ff4d4f; box-shadow: 0 0 6px #ff4d4f; }
    &.warning .ticker-dot { background: #e6a23c; box-shadow: 0 0 6px #e6a23c; }
    &.info .ticker-dot { background: #00f3ff; box-shadow: 0 0 6px #00f3ff; }

    .ticker-category {
      font-weight: bold;
      flex-shrink: 0;
    }

    &.danger .ticker-category { color: #ff4d4f; }
    &.warning .ticker-category { color: #e6a23c; }
    &.info .ticker-category { color: #00f3ff; }

    .ticker-title {
      flex-shrink: 0;
    }

    .ticker-dept {
      color: rgba(255, 255, 255, 0.6);
      flex-shrink: 0;

      i {
        font-size: 10px;
      }
    }

    .ticker-time {
      color: rgba(255, 255, 255, 0.45);
      flex-shrink: 0;
    }
  }
}

@keyframes tickerScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* === Compact Stats Container === */
.compact-stats-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  gap: 10px;
  padding: 0;
  box-sizing: border-box;
}

.stats-card {
  flex: 1;
  height: 72px;
  background: rgba(8, 28, 62, 0.55);
  border: 1px solid rgba(0, 243, 255, 0.35);
  border-radius: 6px;
  box-shadow: inset 0 0 15px rgba(0, 243, 255, 0.12);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 243, 255, 0.8);
    box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.25), 0 0 15px rgba(0, 243, 255, 0.3);
  }

  .multi-stat-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .card-items-row {
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 6px;

      &.count-3 {
        .sub-stat-item {
          flex: 1;
          text-align: center;
        }
      }

      &.count-2 {
        .sub-stat-item {
          flex: 1;
          text-align: center;
        }
      }

      .sub-stat-item {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .sub-label {
          font-size: 11px;
          color: rgba(180, 220, 255, 0.85);
          margin-bottom: 2px;
          white-space: nowrap;
        }

        .sub-value-wrap {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 2px;

          .sub-value {
            font-size: 18px;
            font-weight: bold;
            font-family: 'YJSZ', 'DIN Alternate', monospace;
            color: #00f3ff;
            text-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
          }

          .sub-unit {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.7);
            white-space: nowrap;
          }
        }

        &.is-highlight {
          .sub-value {
            color: #00f3ff;
            font-size: 20px;
            text-shadow: 0 0 12px rgba(0, 243, 255, 0.9);
          }
        }
      }
    }
  }

  .stats-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 243, 255, 0.1);
    border: 1px solid rgba(0, 243, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;

    > i {
      font-size: 18px;
      color: #00f3ff;
    }
  }

  .stats-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .stats-title {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.55);
    margin-bottom: 2px;
  }

  .stats-value-row {
    display: flex;
    align-items: baseline;
    gap: 4px;

    .value-num {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      font-family: 'YJSZ', monospace;
      text-shadow: 0 0 10px rgba(255,255,255,0.2);
    }

    .value-unit {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.6);
    }

    .value-ratio {
      font-size: 10px;
      margin-left: 6px;
      padding: 1px 4px;
      border-radius: 2px;
      font-weight: 500;
      
      &.trend-up {
        background: rgba(103, 194, 58, 0.15);
        color: #67C23A;
      }
      &.trend-down {
        background: rgba(245, 108, 108, 0.15);
        color: #F56C6C;
      }
      &.trend-neutral {
        background: rgba(230, 162, 44, 0.15);
        color: #E6A23C;
      }
    }
  }
}

/* === Sidebar Panels & Cards === */
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 14px;
}

.animate-left {
  animation: slideInLeft 0.5s cubic-bezier(0.1, 0.8, 0.1, 1);
}

.animate-right {
  animation: slideInRight 0.5s cubic-bezier(0.1, 0.8, 0.1, 1);
}

@keyframes slideInLeft {
  0% { transform: translateX(-40px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
  0% { transform: translateX(40px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.card-item {
  background: rgba(6, 18, 40, 0.56);
  border: 1px solid rgba(41, 94, 151, 0.45);
  border-radius: 6px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.35);
  
  &.market-card-item {
    height: 290px;
  }
  &.operation-card-item {
    height: 310px;
  }
  &.regional-card-item {
    height: 285px;
  }
  
  .chart-wrapper {
    width: 100%;
    height: 200px;
    padding: 10px;
    
    &.market-chart-wrapper {
      height: 256px;
    }
    &.operation-chart-wrapper {
      height: 278px;
    }
    &.regional-chart-wrapper {
      height: 252px;
    }
  }

  .regional-market-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .annual-op-summary-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 0;

      .op-summary-item {
        flex: 1;
        background: rgba(8, 28, 62, 0.6);
        border: 1px solid rgba(0, 243, 255, 0.35);
        border-radius: 4px;
        padding: 5px 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 0 8px rgba(0, 243, 255, 0.1);
        transition: all 0.3s ease;

        &:hover {
          border-color: rgba(0, 243, 255, 0.7);
          box-shadow: inset 0 0 12px rgba(0, 243, 255, 0.2);
        }

        .op-summary-label {
          font-size: 11px;
          color: rgba(180, 220, 255, 0.85);
          display: flex;
          align-items: center;
          gap: 3px;
          margin-bottom: 2px;
          white-space: nowrap;

          i {
            color: #00f3ff;
            font-size: 12px;
          }
        }

        .op-summary-val-wrap {
          display: flex;
          align-items: baseline;
          gap: 2px;

          .op-summary-num {
            font-family: 'YJSZ', 'DIN Alternate', monospace;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);

            &.highlight-cyan {
              color: #00f3ff;
              text-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
            }
          }

          .op-summary-unit {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.65);
          }
        }

        &.planned {
          border-color: rgba(27, 108, 255, 0.45);
          .op-summary-num { color: #8dccf5; }
        }

        &.actual {
          border-color: rgba(0, 243, 255, 0.5);
          .op-summary-num { color: #ffffff; }
        }

        &.rate {
          border-color: rgba(237, 190, 117, 0.5);
          background: rgba(237, 190, 117, 0.08);
          .op-summary-label i { color: #edbe75; }
          .op-summary-num { color: #edbe75; text-shadow: 0 0 8px rgba(237, 190, 117, 0.6); }
        }
      }
    }

    .echart-box-sub {
      width: 100%;
      flex: 1;
      min-height: 175px;
    }
  }
  
  .project-info-side-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px 4px;

    .proj-sum-row {
      display: flex;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 8px;

      .sum-item {
        flex: 1;
        background: rgba(13, 31, 65, 0.4);
        border: 1px solid rgba(41, 94, 151, 0.35);
        border-radius: 4px;
        padding: 4px 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .sum-val {
          font-family: 'YJSZ', monospace;
          font-size: 18px;
          font-weight: bold;
          line-height: 1.2;

          .sum-unit {
            font-size: 10px;
            font-weight: normal;
            margin-left: 2px;
          }
        }

        .sum-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 2px;
        }

        &.total {
          border-color: rgba(0, 243, 255, 0.4);
          box-shadow: inset 0 0 6px rgba(0, 243, 255, 0.1);
          .sum-val { color: #00f3ff; }
        }
        &.construction {
          border-color: rgba(103, 194, 58, 0.4);
          box-shadow: inset 0 0 6px rgba(103, 194, 58, 0.15);
          .sum-val { color: #67c23a; }
        }
        &.completed {
          border-color: rgba(230, 162, 44, 0.4);
          box-shadow: inset 0 0 6px rgba(230, 162, 44, 0.15);
          .sum-val { color: #e6a23c; }
        }
      }
    }

    .proj-categories-grid {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .cat-progress-item {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .cat-header {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.85);

          .cat-name {
            display: flex;
            align-items: center;
            gap: 4px;

            .cat-dot {
              width: 5px;
              height: 5px;
              border-radius: 50%;
              display: inline-block;

              &.daily, &.provIn { background: #00f3ff; }
              &.special, &.provOut { background: #1b6cff; }
              &.fullLife, &.outProv { background: #edbe75; }
              &.unique, &.abroad { background: #e6a23c; }
            }
          }

          .cat-num {
            font-family: monospace;
            color: rgba(255, 255, 255, 0.65);
          }
        }

        .cat-bar-bg {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;

          .cat-bar-fill {
            height: 100%;
            border-radius: 2px;

            &.daily, &.provIn { background: linear-gradient(90deg, rgba(0,243,255,0.3), #00f3ff); }
            &.special, &.provOut { background: linear-gradient(90deg, rgba(27,108,255,0.3), #1b6cff); }
            &.fullLife, &.outProv { background: linear-gradient(90deg, rgba(237,190,117,0.3), #edbe75); }
            &.unique, &.abroad { background: linear-gradient(90deg, rgba(230,162,44,0.3), #e6a23c); }
          }
        }
      }
    }
  }
  
  .echart-box {
    width: 100%;
    height: 100%;
  }

  .detail-btn {
    padding: 2px 8px;
    color: #00f3ff;
    font-size: 11px;
    border: 0.5px solid rgba(0, 243, 255, 0.4);
    background: rgba(0, 243, 255, 0.05);
    border-radius: 3px;
    margin-right: 12px;
    transition: all 0.2s;

    &:hover {
      background: rgba(0, 243, 255, 0.2);
      color: #fff;
      border-color: #00f3ff;
      box-shadow: 0 0 8px rgba(0, 243, 255, 0.5);
    }
  }
}

/* === Bottom Integrated Panel (Search) === */
.bottom-integrated-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
}

/* Requirement 4 & 2: Search checkbox area styling */
.filter-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(6, 18, 40, 0.44);
  border: 1px solid rgba(41, 94, 151, 0.45);
  border-radius: 6px;
  padding: 16px 20px;
  box-shadow: inset 0 0 10px rgba(64, 158, 255, 0.2);
  height: 100%;
  justify-content: center;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #8dccf5;
  font-weight: bold;
  width: 100px;
  flex-shrink: 0;

  > i {
    font-size: 15px;
    color: #00f3ff;
  }
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.cyber-checkbox-label {
  cursor: pointer;
  position: relative;
  display: inline-block;

  .hidden-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .custom-checkbox-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(14, 40, 85, 0.45);
    border: 1px solid rgba(41, 94, 151, 0.5);
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.75);
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.25s ease;
    user-select: none;
    white-space: nowrap;

    > i {
      font-size: 11px;
      color: #00f3ff;
    }
  }

  &:hover .custom-checkbox-btn {
    border-color: rgba(0, 243, 255, 0.6);
    background: rgba(14, 40, 85, 0.7);
    color: #00f3ff;
    box-shadow: 0 0 8px rgba(0, 243, 255, 0.25);
  }

  &.checked {
    .custom-checkbox-btn {
      background: rgba(0, 243, 255, 0.15);
      border-color: #00f3ff;
      color: #fff;
      font-weight: bold;
      text-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
      box-shadow: inset 0 0 8px rgba(0, 243, 255, 0.2), 0 0 10px rgba(0, 243, 255, 0.3);
    }
  }
}

.filter-header-action {
  margin-left: auto;
  display: flex;
  align-items: center;

  .cyber-btn-reset {
    background: rgba(245, 108, 108, 0.1);
    border: 1px solid rgba(245, 108, 108, 0.5);
    color: #f56c6c;
    height: 24px;
    padding: 0 10px;
    border-radius: 4px;
    font-size: 11px;
    transition: all 0.3s;

    &:hover {
      background: rgba(245, 108, 108, 0.3);
      border-color: #f56c6c;
      color: #fff;
      box-shadow: 0 0 8px rgba(245, 108, 108, 0.4);
    }
  }
}

/* Requirement 1 & 5: Single-line horizontal tab switcher style */
.tabs-grid-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0 16px;
  box-shadow: none;
  backdrop-filter: none;
  margin-top: 0;
}

.grid-tab-item {
  flex: 1;
  max-width: 220px;
  height: 48px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.1, 0.8, 0.1, 1);
  overflow: hidden;
  pointer-events: auto;

  .tab-glow-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(0, 243, 255, 0.15) 0%, transparent 75%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tab-icon-wrap {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    > i {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);
      transition: color 0.3s;
    }
  }

  .tab-title {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 600;
    transition: color 0.3s;
    white-space: nowrap;
  }

  .tab-active-indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2.5px;
    background: #00f3ff;
    border-radius: 2px;
    box-shadow: 0 0 6px #00f3ff;
    transition: width 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 243, 255, 0.6);
    box-shadow: 0 4px 15px rgba(0, 243, 255, 0.15);

    .tab-glow-layer { opacity: 1; }
    
    .tab-icon-wrap {
      background: rgba(0, 243, 255, 0.1);
      border-color: rgba(0, 243, 255, 0.3);
      > i { color: #00f3ff; }
    }
    .tab-title { color: #00f3ff; }
  }

  &.active {
    background: rgba(0, 243, 255, 0.18);
    border-color: #00f3ff;
    box-shadow: inset 0 0 15px rgba(0, 243, 255, 0.25);

    .tab-icon-wrap {
      background: #00f3ff;
      border-color: #00f3ff;
      box-shadow: 0 0 10px rgba(0, 243, 255, 0.4);
      > i { color: #030a1c; }
    }
    .tab-title {
      color: #fff;
      font-weight: bold;
    }
    .tab-active-indicator {
      width: 60%;
    }
  }
}

/* === Drill-down Dialog Styling === */
::v-deep .detail-drill-dialog {
  .el-dialog {
    background: rgba(6, 18, 44, 0.95) !important;
    border: 1.5px solid rgba(0, 243, 255, 0.5) !important;
    box-shadow: 0 0 25px rgba(0, 243, 255, 0.3) !important;
    backdrop-filter: blur(15px);
    border-radius: 8px;
    
    .el-dialog__header {
      padding: 20px 20px 10px;
      border-bottom: 1px solid rgba(0, 243, 255, 0.25);
      
      .el-dialog__title {
        color: #fff !important;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 1px;
        text-shadow: 0 0 8px rgba(0, 243, 255, 0.5);
      }
      
      .el-dialog__headerbtn .el-dialog__close {
        color: rgba(255, 255, 255, 0.7) !important;
        font-size: 18px;
        transition: all 0.3s;
        
        &:hover {
          color: #00f3ff !important;
          transform: rotate(90deg);
        }
      }
    }

    .el-dialog__body {
      color: #fff !important;
      padding: 20px !important;
    }
  }

  /* Deep custom style for Element UI table to make it high-tech & dark-themed */
  .el-table {
    background-color: transparent !important;
    color: rgba(255, 255, 255, 0.9) !important;
    border: none !important;

    &::before {
      display: none !important;
    }

    tr {
      background-color: transparent !important;
      color: rgba(255, 255, 255, 0.9) !important;
      
      &:hover > td {
        background-color: rgba(0, 243, 255, 0.1) !important;
      }
    }

    th {
      background-color: rgba(14, 40, 85, 0.8) !important;
      color: #00f3ff !important;
      border-bottom: 1px solid rgba(0, 243, 255, 0.3) !important;
      font-weight: bold;
      font-size: 12px;
      padding: 8px 0 !important;
    }

    td {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      background-color: transparent !important;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.95) !important;
      padding: 8px 0 !important;
    }

    /* Alternating zebra stripe styling */
    &.el-table--striped {
      .el-table__row--striped {
        td {
          background-color: rgba(255, 255, 255, 0.02) !important;
        }
      }
    }

    /* Scrollbars customization for tables */
    .el-table__body-wrapper {
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 243, 255, 0.3);
        border-radius: 3px;
        &:hover {
          background: rgba(0, 243, 255, 0.5);
        }
      }
      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 3px;
      }
    }
  }
}

.dialog-drill-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.drill-metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
}

.drill-metric-card {
  background: rgba(14, 40, 85, 0.6);
  border: 1px solid rgba(41, 94, 151, 0.6);
  border-radius: 4px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .kpi-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 2px;
  }

  .kpi-value-row {
    display: flex;
    align-items: baseline;
    gap: 4px;

    .kpi-num {
      font-size: 20px;
      font-weight: bold;
      color: #00f3ff;
      font-family: 'YJSZ', monospace;
    }

    .kpi-unit {
      font-size: 10px;
      color: rgba(255,255,255,0.7);
    }
  }
}

.drill-content-body {
  display: grid;
  grid-template-columns: 46% 54%;
  grid-gap: 16px;
  height: 340px;
}

.drill-chart-panel,
.drill-table-panel {
  background: rgba(5, 15, 34, 0.8);
  border: 1px solid rgba(41, 94, 151, 0.4);
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .panel-subtitle {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #8dccf5;
    font-weight: 600;
    margin-bottom: 10px;
    border-left: 3px solid #00f3ff;
    padding-left: 8px;

    > i {
      color: #00f3ff;
    }
  }
}

.dialog-chart-box {
  width: 100%;
  height: 280px;
}

.drill-dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(41, 94, 151, 0.4);
  padding-top: 12px;

  .desc-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255,255,255,0.5);

    > i {
      color: #00f3ff;
      font-size: 14px;
    }
  }
}

/* --- Custom Market Expansion Dashboard and Dialog CSS --- */
.market-expansion-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px 6px;
  color: #fff;

  .market-highlight-row {
    display: flex;
    gap: 8px;
    margin-bottom: 6px;

    .highlight-item {
      flex: 1;
      background: linear-gradient(135deg, rgba(6, 30, 70, 0.7) 0%, rgba(10, 40, 90, 0.4) 100%);
      border: 1px solid rgba(0, 243, 255, 0.25);
      border-radius: 4px;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: all 0.3s;
      box-shadow: inset 0 0 10px rgba(0, 243, 255, 0.05);

      &:hover {
        border-color: rgba(0, 243, 255, 0.6);
        box-shadow: inset 0 0 12px rgba(0, 243, 255, 0.15), 0 0 10px rgba(0, 243, 255, 0.1);
        transform: translateY(-1px);
      }

      &.accumulated {
        border-color: rgba(237, 190, 117, 0.35);
        background: linear-gradient(135deg, rgba(35, 25, 10, 0.7) 0%, rgba(20, 15, 5, 0.4) 100%);
        box-shadow: inset 0 0 10px rgba(237, 190, 117, 0.05);

        &:hover {
          border-color: rgba(237, 190, 117, 0.7);
          box-shadow: inset 0 0 12px rgba(237, 190, 117, 0.15), 0 0 10px rgba(237, 190, 117, 0.1);
        }

        .highlight-value {
          color: #edbe75;
          text-shadow: 0 0 10px rgba(237, 190, 117, 0.5);
        }
        .dot {
          color: #edbe75;
        }
      }

      &.target {
        .highlight-value {
          color: #00f3ff;
          text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
        }
        .dot {
          color: #00f3ff;
        }
      }

      &.rate {
        border-color: rgba(237, 190, 117, 0.35);
        background: linear-gradient(135deg, rgba(30, 25, 15, 0.6) 0%, rgba(15, 12, 8, 0.3) 100%);

        .highlight-value {
          color: #edbe75;
          text-shadow: 0 0 10px rgba(237, 190, 117, 0.5);
        }
        .dot {
          color: #edbe75;
        }
      }

      .highlight-label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.65);
        margin-bottom: 2px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;

        .dot {
          font-size: 8px;
        }
      }

      .highlight-value-wrap {
        display: flex;
        align-items: baseline;
        gap: 3px;
      }

      .highlight-value {
        font-size: 16px;
        font-weight: bold;
        font-family: 'YJSZ', monospace;
      }

      .highlight-unit {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .market-chart-sub {
    flex: 1;
    width: 100%;
    min-height: 180px;
  }
}

/* --- Group Operation Card CSS (New Balanced Design) --- */
.group-operation-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 2px;
  color: #fff;
  box-sizing: border-box;

  /* Top 2x2 Grid for 4 Metrics */
  .op-metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 6px;
    height: 125px;

    .op-metric-cell {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      background: rgba(14, 40, 85, 0.5);
      border: 1px solid rgba(41, 94, 151, 0.4);
      border-radius: 6px;
      transition: all 0.3s;

      &:hover {
        border-color: rgba(0, 243, 255, 0.5);
        background: rgba(14, 40, 85, 0.7);
      }

      .metric-icon {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        i {
          font-size: 15px;
        }
      }

      &.accum {
        border-left: 3px solid #edbe75;
        .metric-icon { background: rgba(237, 190, 117, 0.15); color: #edbe75; }
        .metric-value { color: #edbe75; }
      }

      &.reported {
        border-left: 3px solid #00f3ff;
        .metric-icon { background: rgba(0, 243, 255, 0.15); color: #00f3ff; }
        .metric-value { color: #00f3ff; }
      }

      &.prepayment {
        border-left: 3px solid #E6A23C;
        .metric-icon { background: rgba(230, 162, 60, 0.15); color: #E6A23C; }
        .metric-value { color: #E6A23C; }
      }

      &.payment {
        border-left: 3px solid #67C23A;
        .metric-icon { background: rgba(103, 194, 58, 0.15); color: #67C23A; }
        .metric-value { color: #67C23A; }
      }

      .metric-content {
        flex: 1;
        min-width: 0;

        .metric-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2px;
          white-space: nowrap;
        }

        .metric-value {
          font-size: 14px;
          font-weight: bold;
          font-family: 'YJSZ', monospace;
          display: flex;
          align-items: baseline;
          gap: 2px;

          .unit {
            font-size: 10px;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.55);
            font-family: sans-serif;
          }
        }
      }
    }
  }

  /* Bottom Row for 2 Gauge Charts */
  .op-gauges-row {
    flex: 1;
    display: flex;
    gap: 8px;

    .op-gauge-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(6, 18, 40, 0.5);
      border: 1px solid rgba(41, 94, 151, 0.4);
      border-radius: 6px;
      padding: 6px 4px;
      position: relative;

      .gauge-dial-wrap {
        position: relative;
        width: 105px;
        height: 56px;

        .gauge-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .gauge-center-val {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 15px;
          font-weight: bold;
          font-family: 'YJSZ', monospace;
          white-space: nowrap;

          .unit {
            font-size: 10px;
            margin-left: 1px;
            font-family: sans-serif;
          }

          &.cyan { color: #00f3ff; text-shadow: 0 0 10px rgba(0, 243, 255, 0.4); }
          &.gold { color: #edbe75; text-shadow: 0 0 10px rgba(237, 190, 117, 0.4); }
        }
      }

      .gauge-label {
        font-size: 11px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.9);
        margin-top: 2px;
      }

      .gauge-sub {
        font-size: 9px;
        color: rgba(255, 255, 255, 0.5);
        white-space: nowrap;
        transform: scale(0.9);
      }
    }
  }
}

/* --- Progress Warning Carousel Panel Styles --- */
.progress-warning-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;

  .warning-stats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    background: rgba(255, 77, 79, 0.08);
    border: 1px solid rgba(255, 77, 79, 0.3);
    border-radius: 6px;

    .warning-badge-total {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #ff4d4f;
      font-weight: bold;

      i {
        font-size: 15px;
      }
      b {
        font-size: 15px;
        font-family: 'YJSZ', monospace;
      }
    }

    .warning-badge-counts {
      display: flex;
      gap: 6px;

      .count-tag {
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 4px;

        &.danger {
          background: rgba(255, 77, 79, 0.2);
          color: #ff4d4f;
          border: 1px solid rgba(255, 77, 79, 0.4);
        }
        &.warning {
          background: rgba(230, 162, 60, 0.2);
          color: #e6a23c;
          border: 1px solid rgba(230, 162, 60, 0.4);
        }
        &.info {
          background: rgba(0, 243, 255, 0.15);
          color: #00f3ff;
          border: 1px solid rgba(0, 243, 255, 0.3);
        }
      }
    }
  }

  .warning-carousel-body {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 12px;
    background: rgba(10, 28, 58, 0.6);
    border: 1px solid rgba(41, 94, 151, 0.45);
    border-radius: 6px;
    overflow: hidden;

    .active-warning-box {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .active-warning-top {
        display: flex;
        align-items: center;
        gap: 8px;

        .warning-type-tag {
          font-size: 11px;
          font-weight: bold;
          padding: 2px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;

          &.danger {
            background: rgba(255, 77, 79, 0.25);
            color: #ff4d4f;
            border: 1px solid rgba(255, 77, 79, 0.5);
          }
          &.warning {
            background: rgba(230, 162, 60, 0.25);
            color: #e6a23c;
            border: 1px solid rgba(230, 162, 60, 0.5);
          }
          &.info {
            background: rgba(0, 243, 255, 0.2);
            color: #00f3ff;
            border: 1px solid rgba(0, 243, 255, 0.4);
          }
        }

        .warning-dept {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.75);
        }

        .warning-time {
          margin-left: auto;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.45);
        }
      }

      .active-warning-title {
        font-size: 13px;
        font-weight: bold;
        color: #ffffff;
        line-height: 1.4;
      }

      .active-warning-desc {
        font-size: 11px;
        color: rgba(220, 235, 255, 0.8);
        line-height: 1.5;
        background: rgba(0, 0, 0, 0.25);
        padding: 6px 8px;
        border-radius: 4px;
        border-left: 2px solid rgba(0, 243, 255, 0.5);
      }
    }

    .warning-carousel-controls {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-top: 8px;

      .control-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          width: 20px;
          border-radius: 4px;

          &.danger { background: #ff4d4f; box-shadow: 0 0 8px rgba(255, 77, 79, 0.8); }
          &.warning { background: #e6a23c; box-shadow: 0 0 8px rgba(230, 162, 60, 0.8); }
          &.info { background: #00f3ff; box-shadow: 0 0 8px rgba(0, 243, 255, 0.8); }
        }
      }
    }
  }
}

.warning-slide-enter-active, .warning-slide-leave-active {
  transition: all 0.35s ease;
}
.warning-slide-enter {
  opacity: 0;
  transform: translateY(12px);
}
.warning-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}



@keyframes opScanMove {
  0% { left: -60%; }
  100% { left: 160%; }
}

@keyframes opCircleProgress {
  0% { stroke-dasharray: 0, 100; }
  100% { stroke-dasharray: 88.5, 100; }
}

.market-expansion-dialog-body {
  display: flex;
  flex-direction: column;
  width: 100%;
}

::v-deep .market-dialog-large {
  height: 82vh !important;
  margin-top: 9vh !important;
  display: flex !important;
  flex-direction: column !important;

  .el-dialog__body {
    flex: 1 !important;
    overflow-y: hidden !important; /* NO scrollbar on outer container */
    padding: 12px 20px !important;
    display: flex !important;
    flex-direction: column !important;
    box-sizing: border-box !important;
    height: calc(100% - 50px) !important;
  }

  .market-expansion-dialog-body {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    gap: 0 !important;
  }

  .market-top-row {
    display: flex !important;
    gap: 16px !important;
    height: 48% !important;
    min-height: 250px !important;
    max-height: 290px !important;
    margin-bottom: 12px !important;
    box-sizing: border-box !important;

    .top-left-panel {
      flex: 1.3 !important;
      min-width: 0 !important; /* Prevents flex width expansion loop */
      display: flex !important;
      flex-direction: column !important;
      margin-bottom: 0 !important;
      height: 100% !important;
      padding: 12px 16px !important;
      
      .table-container {
        flex: 1 !important;
        height: 0 !important;
        width: 100% !important;
        position: relative !important; /* Force el-table to reference stable width */
        overflow: hidden !important;
      }
    }

    .top-right-panel {
      flex: 0.9 !important;
      min-width: 0 !important; /* Prevents flex width expansion loop */
      display: flex !important;
      flex-direction: column !important;
      margin-bottom: 0 !important;
      height: 100% !important;
      padding: 12px 16px !important;

      .pie-chart-wrapper {
        flex: 1 !important;
        height: 0 !important;
        width: 100% !important;
        position: relative !important;
      }
    }
  }

  .bottom-panel {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    height: calc(52% - 12px) !important;
    margin-bottom: 0 !important;
    padding: 12px 16px !important;
    box-sizing: border-box !important;

    .scope-split-container {
      display: flex !important;
      gap: 16px !important;
      flex: 1 !important;
      height: 0 !important; /* force content containment */
      overflow: hidden !important;

      .scope-left-panel {
        flex: 0.8 !important;
        min-width: 0 !important; /* Prevents flex width expansion loop */
        display: flex !important;
        flex-direction: column !important;
        height: 100% !important;

        .scope-interactive-cards {
          flex: 1 !important;
          height: 0 !important;
          overflow-y: auto !important;
          gap: 6px !important;
          margin-top: 4px !important;

          .scope-summary-card {
            padding: 8px 12px !important;
            margin-bottom: 2px !important;

            .scope-card-value {
              margin-bottom: 2px !important;
              .val-num {
                font-size: 16px !important;
              }
            }
          }
        }
      }

      .scope-right-panel {
        flex: 1.2 !important;
        min-width: 0 !important; /* Prevents flex width expansion loop */
        display: flex !important;
        flex-direction: column !important;
        height: 100% !important;

        .scope-chart-container {
          height: 95px !important;
          margin-bottom: 6px !important;
          flex-shrink: 0 !important;
          position: relative !important;
        }

        .scope-table-container {
          flex: 1 !important;
          height: 0 !important;
          width: 100% !important;
          position: relative !important; /* Force el-table to reference stable width */
          overflow: hidden !important;
        }
      }
    }
  }
}

.market-section-block {
  background: rgba(10, 25, 50, 0.3);
  border: 1px solid rgba(41, 94, 151, 0.2);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.market-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 12px;
  border-bottom: 1px dashed rgba(41, 94, 151, 0.3);
  padding-bottom: 6px;

  .title-decorator {
    width: 4px;
    height: 14px;
    background: linear-gradient(180deg, #00f3ff 0%, #1b6cff 100%);
    border-radius: 2px;
  }
}

.custom-image-style-table {
  background-color: transparent !important;
  border: none !important;

  &::before, &::after {
    display: none !important;
  }

  ::v-deep {
    .el-table__header-wrapper th {
      background: transparent !important;
      border-bottom: 2px solid rgba(0, 243, 255, 0.25) !important;
      color: #00f3ff !important;
      font-size: 12px !important;
      font-weight: bold !important;
      padding: 6px 0 !important;
      text-align: center;
    }

    tr {
      background-color: rgba(14, 40, 85, 0.45) !important;
      border-bottom: 4px solid #06122c !important; /* Emulates spaced row list from uploaded image */
      transition: all 0.3s;
      
      td {
        border: none !important;
        color: rgba(255, 255, 255, 0.9) !important;
        font-size: 11px !important;
        padding: 6px 0 !important;
        background: transparent !important;
        text-align: center;
      }

      &:hover {
        background-color: rgba(0, 243, 255, 0.15) !important;
        transform: translateY(-1px);
      }
    }

    .el-table__row--striped {
      background-color: rgba(14, 40, 85, 0.65) !important;
    }

    td.el-table__cell, th.el-table__cell.is-leaf {
      border-bottom: none !important;
    }
  }
}

.scope-interactive-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  height: calc(100% - 30px);
  padding-right: 4px;

  .scope-summary-card {
    background: rgba(14, 40, 85, 0.4);
    border: 1px solid rgba(41, 94, 151, 0.4);
    border-radius: 6px;
    padding: 10px 14px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.1, 0.8, 0.1, 1);

    &:hover {
      background: rgba(14, 40, 85, 0.7);
      border-color: rgba(0, 243, 255, 0.6);
      transform: translateX(4px);
    }

    &.active {
      background: rgba(0, 243, 255, 0.12);
      border-color: #00f3ff;
      box-shadow: inset 0 0 15px rgba(0, 243, 255, 0.2);

      .scope-card-title {
        color: #00f3ff;
        font-weight: bold;
      }
      .val-num {
        color: #fff;
      }
      .click-tip {
        color: #00f3ff;
        opacity: 1;
      }
    }

    .scope-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;

      .scope-card-title {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.95);
      }
      .scope-card-percent {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.45);
      }
    }

    .scope-card-value {
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 4px;

      .val-num {
        font-size: 18px;
        font-weight: bold;
        color: #00f3ff;
      }
      .val-unit {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .scope-card-sub {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
    }

    .click-tip {
      position: absolute;
      right: 12px;
      bottom: 8px;
      font-size: 9px;
      color: rgba(255, 255, 255, 0.3);
      opacity: 0.5;
      transition: all 0.3s;
    }
  }
}

@keyframes progressMove {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* === Tall Card Layout for Project Info & Accounts Receivable === */
.tall-card-item {
  height: 480px !important;
  display: flex !important;
  flex-direction: column !important;
}

.tall-chart-wrapper {
  height: 430px !important;
}

.receivables-card-item {
  height: 300px !important;
  display: flex !important;
  flex-direction: column !important;
}

.receivables-chart-wrapper {
  height: 250px !important;
  display: flex !important;
  flex-direction: column !important;
}

.project-info-side-card {
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
}

/* Divider between sections */
.cyber-mini-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(41, 94, 151, 0.1) 0%, rgba(41, 94, 151, 0.6) 50%, rgba(41, 94, 151, 0.1) 100%);
  margin: 4px 0;
  width: 100%;
}

/* Accounts Receivable Section */
.receivables-mini-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 0; /* Forces correct layout within flex */
  overflow: hidden;
  
  .panel-sub-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    
    .sub-title-text {
      font-size: 11px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.95);
      letter-spacing: 0.5px;
    }
    
    .mini-detail-btn {
      padding: 0;
      font-size: 10px;
      color: #00f3ff;
      
      &:hover {
        color: #fff;
        text-shadow: 0 0 4px #00f3ff;
      }
    }
  }
}

.receivables-mini-table-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 0;
  background: rgba(13, 31, 65, 0.2);
  border: 0.5px solid rgba(41, 94, 151, 0.3);
  border-radius: 4px;
  overflow: hidden;
  
  .mini-table-header {
    display: flex;
    background: rgba(14, 40, 85, 0.7);
    border-bottom: 1px solid rgba(0, 243, 255, 0.3);
    padding: 4px 2px;
    font-size: 9px;
    color: #00f3ff;
    font-weight: bold;
    text-align: center;
    flex-shrink: 0;
  }
  
  .mini-table-body-scroll {
    flex: 1;
    overflow-y: auto;
    /* Hide scrollbar by default */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }
    
    .mini-table-row {
      display: flex;
      padding: 5px 2px;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.85);
      border-bottom: 0.5px solid rgba(41, 94, 151, 0.15);
      align-items: center;
      text-align: center;
      transition: all 0.2s;
      
      &.even-row {
        background: rgba(14, 40, 85, 0.25);
      }
      
      &:hover {
        background: rgba(0, 243, 255, 0.12);
        color: #fff;
      }
    }
  }
  
  .mini-table-footer {
    display: flex;
    background: rgba(14, 40, 85, 0.95);
    border-top: 1px solid rgba(0, 243, 255, 0.4);
    padding: 5px 2px;
    font-size: 10px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    box-shadow: 0 -2px 6px rgba(0,0,0,0.4);
    flex-shrink: 0;
  }
  
  .num-font {
    font-family: monospace;
    font-size: 10px;
  }
}

/* === Accounts Receivable Detail Dialog Styling === */
.receivables-detail-dialog {
  ::v-deep .el-dialog {
    background: rgba(6, 18, 40, 0.95) !important;
    border: 1px solid #295e97 !important;
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.25) !important;
    border-radius: 8px !important;
    overflow: hidden;
    backdrop-filter: blur(20px);
    
    .el-dialog__header {
      background: rgba(13, 31, 65, 0.8) !important;
      border-bottom: 1px solid rgba(0, 243, 255, 0.3) !important;
      padding: 15px 20px !important;
      
      .el-dialog__title {
        color: #00f3ff !important;
        font-weight: bold !important;
        font-size: 16px !important;
        letter-spacing: 1px;
      }
      .el-dialog__close {
        color: #00f3ff !important;
        &:hover {
          color: #fff !important;
        }
      }
    }
    
    .el-dialog__body {
      padding: 20px !important;
      color: #fff !important;
    }
  }
  
  .receivables-dialog-filter-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    background: rgba(13, 31, 65, 0.4);
    border: 1px solid rgba(41, 94, 151, 0.3);
    border-radius: 6px;
    padding: 10px 16px;
    margin-bottom: 15px;
    
    .filter-item {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
      
      ::v-deep .el-input__inner {
        background: rgba(6, 18, 40, 0.7) !important;
        border: 1px solid rgba(41, 94, 151, 0.5) !important;
        color: #fff !important;
        
        &:focus {
          border-color: #00f3ff !important;
        }
      }
    }
  }
}

/* Custom element styling inside table cells */
.receivables-progress-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  
  .prog-text {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    
    .num-highlight {
      font-weight: bold;
      font-family: monospace;
      color: #fff;
      
      &.green { color: #67C23A; }
      &.cyan { color: #00f3ff; }
      &.red { color: #ff4d4f; }
    }
  }
  
  .mini-prog-bar {
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1.5px;
    overflow: hidden;
    
    .mini-prog-fill {
      height: 100%;
      border-radius: 1.5px;
      transition: width 0.3s ease;
    }
  }
}

/* --- Group Operation Dialog CSS --- */
.operation-dialog-summary-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  
  .operation-summary-card {
    flex: 1;
    background: rgba(14, 40, 85, 0.6);
    border: 1px solid rgba(41, 94, 151, 0.6);
    border-radius: 6px;
    padding: 14px 16px;
    text-align: center;
    transition: all 0.3s;

    &:hover {
      border-color: rgba(0, 243, 255, 0.6);
      box-shadow: 0 0 12px rgba(0, 243, 255, 0.2);
    }

    &.highlight {
      background: linear-gradient(135deg, rgba(0, 243, 255, 0.12) 0%, rgba(27, 108, 255, 0.08) 100%);
      border-color: rgba(0, 243, 255, 0.4);
    }

    .summary-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 6px;
    }

    .summary-value {
      display: flex;
      justify-content: center;
      align-items: baseline;
      gap: 3px;

      .val {
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        font-family: 'YJSZ', monospace;
      }

      .unit {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      &.cyan .val {
        color: #00f3ff;
        text-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
      }
    }

    .summary-tip {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.4);
      margin-top: 4px;
    }
  }
}

.sort-tip-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.deduct-tip {
  font-size: 10px;
  color: #F56C6C;
  margin-left: 4px;
}

::v-deep .el-radio-group {
  .el-radio-button__inner {
    background: rgba(14, 40, 85, 0.5);
    border-color: rgba(41, 94, 151, 0.5);
    color: rgba(255, 255, 255, 0.85);
    
    &:hover {
      color: #00f3ff;
    }
  }
  
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: rgba(0, 243, 255, 0.2);
    border-color: #00f3ff;
    color: #00f3ff;
    box-shadow: -1px 0 0 0 #00f3ff;
  }
}

/* --- Share Badge Styling --- */
.share-badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  font-family: monospace;

  &.holding {
    background: rgba(237, 190, 117, 0.18);
    border: 1px solid rgba(237, 190, 117, 0.6);
    color: #edbe75;
  }

  &.joint {
    background: rgba(0, 243, 255, 0.15);
    border: 1px solid rgba(0, 243, 255, 0.5);
    color: #00f3ff;
  }

  &.minor {
    background: rgba(27, 108, 255, 0.15);
    border: 1px solid rgba(27, 108, 255, 0.5);
    color: #409EFF;
  }
}

/* --- Joint Venture Companies Card Styles --- */
.jv-companies-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 8px;
  box-sizing: border-box;

  .jv-summary-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(14, 40, 85, 0.6);
    border: 1px solid rgba(41, 94, 151, 0.5);
    border-radius: 6px;
    padding: 6px 10px;

    .jv-summary-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .jv-sum-label {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.6);
      }

      .jv-sum-val {
        font-size: 14px;
        font-weight: bold;
        font-family: 'YJSZ', monospace;

        .unit {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-family: sans-serif;
        }

        &.cyan { color: #00f3ff; }
        &.blue { color: #409EFF; }
        &.gold { color: #edbe75; }
      }
    }

    .jv-sum-divider {
      width: 1px;
      height: 20px;
      background: rgba(41, 94, 151, 0.4);
    }
  }

  .jv-list-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(6, 18, 40, 0.5);
    border: 1px solid rgba(41, 94, 151, 0.4);
    border-radius: 6px;
    overflow: hidden;

    .jv-list-header {
      display: flex;
      align-items: center;
      padding: 6px 10px;
      background: rgba(14, 40, 85, 0.7);
      border-bottom: 1px solid rgba(41, 94, 151, 0.4);
      font-size: 11px;
      color: rgba(255, 255, 255, 0.7);
      font-weight: bold;

      .col-name { flex: 1.2; }
      .col-share { width: 68px; text-align: center; }
      .col-staff { width: 62px; text-align: center; }
      .col-revenue { width: 72px; text-align: right; }
    }

    .jv-list-body {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;

      .jv-row-item {
        display: flex;
        align-items: center;
        padding: 6px 10px;
        border-bottom: 1px solid rgba(41, 94, 151, 0.2);
        font-size: 11px;
        transition: background 0.2s;

        &:hover {
          background: rgba(0, 243, 255, 0.08);
        }

        .col-name {
          flex: 1.2;
          display: flex;
          align-items: center;
          gap: 6px;
          overflow: hidden;

          .dot {
            width: 4px;
            height: 4px;
            background: #00f3ff;
            border-radius: 50%;
            flex-shrink: 0;
          }

          .name-text {
            color: rgba(255, 255, 255, 0.9);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .col-share {
          width: 68px;
          text-align: center;
        }

        .col-staff {
          width: 62px;
          text-align: center;
          color: rgba(255, 255, 255, 0.85);

          i {
            color: #00f3ff;
            margin-right: 2px;
          }
        }

        .col-revenue {
          width: 72px;
          text-align: right;

          .rev-num {
            color: #edbe75;
            font-weight: bold;
            font-family: 'YJSZ', monospace;
          }

          .rev-unit {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.5);
            margin-left: 2px;
          }
        }
      }
    }
  }
}
</style>

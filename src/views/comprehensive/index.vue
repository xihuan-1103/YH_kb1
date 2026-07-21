<template>
  <div class="container">
    <Layout ref="asideLayout">
      <!-- 1. Header Section Slot -->
      <template #header>
        <HeaderLayout>
          <template #left>
            <div class="header-left">
              <span class="org-name">交科养护集团数字化大屏</span>
            </div>
          </template>
          <template #middle>
            <Logo leftTitle="交科养护集团" :rightTitle="currentTabName" />
          </template>
          <template #right>
            <div class="right-menu">
              <div class="header-decoration-wrap">
                <TimeCounter />
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
          ref="refMap"
        />
      </template>

      <!-- 3. Top Executive Statistics (1/8 to 1/10 Height) -->
      <template #top>
        <div class="compact-stats-container">
          <div class="stats-card" v-for="(stat, sIdx) in topStats" :key="sIdx">
            <div class="stats-icon">
              <i :class="stat.icon"></i>
            </div>
            <div class="stats-text">
              <div class="stats-title">{{ stat.label }}</div>
              <div class="stats-value-row">
                <span class="value-num">{{ stat.value }}</span>
                <span class="value-unit">{{ stat.unit }}</span>
                <span class="value-ratio" :class="stat.trendClass">{{ stat.subText }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 4. Left Sidebar (3 Modules) -->
      <template #left>
        <div class="sidebar-wrapper animate-left" :key="'left-' + activeTab">
          <div 
            class="card-item" 
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
            <div class="chart-wrapper">
              <div v-if="item.chartType === 'market_expansion'" class="market-expansion-card">
                <!-- Highlight Row for Year Accumulated & Year Target -->
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
                </div>
                
                <!-- Secondary Metrics Row -->
                <div class="market-secondary-row">
                  <div class="secondary-item">
                    <span class="sec-label">上年度新签额</span>
                    <span class="sec-value">28,500 <span class="sec-unit">万</span></span>
                  </div>
                  <div class="secondary-divider"></div>
                  <div class="secondary-item">
                    <span class="sec-label">本月新增签约</span>
                    <span class="sec-value">3,200 <span class="sec-unit">万</span></span>
                  </div>
                </div>

                <!-- Unified Progress Bar showing completion percentage -->
                <div class="market-progress-container">
                  <div class="progress-bar-label">
                    <span class="label-txt">年度指标目标完成进度</span>
                    <span class="progress-val">76.57%</span>
                  </div>
                  <div class="custom-progress-bg">
                    <div class="custom-progress-fill" style="width: 76.57%">
                      <div class="progress-glare"></div>
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
            :class="{ 'receivables-card-item': item.chartType === 'receivables_info' }"
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
            <div class="chart-wrapper" :class="{ 'receivables-chart-wrapper': item.chartType === 'receivables_info' }">
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

                <!-- 4 Categories Grid -->
                <div class="proj-categories-grid">
                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot daily"></span>日常项目</span>
                      <span class="cat-num">156个 (52.0%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill daily" style="width: 52%"></div>
                    </div>
                  </div>

                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot special"></span>专项项目</span>
                      <span class="cat-num">84个 (28.0%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill special" style="width: 28%"></div>
                    </div>
                  </div>

                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot fullLife"></span>全寿命/全域</span>
                      <span class="cat-num">42个 (14.0%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill fullLife" style="width: 14%"></div>
                    </div>
                  </div>

                  <div class="cat-progress-item">
                    <div class="cat-header">
                      <span class="cat-name"><span class="cat-dot unique"></span>特殊项目</span>
                      <span class="cat-num">18个 (6.0%)</span>
                    </div>
                    <div class="cat-bar-bg">
                      <div class="cat-bar-fill unique" style="width: 6%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 2: Group Accounts Receivable (Standalone Card) -->
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

              <!-- Case 3: Echarts Fallback -->
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
                <label 
                  v-for="company in companyOptions" 
                  :key="company"
                  class="cyber-checkbox-label"
                  :class="{ checked: filterCompanies.includes(company) }"
                >
                  <input 
                    type="checkbox" 
                    :value="company" 
                    v-model="filterCompanies" 
                    class="hidden-input"
                  />
                  <span class="custom-checkbox-btn">
                    <i class="el-icon-check" v-if="filterCompanies.includes(company)"></i>
                    {{ company }}
                  </span>
                </label>
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
                <label 
                  v-for="region in regionOptions" 
                  :key="region"
                  class="cyber-checkbox-label"
                  :class="{ checked: filterRegions.includes(region) }"
                >
                  <input 
                    type="checkbox" 
                    :value="region" 
                    v-model="filterRegions" 
                    class="hidden-input"
                  />
                  <span class="custom-checkbox-btn">
                    <i class="el-icon-check" v-if="filterRegions.includes(region)"></i>
                    {{ region }}
                  </span>
                </label>
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

    <!-- Watermark Overlay -->
    <WaterMaker />

    <!-- Requirement 1: Detailed Down-Drill Dialog (查看详情弹窗) -->
    <el-dialog
      :title="detailDialogTitle"
      :visible.sync="detailDialogVisible"
      :width="activeDetailItem && (activeDetailItem.chartType === 'market_expansion' || activeDetailItem.chartType === 'project_info') ? '80%' : '1000px'"
      :custom-class="activeDetailItem && (activeDetailItem.chartType === 'market_expansion' || activeDetailItem.chartType === 'project_info') ? 'market-dialog-large' : ''"
      append-to-body
      class="detail-drill-dialog"
      @opened="handleDialogOpened"
      @closed="handleDialogClosed"
    >
      <div class="dialog-drill-container" v-if="activeDetailItem">
        
        <!-- Custom layout for market_expansion -->
        <div v-if="activeDetailItem.chartType === 'market_expansion'" class="market-expansion-dialog-body">
          
          <!-- Top Row: Left (Table) & Right (Pie Chart) -->
          <div class="market-top-row">
            <!-- Left Panel: 区域中心指标明细账目 -->
            <div class="market-section-block top-left-panel">
              <div class="market-section-title">
                <span class="title-decorator"></span>
                <span>一、区域中心指标明细账目 (降序排列)</span>
              </div>
              <div class="table-container">
                <el-table 
                  :data="marketRegionTableData" 
                  stripe 
                  size="mini"
                  height="100%"
                  style="width: 100%"
                  class="custom-image-style-table"
                >
                  <el-table-column prop="center" label="区域中心" width="110px" />
                  <el-table-column prop="lastYear" label="上年新签(万)" sortable />
                  <el-table-column prop="target" label="今年目标(万)" sortable />
                  <el-table-column prop="accumulated" label="今年开累(万)" sortable />
                  <el-table-column prop="rate" label="目标完成率" sortable width="100px">
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
                <span>二、承接资质本年开累金额占比</span>
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

          <!-- Bottom Row: 项目类型管养与下辖明细 -->
          <div class="market-section-block bottom-panel">
            <div class="market-section-title">
              <span class="title-decorator"></span>
              <span>三、项目类型管养维度深度分析</span>
            </div>

            <div class="scope-split-container">
              <!-- Left: Category list (日常, 专项, 全寿命, 特殊) -->
              <div class="scope-left-panel">
                <div class="panel-subtitle">
                  <i class="el-icon-folder-opened"></i>
                  <span>项目类型统计 (点击大类查看下辖明细)</span>
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
                  <span>【{{ selectedScopeKey === 'daily' ? '日常项目' : selectedScopeKey === 'special' ? '专项项目' : selectedScopeKey === 'fullLife' ? '全寿命/全域' : '特殊项目' }}】具体项目明细账目</span>
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
import { HeaderLayout, Logo, TimeCounter } from '@/components/Header/index.js'
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
    Logo,
    TimeCounter,
    FullScreen,
    WaterMaker,
    ScreenSubtitle,
    QiaoLiangDiTu
  },
  data() {
    return {
      activeTab: 0,
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
        { key: 'daily', label: '日常项目', value: '156', ratio: '52.00', sub: '在建: 126个 | 完工: 30个' },
        { key: 'special', label: '专项项目', value: '84', ratio: '28.00', sub: '在建: 74个 | 完工: 10个' },
        { key: 'fullLife', label: '全寿命/全域', value: '42', ratio: '14.00', sub: '在建: 38个 | 完工: 4个' },
        { key: 'unique', label: '特殊项目', value: '18', ratio: '6.00', sub: '在建: 16个 | 完工: 2个' }
      ],
      projectScopeDetailData: {
        daily: [
          { place: '杭州绕城日常绿化保养项目', region: '杭州区域中心', dept: '杭州绿化养护项目部', status: '在建' },
          { place: '沪杭甬高速日常路面养护工程', region: '杭州区域中心', dept: '沪杭甬路面保洁项目部', status: '在建' },
          { place: '绍兴诸永高速桥梁日常维护项目', region: '绍兴区域中心', dept: '诸永桥隧日常养护项目部', status: '已完工' },
          { place: '宁波甬台温路基日常巡查治理', region: '甬舟区域中心', dept: '甬台温日常维保项目部', status: '在建' },
          { place: '嘉兴钱江通道机电系统日常保养', region: '嘉兴区域中心', dept: '钱江通道机电维护项目部', status: '已完工' }
        ],
        special: [
          { place: '温州大桥特种健康度加固专项', region: '温州区域中心', dept: '温州特种加固专项项目部', status: '在建' },
          { place: '杭州湾跨海大桥护栏升级专项', region: '宁波区域中心', dept: '跨海大桥安全提升项目部', status: '在建' },
          { place: '诸永高速高边坡专项灾害治理项目', region: '绍兴区域中心', dept: '诸永边坡综合治理项目部', status: '已完工' },
          { place: '申苏浙皖高速路面中修专项工程', region: '湖州区域中心', dept: '申苏浙皖大中修项目部', status: '在建' }
        ],
        fullLife: [
          { place: '台州全域养护一体化PPP示范项目', region: '台州区域中心', dept: '台州全域一体化项目部', status: '在建' },
          { place: '舟山跨海大桥全寿命周期大修工程', region: '甬舟区域中心', dept: '舟山跨海大桥全寿命项目部', status: '在建' },
          { place: '丽水生态示范公路绿化长周期代维', region: '丽水区域中心', dept: '丽水生态绿化长寿命代管部', status: '在建' }
        ],
        unique: [
          { place: '重要保障通道段桥梁特种涂装工程', region: '杭州区域中心', dept: '重大保障涂装专项部', status: '已完工' },
          { place: '极端气候抢险保通大桥应急修复', region: '温州区域中心', dept: '应急抢险突击第一项目部', status: '在建' }
        ]
      }
    }
  },
  computed: {
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
    // Top executive statistics based on active tab
    topStats() {
      const statsMap = {
        ref_inner: [
          { label: '在岗施工总人数', value: '1,482', unit: '人', subText: '出勤率 95.8%', icon: 'el-icon-user', trendClass: 'trend-up' },
          { label: '特种及日常设备', value: '276', unit: '台/套', subText: '运行率 98.2%', icon: 'el-icon-truck', trendClass: 'trend-up' },
          { label: '生产中场站总数', value: '12', unit: '座', subText: '达产率 100%', icon: 'el-icon-office-building', trendClass: 'trend-neutral' },
          { label: '安全生产天数', value: '1,248', unit: '天', subText: '无事故记录', icon: 'el-icon-coordinate', trendClass: 'trend-up' }
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
      }, 500)
    })
  },
  beforeDestroy() {
    this.stopAutoScroll()
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
    // Reset Multi-dimensional Filter inputs
    resetFilters() {
      this.filterCompanies = []
      this.filterRegions = []
      this.filterYears = ['2026']
    },
    // Drill-down Detail Modal opening
    handleViewDetail(item) {
      if (item.chartType === 'receivables_info') {
        this.receivablesDialogVisible = true
        return
      }
      this.activeDetailItem = item
      
      if (item.chartType === 'project_info') {
        this.selectedScopeKey = 'daily'
      } else {
        this.selectedScopeKey = 'provIn'
      }

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
      
      if (this.activeDetailItem.chartType === 'market_expansion') {
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
              name: '资质开累金额',
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
                { value: 12400, name: '交工沪杭甬', itemStyle: { color: '#00f3ff' } },
                { value: 8200, name: '顺畅养护', itemStyle: { color: '#1b6cff' } },
                { value: 6200, name: '交工养护', itemStyle: { color: '#edbe75' } }
              ]
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
    height: 108px !important; /* Exactly ~1/10 of screen height */
    top: 110px !important;
  }
}

/* === Header CSS styles === */
.header-left {
  display: flex;
  align-items: center;
  height: 50%;
  padding-left: 30px;
}

.org-name {
  color: #00f3ff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
  cursor: default;
}

.right-menu {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;

  .header-decoration-wrap {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 29px;
    font-size: 14px;
    position: relative;
  }
}

/* === Compact Stats Container === */
.compact-stats-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 840px;
  height: 90px;
  gap: 12px;
  padding: 0px 8px;
}

.stats-card {
  flex: 1;
  height: 72px;
  background: rgba(6, 18, 40, 0.6);
  border: 1.5px solid rgba(41, 94, 151, 0.5);
  border-radius: 6px;
  box-shadow: inset 0 0 12px rgba(64, 158, 255, 0.2);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: #00f3ff;
    box-shadow: 0 0 8px #00f3ff;
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
  
  .chart-wrapper {
    width: 100%;
    height: 200px;
    padding: 10px;
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

              &.daily { background: #00f3ff; }
              &.special { background: #1b6cff; }
              &.fullLife { background: #edbe75; }
              &.unique { background: #e6a23c; }
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

            &.daily { background: linear-gradient(90deg, rgba(0,243,255,0.3), #00f3ff); }
            &.special { background: linear-gradient(90deg, rgba(27,108,255,0.3), #1b6cff); }
            &.fullLife { background: linear-gradient(90deg, rgba(237,190,117,0.3), #edbe75); }
            &.unique { background: linear-gradient(90deg, rgba(230,162,44,0.3), #e6a23c); }
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
  justify-content: space-between;
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
      padding: 8px;
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

      .highlight-label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.65);
        margin-bottom: 4px;
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
        font-size: 18px;
        font-weight: bold;
        font-family: 'YJSZ', monospace;
      }

      .highlight-unit {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .market-secondary-row {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 4px;
    padding: 6px 12px;
    margin-bottom: 6px;
    justify-content: space-between;

    .secondary-item {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 4px;

      .sec-label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
      }

      .sec-value {
        font-size: 12px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);

        .sec-unit {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: normal;
        }
      }
    }

    .secondary-divider {
      width: 1px;
      height: 12px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0 10px;
    }
  }

  .market-progress-container {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .progress-bar-label {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.6);
    }

    .custom-progress-bg {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
    }

    .custom-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1b6cff 0%, #00f3ff 100%);
      border-radius: 3px;
      position: relative;
    }

    .progress-glare {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
      animation: progressMove 2s infinite linear;
    }
  }
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
</style>

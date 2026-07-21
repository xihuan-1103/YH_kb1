<template>
  <div class="suidao-tongji">
    <ScreenSubtitle name="隧道统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <ProTabs class="tabs" :position="activeTab" :tabs="tabsData" @toggleClick="handleTabChange" />
      
      <div v-if="activeTab === 'defect'" class="tab-content">
        <div class="stat-item">
          <div class="stat-label">病害分布统计</div>
          <div ref="defectChart" class="chart-box"></div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'maintenance'" class="tab-content">
        <div class="stat-item">
          <div class="stat-label">养护进度</div>
          <div class="progress-list">
            <div class="progress-item">
              <div class="progress-label">日常养护完成率</div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: maintenanceStats.dailyComplete + '%', backgroundColor: '#67C23A' }"></div>
              </div>
              <div class="progress-value">{{ maintenanceStats.dailyComplete }}%</div>
            </div>
            <div class="progress-item">
              <div class="progress-label">专项养护完成率</div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: maintenanceStats.specialComplete + '%', backgroundColor: '#409EFF' }"></div>
              </div>
              <div class="progress-value">{{ maintenanceStats.specialComplete }}%</div>
            </div>
            <div class="progress-item">
              <div class="progress-label">设备维护完成率</div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: maintenanceStats.equipmentComplete + '%', backgroundColor: '#E6A23C' }"></div>
              </div>
              <div class="progress-value">{{ maintenanceStats.equipmentComplete }}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'inspection'" class="tab-content">
        <div class="stat-item">
          <div class="stat-label">巡检统计</div>
          <div class="inspection-grid">
            <div class="inspection-card">
              <div class="card-label">计划完成数</div>
              <div class="card-value">{{ inspectionStats.planned }}</div>
            </div>
            <div class="inspection-card">
              <div class="card-label">已完成</div>
              <div class="card-value">{{ inspectionStats.completed }}</div>
            </div>
            <div class="inspection-card">
              <div class="card-label">逾期数</div>
              <div class="card-value">{{ inspectionStats.overdue }}</div>
            </div>
            <div class="inspection-card">
              <div class="card-label">病害发现数</div>
              <div class="card-value">{{ inspectionStats.defectFound }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'defectFault'" class="tab-content">
        <div class="stat-item">
          <div class="stat-label">病害/故障统计</div>
          <div ref="defectFaultChart" class="chart-box"></div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'plan'" class="tab-content">
        <div class="stat-item">
          <div class="stat-label">计划统计</div>
          <div class="plan-list">
            <div class="plan-item">
              <div class="plan-label">定期巡检执行率</div>
              <div class="plan-value">{{ planStats.regularInspection }}%</div>
            </div>
            <div class="plan-item">
              <div class="plan-label">专项巡检执行率</div>
              <div class="plan-value">{{ planStats.specialInspection }}%</div>
            </div>
            <div class="plan-item">
              <div class="plan-label">设备巡检执行率</div>
              <div class="plan-value">{{ planStats.equipmentInspection }}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'monitoring'" class="tab-content">
        <div class="stat-item">
          <div class="stat-label">监测概况</div>
          <div class="monitoring-grid">
            <div class="monitoring-card">
              <div class="card-label">结构监测数据</div>
              <div class="card-value">{{ monitoringStats.structureData }}</div>
            </div>
            <div class="monitoring-card">
              <div class="card-label">环境监测数据</div>
              <div class="card-value">{{ monitoringStats.environmentData }}</div>
            </div>
            <div class="monitoring-card">
              <div class="card-label">设备监测数据</div>
              <div class="card-value">{{ monitoringStats.equipmentData }}</div>
            </div>
            <div class="monitoring-card warning">
              <div class="card-label">预警统计</div>
              <div class="card-value">{{ monitoringStats.warningCount }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'electromechanical'" class="tab-content">
        <div class="stat-item">
          <div class="stat-label">机电统计</div>
          <div class="electromechanical-list">
            <div class="electromechanical-item">
              <div class="item-label">设备数量</div>
              <div class="item-value">{{ electromechanicalStats.equipmentCount }}</div>
            </div>
            <div class="electromechanical-item">
              <div class="item-label">运行年限</div>
              <div class="item-value">{{ electromechanicalStats.operationYears }}年</div>
            </div>
            <div class="electromechanical-item">
              <div class="item-label">故障频次</div>
              <div class="item-value">{{ electromechanicalStats.faultCount }}</div>
            </div>
            <div class="electromechanical-item">
              <div class="item-label">维保率</div>
              <div class="item-value">{{ electromechanicalStats.maintenanceRate }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import ProTabs from '@/components/ProTabs/index.vue'
import { 
  getTunnelDefectStats, 
  getTunnelMaintenanceProgress, 
  getTunnelInspectionStats, 
  getTunnelDefectFaultStats, 
  getTunnelPlanStats, 
  getTunnelMonitoringStats, 
  getTunnelElectromechanicalStats 
} from '@/api/bridge'

export default {
  name: 'SuiDaoTongJi',
  components: { ScreenSubtitle, ProTabs },
  data() {
    return {
      activeTab: 'defect',
      tabsData: [
        { key: 'defect', label: '病害分布统计' },
        { key: 'maintenance', label: '养护进度' },
        { key: 'inspection', label: '巡检统计' },
        { key: 'defectFault', label: '病害/故障统计' },
        { key: 'plan', label: '计划统计' },
        { key: 'monitoring', label: '监测概况' },
        { key: 'electromechanical', label: '机电统计' }
      ],
      defectStats: { byPosition: [], totalCount: 0 },
      maintenanceStats: { dailyComplete: 0, dailyTotal: 100, specialComplete: 0, specialTotal: 100, equipmentComplete: 0, equipmentTotal: 100 },
      inspectionStats: { planned: 0, completed: 0, overdue: 0, defectFound: 0 },
      defectFaultStats: { byType: [], totalCount: 0 },
      planStats: { regularInspection: 0, specialInspection: 0, equipmentInspection: 0 },
      monitoringStats: { structureData: 0, environmentData: 0, equipmentData: 0, warningCount: 0 },
      electromechanicalStats: { equipmentCount: 0, operationYears: 0, faultCount: 0, maintenanceRate: 0 },
      defectChart: null,
      defectFaultChart: null
    }
  },
  watch: {
    activeTab() {
      this.$nextTick(() => this.renderCurrentChart())
    }
  },
  async mounted() {
    await this.loadAllData()
    this.$nextTick(() => this.renderCurrentChart())
  },
  beforeDestroy() {
    if (this.defectChart) this.defectChart.dispose()
    if (this.defectFaultChart) this.defectFaultChart.dispose()
  },
  methods: {
    async loadAllData() {
      const [res1, res2, res3, res4, res5, res6, res7] = await Promise.all([
        getTunnelDefectStats(),
        getTunnelMaintenanceProgress(),
        getTunnelInspectionStats(),
        getTunnelDefectFaultStats(),
        getTunnelPlanStats(),
        getTunnelMonitoringStats(),
        getTunnelElectromechanicalStats()
      ])
      if (res1.code === 200) this.defectStats = res1.data
      if (res2.code === 200) this.maintenanceStats = res2.data
      if (res3.code === 200) this.inspectionStats = res3.data
      if (res4.code === 200) this.defectFaultStats = res4.data
      if (res5.code === 200) this.planStats = res5.data
      if (res6.code === 200) this.monitoringStats = res6.data
      if (res7.code === 200) this.electromechanicalStats = res7.data
    },
    handleTabChange(key) {
      this.activeTab = key
    },
    renderCurrentChart() {
      if (this.activeTab === 'defect') {
        this.renderDefectChart()
      } else if (this.activeTab === 'defectFault') {
        this.renderDefectFaultChart()
      }
    },
    renderDefectChart() {
      if (!this.$refs.defectChart) return
      
      if (this.defectChart) {
        this.defectChart.dispose()
      }
      this.defectChart = echarts.init(this.$refs.defectChart)
      
      this.defectChart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'],
        series: [{
          type: 'pie',
          radius: ['35%', '60%'],
          center: ['50%', '40%'],
          label: { color: '#fff', fontSize: 11 },
          data: this.defectStats.byPosition
        }]
      })
    },
    renderDefectFaultChart() {
      if (!this.$refs.defectFaultChart) return
      
      if (this.defectFaultChart) {
        this.defectFaultChart.dispose()
      }
      this.defectFaultChart = echarts.init(this.$refs.defectFaultChart)
      
      const chartData = this.defectFaultStats.byType.map(item => ({
        name: item.name,
        value: item.count,
        itemStyle: {
          color: item.severity === '严重' ? '#F56C6C' : item.severity === '中等' ? '#E6A23C' : '#409EFF'
        }
      }))
      
      this.defectFaultChart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: 60, right: 20, top: 10, bottom: 30 },
        xAxis: {
          type: 'category',
          data: this.defectFaultStats.byType.map(i => i.name),
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, interval: 0 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
          splitLine: { lineStyle: { color: 'rgba(41,94,151,0.3)' } }
        },
        series: [{
          type: 'bar',
          data: chartData,
          barWidth: '50%',
          itemStyle: {
            borderRadius: [4, 4, 0, 0]
          }
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.suidao-tongji {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;

  .tabs {
    width: 100%;
    margin-bottom: 10px;
  }
}

.tab-content {
  min-height: 200px;
}

.stat-item {
  .stat-label {
    font-size: 13px;
    color: #8dccf5;
    margin-bottom: 10px;
    font-weight: 500;
  }
}

.chart-box {
  width: 100%;
  height: 200px;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-label {
  width: 120px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.progress-bar-container {
  flex: 1;
  height: 20px;
  background: rgba(8, 32, 68, 0.5);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(41, 94, 151, 0.3);
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.progress-value {
  width: 50px;
  text-align: right;
  color: #8dccf5;
  font-size: 14px;
  font-family: 'YJSZ';
}

.inspection-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.inspection-card {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.card-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-bottom: 8px;
}

.card-value {
  color: #edbe75;
  font-size: 28px;
  font-weight: 600;
  font-family: 'YJSZ';
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
}

.plan-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.plan-value {
  color: #409EFF;
  font-size: 20px;
  font-weight: 600;
  font-family: 'YJSZ';
}

.monitoring-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.monitoring-card {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  
  &.warning {
    border-color: #F56C6C;
    .card-label {
      color: #F56C6C;
    }
    .card-value {
      color: #F56C6C;
    }
  }
}

.electromechanical-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.electromechanical-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 10px 16px;
}

.item-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.item-value {
  color: #8dccf5;
  font-size: 18px;
  font-weight: 600;
  font-family: 'YJSZ';
}
</style>

<template>
  <div class="pci-luduan-licheng-zhanbi">
    <ScreenSubtitle name="PCI路段里程占比统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div ref="chartBox" class="chart-box"></div>
      <div class="legend-list">
        <div v-for="(item, index) in stats.data" :key="index" class="legend-item">
          <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
          <div class="legend-name">{{ item.name }}</div>
          <div class="legend-value">{{ item.length }}km</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getPCIRoadStats } from '@/api/bridge'

export default {
  name: 'PCILuDuanLiChengZhanBi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: {
        totalLength: 0,
        data: []
      },
      chart: null
    }
  },
  async mounted() {
    const res = await getPCIRoadStats()
    if (res.code === 200) {
      this.stats = res.data
      this.$nextTick(() => this.renderChart())
    }
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    renderChart() {
      if (!this.$refs.chartBox) return
      
      this.chart = echarts.init(this.$refs.chartBox)
      
      const chartData = this.stats.data.map(item => ({
        name: item.name,
        value: item.length,
        itemStyle: { color: item.color }
      })).filter(item => item.value > 0)

      this.chart.setOption({
        tooltip: { 
          trigger: 'item', 
          formatter: '{b}: {c}km ({d}%)' 
        },
        legend: {
          show: false
        },
        series: [{
          type: 'pie',
          radius: ['45%', '65%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: { 
            show: false
          },
          labelLine: { show: false },
          data: chartData
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pci-luduan-licheng-zhanbi {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.chart-box {
  width: 240px;
  height: 200px;
  flex-shrink: 0;
}

.legend-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-name {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  width: 40px;
}

.legend-value {
  color: #8dccf5;
  font-size: 14px;
  font-family: 'YJSZ';
}
</style>

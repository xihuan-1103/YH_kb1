<template>
  <div class="binghai-guzhang-tongji">
    <ScreenSubtitle name="病害/故障统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div ref="chartBox" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getTunnelDefectFaultStats } from '@/api/bridge'

export default {
  name: 'BingHaiGuZhangTongJi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { byType: [], totalCount: 0 },
      chart: null
    }
  },
  async mounted() {
    const res = await getTunnelDefectFaultStats()
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
      
      const chartData = this.stats.byType.map(item => ({
        name: item.name,
        value: item.count,
        itemStyle: {
          color: item.severity === '严重' ? '#F56C6C' : item.severity === '中等' ? '#E6A23C' : '#409EFF'
        }
      }))
      
      this.chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: 60, right: 20, top: 10, bottom: 30 },
        xAxis: {
          type: 'category',
          data: this.stats.byType.map(i => i.name),
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
.binghai-guzhang-tongji {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
}

.chart-box {
  width: 100%;
  height: 200px;
}
</style>

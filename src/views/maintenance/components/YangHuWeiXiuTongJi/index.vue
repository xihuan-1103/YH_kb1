<template>
  <div class="yanghu-weixiu-tongji">
    <ScreenSubtitle name="养护维修统计" />
    <div class="content-wrap">
      <div ref="chart" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getMaintenanceRepairStats } from '@/api/maintenance'

export default {
  name: 'YangHuWeiXiuTongJi',
  components: { ScreenSubtitle },
  data() {
    return { chart: null }
  },
  async mounted() {
    const res = await getMaintenanceRepairStats()
    if (res.code === 200) {
      this.$nextTick(() => this.renderChart(res.data.byType))
    }
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    renderChart(data) {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: 80, right: 20, top: 10, bottom: 30 },
        xAxis: {
          type: 'value',
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
          splitLine: { lineStyle: { color: 'rgba(41,94,151,0.3)' } }
        },
        yAxis: {
          type: 'category',
          data: data.map(i => i.type),
          axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 }
        },
        series: [{
          type: 'bar',
          data: data.map(i => i.count),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#409EFF' },
              { offset: 1, color: '#67C23A' }
            ])
          },
          barWidth: 14,
          label: { show: true, position: 'right', color: 'rgba(255,255,255,0.7)', fontSize: 11 }
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.yanghu-weixiu-tongji { width: 490px; }
.content-wrap { padding: 8px 16px; }
.chart-box { width: 100%; height: 180px; }
</style>

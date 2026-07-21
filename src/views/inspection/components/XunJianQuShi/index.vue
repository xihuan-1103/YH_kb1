<template>
  <div class="xunjian-qushi">
    <ScreenSubtitle name="巡检趋势" :showExpirationDate="true" />
    <div class="content-wrap">
      <div ref="chart" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getInspectionTrend } from '@/api/inspection'

export default {
  name: 'XunJianQuShi',
  components: { ScreenSubtitle },
  data() {
    return { chart: null }
  },
  async mounted() {
    const res = await getInspectionTrend()
    if (res.code === 200) {
      this.$nextTick(() => this.renderChart(res.data))
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
        legend: { top: 0, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
        grid: { left: 40, right: 20, top: 30, bottom: 30 },
        xAxis: {
          type: 'category',
          data: data.map(i => i.month.slice(5)),
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
          splitLine: { lineStyle: { color: 'rgba(41,94,151,0.3)' } }
        },
        color: ['#409EFF', '#67C23A', '#E6A23C'],
        series: [
          { name: '经常检查', type: 'bar', stack: 'total', data: data.map(i => i.regular), barWidth: 16 },
          { name: '定期检查', type: 'bar', stack: 'total', data: data.map(i => i.periodic) },
          { name: '特殊检查', type: 'bar', stack: 'total', data: data.map(i => i.special) }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.xunjian-qushi { width: 490px; }
.content-wrap { padding: 8px 16px; }
.chart-box { width: 100%; height: 200px; }
</style>

<template>
  <div class="yanghu-qushi">
    <ScreenSubtitle name="养护次数月度变化趋势" :showExpirationDate="true" />
    <div class="content-wrap">
      <div ref="chart" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getMaintenanceMonthlyTrend } from '@/api/maintenance'

export default {
  name: 'YangHuQuShi',
  components: { ScreenSubtitle },
  data() {
    return { chart: null }
  },
  async mounted() {
    const res = await getMaintenanceMonthlyTrend()
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
        grid: { left: 40, right: 40, top: 30, bottom: 30 },
        xAxis: {
          type: 'category',
          data: data.map(i => i.month.slice(5)),
          axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
        },
        yAxis: [
          {
            type: 'value',
            name: '次数',
            axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(41,94,151,0.3)' } },
            nameTextStyle: { color: 'rgba(255,255,255,0.5)' }
          },
          {
            type: 'value',
            name: '投资(万)',
            axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
            splitLine: { show: false },
            nameTextStyle: { color: 'rgba(255,255,255,0.5)' }
          }
        ],
        series: [
          {
            name: '养护次数',
            type: 'bar',
            data: data.map(i => i.count),
            itemStyle: { color: '#409EFF' },
            barWidth: 16
          },
          {
            name: '投资额',
            type: 'line',
            yAxisIndex: 1,
            data: data.map(i => i.investment),
            smooth: true,
            lineStyle: { color: '#E6A23C' },
            itemStyle: { color: '#E6A23C' }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.yanghu-qushi { width: 490px; }
.content-wrap { padding: 8px 16px; }
.chart-box { width: 100%; height: 220px; }
</style>

<template>
  <div class="quexian-tongji">
    <ScreenSubtitle name="缺陷统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="summary-row">
        <div class="summary-item">
          <span class="value">{{ stats.total }}</span>
          <span class="label">缺陷总数</span>
        </div>
        <div class="summary-item">
          <span class="value" style="color:#67C23A">{{ stats.handledThisMonth }}</span>
          <span class="label">本月处置</span>
        </div>
        <div class="summary-item">
          <span class="value" style="color:#F56C6C">{{ stats.newThisMonth }}</span>
          <span class="label">本月新增</span>
        </div>
      </div>
      <div class="chart-row">
        <div ref="levelChart" class="chart-half"></div>
        <div ref="typeChart" class="chart-half"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getDefectStats } from '@/api/inspection'

export default {
  name: 'QueXianTongJi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { total: 0, newThisMonth: 0, handledThisMonth: 0 },
      charts: []
    }
  },
  async mounted() {
    const res = await getDefectStats()
    if (res.code === 200) {
      this.stats = res.data
      this.$nextTick(() => this.renderCharts(res.data))
    }
  },
  beforeDestroy() {
    this.charts.forEach(c => c && c.dispose())
  },
  methods: {
    renderCharts(data) {
      // 按等级饼图
      const levelChart = echarts.init(this.$refs.levelChart)
      this.charts.push(levelChart)
      levelChart.setOption({
        title: { text: '按等级', left: 'center', top: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 } },
        tooltip: { trigger: 'item' },
        color: data.byLevel.map(i => i.color),
        series: [{
          type: 'pie',
          radius: ['30%', '55%'],
          center: ['50%', '55%'],
          label: { color: '#fff', fontSize: 10, formatter: '{b}\n{c}' },
          data: data.byLevel.map(i => ({ name: i.level, value: i.count }))
        }]
      })

      // 按类型柱状图
      const typeChart = echarts.init(this.$refs.typeChart)
      this.charts.push(typeChart)
      typeChart.setOption({
        title: { text: '按类型', left: 'center', top: 0, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12 } },
        tooltip: { trigger: 'axis' },
        grid: { left: 10, right: 10, top: 25, bottom: 30 },
        xAxis: {
          type: 'category',
          data: data.byType.map(i => i.type),
          axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9, rotate: 30 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { show: false },
          splitLine: { lineStyle: { color: 'rgba(41,94,151,0.2)' } }
        },
        series: [{
          type: 'bar',
          data: data.byType.map(i => i.count),
          itemStyle: { color: '#409EFF' },
          barWidth: 12,
          label: { show: true, position: 'top', color: 'rgba(255,255,255,0.6)', fontSize: 10 }
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.quexian-tongji { width: 490px; }
.content-wrap { padding: 8px 16px; }
.summary-row { display: flex; justify-content: space-around; margin-bottom: 4px; }
.summary-item {
  text-align: center;
  .value { display: block; font-size: 22px; font-weight: 500; color: #edbe75; font-family: 'YJSZ'; line-height: 1.14; }
  .label { font-size: 11px; color: rgba(255,255,255,0.5); }
}
.chart-row { display: flex; gap: 8px; }
.chart-half { width: 50%; height: 180px; }
</style>

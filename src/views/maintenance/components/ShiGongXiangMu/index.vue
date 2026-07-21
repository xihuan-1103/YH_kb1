<template>
  <div class="shigong-xiangmu">
    <ScreenSubtitle name="施工项目数量" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="total-row">
        <span class="total-value">{{ projectData.total }}</span>
        <span class="total-label">个项目</span>
      </div>
      <div ref="chart" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getConstructionProjects } from '@/api/maintenance'

export default {
  name: 'ShiGongXiangMu',
  components: { ScreenSubtitle },
  data() {
    return {
      projectData: { total: 0, byStatus: [] },
      chart: null
    }
  },
  async mounted() {
    const res = await getConstructionProjects()
    if (res.code === 200) {
      this.projectData = res.data
      this.$nextTick(() => this.renderChart())
    }
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    renderChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
        color: this.projectData.byStatus.map(i => i.color),
        series: [{
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['50%', '50%'],
          label: { color: '#fff', fontSize: 11, formatter: '{b}\n{c}个' },
          data: this.projectData.byStatus.map(i => ({ name: i.status, value: i.count }))
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shigong-xiangmu { width: 490px; }
.content-wrap { padding: 8px 16px; }
.total-row {
  text-align: center;
  margin-bottom: 4px;
  .total-value { font-size: 32px; font-weight: 500; color: #edbe75; font-family: 'YJSZ'; line-height: 1.14; }
  .total-label { font-size: 14px; color: rgba(255,255,255,0.5); margin-left: 4px; }
}
.chart-box { width: 100%; height: 180px; }
</style>

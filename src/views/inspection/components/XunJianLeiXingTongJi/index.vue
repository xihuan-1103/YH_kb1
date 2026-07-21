<template>
  <div class="xunjian-leixing">
    <ScreenSubtitle name="巡检类型统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div ref="chart" class="chart-box"></div>
      <div class="legend-row">
        <div class="legend-item" v-for="item in typeStats" :key="item.type">
          <span class="dot" :style="{ background: item.color }"></span>
          <span class="name">{{ item.type }}</span>
          <span class="count">{{ item.count }}次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getInspectionTypeStats } from '@/api/inspection'

export default {
  name: 'XunJianLeiXingTongJi',
  components: { ScreenSubtitle },
  data() {
    return { typeStats: [], chart: null }
  },
  async mounted() {
    const res = await getInspectionTypeStats()
    if (res.code === 200) {
      this.typeStats = res.data
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
        tooltip: { trigger: 'item', formatter: '{b}: {c}次 ({d}%)' },
        color: this.typeStats.map(i => i.color),
        series: [{
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['50%', '50%'],
          label: { show: false },
          data: this.typeStats.map(i => ({ name: i.type, value: i.count }))
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.xunjian-leixing { width: 490px; }
.content-wrap { padding: 8px 16px; }
.chart-box { width: 100%; height: 160px; }
.legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  .dot { width: 8px; height: 8px; border-radius: 50%; }
  .name { color: rgba(255,255,255,0.7); }
  .count { color: #409EFF; font-weight: 600; }
}
</style>

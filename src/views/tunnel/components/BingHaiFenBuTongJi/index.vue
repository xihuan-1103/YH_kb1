<template>
  <div class="binghai-fenbu-tongji">
    <ScreenSubtitle name="病害分布统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div ref="chartBox" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getTunnelDefectStats } from '@/api/bridge'

export default {
  name: 'BingHaiFenBuTongJi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { byPosition: [], totalCount: 0 },
      chart: null
    }
  },
  async mounted() {
    const res = await getTunnelDefectStats()
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
      
      this.chart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'],
        series: [{
          type: 'pie',
          radius: ['35%', '60%'],
          center: ['50%', '45%'],
          label: { color: '#fff', fontSize: 11 },
          data: this.stats.byPosition
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.binghai-fenbu-tongji {
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

<template>
  <div class="binghai-chuzhi">
    <ScreenSubtitle name="病害处置情况" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="summary-row">
        <div class="summary-item">
          <span class="value">{{ summary.total }}</span>
          <span class="label">病害总数</span>
        </div>
        <div class="summary-item">
          <span class="value" style="color:#67C23A">{{ summary.handled }}</span>
          <span class="label">已处置</span>
        </div>
        <div class="summary-item">
          <span class="value" style="color:#F56C6C">{{ summary.pending }}</span>
          <span class="label">待处置</span>
        </div>
      </div>
      <div ref="chart" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getDefectSummary } from '@/api/bridge'

export default {
  name: 'BingHaiChuZhi',
  components: { ScreenSubtitle },
  data() {
    return {
      summary: { total: 0, handled: 0, pending: 0 },
      chart: null
    }
  },
  async mounted() {
    const res = await getDefectSummary()
    if (res.code === 200) {
      this.summary = res.data
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
        series: [
          {
            name: '已处置',
            type: 'bar',
            stack: 'total',
            data: data.map(i => i.handled),
            itemStyle: { color: '#67C23A' },
            barWidth: 14
          },
          {
            name: '未处置',
            type: 'bar',
            stack: 'total',
            data: data.map(i => i.count - i.handled),
            itemStyle: { color: '#F56C6C' },
            barWidth: 14
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.binghai-chuzhi {
  width: 490px;
}

.content-wrap {
  padding: 12px 16px;
}

.summary-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}

.summary-item {
  text-align: center;
  .value {
    display: block;
    font-size: 30px;
    font-weight: 500;
    color: #edbe75;
    font-family: 'YJSZ';
    line-height: 1.14;
  }
  .label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
}

.chart-box {
  width: 100%;
  height: 180px;
}
</style>

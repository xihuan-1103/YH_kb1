<template>
  <div class="qiaoliang-tongji">
    <ScreenSubtitle name="桥梁信息统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <ProTabs class="tabs" :position="activeTab" :tabs="tabsData" @toggleClick="handleTabChange" />
      <div ref="chartBox" class="chart-box"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import ProTabs from '@/components/ProTabs/index.vue'
import { getBridgeStatistics } from '@/api/bridge'

export default {
  name: 'QiaoLiangXinXiTongJi',
  components: { ScreenSubtitle, ProTabs },
  data() {
    return {
      activeTab: 'age',
      tabsData: [
        { key: 'age', label: '桥龄分布' },
        { key: 'type', label: '桥型统计' },
        { key: 'structure', label: '结构类型' },
        { key: 'category', label: '养护类别' }
      ],
      stats: null,
      chart: null
    }
  },
  watch: {
    activeTab() {
      this.$nextTick(() => this.renderCurrentChart())
    }
  },
  async mounted() {
    const res = await getBridgeStatistics()
    if (res.code === 200) {
      this.stats = res.data
      this.$nextTick(() => this.renderCurrentChart())
    }
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    handleTabChange(key) {
      this.activeTab = key
    },
    renderCurrentChart() {
      if (!this.stats) return
      const chartMap = {
        age: this.stats.byAge.map(i => ({ name: i.range, value: i.count })),
        type: this.stats.byType.map(i => ({ name: i.type, value: i.count })),
        structure: this.stats.byStructure.map(i => ({ name: i.type, value: i.count })),
        category: this.stats.byCategory.map(i => ({ name: i.category, value: i.count }))
      }
      const data = chartMap[this.activeTab]
      if (!data || !this.$refs.chartBox) return

      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.chartBox)

      this.chart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c}座 ({d}%)' },
        legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
        series: [{
          type: 'pie',
          radius: ['35%', '60%'],
          center: ['50%', '40%'],
          label: { color: '#fff', fontSize: 11 },
          data: data
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.qiaoliang-tongji {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;

  .tabs {
    width: 300px;
    margin: 0 auto 10px auto;
  }
}

.chart-box {
  width: 100%;
  height: 220px;
}
</style>

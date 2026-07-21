<template>
  <div class="lumian-xinxitongji">
    <ScreenSubtitle name="路面信息统计" :showExpirationDate="true" />
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
import { getRoadStatistics } from '@/api/bridge'

export default {
  name: 'LuMianXinXiTongJi',
  components: { ScreenSubtitle, ProTabs },
  data() {
    return {
      activeTab: 'age',
      tabsData: [
        { key: 'age', label: '路龄分布' },
        { key: 'maintenance', label: '养护类别' }
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
    const res = await getRoadStatistics()
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
        maintenance: this.stats.byMaintenanceCategory.map(i => ({ name: i.category, value: i.count }))
      }
      const data = chartMap[this.activeTab]
      if (!data || !this.$refs.chartBox) return

      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.chartBox)

      if (this.activeTab === 'age') {
        this.chart.setOption({
          tooltip: { trigger: 'item', formatter: '{b}: {c}条 ({d}%)' },
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
      } else {
        this.chart.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: 60, right: 20, top: 10, bottom: 30 },
          xAxis: {
            type: 'category',
            data: data.map(i => i.name),
            axisLabel: { 
              color: 'rgba(255,255,255,0.6)', 
              fontSize: 10,
              interval: 0,
              rotate: 0
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(41,94,151,0.3)' } }
          },
          series: [{
            type: 'bar',
            data: data.map((item, index) => ({
              value: item.value,
              itemStyle: {
                color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'][index]
              }
            })),
            barWidth: '50%',
            itemStyle: {
              borderRadius: [4, 4, 0, 0]
            }
          }]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lumian-xinxitongji {
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

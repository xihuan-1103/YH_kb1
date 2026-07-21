<template>
  <div class="guanjian-zhibiao">
    <ScreenSubtitle name="桥梁信息统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <ProTabs class="tabs" :position="activeTab" :tabs="tabsData" @toggleClick="handleTabChange" />
      <div class="chart-container">
        <div ref="spanChart" class="chart-box" v-show="activeTab === 'span'"></div>
        <div ref="structureChart" class="chart-box" v-show="activeTab === 'structure'"></div>
        <div class="age-container" v-show="activeTab === 'age'">
          <div class="age-item" v-for="(item, index) in ageData" :key="index">
            <div :ref="el => setAgeChartRef(el, index)" class="age-chart"></div>
            <div class="age-label">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import ProTabs from '@/components/ProTabs/index.vue'
import { getComprehensiveIndicators } from '@/api/bridge'

export default {
  name: 'GuanJianZhiBiao',
  components: { ScreenSubtitle, ProTabs },
  data() {
    return {
      activeTab: 'span',
      tabsData: [
        { key: 'span', label: '跨径分类' },
        { key: 'structure', label: '结构类型' },
        { key: 'age', label: '桥龄' }
      ],
      spanData: [],
      structureData: [],
      ageData: [],
      charts: {},
      ageChartRefs: []
    }
  },
  watch: {
    activeTab() {
      this.$nextTick(() => this.renderCurrentChart())
    }
  },
  async mounted() {
    const res = await getComprehensiveIndicators()
    if (res.code === 200) {
      const d = res.data
      this.spanData = d.spanCategory || []
      this.structureData = d.structureType || []
      this.ageData = d.bridgeAge || []
      this.$nextTick(() => this.renderCurrentChart())
    }
  },
  beforeDestroy() {
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.dispose()
    })
  },
  methods: {
    setAgeChartRef(el, index) {
      if (el) {
        this.ageChartRefs[index] = el
      }
    },
    handleTabChange(key) {
      this.activeTab = key
    },
    renderCurrentChart() {
      if (this.activeTab === 'span') {
        this.renderSpanChart()
      } else if (this.activeTab === 'structure') {
        this.renderStructureChart()
      } else if (this.activeTab === 'age') {
        this.renderAgeCharts()
      }
    },
    renderSpanChart() {
      if (!this.$refs.spanChart) return
      
      if (this.charts.span) {
        this.charts.span.dispose()
      }
      
      this.charts.span = echarts.init(this.$refs.spanChart)
      
      const maxItem = this.spanData.reduce((max, item) => item.value > max.value ? item : max, this.spanData[0])
      
      this.charts.span.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          bottom: 0,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 11
          },
          data: this.spanData.map(item => item.name)
        },
        color: ['#409EFF', '#E6A23C', '#67C23A', '#909399'],
        series: [{
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '45%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: this.spanData
        }]
      })
      
      setTimeout(() => {
        if (this.charts.span) {
          this.charts.span.setOption({
            graphic: {
              type: 'text',
              left: 'center',
              top: '35%',
              style: {
                text: maxItem.name + '\n' + maxItem.value,
                textAlign: 'center',
                fill: '#fff',
                fontSize: 16
              }
            }
          })
        }
      }, 100)
    },
    renderStructureChart() {
      if (!this.$refs.structureChart) return
      
      if (this.charts.structure) {
        this.charts.structure.dispose()
      }
      
      this.charts.structure = echarts.init(this.$refs.structureChart)
      
      this.charts.structure.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.structureData.map(item => item.name),
          axisLabel: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 10,
            interval: 0,
            rotate: 0
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 10
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          }
        },
        series: [{
          type: 'bar',
          data: this.structureData.map(item => ({
            value: item.value,
            itemStyle: {
              color: item.value === Math.max(...this.structureData.map(i => i.value)) ? '#67C23A' : '#409EFF'
            }
          })),
          barWidth: '50%',
          itemStyle: {
            borderRadius: [4, 4, 0, 0]
          }
        }]
      })
    },
    renderAgeCharts() {
      const ageRefs = this.ageChartRefs
      if (!ageRefs || ageRefs.length === 0) return
      
      Object.keys(this.charts).filter(key => key.startsWith('age-')).forEach(key => {
        if (this.charts[key]) this.charts[key].dispose()
      })
      
      const colors = ['#67C23A', '#409EFF', '#E6A23C', '#F56C6C']
      
      this.ageData.forEach((item, index) => {
        if (!ageRefs[index]) return
        const chart = echarts.init(ageRefs[index])
        this.charts[`age-${index}`] = chart
        
        chart.setOption({
          series: [{
            type: 'gauge',
            radius: '90%',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 15,
                color: [
                  [item.percent / 100, colors[index]],
                  [1, 'rgba(255,255,255,0.1)']
                ]
              }
            },
            pointer: {
              show: false
            },
            axisTick: {
              distance: -15,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 1
              }
            },
            splitLine: {
              distance: -15,
              length: 15,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            axisLabel: {
              show: false
            },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, '10%'],
              formatter: '{value}%',
              color: colors[index],
              fontSize: 16,
              fontWeight: 'bold'
            },
            data: [{
              value: item.percent
            }]
          }]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.guanjian-zhibiao {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;

  .tabs {
    width: 300px;
    margin: 0 auto 10px auto;
  }
}

.chart-container {
  width: 100%;
  height: 220px;
}

.chart-box {
  width: 100%;
  height: 100%;
}

.age-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 10px 0;
}

.age-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.age-chart {
  width: 100px;
  height: 100px;
}

.age-label {
  margin-top: 5px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}
</style>

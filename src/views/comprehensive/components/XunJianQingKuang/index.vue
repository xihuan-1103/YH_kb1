<template>
  <div class="xunjian-qingkuang">
    <ScreenSubtitle name="巡检情况" :showExpirationDate="true" />
    <div class="content-wrap">
      <!-- 巡检类型统计 - 饼图 -->
      <div class="section type-section">
        <div class="section-title">巡检类型统计</div>
        <div ref="typeChart" class="type-chart"></div>
      </div>

      <!-- 巡检任务完成情况 -->
      <div class="section completion-section">
        <div class="section-title">巡检任务完成情况</div>
        <div class="completion-grid">
          <div class="completion-item" @click="showInspectionList('total')">
            <div class="completion-value" style="color: #edbe75">{{ summary.total }}</div>
            <div class="completion-label">累计完成</div>
          </div>
          <div class="completion-item" @click="showInspectionList('monthly')">
            <div class="completion-value" style="color: #409EFF">{{ summary.monthlyTotal }}</div>
            <div class="completion-label">本月巡检</div>
          </div>
          <div class="completion-item" @click="showInspectionList('today')">
            <div class="completion-value" style="color: #67C23A">{{ summary.todayTotal }}</div>
            <div class="completion-label">今日巡检</div>
          </div>
          <div class="completion-item" @click="showInspectionList('all')">
            <div class="completion-value" style="color: #E6A23C">{{ summary.completionRate }}%</div>
            <div class="completion-label">完成度</div>
          </div>
        </div>
      </div>

      <!-- 巡检趋势 -->
      <div class="section trend-section">
        <div class="section-title">巡检趋势</div>
        <div ref="trendChart" class="trend-chart"></div>
      </div>
    </div>

    <!-- 巡检列表弹窗 -->
    <ProDialog :visible.sync="listVisible" :title="listTitle" width="700px">
      <div class="inspection-list-content">
        <el-table :data="filteredInspectionList" size="small" style="width: 100%">
          <el-table-column prop="id" label="编号" width="80" />
          <el-table-column prop="bridgeName" label="桥梁名称" width="120" />
          <el-table-column prop="type" label="巡检类型" width="100" />
          <el-table-column prop="inspector" label="检查人" width="80" />
          <el-table-column prop="date" label="日期" width="110" />
          <el-table-column prop="status" label="状态" width="80">
            <template slot-scope="scope">
              <span :class="['status-tag', scope.row.status === '已完成' ? 'status-completed' : 'status-inprogress']">
                {{ scope.row.status }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="result" label="结果" width="80">
            <template slot-scope="scope">
              <span :class="['result-tag', getResultClass(scope.row.result)]">
                {{ scope.row.result }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </ProDialog>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import ProDialog from '@/components/ProDialog/index.vue'
import { getInspectionSummary } from '@/api/bridge'

export default {
  name: 'XunJianQingKuang',
  components: { ScreenSubtitle, ProDialog },
  data() {
    return {
      summary: { 
        total: 0, 
        completed: 0, 
        completionRate: 0,
        monthlyTotal: 0,
        todayTotal: 0,
        typeStats: [],
        inspectionList: []
      },
      typeChart: null,
      trendChart: null,
      listVisible: false,
      listTitle: '巡检列表',
      listType: 'all',
      filteredInspectionList: []
    }
  },
  async mounted() {
    const res = await getInspectionSummary()
    if (res.code === 200) {
      this.summary = res.data
      this.$nextTick(() => {
        this.renderTypeChart(res.data.typeStats)
        this.renderTrendChart(res.data.monthlyTrend)
      })
    }
  },
  beforeDestroy() {
    if (this.typeChart) this.typeChart.dispose()
    if (this.trendChart) this.trendChart.dispose()
  },
  methods: {
    renderTypeChart(data) {
      if (!this.$refs.typeChart) return
      
      this.typeChart = echarts.init(this.$refs.typeChart)
      this.typeChart.setOption({
        tooltip: { 
          trigger: 'item', 
          formatter: '{b}: {c}次 ({d}%)' 
        },
        legend: { 
          bottom: 0, 
          textStyle: { 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: 11 
          }
        },
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'],
        series: [{
          type: 'pie',
          radius: ['35%', '60%'],
          center: ['50%', '40%'],
          label: { 
            color: '#fff', 
            fontSize: 11 
          },
          data: data
        }]
      })
    },
    renderTrendChart(data) {
      if (!this.$refs.trendChart) return
      
      this.trendChart = echarts.init(this.$refs.trendChart)
      this.trendChart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: 40, right: 20, top: 10, bottom: 30 },
        xAxis: {
          type: 'category',
          data: data.map(i => i.month.slice(5)),
          axisLabel: { 
            color: 'rgba(255,255,255,0.6)', 
            fontSize: 11 
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: { 
            color: 'rgba(255,255,255,0.6)', 
            fontSize: 11 
          },
          splitLine: { 
            lineStyle: { 
              color: 'rgba(41,94,151,0.3)' 
            } 
          }
        },
        series: [{
          type: 'line',
          data: data.map(i => i.count),
          smooth: true,
          lineStyle: { color: '#409EFF' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(64,158,255,0.3)' },
              { offset: 1, color: 'rgba(64,158,255,0.01)' }
            ])
          },
          itemStyle: { color: '#409EFF' }
        }]
      })
    },
    showInspectionList(type) {
      this.listType = type
      const titles = {
        total: '累计巡检列表',
        monthly: '本月巡检列表',
        today: '今日巡检列表',
        all: '全部巡检列表'
      }
      this.listTitle = titles[type] || '巡检列表'
      
      this.filteredInspectionList = this.summary.inspectionList || []
      this.listVisible = true
    },
    getResultClass(result) {
      const classes = {
        '优秀': 'result-excellent',
        '良好': 'result-good',
        '一般': 'result-normal',
        '较差': 'result-poor'
      }
      return classes[result] || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.xunjian-qingkuang {
  width: 490px;
}

.content-wrap {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 6px;
  padding: 10px;
}

.section-title {
  font-size: 13px;
  color: #8dccf5;
  margin-bottom: 8px;
  font-weight: 500;
}

.type-section {
  .type-chart {
    width: 100%;
    height: 140px;
  }
}

.completion-section {
  .completion-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  
  .completion-item {
    text-align: center;
    padding: 10px 5px;
    background: rgba(64, 158, 255, 0.1);
    border: 1px solid rgba(64, 158, 255, 0.2);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background: rgba(64, 158, 255, 0.2);
      border-color: #409EFF;
    }
  }
  
  .completion-value {
    display: block;
    font-size: 26px;
    font-weight: 500;
    font-family: 'YJSZ';
    line-height: 1.14;
  }
  
  .completion-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 4px;
  }
}

.trend-section {
  .trend-chart {
    width: 100%;
    height: 120px;
  }
}

.inspection-list-content {
  ::v-deep .el-table {
    background: transparent;
    color: #fff;
    &::before { background-color: #295e97; }
    th { background: rgba(8, 32, 68, 0.7); color: #8dccf5; border-color: #295e97; }
    td { background: transparent; border-color: rgba(41, 94, 151, 0.3); }
    tr:hover td { background: rgba(64, 158, 255, 0.1); }
  }
}

.status-tag {
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
  
  &.status-completed {
    background: #67C23A;
    color: #fff;
  }
  
  &.status-inprogress {
    background: #E6A23C;
    color: #fff;
  }
}

.result-tag {
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
  
  &.result-excellent {
    background: #67C23A;
    color: #fff;
  }
  
  &.result-good {
    background: #409EFF;
    color: #fff;
  }
  
  &.result-normal {
    background: #E6A23C;
    color: #fff;
  }
  
  &.result-poor {
    background: #F56C6C;
    color: #fff;
  }
}
</style>

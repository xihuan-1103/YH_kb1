<template>
  <div class="xunjian-renwu">
    <ScreenSubtitle name="巡检任务完成情况" />
    <div class="content-wrap">
      <div class="summary-row">
        <div class="summary-item">
          <span class="value">{{ taskData.total }}</span>
          <span class="label">总任务</span>
        </div>
        <div class="summary-item">
          <span class="value" style="color:#67C23A">{{ taskData.completed }}</span>
          <span class="label">已完成</span>
        </div>
        <div class="summary-item">
          <span class="value" style="color:#F56C6C">{{ taskData.overdue }}</span>
          <span class="label">逾期</span>
        </div>
        <div class="summary-item">
          <span class="value" style="color:#E6A23C">{{ taskData.pending }}</span>
          <span class="label">待执行</span>
        </div>
      </div>
      <div class="bridge-task-list">
        <div class="bridge-task" v-for="item in taskData.byBridge" :key="item.name">
          <span class="bridge-name">{{ item.name }}</span>
          <el-progress :percentage="getPercent(item)" :stroke-width="8" :color="getColor(item)" :format="() => item.completed + '/' + item.total" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getInspectionTaskCompletion } from '@/api/inspection'

export default {
  name: 'XunJianRenWu',
  components: { ScreenSubtitle },
  data() {
    return {
      taskData: { total: 0, completed: 0, overdue: 0, pending: 0, byBridge: [] }
    }
  },
  async mounted() {
    const res = await getInspectionTaskCompletion()
    if (res.code === 200) {
      this.taskData = res.data
    }
  },
  methods: {
    getPercent(item) {
      return item.total ? Math.round((item.completed / item.total) * 100) : 0
    },
    getColor(item) {
      const p = this.getPercent(item)
      if (p >= 90) return '#67C23A'
      if (p >= 70) return '#E6A23C'
      return '#F56C6C'
    }
  }
}
</script>

<style lang="scss" scoped>
.xunjian-renwu { width: 490px; }
.content-wrap { padding: 8px 16px; }
.summary-row { display: flex; justify-content: space-around; margin-bottom: 12px; }
.summary-item {
  text-align: center;
  .value { display: block; font-size: 22px; font-weight: 500; color: #edbe75; font-family: 'YJSZ'; line-height: 1.14; }
  .label { font-size: 11px; color: rgba(255,255,255,0.5); }
}
.bridge-task-list { max-height: 220px; overflow-y: auto; }
.bridge-task {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  .bridge-name { width: 90px; font-size: 12px; color: rgba(255,255,255,0.7); flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  ::v-deep .el-progress { flex: 1; .el-progress-bar__outer { background: rgba(41,94,151,0.3); } .el-progress__text { font-size: 11px !important; color: rgba(255,255,255,0.6); } }
}
</style>

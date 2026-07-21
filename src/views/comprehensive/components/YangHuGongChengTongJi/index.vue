<template>
  <div class="yanghu-tongji">
    <ScreenSubtitle name="养护工程统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">项目总数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="color:#67C23A">{{ stats.completed }}</div>
          <div class="stat-label">已完工</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="color:#409EFF">{{ stats.inProgress }}</div>
          <div class="stat-label">进行中</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="color:#E6A23C">{{ stats.planned }}</div>
          <div class="stat-label">待开工</div>
        </div>
      </div>
      <div class="investment-row">
        <span class="label">总投资额：</span>
        <span class="value">{{ stats.totalInvestment }}万元</span>
        <span class="divider">|</span>
        <span class="label">完工率：</span>
        <span class="value">{{ stats.completionRate }}%</span>
      </div>
      <el-progress
        :percentage="stats.completionRate"
        :stroke-width="10"
        color="#67C23A"
        :show-text="false"
      />
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getMaintenanceProjectStats } from '@/api/bridge'

export default {
  name: 'YangHuGongChengTongJi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { total: 0, completed: 0, inProgress: 0, planned: 0, completionRate: 0, totalInvestment: 0 }
    }
  },
  async mounted() {
    const res = await getMaintenanceProjectStats()
    if (res.code === 200) {
      this.stats = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.yanghu-tongji {
  width: 490px;
}

.content-wrap {
  padding: 12px 16px;
}

.stats-grid {
  display: flex;
  justify-content: space-around;
  margin-bottom: 12px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 30px;
  font-weight: 500;
  color: #edbe75;
  font-family: 'YJSZ';
  line-height: 1.14;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.investment-row {
  font-size: 13px;
  margin-bottom: 8px;
  .label { color: rgba(255, 255, 255, 0.5); }
  .value { color: #edbe75; font-weight: 600; font-family: 'YJSZ'; }
  .divider { color: rgba(255, 255, 255, 0.2); margin: 0 12px; }
}

::v-deep .el-progress-bar__outer {
  background: rgba(41, 94, 151, 0.3);
}
</style>

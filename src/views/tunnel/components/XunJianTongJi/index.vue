<template>
  <div class="xunjian-tongji">
    <ScreenSubtitle name="巡检统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="inspection-grid">
        <div class="inspection-card">
          <div class="card-label">计划完成数</div>
          <div class="card-value">{{ stats.planned }}</div>
        </div>
        <div class="inspection-card">
          <div class="card-label">已完成</div>
          <div class="card-value">{{ stats.completed }}</div>
        </div>
        <div class="inspection-card">
          <div class="card-label">逾期数</div>
          <div class="card-value">{{ stats.overdue }}</div>
        </div>
        <div class="inspection-card">
          <div class="card-label">病害发现数</div>
          <div class="card-value">{{ stats.defectFound }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getTunnelInspectionStats } from '@/api/bridge'

export default {
  name: 'XunJianTongJi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { planned: 0, completed: 0, overdue: 0, defectFound: 0 }
    }
  },
  async mounted() {
    const res = await getTunnelInspectionStats()
    if (res.code === 200) {
      this.stats = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.xunjian-tongji {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
}

.inspection-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.inspection-card {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.card-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-bottom: 8px;
}

.card-value {
  color: #edbe75;
  font-size: 28px;
  font-weight: 600;
  font-family: 'YJSZ';
}
</style>

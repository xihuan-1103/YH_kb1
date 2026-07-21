<template>
  <div class="jihua-tongji">
    <ScreenSubtitle name="计划统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="plan-list">
        <div class="plan-item">
          <div class="plan-label">定期巡检执行率</div>
          <div class="plan-value">{{ stats.regularInspection }}%</div>
        </div>
        <div class="plan-item">
          <div class="plan-label">专项巡检执行率</div>
          <div class="plan-value">{{ stats.specialInspection }}%</div>
        </div>
        <div class="plan-item">
          <div class="plan-label">设备巡检执行率</div>
          <div class="plan-value">{{ stats.equipmentInspection }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getTunnelPlanStats } from '@/api/bridge'

export default {
  name: 'JiHuaTongJi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { regularInspection: 0, specialInspection: 0, equipmentInspection: 0 }
    }
  },
  async mounted() {
    const res = await getTunnelPlanStats()
    if (res.code === 200) {
      this.stats = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.jihua-tongji {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
}

.plan-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.plan-value {
  color: #409EFF;
  font-size: 20px;
  font-weight: 600;
  font-family: 'YJSZ';
}
</style>

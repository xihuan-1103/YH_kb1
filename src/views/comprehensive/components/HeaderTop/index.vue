<template>
  <div class="header-top">
    <div class="indicator-group">
      <div class="indicator-item" v-for="item in indicators" :key="item.label">
        <div class="indicator-value">
          <span class="number">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="indicator-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComprehensiveIndicators } from '@/api/bridge'

export default {
  name: 'HeaderTop',
  data() {
    return {
      indicators: [
        { label: '桥梁总数', value: 0, unit: '座' },
        { label: '养护总次数', value: 0, unit: '次' },
        { label: '巡检总次数', value: 0, unit: '次' },
        { label: '病害总数', value: 0, unit: '个' },
        { label: '已处置', value: 0, unit: '个' },
        { label: '待处置', value: 0, unit: '个' }
      ]
    }
  },
  async mounted() {
    const res = await getComprehensiveIndicators()
    if (res.code === 200) {
      const d = res.data
      this.indicators = [
        { label: '桥梁总数', value: d.bridgeTotal, unit: '座' },
        { label: '养护总次数', value: d.maintenanceTotal, unit: '次' },
        { label: '巡检总次数', value: d.inspectionTotal, unit: '次' },
        { label: '病害总数', value: d.defectTotal, unit: '个' },
        { label: '已处置', value: d.defectHandled, unit: '个' },
        { label: '待处置', value: d.defectPending, unit: '个' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header-top {
  padding: 8px 16px;
}

.indicator-group {
  display: flex;
  justify-content: space-around;
  gap: 12px;
}

.indicator-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  background: rgba(8, 32, 68, 0.7);
  border: 1px solid rgba(41, 94, 151, 0.5);
  border-radius: 6px;
  min-width: 110px;
}

.indicator-value {
  .number {
    font-size: 34px;
    font-weight: 500;
    color: #edbe75;
    font-family: 'YJSZ';
    line-height: 1.14;
  }
  .unit {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-left: 4px;
  }
}

.indicator-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}
</style>

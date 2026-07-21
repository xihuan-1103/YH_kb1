<template>
  <div class="jidian-tongji">
    <ScreenSubtitle name="机电统计" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="electromechanical-list">
        <div class="electromechanical-item">
          <div class="item-label">设备数量</div>
          <div class="item-value">{{ stats.equipmentCount }}</div>
        </div>
        <div class="electromechanical-item">
          <div class="item-label">运行年限</div>
          <div class="item-value">{{ stats.operationYears }}年</div>
        </div>
        <div class="electromechanical-item">
          <div class="item-label">故障频次</div>
          <div class="item-value">{{ stats.faultCount }}</div>
        </div>
        <div class="electromechanical-item">
          <div class="item-label">维保率</div>
          <div class="item-value">{{ stats.maintenanceRate }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getTunnelElectromechanicalStats } from '@/api/bridge'

export default {
  name: 'JiDianTongJi',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { equipmentCount: 0, operationYears: 0, faultCount: 0, maintenanceRate: 0 }
    }
  },
  async mounted() {
    const res = await getTunnelElectromechanicalStats()
    if (res.code === 200) {
      this.stats = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.jidian-tongji {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
}

.electromechanical-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.electromechanical-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 10px 16px;
}

.item-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.item-value {
  color: #8dccf5;
  font-size: 18px;
  font-weight: 600;
  font-family: 'YJSZ';
}
</style>

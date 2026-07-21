<template>
  <div class="jiace-gaikuang">
    <ScreenSubtitle name="监测概况" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="monitoring-grid">
        <div class="monitoring-card">
          <div class="card-label">结构监测数据</div>
          <div class="card-value">{{ stats.structureData }}</div>
        </div>
        <div class="monitoring-card">
          <div class="card-label">环境监测数据</div>
          <div class="card-value">{{ stats.environmentData }}</div>
        </div>
        <div class="monitoring-card">
          <div class="card-label">设备监测数据</div>
          <div class="card-value">{{ stats.equipmentData }}</div>
        </div>
        <div class="monitoring-card warning">
          <div class="card-label">预警统计</div>
          <div class="card-value">{{ stats.warningCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getTunnelMonitoringStats } from '@/api/bridge'

export default {
  name: 'JianCeGaiKuang',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { structureData: 0, environmentData: 0, equipmentData: 0, warningCount: 0 }
    }
  },
  async mounted() {
    const res = await getTunnelMonitoringStats()
    if (res.code === 200) {
      this.stats = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.jiace-gaikuang {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
}

.monitoring-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.monitoring-card {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  
  &.warning {
    border-color: #F56C6C;
    .card-label {
      color: #F56C6C;
    }
    .card-value {
      color: #F56C6C;
    }
  }
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

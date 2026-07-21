<template>
  <div class="yanghu-jindu">
    <ScreenSubtitle name="养护进度" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="progress-list">
        <div class="progress-item">
          <div class="progress-label">日常养护完成率</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: stats.dailyComplete + '%', backgroundColor: '#67C23A' }"></div>
          </div>
          <div class="progress-value">{{ stats.dailyComplete }}%</div>
        </div>
        <div class="progress-item">
          <div class="progress-label">专项养护完成率</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: stats.specialComplete + '%', backgroundColor: '#409EFF' }"></div>
          </div>
          <div class="progress-value">{{ stats.specialComplete }}%</div>
        </div>
        <div class="progress-item">
          <div class="progress-label">设备维护完成率</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: stats.equipmentComplete + '%', backgroundColor: '#E6A23C' }"></div>
          </div>
          <div class="progress-value">{{ stats.equipmentComplete }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getTunnelMaintenanceProgress } from '@/api/bridge'

export default {
  name: 'YangHuJinDu',
  components: { ScreenSubtitle },
  data() {
    return {
      stats: { dailyComplete: 0, dailyTotal: 100, specialComplete: 0, specialTotal: 100, equipmentComplete: 0, equipmentTotal: 100 }
    }
  },
  async mounted() {
    const res = await getTunnelMaintenanceProgress()
    if (res.code === 200) {
      this.stats = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.yanghu-jindu {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-label {
  width: 120px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}

.progress-bar-container {
  flex: 1;
  height: 20px;
  background: rgba(8, 32, 68, 0.5);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(41, 94, 151, 0.3);
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.progress-value {
  width: 50px;
  text-align: right;
  color: #8dccf5;
  font-size: 14px;
  font-family: 'YJSZ';
}
</style>

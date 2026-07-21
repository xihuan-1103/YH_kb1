<template>
  <div class="zongti-lukuang-pingding">
    <ScreenSubtitle name="总体路况评定" :showExpirationDate="true" />
    <div class="content-wrap">
      <div class="stats-header">
        <div class="stat-card">
          <div class="stat-label">评定里程</div>
          <div class="stat-value">{{ assessment.totalLength }}<span class="unit">Km</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">优良中率</div>
          <div class="stat-value">{{ assessment.excellentRate }}<span class="unit">%</span></div>
        </div>
      </div>
      
      <div class="progress-list">
        <div class="progress-item">
          <div class="progress-label">优</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: getProgressWidth('优') + '%', backgroundColor: '#67C23A' }"></div>
          </div>
          <div class="progress-value">{{ assessment.excellentLength }}km</div>
        </div>
        <div class="progress-item">
          <div class="progress-label">良</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: getProgressWidth('良') + '%', backgroundColor: '#409EFF' }"></div>
          </div>
          <div class="progress-value">{{ assessment.goodLength }}km</div>
        </div>
        <div class="progress-item">
          <div class="progress-label">中</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: getProgressWidth('中') + '%', backgroundColor: '#E6A23C' }"></div>
          </div>
          <div class="progress-value">{{ assessment.mediumLength }}km</div>
        </div>
        <div class="progress-item">
          <div class="progress-label">次</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: getProgressWidth('次') + '%', backgroundColor: '#F56C6C' }"></div>
          </div>
          <div class="progress-value">{{ assessment.secondaryLength }}km</div>
        </div>
        <div class="progress-item">
          <div class="progress-label">差</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: getProgressWidth('差') + '%', backgroundColor: '#909399' }"></div>
          </div>
          <div class="progress-value">{{ assessment.poorLength }}km</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getRoadConditionAssessment } from '@/api/bridge'

export default {
  name: 'ZongTiLuKuangPingDing',
  components: { ScreenSubtitle },
  data() {
    return {
      assessment: {
        totalLength: 0,
        excellentLength: 0,
        goodLength: 0,
        mediumLength: 0,
        secondaryLength: 0,
        poorLength: 0,
        excellentRate: 0
      }
    }
  },
  async mounted() {
    const res = await getRoadConditionAssessment()
    if (res.code === 200) {
      this.assessment = res.data
    }
  },
  methods: {
    getProgressWidth(type) {
      if (this.assessment.totalLength === 0) return 0
      let length = 0
      switch(type) {
        case '优': length = this.assessment.excellentLength; break
        case '良': length = this.assessment.goodLength; break
        case '中': length = this.assessment.mediumLength; break
        case '次': length = this.assessment.secondaryLength; break
        case '差': length = this.assessment.poorLength; break
      }
      return (length / this.assessment.totalLength) * 100
    }
  }
}
</script>

<style lang="scss" scoped>
.zongti-lukuang-pingding {
  width: 490px;
}

.content-wrap {
  padding: 10px 16px;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.stat-card {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  flex: 1;
  margin: 0 4px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #4a9eff, transparent);
  }
}

.stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-bottom: 4px;
}

.stat-value {
  color: #edbe75;
  font-size: 32px;
  font-weight: 600;
  font-family: 'YJSZ';
  
  .unit {
    font-size: 14px;
    margin-left: 4px;
  }
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-label {
  width: 24px;
  color: #8dccf5;
  font-size: 13px;
  font-weight: 500;
}

.progress-bar-container {
  flex: 1;
  height: 16px;
  background: rgba(8, 32, 68, 0.5);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(41, 94, 151, 0.3);
}

.progress-bar {
  height: 100%;
  border-radius: 8px;
  transition: width 0.5s ease;
}

.progress-value {
  width: 60px;
  text-align: right;
  color: #8dccf5;
  font-size: 12px;
  font-family: 'YJSZ';
}
</style>

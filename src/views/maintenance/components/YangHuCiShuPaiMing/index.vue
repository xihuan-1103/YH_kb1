<template>
  <div class="yanghu-paiming">
    <ScreenSubtitle name="桥梁养护次数排名" />
    <div class="content-wrap">
      <div class="rank-item" v-for="(item, i) in ranking" :key="i">
        <span class="rank-num" :class="{ top: i < 3 }">{{ i + 1 }}</span>
        <span class="rank-name">{{ item.name }}</span>
        <div class="rank-bar-wrap">
          <div class="rank-bar" :style="{ width: barWidth(item.count) + '%' }"></div>
        </div>
        <span class="rank-count">{{ item.count }}次</span>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getMaintenanceRanking } from '@/api/maintenance'

export default {
  name: 'YangHuCiShuPaiMing',
  components: { ScreenSubtitle },
  data() {
    return { ranking: [], maxCount: 1 }
  },
  async mounted() {
    const res = await getMaintenanceRanking()
    if (res.code === 200) {
      this.ranking = res.data
      this.maxCount = Math.max(...res.data.map(i => i.count), 1)
    }
  },
  methods: {
    barWidth(count) {
      return (count / this.maxCount) * 100
    }
  }
}
</script>

<style lang="scss" scoped>
.yanghu-paiming { width: 490px; }
.content-wrap { padding: 8px 16px; }
.rank-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
}
.rank-num {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
  background: rgba(41, 94, 151, 0.3);
  color: rgba(255,255,255,0.6);
  flex-shrink: 0;
  &.top { background: #409EFF; color: #fff; }
}
.rank-name {
  width: 100px;
  flex-shrink: 0;
  color: rgba(255,255,255,0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rank-bar-wrap {
  flex: 1;
  height: 10px;
  background: rgba(41, 94, 151, 0.2);
  border-radius: 5px;
  overflow: hidden;
}
.rank-bar {
  height: 100%;
  background: linear-gradient(90deg, #409EFF, #67C23A);
  border-radius: 5px;
  transition: width 0.6s ease;
}
.rank-count {
  width: 40px;
  text-align: right;
  color: #409EFF;
  font-weight: 600;
  flex-shrink: 0;
}
</style>

<template>
  <div class="quexian-paihang">
    <ScreenSubtitle name="桥梁缺陷数量排行" />
    <div class="content-wrap">
      <div class="rank-item" v-for="(item, i) in ranking" :key="i">
        <span class="rank-num" :class="{ top: i < 3 }">{{ i + 1 }}</span>
        <span class="rank-name">{{ item.name }}</span>
        <div class="rank-bars">
          <div class="bar-segment serious" :style="{ width: segWidth(item.serious) + 'px' }" v-if="item.serious"></div>
          <div class="bar-segment medium" :style="{ width: segWidth(item.medium) + 'px' }" v-if="item.medium"></div>
          <div class="bar-segment minor" :style="{ width: segWidth(item.minor) + 'px' }" v-if="item.minor"></div>
        </div>
        <span class="rank-count">{{ item.total }}</span>
      </div>
      <div class="legend">
        <span class="legend-item"><span class="dot serious"></span>严重</span>
        <span class="legend-item"><span class="dot medium"></span>中等</span>
        <span class="legend-item"><span class="dot minor"></span>轻微</span>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getBridgeDefectRanking } from '@/api/inspection'

export default {
  name: 'QiaoLiangQueXianPaiHang',
  components: { ScreenSubtitle },
  data() {
    return { ranking: [], maxTotal: 1 }
  },
  async mounted() {
    const res = await getBridgeDefectRanking()
    if (res.code === 200) {
      this.ranking = res.data
      this.maxTotal = Math.max(...res.data.map(i => i.total), 1)
    }
  },
  methods: {
    segWidth(count) {
      return Math.max((count / this.maxTotal) * 200, count > 0 ? 4 : 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.quexian-paihang { width: 490px; }
.content-wrap { padding: 8px 16px; }
.rank-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 13px;
}
.rank-num {
  width: 20px; height: 20px; line-height: 20px; text-align: center;
  border-radius: 4px; font-size: 12px;
  background: rgba(41, 94, 151, 0.3); color: rgba(255,255,255,0.6);
  flex-shrink: 0;
  &.top { background: #409EFF; color: #fff; }
}
.rank-name {
  width: 90px; flex-shrink: 0;
  color: rgba(255,255,255,0.8);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.rank-bars {
  flex: 1; display: flex; height: 12px; border-radius: 6px; overflow: hidden;
  background: rgba(41,94,151,0.2);
}
.bar-segment {
  height: 100%;
  transition: width 0.6s ease;
  &.serious { background: #F56C6C; }
  &.medium { background: #E6A23C; }
  &.minor { background: #67C23A; }
}
.rank-count {
  width: 30px; text-align: right; color: #409EFF; font-weight: 600; flex-shrink: 0;
}
.legend {
  display: flex; gap: 16px; justify-content: center; margin-top: 8px;
  .legend-item { font-size: 11px; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 4px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; &.serious { background: #F56C6C; } &.medium { background: #E6A23C; } &.minor { background: #67C23A; } }
}
</style>

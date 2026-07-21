<template>
  <div class="shigong-zhuangtai">
    <ScreenSubtitle name="施工状态" />
    <div class="content-wrap">
      <div class="project-list">
        <div class="project-item" v-for="(p, i) in projects" :key="i">
          <div class="project-header">
            <span class="project-name">{{ p.name }}</span>
            <el-tag :type="statusTagType(p.status)" size="mini">{{ p.status }}</el-tag>
          </div>
          <el-progress :percentage="p.progress" :stroke-width="6" :color="progressColor(p.status)" :show-text="true" />
          <div class="project-info">
            <span>{{ p.bridge }}</span>
            <span>投资：{{ p.investment }}万</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getConstructionProjects } from '@/api/maintenance'

export default {
  name: 'ShiGongZhuangTai',
  components: { ScreenSubtitle },
  data() {
    return { projects: [] }
  },
  async mounted() {
    const res = await getConstructionProjects()
    if (res.code === 200) {
      this.projects = res.data.projects.slice(0, 6)
    }
  },
  methods: {
    statusTagType(status) {
      const map = { '施工中': '', '已完工': 'success', '待开工': 'warning', '已验收': 'info' }
      return map[status] || ''
    },
    progressColor(status) {
      const map = { '施工中': '#409EFF', '已完工': '#67C23A', '待开工': '#E6A23C', '已验收': '#909399' }
      return map[status] || '#409EFF'
    }
  }
}
</script>

<style lang="scss" scoped>
.shigong-zhuangtai { width: 490px; }
.content-wrap { padding: 8px 16px; }
.project-list { max-height: 280px; overflow-y: auto; }
.project-item {
  padding: 8px;
  margin-bottom: 6px;
  background: rgba(8, 32, 68, 0.5);
  border-radius: 4px;
  border: 1px solid rgba(41, 94, 151, 0.2);
}
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.project-name { font-size: 13px; color: #8dccf5; }
.project-info {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  margin-top: 4px;
}
::v-deep .el-progress-bar__outer { background: rgba(41,94,151,0.3); }
</style>

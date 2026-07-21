<template>
  <div class="yidongyidang">
    <ScreenSubtitle name="一洞一档" />
    <div class="content-wrap">
      <div
        class="tunnel-card"
        v-for="tunnel in tunnelList"
        :key="tunnel.id"
        :class="{ active: selectedId === tunnel.id }"
        @click="selectTunnel(tunnel)"
      >
        <div class="card-header">
          <span class="tunnel-name" @click.stop="showDetail(tunnel)">{{ tunnel.name }}</span>
          <span class="health-tag" :class="'health-' + tunnel.healthStatus">{{ tunnel.healthStatus }}</span>
        </div>
        <div class="card-body">
          <span>{{ tunnel.tunnelType }} | {{ tunnel.length }}m</span>
        </div>
        <div class="card-footer">
          <span>洞龄：{{ tunnel.tunnelAge }}年</span>
          <span>病害数：{{ tunnel.defectCount }}</span>
        </div>
      </div>
    </div>

    <ProDialog :visible.sync="detailVisible" :title="''" width="900px">
      <div v-if="detailTunnel && detailData" class="tunnel-detail-dialog">
        <div class="dialog-header">
          <div class="header-decoration left"></div>
          <div class="header-title">一洞一档</div>
          <div class="header-decoration right"></div>
          <div class="close-btn" @click="detailVisible = false">
            <i class="el-icon-close"></i>
          </div>
        </div>

        <div class="basic-info-section">
          <div class="basic-info-grid">
            <div class="info-row">
              <div class="info-item">
                <span class="label">路线编号</span>
                <span class="value">-</span>
              </div>
              <div class="info-item">
                <span class="label">路线名称</span>
                <span class="value">-</span>
              </div>
              <div class="info-item">
                <span class="label">隧道名称</span>
                <span class="value">{{ detailTunnel.name }}</span>
              </div>
              <div class="info-item">
                <span class="label">跨径类型</span>
                <span class="value">{{ detailTunnel.tunnelType }}</span>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">起点桩号</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">隧道总长</div>
                  <div class="sub-value">{{ detailTunnel.length }}m</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">隧道总宽</div>
                  <div class="sub-value">{{ detailTunnel.width }}m</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">跨径组合</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">隧道洞数</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">功能类型</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">中心桩号</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">主洞上部类型</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">管理单位</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">养护单位</div>
                  <div class="sub-value">-</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">建成时间</div>
                  <div class="sub-value">{{ detailTunnel.buildYear }}年</div>
                </div>
              </div>
              <div class="info-item tech-status-card">
                <div class="tech-status-label">技术状况</div>
                <div class="tech-status-value">{{ detailTunnel.healthStatus }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="tabs-section">
          <div class="tabs-header">
            <div
              v-for="tab in tabs"
              :key="tab.key"
              class="tab-item"
              :class="{ active: activeTab === tab.key }"
              @click="activeTab = tab.key"
            >
              {{ tab.label }}
            </div>
          </div>

          <div class="tabs-content">
            <div v-if="activeTab === 'design'" class="tab-panel design-panel">
              <div class="model-container">
                <div class="tunnel-model">
                  <svg viewBox="0 0 400 200" class="tunnel-svg">
                    <g :transform="`translate(0, ${modelOffset})`">
                      <ellipse cx="200" cy="130" rx="150" ry="55" fill="#4a9eff" stroke="#4a9eff" stroke-width="2" />
                      <ellipse cx="200" cy="130" rx="120" ry="40" fill="rgba(8, 32, 68, 0.8)" stroke="#4a9eff" stroke-width="1" />
                      <line x1="50" y1="130" x2="350" y2="130" stroke="#5ab1ff" stroke-width="2" stroke-dasharray="5,3" />
                      <circle cx="200" cy="100" r="8" fill="#4a9eff" opacity="0.7" />
                      <circle cx="120" cy="110" r="6" fill="#4a9eff" opacity="0.5" />
                      <circle cx="280" cy="110" r="6" fill="#4a9eff" opacity="0.5" />
                    </g>
                  </svg>
                </div>
                <div class="design-info">
                  <div class="info-grid">
                    <div class="info-item">
                      <span class="label">设计单位：</span>
                      {{ detailData.basicInfo ? detailData.basicInfo.designUnit : '-' }}
                    </div>
                    <div class="info-item">
                      <span class="label">设计速度：</span>
                      {{ detailData.basicInfo ? detailData.basicInfo.designSpeed : '-' }}
                    </div>
                    <div class="info-item">
                      <span class="label">隧道长度：</span>
                      {{ detailData.basicInfo ? detailData.basicInfo.tunnelLength : '-' }}
                    </div>
                    <div class="info-item">
                      <span class="label">隧道宽度：</span>
                      {{ detailData.basicInfo ? detailData.basicInfo.tunnelWidth : '-' }}
                    </div>
                    <div class="info-item">
                      <span class="label">隧道类型：</span>
                      {{ detailData.basicInfo ? detailData.basicInfo.tunnelType : '-' }}
                    </div>
                    <div class="info-item">
                      <span class="label">建成年份：</span>
                      {{ detailData.basicInfo ? detailData.basicInfo.buildYear : '-' }}
                    </div>
                    <div class="info-item">
                      <span class="label">上次大修：</span>
                      {{ detailData.basicInfo ? detailData.basicInfo.lastOverhaul : '-' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'maintenance'" class="tab-panel">
              <el-table :data="detailData.maintenanceRecords" size="mini" style="width:100%">
                <el-table-column prop="date" label="日期" width="110" />
                <el-table-column prop="type" label="类型" width="90" />
                <el-table-column prop="content" label="内容" />
                <el-table-column prop="status" label="状态" width="80" />
              </el-table>
            </div>

            <div v-else-if="activeTab === 'inspection'" class="tab-panel">
              <div class="inspection-note">
                <span class="note-icon">【说明】</span>经常检查仅展示近五次记录，定期检查为全部记录。
              </div>
              <el-table :data="detailData.inspectionRecords" size="mini" style="width:100%">
                <el-table-column prop="date" label="日期" width="110" />
                <el-table-column prop="type" label="类型" width="90" />
                <el-table-column prop="inspector" label="检查人" width="80" />
                <el-table-column prop="result" label="结果" width="60" />
                <el-table-column prop="score" label="评分" width="60" />
              </el-table>
            </div>

            <div v-else-if="activeTab === 'defect'" class="tab-panel">
              <el-table :data="detailData.defectLibrary" size="mini" style="width:100%">
                <el-table-column prop="id" label="编号" width="60" />
                <el-table-column prop="type" label="类型" width="90" />
                <el-table-column prop="location" label="位置" />
                <el-table-column prop="severity" label="严重程度" width="80" />
                <el-table-column prop="status" label="状态" width="80" />
                <el-table-column prop="date" label="日期" width="110" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </ProDialog>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import ProDialog from '@/components/ProDialog/index.vue'
import { getTunnelList, getTunnelDetail } from '@/api/bridge'

export default {
  name: 'YiDongYiDang',
  components: { ScreenSubtitle, ProDialog },
  data() {
    return {
      tunnelList: [],
      selectedId: null,
      detailVisible: false,
      detailTunnel: null,
      detailData: null,
      activeTab: 'design',
      tabs: [
        { key: 'design', label: '设计资料' },
        { key: 'maintenance', label: '养护记录' },
        { key: 'inspection', label: '检查记录' },
        { key: 'defect', label: '病害记录' }
      ],
      modelOffset: 0,
      modelDirection: 1
    }
  },
  async mounted() {
    const res = await getTunnelList()
    if (res.code === 200) {
      this.tunnelList = res.data
    }
    this.startModelAnimation()
  },
  beforeDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  },
  methods: {
    selectTunnel(tunnel) {
      this.selectedId = tunnel.id
      this.$emit('selectTunnel', tunnel.id)
    },
    async showDetail(tunnel) {
      this.detailTunnel = tunnel
      this.activeTab = 'design'
      const res = await getTunnelDetail(tunnel.id)
      if (res.code === 200) {
        this.detailData = res.data
        this.detailVisible = true
      }
    },
    startModelAnimation() {
      const animate = () => {
        this.modelOffset += this.modelDirection * 0.3
        if (this.modelOffset > 10 || this.modelOffset < -10) {
          this.modelDirection *= -1
        }
        this.animationId = requestAnimationFrame(animate)
      }
      animate()
    }
  }
}
</script>

<style lang="scss" scoped>
.yidongyidang {
  width: 490px;
}

.content-wrap {
  padding: 8px 16px;
  max-height: 380px;
  overflow-y: auto;
}

.tunnel-card {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover,
  &.active {
    border-color: #409EFF;
    background: rgba(64, 158, 255, 0.1);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tunnel-name {
  font-size: 14px;
  font-weight: 600;
  color: #8dccf5;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: rgba(141, 204, 245, 0.4);
  text-underline-offset: 3px;
  &:hover { color: #409EFF; }
}

.health-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 3px;
  &.health-优秀 { background: #67C23A; color: #fff; }
  &.health-良好 { background: #409EFF; color: #fff; }
  &.health-一般 { background: #E6A23C; color: #fff; }
  &.health-较差 { background: #F56C6C; color: #fff; }
}

.card-body {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

.tunnel-detail-dialog {
  background: #0a2044;
  border: 1px solid #295e97;
  border-radius: 8px;
  margin: -20px;
  padding: 20px;
  min-height: 600px;
}

.dialog-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: 40px;
}

.header-decoration {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  height: 30px;
  background: linear-gradient(90deg, transparent, #4a9eff, transparent);
  clip-path: polygon(0 50%, 30% 0, 100% 0, 100% 100%, 30% 100%);

  &.left {
    left: 0;
    transform: translateY(-50%) scaleX(-1);
  }
  &.right {
    right: 0;
  }
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  color: #8dccf5;
  z-index: 1;
}

.close-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8dccf5;
  font-size: 20px;
  transition: color 0.3s;
  &:hover {
    color: #409EFF;
  }
}

.basic-info-section {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.basic-info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.info-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
  }
  .value {
    color: #8dccf5;
    font-size: 13px;
  }
  
  > i {
    color: #4a9eff;
    font-size: 24px;
  }
  
  .text {
    .sub-label {
      color: rgba(255, 255, 255, 0.5);
      font-size: 11px;
    }
    .sub-value {
      color: #8dccf5;
      font-size: 13px;
    }
  }
}

.tech-status-card {
  background: linear-gradient(135deg, #4a9eff, #295e97);
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  
  .tech-status-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
  }
  .tech-status-value {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    font-family: 'YJSZ';
  }
}

.tabs-section {
  background: rgba(8, 32, 68, 0.5);
  border: 1px solid rgba(41, 94, 151, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: rgba(64, 158, 255, 0.1);
  border-bottom: 2px solid #4a9eff;
}

.tab-item {
  flex: 1;
  padding: 12px 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;

  &:hover {
    color: #8dccf5;
  }

  &.active {
    color: #4a9eff;
    background: rgba(74, 158, 255, 0.15);
    border-bottom-color: #4a9eff;
  }
}

.tabs-content {
  padding: 16px;
  min-height: 250px;
}

.tab-panel {
  ::v-deep .el-table {
    background: transparent;
    color: #fff;
    &::before { background-color: #295e97; }
    th { background: rgba(8, 32, 68, 0.7); color: #8dccf5; border-color: #295e97; }
    td { background: transparent; border-color: rgba(41, 94, 151, 0.3); }
    tr:hover td { background: rgba(64, 158, 255, 0.1); }
  }
}

.inspection-note {
  background: rgba(64, 158, 255, 0.1);
  border: 1px solid #4a9eff;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  
  .note-icon {
    color: #4a9eff;
    font-weight: 600;
  }
}

.design-panel {
  .model-container {
    display: flex;
    gap: 20px;
  }
  
  .tunnel-model {
    flex: 1;
    background: rgba(8, 32, 68, 0.3);
    border: 1px solid rgba(41, 94, 151, 0.3);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tunnel-svg {
    width: 100%;
    height: 200px;
  }
  
  .design-info {
    flex: 1;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  
  .info-item {
    font-size: 13px;
    .label {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>

<template>
  <div class="yiqiaoyidang">
    <ScreenSubtitle name="一桥一档" />
    <div class="content-wrap">
      <div
        class="bridge-card"
        v-for="bridge in bridgeList"
        :key="bridge.id"
        :class="{ active: selectedId === bridge.id }"
        @click="selectBridge(bridge)"
      >
        <div class="card-header">
          <span class="bridge-name" @click.stop="showDetail(bridge)">{{ bridge.name }}</span>
          <span class="health-tag" :class="'health-' + bridge.healthStatus">{{ bridge.healthStatus }}</span>
        </div>
        <div class="card-body">
          <span>{{ bridge.bridgeType }} | {{ bridge.structureType }}</span>
        </div>
        <div class="card-footer">
          <span>养护类别：{{ bridge.maintenanceCategory }}</span>
          <span>桥龄：{{ bridge.bridgeAge }}年</span>
        </div>
      </div>
    </div>

    <!-- 桥梁详情弹窗 -->
    <ProDialog :visible.sync="detailVisible" :title="''" width="900px">
      <div v-if="detailBridge && detailData" class="bridge-detail-dialog">
        <!-- 顶部标题栏 -->
        <div class="dialog-header">
          <div class="header-decoration left"></div>
          <div class="header-title">一桥一档</div>
          <div class="header-decoration right"></div>
          <div class="close-btn" @click="detailVisible = false">
            <i class="el-icon-close"></i>
          </div>
        </div>

        <!-- 上部：桥梁基本信息 -->
        <div class="basic-info-section">
          <div class="basic-info-grid">
            <div class="info-row">
              <div class="info-item">
                <span class="label">路线编号</span>
                <span class="value">G25</span>
              </div>
              <div class="info-item">
                <span class="label">路线名称</span>
                <span class="value">长深高速</span>
              </div>
              <div class="info-item">
                <span class="label">桥梁名称</span>
                <span class="value">{{ detailBridge.name }}</span>
              </div>
              <div class="info-item">
                <span class="label">跨径类型</span>
                <span class="value">{{ detailBridge.span }}</span>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">起点</div>
                  <div class="sub-value">{{ Math.floor(Math.random() * 100 + 100) }}km</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">桥梁总长</div>
                  <div class="sub-value">{{ detailBridge.length }}m</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">桥梁总宽</div>
                  <div class="sub-value">{{ detailBridge.width }}m</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">跨径组合</div>
                  <div class="sub-value">{{ detailBridge.span }}</div>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">桥梁跨数</div>
                  <div class="sub-value">{{ detailBridge.span.split('×').length }}</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">功能类型</div>
                  <div class="sub-value">{{ detailBridge.bridgeType }}</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">中心桩号</div>
                  <div class="sub-value">{{ Math.floor(Math.random() * 100 + 100) }}km</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">主桥上部类型</div>
                  <div class="sub-value">{{ detailBridge.structureType }}</div>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">管理单位</div>
                  <div class="sub-value">丽水市公路管理局</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">养护单位</div>
                  <div class="sub-value">丽水市养护中心</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">建成时间</div>
                  <div class="sub-value">{{ detailBridge.buildYear }}年</div>
                </div>
              </div>
              <div class="info-item tech-status-card">
                <div class="tech-status-label">技术状况</div>
                <div class="tech-status-value">{{ Math.floor(Math.random() * 5 + 1) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 下部：标签页 -->
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
            <!-- 设计资料 -->
            <div v-if="activeTab === 'design'" class="tab-panel design-panel">
              <div class="model-container">
                <div class="bridge-model">
                  <svg viewBox="0 0 400 200" class="bridge-svg">
                    <g :transform="`translate(0, ${modelOffset})`">
                      <rect x="20" y="140" width="360" height="10" fill="#4a9eff" />
                      <rect x="40" y="150" width="20" height="40" fill="#3a7ecf" />
                      <rect x="120" y="150" width="20" height="40" fill="#3a7ecf" />
                      <rect x="260" y="150" width="20" height="40" fill="#3a7ecf" />
                      <rect x="340" y="150" width="20" height="40" fill="#3a7ecf" />
                      <line x1="40" y1="140" x2="40" y2="100" stroke="#5ab1ff" stroke-width="2" />
                      <line x1="120" y1="140" x2="120" y2="100" stroke="#5ab1ff" stroke-width="2" />
                      <line x1="260" y1="140" x2="260" y2="100" stroke="#5ab1ff" stroke-width="2" />
                      <line x1="340" y1="140" x2="340" y2="100" stroke="#5ab1ff" stroke-width="2" />
                      <path d="M 40 100 Q 80 60 120 100" stroke="#5ab1ff" stroke-width="2" fill="none" />
                      <path d="M 120 100 Q 190 50 260 100" stroke="#5ab1ff" stroke-width="2" fill="none" />
                      <path d="M 260 100 Q 300 60 340 100" stroke="#5ab1ff" stroke-width="2" fill="none" />
                      <circle cx="200" cy="80" r="5" fill="#4a9eff" />
                      <circle cx="80" cy="85" r="4" fill="#4a9eff" />
                      <circle cx="190" cy="70" r="6" fill="#4a9eff" />
                      <circle cx="300" cy="85" r="4" fill="#4a9eff" />
                    </g>
                  </svg>
                </div>
                <div class="design-info">
                  <div class="info-grid">
                    <div class="info-item"><span class="label">设计单位：</span>{{ detailData.designInfo.designUnit }}</div>
                    <div class="info-item"><span class="label">设计荷载：</span>{{ detailData.designInfo.designLoad }}</div>
                    <div class="info-item"><span class="label">抗震等级：</span>{{ detailData.designInfo.seismicGrade }}</div>
                    <div class="info-item"><span class="label">桥长：</span>{{ detailBridge.length }}m</div>
                    <div class="info-item"><span class="label">桥宽：</span>{{ detailBridge.width }}m</div>
                    <div class="info-item"><span class="label">跨径：</span>{{ detailBridge.span }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 养护记录 -->
            <div v-else-if="activeTab === 'maintenance'" class="tab-panel">
              <el-table :data="detailData.maintenanceRecords" size="mini" style="width:100%">
                <el-table-column prop="date" label="日期" width="110" />
                <el-table-column prop="type" label="类型" width="90" />
                <el-table-column prop="content" label="内容" />
                <el-table-column prop="status" label="状态" width="80" />
              </el-table>
            </div>

            <!-- 检查记录 -->
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

            <!-- 病害记录 -->
            <div v-else-if="activeTab === 'defect'" class="tab-panel">
              <el-table :data="detailData.defectRecords" size="mini" style="width:100%">
                <el-table-column prop="type" label="类型" width="90" />
                <el-table-column prop="location" label="位置" />
                <el-table-column prop="severity" label="严重程度" width="80" />
                <el-table-column prop="status" label="状态" width="80" />
                <el-table-column prop="date" label="发现日期" width="110" />
              </el-table>
            </div>

            <!-- 监测信息 -->
            <div v-else-if="activeTab === 'monitor'" class="tab-panel">
              <div class="info-grid">
                <div class="info-item"><span class="label">监测状态：</span>{{ detailData.monitoringInfo.hasMonitor ? '已布设' : '未布设' }}</div>
                <div class="info-item"><span class="label">传感器数量：</span>{{ detailData.monitoringInfo.sensorCount }}个</div>
                <div class="info-item"><span class="label">最新数据：</span>{{ detailData.monitoringInfo.lastDataTime }}</div>
              </div>
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
import { getBridgeList, getBridgeDetail } from '@/api/bridge'

export default {
  name: 'YiQiaoYiDang',
  components: { ScreenSubtitle, ProDialog },
  data() {
    return {
      bridgeList: [],
      selectedId: null,
      detailVisible: false,
      detailBridge: null,
      detailData: null,
      activeTab: 'design',
      tabs: [
        { key: 'design', label: '设计资料' },
        { key: 'maintenance', label: '养护记录' },
        { key: 'inspection', label: '检查记录' },
        { key: 'defect', label: '病害记录' },
        { key: 'monitor', label: '监测信息' }
      ],
      modelOffset: 0,
      modelDirection: 1
    }
  },
  async mounted() {
    const res = await getBridgeList()
    if (res.code === 200) {
      this.bridgeList = res.data
    }
    this.startModelAnimation()
  },
  beforeDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  },
  methods: {
    selectBridge(bridge) {
      this.selectedId = bridge.id
      this.$emit('selectBridge', bridge.id)
    },
    async showDetail(bridge) {
      this.detailBridge = bridge
      this.activeTab = 'design'
      const res = await getBridgeDetail(bridge.id)
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
.yiqiaoyidang {
  width: 490px;
}

.content-wrap {
  padding: 8px 16px;
  max-height: 380px;
  overflow-y: auto;
}

.bridge-card {
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

.bridge-name {
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

.bridge-detail-dialog {
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
  
  .bridge-model {
    flex: 1;
    background: rgba(8, 32, 68, 0.3);
    border: 1px solid rgba(41, 94, 151, 0.3);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bridge-svg {
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
</style>

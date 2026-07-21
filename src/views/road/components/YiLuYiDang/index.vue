<template>
  <div class="yiluyidang">
    <ScreenSubtitle name="一路一档" />
    <div class="content-wrap">
      <div
        class="road-card"
        v-for="road in roadList"
        :key="road.id"
        :class="{ active: selectedId === road.id }"
        @click="selectRoad(road)"
      >
        <div class="card-header">
          <span class="road-name" @click.stop="showDetail(road)">{{ road.name }}</span>
          <span class="condition-tag" :class="'condition-' + road.conditionStatus">{{ road.conditionStatus }}</span>
        </div>
        <div class="card-body">
          <span>{{ road.roadType }} | {{ road.pavementType }}</span>
        </div>
        <div class="card-footer">
          <span>养护类别：{{ road.maintenanceCategory }}</span>
          <span>路龄：{{ road.roadAge }}年</span>
        </div>
      </div>
    </div>

    <!-- 路面详情弹窗 -->
    <ProDialog :visible.sync="detailVisible" :title="''" width="900px">
      <div v-if="detailRoad && detailData" class="road-detail-dialog">
        <div class="dialog-header">
          <div class="header-decoration left"></div>
          <div class="header-title">一路一档</div>
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
                <span class="value">G25</span>
              </div>
              <div class="info-item">
                <span class="label">路线名称</span>
                <span class="value">{{ detailRoad.name }}</span>
              </div>
              <div class="info-item">
                <span class="label">路面类型</span>
                <span class="value">{{ detailRoad.roadType }}</span>
              </div>
              <div class="info-item">
                <span class="label">铺装类型</span>
                <span class="value">{{ detailRoad.pavementType }}</span>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">起点桩号</div>
                  <div class="sub-value">{{ Math.floor(Math.random() * 100 + 50) }}km</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">路线总长</div>
                  <div class="sub-value">{{ detailRoad.length }}km</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">路面宽度</div>
                  <div class="sub-value">{{ detailRoad.width }}m</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">车道数</div>
                  <div class="sub-value">{{ detailRoad.lanes }}车道</div>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">设计速度</div>
                  <div class="sub-value">{{ detailData.basicInfo.designSpeed }}</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">设计荷载</div>
                  <div class="sub-value">{{ detailData.basicInfo.designLoad }}</div>
                </div>
              </div>
              <div class="info-item">
                <i class="el-icon-location-outline"></i>
                <div class="text">
                  <div class="sub-label">建成时间</div>
                  <div class="sub-value">{{ detailRoad.buildYear }}年</div>
                </div>
              </div>
              <div class="info-item condition-status-card">
                <div class="condition-status-label">技术状况</div>
                <div class="condition-status-value">{{ Math.floor(Math.random() * 5 + 1) }}</div>
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
            <div v-if="activeTab === 'basic'" class="tab-panel">
              <div class="info-grid">
                <div class="info-item"><span class="label">设计单位：</span>{{ detailData.basicInfo.designUnit }}</div>
                <div class="info-item"><span class="label">设计速度：</span>{{ detailData.basicInfo.designSpeed }}</div>
                <div class="info-item"><span class="label">设计荷载：</span>{{ detailData.basicInfo.designLoad }}</div>
                <div class="info-item"><span class="label">路线长度：</span>{{ detailData.basicInfo.roadLength }}</div>
                <div class="info-item"><span class="label">路面宽度：</span>{{ detailData.basicInfo.roadWidth }}</div>
                <div class="info-item"><span class="label">车道数：</span>{{ detailData.basicInfo.lanes }}</div>
                <div class="info-item"><span class="label">铺装类型：</span>{{ detailData.basicInfo.pavementType }}</div>
                <div class="info-item"><span class="label">最后大修：</span>{{ detailData.basicInfo.lastOverhaul }}年</div>
              </div>
            </div>

            <div v-else-if="activeTab === 'construction'" class="tab-panel">
              <el-table :data="detailData.constructionRecords" size="small" style="width: 100%">
                <el-table-column prop="date" label="日期" width="110" />
                <el-table-column prop="type" label="类型" width="100" />
                <el-table-column prop="content" label="内容" />
                <el-table-column prop="status" label="状态" width="80" />
              </el-table>
            </div>

            <div v-else-if="activeTab === 'inspection'" class="tab-panel">
              <el-table :data="detailData.inspectionRecords" size="small" style="width: 100%">
                <el-table-column prop="date" label="日期" width="110" />
                <el-table-column prop="type" label="类型" width="100" />
                <el-table-column prop="inspector" label="检测人" width="80" />
                <el-table-column prop="result" label="结果" width="80" />
                <el-table-column prop="score" label="评分" width="60" />
              </el-table>
            </div>

            <div v-else-if="activeTab === 'defect'" class="tab-panel">
              <el-table :data="detailData.defectLibrary" size="small" style="width: 100%">
                <el-table-column prop="id" label="编号" width="80" />
                <el-table-column prop="type" label="病害类型" width="100" />
                <el-table-column prop="location" label="位置" />
                <el-table-column prop="severity" label="严重程度" width="80" />
                <el-table-column prop="status" label="状态" width="80" />
                <el-table-column prop="date" label="发现日期" width="110" />
              </el-table>
            </div>

            <div v-else-if="activeTab === 'maintenance'" class="tab-panel">
              <el-table :data="detailData.maintenanceRecords" size="small" style="width: 100%">
                <el-table-column prop="date" label="日期" width="110" />
                <el-table-column prop="type" label="类型" width="100" />
                <el-table-column prop="content" label="内容" />
                <el-table-column prop="status" label="状态" width="80" />
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
import { getRoadList, getRoadDetail } from '@/api/bridge'

export default {
  name: 'YiLuYiDang',
  components: { ScreenSubtitle, ProDialog },
  data() {
    return {
      roadList: [],
      selectedId: null,
      detailVisible: false,
      detailRoad: null,
      detailData: null,
      activeTab: 'basic',
      tabs: [
        { key: 'basic', label: '基本信息' },
        { key: 'construction', label: '建设记录' },
        { key: 'inspection', label: '检测记录' },
        { key: 'defect', label: '病害库' },
        { key: 'maintenance', label: '养护记录' }
      ]
    }
  },
  async mounted() {
    const res = await getRoadList()
    if (res.code === 200) {
      this.roadList = res.data
    }
  },
  methods: {
    selectRoad(road) {
      this.selectedId = road.id
      this.$emit('selectRoad', road.id)
    },
    async showDetail(road) {
      this.detailRoad = road
      this.activeTab = 'basic'
      const res = await getRoadDetail(road.id)
      if (res.code === 200) {
        this.detailData = res.data
        this.detailVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.yiluyidang {
  width: 490px;
}

.content-wrap {
  padding: 8px 16px;
  max-height: 380px;
  overflow-y: auto;
}

.road-card {
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

.road-name {
  font-size: 14px;
  font-weight: 600;
  color: #8dccf5;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: rgba(141, 204, 245, 0.4);
  text-underline-offset: 3px;
  &:hover { color: #409EFF; }
}

.condition-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 3px;
  &.condition-优秀 { background: #67C23A; color: #fff; }
  &.condition-良好 { background: #409EFF; color: #fff; }
  &.condition-一般 { background: #E6A23C; color: #fff; }
  &.condition-较差 { background: #F56C6C; color: #fff; }
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

.road-detail-dialog {
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

.condition-status-card {
  background: linear-gradient(135deg, #4a9eff, #295e97);
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  
  .condition-status-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
  }
  .condition-status-value {
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
  min-height: 200px;
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

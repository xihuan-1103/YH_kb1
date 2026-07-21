<template>
  <div class="map-container" id="roadMap">
    <div class="search-panel">
      <el-input
        v-model="keyword"
        placeholder="搜索路面名称"
        prefix-icon="el-icon-search"
        size="small"
        clearable
        @input="handleSearch"
      />
      <el-select v-model="filterType" placeholder="路面类型" size="small" clearable @change="handleFilter">
        <el-option label="高速公路" value="高速公路" />
        <el-option label="国道" value="国道" />
        <el-option label="省道" value="省道" />
      </el-select>
    </div>
    <div class="road-info-panel" v-if="selectedRoad">
      <div class="info-header">
        <span class="road-name">{{ selectedRoad.name }}</span>
        <span class="condition-tag" :class="'condition-' + selectedRoad.conditionStatus">{{ selectedRoad.conditionStatus }}</span>
      </div>
      <div class="info-row">
        <span>类型：{{ selectedRoad.roadType }}</span>
        <span>路龄：{{ selectedRoad.roadAge }}年</span>
      </div>
      <div class="info-row">
        <span>长度：{{ selectedRoad.length }}km</span>
        <span>宽度：{{ selectedRoad.width }}m</span>
      </div>
      <div class="info-row">
        <span>养护类别：{{ selectedRoad.maintenanceCategory }}</span>
        <span>病害数：{{ selectedRoad.defectCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { getRoadList } from '@/api/bridge'

export default {
  name: 'LuMianDiTu',
  data() {
    return {
      map: null,
      keyword: '',
      filterType: '',
      roadList: [],
      selectedRoad: null,
      markers: []
    }
  },
  async mounted() {
    await this.loadRoadData()
    this.initMap()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  },
  methods: {
    async loadRoadData() {
      const res = await getRoadList()
      if (res.code === 200) {
        this.roadList = res.data
      }
    },
    initMap() {
      this.map = new maplibregl.Map({
        container: 'roadMap',
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm'
            }
          ]
        },
        center: [119.92, 28.45],
        zoom: 8,
        attributionControl: false
      })

      this.map.on('load', () => {
        this.addRoadMarkers()
      })
    },
    addRoadMarkers() {
      this.clearMarkers()

      const roads = this.getFilteredRoads()
      roads.forEach(road => {
        const el = document.createElement('div')
        el.className = 'road-marker'
        el.style.cssText = 'width:20px;height:20px;background:#409EFF;border:2px solid #fff;border-radius:4px;cursor:pointer;transform:rotate(45deg);'

        if (road.conditionStatus === '较差') {
          el.style.background = '#F56C6C'
        } else if (road.conditionStatus === '一般') {
          el.style.background = '#E6A23C'
        }

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([road.lng, road.lat])
          .addTo(this.map)

        el.addEventListener('click', () => {
          this.selectedRoad = road
          this.map.flyTo({ center: [road.lng, road.lat], zoom: 12 })
        })

        this.markers.push(marker)
      })
    },
    clearMarkers() {
      this.markers.forEach(m => m.remove())
      this.markers = []
    },
    getFilteredRoads() {
      let list = this.roadList
      if (this.keyword) {
        list = list.filter(r => r.name.includes(this.keyword))
      }
      if (this.filterType) {
        list = list.filter(r => r.roadType === this.filterType)
      }
      return list
    },
    handleSearch() {
      this.addRoadMarkers()
    },
    handleFilter() {
      this.addRoadMarkers()
    },
    focusRoad(id) {
      const road = this.roadList.find(r => r.id === id)
      if (road && this.map) {
        this.selectedRoad = road
        this.map.flyTo({ center: [road.lng, road.lat], zoom: 13 })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 1920px;
  height: 1080px;
  position: relative;
}

.search-panel {
  position: absolute;
  top: 220px;
  left: 563px;
  z-index: 10;
  display: flex;
  gap: 8px;

  ::v-deep .el-input {
    width: 200px;
    .el-input__inner {
      background: rgba(8, 32, 68, 0.85);
      border: 1px solid #295e97;
      color: #fff;
    }
  }

  ::v-deep .el-select {
    width: 140px;
    .el-input__inner {
      background: rgba(8, 32, 68, 0.85);
      border: 1px solid #295e97;
      color: #fff;
    }
  }
}

.road-info-panel {
  position: absolute;
  bottom: 356px;
  left: 540px;
  z-index: 10;
  background: rgba(8, 32, 68, 0.9);
  border: 1px solid #295e97;
  border-radius: 8px;
  padding: 16px;
  min-width: 320px;
  color: #fff;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.road-name {
  font-size: 16px;
  font-weight: 600;
  color: #8dccf5;
}

.condition-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  &.condition-优秀 { background: #67C23A; }
  &.condition-良好 { background: #409EFF; }
  &.condition-一般 { background: #E6A23C; }
  &.condition-较差 { background: #F56C6C; }
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}
</style>

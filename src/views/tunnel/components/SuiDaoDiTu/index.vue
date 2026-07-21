<template>
  <div class="map-container" id="tunnelMap">
    <div class="search-panel">
      <el-input
        v-model="keyword"
        placeholder="搜索隧道名称"
        prefix-icon="el-icon-search"
        size="small"
        clearable
        @input="handleSearch"
      />
      <el-select v-model="filterType" placeholder="隧道类型" size="small" clearable @change="handleFilter">
        <el-option label="单洞" value="单洞" />
        <el-option label="双洞" value="双洞" />
      </el-select>
    </div>
    <div class="tunnel-info-panel" v-if="selectedTunnel">
      <div class="info-header">
        <span class="tunnel-name">{{ selectedTunnel.name }}</span>
        <span class="health-tag" :class="'health-' + selectedTunnel.healthStatus">{{ selectedTunnel.healthStatus }}</span>
      </div>
      <div class="info-row">
        <span>类型：{{ selectedTunnel.tunnelType }}</span>
        <span>洞龄：{{ selectedTunnel.tunnelAge }}年</span>
      </div>
      <div class="info-row">
        <span>长度：{{ selectedTunnel.length }}m</span>
        <span>宽度：{{ selectedTunnel.width }}m</span>
      </div>
      <div class="info-row">
        <span>病害数：{{ selectedTunnel.defectCount }}</span>
        <span>养护数：{{ selectedTunnel.maintenanceCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { getTunnelList } from '@/api/bridge'

export default {
  name: 'SuiDaoDiTu',
  data() {
    return {
      map: null,
      keyword: '',
      filterType: '',
      tunnelList: [],
      selectedTunnel: null,
      markers: []
    }
  },
  async mounted() {
    await this.loadTunnelData()
    this.initMap()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
    }
  },
  methods: {
    async loadTunnelData() {
      const res = await getTunnelList()
      if (res.code === 200) {
        this.tunnelList = res.data
      }
    },
    initMap() {
      this.map = new maplibregl.Map({
        container: 'tunnelMap',
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
        center: [119.82, 28.60],
        zoom: 8,
        attributionControl: false
      })

      this.map.on('load', () => {
        this.addTunnelMarkers()
      })
    },
    addTunnelMarkers() {
      this.clearMarkers()

      const tunnels = this.getFilteredTunnels()
      tunnels.forEach(tunnel => {
        const el = document.createElement('div')
        el.className = 'tunnel-marker'
        el.style.cssText = 'width:18px;height:24px;background:#909399;border:2px solid #fff;border-radius:4px 4px 0 0;cursor:pointer;'

        if (tunnel.healthStatus === '较差') {
          el.style.background = '#F56C6C'
        } else if (tunnel.healthStatus === '一般') {
          el.style.background = '#E6A23C'
        } else if (tunnel.healthStatus === '良好') {
          el.style.background = '#409EFF'
        } else if (tunnel.healthStatus === '优秀') {
          el.style.background = '#67C23A'
        }

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([tunnel.lng, tunnel.lat])
          .addTo(this.map)

        el.addEventListener('click', () => {
          this.selectedTunnel = tunnel
          this.map.flyTo({ center: [tunnel.lng, tunnel.lat], zoom: 12 })
        })

        this.markers.push(marker)
      })
    },
    clearMarkers() {
      this.markers.forEach(m => m.remove())
      this.markers = []
    },
    getFilteredTunnels() {
      let list = this.tunnelList
      if (this.keyword) {
        list = list.filter(t => t.name.includes(this.keyword))
      }
      if (this.filterType) {
        list = list.filter(t => t.tunnelType === this.filterType)
      }
      return list
    },
    handleSearch() {
      this.addTunnelMarkers()
    },
    handleFilter() {
      this.addTunnelMarkers()
    },
    focusTunnel(id) {
      const tunnel = this.tunnelList.find(t => t.id === id)
      if (tunnel && this.map) {
        this.selectedTunnel = tunnel
        this.map.flyTo({ center: [tunnel.lng, tunnel.lat], zoom: 13 })
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

.tunnel-info-panel {
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

.tunnel-name {
  font-size: 16px;
  font-weight: 600;
  color: #8dccf5;
}

.health-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  &.health-优秀 { background: #67C23A; }
  &.health-良好 { background: #409EFF; }
  &.health-一般 { background: #E6A23C; }
  &.health-较差 { background: #F56C6C; }
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}
</style>

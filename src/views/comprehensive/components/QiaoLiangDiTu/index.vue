<template>
  <div class="map-wrapper">
    <!-- Map Container -->
    <div class="map-container" ref="mapContainer"></div>

    <!-- Map Type Legend -->
    <div class="map-legend">
      <div class="legend-title">图例说明</div>
      <div class="legend-item">
        <span class="legend-dot project-dot"></span>
        <span class="legend-text">项目所在</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot office-dot"></span>
        <span class="legend-text">项目部地址</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot site-dot"></span>
        <span class="legend-text">施工点位</span>
      </div>
    </div>

    <!-- Map Control Selector Panel (Floating Right - Pill Buttons) -->
    <div class="map-controls-panel pill-style-panel">
      <div class="pill-group">
        <div 
          v-for="item in typeOptions" 
          :key="item.value"
          class="map-pill-btn"
          :class="{ active: currentActiveType === item.value }"
          @click="selectDistributionType(item.value)"
        >
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Detail Info Panel for selected point -->
    <div class="point-info-panel animate-panel" v-if="selectedPoint">
      <div class="info-header">
        <span class="point-name">{{ selectedPoint.name }}</span>
        <span class="type-tag" :class="selectedPoint.type">{{ getTypeText(selectedPoint.type) }}</span>
      </div>
      <div class="info-body">
        <div class="info-row">
          <span class="label">所属法人：</span>
          <span class="value">{{ selectedPoint.company }}</span>
        </div>
        <div class="info-row">
          <span class="label">所属区域：</span>
          <span class="value">{{ selectedPoint.region }}</span>
        </div>
        <div class="info-row">
          <span class="label">运行状态：</span>
          <span class="value state-badge" :class="selectedPoint.status">{{ selectedPoint.status }}</span>
        </div>
        <div class="info-row">
          <span class="label">项目经理：</span>
          <span class="value">{{ selectedPoint.contact }} | {{ selectedPoint.phone }}</span>
        </div>
        <div class="info-row">
          <span class="label">地理位置：</span>
          <span class="value address">{{ selectedPoint.address }}</span>
        </div>
      </div>
      <div class="info-footer">
        <el-button type="primary" size="mini" icon="el-icon-position" @click="flyToPoint(selectedPoint)">定位追踪</el-button>
        <el-button type="text" size="mini" @click="selectedPoint = null" style="color: rgba(255,255,255,0.6)">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default {
  name: 'QiaoLiangDiTu',
  props: {
    // Search filter parameters from bottom layout (Arrays for checkbox multi-selection)
    filterCompanies: {
      type: Array,
      default: () => []
    },
    filterRegions: {
      type: Array,
      default: () => []
    },
    filterYears: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: null,
      selectedPoint: null,
      markers: [],
      mapPoints: [
        {
          id: 1,
          name: '浙江丽水莲都公路生命安全防护养护项目',
          type: 'project',
          company: '交工沪杭甬',
          region: '丽水区域中心',
          year: '2026',
          lng: 119.92,
          lat: 28.45,
          status: '正常施工',
          contact: '张建国',
          phone: '138****8811',
          address: '丽水市莲都区丽阳街852号'
        },
        {
          id: 2,
          name: '缙云县畅达公路大中修工程项目部',
          type: 'office',
          company: '顺畅养护',
          region: '丽水区域中心',
          year: '2026',
          lng: 120.06,
          lat: 28.66,
          status: '日常办公',
          contact: '李强',
          phone: '139****1234',
          address: '丽水市缙云县五云街道仙都路18号'
        },
        {
          id: 3,
          name: '龙泉G235国道边坡病害应急抢修施工点',
          type: 'site',
          company: '交工养护',
          region: '丽水区域中心',
          year: '2026',
          lng: 119.14,
          lat: 28.07,
          status: '紧张作业',
          contact: '王战成',
          phone: '135****4455',
          address: '龙泉市城北乡外双溪村'
        },
        {
          id: 4,
          name: '遂昌红星大桥加固改造工程项目部',
          type: 'office',
          company: '交工沪杭甬',
          region: '丽水区域中心',
          year: '2025',
          lng: 119.27,
          lat: 28.59,
          status: '日常办公',
          contact: '赵本胜',
          phone: '137****9900',
          address: '遂昌县妙高街道君子路152号'
        },
        {
          id: 5,
          name: '云和湖环湖路预防性保护养护标段',
          type: 'project',
          company: '交工养护',
          region: '丽水区域中心',
          year: '2026',
          lng: 119.57,
          lat: 28.11,
          status: '正常施工',
          contact: '陈永健',
          phone: '136****5566',
          address: '云和县石塘镇环湖路3号'
        },
        {
          id: 6,
          name: '景宁红星隧道高低压配电系统技改施工点',
          type: 'site',
          company: '顺畅养护',
          region: '丽水区域中心',
          year: '2025',
          lng: 119.64,
          lat: 27.97,
          status: '断道作业',
          contact: '徐卫东',
          phone: '188****7788',
          address: '景宁县红星街道外舍村'
        },
        {
          id: 7,
          name: '安徽黄山休宁路段沥青路面中修工程项目',
          type: 'project',
          company: '交工沪杭甬',
          region: '杭州区域中心',
          year: '2026',
          lng: 118.18,
          lat: 29.78,
          status: '设备进场',
          contact: '周立波',
          phone: '182****1122',
          address: '安徽省黄山市休宁县海阳镇'
        },
        {
          id: 8,
          name: '江西鹰潭信江特大桥维修改造工程项目部',
          type: 'office',
          company: '交工养护',
          region: '金衢区域中心',
          year: '2024',
          lng: 117.02,
          lat: 28.23,
          status: '日常办公',
          contact: '钱树人',
          phone: '186****3344',
          address: '江西省鹰潭市信江新区滨江路'
        },
        {
          id: 9,
          name: '江苏无锡312国道夜间微表处摊铺施工点',
          type: 'site',
          company: '顺畅养护',
          region: '嘉兴区域中心',
          year: '2026',
          lng: 120.30,
          lat: 31.57,
          status: '深夜抢修',
          contact: '孙全贵',
          phone: '150****6677',
          address: '江苏省无锡市锡山区锡港路'
        },
        {
          id: 10,
          name: '广东广州黄埔大道快速路日常预防性保养项目',
          type: 'project',
          company: '交工沪杭甬',
          region: '温州区域中心',
          year: '2026',
          lng: 113.43,
          lat: 23.16,
          status: '正常施工',
          contact: '吴建峰',
          phone: '159****9988',
          address: '广东省广州市黄埔区黄埔东路'
        },
        {
          id: 11,
          name: '福建宁德古田滑坡高边坡防护安全项目部',
          type: 'office',
          company: '交工养护',
          region: '温州区域中心',
          year: '2024',
          lng: 118.74,
          lat: 26.62,
          status: '筹建入驻',
          contact: '郑金山',
          phone: '158****2233',
          address: '福建省宁德市古田县城东街道'
        },
        {
          id: 12,
          name: '四川成都温江寿安路路桥接头修复施工点',
          type: 'site',
          company: '顺畅养护',
          region: '金衢区域中心',
          year: '2025',
          lng: 103.83,
          lat: 30.68,
          status: '局部围挡',
          contact: '冯向东',
          phone: '151****5544',
          address: '四川省成都市温江区光华大道三段'
        }
      ],
      currentActiveType: null,
      selectedTypes: [],
      typeOptions: [
        { label: '项目分布', value: 'project' },
        { label: '项目部所在分布', value: 'office' },
        { label: '施工点位分布', value: 'site' }
      ]
    }
  },
  watch: {
    filterCompanies: {
      deep: true,
      handler() {
        this.updateMarkers()
      }
    },
    filterRegions: {
      deep: true,
      handler() {
        this.updateMarkers()
      }
    },
    filterYears: {
      deep: true,
      handler() {
        this.updateMarkers()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initMap()
        this.$emit('distribution-change', null)
      }, 300)
    })
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  },
  methods: {
    selectDistributionType(val) {
      if (this.currentActiveType === val) {
        this.currentActiveType = null
        this.selectedTypes = []
      } else {
        this.currentActiveType = val
        this.selectedTypes = [val]
      }
      this.updateMarkers()
      this.$emit('distribution-change', this.currentActiveType)
    },
    initMap() {
      const container = this.$refs.mapContainer
      if (!container) return

      try {
        // High-contrast Dark Blue style reminiscent of AutoNavi Map dark styling
        this.map = new maplibregl.Map({
          container: container,
          style: {
            version: 8,
            sources: {
              'amap-dark': {
                type: 'raster',
                tiles: [
                  'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                  'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                  'https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                  'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
                ],
                tileSize: 256
              }
            },
            layers: [
              {
                id: 'amap-dark-layer',
                type: 'raster',
                source: 'amap-dark'
              }
            ]
          },
          // Centered on China for a national cockpit experience
          center: [104.2, 35.8],
          zoom: 3.8,
          attributionControl: false
        })

        this.map.on('load', () => {
          this.map.resize()
          this.updateMarkers()
        })

        window.addEventListener('resize', this.handleResize)
      } catch (err) {
        console.error('Failed to initialize map:', err)
      }
    },
    handleResize() {
      if (this.map) {
        this.map.resize()
      }
    },
    getTypeText(type) {
      const mapper = {
        project: '项目所在',
        office: '项目部地址',
        site: '施工点位'
      }
      return mapper[type] || '未知'
    },
    getFilteredPoints() {
      return this.mapPoints.filter(p => {
        const typeMatch = this.selectedTypes.includes(p.type)
        const companyMatch = this.filterCompanies.length === 0 || this.filterCompanies.includes(p.company)
        const regionMatch = this.filterRegions.length === 0 || this.filterRegions.includes(p.region)
        const yearMatch = this.filterYears.length === 0 || this.filterYears.includes(p.year)
        return typeMatch && companyMatch && regionMatch && yearMatch
      })
    },
    updateMarkers() {
      // Clear old markers
      this.markers.forEach(m => m.remove())
      this.markers = []

      const activePoints = this.getFilteredPoints()

      activePoints.forEach(point => {
        // Create a custom element with stunning neon glow
        const el = document.createElement('div')
        el.className = `custom-map-marker marker-${point.type}`

        // Internal indicator container
        const dot = document.createElement('div')
        dot.className = 'marker-dot'

        // Render distinct icon inside the dot based on the point type
        const icon = document.createElement('i')
        if (point.type === 'project') {
          icon.className = 'el-icon-coordinate'
        } else if (point.type === 'office') {
          icon.className = 'el-icon-office-building'
        } else if (point.type === 'site') {
          icon.className = 'el-icon-tools'
        }
        dot.appendChild(icon)
        el.appendChild(dot)

        // Ripple pulse
        const pulse = document.createElement('div')
        pulse.className = 'marker-pulse'
        el.appendChild(pulse)

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([point.lng, point.lat])
          .addTo(this.map)

        // Marker Click Behavior
        el.addEventListener('click', () => {
          this.selectedPoint = point
          this.flyToPoint(point)
        })

        this.markers.push(marker)
      })
    },
    flyToPoint(point) {
      if (this.map) {
        this.map.flyTo({
          center: [point.lng, point.lat],
          zoom: 11,
          speed: 1.5,
          curve: 1.2,
          essential: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-wrapper {
  width: 1920px;
  height: 1080px;
  position: relative;
}

.map-container {
  width: 100%;
  height: 100%;
  background: #030d22;

  ::v-deep .maplibregl-canvas {
    width: 100% !important;
    height: 100% !important;
  }
  
  ::v-deep .maplibregl-map {
    width: 100%;
    height: 100%;
  }
}

/* === Custom Map Markers with CSS Pulse Animation === */
::v-deep .custom-map-marker {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .marker-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    background: rgba(14, 40, 85, 0.95);
    border: 1.5px solid #fff;
    transition: all 0.2s ease;

    i {
      font-size: 11px;
      font-weight: bold;
    }
  }

  .marker-pulse {
    position: absolute;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    animation: markerRipple 1.8s infinite ease-out;
    opacity: 0;
    z-index: 1;
  }

  &:hover .marker-dot {
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  }
}

/* Marker Types Specifics with icons inside */
::v-deep .marker-project {
  .marker-dot {
    border-color: #00f3ff;
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
    
    i {
      color: #00f3ff;
    }
  }
  .marker-pulse {
    border: 1.5px solid rgba(0, 243, 255, 0.7);
    background: rgba(0, 243, 255, 0.1);
  }
}

::v-deep .marker-office {
  .marker-dot {
    border-color: #ffaa00;
    box-shadow: 0 0 10px rgba(255, 170, 0, 0.5);

    i {
      color: #ffaa00;
    }
  }
  .marker-pulse {
    border: 1.5px solid rgba(255, 170, 0, 0.7);
    background: rgba(255, 170, 0, 0.1);
  }
}

::v-deep .marker-site {
  .marker-dot {
    border-color: #ff3344;
    box-shadow: 0 0 10px rgba(255, 51, 68, 0.5);

    i {
      color: #ff3344;
    }
  }
  .marker-pulse {
    border: 1.5px solid rgba(255, 51, 68, 0.7);
    background: rgba(255, 51, 68, 0.1);
    animation-duration: 1.2s; /* Faster blinking for active sites */
  }
}

@keyframes markerRipple {
  0% {
    transform: scale(0.4);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* === Map Legend Panel === */
.map-legend {
  position: absolute;
  top: 130px;
  left: 35px;
  z-index: 100;
  background: rgba(6, 18, 40, 0.68);
  border: 1px solid rgba(41, 94, 151, 0.5);
  border-radius: 6px;
  padding: 12px 16px;
  backdrop-filter: blur(8px);
  width: 140px;

  .legend-title {
    font-size: 13px;
    font-weight: 600;
    color: #8dccf5;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(41, 94, 151, 0.3);
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin: 6px 0;
    
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .project-dot {
      background: #00f3ff;
      box-shadow: 0 0 6px #00f3ff;
    }
    .office-dot {
      background: #ffaa00;
      box-shadow: 0 0 6px #ffaa00;
    }
    .site-dot {
      background: #ff3344;
      box-shadow: 0 0 6px #ff3344;
    }

    .legend-text {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.85);
    }
  }
}

/* === Map Controls Panel (Floating Pill Buttons matching 国际/国内/省内) === */
.map-controls-panel.pill-style-panel {
  position: absolute;
  top: 262px;
  right: 540px;
  z-index: 150;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  backdrop-filter: none;
  width: auto;
  box-shadow: none;

  .pill-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .map-pill-btn {
    min-width: 145px;
    height: 38px;
    padding: 0 16px;
    background: rgba(10, 36, 75, 0.85);
    border: 1.5px solid rgba(0, 243, 255, 0.6);
    border-radius: 20px;
    color: #00f3ff;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 243, 255, 0.2);
    backdrop-filter: blur(8px);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    user-select: none;
    white-space: nowrap;

    &:hover {
      border-color: #00f3ff;
      box-shadow: 0 0 18px rgba(0, 243, 255, 0.7), inset 0 0 15px rgba(0, 243, 255, 0.35);
      transform: translateX(-3px);
      color: #ffffff;
    }

    &.active {
      background: linear-gradient(135deg, #1890ff 0%, #00d2ff 100%);
      border-color: #ffffff;
      color: #ffffff;
      font-weight: bold;
      box-shadow: 0 0 22px rgba(0, 243, 255, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.5);
      text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    }
  }
}

/* === Active Info Panel === */
.point-info-panel {
  position: absolute;
  bottom: 356px;
  left: 540px;
  z-index: 100;
  background: rgba(6, 18, 40, 0.76);
  border: 1.5px solid rgba(41, 94, 151, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 16px;
  width: 360px;
  color: #fff;
  backdrop-filter: blur(10px);
}

.animate-panel {
  animation: slideInUp 0.3s cubic-bezier(0.1, 0.7, 0.1, 1);
}

@keyframes slideInUp {
  0% {
    transform: translateY(15px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  border-bottom: 1px solid rgba(41, 94, 151, 0.4);
  padding-bottom: 8px;
  margin-bottom: 10px;

  .point-name {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    line-height: 1.3;
  }

  .type-tag {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 3px;
    white-space: nowrap;
    font-weight: 500;
    
    &.project {
      background: rgba(0, 243, 255, 0.2);
      color: #00f3ff;
      border: 0.5px solid rgba(0, 243, 255, 0.5);
    }
    &.office {
      background: rgba(255, 170, 0, 0.2);
      color: #ffaa00;
      border: 0.5px solid rgba(255, 170, 0, 0.5);
    }
    &.site {
      background: rgba(255, 51, 68, 0.2);
      color: #ff3344;
      border: 0.5px solid rgba(255, 51, 68, 0.5);
    }
  }
}

.info-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 12px;

  .info-row {
    display: flex;
    line-height: 1.4;

    .label {
      color: rgba(255, 255, 255, 0.55);
      width: 70px;
      min-width: 70px;
    }

    .value {
      color: rgba(255, 255, 255, 0.9);
      
      &.address {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    .state-badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 500;
      
      &.正常施工, &.日常办公 {
        background: rgba(103, 194, 58, 0.2);
        color: #67c23a;
      }
      &.紧张作业, &.深夜抢修 {
        background: rgba(230, 162, 44, 0.2);
        color: #e6a23c;
      }
      &.紧急抢修, &.断道作业 {
        background: rgba(245, 108, 108, 0.2);
        color: #f56c6c;
      }
      &.设备进场, &.筹建入驻 {
        background: rgba(64, 158, 255, 0.2);
        color: #409eff;
      }
    }
  }
}

.info-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(41, 94, 151, 0.3);
  padding-top: 10px;
}
</style>

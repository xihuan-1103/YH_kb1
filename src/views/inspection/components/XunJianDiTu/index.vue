<template>
  <div class="map-container" id="inspectionMap"></div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { bridgeList } from '@/mock/bridge'

export default {
  name: 'XunJianDiTu',
  data() {
    return { map: null }
  },
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    if (this.map) this.map.remove()
  },
  methods: {
    initMap() {

      this.map = new maplibregl.Map({
        container: 'inspectionMap',
        style: {
          version: 8,
          sources: {
            osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256 }
          },
          layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
        },
        center: [119.92, 28.45],
        zoom: 8,
        attributionControl: false
      })

      this.map.on('load', () => {
        bridgeList.forEach(bridge => {
          const el = document.createElement('div')
          el.style.cssText = 'width:14px;height:14px;background:#409EFF;border:2px solid #fff;border-radius:50%;cursor:pointer;'
          if (bridge.defectCount > 10) el.style.background = '#F56C6C'
          else if (bridge.defectCount > 5) el.style.background = '#E6A23C'

          new maplibregl.Marker({ element: el })
            .setLngLat([bridge.lng, bridge.lat])
            .addTo(this.map)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 1920px;
  height: 1080px;
}
</style>

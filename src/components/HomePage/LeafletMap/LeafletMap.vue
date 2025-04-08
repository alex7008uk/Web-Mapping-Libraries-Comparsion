<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LControl } from '@vue-leaflet/vue-leaflet'
import { useGeomanDraw } from '@/composables/useGeomanDraw'
import LeafletMapPanel from '@/components/HomePage/LeafletMap/LeafletMapPanel.vue'

// --------------------- 地圖設置 ---------------------
const map = ref(null) // map 本體
const mapConfig = ref({
  zoom: 10, // map 縮放大小
  center: [47.41322, -1.219482], // 地圖中心
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // 瓦磚來源
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // 貢獻者
})

// --------------------- 控制面板 ---------------------
const { currentDrawMode, initMapEvent, toggleMode } = useGeomanDraw()
</script>

<template>
  <l-map ref="map" v-model:zoom="mapConfig.zoom" :center="mapConfig.center" @ready="initMapEvent">
    <l-tile-layer
      :url="mapConfig.tileUrl"
      :attribution="mapConfig.attribution"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-control>
      <LeafletMapPanel :map="map" :currentDrawMode="currentDrawMode" :toggleMode="toggleMode" />
    </l-control>
  </l-map>
</template>

<style scoped>
:deep(.leaflet-editing-icon) {
  margin-left: -5px !important;
  margin-top: -5px !important;
  height: 0.5rem !important;
  width: 0.5rem !important;
  background-color: #2f6279;
  border-radius: 50%;
  display: inline-block;
}
</style>

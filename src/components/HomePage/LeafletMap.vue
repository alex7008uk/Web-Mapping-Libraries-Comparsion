<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LControl } from '@vue-leaflet/vue-leaflet'
import { useMapDraw } from '@/composables/useMapDraw'

// --------------------- 地圖設置 ---------------------
const map = ref(null) // map 本體
const mapConfig = ref({
  zoom: 10, // map 縮放大小
  center: [47.41322, -1.219482], // 地圖中心
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // 瓦磚來源
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // 貢獻者
})

// --------------------- 控制面板 ---------------------
// 初始化繪製物件, 開關數化模式
const { initDrawControl, toggleMode } = useMapDraw()
const lineType = ref('') // 折線樣式
</script>

<template>
  <l-map
    ref="map"
    v-model:zoom="mapConfig.zoom"
    :center="mapConfig.center"
    @ready="initDrawControl"
  >
    <l-tile-layer
      :url="mapConfig.tileUrl"
      :attribution="mapConfig.attribution"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-control class="map-control">
      <div>
        <select v-model="lineType">
          <option disabled value="">---選擇樣式---</option>
          <option value="1">線+點</option>
          <option value="2">線+數字</option>
        </select>
      </div>
      <div><button :disabled="!lineType" @click="toggleMode('polyline')">畫圖模式</button></div>
      <div><button>清除模式</button></div>
      <hr />
      <div><button>載入巨量數據</button></div>
    </l-control>
  </l-map>
</template>

<style scoped>
.map-control {
  padding: 1em;
  background-color: hsl(0, 0%, 95%);
  border: 0.15rem solid hsl(0, 0%, 72%);
  border-radius: 0.5rem;
}

:deep(.leaflet-editing-icon) {
  margin-left: -5px !important;
  margin-top: -5px !important;
  height: 0.5rem !important;
  width: 0.5rem !important;
  background-color: #ff00a7;
  border-radius: 50%;
  display: inline-block;
}
</style>

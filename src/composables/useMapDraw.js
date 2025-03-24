import { ref } from 'vue'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-snap'

export function useMapDraw() {
  // leaflet.draw 繪製物件
  const drawControls = ref({ polyline: '', polygon: '', erease: '' })
  const isModeOn = ref({ polyline: false, polygon: false, erease: false })

  // 初始化繪製物件
  function initDrawControl(mapObject) {
    const drawnItems = new L.FeatureGroup().addTo(mapObject)

    drawControls.value.polyline = new L.Draw.Polyline(mapObject)
    drawControls.value.polygon = new L.Draw.Polygon(mapObject)

    mapObject.on('draw:created', (e) => {
      // 繪製結果加入繪製圖層
      drawnItems.addLayer(e.layer)
    })
  }

  // 開啟/關閉模式
  function toggleMode(mode) {
    const drawControl = drawControls.value[mode]
    isModeOn.value[mode] ? drawControl.disable() : drawControl.enable()
    isModeOn.value[mode] = !isModeOn.value[mode]
  }

  return { initDrawControl, toggleMode }
}

import { ref } from 'vue'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-snap'

export function useLeafletDraw() {
  // 儲存繪製結果的圖層
  const drawnItems = ref(null)
  // leaflet.draw 繪製物件
  const drawControls = ref({ polyline: '', polygon: '', delete: '' })
  // 紀錄繪製模式開關
  const isModeOn = ref({ polyline: false, polygon: false, delete: false })
  // 繪製線條的樣式
  const lineType = ref('')

  // 初始化繪製物件
  function initDrawControl(mapObject) {
    drawnItems.value = new L.FeatureGroup().addTo(mapObject)

    drawControls.value.polyline = new L.Draw.Polyline(mapObject)
    drawControls.value.polygon = new L.Draw.Polygon(mapObject)
    drawControls.value.delete = new L.EditToolbar.Delete(mapObject, {
      featureGroup: drawnItems.value,
    })

    mapObject.on('draw:created', (e) => {
      // 繪製結果加入繪製圖層
      drawnItems.value.addLayer(e.layer)
    })
  }

  // 開啟/關閉模式
  function toggleMode(mode) {
    const drawControl = drawControls.value[mode]
    isModeOn.value[mode] ? drawControl.disable() : drawControl.enable()
    isModeOn.value[mode] = !isModeOn.value[mode]
  }

  function setLineType(type) {
    lineType.value = type
  }

  return { initDrawControl, toggleMode, setLineType }
}

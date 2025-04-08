import { ref } from 'vue'
import L from 'leaflet'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import 'leaflet-textpath'
import {
  getTotalDistance,
  formatDistance,
  enableDrawMode,
  disableDrawMode,
} from '@/utils/geomanDrawUtils'

export function useGeomanDraw() {
  const currentDrawMode = ref('') // 當前繪製模式

  //  ------------------------ 繪製事件  ------------------------
  function initMapEvent(map) {
    // 設定 leaflet geoman 語言
    map.pm.setLang('zh_tw')

    // 繪製狀態: 總距離, 片段距離, 當前繪製圖層
    const drawState = { total: 0, currentWorkingLayer: null }

    // 綁定繪製事件
    map.on('pm:drawstart', (e) => handleDrawStart(e, drawState))
    map.on('mousemove', (e) => handleMouseMove(e, drawState))
    map.on('pm:create', (e) => handleDrawCreated(e, map, drawState))
  }

  function handleDrawStart(e, drawState) {
    const { workingLayer } = e
    workingLayer.on('pm:vertexadded', () => handleVertexAdded(drawState))

    drawState.currentWorkingLayer = workingLayer
  }

  function handleVertexAdded(drawState) {
    const tooltip = document.querySelector('.leaflet-tooltip')

    // 計算總距離
    const latlngs = drawState.currentWorkingLayer.getLatLngs()
    const totalDistance = getTotalDistance(latlngs)
    drawState.total = totalDistance

    // 更改 tooltip 顯示內容
    const totalText = '總距離: ' + formatDistance(totalDistance)
    const continueText = latlngs.length > 1 ? '點擊最後一點完成繪製' : '點擊繪製第一點'
    tooltip.innerHTML = totalText + '<br>' + continueText
    tooltip.style.width = 'auto'
  }

  function handleMouseMove(e, drawState) {
    const tooltip = document.querySelector('.leaflet-tooltip')

    const isDrawModeOn = !!currentDrawMode.value // 繪製模式是否開啟
    const isDrawModeDelete = currentDrawMode.value === 'delete' // 繪製模式是否為刪除

    if (isDrawModeOn && !isDrawModeDelete) {
      // 計算片段距離
      const latlngs = drawState.currentWorkingLayer.getLatLngs() // 已繪製的點
      let segmentDistance = 0 // 鼠標到已繪製最後一點的距離

      if (latlngs.length) {
        const lastAddedLatlngs = latlngs[latlngs.length - 1] // 已繪製的最後一點
        const mouseLatlngs = e.latlng // 鼠標點
        segmentDistance = lastAddedLatlngs.distanceTo(mouseLatlngs)
      }

      // 更改 tooltip 顯示內容
      const segmentText = '當前線段: ' + formatDistance(segmentDistance)
      const totalText = '總距離: ' + formatDistance(drawState.total + segmentDistance)

      let continueText = ''
      if (latlngs.length === 0) {
        continueText = '點擊繪製第一點'
      } else if (latlngs.length === 1) {
        continueText = '點擊繪製下一點'
      } else {
        continueText = '點擊最後一點完成繪製'
      }

      tooltip.innerHTML = segmentText + '<br>' + totalText + '<br>' + continueText
      tooltip.style.width = 'auto'
    }
  }

  function handleDrawCreated(e, map, drawState) {
    const { layer, shape } = e

    // 幫線段加入距離 tooltip
    if (shape === 'Line') {
      const distanceStr = formatDistance(drawState.total)
      layer.bindTooltip(distanceStr, { sticky: true })
    }

    // 後製特殊線段
    if (currentDrawMode.value === 'hole') {
      const latLngs = layer.getLatLngs()
      for (let i = 0; i < latLngs.length - 1; i++) {
        L.circleMarker(latLngs[i]).addTo(map)
      }
    }
    if (currentDrawMode.value === 'pipeline') {
      const latLngs = layer.getLatLngs()
      const firstLatLng = latLngs[0]
      const lastLatLng = latLngs[latLngs.length - 1]
      const isWestToEast = firstLatLng.lng < lastLatLng.lng

      layer.setText('100', {
        center: true,
        offset: 6,
        orientation: isWestToEast ? '0' : 'flip',
        attributes: {
          'font-size': '20px',
          fill: '#3388ff',
          stroke: 'white',
          'stroke-width': '1px',
          'stroke-opacity': '0.2',
        },
      })
    }

    // 重置繪製狀態
    drawState.total = 0
    drawState.currentWorkingLayer = null
  }

  //  ------------------------ 開關模式  ------------------------
  function toggleMode(map, mode) {
    const leafletMap = map.leafletObject // 地圖物件

    if (!currentDrawMode.value) {
      // 1. 當前無繪製模式, 開啟繪製模式
      currentDrawMode.value = mode
      enableDrawMode(mode, leafletMap)
    } else if (mode === currentDrawMode.value) {
      // 2. 指定模式與當前模式相同, 關閉繪製模式
      currentDrawMode.value = ''
      disableDrawMode(mode, leafletMap)
    } else {
      // 3. 指定模式與當前模式不同, 先關當前後開指定
      disableDrawMode(currentDrawMode.value, leafletMap)

      currentDrawMode.value = mode
      enableDrawMode(mode, leafletMap)
    }
  }

  return { currentDrawMode, initMapEvent, toggleMode }
}

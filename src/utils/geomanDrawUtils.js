// 計算 latlngs 總距離
export function getTotalDistance(latlngs) {
  let totalDistance = 0
  for (let i = 0; i < latlngs.length - 1; i++) {
    totalDistance += latlngs[i].distanceTo(latlngs[i + 1])
  }
  return totalDistance
}

// 格式化距離顯示
export function formatDistance(distance) {
  if (distance >= 1000) {
    return (distance / 1000).toFixed(2) + ' 公里'
  } else {
    return Math.round(distance) + ' 公尺'
  }
}

// 開啟指定繪製模式
export function enableDrawMode(mode, leafletMap) {
  switch (mode) {
    case 'hole':
    case 'pipeline':
      leafletMap.pm.enableDraw('Line', { continueDrawing: true })
      break
    case 'area':
      leafletMap.pm.enableDraw('Polygon', { continueDrawing: true })
      break
    case 'delete':
      leafletMap.pm.enableGlobalRemovalMode()
      break
  }
}

// 關閉指定繪製模式
export function disableDrawMode(mode, leafletMap) {
  if (mode === 'delete') {
    leafletMap.pm.disableGlobalRemovalMode()
  } else {
    leafletMap.pm.disableDraw()
  }
}

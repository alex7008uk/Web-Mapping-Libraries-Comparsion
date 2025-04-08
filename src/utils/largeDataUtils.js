import L from 'leaflet'

// --------------------- leaflet 巨量資料 ---------------------
let leafletDataLayer = null // 紀錄 leaflet 巨量資料圖層

// 新增巨量資料圖層
async function addGeojsonLayer(map) {
  const mapObject = map.leafletObject

  try {
    // 獲取過去30天全球所有地震資料（數千個點）
    const res = await fetch(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
    )
    const data = await res.json()
    leafletDataLayer = L.geoJSON(data).addTo(mapObject)

    console.log('載入完成')
  } catch (error) {
    console.error('載入失敗', error)
  }
}

// 移除巨量資料圖層
function removeGeojsonLayer(map) {
  const mapObject = map.leafletObject
  mapObject.removeLayer(leafletDataLayer)
}

export const leafletDataUtils = {
  addGeojsonLayer,
  removeGeojsonLayer,
}

// --------------------- openlayers 巨量資料 ---------------------

// --------------------- maplibre 巨量資料 ---------------------

<script setup>
const props = defineProps({
  map: { type: Object },
  currentDrawMode: { type: String },
  toggleMode: { type: Function },
})

const drawButtonList = [
  { label: '繪製孔蓋', mode: 'hole' },
  { label: '繪製管線', mode: 'pipeline' },
  { label: '繪製範圍', mode: 'area' },
  { label: '刪除圖形', mode: 'delete' },
]

function getTabClass(buttonMode) {
  const isActive = buttonMode === props.currentDrawMode
  return ['map-panel__button', { 'map-panel__button--selected': isActive }]
}
</script>

<template>
  <div class="map-panel">
    <!-- 繪畫相關按鈕 -->
    <button
      v-for="button of drawButtonList"
      :key="button.label"
      @click="props.toggleMode(props.map, button.mode)"
      :class="getTabClass(button.mode)"
    >
      {{ button.label }}
    </button>
    <div class="map-panel__divider"></div>
    <!-- 載入相關按鈕 -->
    <button class="map-panel__button">載入巨量數據</button>
  </div>
</template>

<style scoped>
.map-panel {
  padding: 1rem;
  background-color: #f2f2f2;
  border: 0.15rem solid #b8b8b8;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.map-panel__button {
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  border: 0.15rem solid #b8b8b8;
  font-size: 1rem;
  color: #575757;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.map-panel__button:hover {
  opacity: 0.7;
}

.map-panel__button--selected {
  color: #f0f0f0;
  background-color: #418bad;
}

.map-panel__divider {
  width: 100%;
  height: 0.16rem;
  background-color: #b8b8b8;
}
</style>

<script setup>
const props = defineProps({
  toggleMode: { type: Function },
  setLineType: { type: Function },
})
</script>

<template>
  <div class="map-panel">
    <div><button @click="props.toggleMode('polyline')">畫圖模式</button></div>
    <div><button @click="props.toggleMode('delete')">清除模式</button></div>
    <hr />
    <div><button>載入巨量數據</button></div>
  </div>
</template>

<style scoped>
.map-panel {
  padding: 1em;
  background-color: #f2f2f2;
  border: 0.15rem solid #b8b8b8;
  border-radius: 0.5rem;
}
</style>

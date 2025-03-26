<script setup>
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/homeTab.js'

const tabStore = useTabStore()
const { tab } = storeToRefs(tabStore)
const { setTab } = tabStore

const tabItems = [
  { tabName: 'Leaflet', componentName: 'LeafletMap' },
  { tabName: 'OpenLayers', componentName: 'OpenLayersMap' },
  { tabName: 'MapLibre', componentName: 'MapLibreMap' },
]

function getTabClass(componentName) {
  const isActive = componentName === tab.value
  return ['tab-item', { 'tab-item--selected': isActive }]
}
</script>

<template>
  <div class="tab-container">
    <div
      v-for="item of tabItems"
      :key="item.tabName"
      @click="setTab(item.componentName)"
      :class="getTabClass(item.componentName)"
    >
      {{ item.tabName }}
    </div>
  </div>
</template>

<style scoped>
.tab-container {
  position: absolute;
  top: -2.8rem;
  left: 0.3rem;
  display: flex;
  gap: 0.1rem;
}

.tab-item {
  font-size: 1.4rem;
  color: #575757;
  letter-spacing: 0.03rem;
  background-color: #f2f2f2;
  padding: 0.4rem 3rem;
  border: 0.18rem solid #b8b8b8;
  border-radius: 0.6rem 0.6rem 0 0;
  cursor: pointer;
}

.tab-item:hover {
  opacity: 0.7;
}

.tab-item--selected {
  color: #f0f0f0;
  background-color: #418bad;
}
</style>

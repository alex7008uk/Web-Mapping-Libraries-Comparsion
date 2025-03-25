<script setup>
import HomeLayout from '@/components/HomePage/HomeLayout.vue'
import HomeTab from '@/components/HomePage/HomeTab.vue'
import LeafletMap from '@/components/HomePage/LeafletMap.vue'
import OpenLayersMap from '@/components/HomePage/OpenLayersMap.vue'
import MapLibreMap from '@/components/HomePage/MapLibreMap.vue'
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/homeTab.js'

const { tab } = storeToRefs(useTabStore())

const components = { LeafletMap, OpenLayersMap, MapLibreMap }
</script>

<template>
  <HomeLayout>
    <HomeTab />
    <component :is="components[tab]" />
  </HomeLayout>
</template>

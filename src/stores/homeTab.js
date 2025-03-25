import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTabStore = defineStore('homeTab', () => {
  const tab = ref('LeafletMap') // home page 當前 tab

  // 設定當前 tab
  function setTab(state) {
    tab.value = state
  }

  return { tab, setTab }
})

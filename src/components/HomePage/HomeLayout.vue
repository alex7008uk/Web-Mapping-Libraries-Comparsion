<template>
  <div class="map-layout">
    <div class="map-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.map-layout {
  margin-top: 5.6rem;
  width: 100vw;
  display: grid;
  place-items: center;
}

.map-container {
  width: 70vw;
  height: 78vh;
  background-color: #f2f2f2;
  border: 0.3rem solid #b8b8b8;
  border-radius: 0.5rem;
  position: relative;
}
</style>

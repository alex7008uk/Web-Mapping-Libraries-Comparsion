<template>
  <div class="map-layout">
    <div class="map-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.map-layout {
  margin-top: 2.2rem;
  width: 100vw;
  display: grid;
  place-items: center;
}

.map-container {
  width: 70vw;
  height: 84vh;
  background-color: hsl(0, 0%, 95%);
  border: 0.3rem solid hsl(0, 0%, 72%);
  border-radius: 0.5rem;
}
</style>

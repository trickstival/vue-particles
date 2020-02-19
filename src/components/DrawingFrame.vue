<template>
  <div
    class="draw-frame"
  >
      <slot />
  </div>
</template>

<script>
export default {
    name: 'DrawingFrame',
}
</script>

<style lang="scss" scoped>
.draw-frame {
    background-color: #ccc;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.footer {
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
}
</style>
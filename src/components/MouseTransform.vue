<template>
  <div
    :style="{
      transform: `translate(${position.x}px, ${position.y}px)`,
    }"
    class="mouse-transform"
  >
    <slot />
  </div>
</template>

<script>
export default {
    data () {
        return {
            position: {
                x: 300,
                y: 300
            },
            trackMousePosition: (event) => {
                this.position.x = event.clientX
                this.position.y = event.clientY
            }
        }
    },
    mounted () {
        window.addEventListener('mousemove', this.trackMousePosition)
    },
    beforeDestroy () {
        window.removeEventListener('mousemove', this.trackMousePosition)
    }
}
</script>

<style lang="scss" scoped>
.mouse-transform {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
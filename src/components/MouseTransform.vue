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
    props: {
      container: {
        type: HTMLElement,
        default: () => document.documentElement
      }
    },
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
        this.container.addEventListener('pointermove', this.trackMousePosition)
        this.container.style.touchAction = 'none'
    },
    beforeDestroy () {
        this.container.removeEventListener('pointermove', this.trackMousePosition)
    }
}
</script>

<style lang="scss" scoped>
.mouse-transform {
    position: absolute;
    touch-action: none;
    left: 0;
    top: 0;
}
</style>
<template>
  <div class="gl-cube">
      <h2 v-if="noWebGL">
          Hello, Patrick here!
          Unfortunetly your browsers does not
          support WebGL 2. You could try to open this
          page in another browser or device :p
      </h2>
      <canvas ref="canvas" class="canvas">
      </canvas>
  </div>
</template>

<script>
import initGlSin from '../particleSystem/GLSin'

export default {
    data () {
        return {
            noWebGL: false
        }
    },
    mounted () {
        if (initGlSin(this.$refs.canvas) === false) {
            this.noWebGL = true
        }
    }
}
</script>

<style lang="scss" scoped>
.canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
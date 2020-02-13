<template>
  <div
    @mousedown="activateParticles"
    @mouseup="showParticles = false"
    class="draw-frame"
  >
      <mouse-transform>
          <particles
            class="mouse-particles"
          />
      </mouse-transform>
      <footer class="footer">
          <particles
            class="mouse-particles"
          />
          <particles
            class="mouse-particles"
          />
          <particles
            class="mouse-particles"
          />
      </footer>
  </div>
</template>

<script>
import Particles from './Particles'
import MouseTransform from './MouseTransform'

export default {
    name: 'DrawingFrame',
    components: {
        Particles,
        MouseTransform
    },
    data () {
        return {
            particlesPosition: {
                x: 0,
                y: 0
            },
            showParticles: false
        }
    },
    methods: {
        activateParticles (event) {
            this.showParticles = true
        },
        trackMousePosition (event) {
            
        }
    }
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
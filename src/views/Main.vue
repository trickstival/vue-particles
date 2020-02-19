<template>
  <div class="position-particles">
      <drawing-frame>
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
                lifetime="20"
                x-spread="10"
                class="mouse-particles"
            />
            <particles
                class="mouse-particles"
            />
        </footer>
      </drawing-frame>
  </div>
</template>

<script>
import DrawingFrame from '../components/DrawingFrame'
import Particles from '../components/Particles'
import MouseTransform from '../components/MouseTransform'

export default {
    components: {
        DrawingFrame,
        Particles,
        MouseTransform
    }
}
</script>

<style>

</style>
<template>
  <drawing-frame>
    <single-particle-group :count="10">
      <single-particle>
        Particula
      </single-particle>
    </single-particle-group>
  </drawing-frame>
</template>

<script>
import DrawingFrame from '../components/DrawingFrame'
import SingleParticleGroup from '../components/SingleParticleGroup'
import SingleParticle from '../components/SingleParticle'

export default {
  name: 'SingleParticles',
  components: {
    DrawingFrame,
    SingleParticle,
    SingleParticleGroup
  }
}
</script>

<style lang="scss" scoped>

</style>
<template>
  <drawing-frame>
    <single-particle-group :count="10">
      <template #default>
        <single-particle>
          <img width="20px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Black_Paw.svg/1093px-Black_Paw.svg.png" alt="">
        </single-particle>
        <single-particle>
          <img width="20px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Paw-print.svg/1200px-Paw-print.svg.png" alt="">
        </single-particle>
      </template>
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
img {
  transform: rotate(130deg);
}
</style>
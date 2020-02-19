<template>
  <div
    class="particles"
  >
    <shape
      v-for="(particle, idx) in aliveParticles"
      :key="idx"
      :color="color"
      :style="{
        transform: `translate(${particle.translation.x}px, ${particle.translation.y}px)`,
        opacity: particle.opacity
      }"
      class="particle"
    ></shape>
  </div>
</template>

<script>
import { frame, waitFor } from '../utils/frame.ts'
import { Particle } from '../particleSystem/PositionParticle'
import Shape from './Shape'
import Vue from 'vue'

export default {
  name: 'Particles',
  components: {
    Shape
  },
  props: {
    color: {
      type: String,
      default: '#000'
    },
    lifetime: {
      type: [Number, String],
      default: 10
    },
    poolSize: {
      type: Number,
      default: 50
    },
    shape: {
      type: String,
      default: 'square'
    },
    xSpread: {
      type: [Number, String],
      default: 8
    },
    ySpread: {
      type: [Number, String],
      default: 5
    },
  },
  computed: {
    particles () {
      const particles = []
      for (let i = 0; i < this.poolSize; i++) {
        const particle = Vue.observable(new Particle())
        particles.push(particle)
      }
      return particles
    },
    aliveParticles () {
      return this.particles.filter(p => p.isAlive)
    }
  },
  methods: {
    async particleQueueLoop () {
      while(true) {
        if (this._inactive) {
          return
        }
        for (const particle of this.particles) {
          if (!particle.isAlive) {
            await waitFor(100)
            this.$set(particle, 'isAlive', true)
            this.$forceUpdate()
          }
        }
        await frame()
      }
    },
    async renderLoop () {
      await frame()

      for (const particle of this.aliveParticles) {
        particle.translation.x += (Math.random() -.5) * this.xSpread
        particle.translation.y -= Math.random() * this.ySpread
        particle.currentLifetime += Math.random() / 10 + .1
        particle.opacity = 1 - (particle.currentLifetime / this.lifetime)
        if (particle.currentLifetime >= this.lifetime) {
          particle.reset()
        }
      }

      this.renderLoop()
    },
  },
  mounted () {
    this.renderLoop()
    this.particleQueueLoop()
  }
}
</script>

<style lang="scss" scoped>
.particles {
  position: relative;
  will-change: transform;
}
</style>
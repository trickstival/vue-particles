<template>
  <div class="particle">
      <div
        :style="{
            position: 'absolute',
            transitionProperty: 'transform',
            transitionDuration: currentStep < 0 ? '0s' : `${lifetime / 1000 / entropy}s`,
            transitionTimingFunction: 'linear',
            transform: `translate(${currentDestination.x}px, ${currentDestination.y}px)`,
        }"
        @transitionend="currentStep++"
        class="single-particle"
      >
          <slot />
      </div>
  </div>
</template>

<script>
import { frame, waitFor } from '../utils/frame.ts'

export default {
    props: {
        direction: {
            type: Array,
            default: () => ['right', 'bottom']
        },
        lifetime: {
            type: Number,
            default: 1000
        },
        entropy: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            currentStep: 0,
            trajectory: []
        }
    },
    watch: {
        currentStep: {
            immediate: true,
            async handler () {
                if (this.currentStep === this.entropy) {
                    this.currentStep = -2
                    this.trajectory = []
                    await this.$nextTick()
                    this.generateNewTrajectory()
                }
            }
        }
    },
    computed: {
        directionMultipliers () {
            const xMultiplierMap = {
                left: -1,
                middle: 0,
                right: 1
            }
            const yMultiplierMap = {
                top: -1,
                middle: 0,
                bottom: 1
            }
            const [xDirection, yDirection] = this.direction
            return {
                x: xMultiplierMap[xDirection],
                y: yMultiplierMap[yDirection]
            }
        },
        currentDestination () {
            return this.trajectory[this.currentStep] || { x: 0, y: 0 }
        }
    },
    methods: {
        getNewPosition () {

        },
        async generateNewTrajectory () {
            this.trajectory = []
            this.currentStep = 0
            const chaos = 200
            for (let i = 0; i < this.entropy; i++) {
                const previous = this.trajectory[i - 1] || { x: 0, y: 0 }
                this.trajectory.push({
                    x: previous.x + Math.random() * chaos * this.directionMultipliers.x,
                    y: previous.y + Math.random() * chaos * this.directionMultipliers.y
                })
            }
        }
    },
    mounted () {
        requestAnimationFrame(() => {
            this.generateNewTrajectory()
        })
    }
}
</script>

<style>

</style>
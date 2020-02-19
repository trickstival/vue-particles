<template>
  <div class="particle">
      <div
        :style="{
            position: 'absolute',
            transform: `translate(${currentDestination.x}px, ${currentDestination.y}px)`,
            transition: transitionStyle,
            opacity: opacity
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
            default: 10
        },
        stepSpread: {
            type: Number,
            default: 60
        }
    },
    data () {
        return {
            currentStep: 0,
            trajectory: [],
            delay: 0,
            opacity: 1
        }
    },
    watch: {
        currentStep: {
            immediate: true,
            async handler () {
                if (this.currentStep > 0) {
                    this.delay = 0
                    this.opacity = 0
                }
                // Finished execution
                if (this.currentStep === this.entropy) {
                    this.opacity = 1
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
        },
        transitionStyle () {
            const timeInSeconds = this.lifetime / 1000
            const properties = [
                {
                    name: 'opacity',
                    duration:  timeInSeconds + 's',
                    delay: 0 + 's',
                    timingFunction: 'ease-out'
                },
                {
                    name: 'transform',
                    duration: `${timeInSeconds / this.entropy}s`,
                    delay: this.delay + 's',
                    timingFunction: 'linear'
                }
            ]
            return properties.reduce((str, { name, duration, delay, timingFunction }, idx) => {
                duration = this.currentStep < 0 ? '0s' : duration

                str += [name, duration, delay, timingFunction].join(' ')
                if (idx < properties.length - 1) {
                    str += ','
                }
                return str
            }, '')
        }
    },
    methods: {
        async generateNewTrajectory () {
            this.trajectory = []
            this.currentStep = 0
            for (let i = 0; i < this.entropy; i++) {
                const previous = this.trajectory[i - 1] || { x: 0, y: 0 }
                this.trajectory.push({
                    x: previous.x + Math.random() * this.stepSpread * this.directionMultipliers.x,
                    y: previous.y + Math.random() * this.stepSpread * this.directionMultipliers.y
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
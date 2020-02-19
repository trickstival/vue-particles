<template>
    <div class="trigo">
        <canvas ref="canvas" class="canvas"></canvas>
        <footer class="footer">
            Angle:
            <input @input="angle = +$event.target.value * Math.PI / 180" type="number">
            <button @click="isAnimating = !isAnimating">
                Toggle Animation
            </button>
            
            <span>
                Current angle:
                {{ (angle * 180 / Math.PI).toFixed(2) }} º
            </span>
        </footer>
    </div>
</template>

<script>
import { frame } from '../utils/frame'
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const CIRCLE_MARGIN = 200
const X_CENTER = WIDTH / 2
const Y_CENTER = HEIGHT / 2
const CIRCLE_RADIUS = HEIGHT / 3
const STROKE_WIDTH = 2
const REAL_CIRCLE_RADIUS = CIRCLE_RADIUS - STROKE_WIDTH

export default {
    data () {
        return {
            ctx: null,
            angle: Math.PI / 4,
            isAnimating: true
        }
    },
    watch: {
        angle () {
            this.drawAngle()
        },
        isAnimating (isAnimating) {
            if (isAnimating) {
                this.renderLoop()
            }
        }
    },
    methods: {
        drawCircle () {
            const { ctx } = this
            ctx.beginPath()
            ctx.arc(X_CENTER, Y_CENTER, CIRCLE_RADIUS, 0, 2 * Math.PI)
            ctx.clip()
            ctx.stroke()
        },
        clearCircle () {
            const { ctx } = this
            ctx.save()
            ctx.globalCompositeOperation = 'destination-out'
            ctx.beginPath()
            ctx.arc(X_CENTER, Y_CENTER, REAL_CIRCLE_RADIUS, 0, 2 * Math.PI, false)
            ctx.fill()
            ctx.restore()
        },
        drawAngle () {
            const { ctx, angle } = this
            this.clearCircle()
            this.drawAxis()

            const cos = Math.cos(angle)
            const sin = Math.sin(angle)

            const angleEndX = X_CENTER + cos * REAL_CIRCLE_RADIUS
            const angleEndY = Y_CENTER + sin * REAL_CIRCLE_RADIUS

            // Sin
            ctx.beginPath()
            ctx.strokeStyle = 'blue'
            ctx.moveTo(angleEndX, angleEndY)
            ctx.lineTo(angleEndX, Y_CENTER)
            ctx.stroke()

            // Cos
            ctx.beginPath()
            ctx.strokeStyle = 'blue'
            ctx.moveTo(angleEndX, angleEndY)
            ctx.lineTo(X_CENTER, angleEndY)
            ctx.stroke()

            // Angle
            ctx.beginPath()
            ctx.strokeStyle = 'green'
            ctx.moveTo(X_CENTER, Y_CENTER)
            ctx.lineTo(angleEndX, angleEndY)
            ctx.stroke()
        },
        drawAxis () {
            const { ctx, angle } = this

            // Y axis
            ctx.beginPath()
            ctx.moveTo(X_CENTER, Y_CENTER - REAL_CIRCLE_RADIUS)
            ctx.lineTo(X_CENTER, Y_CENTER + REAL_CIRCLE_RADIUS)
            ctx.strokeStyle = 'yellow'
            ctx.stroke()

            // X axis
            ctx.beginPath()
            ctx.moveTo(X_CENTER - REAL_CIRCLE_RADIUS, Y_CENTER)
            ctx.lineTo(X_CENTER + REAL_CIRCLE_RADIUS, Y_CENTER)
            ctx.strokeStyle = 'yellow'
            ctx.stroke()
        },

        async renderLoop () {
            while (true) {
                await frame()
                if (!this.isAnimating) {
                    return
                }
                this.angle += .02
                if (this.angle >= Math.PI * 2) {
                    this.angle = 0
                }
            }
        }
    },
    mounted () {
        const ctx = this.ctx = this.$refs.canvas.getContext('2d')
        ctx.canvas.width = window.innerWidth
        ctx.canvas.height = window.innerHeight
        this.drawCircle()
        this.drawAngle(Math.PI)
        this.renderLoop()
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
.footer {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 2;
}
</style>
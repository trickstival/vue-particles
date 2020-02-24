import { Renderer } from "../engine/Renderer"
import { generateRandomTriangles, sins } from "../utils/glUtils"


export default (canvas: HTMLCanvasElement) => {
    const renderer = new Renderer({
        canvas,
        programName: 'GL_CUBE'
    })
    const gl = renderer.gl

    if (!gl) {
        return false
    }

    renderer.createProgram()
    const positionDrawer = renderer.shapeDrawer.withAttribute('a_position')
    positionDrawer.drawType = gl.LINE_STRIP

    gl.clear(gl.COLOR_BUFFER_BIT)

    const tracks = [
        track(sins(.01, { translateY: 15 })),
        track(sins(.03, { translateY: 8 })),
        track(sins(.10, { translateY: 0., amplitude: 4 })),
        track(sins(.15, { translateY: -8. })),
        track(sins(.25, { translateY: -12. })),
        track(sins(1, { translateY: -16. })),
    ]
    
    renderer.loop(() => {
        gl.clear(gl.COLOR_BUFFER_BIT)
        for (const track of tracks) {
            track()
        }
    })
    
    function track (sinsArray: number[]) {
        let idx = 0
        let curX = -1
        let buffer = []
        const buffers = [buffer]
        return () => {
            idx++
            if (idx >= sinsArray.length) {
                idx = 0
            } else {
                curX += .002
            }
            if (curX >= 1) {
                curX = -1
                buffer = []
                buffers.push(buffer)
            }
            buffer.push(curX, sinsArray[idx] * .05)
            for (const buffer of buffers) {
                positionDrawer.drawShape(buffer, true)
            }
            return { idx, curX }
        }
    }
}

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

    const sinsArray = sins()
    let curX = -1
    let idx = 0

    const buffer = []
    
    renderer.loop(() => {
        gl.clear(gl.COLOR_BUFFER_BIT)
        buffer.push(curX, getSinBufferFor(sinsArray))
        positionDrawer.drawShape(buffer, true)
    })

    function getSinBufferFor (sinsArray: number[]) {
        idx++
        if (idx >= sinsArray.length) {
            idx = 0
        } else {
            curX += .001
        }
        if (curX >= 1) {
            curX = -1
        }

        return sinsArray[idx] * .05
    }
}
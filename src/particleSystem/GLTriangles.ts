import { Renderer } from '../engine/Renderer'
import { generateRandomTriangles, scale } from '../utils/glUtils'

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

    const { shapeDrawer } = renderer

    const positionDrawer = shapeDrawer.withAttribute('a_position')

    // const indices = [
    //     0, 1, 2,
    //     2, 1, 3
    // ]

    const minCount = 10
    const maxCount = 5000

    let triangleCount = 10000
    let stepFactor = -1

    let vertexPositions = generateRandomTriangles(triangleCount)

    renderer.loop(() => {
        gl.clear(gl.COLOR_BUFFER_BIT)
        vertexPositions = generateRandomTriangles(triangleCount)

        if (triangleCount <= minCount) {
            stepFactor = 50
            randomShape()
        } else if (triangleCount >= maxCount) {
            stepFactor = -50
        }

        triangleCount += stepFactor
        
        positionDrawer
            // .drawIndices(indices)
            .drawShape(vertexPositions, true)
    })

    function randomShape () {
        if (Math.random() > .5) {
            positionDrawer.drawType = gl.LINES
            return
        }
        positionDrawer.drawType = gl.TRIANGLES
    }
}

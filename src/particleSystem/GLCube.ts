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

    const indices = [
        0, 1, 2,
        2, 1, 3
    ]

    // const vertexPositions = [
    //     0, 0,
    //     0, 0.5,
    //     0.7, 0,
    // ]

    const vertexPositions = generateRandomTriangles(400)
    console.log(vertexPositions)

    let orientation = 1

    renderer.loop(() => {
        gl.clear(gl.COLOR_BUFFER_BIT)
        
        positionDrawer
            // .drawIndices(indices)
            .drawShape(vertexPositions, true)
    })
}

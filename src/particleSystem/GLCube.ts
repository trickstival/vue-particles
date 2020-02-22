import { Renderer } from '../engine/Renderer'

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

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT)
    const { shapeDrawer } = renderer
    shapeDrawer
        .withAttribute('a_position')
        .drawShape([
            0, 0,
            0, 0.5,
            0.7, 0,

            0, -0.5,
            0.5, -0.5,
            0, -0.9
        ])
}

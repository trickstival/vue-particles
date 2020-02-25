import { Renderer } from "../engine/Renderer"


export default (canvas: HTMLCanvasElement) => {
    const renderer = new Renderer({
        canvas,
        programName: 'GL_SMOKE'
    })

    const gl = renderer.gl

    if (!gl) {
        return false
    }

    const program = renderer.createProgram()
    const positionDrawer = renderer.shapeDrawer.withAttribute('a_position')
    sendResolutionToShader()

    positionDrawer
        .drawIndices([
            0, 1, 2,
            2, 3, 0
        ])
        .drawShape([
            -1, 1,
            1, 1,
            1, -1,
            -1, -1
        ])

    function sendResolutionToShader () {
        const resolutionId = gl.getUniformLocation(program, 'u_resolution')
        gl.uniform2fv(resolutionId, [canvas.clientWidth, canvas.clientHeight])
    }
}

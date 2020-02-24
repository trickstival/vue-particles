import { Renderer } from "./Renderer"

interface VAO {

}

class DrawCallInstance {
    public drawType = WebGL2RenderingContext.TRIANGLES
    constructor (
        private shapeDrawer: ShapeDrawer,
        private attributeLocation: number
    ) {

    }
    draw2dTriangle (positions: number[]) {
        
    }

    drawIndices (indices: number[]) {
        const { gl } = this.shapeDrawer.renderer
        const indexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices),
            gl.STATIC_DRAW
        )
        return this
    }

    drawShape (positions: number[], arrays = false) {
        const { gl } = this.shapeDrawer.renderer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

        const size = 2          // 2 components per iteration
        const type = gl.FLOAT   // the data is 32bit floats
        const normalize = false // don't normalize the data
        const stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0        // start at the beginning of the buffer
        gl.vertexAttribPointer(this.attributeLocation, size, type, normalize, stride, offset)
        if (arrays) {
            gl.drawArrays(this.drawType, offset, positions.length / size)
        } else {
            gl.drawElements(this.drawType, positions.length / size, gl.UNSIGNED_SHORT, 0)
        }
    }
}

export class ShapeDrawer {
    constructor (public renderer: Renderer) {
        
    }
    private attributeToBuffer = new Map<string, VAO>()

    withAttribute (attributeName: string) {
        const { gl, program } = this.renderer
        const attributeLocation = gl.getAttribLocation(program, attributeName)
        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

        const vao = gl.createVertexArray()
        gl.bindVertexArray(vao)
        gl.enableVertexAttribArray(attributeLocation)
        return new DrawCallInstance(this, attributeLocation)
    }
}
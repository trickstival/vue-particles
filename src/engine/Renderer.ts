import { getShaderSources } from "./ShaderSources.static"
import { ShapeDrawer } from "./ShapeDrawer"
import { frame } from '../utils/frame'

interface RendererOptions {
    canvas: HTMLCanvasElement
    programName: string
}

export class Renderer {
    public gl: WebGL2RenderingContext
    public program: WebGLProgram
    public programName: string
    public shapeDrawer: ShapeDrawer

    constructor ({ canvas, programName }: RendererOptions) {
        this.programName = programName
        const gl = this.gl = canvas.getContext('webgl2', {
            antialias: true,
        })
        gl.clearColor(0, 0, 0, 0)

        this.resizeToDisplaySize(canvas)
        this.shapeDrawer = new ShapeDrawer(this)
    }

    resizeToDisplaySize (canvas: HTMLCanvasElement) {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        canvas.width = width
        canvas.height = height

        this.gl.viewport(0, 0, width, height)
    }

    createProgram () {
        const { gl } = this
        const program = gl.createProgram()
        const shaders = this.loadShaders()
        Object.values(shaders).forEach(shader => gl.attachShader(program, shader))
        gl.linkProgram(program)
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            gl.useProgram(program)
            this.program = program
            return program
        }
        
        gl.deleteProgram(program)
        throw new Error('Could not link gl program: ' + gl.getProgramInfoLog(program))
    }

    loadShaders () {
        const { gl, programName } = this
        const shaderSources = getShaderSources(programName)
        const shaders: Record<string, WebGLShader> = {}
        for (const shaderName in shaderSources) {
            const shaderDescriptor = shaderSources[shaderName]
            const shader = shaders[shaderName] = gl.createShader(shaderDescriptor.type)
            gl.shaderSource(shader, shaderDescriptor.source)
            gl.compileShader(shader)

            const success = this.gl.getShaderParameter(shader, gl.COMPILE_STATUS)
            if (!success) {
                gl.deleteShader(shader)
                throw new Error('Shader could not be compiled: ' + gl.getShaderInfoLog(shader))
            }
        }
        return shaders
    }

    async loop (callback: Function) {
        while (true) {
            await frame()
            if ((await callback()) === false) {
                return
            }
        }
    }
}

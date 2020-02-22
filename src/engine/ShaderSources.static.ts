import { readFileSync } from 'fs'

interface ShaderDescriptor {
    type: GLenum
    source: string
}

type ProgramSource = Record<string, ShaderDescriptor>

const {
    VERTEX_SHADER,
    FRAGMENT_SHADER
} = WebGL2RenderingContext

const SHADER_SOURCES: Record<string, ProgramSource> = {
    GL_CUBE: {
        FRAGMENT_SHADER: {
            type: FRAGMENT_SHADER,
            source: readFileSync(__dirname + '/../shaders/glCube/cubeFragment.shader', 'utf-8')
        },
        VERTEX_SHADER: {
            type: VERTEX_SHADER,
            source: readFileSync(__dirname + '/../shaders/glCube/cubeVertex.shader', 'utf-8')
        }
    }
}

export function getShaderSources (shaderSourceKey: string): Record<string, ShaderDescriptor> {
    for (const key of Object.keys(SHADER_SOURCES)) {
        if (key === shaderSourceKey) {
            return SHADER_SOURCES[key]
        }
    }
    return {}
}

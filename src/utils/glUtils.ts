export function generateRandomTriangles(count: number) {
    const vertices = count * 3 * 2
    const triangles = Array(vertices).fill(0)

    // Iterating over each triangle
    // Each triangle has 3 vertices, and each vertex
    // has two positions, so 3 * 2 = 6
    for (let i = 0; i < vertices; i += 6) {
        const randomPointX = Math.random() * 2 - 1
        const randomPointY = Math.random() * 2 - 1

        // Iterating over each vertex
        for (let j = i; j < i + 6; j += 2) {
            const fromPointX = j === i ? randomPointX : triangles[j - 2]
            const fromPointY = j === i ? randomPointY : triangles[j - 1]
            
            triangles[j] = fromPointX + (Math.random() - .5) / 4
            triangles[j + 1] = fromPointY + (Math.random() - .5) / 4
        }
    }

    return triangles
}

export function scale (positions: number[], scale: number) {
    return positions.map(position => position * scale)
}

export function sins (spacing = .1) {
    const sins = []
    const max = Math.PI * 2
    for (let i = 0; i <= max; i += spacing) {
        sins.push(Math.sin(i))
    }

    sins.push(0)

    return sins
}

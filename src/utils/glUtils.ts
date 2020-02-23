export function generateRandomTriangles(count: number) {
    const vertices = count * 3
    const triangles = Array(vertices).fill(0)
    for (let i = 0; i < vertices; i++) {
        triangles[i] = Math.random() * 2 - 1
    }

    return triangles
}

export function scale (positions: number[], scale: number) {
    return positions.map(position => position * scale)
}

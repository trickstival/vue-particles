export function frame () {
    return new Promise(requestAnimationFrame)
}

export function waitFor (milliseconds: number) {
    return new Promise(res => {
        setTimeout(res, milliseconds)
    })
}

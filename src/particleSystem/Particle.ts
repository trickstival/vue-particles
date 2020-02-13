export class Particle {
    // lifetime goes from 0 to 1
    public currentLifetime = 0
    public translation = {
      x: 0,
      y: 0
    }
    public opacity = 1

    public isAlive = false

    reset () {
        this.currentLifetime = 0
        this.translation.x = 0
        this.translation.y = 0
        this.opacity = 1
        this.isAlive = false
    }
}

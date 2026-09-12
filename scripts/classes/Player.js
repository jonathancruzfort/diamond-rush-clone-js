class Player {
    constructor() {
        this.width = 40
        this.height = 40
        this.velocity = 10

        this.position = {
            x: 0,
            y: 0,
        }
    }

    moveLeft() {
        this.position.x -= this.velocity
    }
    moveRight() {
        this.position.x += this.velocity
    }
    moveUp() {
        this.position.y -= this.velocity
    }
    moveDown() {
        this.position.y += this.velocity
    }

    draw(ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export default Player
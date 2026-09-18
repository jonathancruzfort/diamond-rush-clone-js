class Player {
    constructor(x = 7, y = 262) {
        this.size = 80 // Tamanho do bloco (20x20)
        this.width = this.size
        this.height = this.size
        this.position = { x: x, y: y }
    }

    // Move exatamente 1 bloco (20px) por comando
    moveLeft() {
        this.position.x -= this.size
    }
    moveRight() {
        this.position.x += this.size
    }
    moveUp() {
        this.position.y -= this.size
    }
    moveDown() {
        this.position.y += this.size
    }

    draw(ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export default Player
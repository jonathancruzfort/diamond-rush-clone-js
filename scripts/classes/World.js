class World {
    constructor() {
        this.width = 1440
        this.height = 960
        this.image = new Image()
        this.image.src = "../assets/images/cenarioTeste.jpeg"
    }

    isOutOfBounds(position, size) {
        return {
            left: position.x < 0,
            right: position.x + size.width > this.width,
            top: position.y < 0,
            bottom: position.y + size.height > this.height
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.width, this.height)
    }
}

export default World
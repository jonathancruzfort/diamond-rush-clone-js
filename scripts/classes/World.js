class World {
    constructor() {
        this.width = 1440
        this.height = 960
        this.image = new Image()
        this.image.src = "../assets/images/cenarioTeste.jpeg"

        this.walls = [
            { x: 327, y: 22, width: 80, height: 80 },
            { x: 7, y: 102, width: 320, height: 80 },
            { x: 7, y: 342, width: 240, height: 80 },
            { x: 167, y: 422, width: 80, height: 160 },
            { x: 7, y: 582, width: 160, height: 80 },
            { x: 407, y: 422, width: 80, height: 80 },
            { x: 407, y: 502, width: 320, height: 80 },
            { x: 407, y: 582, width: 640, height: 80 },
            { x: 7, y: 822, width: 1280, height: 80 },
            { x: 1287, y: 182, width: 80, height: 640 },
            { x: 967, y: 342, width: 320, height: 80 },
            { x: 967, y: 262, width: 320, height: 80 },
            { x: 327, y: 342, width: 80, height: 240 },
        ]
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        )
    }

    willCollideWithWall(futurePlayerRect) {
        return this.walls.some(wall => this.checkCollision(futurePlayerRect, wall))
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.width, this.height)

        // OPCIONAL (Para Debug): Desenha as paredes em vermelho para você visualizar onde estão
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
        // this.walls.forEach(wall => {
        //     ctx.fillRect(wall.x, wall.y, wall.width, wall.height)
        // })
    }
}

export default World
import Player from "./classes/Player.js"
import World from "./classes/World.js"

export default {
    canvas: null,
    ctx: null,
    player: null,
    world: null,

    camera: { x: 0, y: 0 },
    deadzone: { width: 300, height: 200 },
    keys: { left: false, up: false, right: false, down: false },

    load() {
        this.setCanvas()
        this.setSprits()
        this.setEvents()
        this.gameLoop()
    },

    setCanvas() {
        this.canvas = document.querySelector('canvas')
        this.canvas.width = 800
        this.canvas.height = 600
        this.ctx = this.canvas.getContext('2d')
    },

    setSprits() {
        this.world = new World()
        this.player = new Player()
    },

    setEvents() {
        addEventListener('keydown', this.startMoviment.bind(this))
        
        // Evento keyup para avisar quando o jogador soltou as setas
        addEventListener('keyup', this.stopMoviment.bind(this))
    },

    updateCamera() {
        // 1. Calcula o destino da câmera com base na Posição Visual do jogador (renderPosition)
        const targetCameraX = this.player.renderPosition.x - (this.canvas.width - this.player.width) / 2
        const targetCameraY = this.player.renderPosition.y - (this.canvas.height - this.player.height) / 2

        // 2. Interpolação suave para a câmera (0.1 = suavidade)
        this.camera.x += (targetCameraX - this.camera.x) * 0.1
        this.camera.y += (targetCameraY - this.camera.y) * 0.1

        // 3. Aplica os limites do mundo
        this.camera.x = Math.max(0, Math.min(this.world.width - this.canvas.width, this.camera.x))
        this.camera.y = Math.max(0, Math.min(this.world.height - this.canvas.height, this.camera.y))
    },

    gameLoop() {
        this.updateCamera()

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()

        this.ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y))
        this.world.draw(this.ctx)
        
        // O player.draw(ctx) agora gerencia o update() e updateAnimation() internamente!
        this.player.draw(this.ctx)

        this.ctx.restore()

        requestAnimationFrame(this.gameLoop.bind(this))
    },

    startMoviment(e) {
        // Avisa que há uma tecla de movimento sendo pressionada
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
            this.player.isKeyDown = true
        }

        if (!this.player.canMove()) return

        let nextX = this.player.position.x
        let nextY = this.player.position.y

        if (e.key === 'ArrowLeft') nextX -= this.player.size
        if (e.key === 'ArrowRight') nextX += this.player.size
        if (e.key === 'ArrowUp') nextY -= this.player.size
        if (e.key === 'ArrowDown') nextY += this.player.size

        if (nextX === this.player.position.x && nextY === this.player.position.y) return

        const futureRect = {
            x: nextX,
            y: nextY,
            width: this.player.width,
            height: this.player.height
        }

        const isWithinBounds =
            nextX >= 0 &&
            nextX <= this.world.width - this.player.width &&
            nextY >= 0 &&
            nextY <= this.world.height - this.player.height

        if (isWithinBounds && !this.world.willCollideWithWall(futureRect)) {
            if (e.key === 'ArrowLeft') this.player.moveLeft()
            if (e.key === 'ArrowRight') this.player.moveRight()
            if (e.key === 'ArrowUp') this.player.moveUp()
            if (e.key === 'ArrowDown') this.player.moveDown()
        }
    },

    stopMoviment(e) {
        // Avisa quando as teclas de direção foram soltas
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
            this.player.isKeyDown = false
        }
    }
}
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
        addEventListener('keyup', this.stopMoviment.bind(this))
    },

    updateCamera() {
        const deadzoneLeft = this.camera.x + (this.canvas.width - this.deadzone.width) / 2
        const deadzoneRight = deadzoneLeft + this.deadzone.width
        const deadzoneTop = this.camera.y + (this.canvas.height - this.deadzone.height) / 2
        const deadzoneBottom = deadzoneTop + this.deadzone.height

        if (this.player.position.x < deadzoneLeft) {
            this.camera.x -= deadzoneLeft - this.player.position.x
        } else if (this.player.position.x + this.player.width > deadzoneRight) {
            this.camera.x += (this.player.position.x + this.player.width) - deadzoneRight
        }

        if (this.player.position.y < deadzoneTop) {
            this.camera.y -= deadzoneTop - this.player.position.y
        } else if (this.player.position.y + this.player.height > deadzoneBottom) {
            this.camera.y += (this.player.position.y + this.player.height) - deadzoneBottom
        }

        // Limita a câmera usando os dados da classe World
        this.camera.x = Math.max(0, Math.min(this.world.width - this.canvas.width, this.camera.x))
        this.camera.y = Math.max(0, Math.min(this.world.height - this.canvas.height, this.camera.y))
    },

    gameLoop() {
        this.handleInputs()
        this.updateCamera()

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()
        
        this.ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y))
        this.world.draw(this.ctx)
        this.player.draw(this.ctx)

        this.ctx.restore()

        requestAnimationFrame(this.gameLoop.bind(this))
    },

    handleInputs() {
        if (this.keys.left && this.player.position.x >= 0)
            this.player.moveLeft()

        if (this.keys.up && this.player.position.y >= 0)
            this.player.moveUp()

        if (this.keys.right && this.player.position.x <= this.world.width - this.player.width)
            this.player.moveRight()

        if (this.keys.down && this.player.position.y <= this.world.height - this.player.height)
            this.player.moveDown()
    },

    startMoviment(e) {
        if (e.key === 'ArrowUp') this.keys.up = true
        if (e.key === 'ArrowDown') this.keys.down = true
        if (e.key === 'ArrowLeft') this.keys.left = true
        if (e.key === 'ArrowRight') this.keys.right = true
    },

    stopMoviment(e) {
        if (e.key === 'ArrowUp') this.keys.up = false
        if (e.key === 'ArrowDown') this.keys.down = false
        if (e.key === 'ArrowLeft') this.keys.left = false
        if (e.key === 'ArrowRight') this.keys.right = false
    },
}
import Player from "./classes/Player.js"

export default {
    canvas: null,
    ctx: null,
    player: null,
    keys: { left: false, up: false, right: false, down: false, },

    load() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 800
        this.canvas.height = 600

        this.player = new Player()

        window.addEventListener('keydown', this.startMoviment.bind(this))
        window.addEventListener('keyup', this.stopMoviment.bind(this)) 

        this.gameLoop()
        console.log('teste');
        
    },

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if (this.keys.left &&
        this.player.position.x >= 0)
            this.player.moveLeft()

        if (this.keys.up &&
        this.player.position.y >= 0)
            this.player.moveUp()

        if (this.keys.right &&
        this.player.position.x <= this.canvas.width - this.player.width)
            this.player.moveRight()

        if (this.keys.down &&
        this.player.position.y <= this.canvas.height - this.player.height)
            this.player.moveDown()

        this.player.draw(this.ctx)
        requestAnimationFrame(this.gameLoop.bind(this))
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
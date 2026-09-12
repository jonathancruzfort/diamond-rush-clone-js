import Player from "./classes/Player.js"

export default {
    load() {
        const canvas = document.querySelector('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = 800
        canvas.height = 600

        const player = new Player()

        const keys = {
            left: false,
            up: false,
            right: false,
            down: false,
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') keys.up = true
            if (e.key === 'ArrowDown') keys.down = true
            if (e.key === 'ArrowLeft') keys.left = true
            if (e.key === 'ArrowRight') keys.right = true
        })
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') keys.up = false
            if (e.key === 'ArrowDown') keys.down = false
            if (e.key === 'ArrowLeft') keys.left = false
            if (e.key === 'ArrowRight') keys.right = false
        })

        this.gameLoop(player, ctx, canvas, keys)
    },

    gameLoop(player, ctx, canvas, keys) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (keys.left && player.position.x >= 0) {
            player.moveLeft()
        }
        if (keys.up && player.position.y >= 0) {
            player.moveUp()
        }
        if (keys.right && player.position.x <= canvas.width - player.width) {
            player.moveRight()
        }
        if (keys.down && player.position.y <= canvas.height - player.height) {
            player.moveDown()
        }

        player.draw(ctx)
        requestAnimationFrame(t => this.gameLoop(player, ctx, canvas, keys))
    }
}
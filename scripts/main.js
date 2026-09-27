import Player from "./classes/Player.js"
import Rock from "./classes/Rock.js"
import World from "./classes/World.js"

export default {
    canvas: null,
    ctx: null,
    player: null,
    rock: null,
    world: null,

    camera: { x: 0, y: 0 },
    keys: { left: false, right: false, up: false, down: false },

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
        this.rock = new Rock()
    },

    setEvents() {
        addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { this.keys.left = true; this.player.isKeyDown = true }
            if (e.key === 'ArrowRight') { this.keys.right = true; this.player.isKeyDown = true }
            if (e.key === 'ArrowUp') { this.keys.up = true; this.player.isKeyDown = true }
            if (e.key === 'ArrowDown') { this.keys.down = true; this.player.isKeyDown = true }
        })

        addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') this.keys.left = false
            if (e.key === 'ArrowRight') this.keys.right = false
            if (e.key === 'ArrowUp') this.keys.up = false
            if (e.key === 'ArrowDown') this.keys.down = false

            // Se nenhuma tecla estiver pressionada, libera a trava do player
            if (!this.keys.left && !this.keys.right && !this.keys.up && !this.keys.down) {
                this.player.isKeyDown = false
            }
        })
    },

   handleMovement() {
    let direction = null

    if (this.keys.left)       direction = 'left'
    else if (this.keys.right) direction = 'right'
    else if (this.keys.up)    direction = 'up'
    else if (this.keys.down)  direction = 'down'

    if (!direction) return

    this.player.turn(direction)

    if (!this.player.canMove()) return

    // Calcula para onde o player quer ir
    let nextX = this.player.position.x
    let nextY = this.player.position.y

    if (direction === 'left')  nextX -= this.player.size
    if (direction === 'right') nextX += this.player.size
    if (direction === 'up')    nextY -= this.player.size
    if (direction === 'down')  nextY += this.player.size

    const playerFutureRect = {
        x: nextX,
        y: nextY,
        width: this.player.width,
        height: this.player.height
    }

    // 1. Verifica limites do mapa e paredes para o player
    const isWithinBounds =
        nextX >= 0 &&
        nextX <= this.world.width - this.player.width &&
        nextY >= 0 &&
        nextY <= this.world.height - this.player.height

    if (!isWithinBounds || this.world.willCollideWithWall(playerFutureRect)) {
        return // Bateu na parede ou fora da tela
    }

    // 2. Colisão do Player com a Pedra
    const isCollidingWithRock =
        nextX === this.rock.position.x &&
        nextY === this.rock.position.y

    if (isCollidingWithRock) {
        // Se a pedra estiver em movimento, o jogador não pode andar
        if (this.rock.isMoving) return

        // Calcula a próxima posição da pedra
        let rockNextX = this.rock.position.x
        let rockNextY = this.rock.position.y

        if (direction === 'left')  rockNextX -= this.rock.size
        if (direction === 'right') rockNextX += this.rock.size
        if (direction === 'up')    rockNextY -= this.rock.size
        if (direction === 'down')  rockNextY += this.rock.size

        const rockFutureRect = {
            x: rockNextX,
            y: rockNextY,
            width: this.rock.width,
            height: this.rock.height
        }

        const isRockInBounds =
            rockNextX >= 0 &&
            rockNextX <= this.world.width - this.rock.width &&
            rockNextY >= 0 &&
            rockNextY <= this.world.height - this.rock.height

        // Se a pedra pode se mover (sem parede na frente e dentro da tela)
        if (isRockInBounds && !this.world.willCollideWithWall(rockFutureRect)) {
            this.rock.push(direction) // Empurra a pedra
        } else {
            return // Pedra bloqueada por parede ou fora do mapa, bloqueia o player também
        }
    }

    // 3. Move o jogador se o caminho estiver livre (ou se empurrou a pedra com sucesso)
    if (direction === 'left')  this.player.moveLeft()
    if (direction === 'right') this.player.moveRight()
    if (direction === 'up')    this.player.moveUp()
    if (direction === 'down')  this.player.moveDown()
},

    updateCamera() {
        const targetCameraX = this.player.renderPosition.x - (this.canvas.width - this.player.width) / 2
        const targetCameraY = this.player.renderPosition.y - (this.canvas.height - this.player.height) / 2

        this.camera.x += (targetCameraX - this.camera.x) * 0.1
        this.camera.y += (targetCameraY - this.camera.y) * 0.1

        this.camera.x = Math.max(0, Math.min(this.world.width - this.canvas.width, this.camera.x))
        this.camera.y = Math.max(0, Math.min(this.world.height - this.canvas.height, this.camera.y))
    },

    gameLoop() {
        this.handleMovement()
        this.updateCamera()

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()

        this.ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y))
        this.world.draw(this.ctx)
        this.player.draw(this.ctx)
        this.rock.draw(this.ctx, this.world)

        this.ctx.restore()

        requestAnimationFrame(this.gameLoop.bind(this))
    }
}
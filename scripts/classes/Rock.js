class Rock {
    constructor(x = 87, y = 262) {
        this.size = 80
        this.width = this.size
        this.height = this.size

        this.position = { x: x, y: y }
        this.renderPosition = { x: x, y: y }

        this.moveSpeed = 4
        this.isMoving = false
        this.isFalling = false // Indica se está em queda livre por gravidade

        this.angle = 0
        this.rotationSpeed = 0.08
    }

    push(direction) {
        // Se a pedra está se movendo ou caindo, não pode ser empurrada
        if (this.isMoving || this.isFalling) return false

        if (direction === 'left')  this.position.x -= this.size
        if (direction === 'right') this.position.x += this.size
        if (direction === 'up')    this.position.y -= this.size
        if (direction === 'down')  this.position.y += this.size

        return true
    }

    // Checa se há algo sustentando a pedra embaixo
    checkGravity(world) {
        // Garante que a pedra terminou TOTALMENTE o movimento horizontal/anterior
        const isAlignedX = this.position.x === this.renderPosition.x
        const isAlignedY = this.position.y === this.renderPosition.y

        // Só verifica a gravidade se a pedra estiver 100% parada no grid
        if (this.isMoving || !isAlignedX || !isAlignedY) return

        const belowY = this.position.y + this.size

        const tileBelow = {
            x: this.position.x,
            y: belowY,
            width: this.width,
            height: this.height
        }

        const isWithinBottom = belowY <= world.height - this.height
        const hasWallBelow = world.willCollideWithWall(tileBelow)

        // Se NÃO tem chão/parede embaixo E está dentro do mapa
        if (!hasWallBelow && isWithinBottom) {
            this.position.y = belowY // Altera a posição do grid para baixo
            this.isFalling = true
        } else {
            this.isFalling = false
        }
    }

    update(world) {
        // 1. Checa gravidade se o 'world' for passado
        if (world && !this.isMoving) {
            this.checkGravity(world)
        }

        const dx = this.position.x - this.renderPosition.x
        const dy = this.position.y - this.renderPosition.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0) {
            this.isMoving = true

            // Gira o "X" na pedra ao mover
            if (dx > 0 || dy > 0) {
                this.angle += this.rotationSpeed
            } else {
                this.angle -= this.rotationSpeed
            }

            if (distance <= this.moveSpeed) {
                this.renderPosition.x = this.position.x
                this.renderPosition.y = this.position.y
                this.isMoving = false
            } else {
                this.renderPosition.x += (dx / distance) * this.moveSpeed
                this.renderPosition.y += (dy / distance) * this.moveSpeed
            }
        } else {
            this.isMoving = false
        }
    }

    draw(ctx, world) {
        this.update(world) // Passamos o mundo para processar a física de gravidade

        ctx.save()

        const centerX = Math.round(this.renderPosition.x) + this.width / 2
        const centerY = Math.round(this.renderPosition.y) + this.height / 2

        ctx.translate(centerX, centerY)
        ctx.rotate(this.angle)

        const radius = this.size / 2 - 4

        // 1. Corpo da Pedra
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.fillStyle = '#708090'
        ctx.fill()
        ctx.lineWidth = 4
        ctx.strokeStyle = '#2f4f4f'
        ctx.stroke()

        // 2. Detalhe em "X" para rotação
        const xOffset = radius * 0.5
        ctx.beginPath()
        ctx.moveTo(-xOffset, -xOffset)
        ctx.lineTo(xOffset, xOffset)
        ctx.moveTo(xOffset, -xOffset)
        ctx.lineTo(-xOffset, xOffset)

        ctx.lineWidth = 5
        ctx.strokeStyle = '#d3d3d3'
        ctx.stroke()

        ctx.restore()
    }
}

export default Rock
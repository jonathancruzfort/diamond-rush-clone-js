class Player {
    constructor(x = 7, y = 262) {
        this.size = 80
        this.width = this.size
        this.height = this.size

        this.position = { x: x, y: y }
        this.renderPosition = { x: x, y: y }

        this.isLoaded = false
        this.sprite = new Image()
        this.sprite.src = "./assets/images/braid.png"

        this.sprite.onload = () => {
            this.isLoaded = true
        }

        this.totalFrames = 24
        this.frameWidth = 1656 / this.totalFrames
        this.frameHeight = 83

        this.currentFrame = 0
        this.frameTimer = 0
        this.frameInterval = 1

        this.moveSpeed = 8
        this.isMoving = false
        this.isKeyDown = false
        this.facingLeft = false

        // Delay para sair correndo após virar
        this.lastTurnTime = 0
        this.turnDelay = 350 // Aumentado para 250ms (ajuste conforme o gosto)
    }

    canMove() {
        const now = Date.now()
        const isCoolingDown = (now - this.lastTurnTime) < this.turnDelay
        return !this.isMoving && !isCoolingDown
    }

    turn(facingLeft) {
        if (this.facingLeft !== facingLeft) {
            this.facingLeft = facingLeft
            this.lastTurnTime = Date.now()
            this.currentFrame = 0 // Fica no frame parado durante o delay
        }
    }

    updateAnimation() {
        this.frameTimer++
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames
        }
    }

    update() {
        const dx = this.position.x - this.renderPosition.x
        const dy = this.position.y - this.renderPosition.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0) {
            this.isMoving = true
            this.updateAnimation()

            if (distance <= this.moveSpeed) {
                this.renderPosition.x = this.position.x
                this.renderPosition.y = this.position.y
                this.isMoving = false

                if (!this.isKeyDown) {
                    this.currentFrame = 0
                }
            } else {
                this.renderPosition.x += (dx / distance) * this.moveSpeed
                this.renderPosition.y += (dy / distance) * this.moveSpeed
            }
        } else {
            this.isMoving = false
            if (!this.isKeyDown) {
                this.currentFrame = 0
            }
        }
    }

    moveLeft() { 
        if (this.canMove()) {
            this.position.x -= this.size 
            this.facingLeft = true
        }
    }

    moveRight() { 
        if (this.canMove()) {
            this.position.x += this.size 
            this.facingLeft = false
        }
    }

    moveUp() { 
        if (this.canMove()) this.position.y -= this.size 
    }

    moveDown() { 
        if (this.canMove()) this.position.y += this.size 
    }

    draw(ctx) {
        if (!this.isLoaded) return

        this.update()

        const sourceX = this.currentFrame * this.frameWidth

        ctx.save()

        const centerX = Math.round(this.renderPosition.x) + this.width / 2
        const centerY = Math.round(this.renderPosition.y) + this.height / 2

        ctx.translate(centerX, centerY)

        if (this.facingLeft) {
            ctx.scale(-1, 1)
        }

        ctx.drawImage(
            this.sprite,
            sourceX,
            0,
            this.frameWidth,
            this.frameHeight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )

        ctx.restore()
    }
}

export default Player
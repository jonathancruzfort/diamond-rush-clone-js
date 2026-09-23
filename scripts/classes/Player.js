class Player {
    constructor(x = 7, y = 262) {
        this.size = 80
        this.width = this.size
        this.height = this.size

        // Posição lógica (destino na grade)
        this.position = { x: x, y: y }

        // Posição visual (deslocamento contínuo)
        this.renderPosition = { x: x, y: y }

        this.isLoaded = false
        this.sprite = new Image()
        this.sprite.src = "./assets/images/braid.png"

        this.sprite.onload = () => {
            this.isLoaded = true
        }

        // Configuração dos Quadros
        this.totalFrames = 24
        this.frameWidth = 1656 / this.totalFrames
        this.frameHeight = 83

        // Animação
        this.currentFrame = 0
        this.frameTimer = 0
        this.frameInterval = .5

        // Movimento Linear Constante
        this.moveSpeed = 8 // Ajuste fino da velocidade (pixels por frame)
        this.isMoving = false
        this.isKeyDown = false // Controla se o jogador ainda está segurando alguma tecla

        // Direção do Sprite (false = Direita, true = Esquerda)
        this.facingLeft = false
    }

    // O jogador só aceita um novo comando quando termina de andar a casa atual
    canMove() {
        return !this.isMoving
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
            this.updateAnimation() // Continua a animação do sprite suavemente

            // Deslocamento a velocidade constante
            if (distance <= this.moveSpeed) {
                // Ao chegar na célula final
                this.renderPosition.x = this.position.x
                this.renderPosition.y = this.position.y
                this.isMoving = false

                // Só reseta a pose se o jogador tiver soltado as teclas
                if (!this.isKeyDown) {
                    this.currentFrame = 0
                }
            } else {
                // Move o personagem passo a passo
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

        if (this.facingLeft) {
            ctx.scale(-1, 1)
            ctx.drawImage(
                this.sprite,
                sourceX,
                0,
                this.frameWidth,
                this.frameHeight,
                -this.renderPosition.x - this.width,
                this.renderPosition.y,
                this.width,
                this.height
            )
        } else {
            ctx.drawImage(
                this.sprite,
                sourceX,
                0,
                this.frameWidth,
                this.frameHeight,
                this.renderPosition.x,
                this.renderPosition.y,
                this.width,
                this.height
            )
        }

        ctx.restore()
    }
}

export default Player
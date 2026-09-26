class Player {
    constructor(x = 7, y = 262) {
        this.size = 80
        this.width = this.size
        this.height = this.size

        this.position = { x: x, y: y }
        this.renderPosition = { x: x, y: y }

        this.isLoaded = false
        this.sprite = new Image()
        this.sprite.src = "./assets/images/spritesheet.png"

        this.sprite.onload = () => {
            this.isLoaded = true
        }

        /* 
           CONFIGURAÇÃO INDIVIDUAL DE CADA ANIMAÇÃO
        */
        this.animations = {
            IDLE:      { y: 1610, frameWidth: 64, height: 50, totalFrames: 2, frameInterval: 14 },
            WALK_DOWN: { y: 1354, frameWidth: 64, height: 50, totalFrames: 6, frameInterval: 4 },
            WALK_UP:   { y: 1354, frameWidth: 64, height: 50, totalFrames: 6, frameInterval: 4 },
            WALK_SIDE: { y: 715,  frameWidth: 64, height: 50, totalFrames: 9, frameInterval: 4 }
        }

        this.currentAnim = this.animations.IDLE

        // Animação
        this.currentFrame = 0
        this.frameTimer = 0

        // Movimento
        this.moveSpeed = 4
        this.isMoving = false
        this.isKeyDown = false

        // Direção ('left', 'right', 'up', 'down')
        this.facingDirection = 'down'
        this.facingLeft = false

        // Delay para virar
        this.lastTurnTime = 0
        this.turnDelay = 250
    }

    setAnimation(anim) {
        if (this.currentAnim !== anim) {
            this.currentAnim = anim
            this.currentFrame = 0
            this.frameTimer = 0
        }
    }

    canMove() {
        const now = Date.now()
        const isCoolingDown = (now - this.lastTurnTime) < this.turnDelay
        return !this.isMoving && !isCoolingDown
    }

    turn(direction) {
        if (this.facingDirection !== direction) {
            this.facingDirection = direction
            this.lastTurnTime = Date.now()

            if (direction === 'left') {
                this.facingLeft = true
                this.setAnimation(this.animations.WALK_SIDE)
            } else if (direction === 'right') {
                this.facingLeft = false
                this.setAnimation(this.animations.WALK_SIDE)
            } else if (direction === 'up') {
                this.setAnimation(this.animations.WALK_UP)
            } else if (direction === 'down') {
                this.setAnimation(this.animations.WALK_DOWN)
            }
        }
    }

    updateAnimation() {
        // Se estiver parado E virado para cima ou para baixo, congela no frame atual
        const isVertical = this.facingDirection === 'up' || this.facingDirection === 'down'
        if (!this.isMoving && isVertical && !this.isKeyDown) {
            return // Não avança os frames
        }

        this.frameTimer++
        const interval = this.currentAnim.frameInterval || 4
        if (this.frameTimer >= interval) {
            this.frameTimer = 0
            this.currentFrame = (this.currentFrame + 1) % this.currentAnim.totalFrames
        }
    }

    update() {
        const dx = this.position.x - this.renderPosition.x
        const dy = this.position.y - this.renderPosition.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0) {
            this.isMoving = true

            if (distance <= this.moveSpeed) {
                this.renderPosition.x = this.position.x
                this.renderPosition.y = this.position.y
                this.isMoving = false

                this.handleStop()
            } else {
                this.renderPosition.x += (dx / distance) * this.moveSpeed
                this.renderPosition.y += (dy / distance) * this.moveSpeed
            }
        } else {
            this.isMoving = false
            this.handleStop()
        }

        // Atualiza a animação após calcular o estado de movimento
        this.updateAnimation()
    }

    // Auxiliar para tratar quando o personagem termina o passo ou para
    handleStop() {
        if (!this.isKeyDown) {
            // Se for para os lados, usa a animação de IDLE
            if (this.facingDirection === 'left' || this.facingDirection === 'right') {
                this.setAnimation(this.animations.IDLE)
            } 
            // Se for 'up' ou 'down', mantém a animação WALK_UP ou WALK_DOWN,
            // mas o updateAnimation() vai congelar o frame no lugar exato.
        }
    }

    moveLeft() {
        if (this.canMove()) {
            this.position.x -= this.size
            this.facingDirection = 'left'
            this.facingLeft = true
            this.setAnimation(this.animations.WALK_SIDE)
        }
    }

    moveRight() {
        if (this.canMove()) {
            this.position.x += this.size
            this.facingDirection = 'right'
            this.facingLeft = false
            this.setAnimation(this.animations.WALK_SIDE)
        }
    }

    moveUp() {
        if (this.canMove()) {
            this.position.y -= this.size
            this.facingDirection = 'up'
            this.setAnimation(this.animations.WALK_UP)
        }
    }

    moveDown() {
        if (this.canMove()) {
            this.position.y += this.size
            this.facingDirection = 'down'
            this.setAnimation(this.animations.WALK_DOWN)
        }
    }

    draw(ctx) {
        if (!this.isLoaded) return

        this.update()

        const frameWidth = this.currentAnim.frameWidth
        const sourceX = this.currentFrame * frameWidth
        const sourceY = this.currentAnim.y
        const sourceHeight = this.currentAnim.height

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
            sourceY,
            frameWidth,
            sourceHeight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )

        ctx.restore()
    }
}

export default Player
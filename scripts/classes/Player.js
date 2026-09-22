class Player {
    constructor(x = 7, y = 262) {
        this.size = 80 // Tamanho no mundo (80x80)
        this.width = this.size
        this.height = this.size
        this.position = { x: x, y: y }

        this.isLoaded = false

        this.sprite = new Image()
        this.sprite.src = "./assets/images/braid.png"

        this.sprite.onload = () => {
            this.isLoaded = true
        }

        // --- Configuração das Dimensões dos Quadros ---
        this.totalFrames = 24                // Total de posições na imagem
        this.frameWidth = 1656 / this.totalFrames // ~152.6px por quadro
        this.frameHeight = 83              // Altura total da imagem

        // --- Controle da Animação ---
        this.currentFrame = 0   // Índice do quadro atual (0 a 4)
        this.frameTimer = 0     // Contador para controlar a velocidade da troca
        this.frameInterval = 3 // Velocidade da troca de quadros do sprite

        // --- Controle de Velocidade do Movimento (Cooldown) ---
        this.lastStepTime = 0   // Guarda o tempo do último passo
        this.stepCooldown = 50 // Tempo em milissegundos entre cada passo (aumente para desacelerar)
    }

    // Verifica se já passou o tempo necessário para dar o próximo passo
    canMove() {
        const now = Date.now()
        if (now - this.lastStepTime >= this.stepCooldown) {
            this.lastStepTime = now
            return true
        }
        return false
    }

    // Método para atualizar o quadro da animação
    updateAnimation() {
        this.frameTimer++
        
        // A cada X iterações, avança para o próximo quadro
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0
            // Avança o frame e volta para 0 quando chega no último (loop)
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames
        }
    }

    moveLeft() {
        this.position.x -= this.size
        this.updateAnimation()
    }
    moveRight() {
        this.position.x += this.size
        this.updateAnimation()
    }
    moveUp() {
        this.position.y -= this.size
        this.updateAnimation()
    }
    moveDown() {
        this.position.y += this.size
        this.updateAnimation()
    }

    draw(ctx) {
        if (!this.isLoaded) return

        // Posição X inicial do recorte na imagem original
        const sourceX = this.currentFrame * this.frameWidth

        ctx.drawImage(
            this.sprite,
            sourceX,          // X do recorte na imagem original
            0,                // Y do recorte (como só tem 1 linha, é 0)
            this.frameWidth,  // Largura de 1 quadro (152.6)
            this.frameHeight, // Altura de 1 quadro (203)
            this.position.x,  // Posição X no Canvas
            this.position.y,  // Posição Y no Canvas
            this.width,       // Desenha na tela com largura (80px)
            this.height       // Desenha na tela com altura (80px)
        )
    }
}

export default Player


// class Player {
//     constructor(x = 7, y = 262) {
//         this.size = 80
//         this.width = this.size
//         this.height = this.size
//         this.position = { x: x, y: y }

//         this.sprite = new Image()
//         this.sprite.src = "../assets/images/personagem.png"

//         this.frameX = 0 // Posição X inicial no sprite sheet
//         this.frameY = 0 // Posição Y inicial no sprite sheet
//         this.frameWidth = 32  // Largura de cada quadro na imagem do sprite
//         this.frameHeight = 32 // Altura de cada quadro na imagem do sprite
//     }

//     moveLeft() {
//         this.position.x -= this.size
//     }

//     moveRight() {
//         this.position.x += this.size
//     }

//     moveUp() {
//         this.position.y -= this.size
//     }

//     moveDown() {
//         this.position.y += this.size
//     }

//     draw(ctx) {
//         // Sintaxe do drawImage com recorte:
//         // ctx.drawImage(imagem, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//         // 's' = Source (Recorte na imagem original)
//         // 'd' = Destination (Posição e tamanho no Canvas)

//         ctx.drawImage(
//             this.sprite,
//             this.frameX,
//             this.frameY,
//             this.frameWidth,
//             this.frameHeight,
//             this.position.x,
//             this.position.y,
//             this.width,
//             this.height
//         )
//     }
// }

// class Player {
//     constructor(x = 7, y = 262) {
//         this.size = 80 // Tamanho do bloco (20x20)
//         this.width = this.size
//         this.height = this.size
//         this.position = { x: x, y: y }
//     }

//     // Move exatamente 1 bloco (20px) por comando
//     moveLeft() {
//         this.position.x -= this.size
//     }
//     moveRight() {
//         this.position.x += this.size
//     }
//     moveUp() {
//         this.position.y -= this.size
//     }
//     moveDown() {
//         this.position.y += this.size
//     }

//     draw(ctx) {
//         ctx.fillStyle = 'black'
//         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
//     }
// }

// export default Player
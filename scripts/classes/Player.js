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

        // --- Configuração das Linhas e Colunas do Sprite ---
        this.totalRows = 5
        this.imageWidth = 837
        this.imageHeight = 577

        // Quantidade de quadros em cada uma das 5 linhas (índices 0 a 4)
        this.framesPerRow = [12, 11, 9, 9, 8]

        // Altura fixa para qualquer linha (859 / 5 = 171.8px)
        this.frameHeight = this.imageHeight / this.totalRows

        // --- Controle do Quadro e Linha Atual ---
        this.currentLine = 0    // Linha atual da animação (0 a 4)
        this.currentFrame = 0   // Quadro atual da linha
        this.frameTimer = 0     // Contador da animação
        this.frameInterval = 10 // Velocidade da troca de quadros

        // --- Controle de Velocidade do Movimento (Cooldown) ---
        this.lastStepTime = 0
        this.stepCooldown = 150 // Tempo em ms entre cada passo
    }

    // Retorna a largura de 1 quadro específico da linha atual
    getFrameWidth() {
        const totalColumnsInRow = this.framesPerRow[this.currentLine]
        return this.imageWidth / totalColumnsInRow
    }

    // Verifica se pode dar o próximo passo
    canMove() {
        const now = Date.now()
        if (now - this.lastStepTime >= this.stepCooldown) {
            this.lastStepTime = now
            return true
        }
        return false
    }

    // Atualiza o quadro respeitando o limite máximo da linha ativa
    updateAnimation() {
        this.frameTimer++

        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0
            const maxFramesInCurrentRow = this.framesPerRow[this.currentLine]
            this.currentFrame = (this.currentFrame + 1) % maxFramesInCurrentRow
        }
    }

    // Define a linha de animação desejada e troca de quadro
    setAnimationLine(lineIndex) {
        if (this.currentLine !== lineIndex) {
            this.currentLine = lineIndex
            this.currentFrame = 0 // Reinicia no primeiro quadro da nova linha
        }
    }

    moveLeft() {
        this.position.x -= this.size
        this.setAnimationLine(0) // Altere para o índice da linha de andar para a esquerda
        this.updateAnimation()
    }
    moveRight() {
        this.position.x += this.size
        this.setAnimationLine(1) // Altere para o índice da linha de andar para a direita
        this.updateAnimation()
    }
    moveUp() {
        this.position.y -= this.size
        this.setAnimationLine(2) // Altere para o índice da linha de andar para cima
        this.updateAnimation()
    }
    moveDown() {
        this.position.y += this.size
        this.setAnimationLine(3) // Altere para o índice da linha de andar para baixo
        this.updateAnimation()
    }

    draw(ctx) {
        if (!this.isLoaded) return

        const currentFrameWidth = this.getFrameWidth()

        // Posição exata do recorte na imagem original
        const sourceX = this.currentFrame * currentFrameWidth
        const sourceY = this.currentLine * this.frameHeight

        ctx.drawImage(
            this.sprite,
            sourceX,           // X inicial do recorte na folha de sprites
            sourceY,           // Y inicial do recorte na folha de sprites
            currentFrameWidth, // Largura calculada dinamicamente para a linha atual
            this.frameHeight,  // Altura fixa de 1 linha (171.8px)
            this.position.x,   // X no Canvas
            this.position.y,   // Y no Canvas
            this.width,        // Largura do personagem (80px)
            this.height        // Altura do personagem (80px)
        )
    }
}

export default Player
// class Player {
//     constructor(x = 7, y = 262) {
//         this.size = 80 // Tamanho no mundo (80x80)
//         this.width = this.size
//         this.height = this.size
//         this.position = { x: x, y: y }

//         this.isLoaded = false

//         this.sprite = new Image()
//         this.sprite.src = "./assets/images/personagem.png"

//         this.sprite.onload = () => {
//             this.isLoaded = true
//         }

//         // --- Configuração das Dimensões dos Quadros ---
//         this.totalFrames = 5                // Total de posições na imagem
//         this.frameWidth = 763 / this.totalFrames // ~152.6px por quadro
//         this.frameHeight = 203              // Altura total da imagem

//         // --- Controle da Animação ---
//         this.currentFrame = 0   // Índice do quadro atual (0 a 4)
//         this.frameTimer = 0     // Contador para controlar a velocidade da troca
//         this.frameInterval = 10 // Velocidade da troca de quadros do sprite

//         // --- Controle de Velocidade do Movimento (Cooldown) ---
//         this.lastStepTime = 0   // Guarda o tempo do último passo
//         this.stepCooldown = 150 // Tempo em milissegundos entre cada passo (aumente para desacelerar)
//     }

//     // Verifica se já passou o tempo necessário para dar o próximo passo
//     canMove() {
//         const now = Date.now()
//         if (now - this.lastStepTime >= this.stepCooldown) {
//             this.lastStepTime = now
//             return true
//         }
//         return false
//     }

//     // Método para atualizar o quadro da animação
//     updateAnimation() {
//         this.frameTimer++
        
//         // A cada X iterações, avança para o próximo quadro
//         if (this.frameTimer >= this.frameInterval) {
//             this.frameTimer = 0
//             // Avança o frame e volta para 0 quando chega no último (loop)
//             this.currentFrame = (this.currentFrame + 1) % this.totalFrames
//         }
//     }

//     moveLeft() {
//         this.position.x -= this.size
//         this.updateAnimation()
//     }
//     moveRight() {
//         this.position.x += this.size
//         this.updateAnimation()
//     }
//     moveUp() {
//         this.position.y -= this.size
//         this.updateAnimation()
//     }
//     moveDown() {
//         this.position.y += this.size
//         this.updateAnimation()
//     }

//     draw(ctx) {
//         if (!this.isLoaded) return

//         // Posição X inicial do recorte na imagem original
//         const sourceX = this.currentFrame * this.frameWidth

//         ctx.drawImage(
//             this.sprite,
//             sourceX,          // X do recorte na imagem original
//             0,                // Y do recorte (como só tem 1 linha, é 0)
//             this.frameWidth,  // Largura de 1 quadro (152.6)
//             this.frameHeight, // Altura de 1 quadro (203)
//             this.position.x,  // Posição X no Canvas
//             this.position.y,  // Posição Y no Canvas
//             this.width,       // Desenha na tela com largura (80px)
//             this.height       // Desenha na tela com altura (80px)
//         )
//     }
// }

// export default Player


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
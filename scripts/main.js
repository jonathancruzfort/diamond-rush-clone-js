import Player from "./classes/Player.js"

export default {
    canvas: null,
    ctx: null,
    player: null,
    background: new Image(),

    // Dimensões REAIS do mapa/cenário
    world: {
        width: 1440,
        height: 960
    },

    // Estado da Câmera (Guarda a posição de rolagem)
    camera: {
        x: 0,
        y: 0
    },

    deadzone: {
        width: 200,  // Largura da caixa livre onde o jogador se move sem mover a tela
        height: 150  // Altura da caixa livre
    },

    keys: { left: false, up: false, right: false, down: false },

    load() {
        this.player = new Player()
        this.setCanvas()

        // BONS HÁBITOS: Define a imagem apenas 1 vez, fora do gameLoop!
        this.background.src = "../assets/images/cenarioTeste.jpeg"

        this.setEvents()
        this.gameLoop()
    },

    setCanvas() {
        this.canvas = document.querySelector('canvas')
        this.canvas.width = 800
        this.canvas.height = 600
        this.ctx = this.canvas.getContext('2d')
    },

    setEvents() {
        addEventListener('keydown', this.startMoviment.bind(this))
        addEventListener('keyup', this.stopMoviment.bind(this))
    },

    // Lógica que centraliza a câmera no jogador e limita nas bordas do mundo
    updateCamera() {
        // 1. Calcula os limites atuais da Deadzone em coordenadas do MUNDO
        const deadzoneLeft = this.camera.x + (this.canvas.width - this.deadzone.width) / 2
        const deadzoneRight = deadzoneLeft + this.deadzone.width
        const deadzoneTop = this.camera.y + (this.canvas.height - this.deadzone.height) / 2
        const deadzoneBottom = deadzoneTop + this.deadzone.height

        // 2. Empurra a Câmera na Horizontal apenas se o Player sair da margem
        if (this.player.position.x < deadzoneLeft) {
            this.camera.x -= deadzoneLeft - this.player.position.x
        } else if (this.player.position.x + this.player.width > deadzoneRight) {
            this.camera.x += (this.player.position.x + this.player.width) - deadzoneRight
        }

        // 3. Empurra a Câmera na Vertical apenas se o Player sair da margem
        if (this.player.position.y < deadzoneTop) {
            this.camera.y -= deadzoneTop - this.player.position.y
        } else if (this.player.position.y + this.player.height > deadzoneBottom) {
            this.camera.y += (this.player.position.y + this.player.height) - deadzoneBottom
        }

        // 4. Mantém as travas de limite das bordas externas do mapa
        this.camera.x = Math.max(0, Math.min(this.world.width - this.canvas.width, this.camera.x))
        this.camera.y = Math.max(0, Math.min(this.world.height - this.canvas.height, this.camera.y))
    },

    gameLoop() {
        this.handleInputs()
        this.updateCamera()

        // 1. Limpa a tela
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // 2. Salva o estado do Canvas antes de aplicar o deslocamento
        this.ctx.save()

        // 3. Move o ponto inicial de desenho do Canvas (efeito de câmera)
        this.ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y))

        // 4. Desenha o cenário no mundo real (1440x960)
        this.ctx.drawImage(this.background, 0, 0, this.world.width, this.world.height)

        // 5. Desenha o jogador (sua classe desenha em x/y absoluto no mundo)
        this.player.draw(this.ctx)

        // 6. Restaura a matriz do Canvas ao normal para os próximos frames
        this.ctx.restore()

        requestAnimationFrame(this.gameLoop.bind(this))
    },

    handleInputs() {
        // Agora a colisão é testada contra as bordas do MUNDO (1440x960), não do Canvas!
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
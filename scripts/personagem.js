import config from "./config.js"
import data from "./data.js"
import $ from './elements.js'

export default {
    movimenta(direcao) {
        const novaPosicao = this.getNovaPosicao(direcao)
        this.updatePersonagem(novaPosicao)
    },

    updatePersonagem(novaPosicao) {
        data.personagem = novaPosicao
        $.personagem.style.left = novaPosicao[0] + 'px'
        $.personagem.style.top = novaPosicao[1] + 'px'
    },

    getNovaPosicao(direcao) {
        let novaPosicao = [...data.personagem]

        this.computaPosicao(direcao, novaPosicao)
        this.computaColisao(direcao, novaPosicao)

        return novaPosicao
    },

    computaColisao(direcao, novaPosicao) {
        this.ordenaObstaculos(direcao, novaPosicao)
        this.verificaColisao(direcao, novaPosicao)
    },

    verificaColisao(direcao, novaPosicao) {
        for (const obst of data.obstaculos) {
            const colide = this.colide(direcao, novaPosicao, obst)

            if (colide) {
                this.colaNoObstaculo(direcao, novaPosicao, obst)
                return
            }
        }
    },

    computaPosicao(direcao, novaPosicao) {
        const computa = {
            direita: () => novaPosicao[0] += config.velPerson,
            esquerda: () => novaPosicao[0] -= config.velPerson,
            baixo: () => novaPosicao[1] += config.velPerson,
            cima: () => novaPosicao[1] -= config.velPerson,
        }
        computa[direcao]()
    },

    colaNoObstaculo(direcao, novaPosicao, obst) {
        const colaPosicao = {
            direita: () => novaPosicao[0] = obst[0] - novaPosicao[2],
            esquerda: () => novaPosicao[0] = obst[0] + obst[2],
            baixo: () => novaPosicao[1] = obst[1] - novaPosicao[3],
            cima: () => novaPosicao[1] = obst[1] + obst[3],
        }
        colaPosicao[direcao]()
    },

    ordenaObstaculos(direcao, novaPosicao) {
        data.obstaculos.sort((a, b) => {
            if (direcao === 'direita')
                return this.getDistanciaPersonObs(novaPosicao, a, b, 0, 1, -1)
            if (direcao === 'esquerda')
                return this.getDistanciaPersonObs(novaPosicao, a, b, 0, -1, 1)
            if (direcao === 'cima')
                return this.getDistanciaPersonObs(novaPosicao, a, b, 1, -1, 1)
            if (direcao === 'baixo')
                return this.getDistanciaPersonObs(novaPosicao, a, b, 1, 1, -1)
        })
    },

    getDistanciaPersonObs(novaPosicao, a, b, orientacao, ordena, naoOrdena) {
        const tamanhoObs = novaPosicao[orientacao] + novaPosicao[orientacao + 2]
        const diferencaAPerson = a[orientacao] - tamanhoObs
        const diferencaBPerson = b[orientacao] - tamanhoObs

        return diferencaAPerson > diferencaBPerson ? ordena : naoOrdena
    },

    colide(direcao, novaPosicao, obst) {
        if (direcao === 'direita' || direcao === 'esquerda') {
            return novaPosicao[1] + novaPosicao[3] > obst[1]
                && novaPosicao[1] < obst[1] + obst[3]
                && novaPosicao[0] + novaPosicao[2] > obst[0]
                && novaPosicao[0] < obst[0] + obst[2]
                ? true : false
        } else {
            return novaPosicao[0] + novaPosicao[2] > obst[0]
                && novaPosicao[0] < obst[0] + obst[2]
                && novaPosicao[1] + novaPosicao[3] > obst[1]
                && novaPosicao[1] < obst[1] + obst[3]
                ? true : false
        }
    },

}
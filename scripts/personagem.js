import config from "./config.js"
import data from "./data.js"
import $ from './elements.js'

export default {
    movimenta(direcao) {
        const novaPosicao = this.getNovaPosicao(direcao)

        data.personagem = novaPosicao
        $.personagem.style.left = novaPosicao[0] + 'px'
        $.personagem.style.top = novaPosicao[1] + 'px'
    },

    getNovaPosicao(direcao) {
        let novaPosicao = [...data.personagem]
        if (direcao === 'esquerda') {
            novaPosicao[0] -= config.velPerson
        }
        if (direcao === 'direita') {
            novaPosicao[0] += config.velPerson
        }
        if (direcao === 'cima') {
            novaPosicao[1] -= config.velPerson
        }
        if (direcao === 'baixo') {
            novaPosicao[1] += config.velPerson
        }

        novaPosicao = this.verificaColisao(direcao, novaPosicao)

        return novaPosicao
    },

    verificaColisao(direcao, novaPosicao) {
        this.ordenaObstaculos()

        for (const obs of data.obstaculos) {
            const alinhadoEixoY = this.getAlinhamentoY(direcao, novaPosicao, obs)
            const alinhadoEixoX = this.getAlinhamentoX(direcao, novaPosicao, obs)

            if (alinhadoEixoX && alinhadoEixoY) {
                if (direcao === 'direita') novaPosicao[0] = obs[0] - novaPosicao[2]
                if (direcao === 'esquerda') novaPosicao[0] = obs[0] + obs[2]
                if (direcao === 'baixo') novaPosicao[1] = obs[1] - novaPosicao[3]
                if (direcao === 'cima') novaPosicao[1] = obs[1] + obs[3]
                return novaPosicao
            }
        }

        return novaPosicao
    },

    ordenaObstaculos() {

    },

    getAlinhamentoY(direcao, novaPosicao, obs) {
        if (direcao === 'direita' || direcao === 'esquerda') {
            return novaPosicao[1] + novaPosicao[3] > obs[1]
                && novaPosicao[1] < obs[1] + obs[3] ? true : false
        } else {
            return novaPosicao[0] + novaPosicao[2] > obs[0]
                && novaPosicao[0] < obs[0] + obs[2] ? true : false
        }
    },

    getAlinhamentoX(direcao, novaPosicao, obs) {
        if (direcao === 'direita' || direcao === 'esquerda') {
            return novaPosicao[0] + novaPosicao[2] > obs[0]
                && novaPosicao[0] < obs[0] + obs[2] ? true : false
        } else {
            return novaPosicao[1] + novaPosicao[3] > obs[1]
                && novaPosicao[1] < obs[1] + obs[3] ? true : false
        }
    },


}
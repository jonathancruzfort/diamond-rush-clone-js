import data from './data.js'
import main from './main.js'
import $ from './elements.js'

export default {
    movimenta(direcao) {
        let proximaPosicao

        const $personagem = $.mapa.querySelector('.personagem')
        const posicaoPerson = $personagem.dataset.posicao

        if (direcao === 'cima') {
            proximaPosicao = Number(posicaoPerson) - 40
        }
        if (direcao === 'baixo') {
            proximaPosicao = Number(posicaoPerson) + 40
        }
        if (direcao === 'esquerda') {
            proximaPosicao = Number(posicaoPerson) - 1
        }
        if (direcao === 'direita') {
            proximaPosicao = Number(posicaoPerson) + 1
        }
        
        if (data.matriz[proximaPosicao] === 0) {
            this.updatePersonagem(posicaoPerson, proximaPosicao)
        }

        if (data.matriz[proximaPosicao] === 3) {
            this.updatePedra(proximaPosicao, direcao)
            this.updatePersonagem(posicaoPerson, proximaPosicao)
            this.caiPedra(this.computaNovaPosicao(proximaPosicao, direcao), direcao)
        }
    },

    updatePersonagem(posicaoPerson, proximaPosicao) {
        const $blocoAtual = $.mapa.querySelector(`[data-posicao="${posicaoPerson}"]`)
        const $proximoBloco = $.mapa.querySelector(`[data-posicao="${proximaPosicao}"]`)

        if (data.matriz[proximaPosicao] !== 0) return

        data.matriz[posicaoPerson] = 0
        data.matriz[proximaPosicao] = 2
        $blocoAtual.classList = 'bloco'
        $proximoBloco.classList = 'bloco personagem'
    },

    updatePedra(posicaoPedra, direcao) {
        const proximaPosicao = this.computaNovaPosicao(posicaoPedra, direcao)
        const $blocoAtual = $.mapa.querySelector(`[data-posicao="${posicaoPedra}"]`)
        const $proximoBloco = $.mapa.querySelector(`[data-posicao="${proximaPosicao}"]`)

        if (data.matriz[proximaPosicao] !== 0) return

        data.matriz[posicaoPedra] = 0
        data.matriz[proximaPosicao] = 3
        $blocoAtual.classList = 'bloco'
        $proximoBloco.classList = 'bloco pedra'
    },

    caiPedra(posicaoPedra, direcao, tempoAnterior = 0) {
        const velocidadeMs = 60

        if (direcao === 'baixo') return

        requestAnimationFrame(tempoAtual => {
            const proximaPosicao = this.computaNovaPosicao(posicaoPedra, 'baixo')
            
            if (tempoAtual - tempoAnterior < velocidadeMs) {
                this.caiPedra(posicaoPedra, direcao, tempoAnterior)
                return
            }
            
            if (data.matriz[proximaPosicao] !== 0) return
            
            this.updatePedra(posicaoPedra, 'baixo')
            this.caiPedra(proximaPosicao, direcao, tempoAtual)
        })
    },

    computaNovaPosicao(posicao, direcao) {
        const orientacao = {
            'direita': Number(posicao) + 1,
            'esquerda': Number(posicao) - 1,
            'cima': Number(posicao) - 40,
            'baixo': Number(posicao) + 40,
        }
        return orientacao[direcao]
    },
}
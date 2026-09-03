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
            this.movimentaPedra(posicaoPerson, proximaPosicao, direcao)
            this.updatePersonagem(posicaoPerson, proximaPosicao)
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

    movimentaPedra(posicaoPerson, proximaPosicao, direcao) {
        // const $blocoAtual = $.mapa.querySelector(`[data-posicao="${posicaoPerson}"]`)
        const indexBloco = this.computaNovaPosicao(proximaPosicao, direcao)
        const $proximoBloco = $.mapa.querySelector(`[data-posicao="${indexBloco}"]`)

        
        
        if (data.matriz[indexBloco] !== 0) return
        console.log($proximoBloco);

        data.matriz[proximaPosicao] = 0
        data.matriz[Number(proximaPosicao) + 1] = 3
        // $blocoAtual.classList = 'bloco'
        $proximoBloco.classList = 'bloco pedra'
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
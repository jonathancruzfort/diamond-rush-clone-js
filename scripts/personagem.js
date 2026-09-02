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
            this.movimentaPedra(posicaoPerson, proximaPosicao)
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

    movimentaPedra(posicaoPerson, proximaPosicao) {
        // const $blocoAtual = $.mapa.querySelector(`[data-posicao="${posicaoPerson}"]`)
        const $proximoBloco = $.mapa.querySelector(`[data-posicao="${Number(proximaPosicao) + 1}"]`)

        console.log($proximoBloco);
        

        if (data.matriz[Number(proximaPosicao) + 1] !== 0) return

        data.matriz[proximaPosicao] = 0
        data.matriz[Number(proximaPosicao) + 1] = 3
        // $blocoAtual.classList = 'bloco'
        $proximoBloco.classList = 'bloco pedra'
    },
}
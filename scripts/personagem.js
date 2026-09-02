import data from './data.js'
import main from './main.js'

export default {
    movimenta(direcao) {
        const personagem = document.querySelector('.personagem')
        const posicaoPerson = personagem.dataset.posisao
        
        if(direcao === 'cima') {
            const proximaPosicao = Number(posicaoPerson) - 40

            if(data.matriz[proximaPosicao] === 0) {
                data.matriz[posicaoPerson] = 0
                data.matriz[proximaPosicao] = 2
            }
        }
        if(direcao === 'baixo') {
            const proximaPosicao = Number(posicaoPerson) + 40

            if(data.matriz[proximaPosicao] === 0) {
                data.matriz[posicaoPerson] = 0
                data.matriz[proximaPosicao] = 2
            }
        }
        if(direcao === 'esquerda') {
            const proximaPosicao = Number(posicaoPerson) - 1

            if(data.matriz[proximaPosicao] === 0) {
                data.matriz[posicaoPerson] = 0
                data.matriz[proximaPosicao] = 2
            }
        }
        if(direcao === 'direita') {
            const proximaPosicao = Number(posicaoPerson) + 1

            if(data.matriz[proximaPosicao] === 0) {
                data.matriz[posicaoPerson] = 0
                data.matriz[proximaPosicao] = 2
            }
        }

        main.renderElementos()
    },
}
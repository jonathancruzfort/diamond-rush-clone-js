import data from './data.js'
import $ from './elements.js'

export default {
    movimenta(direcao) {
        const posiPerson = data.matriz.indexOf(2)
        const indexProximaPosi = this.computaNovaPosicao(posiPerson, direcao)
        const proximoBloco = data.matriz[indexProximaPosi]

        this.acaoProximoBloco(proximoBloco, posiPerson, indexProximaPosi, direcao)
    },

    acaoProximoBloco(bloco, posiPerson, proximaPosi, direcao) {
        const acoes = {
            0: () => this.updateBloco(posiPerson, proximaPosi, [0, 4], 'personagem', 2),
            3: () => {
                const proximaPosiPedra = this.computaNovaPosicao(proximaPosi, direcao)

                this.updateBloco(proximaPosi, proximaPosiPedra, [0], 'pedra', 3)
                this.updateBloco(posiPerson, proximaPosi, [0, 4], 'personagem', 2)
                this.caiPedra(this.computaNovaPosicao(proximaPosi, direcao), direcao)
                this.verificaCimaPersonagem(proximaPosi)
            },
            4: () => {
                this.updateBloco(posiPerson, proximaPosi, [0, 4], 'personagem', 2)
                this.verificaCimaPersonagem(proximaPosi)
            },
        }

        if (acoes[bloco]) acoes[bloco]()
    },

    updateBloco(posiObjt, proximaPosi, blocosLivres, tipoBloco, valorBloco) {
        const $blocoAtual = $.mapa.querySelector(`[data-posicao="${posiObjt}"]`)
        const $proximoBloco = $.mapa.querySelector(`[data-posicao="${proximaPosi}"]`)
        
        if (!blocosLivres.includes(data.matriz[proximaPosi])) return

        data.matriz[posiObjt] = 0
        data.matriz[proximaPosi] = valorBloco
        $blocoAtual.classList = 'bloco'
        $proximoBloco.classList = `bloco ${tipoBloco}`
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

            if (data.matriz[proximaPosicao] === 2) {
                console.log('morreu');
                return
            }

            if (data.matriz[proximaPosicao] !== 0) return

            this.updateBloco(posicaoPedra, proximaPosicao, [0], 'pedra', 3)
            this.caiPedra(proximaPosicao, direcao, tempoAtual)
        })
    },

    verificaCimaPersonagem(posiPerson) {
        const blocoDeCima = data.matriz[posiPerson - 40]
        const blocoAtual = data.matriz[posiPerson]
        
        if (blocoDeCima === 3 && blocoAtual === 2) {
            setTimeout(() => {
                this.caiPedra(posiPerson - 40, 'direia')
            }, 500)
            return
        }
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
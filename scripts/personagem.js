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

    updatePedra2(posicaoPedra, direcao, tempoAnterior = 0) {
        const velocidadeMs = 100
        const proximaPosicaoPedra = this.computaNovaPosicao(posicaoPedra, direcao)

        requestAnimationFrame(tempoAtual => {
            // 1. Se ainda não deu o tempo necessário, aguarda o próximo frame mantendo as posições
            if (tempoAtual - tempoAnterior < velocidadeMs) {
                this.updatePedra2(posicaoPedra, direcao, tempoAnterior);
                return;
            }

            // // 2. Valida a colisão na matriz antes de mover
            if (data.matriz[proximaPosicaoPedra] !== 0) return;

            // // 3. Atualiza a lógica (matriz) e a interface (DOM)
            const $blocoAtual = $.mapa.querySelector(`[data-posicao="${posicaoPedra}"]`);
            const $proximoBloco = $.mapa.querySelector(`[data-posicao="${proximaPosicaoPedra}"]`);

            data.matriz[posicaoPedra] = 0;
            data.matriz[proximaPosicaoPedra] = 3;

            $blocoAtual.classList = 'bloco'
            $proximoBloco.classList = 'bloco pedra'

            // 4. Chama o próximo passo da queda passando o tempoAtual como novo marco
            this.updatePedra2(proximaPosicaoPedra, 'baixo', tempoAtual);
        });
    },

    updatePedra(posicaoPedra, direcao, tempoAnterior = 0) {
        const velocidadeMs = 40
        let proximaPosicao = this.computaNovaPosicao(posicaoPedra, direcao)
        let $blocoAtual = $.mapa.querySelector(`[data-posicao="${posicaoPedra}"]`)
        let $proximoBloco = $.mapa.querySelector(`[data-posicao="${proximaPosicao}"]`)

        if (data.matriz[proximaPosicao] !== 0) return

        if (direcao !== 'baixo') {
            data.matriz[posicaoPedra] = 0
            data.matriz[proximaPosicao] = 3
            $blocoAtual.classList = 'bloco'
            $proximoBloco.classList = 'bloco pedra'
        }

        requestAnimationFrame(tempoAtual => {
            if (tempoAtual - tempoAnterior < velocidadeMs) {
                this.updatePedra(posicaoPedra, 'baixo', tempoAtual)
            }

            proximaPosicao = this.computaNovaPosicao(proximaPosicao, direcao)
            $blocoAtual = $.mapa.querySelector(`[data-posicao="${posicaoPedra}"]`)
            $proximoBloco = $.mapa.querySelector(`[data-posicao="${proximaPosicao}"]`)

            if (data.matriz[proximaPosicao] !== 0) return

            data.matriz[posicaoPedra] = 0
            data.matriz[proximaPosicao] = 3
            $blocoAtual.classList = 'bloco'
            $proximoBloco.classList = 'bloco pedra'

            this.updatePedra(proximaPosicao, 'baixo')
        })
    },


    movimentaPedra(posicaoPedra, direcao) {
        const proximaPosicaoPedra = this.computaNovaPosicao(posicaoPedra, direcao)

        this.updatePedra(posicaoPedra, proximaPosicaoPedra)
        // requestAnimationFrame(t => this.movimentaPedra(posicaoPedra, 'baixo'))
        // this.updatePersonagem(posicaoPerson, posicaoPedra)
        // const $proximoBloco = $.mapa.querySelector(`[data-posicao="${indexProximoBloco}"]`)

        // if (data.matriz[indexProximoBloco] !== 0) return

        // data.matriz[posicaoPedra] = 0
        // data.matriz[indexProximoBloco] = 3
        // $proximoBloco.classList = 'bloco pedra'
        // requestAnimationFrame(t => this.movimentaPedra(posicaoPedra, 'baixo'))
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
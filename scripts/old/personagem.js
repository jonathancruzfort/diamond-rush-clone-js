import config from "./config.js"
import data from "./data.js"
import $ from './elements.js'

export default {
    movimenta(direcao) {
        const novaPosicaoPerson = this.getNovaPosicaoPerson(direcao)
        this.updatePersonagem(novaPosicaoPerson)
    },

    updatePersonagem(novaPosicao) {
        data.personagem = novaPosicao
        $.personagem.style.left = novaPosicao[0] + 'px'
        $.personagem.style.top = novaPosicao[1] + 'px'
    },

    getNovaPosicaoPerson(direcao) {
        let novaPosicao = [...data.personagem]

        this.computaPosicao(direcao, novaPosicao)
        this.computaColisao(direcao, novaPosicao)

        return novaPosicao
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

    computaColisao(direcao, novaPosicao) {
        // this.ordenaObstaculos(direcao, novaPosicao)
        this.verificaColisaoObst(direcao, novaPosicao)
        this.verificaColisaoPedra(direcao, novaPosicao)
    },

    verificaColisaoObst(direcao, novaPosicao) {
        for (const obst of data.obstaculos) {
            const colide = this.colide(direcao, novaPosicao, obst)

            if (colide) {
                this.colaNoObstaculo(direcao, novaPosicao, obst)
                return
            }
        }
    },

    verificaColisaoPedra(direcao, novaPosicao) {
        for (const pedra of data.pedras) {
            const colide = this.colide(direcao, novaPosicao, pedra)
            const podeArrastar = this.podeArrastar(direcao, novaPosicao, pedra)

            if (colide) {
                this.colaNoObstaculo(direcao, novaPosicao, pedra)
                return
            }
        }
    },

    podeArrastar(direcao, novaPosicaoPerson, pedra) {

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

    colaNoObstaculo(direcao, novaPosicao, obst) {
        const colaPosicao = {
            direita: () => novaPosicao[0] = obst[0] - novaPosicao[2],
            esquerda: () => novaPosicao[0] = obst[0] + obst[2],
            baixo: () => novaPosicao[1] = obst[1] - novaPosicao[3],
            cima: () => novaPosicao[1] = obst[1] + obst[3],
        }
        colaPosicao[direcao]()
    },

    // --------------------------------------------------------------------------------------------

    // movimenta(direcao) {
    //     const novaPosicao = this.getNovaPosicaoPerson(direcao)
    //     this.updatePersonagem(novaPosicao)
    // },

    // movimentaPedra(direcao, pedra) {
    //     const novaPosicao = this.getNovaPosicaoPedra(direcao, pedra)
    //     this.updatePedra(novaPosicao, pedra)
    //     this.aplicaGravidade(pedra)
    // },

    // updatePersonagem(novaPosicao) {
    //     console.log(novaPosicao);

    //     data.personagem = novaPosicao
    //     $.personagem.style.left = novaPosicao[0] + 'px'
    //     $.personagem.style.top = novaPosicao[1] + 'px'
    // },

    // updatePedra(novaPosicao) {
    //     const pedra = data.pedras.find(i => i[4] === novaPosicao[4])
    //     const $pedra = $.mapa.querySelector(`[data-pedra="${novaPosicao[4]}"]`)

    //     pedra[0] = novaPosicao[0]
    //     pedra[1] = novaPosicao[1]

    //     $pedra.style.left = novaPosicao[0] + 'px'
    //     $pedra.style.top = novaPosicao[1] + 'px'
    // },

    // getNovaPosicaoPerson(direcao) {
    //     let novaPosicao = [...data.personagem]

    //     this.computaPosicao(direcao, novaPosicao)
    //     this.computaColisao(direcao, novaPosicao)

    //     return novaPosicao
    // },

    // getNovaPosicaoPedra(direcao, pedra) {
    //     let novaPosicao = [...pedra]

    //     this.computaPosicao(direcao, novaPosicao)
    //     this.ordenaObstaculos(direcao, novaPosicao)
    //     this.verificaColisaoObst(direcao, novaPosicao)

    //     return novaPosicao
    // },

    // computaColisao(direcao, novaPosicao) {
    //     this.ordenaObstaculos(direcao, novaPosicao)
    //     this.verificaColisaoObst(direcao, novaPosicao)
    //     this.verificaColisaoPedra(direcao, novaPosicao)
    // },

    // verificaColisaoObst(direcao, novaPosicao) {
    //     for (const obst of data.obstaculos) {
    //         const colide = this.colide(direcao, novaPosicao, obst)

    //         if (colide) {
    //             this.colaNoObstaculo(direcao, novaPosicao, obst)
    //             return
    //         }
    //     }
    // },

    // verificaColisaoPedraPedra(direcao, novaPosicaoPedra) {
    //     for (const pedra of data.pedras) {
    //         const colide = this.colide(direcao, novaPosicaoPedra, pedra)

    //         if (colide) {
    //             return true 
    //         }
    //     }
    // },

    // verificaColisaoPedra(direcao, novaPosicaoPerson) {
    //     for (const pedra of data.pedras) {
    //         const colide = this.colide(direcao, novaPosicaoPerson, pedra)
    //         const podeMover = this.verificaColisaoPedraPedra(direcao, pedra)

    //         if (colide && podeMover) {
    //             this.movimentaPedra(direcao, pedra)
    //             return
    //         } else if (colide && !podeMover) {
    //             this.colaNoObstaculo(direcao, novaPosicaoPerson, pedra)
    //             return
    //         }
    //     }
    // },

    // podeMoverPedra(direcao, pedra) {
    //     this.verificaColisaoPedra(direcao, pedra)
    // },

    // computaPosicao(direcao, novaPosicao) {
    //     const computa = {
    //         direita: () => novaPosicao[0] += config.velPerson,
    //         esquerda: () => novaPosicao[0] -= config.velPerson,
    //         baixo: () => novaPosicao[1] += config.velPerson,
    //         cima: () => novaPosicao[1] -= config.velPerson,
    //     }
    //     computa[direcao]()
    // },

    // colaNoObstaculo(direcao, novaPosicao, obst) {
    //     const colaPosicao = {
    //         direita: () => novaPosicao[0] = obst[0] - novaPosicao[2],
    //         esquerda: () => novaPosicao[0] = obst[0] + obst[2],
    //         baixo: () => novaPosicao[1] = obst[1] - novaPosicao[3],
    //         cima: () => novaPosicao[1] = obst[1] + obst[3],
    //     }
    //     colaPosicao[direcao]()
    // },

    // ordenaObstaculos(direcao, novaPosicao) {
    //     data.obstaculos.sort((a, b) => {
    //         if (direcao === 'direita')
    //             return this.getDistanciaPersonObs(novaPosicao, a, b, 0, 1, -1)
    //         if (direcao === 'esquerda')
    //             return this.getDistanciaPersonObs(novaPosicao, a, b, 0, -1, 1)
    //         if (direcao === 'cima')
    //             return this.getDistanciaPersonObs(novaPosicao, a, b, 1, -1, 1)
    //         if (direcao === 'baixo')
    //             return this.getDistanciaPersonObs(novaPosicao, a, b, 1, 1, -1)
    //     })
    // },

    // getDistanciaPersonObs(novaPosicao, a, b, orientacao, ordena, naoOrdena) {
    //     const tamanhoObs = novaPosicao[orientacao] + novaPosicao[orientacao + 2]
    //     const diferencaAPerson = a[orientacao] - tamanhoObs
    //     const diferencaBPerson = b[orientacao] - tamanhoObs

    //     return diferencaAPerson > diferencaBPerson ? ordena : naoOrdena
    // },

    // colide(direcao, novaPosicao, obst) {
    //     if (direcao === 'direita' || direcao === 'esquerda') {
    //         return novaPosicao[1] + novaPosicao[3] > obst[1]
    //             && novaPosicao[1] < obst[1] + obst[3]
    //             && novaPosicao[0] + novaPosicao[2] > obst[0]
    //             && novaPosicao[0] < obst[0] + obst[2]
    //             ? true : false
    //     } else {
    //         return novaPosicao[0] + novaPosicao[2] > obst[0]
    //             && novaPosicao[0] < obst[0] + obst[2]
    //             && novaPosicao[1] + novaPosicao[3] > obst[1]
    //             && novaPosicao[1] < obst[1] + obst[3]
    //             ? true : false
    //     }
    // },

    // aplicaGravidade(obj) {

    //     let novaPosicao = [...obj]
    //     novaPosicao[1] += 5 

    //     for (const obst of data.obstaculos) {
    //         if (this.colide('baixo', novaPosicao, obst)) {
    //             this.colaNoObstaculo('baixo', obj, obst)
    //             return
    //         }
    //     }


    //     this.updatePedra(novaPosicao)
    //     requestAnimationFrame(t => this.aplicaGravidade(novaPosicao))
    // },

}
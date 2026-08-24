import main from "./main.js"

export default {
    input(e) {
        const callBack = this[e.key]
        if(callBack) callBack()
    },

    ArrowUp() {
        main.movimentacaoPersonagem('cima')
    },

    ArrowDown() {
        main.movimentacaoPersonagem('baixo')
    },

    ArrowRight() {
        main.movimentacaoPersonagem('direita')
    },

    ArrowLeft() {
        main.movimentacaoPersonagem('esquerda')
    },
}
import personagem from "./personagem.js"

export default {
    input(e) {
        const callBack = this[e.key]
        if(callBack) callBack()
    },

    ArrowUp() {
        personagem.movimenta('cima')
    },

    ArrowDown() {
        personagem.movimenta('baixo')
    },

    ArrowRight() {
        personagem.movimenta('direita')
    },

    ArrowLeft() {
        personagem.movimenta('esquerda')
    },
}
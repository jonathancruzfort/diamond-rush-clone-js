import personagem from "./personagem.js"

export default {
    input(e) {
        const callBack = this[e.code]
        if (callBack) callBack()
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

    Space() {
        const caixa = document.querySelector('.pedra');

        // Pausa a animação no frame exato onde ela estiver
        caixa.style.animationPlayState = 'paused';
    },
}
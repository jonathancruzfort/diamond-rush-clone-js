import main from "./main.js"

export default {
    set() {
        window.addEventListener('keydown', main.movimentacaoPersonagem)
    },
}
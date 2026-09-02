import main from "./main.js"
import controle from "./controle.js"

export default {
    set() {
        window.addEventListener('keydown', e => controle.input(e))
    },
}
import data from "./data.js"
import $ from "./elements.js"
import events from "./events.js"

export default {
    load() {
        this.renderElementos()
        events.set()
    },

    renderElementos() {
        data.matriz.forEach((item, index) => {
            const div = document.createElement('div')
            const classe = this.getClassBloco(item)

            div.classList = `bloco ${classe}`
            div.textContent = index +1

            $.mapa.appendChild(div)
        })
    },

    getClassBloco(item) {
        const variantes = {
            0: '',
            1: 'parede',
            2: 'personagem',
            3: 'pedra',
        }

        return variantes[item]
    },
}
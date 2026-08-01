import $ from "./elements.js";

export default {
    load() {
        console.log($.obstaculo.clientHeight)
        console.log($.obstaculo.clientLeft)
        console.log($.obstaculo.clientTop)
        console.log($.obstaculo.clientWidth)
        console.log($.obstaculo.getClientRects())
        console.log($.obstaculo.getBoundingClientRect());
          
    },
}
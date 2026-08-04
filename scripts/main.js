import config from "./config.js";
import data from "./data.js";
import $ from "./elements.js";
import events from "./events.js";

export default {
    load() {
        this.renderizarCena()
        events.set()
    },

    renderizarCena() {
        this.renderizarObstaculos()
        this.renderizarPersonagem()
    },

    renderizarObstaculos() {
        for (const obs of data.obstaculos) {
            this.renderizarDiv($.mapa, 'pos-abs obstaculo', ...obs)
        }
    },

    renderizarPersonagem() {
        this.renderizarDiv($.mapa, 'pos-abs personagem', ...data.personagem)
    },

    renderizarDiv(container, classeCss = '', left, top, largura, altura) {
        const novaDiv = document.createElement('div');

        if (classeCss) {
            novaDiv.className = classeCss;
        }

        novaDiv.style.left = `${Math.round(left)}px`;
        novaDiv.style.top = `${Math.round(top)}px`;
        novaDiv.style.width = `${Math.round(largura)}px`;
        novaDiv.style.height = `${Math.round(altura)}px`;

        container.appendChild(novaDiv);
    },

    movimentacaoPersonagem(e) {
        if (!$.personagem) {
            $.personagem = $.mapa.querySelector('.personagem')
        }

        if (e.key === 'ArrowLeft') {
            let podeMovimentar = true
            for (const obstaculo of data.obstaculos) {
                if (data.personagem[0] === (obstaculo[0] + obstaculo[2])
                    && obstaculo[1] < (data.personagem[1] + data.personagem[3])
                    && data.personagem[1] < (obstaculo[1] + obstaculo[3])
                ) {
                    podeMovimentar = false
                    return
                }
            }

            if (podeMovimentar) {
                data.personagem[0] = $.personagem.offsetLeft - config.velocidadePersonagem
                $.personagem.style.left = ($.personagem.offsetLeft - config.velocidadePersonagem) + 'px';
            }
        }

        if (e.key === 'ArrowRight') {
            let podeMovimentar = true
            for (const obstaculo of data.obstaculos) {
                if (obstaculo[0] === (data.personagem[0] + data.personagem[2])
                    && obstaculo[1] < (data.personagem[1] + data.personagem[3])
                    && data.personagem[1] < (obstaculo[1] + obstaculo[3])
                ) {
                    podeMovimentar = false
                    return
                }
            }

            if (podeMovimentar) {
                data.personagem[0] = $.personagem.offsetLeft + config.velocidadePersonagem
                $.personagem.style.left = ($.personagem.offsetLeft + config.velocidadePersonagem) + 'px';
            }
        }
        if (e.key === 'ArrowDown') {
            data.personagem[1] = $.personagem.offsetTop + config.velocidadePersonagem
            $.personagem.style.top = ($.personagem.offsetTop + config.velocidadePersonagem) + 'px';
        }
        if (e.key === 'ArrowUp') {
            data.personagem[1] = $.personagem.offsetTop - config.velocidadePersonagem
            $.personagem.style.top = ($.personagem.offsetTop - config.velocidadePersonagem) + 'px';
        }

    }
}
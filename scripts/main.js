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
        $.personagem = $.mapa.querySelector('.personagem')
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
        let podeMovimentar = true
        const posicaoPersonagem = {
            esquerda: data.personagem[0],
            direita: data.personagem[0] + data.personagem[2],
            topo: data.personagem[1],
            fundo: data.personagem[1] + data.personagem[3],
        }

        const [ 
            esquerdaPerson,
            topoPerson,
            larguraPerson,
            alturaPerson
        ] = data.personagem

        if (e.key === 'ArrowLeft') {
            const proximaPosicao = $.personagem.offsetLeft - config.velocidadePersonagem


            for (const obstaculo of data.obstaculos) {
                // left, top, largura, altura
                const posicaoObstaculo = {
                    esquerda: obstaculo[0],
                    direita: obstaculo[0] + obstaculo[2],
                    topo: obstaculo[1],
                    fundo: obstaculo[1] + obstaculo[3],
                }
                const x = posicaoPersonagem.esquerda <= posicaoObstaculo.direita
                const y = posicaoPersonagem.fundo > posicaoObstaculo.topo 
                const z = posicaoPersonagem.topo < posicaoObstaculo.fundo

                if (x && y && z) {
                    podeMovimentar = false
                    return
                }
            }

            data.personagem[0] = proximaPosicao
            $.personagem.style.left = proximaPosicao + 'px';
        }

        if (e.key === 'ArrowRight') {
            for (const obstaculo of data.obstaculos) {
                if (obstaculo[0] === (data.personagem[0] + data.personagem[2])
                    && obstaculo[1] < (data.personagem[1] + data.personagem[3])
                    && data.personagem[1] < (obstaculo[1] + obstaculo[3])
                ) {
                    podeMovimentar = false
                    return
                }
            }

            data.personagem[0] = $.personagem.offsetLeft + config.velocidadePersonagem
            $.personagem.style.left = ($.personagem.offsetLeft + config.velocidadePersonagem) + 'px';
        }

        if (e.key === 'ArrowDown') {
            for (const obstaculo of data.obstaculos) {
                if (obstaculo[1] === (data.personagem[1] + data.personagem[3]) //verifico o topo
                    && obstaculo[0] < (data.personagem[0] + data.personagem[2]) //verifico a lateral esquerda
                    && data.personagem[0] < (obstaculo[0] + obstaculo[2]) //verifico a lateral direita
                ) {
                    podeMovimentar = false
                    return
                }
            }

            data.personagem[1] = $.personagem.offsetTop + config.velocidadePersonagem
            $.personagem.style.top = ($.personagem.offsetTop + config.velocidadePersonagem) + 'px';
        }

        if (e.key === 'ArrowUp') {
            for (const obstaculo of data.obstaculos) {
                if (data.personagem[1] === (obstaculo[1] + obstaculo[3]) //verifico o bottom
                    && obstaculo[0] < (data.personagem[0] + data.personagem[2]) //verifico a lateral esquerda
                    && data.personagem[0] < (obstaculo[0] + obstaculo[2]) //verifico a lateral direita
                ) {
                    podeMovimentar = false
                    return
                }
            }

            data.personagem[1] = $.personagem.offsetTop - config.velocidadePersonagem
            $.personagem.style.top = ($.personagem.offsetTop - config.velocidadePersonagem) + 'px';
        }
    }
}
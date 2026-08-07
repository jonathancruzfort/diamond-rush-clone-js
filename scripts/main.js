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
        const pegarPosicaoObj = obj => ({
            esquerda: obj[0],
            direita: obj[0] + obj[2],
            topo: obj[1],
            fundo: obj[1] + obj[3],
        })

        const movimenta = (proximaPosicao, orientacao, indice) => {
            data.personagem[indice] = proximaPosicao
            $.personagem.style[orientacao] = proximaPosicao + 'px';
        }

        const posiPerson = pegarPosicaoObj(data.personagem)

        if (e.key === 'ArrowLeft') {
            const proximaPosicao = posiPerson.esquerda - config.velocidadePersonagem

            for (const obstaculo of data.obstaculos) {
                const posiObst = pegarPosicaoObj(obstaculo)

                const bateLateral = proximaPosicao <= posiObst.direita
                const ladoDireitoDoObstaculo = posiPerson.esquerda >= posiObst.direita
                const mesmaAltura = posiPerson.fundo > posiObst.topo
                    && posiPerson.topo < posiObst.fundo

                if (ladoDireitoDoObstaculo && mesmaAltura && bateLateral) {
                    movimenta(posiObst.direita, 'left', 0)
                    return
                }
            }

            movimenta(proximaPosicao, 'left', 0)
        }

        if (e.key === 'ArrowRight') {
            const proximaPosicao = posiPerson.esquerda + config.velocidadePersonagem

            for (const obstaculo of data.obstaculos) {
                const posiObst = pegarPosicaoObj(obstaculo)

                const bateLateral = posiPerson.direita + config.velocidadePersonagem >= posiObst.esquerda
                const ladoEsquerdoDoObstaculo = posiPerson.direita <= posiObst.esquerda
                const mesmaAltura = posiPerson.fundo > posiObst.topo
                    && posiPerson.topo < posiObst.fundo

                if (ladoEsquerdoDoObstaculo && mesmaAltura && bateLateral) {
                    data.personagem[0] = posiObst.esquerda - data.personagem[2]
                    $.personagem.style.left = posiObst.esquerda - data.personagem[2] + 'px';//mudei para esquerda
                    return
                }
            }

            data.personagem[0] = proximaPosicao
            $.personagem.style.left = proximaPosicao + 'px';
        }

        if (e.key === 'ArrowDown') {
            const proximaPosicao = posiPerson.topo + config.velocidadePersonagem

            for (const obstaculo of data.obstaculos) {
                const posiObst = pegarPosicaoObj(obstaculo)

                const batePlataforma = posiPerson.fundo + config.velocidadePersonagem >= posiObst.topo
                const emCimaDoObstaculo = posiPerson.fundo <= posiObst.topo
                const mesmaColuna = posiPerson.direita > posiObst.esquerda
                    && posiPerson.esquerda < posiObst.direita

                if (emCimaDoObstaculo && mesmaColuna && batePlataforma) {
                    data.personagem[1] = posiObst.topo - data.personagem[3]
                    $.personagem.style.top = posiObst.topo - data.personagem[3] + 'px';
                    return
                }
            }

            data.personagem[1] = proximaPosicao
            $.personagem.style.top = proximaPosicao + 'px';
        }

        if (e.key === 'ArrowUp') {
            const proximaPosicao = posiPerson.topo - config.velocidadePersonagem

            for (const obstaculo of data.obstaculos) {
                const posiObst = pegarPosicaoObj(obstaculo)

                const batePlataforma = proximaPosicao <= posiObst.fundo
                const aBaixoDoObstaculo = posiPerson.topo >= posiObst.fundo
                const mesmaColuna = posiPerson.direita > posiObst.esquerda
                    && posiPerson.esquerda < posiObst.direita

                if (aBaixoDoObstaculo && mesmaColuna && batePlataforma) {
                    data.personagem[1] = posiObst.fundo
                    $.personagem.style.top = posiObst.fundo + 'px';
                    return
                }
            }

            data.personagem[1] = proximaPosicao
            $.personagem.style.top = proximaPosicao + 'px';
        }
    }
}
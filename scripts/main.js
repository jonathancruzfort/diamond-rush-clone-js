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

        if (e.key === 'ArrowLeft') {
            const posiPerson = pegarPosicaoObj(data.personagem)
            const proximaPosicao = posiPerson.esquerda - config.velocidadePersonagem

            for (const obstaculo of data.obstaculos) {
                const posiObst = pegarPosicaoObj(obstaculo)

                const bateLateral = proximaPosicao <= posiObst.direita
                const ladoDireitoDoObstaculo = posiPerson.esquerda >= posiObst.direita
                const mesmaAltura = posiPerson.fundo > posiObst.topo
                    && posiPerson.topo < posiObst.fundo

                if (ladoDireitoDoObstaculo && mesmaAltura && bateLateral) {
                    data.personagem[0] = posiObst.direita
                    $.personagem.style.left = posiObst.direita + 'px';
                    return
                }
            }

            data.personagem[0] = proximaPosicao
            $.personagem.style.left = proximaPosicao + 'px';
        }

        if (e.key === 'ArrowRight') {
            const posiPerson = pegarPosicaoObj(data.personagem)
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
            const posiPerson = pegarPosicaoObj(data.personagem)
            const proximaPosicao = posiPerson.fundo + config.velocidadePersonagem

            for (const obstaculo of data.obstaculos) {
                const posiObst = pegarPosicaoObj(obstaculo)

                const batePlataforma = proximaPosicao >= posiObst.topo
                const emCimaDoObstaculo = posiPerson.fundo <= posiObst.topo
                const mesmaColuna = posiPerson.direita > posiObst.esquerda
                    && posiPerson.esquerda < posiObst.direita

                console.log(emCimaDoObstaculo, mesmaColuna, batePlataforma);
                

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
            for (const obstaculo of data.obstaculos) {
                if (data.personagem[1] === (obstaculo[1] + obstaculo[3]) //verifico o bottom
                    && obstaculo[0] < (data.personagem[0] + data.personagem[2]) //verifico a lateral esquerda
                    && data.personagem[0] < (obstaculo[0] + obstaculo[2]) //verifico a lateral direita
                ) {
                    return
                }
            }

            data.personagem[1] = $.personagem.offsetTop - config.velocidadePersonagem
            $.personagem.style.top = ($.personagem.offsetTop - config.velocidadePersonagem) + 'px';
        }
    }
}
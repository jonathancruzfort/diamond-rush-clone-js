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
        const pegarPosicaoObj = (obj) => ({
            esquerda: obj[0],
            direita: obj[0] + obj[2],
            topo: obj[1],
            fundo: obj[1] + obj[3],
        })

        const movimenta = (proximaPosicao, orientacao, indice) => {
            data.personagem[indice] = proximaPosicao
            $.personagem.style[orientacao] = proximaPosicao + 'px';
        }

        const ordenaObstaculo = (ordena, naoOrdena, orientPerson, orientObst) => {
            data.obstaculos.sort((a, b) => {
                const posiObstA = pegarPosicaoObj(a)
                const posiObstB = pegarPosicaoObj(b)

                const diferencaAPerson = posiPerson[orientPerson] - posiObstA[orientObst]
                const diferencaBPerson = posiPerson[orientPerson] - posiObstB[orientObst]

                return diferencaAPerson < diferencaBPerson ? ordena : naoOrdena
            })
        }
        
        const getProximaPosicao = (orientacao, direcao) => {
            const proximaPosicao = direcao === 'positivo'
                ? orientacao + config.velocidadePersonagem
                : orientacao - config.velocidadePersonagem

            for (const obstaculo of data.obstaculos) {
                const posiObst = pegarPosicaoObj(obstaculo)

                // const bateLateral = proximaPosicao <= posiObst.direita // left
                // const batePlataforma = proximaPosicao <= posiObst.fundo // up
                // const bateLateral = posiPerson.direita + config.velocidadePersonagem >= posiObst.esquerda // right
                // const batePlataforma = posiPerson.fundo + config.velocidadePersonagem >= posiObst.topo  // down
                


                const colidePlataforma = proximaPosicao <= posiObst.direita
                const ladoDireitoDoObstaculo = orientacao >= posiObst.direita
                const mesmaAltura = posiPerson.fundo > posiObst.topo
                    && posiPerson.topo < posiObst.fundo

                if (ladoDireitoDoObstaculo && mesmaAltura && colidePlataforma) {
                    return posiObst.direita
                }
            }
            return proximaPosicao
        }

        const posiPerson = pegarPosicaoObj(data.personagem)

        if (e.key === 'ArrowLeft') {
            ordenaObstaculo(-1, 1, 'esquerda', 'direita')
            movimenta(getProximaPosicao(posiPerson.esquerda, 'negativo'), 'left', 0)
            // const proximaPosicao = posiPerson.esquerda - config.velocidadePersonagem

            // ordenaObstaculo(-1, 1, 'esquerda', 'direita')

            // for (const obstaculo of data.obstaculos) {
            //     const posiObst = pegarPosicaoObj(obstaculo)

            //     const bateLateral = proximaPosicao <= posiObst.direita
            //     const ladoDireitoDoObstaculo = posiPerson.esquerda >= posiObst.direita
            //     const mesmaAltura = posiPerson.fundo > posiObst.topo
            //         && posiPerson.topo < posiObst.fundo

            //     if (ladoDireitoDoObstaculo && mesmaAltura && bateLateral) {
            //         movimenta(posiObst.direita, 'left', 0)
            //         return
            //     }
            // }

            // movimenta(proximaPosicao, 'left', 0)
        }

        if (e.key === 'ArrowRight') {
            ordenaObstaculo(1, -1, 'esquerda', 'direita')
            movimenta(getProximaPosicao(posiPerson.esquerda, 'positivo'), 'left', 0)
            // const proximaPosicao = posiPerson.esquerda + config.velocidadePersonagem

            // ordenaObstaculo(1, -1, 'esquerda', 'direita')

            // for (const obstaculo of data.obstaculos) {
            //     const posiObst = pegarPosicaoObj(obstaculo)

            //     const bateLateral = posiPerson.direita + config.velocidadePersonagem >= posiObst.esquerda
            //     const ladoEsquerdoDoObstaculo = posiPerson.direita <= posiObst.esquerda
            //     const mesmaAltura = posiPerson.fundo > posiObst.topo
            //         && posiPerson.topo < posiObst.fundo

            //     if (ladoEsquerdoDoObstaculo && mesmaAltura && bateLateral) {
            //         movimenta(posiObst.esquerda - data.personagem[2], 'left', 0)
            //         return
            //     }
            // }

            // movimenta(proximaPosicao, 'left', 0)
        }

        if (e.key === 'ArrowUp') {
            ordenaObstaculo(-1, 1, 'fundo', 'topo')
            movimenta(getProximaPosicao(posiPerson.topo, 'negativo'), 'top', 1)

            // const proximaPosicao = posiPerson.topo - config.velocidadePersonagem

            // ordenaObstaculo(-1, 1, 'fundo', 'topo')

            // for (const obstaculo of data.obstaculos) {
            //     const posiObst = pegarPosicaoObj(obstaculo)

            //     const batePlataforma = proximaPosicao <= posiObst.fundo
            //     const aBaixoDoObstaculo = posiPerson.topo >= posiObst.fundo
            //     const mesmaColuna = posiPerson.direita > posiObst.esquerda
            //         && posiPerson.esquerda < posiObst.direita

            //     if (aBaixoDoObstaculo && mesmaColuna && batePlataforma) {
            //         movimenta(posiObst.fundo, 'top', 1)
            //         return
            //     }
            // }
            
            // movimenta(proximaPosicao, 'top', 1)
        }

        if (e.key === 'ArrowDown') {
            ordenaObstaculo(1, -1, 'fundo', 'topo')
            movimenta(getProximaPosicao(posiPerson.topo, 'positivo'), 'top', 1)

            // const proximaPosicao = posiPerson.topo + config.velocidadePersonagem

            // ordenaObstaculo(1, -1, 'fundo', 'topo')

            // for (const obstaculo of data.obstaculos) {
            //     const posiObst = pegarPosicaoObj(obstaculo)

            //     const batePlataforma = posiPerson.fundo + config.velocidadePersonagem >= posiObst.topo
            //     const emCimaDoObstaculo = posiPerson.fundo <= posiObst.topo
            //     const mesmaColuna = posiPerson.direita > posiObst.esquerda
            //         && posiPerson.esquerda < posiObst.direita

            //     if (emCimaDoObstaculo && mesmaColuna && batePlataforma) {
            //         movimenta(posiObst.topo - data.personagem[3], 'top', 1)
            //         return
            //     }
            // }
            
            // movimenta(proximaPosicao, 'top', 1)
        }
        
    }
}
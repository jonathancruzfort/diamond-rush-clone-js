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

    movimentacaoPersonagem(direcao) {
        const posiPerson = this.computaPosicao(data.personagem)
        // const novaPosiPerson = this.getNovaPosicao(direcao, { ...posiPerson })
        const novaPosiPerson = this.getNovaPosicao2(direcao, data.personagem)

        console.log(novaPosiPerson);
        

        // this.movimenta(data.personagem, novaPosiPerson)
    },

    computaPosicao(data) {
        return {
            esquerda: data[0],
            cima: data[1],
            direita: data[0] + data[2],
            baixo: data[1] + data[3],
        }
    },

    getNovaPosicao(direcao, posiAtual) {
        const proximaPosicao = this.getProximaPosicao(direcao, posiAtual)
        const colisao = this.colideObstaculo(direcao, proximaPosicao)

        console.log(colisao);

        return colisao ? colisao : proximaPosicao
    },
    getNovaPosicao2(direcao, posiAtual) {
        const proximaPosicao = this.getProximaPosicao2(direcao, posiAtual)
        // const colisao = this.colideObstaculo(direcao, proximaPosicao)

        // console.log(colisao);

        // return colisao ? colisao : proximaPosicao
    },

    getProximaPosicao(direcao, posiAtual) {
        const direcaoContraria = this.getDirecaoContraria()
        if (direcao === 'esquerda' || direcao === 'cima') {
            posiAtual[direcao] -= config.velPerson
            posiAtual[direcaoContraria[direcao]] -= config.velPerson
        } else {
            posiAtual[direcao] += config.velPerson
            posiAtual[direcaoContraria[direcao]] += config.velPerson
        }
        return posiAtual
    },
    getProximaPosicao2(direcao, posiAtual) {
        console.log(posiAtual);
        
        // const direcaoContraria = this.getDirecaoContraria()
        if (direcao === 'esquerda' || direcao === 'cima') {
            posiAtual[direcao] -= config.velPerson
        } else {
            posiAtual[direcao] += config.velPerson
        }
        // return posiAtual
    },

    getDirecaoContraria(direcao) {
        return {
            direita: 'esquerda',
            esquerda: 'direita',
            cima: 'baixo',
            baixo: 'cima',
        }
    },

    colideObstaculo(direcao, proximaPosicao) {
        // this.ordenaObstaculo()
        for (const obstaculo of data.obstaculos) {
            const posiObst = this.computaPosicao(obstaculo)
            const direcaoContraria = this.getDirecaoContraria()[direcao]

            // console.log(direcao);
            // console.log('obstaculo', posiObst);
            // console.log('personagem', proximaPosicao);

            console.log(proximaPosicao[direcao]);
            console.log(posiObst[direcaoContraria]);

            if (proximaPosicao[direcao] >= posiObst[direcaoContraria]) {
                const novaPosicao = { ...proximaPosicao }
                novaPosicao[direcao] = posiObst[direcaoContraria]

                return novaPosicao
            }
            // return proximaPosicao
        }


        return false
    },

    ordenaObstaculo(ordena, naoOrdena, orientPerson, orientObst) {
        data.obstaculos.sort((a, b) => {
            const posiObstA = pegarPosicaoObj(a)
            const posiObstB = pegarPosicaoObj(b)

            const diferencaAPerson = posiPerson[orientPerson] - posiObstA[orientObst]
            const diferencaBPerson = posiPerson[orientPerson] - posiObstB[orientObst]

            return diferencaAPerson < diferencaBPerson ? ordena : naoOrdena
        })
    },

    movimenta(obj, novaPosicao) {
        obj[0] = novaPosicao.esquerda
        obj[1] = novaPosicao.cima
        $.personagem.style.left = novaPosicao.esquerda + 'px';
        $.personagem.style.top = novaPosicao.cima + 'px';
    },

}
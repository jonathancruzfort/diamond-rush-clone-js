import $ from "./elements.js";

export default {
    load() {
        // Criamos uma representação padronizada do objeto
        function getObjetoPadronizado(elemento) {
            return {
                x: elemento.offsetLeft,               // Posição X dentro do mapa
                y: elemento.offsetTop,                // Posição Y dentro do mapa
                largura: elemento.offsetWidth,        // Largura real fixa
                altura: elemento.offsetHeight,        // Altura real fixa
                direita: elemento.offsetLeft + elemento.offsetWidth,
                baixo: elemento.offsetTop + elemento.offsetHeight
            };
        }

        // Exemplo de uso na colisão:
        // const player = getObjetoPadronizado($.obstaculo);
        // const parede = getObjetoPadronizado($.obstaculo);

        // console.log(parede);


        // Agora você compara 'player' e 'parede' sem NENHUMA interferência da resolução da tela!


        function desenharDiv(container, x, y, largura, altura, classeCss = '') {
            // 1. Cria o elemento div
            const novaDiv = document.createElement('div');

            // 2. Aplica a classe CSS (se fornecida)
            if (classeCss) {
                novaDiv.className = classeCss;
            }

            // 3. Aplica o posicionamento absoluto obrigatório para jogos
            // novaDiv.style.position = 'absolute';

            // 4. Converte os números inteiros para pixels (px)
            novaDiv.style.left = `${Math.round(x)}px`;
            novaDiv.style.top = `${Math.round(y)}px`;
            novaDiv.style.width = `${Math.round(largura)}px`;
            novaDiv.style.height = `${Math.round(altura)}px`;
            novaDiv.style.backgroundColor = 'Black'

            // 5. Adiciona a div dentro do cenário/mapa
            container.appendChild(novaDiv);

            return novaDiv;
        }

        desenharDiv($.mapa, 150, 350, 203, 12, 'pos-abs')
        desenharDiv($.mapa, 150, 380, 203, 12, 'pos-abs')
    },
}


/*
altura: 12
baixo: 375
direita: 549
largura: 203
x: 346
y: 363


345.5
363

153
353
*/
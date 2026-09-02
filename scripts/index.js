import main from "./main.js"
window.addEventListener('DOMContentLoaded', () => {
    main.load()

    // // Pega os dados de navegação da página
    // const [navigation] = performance.getEntriesByType('navigation');

    // if (navigation) {
    //     // Tempo total até a página carregar completamente (evento load)
    //     const tempoCarregamentoTotal = navigation.loadEventEnd - navigation.startTime;

    //     // Tempo de resposta do servidor (TTFB - Time to First Byte)
    //     const tempoRespostaServidor = navigation.responseStart - navigation.requestStart;

    //     // Tempo para renderizar o DOM (HTML processado)
    //     const tempoProcessamentoDOM = navigation.domContentLoadedEventEnd - navigation.responseComplete;

    //     console.log(`Tempo Total de Carregamento: ${(tempoCarregamentoTotal / 1000).toFixed(2)} segundos`);
    //     console.log(`Resposta do Servidor (TTFB): ${tempoRespostaServidor.toFixed(0)} ms`);
    //     console.log(`Processamento do DOM: ${tempoProcessamentoDOM.toFixed(0)} ms`);
    // }
})
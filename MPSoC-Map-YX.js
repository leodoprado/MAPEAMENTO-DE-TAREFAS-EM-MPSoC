var data = require('./AppsDesafioMap.json')

var tarefas = data.aplicacoes;

function exibe(matriz) {
    console.log('Y')
    for (let i = 0; i < linhas; i++) {
        console.log("| " + matriz[i])
    }
    console.log('--------------> X\n')
}

// Mapeamento do MPSoC 
let contMain = 0;
while (tarefas.length > contMain) {

    var linhas = tarefas[contMain].linhas
    var colunas = tarefas[contMain].colunas

    var matriz = new Array(linhas)
    for (var i = 0; i < linhas; i++) {
        matriz[i] = new Array(colunas).fill(0);
    }

    let map = tarefas[contMain].map
    let contMap = 0;
    let indexMapLinha = 0
    let indexMapColuna = 0

    let contLinhas = linhas
    let contColunas = colunas
    let auxLinha = 0;
    let auxColuna = 0;

    while (map.length > contMap) {
        if (indexMapLinha < contLinhas) {
            matriz[indexMapLinha][indexMapColuna] = map[contMap]
            indexMapLinha++;

            if(indexMapLinha === contLinhas) {
                auxColuna++;
                indexMapColuna = auxColuna;
            }
        } else if (indexMapColuna < contColunas) {
            indexMapColuna++
            matriz[indexMapLinha-1][indexMapColuna-1] = map[contMap]
            
            if(indexMapColuna === contColunas) {
                indexMapLinha = 0;
                indexMapColuna = auxColuna;
                contLinhas--;
            }
        }
        contMap++;
    }
    exibe(matriz)
    contMain++;
}
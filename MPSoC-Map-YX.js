var data = require('./AppsDesafioMap.json')

var tarefas = data.aplicacoes;

function exibe(matriz){
    console.log('Y')
    for(let i = 0; i < linhas; i++){
        console.log("| " + matriz[i])
    }
    console.log('--------------> X\n')
}

// Mapeamento do MPSoC 
let contMain = 0;
while(tarefas.length > contMain){

    var linhas = tarefas[contMain].linhas
    var colunas = tarefas[contMain].colunas

    var matriz = new Array(linhas)
    for(var i = 0; i < linhas; i++){
        matriz[i] = new Array(colunas).fill(0);
    }

    let map = tarefas[contMain].map
    let contMap = 0;
    let indexMapLinha = 0
    let indexMapColuna = 0

    while(map.length > contMap){
        if(indexMapLinha !== linhas){
            matriz[indexMapLinha][indexMapColuna] = map[contMap]
            indexMapLinha++;
        } else {
            indexMapLinha = 0
            indexMapColuna++;
            matriz[indexMapLinha][indexMapColuna] = map[contMap]
        }
        contMap++;
    }
    exibe(matriz)
    contMain++;
}
var data = require('./AppsDesafioMap.json')

var tarefas = data.aplicacoes;

function exibe(matriz) {
    console.log('Y')
    console.log('|')
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

    // Algoritmo de Mapeamento Y -> X
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
    console.log("=====================================================================\n")
    console.log("Mapeamento (Y -> X):\n")
    exibe(matriz)
    console.log("=====================================================================\n")
    
    // Algoritmo de transferência de pacotes
    let tasks = tarefas[contMain].grafo_tarefas
    let contTasks = 0
    while(tarefas[contMain].grafo_tarefas.length > contTasks){
        let source = tarefas[contMain].grafo_tarefas[contTasks].tarefa_origem
        let target = tarefas[contMain].grafo_tarefas[contTasks].tarefa_destino
        let contLinhas = 0
        let contColunas = 0

        //while(matriz[contLinhas][contColunas] !== source)
        
        
        contTasks++;
    }

    contMain++;
}
var data = require('./AppsDesafioMap.json')

var tarefas = data.aplicacoes;

function exibe(matriz) {
    console.log('Y')
    console.log('|')
    for (let i = 0; i < linhas; i++) {
        console.log("| " + matriz[i])
    }
    
    console.log('--------------------> X\n')
}

// Mapeamento do MPSoC 
let contMain = 0;
while (tarefas.length > contMain) {

    var linhas = 8
    var colunas = 8

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
    
    /* Algoritmo de transferência de pacotes
    let tasks = tarefas[contMain].grafo_tarefas
    let contTasks = 0
    while(tarefas[contMain].grafo_tarefas.length > contTasks){
        let source = tarefas[contMain].grafo_tarefas[contTasks].tarefa_origem
        let target = tarefas[contMain].grafo_tarefas[contTasks].tarefa_destino

        // Descobrindo o index do Source
        let linhaSource = 0;
        let colunaSource = 0;
        while(matriz[linhaSource][colunaSource] !== source){
            if(linhaSource < contLinhas){
                linhaSource++;
                if(indexMapLinha === contLinhas) {
                    auxColuna++;
                    indexMapColuna = auxColuna;
                }
            } else if (colunaSource < contColunas){
                colunaSource++;
                if(colunaSource === contColunas){
                    linhaSource = 0;
                    contColunas = auxColuna;
                    contLinhas--;
                }
            }
        }

        // Descobrindo o index do Target
        let linhaTarget = 0;
        let colunaTarget = 0;
        while(matriz[linhaTarget][colunaTarget] !== target){
            
        }

        // Percorrendo o caminho
        while(matriz[sourceLinha][sourceColuna] !== matriz [targetLinha][targetColuna]){
        
        }

        contTasks++;
    }*/

    contMain++;
}
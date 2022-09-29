var data = require('./AppsDesafio.json')

var tarefas = data.aplicacoes;

var contador = 0;

var linhas = 4
var colunas = 4

var mat = new Array(linhas)
for(var i = 0; i < linhas; i++){
    mat[i] = new Array(colunas).fill(0);
}

function exibe(mat){
    console.log('\n')
    for(let i = 0; i < linhas; i++){
        console.log(mat[i])
    }
}

while(tarefas.length > contador){
    let matriz = tarefas[contador].matriz

    console.log('------------------')
    console.log(matriz)
    var contTarefas = 0;

    while(tarefas[contador].grafo_tarefas.length > contTarefas){
        let matrizPackages = mat;
        var sourceLinhaIndex, sourceColunaIndex, targetLinhaIndex, targetColunaIndex;
        var source = tarefas[contador].grafo_tarefas[contTarefas].tarefa_origem;
        var target = tarefas[contador].grafo_tarefas[contTarefas].tarefa_destino;
        var packages = tarefas[contador].grafo_tarefas[contTarefas].quantidade_pacotes;

        // Achando o index do source
        let linhaSource = 0;
        let colunaSource = 0;
        while(matriz[linhaSource][colunaSource] !== source){
            let cont = 0;
            for(let i = 0; i < matriz[cont].length; i++){
                if(matriz[linhaSource][colunaSource] !== source){
                    colunaSource++;
                    if(colunaSource > matriz[cont].length){
                        colunaSource = 0;
                        linhaSource++
                    }
                } else {
                    sourceLinhaIndex = linhaSource
                    sourceColunaIndex = colunaSource
                    break;
                }
            }
            cont++;
        }
        
        if(matriz[linhaSource][colunaSource] === source){
            sourceLinhaIndex = linhaSource
            sourceColunaIndex = colunaSource
        }

        // Achando o index do target
        let linhaTarget = 0;
        let colunaTarget = 0;
        while(matriz[linhaTarget][colunaTarget] !== target){
            let cont = 0;
            for(let i = 0; i < matriz[cont].length; i++){
                if(matriz[linhaTarget][colunaTarget] !== target){
                    colunaTarget++;
                    if(colunaTarget > matriz[cont].length){
                        colunaTarget = 0;
                        linhaTarget++
                    } 
                } else {
                    targetLinhaIndex = linhaTarget
                    targetColunaIndex = colunaTarget
                    break;
                }
            }
            cont++;
        }
        
        if(matriz[linhaTarget][colunaTarget] === target){
            targetLinhaIndex = linhaTarget
            targetColunaIndex = colunaTarget
        }
        
        //Descobrindo o menor caminho
        while(matriz[sourceLinhaIndex][sourceColunaIndex] !== matriz [targetLinhaIndex][targetColunaIndex]){
            if(sourceColunaIndex < targetColunaIndex){
                let auxLinha = sourceLinhaIndex, auxColuna = sourceColunaIndex, contColuna = 0, contLinha = 0, cont = 0;
                for(let i = 0; i < matriz[targetColunaIndex].length; i++){
                    if(auxColuna <= targetColunaIndex){
                        if(isNaN(matriz[auxLinha][auxColuna])){
                            matrizPackages[auxLinha][auxColuna] += packages
                        } else {
                            matrizPackages[auxLinha][auxColuna] += packages
                        }
                        while(auxColuna === targetColunaIndex && auxLinha < targetLinhaIndex){
                            auxLinha++;
                            if(isNaN(matrizPackages[auxLinha][auxColuna])){
                                matrizPackages[auxLinha][auxColuna] += packages
                            } else {
                                matrizPackages[auxLinha][auxColuna] += packages
                            }
                        }
                        auxColuna++;
                    }
                }
                exibe(matrizPackages)
                break;
            } else if (targetColunaIndex < sourceColunaIndex){
                let auxLinha = sourceLinhaIndex, auxColuna = sourceColunaIndex, contColuna = 0, contLinha = 0, cont = 0;
                for(let i = 0; i < matriz[targetColunaIndex].length; i++){
                    if(auxColuna > targetColunaIndex){
                        auxColuna--;
                        if(isNaN(matriz[auxLinha][auxColuna])){
                            matrizPackages[auxLinha][auxColuna] += packages
                        } else {
                            matrizPackages[auxLinha][auxColuna] += packages
                        }
                        while(auxColuna === targetColunaIndex && auxLinha > targetLinhaIndex){
                            auxLinha--;
                            if(isNaN(matriz[auxLinha][auxColuna])){
                                matrizPackages[auxLinha][auxColuna] += packages
                            } else {
                                matrizPackages[auxLinha][auxColuna] += packages
                            }
                        }
                    }
                }
                exibe(matrizPackages)
                break;
            }
        }
        contTarefas++;
    }
    console.log('------------------')
    contador++;
}

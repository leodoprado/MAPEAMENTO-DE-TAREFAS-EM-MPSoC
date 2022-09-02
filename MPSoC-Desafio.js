var data = require('./AppsDesafio.json')

var tarefas = data.aplicacoes;

var contador = 0;

while(tarefas.length > contador){

    var contTarefas = 0;

    while(tarefas[contador].grafo_tarefas.length > contTarefas){

        var sourceLinhaIndex, sourceColunaIndex, targetLinhaIndex, targetColunaIndex;
        let matriz = tarefas[contador].matriz

        var source = tarefas[contador].grafo_tarefas[contTarefas].tarefa_origem;
        var target = tarefas[contador].grafo_tarefas[contTarefas].tarefa_destino;
        var packages = tarefas[contador].grafo_tarefas[contTarefas].quantidade_pacotes;

        // Achando o index do source
        let linhaSource = 0;
        let colunaSource = 0;
        console.log(matriz)
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
                    //console.log("--------------")
                    sourceLinhaIndex = linhaSource
                    sourceColunaIndex = colunaSource
                    //console.log("O source começa no index: ")
                    //console.log("["+linhaSource+"]"+"["+colunaSource+"]");
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
                    //console.log("O target final está no index: ")
                    //console.log("["+linhaTarget+"]"+"["+colunaTarget+"]");
                    //console.log("--------------")
                    break;
                }
            }
            cont++;
        }
        
        if(matriz[linhaTarget][colunaTarget] === target){
            targetLinhaIndex = linhaTarget
            targetColunaIndex = colunaTarget
        }
        
        console.log('------------------')
        
        //Descobrindo o menor caminho
        while(matriz[sourceLinhaIndex][sourceColunaIndex] !== matriz [targetLinhaIndex][targetColunaIndex]){
            if(sourceColunaIndex < targetColunaIndex){
                let auxLinha = sourceLinhaIndex, auxColuna = sourceColunaIndex, contColuna = 0, contLinha = 0, cont = 0;
                for(let i = 0; i < matriz[targetColunaIndex].length; i++){
                    if(auxColuna <= targetColunaIndex){
                        if(isNaN(matriz[auxLinha][auxColuna])){
                            matriz[auxLinha][auxColuna] += packages
                        } else {
                            matriz[auxLinha][auxColuna] += packages
                        }
                        while(auxColuna === targetColunaIndex && auxLinha < targetLinhaIndex){
                            auxLinha++;
                            if(isNaN(matriz[auxLinha][auxColuna])){
                                matriz[auxLinha][auxColuna] += packages
                            } else {
                                matriz[auxLinha][auxColuna] += packages
                            }
                        }
                        auxColuna++;
                    }
                }
                console.log(matriz)
                console.log('------------------')
                break;
            } else if (targetColunaIndex < sourceColunaIndex){
                let auxLinha = sourceLinhaIndex, auxColuna = sourceColunaIndex, contColuna = 0, contLinha = 0, cont = 0;
                for(let i = 0; i < matriz[targetColunaIndex].length; i++){
                    if(auxColuna > targetColunaIndex){
                        auxColuna--;
                        if(isNaN(matriz[auxLinha][auxColuna])){
                            matriz[auxLinha][auxColuna] += packages
                        } else {
                            matriz[auxLinha][auxColuna] += packages
                        }
                        while(auxColuna === targetColunaIndex && auxLinha > targetLinhaIndex){
                            auxLinha--;
                            if(isNaN(matriz[auxLinha][auxColuna])){
                                matriz[auxLinha][auxColuna] += packages
                            } else {
                                matriz[auxLinha][auxColuna] += packages
                            }
                        }
                    }
                }
                console.log(matriz)
                console.log('------------------')
                break;
            }
        }

        contTarefas++;
    }
    contador++;
}

/*

  Cria uma matriz n x n preenchida por zeros 

function criarMatriz(n){ 
    const mat = Array(n)  //Cria um array de tamanho n 
        .fill(undefined); //O preenche com valores vazios ('undefined') 
 
    /* 
     * Para cada linha i, a preenche com um array de 
     * tamanho n preenchido com zeros 
     */ 
 /*   for (const i in mat){ 
        mat[i] = Array(n).fill(0); 
    } 
 
    return mat; 
} 
 
const n = 4; 
const a = criarMatriz(n); 
 
console.log(a); */
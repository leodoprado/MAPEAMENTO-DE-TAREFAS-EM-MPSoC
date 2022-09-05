var data = require('./AppsDesafioMap.json')

var tarefas = data.aplicacoes;

var linhas = 3
var colunas = 4

var matriz = new Array(linhas)
for(var i = 0; i < linhas; i++){
    matriz[i] = new Array(colunas).fill(0);
}

function exibe(matriz){
    for(let i = 0; i < linhas; i++){
        console.log(matriz[i])
    }
}

exibe(matriz)

let contMain = 0;

// Mapeamento do MPSoC
while(tarefas.length > contMain){
    let map = tarefas[contMain].map
    let contMap = 0;

    while(map.length > contMap){
        let mapIndex = map
        let contIndex = map.length
        //console.log(contIndex)
        let contLinhas;
        let contColunas = 0;
        //console.log(matriz[1][1] = mapIndex[0])
        for(contLinhas = 0; contLinhas < linhas; contLinhas++){
            if(contLinhas >= linhas){
                contLinhas = 0;
                contColunas++;
                matriz[contLinhas][contColunas] = mapIndex[contIndex]
            } else {
                matriz[contLinhas][contColunas] = mapIndex[contIndex]
                contLinhas++;
            }
        } 
        exibe(matriz)
        console.log('-------------')
        contMap++;
    }
    contMain++;
}

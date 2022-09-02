var data = require('./AppsDesafio.json')

var tarefas = data.aplicacoes;

var linhas = 3
var colunas = 4

var matriz = new Array(linhas)
for(var i = 0; i < linhas; i++){
    matriz[i] = new Array(colunas).fill(0);
}

exibe(matriz)

function exibe(matriz){
    for(let i = 0; i < linhas; i++){
        console.log(matriz[i])
    }
}

// Mapeamento do MPSoC


let testData = require('./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Test1.json')

function exibe(matriz) {
    console.log('Y')
    console.log('|')
    for (let i = 0; i < linhas; i++) {
        console.log("| " + matriz[i])
    }
    
    console.log('---------------> X\n')
}

console.log(testData)
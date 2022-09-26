let testData = require('./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Test1.json')

let XColunas = testData.MPSOC_SIZE_X
let YLinhas = testData.MPSOC_SIZE_Y;
let Processor = testData.TASKS_PER_PROCESSOR;

let contMain = 0;
while (testData.TEST.length > contMain){

    console.log(CreateMatriz(8, 8))

    contMain++;
}

function exibe(matriz) {
    console.log('Y')
    console.log('|')
    for (let i = 0; i < YLinhas; i++) {
        console.log("| " + matriz[i])
    }
    
    console.log('--------------------------------------> X\n')
}

function CreateMatriz(rows, columns) {
    var matriz = new Array(rows);
    for (let i = 0; i < rows; i++) {
        matriz[i] = new Array(columns).fill([0]);
    }
    return exibe(matriz);
 }
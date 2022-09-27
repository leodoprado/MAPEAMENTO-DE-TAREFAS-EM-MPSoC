let testData = require('./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Test1.json')

let XColunas = testData.MPSOC_SIZE_X
let YLinhas = testData.MPSOC_SIZE_Y;
let Processor = testData.TASKS_PER_PROCESSOR;

console.log(testData)

let contMain = 0;

// Acessando cada posição do testData.TEST -> map
testData.TEST.forEach(TEST => {
    let arrayMap = []
    // acessando parametros para entrar no loop de TEST e Applications
    console.log("\n")
    console.log(TEST.APP) 
    console.log(TEST.QTD) 
    
    let Application = require(`./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Applications/${TEST.APP}`)
    console.log(Application)
    console.log("\n")

    // Buscando o grafo de tarefas para mapear
    Application.grafo_tarefas.forEach(GrafoTarefas => {
        arrayMap.push(GrafoTarefas.tarefa_origem, GrafoTarefas.tarefa_destino) 
        var unique = [...new Set(arrayMap)];
        console.log(unique);
    })


});

/*
while (testData.TEST.length > contMain){

    console.log(XColunas, YLinhas)

    contMain++;
}*/

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
        matriz[i] = new Array(columns).fill(0);
    }
    return exibe(matriz);
 }
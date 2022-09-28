let testData = require('./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Test1.json')

let XColunas = testData.MPSOC_SIZE_X
let YLinhas = testData.MPSOC_SIZE_Y;
let Processor = testData.TASKS_PER_PROCESSOR;

console.log(testData)

let contMain = 0;

// Acessando posições das tasks para mapear
testData.TEST.forEach(TEST => {
    console.log("\n----------------------------------------------------------------------------------\n")
    
    let arrMap = []

    console.log(TEST)
    console.log(TEST.APP) 
    console.log(TEST.QTD) 
    console.log("\n")
    
    let Application = require(`./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Applications/${TEST.APP}`)
    console.log(Application)
    console.log("\n")

    // Filtrando o array de tarefas para mapear
    let contTarefas = 0
    while(Application.grafo_tarefas.length > contTarefas){

        arrMap.push(Application.grafo_tarefas[contTarefas].tarefa_origem, Application.grafo_tarefas[contTarefas].tarefa_destino) 
        var arrayMap = [...new Set(arrMap)];
        contTarefas++;
    }


    var arr = []
    for (let i = 0; i < TEST.QTD; i++){
        arr.push(arrayMap)
    }

    console.log(arr)

    //////////////////////////

    let YLinhas = testData.MPSOC_SIZE_Y
    let XColunas = testData.MPSOC_SIZE_X

    var matriz = new Array(YLinhas)
    for (var i = 0; i < YLinhas; i++) {
        matriz[i] = new Array(8).fill(0);
    }

    // Algoritmo de mapeamento
    let indexMapLinha = 0
    let indexMapColuna = 0
    let contLinhas = YLinhas
    let contColunas = XColunas
    let auxLinha = 0;
    let auxColuna = 0;
    let contMap = 0;

    let maps = parseInt(TEST.QTD)
   // console.log(arrayMap.length * maps)
   console.log(arr.length)

    while (arrayMap.length > contMap){
        let contArr = 0;
        if (indexMapLinha < contLinhas) {
            matriz[indexMapLinha][indexMapColuna] = arrayMap[contMap]
            indexMapLinha++;

            if(indexMapLinha === contLinhas) {
                auxColuna++;
                indexMapColuna = auxColuna;
            }
        } else if (indexMapColuna < contColunas) {
            indexMapColuna++
            matriz[indexMapLinha-1][indexMapColuna-1] = arrayMap[contMap]
            
            if(indexMapColuna === contColunas) {
                indexMapLinha = 0;
                indexMapColuna = auxColuna;
                contLinhas--;
            }
        }
        contMap++;
    }
    exibe(matriz)
});

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
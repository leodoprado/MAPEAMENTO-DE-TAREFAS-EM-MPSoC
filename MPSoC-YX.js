let testData = require('./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Test1.json')

let XColunas = parseInt(testData.MPSOC_SIZE_X);
let YLinhas = parseInt(testData.MPSOC_SIZE_Y);
let TasksProcessor = parseInt(testData.TASKS_PER_PROCESSOR);

console.log(testData)

let contMain = 0;

// Acessando posições das tasks
testData.TEST.forEach(TEST => {
    console.log("\n_________________________________________________________________________________________________________________________________\n")
    
    console.log("----------------------------------{ TASKS }-------------------------------------\n")

    let arrMap = []

    console.log(TEST)
    //console.log(TEST.APP) 
    //console.log(TEST.QTD) 
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

    // Multiplicando n (QTD) de vezes as tasks para mapear
    var arr = []
    let contArr = 0
    for (let i = 0; i < TEST.QTD; i++){
        arr.push(arrayMap)
    }

    //console.log(arr)
    //console.log(arr.length)

    // Unindo os arrays de tasks
    let a = []
    for (let i = 0; i < TEST.QTD; i++){
        a.push(...arr[contArr])
        contArr++;
    }

    while(a.length % TasksProcessor !== 0){
        a.push(0)
    }
    
    console.log(a)

    //////////////////////////

    var matriz = new Array(YLinhas)
    for (var i = 0; i < YLinhas; i++) {
        matriz[i] = new Array(XColunas).fill("["+generateZero(TasksProcessor)+"]");
    }

    //////////////////////////

    let contArray = 0;
    let AuxProcessor = []
    let ProcessorTask = []

    while(a.length >= contArray){
        if(AuxProcessor.length < TasksProcessor){
            AuxProcessor.push(a[contArray])
        } else if(AuxProcessor.length == TasksProcessor){
            ProcessorTask.push(AuxProcessor)
            AuxProcessor = []
            continue;
        }
        contArray++;
    }

    //console.log(TasksProcessor)
    //console.log(AuxProcessor.length)
    console.log(ProcessorTask)
    
    /////////////////////////

    // Algoritmo de mapeamento
    let indexMapLinha = 0
    let indexMapColuna = 0
    let contLinhas = YLinhas
    let contColunas = XColunas
    let auxLinha = 0;
    let auxColuna = 0;
    let contMap = 0;

    while (ProcessorTask.length > contMap){
        if (indexMapLinha < contLinhas) {
            matriz[indexMapLinha][indexMapColuna] = "["+ProcessorTask[contMap]+"]"
            indexMapLinha++;

            if(indexMapLinha === contLinhas) {
                auxColuna++;
                indexMapColuna = auxColuna;
            }
        } else if (indexMapColuna < contColunas) {
            indexMapColuna++
            matriz[indexMapLinha-1][indexMapColuna-1] = "["+ProcessorTask[contMap]+"]"
            
            if(indexMapColuna === contColunas) {
                indexMapLinha = 0;
                indexMapColuna = auxColuna;
                contLinhas--;
            }
        }
        contMap++;
    }
    console.log("-------------------------------------{ MAP }-------------------------------------\n")
    exibe(matriz)
    
    // Procurando o index do source
    var matrizHeat = new Array(YLinhas)
    for(var i = 0; i < YLinhas; i++){
        matrizHeat[i] = new Array(XColunas).fill(0);
    }   
    let linhaSource = 0;
    let colunaSource = 0;
    let contSearch = 0;
    let contSearchTask = 0;
    let contSearchProcessor = 0;
    while (Application.grafo_tarefas.length > contSearch){
        let sourceIndex, targetIndex;
        let source = Application.grafo_tarefas[contSearch].tarefa_origem
        let target = Application.grafo_tarefas[contSearch].tarefa_destino
        let packages = Application.grafo_tarefas[contSearch].quantidade_pacotes
        
        console.log(source, target, packages)
        let linhaSource = 0;
        let colunaSource = 0;
        let processorSource = 1
        while(ProcessorTask.length > contSearchProcessor){
            while(ProcessorTask[contSearchProcessor].length > contSearchTask){
                if(ProcessorTask[contSearchProcessor][contSearchTask] === source){
                    sourceIndex = contSearchTask
                }
                contSearchTask++;
            }
            contSearchProcessor++;
        }
        contSearch++;
    }

    console.log("----------------------------------{ HEAT MAP }----------------------------------\n")

    exibe(matrizHeat)
});

function exibe(matriz) {
    console.log('Y')
    console.log('|')
    for (let i = 0; i < YLinhas; i++) {
        console.log("| " + matriz[i])
    }
    
    console.log('-------------------------------------------------------------------------------> X\n')
}

function generateZero(totalElementos){
    return Array(totalElementos).fill(0);
}
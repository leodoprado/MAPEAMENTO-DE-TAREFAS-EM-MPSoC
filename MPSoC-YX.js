let testData = require('./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Test1.json')

let XColunas = parseInt(testData.MPSOC_SIZE_X);
let YLinhas = parseInt(testData.MPSOC_SIZE_Y);
let TasksProcessor = parseInt(testData.TASKS_PER_PROCESSOR);

console.log(testData)

// Acessando posições das tasks
testData.TEST.forEach(TEST => {
    console.log("\n_________________________________________________________________________________________________________________________________\n")
    
    console.log("-----| TASKS |---------------------------------------------------------------------------------------->\n")

    let arrMap = []

    console.log("Application: "+TEST.APP+" >>>>> "+TEST.QTD+"x\n")
    
    let Application = require(`./Teste-TrabalhoMapeamento/TrabalhoMapeamento/Applications/${TEST.APP}`)
    
    let cont = 0
    Application.grafo_tarefas.forEach(tarefas => {
        cont++;
        console.log("------------------> "+cont)
        console.log("Source: "+tarefas.tarefa_origem)
        console.log("Target: "+tarefas.tarefa_destino)
        console.log("Packages: "+tarefas.quantidade_pacotes)
    })
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

    // Unindo os arrays de tasks
    let a = []
    for (let i = 0; i < TEST.QTD; i++){
        a.push(...arr[contArr])
        contArr++;
    }

    while(a.length % TasksProcessor !== 0){
        a.push(0)
    }

    //////////////////////////

    // Gerando a matriz e preenchendo com zeros
    var matriz = new Array(YLinhas)
    for (var i = 0; i < YLinhas; i++) {
        matriz[i] = new Array(XColunas).fill(generateZero(TasksProcessor));
    }

    //////////////////////////

    // Divisão das tasks por processador
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
            matriz[indexMapLinha][indexMapColuna] = ProcessorTask[contMap] 
            indexMapLinha++;

            if(indexMapLinha === contLinhas) {
                auxColuna++;
                indexMapColuna = auxColuna;
            }
        } else if (indexMapColuna < contColunas) {
            indexMapColuna++
            matriz[indexMapLinha-1][indexMapColuna-1] = ProcessorTask[contMap]
            
            if(indexMapColuna === contColunas) {
                indexMapLinha = 0;
                indexMapColuna = auxColuna;
                contLinhas--;
            }
        }
        contMap++;
    }
    console.log("-----| MAP |----------------------------------------------------------------------------------------->\n")
    exibe(matriz)
    
    /////////////////////////

    // Gerando o mapa de calor
    var matrizHeat = new Array(YLinhas)
    for(var i = 0; i < YLinhas; i++){
        matrizHeat[i] = new Array(XColunas).fill(0);
    }   

    /////////////////////////

    var linhaSource = 0;
    var colunaSource = 0;
    var contSearch = 0;
    var contSearchTask = 0;
    var contSearchProcessor = 0;
    while (Application.grafo_tarefas.length > contSearch){
        var sourceIndex, targetIndex;
        var source = Application.grafo_tarefas[contSearch].tarefa_origem
        var target = Application.grafo_tarefas[contSearch].tarefa_destino
        var packages = Application.grafo_tarefas[contSearch].quantidade_pacotes
        
        var linhaSource = 0;
        var colunaSource = 0;
        var sourceLinhaIndex, sourceColunaIndex, targetLinhaIndex, targetColunaIndex;

        var linhaTarget = 0;
        var colunaTarget = 0;
        var processorSource = 0
        var processorTarget = 0
        var contSource = 0
        var contTarget = 0
        var contIndex = 0

        // Identificando o index do Source
        while(matriz[linhaSource][colunaSource].length > contIndex){
            if(matriz[linhaSource][colunaSource][contIndex] === source){
                console.log("\nAchei o SOURCE: "+source)
                console.log("Linha do SOURCE: "+linhaSource)
                console.log("Coluna do SOURCE: "+colunaSource)
                console.log("Processor do SOURCE: "+contIndex)
            }
            contIndex++;
        }

        contSearch++;
    }
    console.log("\n")

    /////////////////////////

    // Exibindo o mapa de calor
    console.log("-----| HEAT MAP |------------------------------------------------------------------------------------>\n")
    console.log(Application.grafo_tarefas.length)
    exibe(matrizHeat)
});

function exibe(matriz) {
    for (let i = 0; i < YLinhas; i++) {
        for (let j = 0; j < XColunas; j++){
            process.stdout.write("[" + matriz[i][j] + "]")
        }
        console.log("")
    }
}

function generateZero(totalElementos){
    return Array(totalElementos).fill(0);
}
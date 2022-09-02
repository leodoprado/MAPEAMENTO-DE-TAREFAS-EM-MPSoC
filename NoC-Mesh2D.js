const data = require('./CenariosMesh.json');

var targetX, targetY, sourceX, sourceY, i, DifX, DifY, a, cont=0;

var packages = data.Packages;

packages.forEach(() => {
    
    sourceX = data.Packages[cont].Source.X;
    sourceY = data.Packages[cont].Source.Y;

    targetX = data.Packages[cont].Target.X;
    targetY = data.Packages[cont].Target.Y;

    DifX = targetX - sourceX;
    DifY = targetY - sourceY;

    console.log("O Mesh comecou em " + sourceX + " : " + sourceY + "\n");

    console.log("Linhas: \n");
    if (DifX > 0) {
        for (i = sourceX; i <= targetX; i++) {
            console.log("[" + i + "][" + sourceY + "]\n");
        }
    } else if (DifX < 0) {
        for (i = sourceX; i >= targetX; i--) {
            console.log("[" + i + "][" + sourceY + "]\n");
        }
    } else {
        console.log("[" + targetX + "][" + targetY + "]\n");
    }

    console.log("Colunas: \n");
    if (DifY > 0) {
        for (i = sourceY; i <= targetY; i++) {
            console.log("[" + targetX + "][" + i + "]\n");
        }
    } else if (DifY < 0) {
        for (i = sourceY; i >= targetY; i--) {
            console.log("[" + targetX + "][" + i + "]\n");
        }
    } else {
        console.log("[" + targetX + "][" + targetY + "]\n");
    }

    console.log("O resultado foi " + targetX + " : " + targetY);
    console.log("A Movimentacao acabou!\n");
    console.log("-------------------------------");
    cont++;
});
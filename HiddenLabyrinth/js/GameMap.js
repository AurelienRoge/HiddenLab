if (activateLineAndColHelp == true) {
    var tileSizeInPx = 500 / (taille + 1);//Taille d'un carré de texture en pixel
}
else {
    var tileSizeInPx = 500 / taille;//Taille d'un carré de texture en pixel
}

//La taille max (pris par rapport à l'écran 14" de l'ISEN est de 20x20 pour 25px par case = 500px*500px)

function resizeCanvas() {
    if (activateLineAndColHelp == true) {
        tileSizeInPx = 500 / (taille + 1);//Taille d'un carré de texture en pixel
    }
    else {
        tileSizeInPx = 500 / taille;//Taille d'un carré de texture en pixel
    }
}


var randomNumber;//Variable qui va contenir le nombre aléatoire généré

function generateRandomPath(tab) {
    let xPath = 0;
    let yPath = 0;
    let nextX = 0;
    let nextY = 0;
    let currentPosition = 0;
    let endPointPath = (taille * taille) - 1
    while ((currentPosition != endPointPath) && (currentPosition != endPointPath - 2) && (currentPosition != endPointPath - 2 - taille) && (currentPosition != endPointPath - 1 - 2 * taille) && (currentPosition != endPointPath - 2 * taille)) {
        let randomNb = Math.floor(Math.random() * 101); // entre 0 et 100
        let tmpRand = 0;
        if (randomNb <= 20) {//À gauche
            tmpRand = Math.floor(Math.random() * 3) + 1;//Génère un nombre aléatoire entre 1 et 3
            if (xPath > 0) {
                if (xPath - tmpRand <= 0) {
                    nextX = 0;
                }
                else {
                    nextX = nextX - tmpRand;
                }
                while (xPath != nextX) {//Tant qu'elles sont pas égales, on va continuer d'aller vers la gauche
                    xPath--;
                    currentPosition--;
                    tab[currentPosition] = "S";
                }
            }
            else {
                if (yPath + tmpRand >= taille - 1) {
                    nextY = taille - 1;
                }
                else {
                    nextY = nextY + tmpRand;
                }
                while (yPath != nextY) {//Tant qu'elles sont pas égales, on va continuer d'aller vers le bas
                    yPath++;
                    currentPosition += taille;
                    tab[currentPosition] = "S";
                }
            }
        }
        else if (randomNb <= 60) {//En bas
            tmpRand = Math.floor(Math.random() * 3) + 1;//Génère un nombre aléatoire entre 1 et 3
            if (yPath < taille - 1) {
                if (yPath + tmpRand >= taille - 1) {
                    nextY = taille - 1;
                }
                else {
                    nextY = nextY + tmpRand;
                }
                while (yPath != nextY) {//Tant qu'elles sont pas égales, on va continuer d'aller vers le bas
                    yPath++;
                    currentPosition += taille;
                    tab[currentPosition] = "S";
                }
            }
            else {
                tmpRand = Math.floor(Math.random() * 3) + 1;//Génère un nombre aléatoire entre 1 et 3
                if (xPath + tmpRand >= taille - 1) {
                    nextX = taille - 1;
                }
                else {
                    nextX = nextX + tmpRand;
                }
                while (xPath != nextX) {//Tant qu'elles sont pas égales, on va continuer d'aller vers la droite
                    xPath++;
                    currentPosition++;
                    tab[currentPosition] = "S";
                }
            }

        }
        else if (randomNb <= 100) {//À droite
            tmpRand = Math.floor(Math.random() * 3) + 1;//Génère un nombre aléatoire entre 1 et 3
            if (xPath < taille - 1) {
                if (xPath + tmpRand >= taille - 1) {
                    nextX = taille - 1;
                }
                else {
                    nextX = nextX + tmpRand;
                }
                while (xPath != nextX) {//Tant qu'elles sont pas égales, on va continuer d'aller vers la droite
                    xPath++;
                    currentPosition++;
                    tab[currentPosition] = "S";
                }
            }
            else {
                if (yPath + tmpRand >= taille - 1) {
                    nextY = taille - 1;
                }
                else {
                    nextY = nextY + tmpRand;
                }
                while (yPath != nextY) {//Tant qu'elles sont pas égales, on va continuer d'aller vers le bas
                    yPath++;
                    currentPosition += taille;
                    tab[currentPosition] = "S";
                }
            }
        }
    }
}

function convertXYtoPos(width, x, y) {
    let pos = x + y * width;
    return pos;
}

function generateMap(taille) {//Fonction qui génère une carte
    mapTab = [];
    for (i = 0; i < taille * taille; i++) {//Pour toutes les cases
        randomNumber = Math.floor(Math.random() * 100) + 1;//On génère un nombre aléatoire entre 1 et 100
        if (randomNumber % 4 == 0) {// 1/4
            mapTab.push("B");//Bombe
        }
        else if (randomNumber % 7 == 0) {// 1/5
            mapTab.push("W");//Wall
        }
        else {
            mapTab.push("S");//Safe
        }
    }
    generateRandomPath(mapTab);

    //On fait un système pour avoir une plateforme d'apparition "safe" qui permet de prendre des informations.
    mapTab[0] = "A";
    mapTab[1] = "Z";
    mapTab[taille] = "E";
    mapTab[taille + 1] = "R";
    //On fait un système pour définir une plateforme de fin, l'objectif du jeu est de l'atteindre. 
    //Pas encore programmé la "fin" (genre que ca affiche qu'on a gagné)
    mapTab[mapTab.length - 1] = "T";
    mapTab[mapTab.length - 2] = "T";
    mapTab[mapTab.length - taille - 1] = "T";
    mapTab[mapTab.length - taille - 2] = "T";
    return mapTab;
}

function clearAllTabs() {
    mapTab.splice(0, mapTab.length)
    gameMapGraph.splice(0, gameMapGraph.length)
    lineAndColGraph.splice(0, lineAndColGraph.length)
    TabBombeColonne.splice(0, TabBombeColonne.length)
    TabBombeLigne.splice(0, TabBombeLigne.length)
    BombsAroundArray.splice(0, BombsAroundArray.length)
    flag.Graph.splice(0, flag.Graph.length)
}

function startNewGame() {
    if (activateLineAndColHelp == true) {
        tileSizeInPx = 500 / (taille + 1)
    }
    else {
        tileSizeInPx = 500 / taille
    }
    clearAllTabs()
    generateMap(taille)
    linkTabToGraph(mapTab)
    initializeFlags()
    numberBombsAroundTileGraph()
    if (activateLineAndColHelp == true) {
        findBombColonne();
        findBombLigne();
        lineAndColHelp();
    }
    ninja.Pos = 0
    ninja.PosX = 0
    ninja.PosY = 0
    ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], 0, 0)

}


function initializeFlags() {
    for (let i = 0; i < mapTab.length; i++) {
        flag.Graph[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[12], tileX * tileSizeInPx, tileY * tileSizeInPx);
        flag.Tab[i] = 0;
    }
}


function linkTabToGraph(mapTab) {//Fonction qui lie le tableau de caractères et d'images
    //On mets les deux axes à 0
    var xAxis = 0, yAxis = 0;
    let alignement = true;
    let nbCases = -1;
    for (let i = 0; i < mapTab.length; i++) {
        nbCases += 1;
        //Système pour mettre les bonnes textures afin de faire le quadrillage
        if (taille % 2 == 0) {
            if (nbCases % taille == 0) {
                alignement = !alignement;
            }
            if (alignement == true) {
                if (nbCases % 2 == 0) {
                    if (mapTab[i] == "S") {//Safe
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solFonce], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "B") {//Bomb
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solFonce], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "W") {//Wall
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[wallFonce], xAxis, yAxis));
                    }
                }
                else {
                    if (mapTab[i] == "S") {//Safe
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solClair], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "B") {//Bomb
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solClair], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "W") {//Wall
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[wallClair], xAxis, yAxis));
                    }
                }
            }
            else {
                if (nbCases % 2 == 1) {
                    if (mapTab[i] == "S") {//Safe
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solFonce], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "B") {//Bomb
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solFonce], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "W") {//Wall
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[wallFonce], xAxis, yAxis));
                    }
                }
                else {
                    if (mapTab[i] == "S") {//Safe
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solClair], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "B") {//Bomb
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solClair], xAxis, yAxis));
                    }
                    else if (mapTab[i] == "W") {//Wall
                        gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[wallClair], xAxis, yAxis));
                    }
                }
            }
        }
        else {
            if (nbCases % 2 == 0) {
                if (mapTab[i] == "S") {//Safe
                    gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solClair], xAxis, yAxis));
                }
                else if (mapTab[i] == "B") {//Bomb
                    gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solClair], xAxis, yAxis));
                }
                else if (mapTab[i] == "W") {//Wall
                    gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[wallClair], xAxis, yAxis));
                }
            }
            else {
                if (mapTab[i] == "S") {//Safe
                    gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solFonce], xAxis, yAxis));
                }
                else if (mapTab[i] == "B") {//Bomb
                    gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[solFonce], xAxis, yAxis));
                }
                else if (mapTab[i] == "W") {//Wall
                    gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[wallFonce], xAxis, yAxis));
                }
            }
        }
        if ((mapTab[i] == "A") || (mapTab[i] == "Z") || (mapTab[i] == "E") || (mapTab[i] == "R")) {//Spawn
            gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[44], xAxis, yAxis));
        }
        else if (mapTab[i] == "T") {//End
            gameMapGraph.push(new component(tileSizeInPx, tileSizeInPx, imagesTab[7], xAxis, yAxis));
        }
        xAxis += tileSizeInPx;
        if (xAxis >= ((taille - 1) * tileSizeInPx) + 1) {
            xAxis = 0;
            yAxis += tileSizeInPx;
        }
    }
}

//Tableau qui va contenir le nombre de bombes dans les 8 cases autour d'une case d'indice i
var BombsAroundArray = [];
var compteurPourSwitch = 0;//variable temporaire qui permet de compter à chaque fois pour le switch case
function numberBombsAroundTileGraph() {

    //On mets les deux axes à 0
    var xAxis = 0, yAxis = 0;

    for (let i = 0; i < mapTab.length; i++) {
        BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[10], xAxis, yAxis);
        compteurPourSwitch = findCaseBomb8(i);
        switch (compteurPourSwitch) {//On affiche le bon numéro (pour le moment, ne marche que pour 8 max)
            case 8:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[20], xAxis, yAxis);
                break;
            case 7:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[19], xAxis, yAxis);
                break;
            case 6:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[18], xAxis, yAxis);
                break;
            case 5:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[17], xAxis, yAxis);
                break;
            case 4:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[16], xAxis, yAxis);
                break;
            case 3:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[15], xAxis, yAxis);
                break;
            case 2:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[14], xAxis, yAxis);
                break;
            case 1:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[13], xAxis, yAxis);
                break;
            case 0:
                BombsAroundArray[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[12], xAxis, yAxis);
                break;

            default:
                break;
        }
        //Fonction qui s'occupe du retour à la ligne, permet de créer une carte en 2D
        xAxis += tileSizeInPx;
        if (xAxis >= ((taille - 1) * tileSizeInPx) + 1) {
            xAxis = 0;
            yAxis += tileSizeInPx;
        }
    }
}

function plainTheme() {
    solClair = 0;
    solFonce = 1;
    wallClair = 2;
    wallFonce = 3;
    bombClair = 4;
    bombFonce = 5;
    ninjaDeFace = 8;
    ninjaDeDos = 9;
    ninjaDeDroite = 10;
    ninjaDeGauche = 11;
    ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
    gameMapGraph = [];
    linkTabToGraph(mapTab);
}

function desertTheme() {
    solClair = 48;
    solFonce = 49;
    wallClair = 50;
    wallFonce = 51;
    bombClair = 52;
    bombFonce = 53;
    ninjaDeFace = 54;
    ninjaDeDos = 55;
    ninjaDeDroite = 56;
    ninjaDeGauche = 57;
    ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
    gameMapGraph = [];
    linkTabToGraph(mapTab);
}

function snowTheme() {
    solClair = 58;
    solFonce = 59;
    wallClair = 60;
    wallFonce = 61;
    bombClair = 62;
    bombFonce = 63;
    ninjaDeFace = 64;
    ninjaDeDos = 65;
    ninjaDeDroite = 66;
    ninjaDeGauche = 67;
    ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
    gameMapGraph = [];
    linkTabToGraph(mapTab);
}
var showWalkedOnBomb = true;//Si true, on affiche la bombe une fois qu'on est mort dessus
var activateLineAndColHelp = true;//Si true, on affiche le nombre de bombe à chaque ligne et chaque colonne
var taille = 10;//taille de la map
var mapTab = [];
//Tableau qui contient les textures des cases
var gameMapGraph = [];
var storyMode = false;
var customMap = false;
var bombProbability = 4;
var wallProbability = 7;

var solClair = 0;
var solFonce = 1;
var wallClair = 2;
var wallFonce = 3;
var bombClair = 4;
var bombFonce = 5;
var ninjaDeFace = 8;
var ninjaDeDos = 9;
var ninjaDeDroite = 10;
var ninjaDeGauche = 11;

function startGame() {//Fonction qui s'occupe de la mise en place du jeu
    GameMap.start();//Lance le jeu
    document.getElementById('canvasGame').appendChild(GameMap.canvas);
    if (!storyMode && !customMap) {
        mapTab = generateMap(taille);//Génération de la carte selon la taille souhaitée
    }
    //console.log(mapTab, taille);

    linkTabToGraph(mapTab);//Fonction qui lie le tableau de caractères à la map graphique
    findBombColonne();
    findBombLigne();
    lineAndColHelp();
    numberBombsAroundTileGraph();
    for (let i = 0; i < mapTab.length; i++) {
        flag.Graph[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[12], tileX * tileSizeInPx, tileY * tileSizeInPx);
        flag.Tab[i] = 0;
    }
    initializeFlags();
}

var nbDeCoups = 0;
var keyPressed = false;//Enregistre si la touche est pressée.
var GameMap = {//Carte du jeu
    canvas: document.createElement("canvas"), //Zone du jeu
    start: function () {//GameMap.start()
        if (activateLineAndColHelp == true) {//Si on active l'aide sur les lignes et colonnes
            this.canvas.width = 500;//taille du canvas
            this.canvas.height = 500;//taille du canvas
        }
        else {
            this.canvas.width = taille * tileSizeInPx;//taille du canvas
            this.canvas.height = taille * tileSizeInPx;//taille du canvas
        }

        this.context = this.canvas.getContext("2d");//En 2D
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);//Update le jeu toutes les 20ms (50ticks/s)
        this.canvas.addEventListener('mousedown', function (e) {

            getMousePositionFlag(GameMap.canvas, e);
            getTileOnClickFlag();
            placeFlag();
        })
        window.addEventListener('keydown', function (e) {//Quand la touche est appuyée
            if (keyPressed == false) {//Pour effectuer une seule action par appui
                GameMap.key = e.keyCode;//On récupère le keycode de la touche appuyée
                //Q, ArrowRight, A -> Mouvement vers la gauche
                if (GameMap.key && (GameMap.key == 81 || GameMap.key == 37 || GameMap.key == 65)) {
                    if (mapTab[ninja.Pos - 1] != "W" && ninja.Pos % taille != 0) {//Si le ninja n'avance pas vers un mur ou la bordure de la carte
                        ninja.Pos -= 1;
                        ninja.PosX -= 1;
                        ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeGauche], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                        nbDeCoups += 1;
                        count4 = 0;
                        count8 = 0;
                        allowCount = true;
                        allowCount8 = true;
                    }
                }
                //D -> Mouvement vers la droite
                if (GameMap.key && (GameMap.key == 68 || GameMap.key == 39)) {
                    if (mapTab[ninja.Pos + 1] != "W" && ninja.Pos % taille != taille - 1) {//Si le ninja n'avance pas vers un mur ou la bordure de la carte
                        if (mapTab[ninja.Pos + 1] != "W") {
                            ninja.Pos += 1;
                            ninja.PosX += 1;
                            ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeDroite], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                            nbDeCoups += 1;
                            count4 = 0;
                            count8 = 0;
                            allowCount = true;
                            allowCount8 = true;
                        }
                    }
                }
                //Z, ArrowUp, W -> Mouvement vers le haut
                if (GameMap.key && (GameMap.key == 90 || GameMap.key == 38 || GameMap.key == 87)) {
                    if (mapTab[ninja.Pos - taille] != "W" && ninja.Pos >= taille) {//Si le ninja n'avance pas vers un mur ou la bordure de la carte
                        ninja.Pos -= taille;
                        ninja.PosY -= 1;
                        ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeDos], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                        nbDeCoups += 1;
                        count4 = 0;
                        count8 = 0;
                        allowCount = true;
                        allowCount8 = true;
                    }
                }
                //S -> Mouvement vers le bas
                if (GameMap.key && (GameMap.key == 83 || GameMap.key == 40)) {
                    if (mapTab[ninja.Pos + taille] != "W" && ninja.Pos < taille * taille - taille) {//Si le ninja n'avance pas vers un mur ou la bordure de la carte
                        ninja.Pos += taille;
                        ninja.PosY += 1;
                        ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                        nbDeCoups += 1;
                        count4 = 0;
                        count8 = 0;
                        allowCount = true;
                        allowCount8 = true;
                    }
                }
                GameMap.key = false;//On oublie le keycode de la touche appuyée
                keyPressed = true;//On considère que la touche est appuyée
            }
            else {//Si touche déjà appuyée : 
                GameMap.key = false;//On oublie le keycode
            }

        })
        window.addEventListener('keyup', function (e) {//Quand la touche est relachée
            keyPressed = false;//On considère que la touche n'est plus appuyée
            GameMap.key = false;//On oublie le keycode de la touche
        })
    },
    clear: function () {//GameMap.clear()
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);//Clear le rectangle
    }
}

var count4 = 0; // compteur de bombes
var allowCount = true; // booléen autorisant à compter

function findBomb4() {
    if (allowCount == true) {
        if (mapTab[ninja.Pos + 1] == 'B' && ninja.Pos % taille != taille - 1) { // on regarde à droite et on ne compte pas si on est à la bordure droite
            count4 += 1;                    // On incrémente si il y a une bombe
        }
        if (mapTab[ninja.Pos - 1] == 'B' && ninja.Pos % taille != 0) { // on regarde à gauche et on ne compte pas si on est à la bordure gauche
            count4 += 1;                   // On incrémente si il y a une bombe
        }
        if (mapTab[ninja.Pos + taille] == 'B') { // on regarde en bas
            count4 += 1;                       // On incrémente si il y a une bombe
        }
        if (mapTab[ninja.Pos - taille] == 'B') { // on regarde en haut
            count4 += 1;                         // On incrémente si il y a une bombe 
        }
        allowCount = false; //Interdiction de recompter 
    }
};
var update = true;
var timer = 0;
//Fonction qui met à jour la zone de jeu
function updateGameArea() {
    if (update == true) {
        timer += 1;
        nextlvl();
        GameMap.clear();
        for (let i = 0; i < mapTab.length; i++) {
            gameMapGraph[i].update();
        }
        findBomb4(); // Exécution de la fonction pour trouver les bombes dans les 4 cases autour du ninja
        findBomb8(); //Fonction pour trouver les bombes dans les 8 cases autour du ninja
        if (activateLineAndColHelp == true) {
            for (let i = 0; i < lineAndColGraph.length; i++) {
                lineAndColGraph[i].update();
            }
            for (let i = 0; i < TabBombeColonne.length; i++) {
                TabBombeColonne[i].update();
            }
            for (let i = 0; i < TabBombeLigne.length; i++) {
                TabBombeLigne[i].update();
            }
        }
        for (let i = 0; i < BombsAroundArray.length; i++) {
            BombsAroundArray[i].update();
        }
        for (let i = 0; i < flag.Graph.length; i++) {
            flag.Graph[i].update();
        }
        linkBackToCharacter();
        ninja.img.update();
        findBomb4(); // Exécution de la fonction pour trouver les bombes dans les 4 cases autour du ninja
        findBomb8(); //Fonction pour trouver les bombes dans les 8 cases autour du ninja
        updateScoreboard(scoreTotal, "nbDeCoups", 9999);
        updateScoreboard(nbDeMorts, "nbDeMorts", 9999);
        updateScoreboard(count4, "count4", 4);
        updateScoreboard(count8, "count8", 8);
    }
}


function updateScoreboard(value, id, max) {
    let tmp = document.getElementById(id);
    if (value > max) {
        tmp.innerHTML = "###";
        //tmp.style.fontSize = "3.4rem";
    } else {
        tmp.innerHTML = value;
    }
}


var count8 = 0;
var allowCount8 = true;
//Fonction pour compter le nombre de bombes dans les 8 cases autour du ninja
function findBomb8() {

    if (allowCount8 == true) {

        if (mapTab[ninja.Pos + taille + 1] == 'B' && ninja.Pos % taille != taille - 1) { // on regarde en bas à droite
            count8 += 1;
        }
        if (mapTab[ninja.Pos + taille - 1] == 'B' && ninja.Pos % taille != 0) { // on regarde en bas à gauche 
            count8 += 1;
        }
        if (mapTab[ninja.Pos - taille + 1] == 'B' && ninja.Pos % taille != taille - 1) { // on regarde en haut à droite
            count8 += 1;
        }
        if (mapTab[ninja.Pos - taille - 1] == 'B' && ninja.Pos % taille != 0) { // on regarde en haut à gauche
            count8 += 1;                        // On incrémente si il y a une bombe 
        }
        count8 += count4
        allowCount8 = false; //Interdiction de recompter 
    }
};

//Fonction pour compter le nombre de bombes dans les 8 cases autour d'une case
function findCaseBomb8(caseIndex) {
    var countCase8 = 0;
    if (mapTab[caseIndex + taille + 1] == 'B' && caseIndex % taille != taille - 1) { // on regarde en bas à droite
        countCase8 += 1;
    }
    if (mapTab[caseIndex + taille - 1] == 'B' && caseIndex % taille != 0) { // on regarde en bas à gauche 
        countCase8 += 1;
    }
    if (mapTab[caseIndex - taille + 1] == 'B' && caseIndex % taille != taille - 1) { // on regarde en haut à droite
        countCase8 += 1;
    }
    if (mapTab[caseIndex - taille - 1] == 'B' && caseIndex % taille != 0) { // on regarde en haut à gauche
        countCase8 += 1;                        // On incrémente si il y a une bombe 
    }
    if (mapTab[caseIndex + 1] == 'B' && caseIndex % taille != taille - 1) { // on regarde à droite et on ne compte pas si on est à la bordure droite
        countCase8 += 1;                    // On incrémente si il y a une bombe
    }
    if (mapTab[caseIndex - 1] == 'B' && caseIndex % taille != 0) { // on regarde à gauche et on ne compte pas si on est à la bordure gauche
        countCase8 += 1;                   // On incrémente si il y a une bombe
    }
    if (mapTab[caseIndex + taille] == 'B') { // on regarde en bas
        countCase8 += 1;                       // On incrémente si il y a une bombe
    }
    if (mapTab[caseIndex - taille] == 'B') { // on regarde en haut
        countCase8 += 1;                         // On incrémente si il y a une bombe 
    }
    return countCase8;
};

// Fonction compte bombe sur ligne
var CountBombMapL = 0;
var BoolBombMapL = true;
var TabBombeLigne = [];
var LigneNum = 0;

function findBombLigne() {
    var BoolBombMapL = true;
    if (BoolBombMapL == true) {//On autorise à compter
        LigneNum = 0
        CountBombMapL = 0;
        for (var j = 0; j <= mapTab.length; j++) {
            if (mapTab[j] == 'B') {//On compte le nombre de bombes dans la ligne
                CountBombMapL += 1;
            }
            if (j % taille == taille - 1) {//On sauvegarde dans le tableau le nombre de bombes dans la ligne et on passe à la ligne suivante
                TabBombeLigne[LigneNum] = CountBombMapL;
                CountBombMapL = 0;
                LigneNum += 1;
            }
        }
        BoolBombMapL = false;
    }
};

// Fonction compte bombe sur colonne
var CountBombMapC = 0;
var BoolBombMapC = true;
var TabBombeColonne = [];
//Fonction pour compter le nombre de bombes dans les colonnes 
function findBombColonne() {
    BoolBombMapC = true
    if (BoolBombMapC == true) {
        CountBombMapC = 0;
        for (let i = 0; i < taille; i++) {
            for (let j = i; j < mapTab.length + taille; j += taille) {
                if (mapTab[j] == 'B') {
                    CountBombMapC += 1;
                }
                if (j % mapTab.length < taille && j > taille) {
                    TabBombeColonne[i] = CountBombMapC;
                    CountBombMapC = 0;
                }
            }
        }
        BoolBombMapC = false;
    }
};

var lineAndColGraph = []
function lineAndColHelp() {
    if (activateLineAndColHelp == true) {
        for (let i = 0; i < taille; i++) {
            lineAndColGraph[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[21], taille * tileSizeInPx, i * tileSizeInPx);
            lineAndColGraph[taille + i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[21], i * tileSizeInPx, taille * tileSizeInPx);
        }
        lineAndColGraph[taille * 2] = new component(tileSizeInPx, tileSizeInPx, imagesTab[21], taille * tileSizeInPx, taille * tileSizeInPx);
        for (let i = 0; i < taille; i++) {
            switch (TabBombeColonne[i]) {//On affiche le bon numéro pour les colonnes
                case 20:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[42], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 19:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[41], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 18:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[40], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 17:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[39], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 16:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[38], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 15:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[37], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 14:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[36], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 13:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[35], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 12:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[34], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 11:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[33], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 10:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[32], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 9:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[31], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 8:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[30], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 7:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[29], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 6:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[28], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 5:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[27], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 4:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[26], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 3:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[25], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 2:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[24], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 1:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[23], i * tileSizeInPx, taille * tileSizeInPx);
                    break;
                case 0:
                    TabBombeColonne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[22], i * tileSizeInPx, taille * tileSizeInPx);
                    break;

                default:
                    break;
            }

            switch (TabBombeLigne[i]) {//On affiche le bon numéro pour les lignes
                case 20:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[42], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 19:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[41], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 18:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[40], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 17:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[39], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 16:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[38], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 15:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[37], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 14:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[36], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 13:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[35], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 12:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[34], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 11:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[33], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 10:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[32], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 9:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[31], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 8:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[30], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 7:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[29], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 6:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[28], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 5:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[27], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 4:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[26], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 3:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[25], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 2:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[24], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 1:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[23], taille * tileSizeInPx, i * tileSizeInPx);
                    break;
                case 0:
                    TabBombeLigne[i] = new component(tileSizeInPx, tileSizeInPx, imagesTab[22], taille * tileSizeInPx, i * tileSizeInPx);
                    break;

                default:
                    break;
            }
        }
        TabBombeLigne[taille] = new component(tileSizeInPx, tileSizeInPx, imagesTab[43], taille * tileSizeInPx, taille * tileSizeInPx);
    }
}

var xOnClick = 100;
var yOnClick = 100;
function getMousePositionFlag(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    xOnClick = event.clientX - rect.left;
    yOnClick = event.clientY - rect.top;
}

var tileX = 10;
var tileY = 10;
var tileClickedOn = 10;
function getTileOnClickFlag() {
    tileX = Math.trunc(xOnClick / tileSizeInPx);
    tileY = Math.trunc(yOnClick / tileSizeInPx);
    tileClickedOn = tileX + (taille * tileY);
}

var flag = {//Objet pour lier l'image du drapeau et garder l'info de où ils sont
    Tab: [],
    Graph: [],
};


function placeFlag() {
    if (activateLineAndColHelp == false) {
        if (flag.Tab[tileClickedOn] == 1) {
            flag.Graph[tileClickedOn] = new component(tileSizeInPx, tileSizeInPx, imagesTab[12], tileX * tileSizeInPx, tileY * tileSizeInPx);
            flag.Tab[tileClickedOn] = 0;
        }
        else {
            flag.Graph[tileClickedOn] = new component(tileSizeInPx, tileSizeInPx, imagesTab[6], tileX * tileSizeInPx, tileY * tileSizeInPx);
            flag.Tab[tileClickedOn] = 1;
        }
    }
    else {
        if ((tileClickedOn < taille * taille) && (tileX < taille)) {
            //console.log("TileClickedOn = " + tileClickedOn + " xOnClick = " + xOnClick)
            if (flag.Tab[tileClickedOn] == 1) {
                flag.Graph[tileClickedOn] = new component(tileSizeInPx, tileSizeInPx, imagesTab[12], tileX * tileSizeInPx, tileY * tileSizeInPx);
                flag.Tab[tileClickedOn] = 0;
            }
            else {
                flag.Graph[tileClickedOn] = new component(tileSizeInPx, tileSizeInPx, imagesTab[6], tileX * tileSizeInPx, tileY * tileSizeInPx);
                flag.Tab[tileClickedOn] = 1;
            }
        }
    }
}

//Fonction pour créer des éléments en forme de cases
function component(width, height, imgsrc, x, y) {
    this.gamearea = GameMap;
    this.width = width;//Largeur
    this.height = height;//Hauteur
    this.x = x;//Coordonnées en X
    this.y = y;//Coordonnées en Y
    this.update = function () {
        ctx = GameMap.context;
        //ctx.fillStyle = color; //On remplit la nouvelle case dans la couleur souhaitée
        //ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(imgsrc, this.x, this.y, this.width, this.height);
    }
}

var scoreTotal = 0; // Score total
var scoreNiv = 0;   // Score gagné par fin de niveau 
var scoreNew = 0;
var niveaux = 0;
var scoreBool = true;
var finOk = true;

nextLevelButton.onclick = nextlvldelay;
playAgainButton.onclick = playAgain;

function playAgain() {
    update = true;
    lvlCompleteDiv.remove();
    lvlCompleteSection.setAttribute("class", "display-none");
    resetGameVar();
    startNewGame();
}

function nextlvl() {
    if (ninja.Pos == mapTab.length - 1 || ninja.Pos == mapTab.length - 2 || ninja.Pos == mapTab.length - taille - 1 || ninja.Pos == mapTab.length - taille - 2) {
        if (lvlCompleteSection.childElementCount == 0) {
            if (storyMode) {
                lvlCompleteSection.setAttribute("class", "lvl-container");
                lvlCompleteSection.append(lvlCompleteDiv);
                lvlStoryDiv.setAttribute("class", "lvl-story");
                lvlGameDiv.setAttribute("class", "display-none");
                showOrHideUsernameInput(19);
                update = false;
            } else {
                lvlCompleteSection.setAttribute("class", "lvl-container");
                lvlCompleteSection.append(lvlCompleteDiv);
                lvlStoryDiv.setAttribute("class", "display-none");
                lvlGameDiv.setAttribute("class", "lvl-game");
                update = false;
            }
        }
    }
}

function showOrHideUsernameInput(lvl) {
    if (niveaux == lvl) {
        if (usernameContainer.getAttribute("class") == "display-none") {
            usernameContainer.setAttribute("class", "type-username-container");
            usernameContainer.append(usernameInput);
            usernameContainer.append(submitUsernameButton);
        } else {
            usernameContainer.setAttribute("class", "display-none")
        }
        lvlStoryDiv.setAttribute("class", "display-none");
        return true;
    }
    usernameContainer.setAttribute("class", "display-none")
    usernameInput.remove();
    return false;
}

function endOfStoryMode() {
    if (usernameInput.value != "" && usernameInput.value.length > 3) {
        score();
        saveJSONData();
        setTimeout(quitGame, 1000);
    } else {
        usernameInput.value = "";
        usernameInput.style.border = "2px solid #e74c3c";
        usernameInput.placeholder = "PLEASE PROVIDE A VALID USERNAME";
        setTimeout(function () {
            usernameInput.style.border = "2px solid #FCF0CC";
            usernameInput.placeholder = "ENTER YOUR USERNAME";
        }, 2000)
    }
}

function nextlvldelay() {
    if (storyMode == true) {
        if (usernameContainer.getAttribute("class") != "type-username-container" || (usernameInput.value != "" && usernameInput.value.length >= 3)) {
            levelShowOutput.innerHTML = "Level " + (niveaux + 2);
            closeNextLevelMenu();
            score();

            ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], 0, 0);
            ninja.Pos = 0;
            ninja.PosX = 0;
            ninja.PosY = 0;

            resetGameVar();
            clearAllTabs();

            niveaux += 1;

            if (niveaux > 7) {
                desertTheme()
            }
            if (niveaux > 13) {
                snowTheme()
            }

            mapTab = [...allLVL[niveaux]];

            taille = Math.sqrt(mapTab.length);
            BoolBombMapC = true;
            BoolBombMapL = true;

            if (activateLineAndColHelp == true) {
                tileSizeInPx = 500 / (taille + 1);//Taille d'un carré de texture en pixel
            }
            else {
                tileSizeInPx = 500 / taille;//Taille d'un carré de texture en pixel
            }

            ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], 0, 0);
            document.getElementById('canvasGame').appendChild(GameMap.canvas);
            linkTabToGraph(mapTab);//Fonction qui lie le tableau de caractères à la map graphique
            findBombColonne();
            findBombLigne();
            lineAndColHelp();
            numberBombsAroundTileGraph();
            console.log(taille);
            console.log(tileSizeInPx);
            update = true;
            finOk = true;
            initializeFlags();
        } else {
            usernameInput.value = "";
            usernameInput.style.border = "2px solid #e74c3c";
            usernameInput.placeholder = "PLEASE PROVIDE A VALID USERNAME";
            //usernameInput.classList.add("red-border");
            setTimeout(function () {
                //usernameInput.classList.remove("red-border");
                usernameInput.style.border = "2px solid #FCF0CC";
                usernameInput.placeholder = "ENTER YOUR USERNAME";
            }, 2000)
        }
    }
}


//Fonction qui compte le score
function score() {
    //scoreNew = 0; //reset pour chaque debut de niveau
    if(niveaux == 19){
        scoreTotal += 499;
        return;
    }

    scoreNew += 50 //Score du niveau (+x pts)
    scoreNew -= 5 * nbDeCoups; //Points en moins par rapport aux nombres de coups
    scoreNew -= 25 * nbDeMorts; //Points en moins par rapport aux nombres de morts

    if (scoreNew <= 0) {
        scoreNew = 0; //Si le score du niv est inférieur à 0 alors on le met à 0 
    }
    scoreTotal += scoreNew; //On ajoute le score fait pendant le niv au score total
}

function resetGameVar() {
    nbDeCoups = 0;
    nbDeMorts = 0;
    count4 = 0;
    count8 = 0;
}


function saveJSONData() {
    var username = document.getElementById("username-input").value;
    var timerf = (timer * 20) / 1000;
    console.log(timerf);
    var file = "save-json-data.php";
    var data = {
        'scoreTotal': scoreTotal,
        'timer': timerf,
        'username': username
    };
    fetch(file, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(function (resp) {
        console.log('resp', resp)
    }).catch(err => console.error(err));
}
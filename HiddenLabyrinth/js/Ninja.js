var ninja = {//Variable qui contient toutes les infos sur le ninja
    img: new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], 0, 0),//Son image (ou texture)
    Tab: [],//Tableau qui contient la position du ninja
    Pos: 0,//Position actuelle du ninja dans le tableau
    PosX: 0,//Position de l'image sur l'axe X
    PosY: 0,//Position de l'image sur l'axe Y
};

var nbDeMorts = 0;
//Fonction qui lie le background et le ninja
function linkBackToCharacter() {
    for (let i = 0; i < mapTab.length; i++) {
        ninja.Tab[i] = " ";
    }
    ninja.Tab[ninja.Pos] = "Ninja";
    if (mapTab[ninja.Pos] == "B") {//Si le ninja marche sur une bombe, il réapparait au point de départ
        if (showWalkedOnBomb == true) {//Si true, on affiche la bombe une fois qu'il a marché dessus
            //Système qui permet de mettre la bonne texture de bombe
            if (ninja.PosX % 2 == 0) {
                if (ninja.PosY % 2 == 0) {
                    gameMapGraph[ninja.Pos] = new component(tileSizeInPx, tileSizeInPx, imagesTab[bombClair], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                }
                else {
                    gameMapGraph[ninja.Pos] = new component(tileSizeInPx, tileSizeInPx, imagesTab[bombFonce], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                }
            }
            else {
                if (ninja.PosY % 2 == 1) {
                    gameMapGraph[ninja.Pos] = new component(tileSizeInPx, tileSizeInPx, imagesTab[bombClair], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                }
                else {
                    gameMapGraph[ninja.Pos] = new component(tileSizeInPx, tileSizeInPx, imagesTab[bombFonce], ninja.PosX * tileSizeInPx, ninja.PosY * tileSizeInPx);
                }
            }

        }
        ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], 0, 0);
        ninja.Pos = 0;
        ninja.PosX = 0;
        ninja.PosY = 0;
        nbDeMorts += 1;

    }
}

function resetNinja() {
    ninja.Pos = 0
    ninja.PosX = 0
    ninja.PosY = 0
    ninja.img = new component(tileSizeInPx, tileSizeInPx, imagesTab[ninjaDeFace], 0, 0)
}
/************************************
*   gameListener.js
*************************************/

/*
*   VARIABLES
*/

// Main
var root = document.documentElement;
var isLoading = false;

// Video
var backgroundVideoContainer = document.querySelector(".background-video-container");
var backgroundVideo = document.getElementById("background-video");
var backgroundVideoLoading = document.getElementById("background-video-loading");

// Div
var menu = document.getElementById("menu");
var menuSetting = document.getElementById("menu-setting");
var settingMenu = document.getElementById("setting-menu");

var helpPopup = document.getElementById("help-popup");
var helpPopupBorder = document.getElementById("help-popup-border");
var helpAboutGame = document.getElementById("help-about-game");
var helpAboutEditor = document.getElementById("help-about-editor");

var selectDifficultyPopup = document.getElementById("difficulty-container")
var lvlCompleteSection = document.getElementById("lvl-container");

var scoreboardDiv = document.getElementById("scoreboard");
var levelShowDiv = document.getElementById("levelshow");

// Content
var menuLogo = document.getElementById("menu-logo");

var lvlCompleteDiv = document.getElementById("lvl-border");
var lvlCompleteNodeList = lvlCompleteDiv.childNodes;

var lvlStoryDiv = document.getElementById("lvl-story");
var lvlGameDiv = document.getElementById("lvl-game");

var scoreboardOutput = document.getElementById("scoreboard-output");
var levelShowOutput = document.getElementById("levelshow-output");

// Error
var mobile = document.getElementById("error");

// Section
var menuSection = document.getElementById("menu-section");
var gameSection = document.getElementById("game-section");
var editorSection = document.getElementById("editor-section");
var usernameContainer = document.getElementById("type-username-container");

// Button
var menuButton = document.getElementById("menu-btn");
var playButton = document.getElementById("play");

var playEasyButton = document.getElementById("easy");
var playMediumButton = document.getElementById("medium");
var playHardButton = document.getElementById("hard");

var storyButton = document.getElementById("story");
var editorButton = document.getElementById("editor");
var settingButton = document.getElementById("setting-button");

var nextLevelButton = document.getElementById("next-level-btn");
var playAgainButton = document.getElementById("play-again-btn");

var plainThemeButton = document.getElementById("plainTheme");
var desertThemeButton = document.getElementById("desertTheme");
var snowThemeButton = document.getElementById("snowTheme");

var bombDeathButton = document.getElementById("bombhelp");
var lineAndColButton = document.getElementById("lineandcolhelp");

var quitButton = document.querySelectorAll(".quit-button").forEach(element => {
    element.onclick = function () {
        quitGame();
    }
});

var loadCustomGameButton = document.getElementById("load-custom-game");

//input
var usernameInput = document.getElementById("username-input");
var submitUsernameButton = document.getElementById("username-button");

lvlCompleteDiv.remove();

/*
*   TODO
*
*   - CLOSE THE POPUP WHEN USER CLICK OUTSIDE THE DIV
*   - BRINGS SOME IMPROVEMENT
*
*/
var helpButton = document.querySelectorAll(".menu-help-img").forEach(element => {
    element.onclick = function () {
        helpPopupResize()
        //console.log(element);
        let nodeList = document.querySelectorAll(".menu-help-img");
        if (nodeList[0] == element) {
            if (helpAboutEditor.getAttribute("class") == "display-none") {
                helpAboutGame.setAttribute("class", "help-about-game");
            } else {
                helpAboutEditor.setAttribute("class", "display-none");
                helpAboutGame.setAttribute("class", "help-about-game");
            }

        } else if (nodeList[1] == element) {
            if (helpAboutGame.getAttribute("class") == "display-none") {
                helpAboutEditor.setAttribute("class", "help-about-editor");
            } else {
                helpAboutGame.setAttribute("class", "display-none");
                helpAboutEditor.setAttribute("class", "help-about-editor");
            }
        }
        openOrCloseHelpMenu();
    }
});

var closeHelpButton = document.querySelectorAll(".close-help-menu").forEach(element => {
    element.onclick = function () {
        helpPopupResize()
        openOrCloseHelpMenu();
    }
});

//=================================================================================================//

playButton.onclick = selectDifficulty;
editorButton.onclick = loadEditor;
storyButton.onclick = loadStory;

playEasyButton.onclick = difficultyEasy;
playMediumButton.onclick = difficultyMedium;
playHardButton.onclick = difficultyHard;

loadCustomGameButton.onclick = loadCustomGame;

plainThemeButton.onclick = function () {
    plainThemeButton.style.border = "2px solid #27ae60";
    plainThemeButton.style.borderRadius = "15px";

    desertThemeButton.style.border = "";
    snowThemeButton.style.border = "";

    plainTheme();
}

desertThemeButton.onclick = function () {
    desertThemeButton.style.border = "2px solid #27ae60";
    desertThemeButton.style.borderRadius = "15px";

    plainThemeButton.style.border = "";
    snowThemeButton.style.border = "";

    desertTheme();
}

snowThemeButton.onclick = function () {
    snowThemeButton.style.border = "2px solid #27ae60";
    snowThemeButton.style.borderRadius = "15px";

    plainThemeButton.style.border = "";
    desertThemeButton.style.border = "";

    snowTheme();
}

lineAndColButton.onclick = function () {
    if(activateLineAndColHelp){
        lineAndColButton.style.border = "2px solid #e74c3c";
        lineAndColButton.style.borderRadius = "15px";
        activateLineAndColHelp = false;
    } else {
        lineAndColButton.style.border = "2px solid #27ae60";
        lineAndColButton.style.borderRadius = "15px";
        activateLineAndColHelp = true;
    }
}

bombDeathButton.onclick = function () {
    if(showWalkedOnBomb){
        bombDeathButton.style.border = "2px solid #e74c3c";
        bombDeathButton.style.borderRadius = "15px";
        showWalkedOnBomb = false;
    } else {
        bombDeathButton.style.border = "2px solid #27ae60";
        bombDeathButton.style.borderRadius = "15px";
        showWalkedOnBomb = true;
    }
}

/**
*   
*   function to choose a difficulty
*
*   @returns {VoidFunction}
* 
*/
function selectDifficulty() {
    if(showWalkedOnBomb){
        bombDeathButton.style.border = "2px solid #27ae60";
        bombDeathButton.style.borderRadius = "15px";
    } else {
        bombDeathButton.style.border = "2px solid #e74c3c";
        bombDeathButton.style.borderRadius = "15px";
    }

    if(activateLineAndColHelp){
        lineAndColButton.style.border = "2px solid #27ae60";
        lineAndColButton.style.borderRadius = "15px";
    } else {
        lineAndColButton.style.border = "2px solid #e74c3c";
        lineAndColButton.style.borderRadius = "15px";
    }

    backgroundVideo.remove();
    menuLogo.remove();
    menuButton.remove();
    root.style.setProperty("--background-video-padding", 0);
    //root.style.setProperty("--select-difficulty-display", "flex");
    selectDifficultyPopup.setAttribute("class", "difficulty-container");
}


/**********************************
*   function to load game mode
***********************************/
function loadGame() {
    root.style.setProperty("--background-video-padding", 56.25 + "%");
    let random = Math.floor(Math.random() * 2) + 1;
    //root.style.setProperty("--select-difficulty-display", "none");
    selectDifficultyPopup.setAttribute("class", "display-none");
    root.style.setProperty("--background-video-loading-display", "flex");
    setTimeout(showGame, random * 1000);
}

function loadEditor() {
    backgroundVideo.remove();
    menuLogo.remove();
    menuButton.remove();
    root.style.setProperty("--background-video-loading-display", "flex");
    let random = Math.floor(Math.random() * 2) + 1;
    setTimeout(showEditor, random * 1000);
}

function loadStory() {
    backgroundVideo.remove();
    menuLogo.remove();
    menuButton.remove();
    root.style.setProperty("--background-video-loading-display", "flex");
    let random = Math.floor(Math.random() * 2) + 1;
    setTimeout(showStory, random * 1000);
}


/**********************************
*   game to show a game mode
***********************************/
function showGame() {
    isLoading = true;

    scoreboardDiv.setAttribute("class", "");
    levelShowDiv.setAttribute("class", "display-none");

    backgroundVideoLoading.remove();
    gameSection.setAttribute("class", "game-section");
    root.style.setProperty("--background-video-padding", 0);
    backgroundVideoContainer.classList.add("pad-25", "background-change");
    settingButton.classList.remove("padr-15");
    storyMode = false;
    resizeCanvas();
    resetNinja();
    startGame();
    helpPopupResize();
}

function showEditor() {
    isLoading = true;
    backgroundVideoLoading.remove();
    editorSection.setAttribute("class", "editor-section");
    root.style.setProperty("--background-video-padding", 0);
    backgroundVideoContainer.classList.add("pad-25", "background-change");
    settingButton.classList.remove("padr-15");
    startDesigner();
    helpPopupResize();
}


function showStory() {
    isLoading = true;
    scoreboardDiv.setAttribute("class", "display-none");
    levelShowDiv.setAttribute("class", "");
    levelShowOutput.innerHTML = "Level 1";

    backgroundVideoLoading.remove();
    gameSection.setAttribute("class", "game-section");
    root.style.setProperty("--background-video-padding", 0);
    backgroundVideoContainer.classList.add("pad-25", "background-change");
    settingButton.classList.remove("padr-15");

    customMap = false;
    storyMode = true;

    if (storyMode == true) {
        taille = 5;
        mapTab = [];
        mapTab = ["A", "Z", "S", "S", "S", "E", "R", "W", "B", "S", "S", "W", "B", "W", "S", "S", "B", "W", "T", "T", "S", "S", "S", "T", "T"];
    }

    resizeCanvas();
    resetNinja();
    startGame();
    helpPopupResize();
}




/**********************************
*   Utils
***********************************/
function onLoad(element) {
    backgroundVideoLoading.remove();
    element.setAttribute("class", "editor-section");
    root.style.setProperty("--background-video-padding", 0);
    backgroundVideoContainer.classList.add("pad-25", "background-change");
    settingButton.classList.remove("padr-15");
}

function updateScoreboard(value, id, max) {
    let tmp = document.getElementById(id);
    if (value > max) {
        //tmp.style.fontSize = "3.4rem";
        tmp.innerHTML = "###";
    } else {
        tmp.innerHTML = value;
    }
}

var inputValue;
var size;
var width;
function loadCustomGame() {
    inputValue = document.getElementById("custom-game-input").value;
    inputValue = inputValue.replaceAll(",", "").split("");
    size = inputValue.length;
    if (Math.sqrt(inputValue.length) % 1 != 0 || inputValue.length == 0) {
        setTimeout(() => {
            document.getElementById("load-game-error").innerHTML = ""
        }, 3000);
        document.getElementById("load-game-error").innerHTML = "Map must be a square"
        return;
    }

    width = Math.sqrt(inputValue.length);

    if (inputValue[0] != "A" || inputValue[1] != "Z" || inputValue[(width)] != "E" || inputValue[width + 1] != "R" || inputValue[size - 1] != "T" || inputValue[size - 2] != "T" || inputValue[(size - width) - 1] != "T" || inputValue[(size - width) - 2] != "T") {
        setTimeout(() => {
            document.getElementById("load-game-error").innerHTML = ""
        }, 3000);
        document.getElementById("load-game-error").innerHTML = "Error encountered during the process (is map a square?)"
        return;
    }

    mapTab = [];
    customMap = true;
    mapTab = inputValue;
    taille = Math.sqrt(mapTab.length);
    loadGame();
}


function difficultyEasy() {
    taille = 8
    if (activateLineAndColHelp == true) {
        tileSizeInPx = 500 / (taille + 1)
    }
    else {
        tileSizeInPx = 500 / taille
    }
    bombProbability = 6;
    wallProbability = 4;
    loadGame();
}

function difficultyMedium() {
    taille = 12
    if (activateLineAndColHelp == true) {
        tileSizeInPx = 500 / (taille + 1)
    }
    else {
        tileSizeInPx = 500 / taille
    }
    bombProbability = 4;
    wallProbability = 5;
    loadGame();
}

function difficultyHard() {
    taille = 16
    if (activateLineAndColHelp == true) {
        tileSizeInPx = 500 / (taille + 1)
    }
    else {
        tileSizeInPx = 500 / taille
    }
    bombProbability = 3;
    wallProbability = 7;
    loadGame();
}
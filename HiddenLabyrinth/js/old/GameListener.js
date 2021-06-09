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

// Content
var menuLogo = document.getElementById("menu-logo");

// Error
var mobile = document.getElementById("error");

// Section
var menuSection = document.getElementById("menu-section");
var gameSection = document.getElementById("game-section");
var editorSection = document.getElementById("editor-section");

// Button
var menuButton = document.getElementById("menu-btn");
var playButton = document.getElementById("play");
var storyButton = document.getElementById("story");
var editorButton = document.getElementById("editor");
var settingButton = document.getElementById("setting-button");
var quitButton = document.getElementById("quit-game");


/*
*   TODO
*
*   - CLOSE THE POPUP WHEN USER CLICK OUTSIDE THE DIV
*   - BRINGS SOME IMPROVEMENT
*
*/
var helpButton = document.querySelectorAll(".menu-help-img").forEach(element => {
    element.onclick = function(){
        helpPopupResize()
        //console.log(element);
        let nodeList = document.querySelectorAll(".menu-help-img");
        if(nodeList[0] == element){
            if(helpAboutEditor.getAttribute("class") == "display-none"){
                helpAboutGame.setAttribute("class", "help-about-game");
            } else {
                helpAboutEditor.setAttribute("class", "display-none");
                helpAboutGame.setAttribute("class", "help-about-game");
            }

        } else if(nodeList[1] == element) {
            if(helpAboutGame.getAttribute("class") == "display-none"){
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
    element.onclick = function(){
        helpPopupResize()
        openOrCloseHelpMenu();
    }
});

//=================================================================================================//


playButton.onclick = loadGame;
editorButton.onclick = loadEditor;

/*
*   Load functions
*/
function loadGame(){
    backgroundVideo.remove();
    menuLogo.remove();
    menuButton.remove();
    root.style.setProperty("--background-video-loading-display", "flex");
    let random = Math.floor(Math.random() * 3) + 1;
    setTimeout(showGame, random*1000);
}

function loadEditor(selectedBtn){
    backgroundVideo.remove();
    menuLogo.remove();
    menuButton.remove();
    root.style.setProperty("--background-video-loading-display", "flex");
    let random = Math.floor(Math.random() * 2) + 1;
    setTimeout(showEditor, random*1000);
}


/*
*   show game functions
*/
function showGame(){
    isLoading = true;
    backgroundVideoLoading.remove();
    gameSection.setAttribute("class", "game-section");
    root.style.setProperty("--background-video-padding", 0);
    backgroundVideoContainer.classList.add("pad-25", "background-change");
    settingButton.classList.remove("padr-15");
    startGame();
    helpPopupResize();
}

function showEditor(){
    isLoading = true;
    backgroundVideoLoading.remove();
    editorSection.setAttribute("class", "editor-section");
    root.style.setProperty("--background-video-padding", 0);
    backgroundVideoContainer.classList.add("pad-25", "background-change");
    settingButton.classList.remove("padr-15");
    startDesigner();
    helpPopupResize();
}


/*
*   Utils
*/
function onLoad(element){
    backgroundVideoLoading.remove();
    element.setAttribute("class", "editor-section");
    //root.style.setProperty("--game-section", "flex");
    root.style.setProperty("--background-video-padding", 0);
    backgroundVideoContainer.classList.add("pad-25", "background-change");
    settingButton.classList.remove("padr-15");
}

function updateScoreboard(value, id, max){
    let tmp = document.getElementById(id);
    if(value > max){
        tmp.innerHTML = "###";
        //tmp.style.fontSize = "3.4rem";
    } else {
        tmp.innerHTML = value;
    }
}

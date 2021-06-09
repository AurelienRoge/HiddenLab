/************************************
*   setting.js
*************************************/

// Variables
var video = document.getElementsByClassName("vid-vol");
var volumeValue = document.getElementById("background-video-volume").value;

// Listener
settingButton.onclick = openOrCloseSettingMenu;
quitButton.onclick = quitGame;

document.addEventListener("click", function(e) {
    if(settingMenu.getAttribute("class") == "setting ind30") {
        if(!settingMenu.contains(e.target) && e.target != settingButton){
            openOrCloseSettingMenu();
        }
    } /*else if(helpPopup.getAttribute("class") == "help-popup-container"){
        if(!helpPopup.contains(e.target) && e.target != helpButton){
            openOrCloseHelpMenu();
        }
    }*/
});

document.addEventListener("keydown", function(e) {
    if(settingMenu.getAttribute("class") == "setting ind30") {
        if(e.keyCode == 27){
            openOrCloseSettingMenu();
        }
    } /*else if(helpPopup.getAttribute("class") == "help-popup-container"){
        if(e.keyCode == 27){
            openOrCloseHelpMenu();
        }
    }*/
});

/**
*
* openSettingMenu allows user to open setting menu and close it 
*
* @return {VoidFunction} 
*
*/
function openOrCloseSettingMenu(){
    //console.log(settingMenu.getAttribute("class"));
    if(settingMenu.getAttribute("class") == "display-none"){
        settingMenu.setAttribute("class", "setting ind30");
    } else {
        settingMenu.setAttribute("class", "display-none");
    }
}

/**
*
* quitGame allows user to return to the main menu 
*
* @return {VoidFunction} 
*
*/
function quitGame(){
    if(isLoading){

        // isloading is now false
        isLoading = false;

        // reapppend background video
        backgroundVideoContainer.appendChild(backgroundVideo);
        backgroundVideoContainer.appendChild(backgroundVideoLoading);

        // reappend menuLogo and menuBtn to menu section
        menu.appendChild(menuLogo);
        menu.appendChild(menuButton);
        root.style.setProperty("--background-video-loading-display", "none");

        // game and editor section now inactive
        gameSection.setAttribute("class", "display-none");
        editorSection.setAttribute("class", "display-none");

        // video loading now active
        root.style.setProperty("--background-video-padding", 56.25 + "%");
        backgroundVideoContainer.classList.remove("pad-25", "background-change");
        settingButton.classList.add("padr-15");

        if(canvasGame.childElementCount != 0){
            canvasGame.firstChild.remove();
            nbDeCoups = 0;
            nbDeMorts = 0;
        }

        //reset game here
        
        // play sound video and close setting menu
        playVideo(null);
        openOrCloseSettingMenu();
        helpPopupResize();
    }
}

/**
*
* updateVolume allows user to adjust volume like he wants
*
* @return {Number} 
*
*/
function updateVolume(val){
    for (let i = 0; i < video.length; i++) {
        video[i].volume = val/100;
    }
}

function setVolume(val){
    for (let i = 0; i < video.length; i++) {
        video[i].volume = val;
    }
}

function muteVideo(){
    for (let i = 0; i < video.length; i++) {
        video[i].muted = true;
    }
}

function unmuteVido(){
    for (let i = 0; i < video.length; i++) {
        video[i].muted = false;
    }
}

function playVideo(index){
    if(index != null){
        video[index].play();
    } else {
        for (let i = 0; i < video.length; i++) {
            video[i].play();
        }        
    }
}

/**
*
* openHelpMenu allows user to have some help and explaination
*
* @return {VoidFunction} 
*
*/
function openOrCloseHelpMenu(){
    //help-popup-container
    if(helpPopup.getAttribute("class") == "display-none"){
        helpPopup.setAttribute("class", "help-popup-container");
    } else {
        helpPopup.setAttribute("class", "display-none");
    }
}
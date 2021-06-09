/************************************
*   gameresponsive.js
*************************************/

/*
*   VARIABLES
*/
var onMobile = false;
var timer;
var screenWidth;

/*
*   listeners
*/
window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = this.setTimeout(function () {
        isGamePlayable();
        helpPopupResize();
        difficultyPopupResize();
    }, 50);
});

/*
*   functions
*/

/**
 * 
 * isUserOnMobile allows to know if user is on a mobile device
 * 
 * @returns {Boolean}
 */
function isUserOnMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //console.log("DEBUG: mobile");
        onMobile = true;
        return true;
    } else {
        //console.log("DEBUG: not mobile");
        //playVideo();
        return false;
    }
}

/**
 * 
 * isGamePlayable allows to display game or not
 * 
 * @returns {Boolean}
 */
function isGamePlayable() {
    if (onMobile) {
        muteVideo();
        menuSection.remove();
        mobile.setAttribute("class", "mobile");
        //root.style.setProperty("--loading-error", "flex");
        return true;
    } else {
        if (menuSection != null) {
            screenWidth = window.innerWidth;
            menuSection.setAttribute("class", "h-auto");
            console.log("DEBUG: " + screenWidth);
            if (!isLoading) {
                if (screenWidth < 1200) {
                    muteVideo();
                    menuSection.hidden = true;
                    mobile.setAttribute("class", "mobile");
                    //root.style.setProperty("--loading-error", "flex");
                } else {
                    unmuteVido();
                    menuSection.hidden = false;
                    //root.style.setProperty("--loading-error", "none");
                    mobile.setAttribute("class", "display-none");
                }
            } else {
                if (screenWidth < 1200) {
                    muteVideo();
                    menuSection.hidden = true;
                    mobile.setAttribute("class", "mobile");
                    //root.style.setProperty("--loading-error", "flex");
                } else {
                    unmuteVido();
                    menuSection.hidden = false;
                    //root.style.setProperty("--loading-error", "none");
                    mobile.setAttribute("class", "display-none");
                }
            }
            return true;
        } else {
            return false;
        }
    }
}

function helpPopupResize() {
    let h = backgroundVideoContainer.offsetHeight;
    let w = backgroundVideoContainer.offsetWidth + 1;
    root.style.setProperty("--help-popup-height", h + "px");
    root.style.setProperty("--help-popup-width", w + "px");
}

function difficultyPopupResize() {
    let h = backgroundVideoContainer.offsetHeight;
    let w = backgroundVideoContainer.offsetWidth + 1;
    if (screenWidth < 1200) {
        return;
    }
    root.style.setProperty("--difficulty-popup-height", h + "px");
    root.style.setProperty("--difficulty-popup-width", w + "px");
}

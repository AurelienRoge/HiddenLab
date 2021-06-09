<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descript A COMPLETER">
    <title>HiddenLab | Jouer</title>

    <!-- FAVICON -->
    <link rel="icon" href="img/favicon.ico" type="image/ico">

    <!-- CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="css/play.css">
    <link rel="stylesheet" href="css/hover.css">
    <link rel="stylesheet" href="css/editor.css">

    <!-- PT serif -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap" rel="stylesheet">

    <!-- FONTAWESOME LIB -->
    <script src="https://kit.fontawesome.com/45e38e596f.js" crossorigin="anonymous"></script>

    <!-- AOS LIB -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
        ::-moz-selection {
            /* Code for Firefox */
            background: #F4A4B0;
        }

        ::selection {
            background: #F4A4B0;
        }
    </style>

</head>

<body data-aos="fade" onload="isUserOnMobile(), isGamePlayable()">
    <header class="header-container">
        <nav class="navbar-container navbar-band-solid">
            <a href="index.php"><img src="img/web/logo.png" alt="Logo"></a>
            <a class="hvr-grow hvr-underline-from-center" href="index.php"><i class="fas fa-home"></i>HOME</a>
            <a class="hvr-grow hvr-underline-from-center" href="play.php"><i class="fa fa-fire" aria-hidden="true"></i>PLAY</a>
            <a class="hvr-grow hvr-underline-from-center" href="leaderboard.php"><i class="fas fa-trophy" aria-hidden="true"></i>LEADERBOARD</a>
        </nav>
    </header>

    <main>
        <article class="h-auto mt-125">
            <div id="help-popup" class="display-none">
                <!-- display-none -->
                <div id="help-popup-border" class="help-popup-border">

                    <!-- help-about-game -->
                    <div id="help-about-game" class="display-none">
                        <div class="help-title">
                            <h3>SOME EXPLANATIONS ABOUT THE GAME</h3>
                            <svg class="close-help-menu hvr-shrink" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="white" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                            </svg>
                        </div>
                        <div class="tutorial-video-popup">
                            <iframe width="1280" height="400" src="https://www.youtube.com/embed/jz7M4cq5YVE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>

                    <!-- help-about-editor -->
                    <div id="help-about-editor" class="display-none">
                        <div class="help-title">
                            <h3>SOME EXPLANATIONS ABOUT THE EDITOR</h3>
                            <svg class="close-help-menu hvr-shrink" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="white" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                            </svg>
                        </div>
                        <div class="tutorial-video-popup">
                            <iframe width="1280" height="400" src="https://www.youtube.com/embed/jz7M4cq5YVE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <!--<h1 class="h1-title">PLAY</h1>
            <hr class="game-line">-->
            <section id="menu-section" class="display-none">
                <div id="menu" class="menu-container">
                    <div id="setting-menu" class="display-none">
                        <div class="setting-logo">
                            <img src="img/web/logo-game.png" alt="Logo">
                        </div>
                        <div class="setting-volume">
                            <h3>Sound</h3>
                            <div class="slidecontainer">
                                <i class="fas fa-volume-down"></i>
                                <input id="background-video-volume" type="range" min="0" max="100" value="50" class="slider" onchange="updateVolume(this.value);">
                                <i class="fas fa-volume-up"></i>
                            </div>
                        </div>
                        <div class="theme-container">
                            <h3>Select your theme</h3>
                            <div class="theme-button">
                                <img id="plainTheme" class="hvr-shrink theme-button" src="img/web/themeplain.png" alt="plain theme">
                                <img id="desertTheme" class="hvr-shrink theme-button" src="img/web/themedesert.png" alt="desert theme">
                                <img id="snowTheme" class="hvr-shrink theme-button" src="img/web/themesnow.png" alt="snow theme">
                            </div>
                        </div>
                        <div class="setting-quit-img">
                            <img class="hvr-shrink quit-button" src="img/web/returnbtn.png" alt="return bouton">
                        </div>
                    </div>
                    <div id="menu-setting" class="menu-setting">
                        <img class="menu-setting-img padr-15" src="img/web/setting.png" alt="setting" id="setting-button">
                    </div>
                    <div id="menu-logo" class="menu-logo">
                        <img src="img/web/logo-game.png" alt="Logo">
                    </div>
                    <div id="menu-btn" class="menu-bouton">
                        <img id="play" class="hvr-shrink" src="img/web/play.png" alt="play">
                        <img id="story" class="hvr-shrink" src="img/web/story.png" alt="story">
                        <img id="editor" class="hvr-shrink" src="img/web/editor.png" alt="editor">
                    </div>
                </div>
                <div class="background-video-container background-video-border">
                    <video id="background-video" autoplay loop class="responsive-iframe vid-vol">
                        <source src="img/web/introvid.mp4" type="video/mp4">
                    </video>
                    <div id="difficulty-container" class="display-none">

                        <div class="difficulty-border">
                            <div class="difficulty-txt">
                                <h1>SELECT A DIFFICULTY</h1>
                                <hr class="difficulty-line">
                                <p>This game is divided into three increasing difficulties. Each of these difficulties have a random generation.</p>
                                <div class="difficulty-btn">
                                    <img id="easy" class="hvr-shrink" src="img/web/easy.png" alt="easy">
                                    <img id="medium" class="hvr-shrink" src="img/web/medium.png" alt="medium">
                                    <img id="hard" class="hvr-shrink" src="img/web/hard.png" alt="hard">
                                </div>
                                <div class="game-setting">
                                    <h3>GAME SETTINGS</h3>
                                    <div class="game-setting-button">
                                        <img id="lineandcolhelp" class="hvr-shrink" src="img/web/lineandcolhelp.png" alt="lineandcolhelp">
                                        <img id="bombhelp" class="hvr-shrink" src="img/web/bombondeath.png" alt="bombondeath">
                                    </div>
                                </div>
                                <div class="custom-container load-custom-game">
                                    <h2>CUSTOM GAME</h2>
                                    <input id="custom-game-input" type="text" placeholder="PASTE YOUR MAP CODE HERE">
                                    <img id="load-custom-game" class="hvr-shrink" src="img/web/load.png" alt="loadcustomgame">
                                    <p id="load-game-error"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="lvl-container" class="display-none">
                        <div id="lvl-border" class="lvl-border">
                            <div class="lvl-txt">
                                <h1>Well played</h1>
                            </div>
                            <div id="type-username-container" class="display-none">
                                <p>Congratulation, you have completed the main story !</p>
                                <input id="username-input" class="" placeholder="ENTER YOUR USERNAME" type="text">
                                <button id="username-button" class="" onclick="endOfStoryMode();">Submit</button>
                            </div>
                            <div id="lvl-story" class="display-none">
                                <p>Ohh nice play you have finished the map !</p>
                                <img class="hvr-shrink lvl-story-img" id="next-level-btn" src="img/web/nextlevel.png" alt="next level">
                                <div class="setting-quit-img">
                                    <img class="hvr-shrink quit-button" src="img/web/returnbtn.png" alt="return bouton">
                                </div>
                            </div>
                            <div id="lvl-game" class="display-none">
                                <p>Ohh nice play you have finished the map !</p>
                                <img class="hvr-shrink lvl-game-img" id="play-again-btn" src="img/web/playagain.png" alt="next level">
                                <div class="setting-quit-img">
                                    <img class="hvr-shrink quit-button" src="img/web/returnbtn.png" alt="return bouton">
                                </div>
                            </div>
                        </div>
                    </div>

                    <video id="background-video-loading" autoplay loop class="responsive-iframe background-video-loading vid-vol">
                        <source src="img/web/loading.mp4" type="video/mp4">
                    </video>

                    <div id="game-section" class="display-none">
                        <div id="canvasGame" class="canvas"></div>
                        <aside class="score-display">
                            <div id="scoreboard" class="">
                                <h3 id="scoreboard-output">Scoreboard</h3>
                            </div>
                            <div id="levelshow" class="">
                                <h3 id="levelshow-output">Level</h3>
                            </div>
                            <div class="info-row">
                                <div class="info-bomb-4">
                                    <p class="info-txt" id="count4"></p>
                                </div>
                                <div class="info-bomb-8">
                                    <p class="info-txt" id="count8"></p>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-dead">
                                    <p class="info-txt" id="nbDeMorts"></p>
                                </div>
                                <div class="info-score">
                                    <p class="info-txt" id="nbDeCoups"></p>
                                </div>
                            </div>
                            <div class="menu-help">
                                <img class="menu-help-img" src="img/web/help.png" alt="help-game" id="help-btn">
                            </div>
                        </aside>
                    </div>

                    <div id="editor-section" class="display-none">
                        <div id="map">
                            <div id="canvasDesigner"></div>
                        </div>
                        <aside class="editor-display">
                            <h3>Editor</h3>
                            <div id="buttons" class="editor-button-container">
                                <div id="selectSize" class="editor-button-size"></div>
                                <div class="editor-button">
                                    <div id="safeButtonDiv"></div>
                                    <div id="wallButtonDiv"></div>
                                    <div id="bombButtonDiv"></div>
                                </div>
                                <div class="editor-button-build">
                                    <div id="generateMapDiv"></div>
                                </div>
                                <div id="textToCopy"></div>
                            </div>
                            <div class="menu-help">
                                <img class="menu-help-img" src="img/web/help.png" alt="help-editor" id="help-btn">
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section id="error" class="display-none">
                <h2 class="error-h2">Bip Booop Biiip</h2>
                <hr class="error-line">
                <p>Cette erreur survient si vous êtes sur mobile ou que vous venez de redimensionner votre fenêtre</p>
            </section>

        </article>

        <article class="h-auto mt-125 tutorial">
            <h1 class="h1-title">TUTORIAL</h1>
            <hr class="line">
            <div class="tutorial-video">
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/jz7M4cq5YVE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </article>
    </main>

    <!-- footer -->
    <?php require("parts/footer.html") ?>

    <!-- AOS LIB -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>

    <!-- SOME UTILS AND REQUIRED MODULES -->
    <script src="js/GameListener.js"></script>
    <script src="js/Setting.js"></script>
    <script src="js/GameResponsive.js"></script>

    <!-- GAME/EDITOR/STORY MODULE -->
    <script src="js/StoryMode.js"></script>
    <script src="js/GameSystem.js"></script>
    <script src="js/GameMap.js"></script>
    <script src="js/images.js"></script>
    <script src="js/Ninja.js"></script>
    <script src="js/mapDesigner.js"></script>

    <!-- TIMED FUNCTION -->
    <script>
        setTimeout(() => {
            helpPopupResize();
            difficultyPopupResize();
            playVideo(null);
        }, 1500);
    </script>

</body>

</html>
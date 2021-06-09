<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descript A COMPLETER">
    <title>HiddenLab | Accueil</title>

    <!-- FAVICON -->
    <link rel="icon" href="img/favicon.ico" type="image/ico">

    <!-- CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/hover.css">

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

<body>
    <header class="header-container header-background">
        <nav class="navbar-container navbar-band">
            <a href="index.php"><img src="img/web/logo.png" alt="Logo"></a>
            <a class="hvr-grow hvr-underline-from-center" href="index.php"><i class="fas fa-home"></i>HOME</a>
            <a class="hvr-grow hvr-underline-from-center" href="play.php"><i class="fa fa-fire" aria-hidden="true"></i>PLAY</a>
            <a class="hvr-grow hvr-underline-from-center" href="leaderboard.php"><i class="fas fa-trophy" aria-hidden="true"></i>LEADERBOARD</a>
        </nav>
        <div class="header-text">
            <span>HiddenLab</span>
        </div>
        <div class="h-auto">
            <div class="icon-scroll"></div>
        </div>
        <div class="h-auto">
            <img class="wave" src="img/web/wave.png" alt="Wave" />
        </div>
    </header>

    <main class="main-container">
        <section class="h-auto" data-aos="fade">
            <h1 class="h1-title">Some reflection...</h1>
            <hr class="line">
            <div class="game-presentation">
                <p>HiddenLab is a reflection based game. It’s a mix between a labyrinth and the famous minesweeper game without being a “die and retry” game, which can be frustrating. You are able to deduce every single bomb by using informations given to you. In our game, you will find different game modes such as the story mode made of 20 levels with an increasing difficulty. You will as well find a random game mode in which a unique map will be created with an editable difficulty (every level has a solution!). For the most competitive among you, a leaderboard is available so you can rise to the top of the ranking ! </p>
            </div>
            <article class="character-presentation flex">
                <div class="priority-2 flex-grow-1">
                    <h2 class="h2-title">Welcome Eiko</h2>
                    <hr class="subline">
                    <p>You will embody Eiko’s, Eiko is a japanese teenager from Kiri’s village, Kiri’s known for his military success and manufacture of traditional military weapons who have armed the most famous samourai of the country. However a criminal group stole the most famous katana and the most prestigious which was placed in a museum. You have been designated to get back the mythic katana. However your mission forecast risky because you will meet on your road a lot of traps, a mistake and you will walk on a bomb and you will have to try your path again. I’m sure you will be able to dodge every single bomb with previous tips ! There, all is said, good luck Eiko ! </p>
                </div>
                <img class="character-img priority-1" src="img/web/ninja.png" alt="Shiny Eiko" />
            </article>
        </section>
    </main>

    <?php require("parts/footer.html") ?>


    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>

</body>

</html>
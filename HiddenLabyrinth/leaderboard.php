<!DOCTYPE html>
<html lang="en">
<?php
$servname = "localhost";
$dbname = "leaderboard";
$user = "root";
$pass = "";

try {
    $dbco = new PDO("mysql:host=$servname;dbname=$dbname", $user, $pass);
    $dbco->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sth = $dbco->prepare("SELECT Pseudo, scoreTotal, Timer FROM user ORDER BY scoreTotal DESC");
    $sth->execute();



    $resultat = $sth->fetchAll(PDO::FETCH_OBJ);

    /*print_r permet un affichage lisible des résultats,
            *<pre> rend le tout un peu plus lisible*/
    /* echo '<pre>';
             print_r($resultat); 
            echo '</pre>';*/
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descript A COMPLETER">
    <title>HiddenLab | Leaderboard</title>

    <!-- FAVICON -->
    <link rel="icon" href="img/favicon.ico" type="image/ico">

    <!-- CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" href="css/play.css">
    <link rel="stylesheet" href="css/hover.css">
    <link rel="stylesheet" href="css/leaderboard.css">

    <link rel="stylesheet" href="css/util.css">
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendor/animate/animate.css">
    <link rel="stylesheet" href="vendor/select2/select2.min.css">
    <link rel="stylesheet" href="vendor/perfect-scrollbar/perfect-scrollbar.css">

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
    <header class="header-container">
        <nav class="navbar-container navbar-band-solid">
            <a href="index.php"><img src="img/web/logo.png" alt="Logo"></a>
            <a class="hvr-grow hvr-underline-from-center" href="index.php"><i class="fas fa-home"></i>HOME</a>
            <a class="hvr-grow hvr-underline-from-center" href="play.php"><i class="fa fa-fire" aria-hidden="true"></i>PLAY</a>
            <a class="hvr-grow hvr-underline-from-center" href="leaderboard.php"><i class="fas fa-trophy" aria-hidden="true"></i>LEADERBOARD</a>
        </nav>
    </header>

    <main>
        <section class="leaderboard-section">
            <h1 class="h1-title">Leaderboard</h1>
            <hr class="line">
            <div class="limiter">
                <div class="container-table100">
                    <div class="wrap-table100">
                        <div class="table100">

                            <table>
                                <thead>
                                    <tr class="table100-head">
                                        <th class="column1">Rank</th>
                                        <th class="column2">Username</th>
                                        <th class="column3">Score</th>
                                        <th class="column6">Timer</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <?php foreach ($resultat as $k => $resultats) : $k++;
                                        $sec = $resultats->Timer % 60;
                                        $min = ($resultats->Timer - $sec) / 60; ?>
                                        <tr>
                                            <td class="column1"><?php echo "$k"; ?></td>
                                            <td class="column2"><?= $resultats->Pseudo ?></td>
                                            <td class="column3"><?= $resultats->scoreTotal ?></td>
                                            <td class="column6"><?php echo "$min min $sec"; ?></td>
                                        </tr>
                                    <?php endforeach ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php require("parts/footer.html") ?>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>

    <!-- Table -->
    <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <script src="vendor/bootstrap/js/popper.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="vendor/select2/select2.min.js"></script>

</body>

</html>
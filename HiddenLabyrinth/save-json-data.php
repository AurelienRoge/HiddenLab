<?php 
$post = json_decode(file_get_contents('php://input'), true);
$scoreTotal = $post['scoreTotal'];
$timer = $post['timer'];
$username = $post['username'];
$file = "data.json";
file_put_contents($file, json_encode($post));

$servname = "localhost"; $dbname = "leaderboard"; $user = "root"; $pass ="";
            
        try{
            $dbco = new PDO("mysql:host=$servname;dbname=$dbname", $user, $pass);
            $dbco->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            try{
                $sth = $dbco->prepare('INSERT INTO user(Pseudo, Timer, scoreTotal) VALUES (:username,:timer,:scoreTotal)');
                
               $sth->execute(array(
                   'username'=>$username,
                   'timer'=>$timer,
                   'scoreTotal'=>$scoreTotal
                ));
               
                
                
                /*Retourne un tableau associatif pour chaque entrée de notre table
                *avec le nom des colonnes sélectionnées en clefs*/
                $resultat = $sth->fetchAll(PDO::FETCH_OBJ);
            }catch(Exception $e){
                echo "Erreur !".$e->getMessage();
                echo "les datas :";
                print_r($datas);
            }
                
        }
                  
        catch(PDOException $e){
            echo "Erreur : " . $e->getMessage();
        }
?>
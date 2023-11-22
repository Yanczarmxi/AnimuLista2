<?php
session_start();

function SegregateData($gr, $anm){
    $data  = [];
    $temp = [];

    array_push($gr, array("gr_id" => 0, "gr_title" => "Pozostałe"));

       foreach ($gr as $grkey => $grval){
           foreach ($anm as $anmkey => $anmval){
               if($anmval["anm_group"] == $grval["gr_id"]){
                   array_push($temp, array($anmkey => $anmval));
               }
           }
           if(!empty($temp)){
                array_push($data, array("group" => array($grkey => $grval), "anime" => $temp));
                $temp = [];
           }
       }

    return $data;
}

require_once 'sql.php';
    $test1 = 1;
    $test2 = -1;


   $user  = $test1;
   $filtr = $test2 < 0 ? null : $test2;
   //$data  = array('data'=>array(), 'group'=>array());
   $anime = [];
   $group = [];
   
   $anmQ = $pdo -> prepare(sprintf('
    SELECT
       anm_id,
       anm_date,
       anm_title,
       anm_link,
       anm_description,
       anm_state,
       anm_episodes,
       anm_epst,
       anm_group
       FROM anime
       WHERE anm_user = :user
       %s
   ', is_null($filtr) ? "" : "AND anm_state = :filtr"));
   $anmQ -> bindValue(':user', $user, PDO::PARAM_INT);
   if(!is_null($filtr)) $anmQ -> bindValue(':filtr', $filtr, PDO::PARAM_INT);
   $anmQ -> execute();
   
   $grQ = $pdo -> prepare('SELECT gr_id, gr_title FROM groups WHERE gr_user = :user');
   $grQ -> bindValue(':user', $user, PDO::PARAM_INT);
   $grQ -> execute();

   echo json_encode(SegregateData($grQ -> fetchAll(PDO::FETCH_ASSOC), $anmQ -> fetchAll(PDO::FETCH_ASSOC)));
?>
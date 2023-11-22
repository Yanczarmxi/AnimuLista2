<?php
session_start();

function SegregateData($gr, $anm){
    $data = [];
    $temp = [];
    $gtmp = [];
    $stmp = [];


    array_push($gr, array("gr_id" => 0, "gr_title" => "Pozostałe"));

        foreach ($gr as $grkey => $grval){
            $gtmp = array("id" => $grval["gr_id"], "title" => $grval["gr_title"]);
            foreach ($anm as $anmkey => $anmval){
            if($anmval["anm_group"] == $grval["gr_id"]){
                array_push($temp, array(
                    "id"          => $anmval["anm_id"],
                    "date"        => $anmval["anm_date"],
                    "title"       => $anmval["anm_title"],
                    "link"        => $anmval["anm_link"],
                    "description" => $anmval["anm_description"],
                    "state"       => $anmval["anm_state"],
                    "episodes"    => $anmval["anm_episodes"],
                    "epst"        => $anmval["anm_epst"]
                ));
                array_push($stmp, array("id" => $anmval["anm_id"], "title" => $anmval["anm_title"]));
            }
        }
        if(!empty($temp)){
            array_push($data, array("group" => $gtmp, "anime" => $temp));
            $temp = [];
            $gtmp = [];
        }
      }

    return array("data" => $data, "shear" => $stmp, "groups" => $gr);
}

function LoadDataFromDataBase($data){
      require_once 'sql.php';
    
    $user  = $_SESSION["ANIME_LISTA_USER_ID"];
    $filtr = $data < 0 ? null : $data;
    //$data  = array('data'=>array(), 'group'=>array());
    $anime = [];
    $group = [];

    //Pobieranie listy anime z bazy danych
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
        FROM atd_anime
        WHERE anm_user = :user
        %s
    ', is_null($filtr) ? "" : "AND anm_state = :filtr"));
    $anmQ -> bindValue(':user', $user, PDO::PARAM_INT);
    if(!is_null($filtr)) $anmQ -> bindValue(':filtr', $filtr, PDO::PARAM_INT);
    $anmQ -> execute();

    //Pobieranie listy grup z bazy danych
    $grQ = $pdo -> prepare('SELECT gr_id, gr_title FROM atd_groups WHERE gr_user = :user ORDER BY gr_title ASC');
    $grQ -> bindValue(':user', $user, PDO::PARAM_INT);
    $grQ -> execute();

    //Pobieranie listy nazw i wartości statusu dla select
    $stateQ = $pdo -> prepare('SELECT st_val, st_txt FROM atd_state');
    $stateQ -> execute();

    //Pobieranie listy nazw i wartości filtra dla select
    $filtrQ = $pdo -> prepare('SELECT fl_val, fl_txt, fl_select FROM atd_filters');
    $filtrQ -> execute();
   
    $_data = SegregateData($grQ -> fetchAll(PDO::FETCH_ASSOC), $anmQ -> fetchAll(PDO::FETCH_ASSOC));
    $_state = $stateQ -> fetchAll(PDO::FETCH_ASSOC);
    $_filtr = $filtrQ -> fetchAll(PDO::FETCH_ASSOC);

    //Renderowanie danych wyjściowych pod postacią obiektową JSON
    return json_encode($_data + array("state"  => $_state, "filtr"=> $_filtr));
}
?>
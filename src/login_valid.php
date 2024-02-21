<?php
function ErrMsg_Login(){
    return '<div id="msgContent" class="msgError"><b>ERROR: </b>Logowanie nie powiodło się :C
                                    <span onclick="CloseError()" class="msgErrorClose">&times;</span></div>';
}

function ErrMsg_ActiveAccount(){
    return '<div id="msgContent" class="msgError"><b>ERROR: </b>
                                    Twoje konto nie zostało aktywowane przez Administratora
                                    <span onclick="CloseError()" class="msgErrorClose">&times;</span></div>';
}

//Jak login jest poprawny to tworzy sesję i ciacho
function LoginValid($login = NULL, $pass = NULL){
    $login = htmlentities($login, ENT_QUOTES, "UTF-8");
    $pass  = htmlentities($pass, ENT_QUOTES, "UTF-8");

    require_once 'sql.php';

    $usrQuery = $pdo -> prepare('SELECT id, user, pass, avatar FROM atd_users WHERE user = :login');
    $usrQuery -> bindValue(':login', $login, PDO::PARAM_STR);
    $usrQuery -> execute();
    $user = $usrQuery->fetch();

    //echo $user['id'] . "   " . $user['pass'];

    if($user and password_verify($pass, $user['pass'])){
        $_SESSION["ANIME_LISTA_USER_ID"]     = $user['id'];
        $_SESSION["ANIME_LISTA_USER_NAME"]   = $user['user'];
        $_SESSION["ANIME_LISTA_USER_AVATAR"] = base64_encode($user['avatar']);
        header("location:myanimu.php");
    }else{
        $_SESSION["message"] = ErrMsg_Login();
        header("location:login.php");
    }
}
?>

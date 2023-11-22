<?php
//require 'usersql.php';
//require 'cookie.php';

header("location:login.php");

//session_start();
//$userDB = new LoginConect();
//$cookie = new Cookie("ANIMU_USER", time()+3600);
//
//if(isset($_SESSION["ANIME_LISTA_USER_LOGGED"])){
//    header("location:site.php");
//}
//else{
//    if(!$cookie->CookieExist()){
//        header("location:login.php");
//    }else{
//        $data = $userDB->LoginUserTest(json_decode($_COOKIE["ANIMU_USER"]));
//    
//        if($data->start){
//            $_SESSION["ANIME_LISTA_USER_NAME"] = $data->user_name;
//            $_SESSION["ANIME_LISTA_USER_ID"]   = $data->user_id;
//            header("location:site.php");
//        }else{
//            header("location:login.php");
//        }
//    }
//}

?>
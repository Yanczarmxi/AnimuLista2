<?php
use phpbb\session;
session_start();

if(!isset($_SESSION["ANIME_LISTA_USER_NAME"]) or !isset($_SESSION["ANIME_LISTA_USER_ID"])){
    header("location:login.php");
}
else
{
    require '../src/myanimu.php';
    echo MyAnimuSite();
}
?>
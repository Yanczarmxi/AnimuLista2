<?php
use phpbb\session;
session_start();

if(isset($_POST["login"])) {
    require_once '../src/login_valid.php';
    LoginValid($_POST['LoginInput'], $_POST['PassInput']);
}

require '../src/html.php';
$site = new HtmlTemplate('login.html');

if(isset($_SESSION["message"])){
    $site -> RepleaceToData('login_error', "Hello World!");
    unset($_SESSION["message"]);
}
else {
    $site -> RepleaceToData('login_error', '');
}

echo $site -> RenderHtml();
?>

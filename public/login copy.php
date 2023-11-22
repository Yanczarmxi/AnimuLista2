<?php
use phpbb\session;
session_start();

if(isset($_POST["login"])) {
    require_once '../src/login_valid.php';
    LoginValid($_POST['LoginInput'], $_POST['PassInput']);
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Anime Lista</title>
        <link rel="icon" type="image/x-icon" href="images/icon.ico">
        <meta name="author" content="Sir Yanczi 2022">
        <meta http-equiv="Content-Type" content="text/html; charset=utf8mb4">
        <link rel="stylesheet" href="css/style-login.css" />

        <script>
            function CloseError(){
                document.getElementById("msgContent").remove();
            }
        </script>
    </head>

    <body>
        <main class="core">
            <div class="window">
                <div class="logocontainer">
                    <img src="/images/logo.webp" class="logo" width="927" height="195" />
                </div>
                <form action="login.php" method="post" autocomplete="off">
                    <label for="username">Login</label>
                    <input type="text"  placeholder="Login" name="LoginInput" id="username" class = "txt">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Password" name="PassInput" id="password" class = "txt">
                    <input type="submit" name="login" class="btInput" value="SING IN" />
                </form>
		<?php 
			if(isset($_SESSION["message"])) {
				//echo $_SESSION["message"];
				echo  "Hello World!";
				unset($_SESSION["message"]);
		}
		?>	
            </div>
        </main>
    </body>
</html>

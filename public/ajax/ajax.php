<?php
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['favData'])){
        require_once '../../src/load.php';
        echo LoadDataFromDataBase($_POST['favData']);
        exit;
    }
}
?>
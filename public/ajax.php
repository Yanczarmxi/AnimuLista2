<?php
if(isset($_POST['favData'])){
    require_once '../src/load.php';
    echo LoadDataFromDataBase($_POST['favData']);
    exit;
}
?>
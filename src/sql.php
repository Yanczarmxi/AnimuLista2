<?php
$config = require_once 'config.php';
$sqldata = $config['database'];


try{
    $pdo = new PDO(
        "mysql:host={$sqldata['host']};dbname={$sqldata['db']};charset={$sqldata['code']}",
        $sqldata['user'], $sqldata['pass'],
        [PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $pdo->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES {$sqldata['code']} COLLATE {$sqldata['collate']}");
}catch(PDOException $e){
    exit("DataBase ERROR!: $e");
}
?>

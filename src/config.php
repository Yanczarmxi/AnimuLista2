<?php
    $xmlConfigFile = '../config/config.xml';
    $xmlConfigData = simplexml_load_file($xmlConfigFile);

    return [
        'host' => $xmlConfigData->host,
        'user' => $xmlConfigData->user,
        'pass' => $xmlConfigData->password,
        'db'   => $xmlConfigData->database,
        'code' => $xmlConfigData->keycode,
        'collate' => $xmlConfigData->collate
    ];
?>

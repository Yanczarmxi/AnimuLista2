<?php
    require_once __DIR__.'/../vendor/autoload.php';
    use Dallgoot\Yaml\Yaml;
    
    $debug = 0;
    
    $yaml = Yaml::parseFile(__DIR__.'/../config/config.yml', 0, $debug);
    
    return [
        //ładowanie danych logowania do bazy danych
        'database' => [
            'host' => $yaml->database->host,
            'user' => $yaml->database->user,
            'pass' => $yaml->database->password,
            'db'   => $yaml->database->database,
            'code' => $yaml->database->keycode,
            'collate' => $yaml->database->collate
        ]
    ];
    ?>

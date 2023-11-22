<?php
/*
    klasa manipulowania danymi jak i wysyłania ich na server
*/

class DataManipulationSQL {
    private $pdo;
    private $data;
    private $method;

    public function __construct($a)
    {
        if($a == 'DMS_ADD' or $a == 'DMS_EDIT'){
            $this->method = $a; //inicjalizacja metody manipulacji danymi w bazie danych;
            $this->pdo = require_once 'sql.php';
        }
        else{
            error_log('Nie prawidłowe określenie metody. Wybierz DMS_ADD lub DMS_EDIT');
        }
    }

    public function __destruct()
    {
        $this->method = NULL;
        $this->pdo = NULL;
        $this->data = NULL;
    }
}
?>
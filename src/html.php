<?php
class HtmlTemplate{
    private $html;

    public function __construct($path) {
        $this->html = file_get_contents("../html/$path");
    }

    public function RepleaceToData($varname ,$data){
        $fullstr = '{{'. $varname .'}}';
        $this->html = str_replace($fullstr, $data, $this->html); 
    }

    public function RenderHtml(){
        return $this->html;
    }

    public function __destruct()
    {
        $this->html = NULL;
    }
}
?>
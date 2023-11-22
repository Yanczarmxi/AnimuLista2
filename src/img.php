<?php
/* Przetwarza obraz zgodnie z wytycznymi i zwraca odpowiednie dane jako blob */

    class ImageManipulator {
        private $img;

        public function __construct($blob)
        {
            $this->img = $blob;
        }

        public function __destruct()
        {
            $this->img = null;
        }
    }
?>
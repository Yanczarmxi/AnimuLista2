<?php
function DeleteAllFiles(){
   $dir = 'upload/';
   foreach(glob($dir.'*.*') as $v){
      unlink($v);
  }
}

if(isset($_FILES['file']['name'])){
   DeleteAllFiles();

   $filename = $_FILES['file']['name'];

   $location = "upload/".$filename;
   $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
   $imageFileType = strtolower($imageFileType);

   $valid_extensions = array("jpg","jpeg","png","gif","webp");

   $response = 0;
   if(in_array(strtolower($imageFileType), $valid_extensions)) {
   if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
         $response = $location;
      }
   }

   echo $response;
}
?>
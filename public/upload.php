<?php
if(isset($_FILES['file']['name'])){
 
    $filename = $_FILES['file']['name'];
 
    $location = "../tmp/upload/".$filename;
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
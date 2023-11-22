<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Przesyłanie obrazu</title>
    <script type="text/javascript" src="js/jquery.js"></script>
</head>
<body>

<input onchange="uploadImage()" type="file" id="pic" name="pic"
                    accept=".jpg, .jpeg, .png, .gif, .webp">

<script>
function uploadImage(){
    var fd = new FormData();

    $.ajax({
    url: 'upload.php',
    type: 'post',
    data: fd,
    contentType: false,
    processData: false,
    success: function(response){
      uploadName = response;
      console.log("OBRAZEK: " + uploadName);
      },
      error: function(e){
        console.log(e);
        alert('file not uploaded');
      }
    });
  }
</script>

</body>
</html>

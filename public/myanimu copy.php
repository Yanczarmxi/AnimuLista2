<?php
use phpbb\session;

session_start();
if(!isset($_SESSION["ANIME_LISTA_USER_NAME"]) or !isset($_SESSION["ANIME_LISTA_USER_ID"])){
    header("location:login.php");
}
?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Animu Lista</title>
    <link rel="icon" type="image/x-icon" href="images/icon.ico">
    <meta name="author" content="Sir Yanczi 2022">
    <meta http-equiv="Content-Type" content="text/html; charset=utf8mb4">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/bootstrap.bundle.js"></script>
    <script type="text/javascript" src="js/alertify.js"></script>
    <script type="text/javascript" src="js/myanimu-modal.js"></script>
    <script type="text/javascript" src="js/datable.js"></script>
    <script type="text/javascript" src="js/fav.js"></script>
    <link rel="stylesheet" href="/css/font_family.css" />
    <link rel="stylesheet" href="/css/jquery-ui.css" />
    <link rel="stylesheet" href="/css/bootstrap.css" />
    <link rel="stylesheet" href="/css/alertify.css" />
    <link rel="stylesheet" href="/css/themes/bootstrap.css" />
    <link rel="stylesheet" href="/css/animu.css" />
    <link rel="stylesheet" href="/css/datable.css" />
    <link rel="stylesheet" href="/css/myanimemodal.css" />
</head>

<body class="bg-dark">
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="ico-add-record" viewBox="0 0 16 16">
      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0ZM8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1Z"/>
      <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12.31 12.31 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7Zm6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.552 4.552 0 0 1 .23-2.002Zm-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.507 4.507 0 0 1-1.3-1.905Z"/>
    </symbol>
    <symbol id="ico-add-group" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </symbol>
    <symbol id="ico-edit-record" viewBox="0 0 16 16">
      <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z"/>
    </symbol>
    <symbol id="ico-remove-record" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
    </symbol>
    <symbol id="ico-shearch" viewBox="0 0 16 16">
      <path d="M6.5,12C9.517,12 12,9.517 12,6.5C12,3.483 9.517,1 6.5,1C3.483,1 1,3.483 1,6.5C1,9.517 3.483,12 6.5,12ZM13,6.5C13,10.066 10.066,13 6.5,13C2.934,13 0,10.066 0,6.5C-0,2.934 2.934,0 6.5,0C10.066,-0 13,2.934 13,6.5Z"/>
      <path d="M10.344,11.742C10.374,11.782 10.406,11.82 10.442,11.857L14.292,15.707C14.48,15.895 14.734,16 14.999,16C15.548,16 16,15.549 16,15C16,14.735 15.894,14.48 15.707,14.293L11.857,10.443C11.821,10.407 11.783,10.373 11.742,10.343C11.35,10.878 10.878,11.35 10.344,11.743L10.344,11.742Z" style="fill-rule:nonzero;"/>
    </symbol>
    <symbol id="ico-hyperlink" viewBox="0 0 16 16">
      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
    </symbol>
    <symbol id="ico-logout" viewBox="0 0 16 16">
      <path d="M7.5 1v7h1V1h-1z"/>
      <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
    </symbol>
  </svg>

  <nav class="navbar navbar-expand navbar-dark bg-dark shadow-glow-menu follow-menu" aria-label="Second navbar example">
    <div class="container-fluid">
        <div class="navbar-brand"><img src="images/logo.png" alt="Animu Lista" class="logo"/></div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExample02">
        <div class="navbar-nav me-auto">
          <div class="btPadding">
            <button type="button" class="btn btn-primary border-3 btn-sm" id="btAddRecord" data-bs-toggle="modal" data-bs-target="#modalAddRecord">
              <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                <use xlink:href="#ico-add-record"/>
              </svg>
              Dodaj Anime</button>
            <button type="button" class="btn btn-primary border-3 btn-sm" id="btAddGroup">
              <svg width="16" height="16" fill="currentColor" class="bi bi-plus-circle">
                <use xlink:href="#ico-add-group"/>
              </svg>
              Dodaj Grupe
            </button>
            <button type="button" class="btn btn-primary border-3 btn-sm" id="btEdit" disabled>
              <svg width="16" height="16" fill="currentColor" class="bi bi-tools">
                <use xlink:href="#ico-edit-record"/>
              </svg>
              Edytuj
            </button>
            <button type="button" class="btn btn-danger border-3 btn-sm" id="btDeleteRecord" disabled>
              <svg width="16" height="16" fill="currentColor" class="bi bi-trash3">
                <use xlink:href="#ico-remove-record"/>
              </svg>
            Usuń Anime
          </button>
          </div>
        </div>
        <form action="index.php" method="post" autocomplete="off">
          <div class="user-container navbar-nav me-auto">
            <div class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src=<?php echo "data:image/jpeg;base64," . $_SESSION["ANIME_LISTA_USER_AVATAR"]; ?> alt="" width="32" height="32" class="rounded-circle me-2">
              <strong class="text-white">yanczi</strong>
            </div>
            <button type="submit" name="login" class="btn btn-danger btn-sm">
              <svg width="16" height="16" fill="currentColor" class="bi bi-trash3">
                <use xlink:href="#ico-logout"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </nav>

  <div class="container zb">
  <main id="content" class="main-content">
    <div class="w-60 p-1">
      <div class="table-menu">
        <div class="">
          <div class="col filtr-container">
            <select class="form-select form-select-sm" aria-label="Default select example">
              <option value="-1" selected>Wszystko</option>
              <option value="0">Nie obejżane</option>
              <option value="1">Oglądam</option>
              <option value="2">Obejżane</option>
              <option value="3">Porzucone</option>
            </select>
          </div>
        </div>
        <div class="">
          <div class="input-group input-group-sm mb-3 rounded-pill">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-prepend">
                <button class="btn btn-primary btn-sm" type="button">
                  <svg width="16" height="16" fill="currentColor" class="bi bi-trash3">
                    <use xlink:href="#ico-shearch"/>
                  </svg>
                </button>
              </div>
          </div>
        </div>
      </div>
      <div class="table-content">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col" class="imgtr"></th>
              <th scope="col" class="titletr">Tytuł</th>
              <th scope="col" class="linkrow"></th>
              <th scope="col" class="statetr">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4">
                <div class="group-separator-bar" onclick="GroupShowSettings(0)">
                  <strong class="text-separator-settings">Animu o szkole xD</strong>
                </div>
              </td>
            </tr>
            <tr id="anm-row-content-1">
              <td scope="row" class="d-flex flex-row">
                <div class="align-self-center p-2">
                  <div class="form-check">
                    <input class="form-check-input test_check" id="test_check_1" type="checkbox" value="1">
                  </div>
                </div>  
                <img src="/img/min/106.jpg" alt="ERROR">
              </td>
              <td>
                <div class="d-flex align-items-start flex-column test_td" onclick="DescryptionRow(0)">
                  <div class="col anmtitle p-2">Hight shool DXD</div>
                  <div class="col daterecord px-2">01-01-1970</div>
                </div>
              </td>
              <td>
                <a href="https://www.WordPress.com" target="_blank" class="slcontent">
                  <button type="button" class="btn btn-outline-success">
                    <svg width="16" height="16" fill="currentColor" class="bi bi-link-45deg">
                      <use xlink:href="#ico-hyperlink"/>
                    </svg>
                  </button>
                </a>
              </td>
              <td> <div class="slcontent"><div class="row"><div class="col"><div class="epsize">
                    <select id="sscEp" class="form-select bg-dark border-dark text-white">
                      <option value="0" selected>Ep. 1</option>
                      <option value="1">Ep. 2</option>
                      <option value="2">Ep. 30</option>
                      <option value="3">Ep. 400</option>
                    </select></div></div></div>

                  <div class="col"><div class="stsize">
                    <select id="sscWatch" class="form-select bg-danger border-danger text-white">
                      <option value="0" selected>Nie obejżane</option>
                      <option value="1">Oglądam</option>
                      <option value="2">Obejżane</option>
                      <option value="3">Porzucone</option>
                    </select></div></div></div></div>
              </td>
            </tr>
            <tr id="des-row">
              <td colspan="4">
                <div class="d-flex">
                  <div class="p-3">
                    <img src="/img/res/169.jpg" alt="!-IMG MISSING-!" width="200" height="285">
                  </div>
                  <div class="p-3">
                    <div class="title-text-settings">Lycoris Recoil</div>
                    <p class="des-text-settings">
                      Kawiarnia w Tokio serwująca pyszną kawę, super słodkie przysmaki i... coś więcej!!!? Od robienia lokalnych dostaw, przez przyzwoitki, po pozbywanie się zombie, a nawet walkę z gigantycznym potworem?
                      Niezależnie od tego, jaki masz problem, jesteśmy tu, by pomóc! Rozwiążemy każdy rodzaj "kłopotu" jaki możesz mieć!
                    </p>
                  </div>
                </div>
              </td>
            </tr>
            <tr id="anm-row-content-2">
              <td scope="row" class="d-flex flex-row">
                <div class="align-self-center p-2">
                  <div class="form-check">
                    <input class="form-check-input test_check" id="test_check_2" type="checkbox" value="2">
                  </div>
                </div>  
                <img src="img/min/106.jpg" alt="ERROR">
              </td>
              <td>
                <div class="d-flex align-items-start flex-column test_td" onclick="DescryptionRow(1)">
                  <div class="col anmtitle p-2">Hight shool DXD</div>
                  <div class="col daterecord px-2">01-01-1970</div>
                </div>
              </td>
              <td>
                <div class="slcontent">
                  <button type="button" class="btn btn-outline-danger" disabled>
                    <svg width="16" height="16" fill="currentColor" class="bi bi-link-45deg">
                      <use xlink:href="#ico-hyperlink"/>
                    </svg>
                  </button>
                </div>
              </td>
              <td> 
                <div class="slcontent"><div class="row"><div class="col"><div class="epsize">
                  <select id="sscEp" class="form-select bg-dark border-dark text-white" aria-label="Default select example">
                    <option value="0" selected>Ep. 1</option>
                    <option value="1">Ep. 2</option>
                    <option value="2">Ep. 30</option>
                    <option value="3">Ep. 400</option>
                  </select></div></div></div>
                <div class="col"><div class="stsize">
                  <select id="sscWatch" class="form-select bg-danger border-danger text-white" aria-label="Default select example">
                    <option value="0" selected>Nie obejżane</option>
                    <option value="1">Oglądam</option>
                    <option value="2">Obejżane</option>
                    <option value="3">Porzucone</option>
                  </select></div></div></div></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top border-secondary">
    <div class="col-md-4 d-flex align-items-center">
      <span class="mb-3 mb-md-0 text-muted">&copy; 2023 Company, Inc</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><a class="text-muted" href="https://www.php.net/"><img src="images/php-power-micro.png"/></a></li>
      <li class="ms-3"><a class="text-muted" href="https://jquery.com/"><img src="images/jQuery-Logo_On_Dark.png"/></a></li>
      <li class="ms-3"><a class="text-muted" href="https://getbootstrap.com/"><img src="images/bootstrap-logo.svg" style="width: auto; height: 15px;"/></a></li>
    </ul>
  </footer>
</div>

  <!-- Modal -->
  <div class="modal fade" id="modalAddRecord" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Dodaj Anime</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-row">
            <div class="importImageBody d-flex flex-column">
              <!--<img src="/images/no_img.jpg" width="200" height="285" class="p-2"/>-->
              <div class="border border-secondary file-size">
                <div class="file-upload-wrapper">
                  <div class="d-flex flex-column text-center">
                    <div><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/>
                    </svg></div>
                    <div>Załaduj grafikę</div>
                  </div>
                  <!--<div class="file-upload-mask"></div>
                  <input type="file" id="input-file-now" class="file-upload" />-->
                </div>
                <div class="file-upload-previews"></div>
              </div>
              <form class="p-2">
                <!--<div class="form-group .mt-6">
                  <input type="file" class="form-control-file form-control-sm" id="exampleFormControlFile1" accept=".jpg, .jpeg, .png, .gif, .webp">
                </div>-->
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button">Załaduj</button>
                  </div>
                  <input type="text" class="form-control" placeholder="https://example.com/img.png" aria-label="" aria-describedby="basic-addon1">
                </div>
              </form>
            </div>
            <div class="w-100 importDataBody">
              <form>
                <div class="form-group">
                  <label for="addAnimeTitle">Tytuł</label>
                  <input type="text" class="form-control" id="addAnimeTitle" placeholder="">
                </div>

                <div class="d-flex flex-row">
                  <div class="w-50">
                    <div class="form-group">
                      <label for="addAnimeGroup">Grupa</label>
                      <select class="form-select" aria-label="Default select example" id="addAnimeGroup">
                        <option selected value="0">Pozostałe</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div class="w-50">
                    <div class="form-group">
                      <label for="addAnimeEpisodes">Liczba odcinków</label>
                      <input type="number" class="form-control" id="addAnimeEpisodes" placeholder="" min="1" value="1">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="addAnimeUrl">Link</label>
                  <input type="url" class="form-control" id="addAnimeUrl" placeholder="https://example.com/">
                </div>

                <div class="mb-3">
                  <label for="addAnimeDescription" class="form-label">Example textarea</label>
                  <textarea class="form-control" id="addAnimeDescription" rows="3"></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="addModalClose" data-bs-dismiss="modal">Zamknij</button>
          <button type="button" class="btn btn-primary" id="addRecordToDatabase">Dodaj</button>
        </div>
      </div>
    </div>
  </div>

</body>
</html>

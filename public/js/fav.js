var globalAnimeData   = null;
var globalFindingData = null;
var globalDeledeData  = null;
var globalIndexDesActive = null;

var idDataFilter      = -1;

var globalImageUploadTemp = "/images/no_img.jpg";

var globalData = [
    {
        'title': 'Lycoris Recoil',
        'img': 'img/res/169.jpg',
        'des': 'Kawiarnia w Tokio serwująca pyszną kawę, super słodkie przysmaki i... coś więcej!!!? Od robienia lokalnych dostaw, przez przyzwoitki, po pozbywanie się zombie, a nawet walkę z gigantycznym potworem? Niezależnie od tego, jaki masz problem, jesteśmy tu, by pomóc! Rozwiążemy każdy rodzaj "kłopotu" jaki możesz mieć!'
    },
    {
        'title': 'High School DxD',
        'img': 'img/res/91.jpg',
        'des': 'We współczesnej Japonii walczą ze sobą trzy rasy: Anioły, Demony i Upadłe Anioły. Hyoudou Issei, czyli bohater opowieści, ma na tyle pecha, że na swoją pierwszą w życiu randkę umawia się z przedstawicielką tej ostatniej. Skutkiem owej niewinnej schadzki jest... śmierć chłopaka, oznaczająca dla niego jednak początek nowej przygody, bowiem zostaje przywrócony do życia przez Rias Gremory, jako jej nieśmiertelny demon-niewolnik. Issei, zauroczony czerwonowłosą wybawicielką oraz jej niewątpliwymi walorami cielesnymi, przyłącza się do szkolnego Klubu Okultystycznego, w skład którego wchodzi ona, jak również 3 inne demony. Warto dodać iż występuje tutaj motyw gry w szachy - każdy członek klubu reprezentuje inną figurę szachową, co wprowadza elementy taktyczne do potyczek w grupie. Fabuła skupia się na ich walce z kolejnymi przeciwnikami, nie szczędząc nam przy okazji ujęć nagich piersi czy zabawnych sytuacji i dialogów.'
    }
];

function GetDataFromBackend(){
    globalAnimeData = null;

    $.ajax({
        url:  "ajax/ajax.php",
        type: "post",
        data: {"favData": idDataFilter},
        success: function(response){
            var dataParsing = $.parseJSON(response);
            //console.log(response);
            RenderTable(dataParsing);
        },
        error: function(e){
            console.log(e);
        }
    })
}

function ChboxGetData(event){
    var data = event.val();
    $(".test_check").prop('checked', false);
    event.prop('checked', true);
    console.log("test: " + data);
    countChecked();
}

function countChecked(){
    var n = $("input:checked").length;
    $("#btEdit").prop("disabled", n!=1 ? true : false);
    $("#btDeleteRecord").prop("disabled", n<1 ? true : false);

    console.log( n + " checked!" );
  }

function DescryptionRow(id){
    if(globalIndexDesActive != id){
        globalIndexDesActive = id;
        console.log("ON");
        AddDescryptionRow(id + 1, globalData[id]['title'], globalData[id]['img'], globalData[id]['des']);
    }else{
        RemoveDescryptionRow();
        console.log("OFF");
        globalIndexDesActive = null;
    }
}

function GroupShowSettings(id) {
    console.log("okienko edycji grupy id: " + id);
}
/*
    Upload obrazka na server

    Na razie jedynym źrudłem ładowania grafiki jest załadowanie z dysku
    Zastanawiam się czy nie zmienić jak ładujesz obrazek z dysku czy url to podgląd jest lokalny

    Nie ładować od razu na server bo to proszenie się o kłopoty i marnuje transfer

    !!!uploadImage() - jest tylko przykładem jak skonstruować odpowiedni system insertu danych na server!!!

    Dane wysyłane są do ajax.php. Może rozdzielę te lokalizację by nie było niepotrzebnego konfliktu
*/
function uploadImage(){
    var fileData = new FormData();
    files = $('#pic')[0].files;
    fileData.append('file',files[0]);

    console.log("DATA: " + fileData);

    $.ajax({
    url: 'ajax/upload.php',
    type: 'post',
    data: fileData,
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

/*
  Część śmietnika który ma się wykonać kiedy strona się załaduje
  Są tu też funkcje które możliwe do wykonania mają być jak dokument będzie READY
*/
$(document).ready( function () {
    GetDataFromBackend();
    countChecked();
    //$('#animeRecords').DataTable();
    
    //Ustaw kolor select
    $("#sscWatch").click(function() {
        var sswState = $("#sscWatch").val();
        const cl = [];
        cl.push(
                    "form-select bg-danger border-danger text-white",
                    "form-select bg-warning border-warning text-white",
                    "form-select bg-success border-success text-white",
                    "form-select bg-secondary border-secondary text-white",
        );

        $("#sscWatch").removeClass();
        $("#sscWatch").addClass(cl[sswState]);
        console.log(sswState + "    " + cl[sswState]);
    });

    $(".test_check").click(function(){
        //ChboxGetData($(this));
        countChecked();
    });

    $("#addRecordToDatabase").click(function(){
        var _data = {
            "title":    $("#addAnimeTitle").val(),
            "group":    $("#addAnimeGroup").val(),
            "episodes": $("#addAnimeEpisodes").val(),
            "url":      $("#addAnimeUrl").val(),
            "desc":     $("#addAnimeDescription").val()
        };

        console.log(JSON.stringify(_data));
    });

    $("#addModalClose").click(function(){
        $("#addAnimeTitle").val(null);
        $("#addAnimeGroup").val(0);
        $("#addAnimeEpisodes").val(1);
        $("#addAnimeUrl").val(null);
        $("#addAnimeDescription").val(null);
    });
    //$('.file-upload').file_upload();
} );
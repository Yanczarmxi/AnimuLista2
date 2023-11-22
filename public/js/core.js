var uploadName           = null;
var modalWindowIndex     = null;
var globalAnimeDataTable = null;
var globalAnimeDataGroup = null;
var siteTimeOut          = null;
var idSearchTMP          = null;
var idFilter             = null;

var delIdArr             = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Te nowe gówno co będzie generować tabelę na podstawie danych z JSON
//jak i dzieliło anime na grupy
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function RenderData(data){
  //Tworzenie tabeli
  let table = document.createElement("TABLE");
  let thead = table.createTHead();
  let tbody = table.createTBody();

  let tabTitles = new Array();
  tabTitles.push(["", "Nazwa", "Odcinek", "Status", "Opcje"]);
  tabTitles.push(["data", "nazwa", "odc", "status", "opcje"]);

  table.id = "customers";

  let row = thead.insertRow(-1);

  for(let i=0; i<tabTitles[0].length; i++){
    let headCell = document.createElement("TH");
    headCell.innerHTML = tabTitles[0][i];
    headCell.id = tabTitles[1][i];
    row.appendChild(headCell);
  }

  let mainDiv = document.getElementById("content");
  mainDiv.innerHTML = "";
  mainDiv.appendChild(table);

  RenderRow(tbody, data);
  CreateOptionsToCategories(data.gr);
  CreateOptionsToCategoriesEdit(data.gr);
}

//Obrabianie danych i tworzenie pozycji w tabeli
function RenderRow(tbody, data){
  let groupCount = Object.keys(data.gr).length;
  let dataCount = Object.keys(data.db).length;

  for(let i=0; i<groupCount; i++){
    CreateGroupCell(tbody, data.gr[i].nazwa, data.gr[i].id, true);
    for(let j=0; j<dataCount; j++){
      if(data.gr[i].id == data.db[j].kat){
        addRow(tbody, 
          data.db[j].id,
          data.db[j].data,
          data.db[j].name, 
          data.db[j].maxep,
          data.db[j].ep,
          data.db[j].state,
          data.db[j].link, 
          data.db[j].img,
          data.db[j].des
          );
      }
    } 
  }

  //Renderowanie pozostałego anime bez kategorii
  CreateGroupCell(tbody, "Pozostałe", false);
  for(let j=0; j<dataCount; j++){
    if(data.db[j].kat < 1){
      addRow(tbody, 
        data.db[j].id,
        data.db[j].data,
        data.db[j].name, 
        data.db[j].maxep,
        data.db[j].ep,
        data.db[j].state,
        data.db[j].link, 
        data.db[j].img,
        data.db[j].des
        );
    }
  } 
}

//Generowanie komórki grópy
function CreateGroupCell(tbody, title, id, edit){
  let newRow = tbody.insertRow(-1);
  let groupCell = newRow.insertCell(0);

  groupCell.id = "groupCell";
  groupCell.setAttribute("colspan", "5");

  groupCell.innerHTML = title;
  if(edit){groupCell.appendChild(CreateButtonToEditGroupName(id));}
}

//Update tabeli
function addRow(tab ,id, data, nazwa, maxodc, odc, state, link, img, des) {
  // Dodaje nowy wiersz na spodzie tabeli
  let newRow = tab.insertRow(-1);
  newRow.id = "row_" + + String(id);

  // Tworzy nowe komórki w tabeli
  let newCell1 = newRow.insertCell(0);
  let newCell2 = newRow.insertCell(1);
  let newCell3 = newRow.insertCell(2);
  let newCell4 = newRow.insertCell(3);
  let newCell5 = newRow.insertCell(4);

  newCell1.className = "contentData";
  newCell2.id = "title_" + String(id); 
  newCell2.className = "contentName";
  newCell3.id = "tdep_" + String(id);
  newCell4.id = "tdst_" + String(id);

  // Wypełnianie komórek danymi
  //newCell1.appendChild(CreateDescryptionButton(id));
  //newCell1.appendChild(document.createTextNode(data));TableImageContent(img)
  newCell1.appendChild(TableImageContent(""));

  if(!link){
    newCell2.appendChild(SpanGen(document.createTextNode(nazwa), nazwa, img, des));
  }else{
    newCell2.appendChild(SpanGen(HiperGen(id, nazwa, link), nazwa, img, des));
  }

  newCell3.appendChild(SelectEpCreate(id, maxodc, odc));
  newCell4.appendChild(SelectStateCreate(id, state));
  newCell5.appendChild(EditButtonGen(id));
  newCell5.appendChild(CheckBoxGen(id));
  
  ColorChangeSelectState(id);
}

//generowanie Select dla statusu oglądania
function SelectStateCreate(id, state) {
  var x = document.createElement("SELECT");
  x.setAttribute("id", "SelectState_" + String(id));
  x.addEventListener('change', function() { stateUpdate(id, this.value) }, false);
  x.classList.add("slStyle");
  document.body.appendChild(x);

  var str = new Array();
  str.push(["Nie Obejżane", "Oglądam", "Obejżane", "Porzucone"]);
  str.push(["slOpNot", "slOpWatch", "slOpEnd", "slOpCancel"]);
  for (let i=0; i<str[0].length; i++){
    CreateElementToSelect("SelectState_" + String(id), String(i), str[0][i], str[1][i]);
  }

  document.getElementById("SelectState_" + String(id)).selectedIndex = state;
  return x;
}

//generator listy odcinków Select
function SelectEpCreate(id, maxEp, ep) {
  var x = document.createElement("SELECT");
  x.setAttribute("id", "Episode_" + String(id));
  x.addEventListener('change', function() { epUpdate(id, this.value) }, false);
  x.classList.add("slStyleEp");
  document.body.appendChild(x);

  for(let i=0; i<maxEp; i++){
    CreateElementToSelect("Episode_" + String(id), String(i+1), "Odc:" + String(i+1));
  }

  document.getElementById("Episode_" + String(id)).selectedIndex = ep - 1;
  return x;
}

//tworzy opcje dla select
function CreateElementToSelect(sele, val, name, cl){
  var z = document.createElement("option");
  z.setAttribute("value", val);
  z.className = cl;
  var t = document.createTextNode(name);
  z.appendChild(t);
  return document.getElementById(sele).appendChild(z);
}

//Tworzy hipełącze na podstawie czy istnieje link
function HiperGen(id, name, link){
  var a = document.createElement('a');
  var linkText = document.createTextNode(name);

  a.appendChild(linkText);
  a.className = "HiperLink";
  a.title = name;
  a.href = link;
  //document.body.append(a);
  return a;
}

//Tworzy spany na tytułów SpanGen(id, name, img, des)
function SpanGen(htitle, title, img, des)
{
  var d = document.createElement("div");
  d.className ="descriptionCloud";
  d.appendChild(htitle);

  var s = document.createElement("span");
  s.className = "descriptionText";
  s.appendChild(SpanContent(title, des, img));

  d.appendChild(s);

  return d;
}

//Tworzenie kontentu do SPAN
function SpanContent(title, des, img){
  var divMom = document.createElement("div");
  divMom.className = "spanDivMom";

  //obraz
  var divChildImg = document.createElement("div");
  divChildImg.className = "spanDivImg";
  divChildImg.appendChild(SpanImageContent(img))

  //content
  var divChildContent = document.createElement("div");
  divChildContent.className = "spanDivContent";

  var h = document.createElement("h2");
  h.innerHTML = title;

  var p = document.createElement("p");
  p.innerHTML = des;

  divChildContent.appendChild(h);
  //divChildContent.innerHTML = "<br>";
  divChildContent.appendChild(p);

  //finalne osadzenie w divMom
  divMom.appendChild(divChildImg);
  divMom.appendChild(divChildContent);

  return divMom;
}

//Tworzenie obrazka
function SpanImageContent(img){
  var image = document.createElement("img");

  image.className = "spImg";

  if(!img){
    image.src = "images/no_img.webp";
  }else{
    image.src = "img/" + img;
  }
  image.alt = "NU IMG :C";
  image.width = 200;
  image.height = 285;

  return image;
}

//Tworzenie obrazka
function TableImageContent(img){
  var image = document.createElement("img");

  image.className = "spImg";

  if(!img){
    image.src = "images/no_img_min.jpg";
  }else{
    image.src = "img/min/" + img + ".jpg";
  }
  image.alt = "NU IMG :C";
  image.width = 50;
  image.height = 70;

  return image;
}

//Tworzy text w przypadku kiedy baza danych jest pusta
function DbEmptyMessage(){
  let d = document.getElementById("content");
  let image = document.createElement("img");

  image.className = "spImg";
  image.src = "images/niezije.webp";
  image.alt = "Baza danych nie zije :C";

 //var p = document.createElement("p");
 //p.className = "pEmpty";
 //p.innerHTML = "Baza danych nie zije :C";

 d.appendChild(image);
}

//Tworzy chceck boxa
function CheckBoxGen(id){
  let c = document.createElement("input");
  let l = document.createElement("label");
  let s = document.createElement("span");

  l.className = "checkContent";
  s.className = "checkMark";
  
  c.onclick = function () {CheckGetState("chcd_" + String(id), id);};
  c.type = "checkbox";
  c.id = "chcd_" + String(id);

  l.appendChild(c);
  l.appendChild(s);

  return l;
}

//tworzy przycisk edycji
function EditButtonGen(id){
  let bt = document.createElement("button");

  bt.onclick = function(){openModalEdit(id);};
  bt.appendChild(CreateThreeBarsForButton("editbtimg"));
  bt.className = "edBtnGroup";

  return bt
}

//Sprawdza status klikniętego checkboxa
function CheckGetState(idItem, id){
  var c = document.getElementById(idItem);

  if(c.checked){AddIdToArr(id)}
  else{RemoveIdFromArr(id)}
}

//Zczytywanie ID z checkboxów
function AddIdToArr(id){
  delIdArr.push(id);
 // console.log(delIdArr);
}

//Kasowanie elementu po ID
function RemoveIdFromArr(id){
  for(var i in delIdArr){
      if(delIdArr[i]==id){
          delIdArr.splice(i,1);
          break;
      }}
 // console.log(delIdArr);
}

function CreateOptionsToCategories(data){
  let select = document.getElementById("group");
  select.innerHTML = "";
  let x = document.createElement("option");
  x.setAttribute("value", null);
  x.innerHTML = "Pozostałe";
  select.appendChild(x);
  //select.addEventListener('change', function() { xdd(this.value) }, false);

  for(let i=0; i<data.length; i++){
    let z = document.createElement("option");
    z.setAttribute("value", data[i]['id']);
    z.innerHTML = data[i]['nazwa'];
    select.appendChild(z);
  }
}

function CreateOptionsToCategoriesEdit(data, id){
  let select = document.getElementById("groupEdit");
  select.innerHTML = "";
  let x = document.createElement("option");
  x.setAttribute("value", 0);
  x.innerHTML = "Pozostałe";
  select.appendChild(x);
  //select.addEventListener('change', function() { xdd(this.value) }, false);

  let id_anm = null;
  let id_select = null;
  if(id){id_anm = searchingForDataById(id);}

  if(id_anm){
    for(let i=0; i<data.length; i++){
      if(data[i]['id'] == id_anm['kat']){
        console.log("SELECT: " + String(i));
        id_select = i + 1;
        console.log("SELECT: " + id_select);
      }else{
        console.log("NU SELLECT");
      }
      CreateElementToSelect("groupEdit", data[i]['id'], data[i]['nazwa'], null);
    }
  
    select.selectedIndex = id_select;
  }
}

//Przycisk edycji separatora grópy anime
function CreateButtonToEditGroupName(id){
  let bt = document.createElement("button");
  let tx = document.createTextNode("Edytuj");

  bt.onclick = function(){openModalGroupEdit(id);};
  bt.appendChild(CreateThreeBarsForButton("editbtimg"));
  bt.className = "edBtnGroup";

  return bt;
}

//Trzy kreski do przycisku edycji
function CreateThreeBarsForButton(c){
  let image = document.createElement("img");

  image.className = c;

  image.src = "images/edit.svg";
  image.alt = "Edytuj";
  image.width = 24;
  image.height = 24;

  return image;
}

//przycisk rozwijania informacji
function CreateDescryptionButton(id){
  let btn = document.createElement("button");
  let img = document.createElement("img");

  img.src    = "images/plus.svg";
  img.alt    = "+";
  img.className = "descryptionBtnImg";

  btn.className = "descryptionBtn";
  btn.appendChild(img);

  return btn;
}

//Zmiana koloru statusu oglądania
function ColorChangeSelectState(id){
  let s = document.getElementById("SelectState_" + String(id));
  let sv = s.value;
      
  console.log(sv);
      
  s.className = "slStyle_" + String(sv);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Aktualizacja rekordów wykorzystując AJAX
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Aktualizacja odcinka
function epUpdate(id, ep){
  $.ajax({
  url: 'ajax.php',
  type: 'post',
  data: { "changeEpStateOnRecord": id, "ep": ep}
  });
}

//aktualizacja statusu oglądania
function stateUpdate(id, select){
  ColorChangeSelectState(id);

  $.ajax({
  url: 'ajax.php',
  type: 'post',
  data: { "changeWatchStateOnRecord": id, "state": select}
  });
}

//Zapisz dane file, nazwa, link, opis, maxep, kat
function AddRecord(data){
  console.log(data.img);
  $.ajax({
    url: 'add_record.php',
    type: 'post',
    data: { "addAnimeToRecord": JSON.stringify(data)},
    success: function(response) { 
      //console.log(response);
      ReloadData();
      },
    error: function(e){
      console.log(e);
    }
  });
}

//Upload obrazka na server
function uploadImage(){
  var fd = new FormData();
  var files = null;

  if(modalWindowIndex == 1){
    files = $('#pic')[0].files;
  }
  if(modalWindowIndex == 2){
    files = $('#picEdit')[0].files;
  }

  fd.append('file',files[0]);

  $.ajax({
  url: 'upload.php',
  type: 'post',
  data: fd,
  contentType: false,
  processData: false,
  success: function(response){
    uploadName = response;
    console.log("OBRAZEK: " + uploadName);
    if(modalWindowIndex == 1) {
      $("#img").attr("src",response);
    }

    if(modalWindowIndex == 2) {
      $("#imgEdit").attr("src",response);
    }
    },
    error: function(e){
      console.log(e);
      alert('file not uploaded');
    }
  });
}

//przeładowanie danych (potrzebne przy otwarciu strony)
function ReloadData(){
  globalAnimeDataTable = null;
  globalAnimeDataGroup = null;

  $.ajax({
      url: 'fav.php',
      type: 'post',
      data: {"favData": idFilter},
      success: function(response) {
        let js = $.parseJSON(response);
        Tags(js.data);
        globalAnimeDataTable = js.data;
        globalAnimeDataGroup = js.group;
        RenderData(js);
      },
      error: function(e){
        console.log(e);
        DbEmptyMessage();
      }
  });
}

//kasuje zuploadowane pliki
function deleteUpload(){
  $.ajax({
    url: 'ajax.php',
    type: 'post',
    data: {"deleteFile": uploadName},
    success: function(response){
      console.log(response);
    }
  });
  uploadName = null;
}

//kasowanie rekordu
function deleteRecord(){
  $.ajax({
    url: 'delete.php',
    type: 'post',
    data: {deleteRecord: JSON.stringify(delIdArr)},
    success: function(response) { 
      ReloadData();
    },
    error: function(e){
      console.log(e);
      DbEmptyMessage();
    }
  });
}

//dodawanie kategorii
function addCategory(c){
  $.ajax({
    url: 'ajax.php',
    type: 'post',
    data: {"addCategory": c},
    success: function(response){
      ReloadData();
    },
    error: function(e){
      console.log(e);
      DbEmptyMessage();
    }
  });
}

 //Pobieranie grópy animu
function getGroupAnime(){
  $.ajax({
    url: 'ajax.php',
    type: 'post',
    data: {"getGroupAnimeJson": "1"},
    success: function(response){
      var js = $.parseJSON(response);
      CreateOptionsToCategories(js.gr);
      console.log(js);
    }
  });
}

function EditRecordOnDB(data){
  $.ajax({
    url: 'edit_record.php',
    type: 'post',
    data: {"EditRecordOnDB": JSON.stringify(data)},
    success: function(response){
      ReloadData();
    },
    error: function(e){
      console.log(e);
      DbEmptyMessage();
    }
  });
}

function SaveEditedGroupName(id){
  let newName = $("#categoryEdit").val();
  let data = {'id': id, 'name': newName};

  $.ajax({
    url:'ajax.php',
    type: 'post',
    data: {"EditGroupRecordOnDB": JSON.stringify(data)},
    success: function(response){
      console.log(response);
      ReloadData();
    },
    error: function(e){
      console.log(e);
      DbEmptyMessage();
    }
  });

  closeModalGroupEdit();
}

function DeleteGroup(id){
  $.ajax({
    url: 'ajax.php',
    type: 'post',
    data: {"DeleteGroupOnDB": id},
    success: function(response){
      ReloadData();
    },
    error: function(e){
      console.log(e);
      DbEmptyMessage();
    }
  });
  closeModalGroupEdit();
}

function UploadURL(url, imgid){
  $.ajax({
    url: 'upload.php',
    type: 'post',
    data: {"url": url},
    success: function(response){
      uploadName = response;
      $(imgid).attr("src",response);
    },
    error: function(e){
      console.log(e);
      alert('file not uploaded');
      $(imgid).attr("src", "images/no_img.webp");
    }
  });
}

function TimeStart(){
  setTimeout(TimeOutSession, siteTimeOut);
}

function TimeOutSession(){
  $.ajax({
    url: 'refresh.php',
    type: 'post',
    data: {"refsesh": 1},
    success: function(r){
      console.log("Reset sesji powiódł się");
      TimeStart();
    },
    error: function(e){
      console.log("ERROR: Reset sesji nie powiódł się: " + e);
      alert("Sesja wygasła!");
      window.location.replace("logout.php");
    }
  })
}

function UploadImageUrlAdd(){
  let url = $("#imageUrl").val();

  if(url){
    $("#img").attr("src", "images/loading.webp");
  }

  UploadURL(url, "#img");
}

function UploadImageUrlEdit(){
  let url = $("#edImgUrl").val();

  if(url){
    $("#imgEdit").attr("src", "images/loading.webp");
    UploadURL(url, "#imgEdit");
  }else{
    console.log("A TAKI CHUJ :C");
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INDEX FUNKCJE WYWOŁAWCZE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openModal() {
  var addAnimeModal = document.getElementById("addAnimeModal");
  addAnimeModal.style.display = "block";
  modalWindowIndex = 1;
}

function closeAddModal(){
    var addAnimeModal = document.getElementById("addAnimeModal");
    addAnimeModal.style.display = "none";
    console.log(uploadName);
    modalWindowIndex = null;
    resetFile();
    deleteUpload();
    document.getElementById("img").src = "images/no_img.webp";
    document.getElementById("title").value=null;
    document.getElementById("link").value=null;
    document.getElementById("description").value=null;
    document.getElementById("group").setAttribute("value", null);
    $("#imageUrl").val(null);
}

  //czyszczenie input file
  function resetFile(){
      const file = document.getElementById('pic');
      file.value = '';
  }

  //Wgrywanie rekordu przez AJAX
function AddAnime(){
  let name = $("#title").val();
  let ep = $("#epil").val();
  let des = $("#description").val();
  let link = $("#link").val();
  let kat = $("#group").val();

  if(!name){
      alert("Mordro, pole tytuł jest wymagane!");
  }else if(!ep){
      alert("Mordro, pole liczba odcinków nie może być miejsza od 1");
  }else{ 
      console.log("TU MA BYĆ LINK: " + uploadName);
      AddRecord({
        "img"  : uploadName,
        "name" : name,
        "link" : link,
        "des"  : des,
        "maxep": ep,
        "kat"  : kat
      });
      uploadName = null;
      closeAddModal();
  }
      
}

function openModalCategory() {
  var CategoryAnimeModal = document.getElementById("addCategoryModal");
  CategoryAnimeModal.style.display = "block";
  document.getElementById("category").value=null;
}

function closeAddModalCategory(){
    var CategoryAnimeModal = document.getElementById("addCategoryModal");
    CategoryAnimeModal.style.display = "none";
    document.getElementById("category").value=null;
}

function addCatFnt(){
  var c = document.getElementById("category").value;

  addCategory(c);
  closeAddModalCategory();
}

//Funkcja startowa dla index
function LoadDataAndRenderTable(){
  ReloadData();
  getGroupAnime();
}

//Modla edycji
function openModalEdit(id) {
  //document.getElementById("linkEdit").value= "TEST";
  var addAnimeModal = document.getElementById("editAnimeModal");
  let data = searchingForDataById(id);
  CreateOptionsToCategoriesEdit(globalAnimeDataGroup, id);
 // console.table(data);
  addAnimeModal.style.display = "block";

  modalWindowIndex = 2;

  if(data.img !== ""){
    $("#imgEdit").attr("src","img/" + data.img);
    uploadName = data.img;
    console.log(uploadName);
  }
  else{$("#imgEdit").attr("src","images/kiana.webp");}

  $("#editTytul").val(data.name);
  $("#linkEdit").val(data.link);
  $("#epilEdit").val(data.maxep);
  $("#descriptionEdit").val(data.des);

  document.getElementById("editBtRecord").onclick = function(){SaveEditedAnime(id);};
}

function closeEditModal(){
  var addAnimeModal = document.getElementById("editAnimeModal");
  addAnimeModal.style.display = "none";
  modalWindowIndex = null;
  console.log(uploadName);
  resetFile();
  deleteUpload();
  document.getElementById("imgEdit").src = "images/kiana.webp";
  document.getElementById("editTytul").value=null;
  document.getElementById("linkEdit").value=null;
  document.getElementById("descriptionEdit").value=null;
  document.getElementById("groupEdit").setAttribute("value", null);
  url = $("#edImgUrl").val(null);
}

function SaveEditedAnime(id){
  let name = $("#editTytul").val();
  let ep   = $("#epilEdit").val();
  let des  = $("#descriptionEdit").val();
  let link = $("#linkEdit").val();
  let kat  = $("#groupEdit").val();

  if(!name){
    alert("Mordro, pole tytuł jest wymagane!");
  }else if(ep < 1 && !ep){
      alert("Mordro, pole liczba odcinków nie może być miejsza od 1");
  }else{
    EditRecordOnDB({"id": id,"name": name,"link": link,"img": uploadName,"maxep": ep,"des": des,"kat": kat});
      console.log(uploadName);
      uploadName = null;
      closeEditModal();
  }
}

//wyszukiwanie danych po id
function searchingForDataById(id){
  let data = [];
  for(let i in globalAnimeDataTable){
      if(globalAnimeDataTable[i]['id'] == id){
        console.log("TEST");
        data = {
          "name" : globalAnimeDataTable[i]['name'], 
          "maxep": globalAnimeDataTable[i]['maxep'], 
          "link" : globalAnimeDataTable[i]['link'], 
          "img"  : globalAnimeDataTable[i]['img'],
          "des"  : globalAnimeDataTable[i]['des'],
          "kat"  : globalAnimeDataTable[i]['kat']
        };
        break;
      }
  }
  return data;
}

//modal edycji grópy anime
function openModalGroupEdit(id) {
  var groupModal = document.getElementById("groupModal");
  groupModal.style.display = "block";

  $("#categoryEdit").val(searchingForGroupDataById(id));
  document.getElementById("BtEditNameGroup").onclick = function(){SaveEditedGroupName(id);};
  document.getElementById("BtDeleteGroup").onclick = function(){DeleteGroup(id);};
}

function closeModalGroupEdit(){
  var groupModal = document.getElementById("groupModal");
  groupModal.style.display = "none";

  $("#categoryEdit").val(null);
}

//wyszukiwanie danych po id
function searchingForGroupDataById(id){
  let data = null;
  for(let i in globalAnimeDataGroup){
      if(globalAnimeDataGroup[i]['id'] == id){
        console.log("TEST");
        data = globalAnimeDataGroup[i]['nazwa'];
        break;
      }
  }
  return data;
}

//$("#sort").change(function() {
//  console.log("FILTER TEST");
//  idFilter = $(this).val();
//  ReloadData();
//});

function ChangeFilterRendering(){
  console.log("FILTER TEST");
  idFilter = JSON.parse($("#sort").val());
  ReloadData();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//WYSZUKIWARKA I FILTRY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Tags(data){
  let hint = [];
  for(let i in data){
    hint.push(data[i]['name']);
  }
  console.log("TAGS TEST");

  $("#tags").autocomplete({ source: hint });
}

function Search(){
  let inp     = $("#tags").val();
  let idName  = null;
  let domCom  = null;

  for(let i in globalAnimeDataTable){
    if(inp == globalAnimeDataTable[i]['name']){
      idName = "#row_" + String(globalAnimeDataTable[i]['id']);
      domCom = $(idName);
      $(idSearchTMP).removeClass("foundElement");
      domCom.attr("class", "foundElement");
      $("html, body").animate({scrollTop: domCom.offset().top}, 1000);
      idSearchTMP = idName;
      break;
    }
  }
}

//Nasłuchiwanie wywołania
$(document).ready(function(){
  $("tr" + idSearchTMP).click(function(){
    console.log(idSearchTMP);
    $(this).removeClass("foundElement");
  });
});
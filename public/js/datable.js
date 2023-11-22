/*
DATABLE v.0.1
Author: Yanczi
*/

/*
Global Varialbes
*/

var globalData = null;

const globalIdDatable = {
    filtr   : 'filtrTable',
    inputCh : 'imputChRow',
    selEpId : 'sscEp-',
    selStId : 'sscWatch-'
};

const globalClassDatable = {
    filtr        : 'form-select form-select-sm',
    th           : ['imgtr', 'titletr', 'linkrow', 'statetr'],
    flDiv        : 'col filtr-container',
    divTab       : 'w-60 p-1',
    tabcontent   : 'table-content',
    table        : 'table table-hover table-dark',
    shDiv        : 'input-group input-group-sm mb-3 rounded-pill',
    shInput      : 'form-control',
    shInprep     : 'input-group-prepend',
    sgBtn        : 'btn btn-primary btn-sm',
    tabmenu      : 'table-menu',
    imgicon      : 'bi bi-trash3',
    strongSep    : 'text-separator-settings',
    divGrSep     : 'group-separator-bar',
    tdImg        : 'd-flex flex-row',
    inputChRow   : 'form-check-input test_check',
    divChCon     : 'align-self-center p-2',
    divChForm    : 'form-check',
    divAnimeMom  : 'd-flex align-items-start flex-column test_td',
    divAnimeTile : 'col anmtitle p-2',
    divAnimeDate : 'col daterecord px-2',
    enbLinkBtn   : 'btn btn-outline-success',
    disLinkBtn   : 'btn btn-outline-danger',
    hyperlinkdiv : 'slcontent',
    rowDiv       : 'row',
    colDiv       : 'col',
    epdiv        : 'epsize',
    stdiv        : 'stsize',
    selectCl     : 'form-select bg-dark border-dark text-white',
    selectCl0    : 'form-select bg-danger border-dark text-white',
    selectCl1    : 'form-select bg-warning border-warning text-white',
    selectCl2    : 'form-select bg-success border-success text-white',
    selectCl3    : 'form-select bg-secondary border-secondary text-white'
};

const globalIconsDatable = {
    glass: '<svg width="16" height="16" fill="currentColor" class="bi bi-trash3"><use xlink:href="#ico-shearch"/></svg>',
    link : '<svg width="16" height="16" fill="currentColor" class="bi bi-link-45deg"><use xlink:href="#ico-hyperlink"/></svg>'
};

/* Główna funkja wejściowe renderująca tabelę */
function RenderTable(data){
    var tbody = $('tbody');

    console.log('State: ' + data['state']);
    globalData = data;

    for(var i=0; i<data['data'].length; i++) {
        tbody.append(GroupSeparatorContainer(data['data'][i]['group']));
       for(var j=0; j<data['data'][i]['anime'].length; j++) {
            tbody.append(AnimeContainerRow(data['data'][i]['anime'][j]));
       }
    }
}

function AddDescryptionRow(id, title, img, des) {
    var content   = $('<tr>').attr('id','des-row');
    var trContent = $('<td>').attr('colspan', '4');
    var divFlex   = $('<div>').attr('class', 'd-flex');
    var divImg    = $('<div>').attr('class', 'p-3');
    var divDes    = $('<div>').attr('class', 'p-3');

    var imgPic = $('<img>').attr('src', img);
    imgPic.attr('alt', '!-IMG MISSING-!');
    imgPic.attr('width', '200');
    imgPic.attr('height', '285');
    imgPic.appendTo(divImg);

    var titleContent = $('<div>').text(title);
    var desContent   = $('<p>').text(des);
    titleContent.attr('class','title-text-settings');
    desContent.attr('class', 'des-text-settings');
    titleContent.appendTo(divDes);
    desContent.appendTo(divDes);

    divImg.appendTo(divFlex);
    divDes.appendTo(divFlex);

    divFlex.appendTo(trContent);
    trContent.appendTo(content);

    RemoveDescryptionRow();
    $('#anm-row-content-' + id).after(content);
}

function RemoveDescryptionRow() {
    $('#des-row').remove();
}

function TheadContent(cl, text) {
    var tr = $('<th>').attr('scope', 'col');
    tr.attr('class', cl);
    tr.text(text);
    return tr;
}

function TableContentControlMenu() {
    var div = $('<div>').attr('class', 'table-menu');
}

function DivContainer(cl, content) {
    var div = $('<div>').attr('class', cl);
    div.append(content);
    return div;
}

/*
Tworzenie modułu select
data = [{val: 0, txt: text, select: true|false}]
*/
function SelectContainter(id, cl, data) {
    select = $('<select>').attr('class', cl);
    select.attr('id', id);

    for (var i = 0; i < data.length; i++) {
        select.append(SecelctOptionsContainer(data[i]['fl_val'], data[i]['fl_txt'], data[i]['fl_select'] == 'Y' ? true : false));
    }

    return select;
}

function SecelctOptionsContainer(val, txt, selected = false) {
    var options = $('<option>').attr('value', val);
    options.text(txt);
    options.prop('selected', selected);
    return options;
}

//Separator zawartości tabeli
function GroupSeparatorContainer(data) {
    var td = $('<td>').attr('colspan', 4);
    var strong = $('<strong>').attr('class', globalClassDatable['text-separator-settings'])
    strong.text(data['title']);

    var div = $('<div>').attr('class', globalClassDatable['divGrSep']);
    div.attr('GroupShowSettings(' + data['id'] + ')');
    div.append(strong);
    td.append(div);

    return $('<tr>').append(td);
}

//Wiersze anime
function AnimeContainerRow(data) {
    var tr = $('<tr>').attr('id', 'anm-row-content-' + data['id']);

    tr.append(ImgCell(data['id'])); //row img
    tr.append(TitleInteractiveCell(data['title'], data['date'])); //row Info
    tr.append(HyperlinkButtonCell(data['link'])); //row link button
    tr.append(AnimeStateCell(data['id'], data['epst'], data['episodes'], data['state']));//row state and episode

    return tr;
}

//Kontener z checkboxem i miniaturowym obrazkiem
function ImgCell(id) {
    //var smalImgUri = '/img/min/' + data['id'] + '.jpg';
    var smalImgUri = '/images/no_img_min.jpg';
    var nullImgUri = '/images/no_img_min.jpg';

    var tdImg = $('<td>').attr('scope', 'row').attr('class', globalClassDatable['tdImg']);
    tdImg.append(CheckBoxRow(id));
    tdImg.append($('<img>').attr('src',smalImgUri).attr('alt', 'IMG-ERROR'));

    return tdImg;
}

//Kontener z Tytułem i datą dodania rekordu
function TitleInteractiveCell(title, date) {
    var divAnimeTitle  = $('<div>').attr('class', globalClassDatable['divAnimeTile']);
    divAnimeTitle.text(title);

    var divAnimeDate   = $('<div>').attr('class', globalClassDatable['divAnimeDate']);
    divAnimeDate.text(date);

    var divAnimeMaster = $('<div>').attr('class', globalClassDatable['divAnimeMom']);
    divAnimeMaster.append(divAnimeTitle);
    divAnimeMaster.append(divAnimeDate);

    var tdAnime = $('<td>').append(divAnimeMaster);
    return tdAnime;
}

//konteler z przyciskiem przekierowujący pod adress linku
function HyperlinkButtonCell(link = null) {
    var btnLink = $('<button>').html(globalIconsDatable['glass']);
    btnLink.attr('type', 'button');

    var tdLink = $('<td>');

    if(link) {
        btnLink.attr('class', globalClassDatable['enbLinkBtn']);
        btnLink.prop('disabled', false);
        tdLink.append(HyperLinkForButton(link, btnLink));
    }else{
        btnLink.attr('class', globalClassDatable['disLinkBtn']);
        btnLink.prop('disabled', true);
        tdLink.append($('<div>').attr('class',globalClassDatable['hyperlinkdiv']).append(btnLink));
    }
    return tdLink;
}

//Tworzenie kontenera hyperlink
function HyperLinkForButton(link, html) {
    var a = $('<a>').attr('class',globalClassDatable['hyperlinkdiv']);
    a.attr('href', link);
    a.append(html);
    return a;
}

//checkbox
function CheckBoxRow(id) {
    var input = $('<input>').attr('value', id);
    input.attr('class', globalClassDatable['inputChRow']);
    input.attr('id', globalIdDatable['inputCh']);
    input.attr('type', 'checkbox');

    var div = $('<div>').attr('class', globalClassDatable['divChCon']);
    div.append($('<div>').attr('class', globalClassDatable['divChForm']).append(input));
    return  div;
}

function AnimeStateCell(id, ep, maxep, state) {
    div = $('<div>').attr('class', globalClassDatable['hyperlinkdiv']);
    divRow = $('<div>').attr('class', globalClassDatable['rowDiv']);
    divEp = $('<div>').attr('class', globalClassDatable['epdiv']);
    divSt = $('<div>').attr('class', globalClassDatable['stdiv']);

    divEp.append(EpisodeSelected(id, ep, maxep));
    divSt.append(StateSelected(id, state));

    divRow.append($('<div>').attr('class', globalClassDatable['colDiv']).append(divEp));
    divRow.append($('<div>').attr('class', globalClassDatable['colDiv']).append(divSt));
    div.append(divRow);
    return $('<td>').append(div);
}

function EpisodeSelected(id, ep, maxep) {
    select = $('<select>').attr('class', globalClassDatable['selectCl']);
    select.attr('id', globalIdDatable['selEpId'] + id);

    for (var i = 0; i < maxep; i++) {
        select.append(SecelctOptionsContainer(i + 1, i + 1, (i + 1) == ep ? true : false));
    }

    return select;
}

/*
Nie podłączono watości z dokumentu statetype
Nie podpiętą statusu
*/

function StateSelected(id, state) {
    select = $('<select>');
    select.attr('id', globalIdDatable['selEpId'] + id);

    for (var i = 0; i < globalData['state'].length; i++) {
        select.append(SecelctOptionsContainer(globalData['state'][i]['st_val'], globalData['state'][i]['st_txt'], globalData['state'][i]['st_val'] == state ? true : false));
        select.attr('class', globalClassDatable['selectCl' + state]);
    }

    return select;
}
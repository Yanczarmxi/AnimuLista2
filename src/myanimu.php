<?php
function MyAnimuSite() {
    require_once '../src/html.php';

    $animest = new HtmlTemplate('myanimu.html');
    $animest -> RepleaceToData('user_avatar', "data:image/jpeg;base64," . $_SESSION["ANIME_LISTA_USER_AVATAR"]);
    $animest -> RepleaceToData('user_name', 'yanczi');
    
    //header
    $header = new HtmlTemplate('headermyanimu.html');
    $animest -> RepleaceToData('site_header', $header->RenderHtml());

    //menu
    $menu = new HtmlTemplate('myanimumenu.html');
    $animest -> RepleaceToData('site_menu', $menu->RenderHtml());

    //svg
    $svg = new HtmlTemplate('svgmyanimu.html');
    $animest -> RepleaceToData('site_svg', $svg->RenderHtml());

    //tabelka
    $table = new HtmlTemplate('table.html');
    $animest -> RepleaceToData('site_content', $table->RenderHtml());
    
    return $animest -> RenderHtml();
}
?>
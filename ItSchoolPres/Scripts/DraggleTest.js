$(document).ready(function () {
    var $draggable = $('.eight').draggabilly();
    var p = $("p:first");
    var position = p.position();
    $("p:last").text("left: " + position.left + ", top: " + position.top);
    var informations = document.getElementById("informations");
    console.log(informations.offsetLeft);
});